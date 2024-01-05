import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken = 'pk.eyJ1IjoiaHVtYmVydG9tZWQiLCJhIjoiY2xsN2JzN2IxMHJzNTNncXFva3d1bTVpbyJ9.bcfxGWjyna6rnf99g6gPYQ';

if ( !navigator.geolocation ) {
  alert ( 'El navegador no soporta la Geolocalización' );
  throw new Error ( 'El navegador no soporta la Geolocalización' );
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
