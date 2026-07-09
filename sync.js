import {initializeApp} from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js';
import {
  getAuth,
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js';
import {getFirestore,collection,doc,getDoc,setDoc,updateDoc,onSnapshot,serverTimestamp} from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js';

const firebaseConfig={
  apiKey:'AIzaSyC3Y_drlOdfS4jPFm2X327YNTtJI_OLz1w',
  authDomain:'menorca-2026.firebaseapp.com',
  databaseURL:'https://menorca-2026-default-rtdb.europe-west1.firebasedatabase.app',
  projectId:'menorca-2026',
  storageBucket:'menorca-2026.firebasestorage.app',
  messagingSenderId:'70343444037',
  appId:'1:70343444037:web:5f731ea96d36b160c4452c'
};

const firebaseApp=initializeApp(firebaseConfig);
const auth=getAuth(firebaseApp);
const db=getFirestore(firebaseApp);
const provider=new GoogleAuthProvider();
const TRIP_KEY='menorca-shared-trip-v1';
const PENDING_INVITE_KEY='menorca-pending-invite-v1';
const $=selector=>document.querySelector(selector);

provider.setCustomParameters({prompt:'select_account'});

let user=null;
let tripId=localStorage.getItem(TRIP_KEY);
let unsubscribe=null;
let writeTimer=null;
let remoteReady=false;
let inviteToken=null;

const modal=$('#syncModal');
const status=$('#syncStatus');
const dot=$('#syncDot');

function setStatus(text,kind='offline'){
  status.textContent=text;
  status.classList.toggle('sync-error',kind==='error');
  dot.className=kind==='online'?'online':kind==='saving'?'saving':'';
  $('#accountBtn b').textContent=kind==='online'?'Sincronizado':kind==='saving'?'Guardando…':'Compartir';
}
function sharedState(){
  const {plans,favorites,visited,notes,packing}=window.menorcaApp.snapshot();
  return {plans,favorites,visited,notes,packing};
}
function showAuth(){
  $('#signedOutPanel').hidden=!!user;
  $('#signedInPanel').hidden=!user;
  if(!user)return;
  $('#userName').textContent=user.displayName||user.email;
  const photo=$('#userPhoto');
  photo.hidden=!user.photoURL;
  if(user.photoURL)photo.src=user.photoURL;
  $('#noTripPanel').hidden=!!tripId;
  $('#tripPanel').hidden=!tripId;
}
function cleanInvite(value){
  const raw=(value||'').trim();
  try{return new URL(raw).searchParams.get('invite')||raw}catch{return raw}
}
function invitationUrl(token){
  return `${location.origin}${location.pathname}?invite=${encodeURIComponent(token)}`;
}
function stopListening(){
  if(unsubscribe)unsubscribe();
  unsubscribe=null;
  remoteReady=false;
}
function isIOS(){
  const ua=navigator.userAgent||navigator.vendor||'';
  return /iPad|iPhone|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
}
function authErrorMessage(error){
  const code=error?.code||'';
  if(code==='auth/unauthorized-domain')return 'Dominio no autorizado en Firebase. Añade jcromanfeval.github.io en Authentication > Settings > Authorized domains.';
  if(code==='auth/popup-blocked'||code==='auth/popup-closed-by-user')return 'El navegador ha bloqueado la ventana de Google. Probando acceso por redirección…';
  if(code==='auth/operation-not-supported-in-this-environment')return 'Este navegador no permite el acceso con ventana emergente. Probando redirección…';
  if(code==='auth/network-request-failed')return 'No hay conexión suficiente para iniciar sesión.';
  return 'No se pudo iniciar sesión con Google. Si estás en iPhone, abre la app desde Safari y vuelve a intentarlo.';
}
async function startGoogleSignIn(){
  const pending=cleanInvite(new URLSearchParams(location.search).get('invite')||$('#joinCode')?.value);
  if(pending)sessionStorage.setItem(PENDING_INVITE_KEY,pending);
  await setPersistence(auth,browserLocalPersistence);
  setStatus(isIOS()?'Abriendo Google en modo compatible con iPhone…':'Abriendo Google…','saving');

  if(isIOS()){
    await signInWithRedirect(auth,provider);
    return;
  }

  try{
    await signInWithPopup(auth,provider);
  }catch(error){
    console.warn(error);
    if(['auth/popup-blocked','auth/popup-closed-by-user','auth/cancelled-popup-request','auth/operation-not-supported-in-this-environment'].includes(error.code)){
      setStatus(authErrorMessage(error),'saving');
      await signInWithRedirect(auth,provider);
    }else{
      setStatus(authErrorMessage(error),'error');
    }
  }
}
async function subscribeTrip(){
  stopListening();
  if(!user||!tripId)return;
  setStatus('Conectando con el viaje compartido…','saving');
  unsubscribe=onSnapshot(doc(db,'trips',tripId),snapshot=>{
    if(!snapshot.exists()){
      setStatus('Este viaje ya no existe','error');
      return;
    }
    const data=snapshot.data();
    if(data.state)window.menorcaApp.applyRemote(data.state);
    remoteReady=true;
    inviteToken=data.inviteToken||inviteToken;
    if(inviteToken)$('#inviteLink').value=invitationUrl(inviteToken);
    const who=data.updatedByName||'otro dispositivo';
    $('#lastSyncText').textContent=`Último cambio: ${who}`;
    setStatus('Sincronizado en tiempo real','online');
    showAuth();
  },error=>{
    console.error(error);
    setStatus(error.code==='permission-denied'?'No tienes acceso a este viaje':'Sin conexión · se conserva la copia local','error');
  });
}
async function createTrip(){
  if(!user)return;
  setStatus('Creando el viaje compartido…','saving');
  const tripRef=doc(collection(db,'trips'));
  const token=crypto.randomUUID().replaceAll('-','')+crypto.randomUUID().replaceAll('-','');
  await setDoc(tripRef,{name:'Menorca 2026',ownerId:user.uid,inviteToken:token,state:sharedState(),updatedAt:serverTimestamp(),updatedBy:user.uid,updatedByName:user.displayName||user.email});
  await setDoc(doc(db,'trips',tripRef.id,'members',user.uid),{role:'owner',name:user.displayName||'',email:user.email||'',joinedAt:serverTimestamp()});
  await setDoc(doc(db,'invites',token),{tripId:tripRef.id,createdBy:user.uid,active:true,createdAt:serverTimestamp()});
  tripId=tripRef.id;
  inviteToken=token;
  localStorage.setItem(TRIP_KEY,tripId);
  showAuth();
  await subscribeTrip();
}
async function joinTrip(tokenValue){
  if(!user)return;
  const token=cleanInvite(tokenValue);
  if(!token){
    setStatus('Introduce un código de invitación','error');
    return;
  }
  setStatus('Uniéndote al viaje…','saving');
  const invite=await getDoc(doc(db,'invites',token));
  if(!invite.exists()||invite.data().active===false)throw new Error('Invitación no válida');
  const target=invite.data().tripId;
  await setDoc(doc(db,'trips',target,'members',user.uid),{role:'member',name:user.displayName||'',email:user.email||'',inviteToken:token,joinedAt:serverTimestamp()});
  tripId=target;
  inviteToken=token;
  localStorage.setItem(TRIP_KEY,tripId);
  history.replaceState({},'',location.pathname);
  showAuth();
  await subscribeTrip();
}
async function pushState(){
  if(!user||!tripId||!remoteReady)return;
  setStatus('Guardando cambios…','saving');
  try{
    await updateDoc(doc(db,'trips',tripId),{state:sharedState(),updatedAt:serverTimestamp(),updatedBy:user.uid,updatedByName:user.displayName||user.email});
    setStatus('Sincronizado en tiempo real','online');
  }catch(error){
    console.error(error);
    setStatus('Sin conexión · se sincronizará al volver','error');
  }
}

window.addEventListener('menorca:state-changed',()=>{
  if(!remoteReady)return;
  clearTimeout(writeTimer);
  writeTimer=setTimeout(pushState,350);
});
$('#accountBtn').onclick=()=>modal.showModal();
$('#closeSyncBtn').onclick=()=>modal.close();
$('#signInBtn').onclick=()=>startGoogleSignIn().catch(error=>{
  console.error(error);
  setStatus(authErrorMessage(error),'error');
});
$('#signOutBtn').onclick=async()=>{
  stopListening();
  await signOut(auth);
  user=null;
  setStatus('Sin conectar · los cambios sólo están en este dispositivo');
  showAuth();
};
$('#createTripBtn').onclick=()=>createTrip().catch(error=>{
  console.error(error);
  setStatus('No se pudo crear el viaje. Revisa Firestore.','error');
});
$('#joinTripBtn').onclick=()=>joinTrip($('#joinCode').value).catch(error=>{
  console.error(error);
  setStatus('La invitación no es válida o ha caducado','error');
});
$('#copyInviteBtn').onclick=async()=>{
  await navigator.clipboard.writeText($('#inviteLink').value);
  setStatus('Invitación copiada','online');
};
$('#disconnectTripBtn').onclick=()=>{
  stopListening();
  tripId=null;
  inviteToken=null;
  localStorage.removeItem(TRIP_KEY);
  $('#inviteLink').value='';
  setStatus('Dispositivo desconectado del viaje');
  showAuth();
};

getRedirectResult(auth).catch(error=>{
  console.error(error);
  setStatus(authErrorMessage(error),'error');
});

onAuthStateChanged(auth,async current=>{
  user=current;
  showAuth();
  if(!user){
    setStatus('Sin conectar · los cambios sólo están en este dispositivo');
    return;
  }
  const pending=new URLSearchParams(location.search).get('invite')||sessionStorage.getItem(PENDING_INVITE_KEY);
  if(pending&&!tripId){
    try{await joinTrip(pending)}
    catch(error){
      console.error(error);
      setStatus('No se pudo utilizar la invitación','error');
    }
  }else if(tripId){
    await subscribeTrip();
  }else{
    setStatus('Sesión iniciada · crea o únete a un viaje','online');
  }
  sessionStorage.removeItem(PENDING_INVITE_KEY);
});
