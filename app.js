const DAYS=[
 {date:'2026-07-22',short:'Mié',title:'Llegada · Es Castell',summary:'Coche de alquiler, hotel y primer paseo tranquilo por Cales Fonts.'},
 {date:'2026-07-23',short:'Jue',title:'Cala Galdana y Macarella',summary:'Ruta costera por las calas más famosas del suroeste y noche en Maó.'},
 {date:'2026-07-24',short:'Vie',title:'Kayak y Binibeca',summary:'Cuevas de Cala en Porter en kayak y tarde entre las calles blancas de Binibeca.'},
 {date:'2026-07-25',short:'Sáb',title:'Ruta por el norte',summary:'Favàritx, Arenal d’en Castell, Fornells y el faro de Cavalleria.'},
 {date:'2026-07-26',short:'Dom',title:'Mitjana y Trebalúger',summary:'Calas del sur, paseo opcional a Trebalúger y parada en Es Mercadal.'},
 {date:'2026-07-27',short:'Lun',title:'Ciutadella y Cala Morell',summary:'Día de poniente con Cala en Brut y atardecer reservado en Ivette.'},
 {date:'2026-07-28',short:'Mar',title:'Día libre y alternativas',summary:'Hotel, calas remotas, kayak, paseo en barco o el plan que más apetezca.'},
 {date:'2026-07-29',short:'Mié',title:'Regreso a Sevilla',summary:'Desayuno, maletas, devolución del coche y vuelo de las 12:00.'}
];
const DEFAULT_PLANS=[
 {id:'v2-01',day:0,n:1,time:'14:00',name:'Llegada al aeropuerto de Menorca',type:'Traslado',lat:39.8626,lng:4.2187,desc:'Recoger el equipaje y el coche de alquiler.'},
 {id:'v2-02',day:0,n:2,time:'15:30',name:'Hotel Barceló Hamilton',type:'Hotel',lat:39.8799,lng:4.2959,desc:'Check-in, descanso y tiempo para disfrutar del hotel.'},
 {id:'v2-03',day:0,n:3,time:'18:30',name:'Es Castell y Cales Fonts',type:'Paseo',lat:39.8777,lng:4.2891,desc:'Paseo a pie desde el hotel por el puerto y sus terrazas.'},
 {id:'v2-04',day:0,n:2,time:'21:00',name:'Cena en el hotel',type:'Hotel',lat:39.8799,lng:4.2959,desc:'Cena incluida en la media pensión.'},
 {id:'v2-05',day:0,n:3,time:'22:30',name:'Paseo nocturno por el puerto',type:'Paseo',lat:39.8777,lng:4.2891,desc:'Tomar algo tranquilamente por Cales Fonts.'},

 {id:'v2-06',day:1,n:2,time:'07:30',name:'Desayuno en el hotel',type:'Hotel',lat:39.8799,lng:4.2959,desc:'Desayuno incluido; preparar agua, calzado y comida para las calas.'},
 {id:'v2-07',day:1,n:4,time:'09:00',name:'Llegada a Cala Galdana',type:'Ruta',lat:39.9380,lng:3.9600,desc:'Aparcar y comenzar desde aquí la ruta costera. Incluye navegación directa.'},
 {id:'v2-08',day:1,n:5,time:'10:15',name:'Macarella y Macarelleta',type:'Playa',lat:39.9373,lng:3.9357,desc:'Llegada andando desde Cala Galdana; baño y comida tipo picnic.'},
 {id:'v2-09',day:1,n:6,time:'14:30',name:'Cala en Turqueta',type:'Playa',lat:39.9310,lng:3.9147,desc:'Continuación opcional de la ruta según calor, energía y horarios.'},
 {id:'v2-10',day:1,n:2,time:'20:30',name:'Cena en el hotel',type:'Hotel',lat:39.8799,lng:4.2959,desc:'Ducha y cena incluida en el hotel.'},
 {id:'v2-11',day:1,n:7,time:'22:15',name:'Maó de noche',type:'Pueblo',lat:39.8885,lng:4.2658,desc:'Paseo por el centro histórico y el puerto después de cenar.'},

 {id:'v2-12',day:2,n:2,time:'08:30',name:'Desayuno en el hotel',type:'Hotel',lat:39.8799,lng:4.2959,desc:'Desayuno incluido antes de la actividad.'},
 {id:'v2-13',day:2,n:8,time:'11:00',name:'Kayak por las cuevas de Cala en Porter',type:'Reserva',lat:39.8708,lng:4.1336,desc:'Actividad reservada de 3 horas. Llegar con antelación al punto indicado por la empresa.'},
 {id:'v2-14',day:2,n:8,time:'14:15',name:'Comida y baño en Cala en Porter',type:'Playa',lat:39.8708,lng:4.1336,desc:'Comer por la zona al terminar el kayak.'},
 {id:'v2-15',day:2,n:2,time:'17:00',name:'Descanso y ducha en el hotel',type:'Hotel',lat:39.8799,lng:4.2959,desc:'Regreso para descansar y arreglarse.'},
 {id:'v2-16',day:2,n:9,time:'18:30',name:'Paseo por Binibeca Vell',type:'Pueblo',lat:39.8240,lng:4.2368,desc:'Tarde entre sus calles blancas y paseo junto al mar.'},
 {id:'v2-17',day:2,n:2,time:'21:00',name:'Cena en el hotel',type:'Hotel',lat:39.8799,lng:4.2959,desc:'Cena incluida en la media pensión.'},

 {id:'v2-18',day:3,n:2,time:'08:00',name:'Desayuno en el hotel',type:'Hotel',lat:39.8799,lng:4.2959,desc:'Salir con agua y protección solar para la ruta del norte.'},
 {id:'v2-19',day:3,n:10,time:'09:30',name:'Faro de Favàritx',type:'Faro',lat:39.9957,lng:4.2676,desc:'Paisaje singular del cabo. Comprobar el acceso y aparcamiento antes de salir.'},
 {id:'v2-20',day:3,n:11,time:'11:30',name:'Arenal d’en Castell',type:'Playa',lat:40.0197,lng:4.1782,desc:'Parada panorámica o baño corto según el ritmo del día.'},
 {id:'v2-21',day:3,n:12,time:'13:00',name:'Fornells',type:'Pueblo',lat:40.0552,lng:4.1316,desc:'Paseo por el pueblo y comida por la zona.'},
 {id:'v2-22',day:3,n:13,time:'17:00',name:'Faro de Cavalleria',type:'Faro',lat:40.0884,lng:4.0920,desc:'Última parada de la ruta norte; adaptar el horario si queréis quedaros al atardecer.'},
 {id:'v2-23',day:3,n:2,time:'20:45',name:'Cena en el hotel',type:'Hotel',lat:39.8799,lng:4.2959,desc:'Cena incluida. Si regresáis antes, tarde libre en la piscina.'},

 {id:'v2-24',day:4,n:2,time:'08:00',name:'Desayuno en el hotel',type:'Hotel',lat:39.8799,lng:4.2959,desc:'Desayuno incluido antes de las calas.'},
 {id:'v2-25',day:4,n:14,time:'09:30',name:'Cala Mitjana y Mitjaneta',type:'Playa',lat:39.9356,lng:3.9717,desc:'Parking y acceso a pie; llevar calzado cómodo.'},
 {id:'v2-26',day:4,n:15,time:'12:00',name:'Trebalúger · opción a pie',type:'Alternativa',lat:39.9277,lng:3.9923,desc:'Extensión opcional desde Mitjana si el calor y las fuerzas acompañan.'},
 {id:'v2-27',day:4,n:16,time:'17:30',name:'Es Mercadal',type:'Alternativa',lat:39.9886,lng:4.0938,desc:'Parada opcional para pasear y tomar algo al volver.'},
 {id:'v2-28',day:4,n:2,time:'20:45',name:'Cena en el hotel',type:'Hotel',lat:39.8799,lng:4.2959,desc:'Cena incluida; después, copa tranquila o paseo por el puerto.'},

 {id:'v2-29',day:5,n:2,time:'08:00',name:'Desayuno en el hotel',type:'Hotel',lat:39.8799,lng:4.2959,desc:'Desayuno incluido antes de salir hacia poniente.'},
 {id:'v2-30',day:5,n:17,time:'10:00',name:'Ciutadella',type:'Pueblo',lat:40.0019,lng:3.8379,desc:'Casco antiguo, mercado, catedral y puerto. Comer por la ciudad.'},
 {id:'v2-31',day:5,n:18,time:'16:30',name:'Cala en Brut',type:'Alternativa',lat:40.0066,lng:3.8050,desc:'Plataformas rocosas; sirve tanto para un baño como para una visita informal.'},
 {id:'v2-32',day:5,n:19,time:'19:30',name:'Cala Morell e Ivette Beach Club',type:'Reserva',lat:40.0521,lng:3.8816,desc:'Reserva para disfrutar del atardecer. Contar con el trayecto de vuelta al hotel.'},
 {id:'v2-33',day:5,n:2,time:'22:15',name:'Cena en el hotel',type:'Hotel',lat:39.8799,lng:4.2959,desc:'Cena incluida; confirmar con el hotel hasta qué hora funciona el servicio.'},

 {id:'v2-34',day:6,n:2,time:'09:00',name:'Desayuno y mañana de hotel',type:'Hotel',lat:39.8799,lng:4.2959,desc:'Día flexible para piscina, descanso o elegir una de las alternativas.'},
 {id:'v2-35',day:6,n:20,time:'10:30',name:'Binigaus',type:'Alternativa',lat:39.9116,lng:4.0394,desc:'Opción A: costa remota desde Sant Tomàs, andando o en kayak.'},
 {id:'v2-36',day:6,n:21,time:'12:00',name:'Escorxada y Fustam',type:'Alternativa',lat:39.9166,lng:4.0088,desc:'Continuación de la opción A; confirmar mar, alquiler y distancia permitida.'},
 {id:'v2-37',day:6,n:22,time:'09:30',name:'Son Saura',type:'Alternativa',lat:39.9271,lng:3.8940,desc:'Opción B: llegar temprano porque el aparcamiento tiene aforo limitado.'},
 {id:'v2-38',day:6,n:23,time:'11:00',name:'Es Talaier',type:'Alternativa',lat:39.9257,lng:3.9026,desc:'Continuación a pie de la opción B desde Son Saura.'},
 {id:'v2-39',day:6,n:null,time:'10:00',name:'Paseo en barco u otra actividad',type:'Alternativa',lat:null,lng:null,desc:'Opción C: reservar allí según el tiempo, el mar y las ganas.'},
 {id:'v2-40',day:6,n:2,time:'20:45',name:'Cena en el hotel',type:'Hotel',lat:39.8799,lng:4.2959,desc:'Última cena incluida en el hotel.'},

 {id:'v2-41',day:7,n:2,time:'08:00',name:'Desayuno y preparación de maletas',type:'Hotel',lat:39.8799,lng:4.2959,desc:'Desayuno incluido, revisar la habitación y hacer el check-out.'},
 {id:'v2-42',day:7,n:1,time:'09:30',name:'Aeropuerto · devolución del coche',type:'Traslado',lat:39.8626,lng:4.2187,desc:'Devolver el vehículo con margen para el vuelo de las 12:00 a Sevilla.'}
];
const PACKING=['Zapatillas','Agua 1,5–2 L','Protector solar','Gorra','Bolsa estanca','Frontal','Batería externa','Picnic'];
const KEY='menorca-trip-v2';
function normalizeState(value){
 const safe=value&&typeof value==='object'?value:{};
 return {plans:Array.isArray(safe.plans)?safe.plans:DEFAULT_PLANS,selectedDay:Number.isInteger(safe.selectedDay)&&safe.selectedDay>=0&&safe.selectedDay<DAYS.length?safe.selectedDay:0,favorites:Array.isArray(safe.favorites)?safe.favorites:[],visited:Array.isArray(safe.visited)?safe.visited:[],notes:typeof safe.notes==='string'?safe.notes:'',packing:Array.isArray(safe.packing)?safe.packing:[]};
}
let storedState=null;try{storedState=JSON.parse(localStorage.getItem(KEY)||'null')}catch{localStorage.removeItem(KEY)}
let state=normalizeState(storedState);
let map,markers=[],streetLayer,illustratedLayer,deferredPrompt;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function emitState(){window.dispatchEvent(new CustomEvent('menorca:state-changed',{detail:state}))}
function save(){localStorage.setItem(KEY,JSON.stringify(state));renderAll();emitState()}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
function mapsUrl(p){return `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}&travelmode=driving`}
function updateCountdown(){const now=new Date(),start=new Date('2026-07-22T00:00:00+02:00'),end=new Date('2026-07-30T00:00:00+02:00');let label='Próximo viaje',num=Math.ceil((start-now)/86400000);if(now>=start&&now<end){label='Viaje en curso';num=Math.max(0,Math.ceil((end-now)/86400000));$('#heroText').textContent='Tu itinerario está listo. Ajusta el día según el viento y las ganas.'}else if(now>=end){label='Recuerdos de Menorca';num=0}$('#tripStatus').textContent=label;$('#countdownDays').textContent=Math.max(0,num)}
function renderDays(){const box=$('#dayStrip');box.innerHTML=DAYS.map((d,i)=>`<button class="day-chip ${i===state.selectedDay?'active':''}" data-day="${i}" role="tab"><b>${d.short}</b><span>${new Date(d.date+'T12:00').getDate()}</span></button>`).join('');$$('.day-chip').forEach(b=>b.onclick=()=>{state.selectedDay=+b.dataset.day;save()});const d=DAYS[state.selectedDay],daily=state.plans.filter(p=>p.day===state.selectedDay),done=daily.filter(p=>state.visited.includes(p.id)).length,pct=daily.length?Math.round(done/daily.length*100):0;$('#daySummary').innerHTML=`<h3>${d.title}</h3><p>${d.summary}</p><div class="progress-row"><div class="progress-track"><span style="width:${pct}%"></span></div><small>${done} de ${daily.length} hechas</small></div>`}
function planCard(p){const fav=state.favorites.includes(p.id),done=state.visited.includes(p.id),directions=p.lat&&p.lng?`<a href="${mapsUrl(p)}" target="_blank" rel="noopener">Cómo llegar ↗</a>`:'';return `<article class="plan-card ${done?'visited':''}" data-plan-id="${p.id}"><div class="plan-number">${p.n||'•'}</div><div><span class="plan-time">${p.time||'Sin hora'} · ${p.type}</span><h3>${p.name}</h3><p>${p.desc||''}</p></div><label class="complete-toggle"><input class="done-check" type="checkbox" data-id="${p.id}" ${done?'checked':''}><span>${done?'Actividad completada':'Marcar actividad como hecha'}</span></label><div class="card-links">${directions}<button class="edit" data-id="${p.id}">Editar</button><button class="remove" data-id="${p.id}">Quitar</button><button class="fav" data-id="${p.id}" aria-label="Favorito">${fav?'♥ Favorito':'♡ Guardar'}</button></div></article>`}
function bindCards(){ $$('.fav').forEach(b=>b.onclick=()=>toggleArray('favorites',b.dataset.id));$$('.done-check').forEach(b=>b.onchange=()=>{toggleArray('visited',b.dataset.id);toast(b.checked?'Actividad completada':'Actividad pendiente')});$$('.edit').forEach(b=>b.onclick=()=>openEdit(b.dataset.id));$$('.remove').forEach(b=>b.onclick=()=>{if(confirm('¿Quitar este plan del itinerario?')){state.plans=state.plans.filter(p=>p.id!==b.dataset.id);state.visited=state.visited.filter(id=>id!==b.dataset.id);state.favorites=state.favorites.filter(id=>id!==b.dataset.id);save();toast('Plan eliminado')}})}
function toggleArray(k,id){state[k]=state[k].includes(id)?state[k].filter(x=>x!==id):[...state[k],id];save()}
function renderPlans(){const plans=state.plans.filter(p=>p.day===state.selectedDay).sort((a,b)=>(a.time||'99').localeCompare(b.time||'99'));$('#planList').innerHTML=plans.length?plans.map(planCard).join(''):'<div class="info-card"><p>No hay planes. Añade uno y construye este día a tu manera.</p></div>';bindCards()}
function renderSaved(){const favs=state.plans.filter(p=>state.favorites.includes(p.id));$('#statsGrid').innerHTML=`<div class="stat"><strong>${state.plans.length}</strong><small>planes</small></div><div class="stat"><strong>${state.visited.length}</strong><small>visitados</small></div><div class="stat"><strong>${favs.length}</strong><small>favoritos</small></div>`;$('#favoritesList').innerHTML=favs.length?favs.map(p=>`<div class="compact-item"><span><b>${p.n||'•'} · ${p.name}</b><br><small>${DAYS[p.day].short} ${new Date(DAYS[p.day].date+'T12:00').getDate()}</small></span>${p.lat&&p.lng?`<a href="${mapsUrl(p)}" target="_blank" rel="noopener" aria-label="Cómo llegar">⌖</a>`:''}</div>`).join(''):'<div class="info-card"><p>Marca lugares con ♡ para encontrarlos aquí.</p></div>';$('#tripNotes').value=state.notes}
function renderPacking(){ $('#packingList').innerHTML=PACKING.map((x,i)=>`<label class="pack-item"><input type="checkbox" data-pack="${i}" ${state.packing.includes(i)?'checked':''}> ${x}</label>`).join('');$$('[data-pack]').forEach(c=>c.onchange=()=>{const i=+c.dataset.pack;state.packing=c.checked?[...new Set([...state.packing,i])]:state.packing.filter(x=>x!==i);localStorage.setItem(KEY,JSON.stringify(state));emitState()})}
function initMap(){if(map||!window.L)return;map=L.map('map',{zoomControl:false,attributionControl:false,minZoom:9}).setView([39.97,4.10],10);streetLayer=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'});illustratedLayer=L.imageOverlay('assets/menorca-ilustrada.png',[[39.663,3.688],[40.206,4.454]],{opacity:1,interactive:false}).addTo(map);L.control.zoom({position:'topright'}).addTo(map);renderMap()}
function setMapMode(mode){if(!map)initMap();if(mode==='street'){map.removeLayer(illustratedLayer);streetLayer.addTo(map)}else{map.removeLayer(streetLayer);illustratedLayer.addTo(map)}$$('[data-map-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mapMode===mode));map.setView([39.97,4.10],10);setTimeout(()=>map.invalidateSize(),60)}
function renderMap(){const unique=new Map();state.plans.filter(p=>p.lat&&p.lng).forEach(p=>{const key=`${p.lat},${p.lng}`;if(!unique.has(key))unique.set(key,p)});const items=[...unique.values()].sort((a,b)=>(a.n??999)-(b.n??999));$('#locationCount').textContent=`${items.length} lugares`;if(!map)return;markers.forEach(m=>m.remove());markers=[];items.forEach(p=>{const icon=L.divIcon({className:'',html:`<div style="width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${state.visited.includes(p.id)?'#5b8c65':'#0d6872'};border:3px solid white;box-shadow:0 4px 10px #0004"><b style="display:grid;place-items:center;height:100%;color:white;transform:rotate(45deg);font-size:11px">${p.n||'•'}</b></div>`,iconSize:[30,30],iconAnchor:[15,30]});markers.push(L.marker([p.lat,p.lng],{icon}).addTo(map).bindPopup(`<b>${p.name}</b><br>${DAYS[p.day].short} · ${p.time||''}<br><a href="${mapsUrl(p)}" target="_blank" rel="noopener">Abrir en Google Maps</a>`))});$('#mapResults').innerHTML=items.map(p=>`<button class="map-result" data-lat="${p.lat}" data-lng="${p.lng}"><b>${p.n||'•'} · ${p.name}</b><small>${DAYS[p.day].title}</small></button>`).join('');$$('.map-result').forEach(b=>b.onclick=()=>map.flyTo([+b.dataset.lat,+b.dataset.lng],13))}
function fillDaySelect(){ $('#planDay').innerHTML=DAYS.map((d,i)=>`<option value="${i}">${d.short} ${new Date(d.date+'T12:00').getDate()} · ${d.title}</option>`).join('')}
function openEdit(id){const p=state.plans.find(x=>x.id===id);$('#modalTitle').textContent=p?'Editar plan':'Añadir un plan';$('#editId').value=p?.id||'';$('#planDay').value=p?.day??state.selectedDay;$('#planName').value=p?.name||'';$('#planTime').value=p?.time||'';$('#planType').value=p?.type||'Playa';$('#planDescription').value=p?.desc||'';$('#planLat').value=p?.lat||'';$('#planLng').value=p?.lng||'';$('#planModal').showModal()}
function renderAll(){renderDays();renderPlans();renderSaved();renderPacking();renderMap()}
$$('.nav-item').forEach(b=>b.onclick=()=>{$$('.nav-item').forEach(x=>x.classList.toggle('active',x===b));$$('.view').forEach(v=>v.classList.toggle('active',v.id===b.dataset.view));if(b.dataset.view==='mapView'){initMap();setTimeout(()=>map.invalidateSize(),80)}});
$$('[data-map-mode]').forEach(b=>b.onclick=()=>setMapMode(b.dataset.mapMode));
$$('[data-open="planModal"]').forEach(b=>b.onclick=()=>openEdit());
$('#planForm').addEventListener('submit',e=>{e.preventDefault();const id=$('#editId').value||`custom-${Date.now()}`;const old=state.plans.find(p=>p.id===id);const p={id,day:+$('#planDay').value,n:old?.n||null,time:$('#planTime').value,name:$('#planName').value.trim(),type:$('#planType').value,desc:$('#planDescription').value.trim(),lat:+$('#planLat').value||null,lng:+$('#planLng').value||null};state.plans=old?state.plans.map(x=>x.id===id?p:x):[...state.plans,p];state.selectedDay=p.day;$('#planModal').close();save();toast('Plan guardado')});
$('#tripNotes').addEventListener('input',e=>{state.notes=e.target.value;localStorage.setItem(KEY,JSON.stringify(state));emitState()});
$('#locateBtn').onclick=()=>navigator.geolocation?.getCurrentPosition(pos=>{map.setView([pos.coords.latitude,pos.coords.longitude],14);L.circleMarker([pos.coords.latitude,pos.coords.longitude],{radius:8,color:'#fff',weight:3,fillColor:'#d9634e',fillOpacity:1}).addTo(map).bindPopup('Estás aquí').openPopup()},()=>toast('No se pudo obtener tu ubicación'));
$('#exportBtn').onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='menorca-mi-viaje.json';a.click();URL.revokeObjectURL(a.href)};
$('#importInput').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const imported=JSON.parse(r.result);if(!imported||!Array.isArray(imported.plans))throw new Error();state=normalizeState(imported);save();toast('Copia restaurada')}catch{toast('El archivo no es válido')}finally{e.target.value=''}};r.readAsText(f)};
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;$('#installBtn').hidden=false});$('#installBtn').onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$('#installBtn').hidden=true}};
window.menorcaApp={snapshot:()=>JSON.parse(JSON.stringify(state)),applyRemote:remote=>{state=normalizeState({...remote,selectedDay:state.selectedDay});localStorage.setItem(KEY,JSON.stringify(state));renderAll()}};
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
fillDaySelect();updateCountdown();renderAll();
