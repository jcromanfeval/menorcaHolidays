# Menorca · Mi viaje

Aplicación web progresiva (PWA) pensada para instalarse en Android desde Chrome.

## Probar en el ordenador

```powershell
python -m http.server 4173 --directory app
```

Después, abre `http://localhost:4173`.

## Instalar en Android

La carpeta debe publicarse en una dirección HTTPS. Una vez publicada:

1. Abrir la dirección con Chrome en Android.
2. Pulsar **Instalar aplicación** o **Añadir a pantalla de inicio** en el menú.
3. La app aparecerá con su propio icono y funcionará a pantalla completa.

Los cambios se guardan en el teléfono. La sección **Guardado** permite exportar una copia JSON y restaurarla en otro dispositivo.

La versión 4 incorpora el itinerario revisado del 22 al 29 de julio, media pensión, actividades alternativas, seguimiento de actividades y 23 ubicaciones numeradas cronológicamente. Cala Galdana dispone de acceso directo a Google Maps.

## Viaje compartido

La versión 5 integra Google Authentication y Cloud Firestore. Un usuario crea el viaje y comparte la invitación privada; los miembros reciben en tiempo real los cambios en planes, actividades completadas, favoritos, notas y equipaje. La aplicación mantiene además una copia local para situaciones sin cobertura.

## Conectividad

La interfaz y el itinerario quedan disponibles sin conexión después de la primera visita. El mapa cartográfico, Google Maps, AEMET y las webs de transporte necesitan conexión.
