import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  private mapService = inject ( MapService )
  private placesService = inject ( PlacesService );

  goToMyLocation() {
    if ( !this.placesService.isUserLocationReady ) throw new Error ( 'No hay ubicación de usuario' );
    if ( !this.mapService.isMapReady ) throw new Error ( 'No hay mapa disponible' );
    this.mapService.flyTo ( this.placesService.userLocation! );
  }
}
