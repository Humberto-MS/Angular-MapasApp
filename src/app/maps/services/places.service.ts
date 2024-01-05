import { Injectable, inject } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api/placesApiClient';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private placesApi = inject ( PlacesApiClient );
  private mapService = inject ( MapService );

  public userLocation?: [ number, number ];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor() {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise <[number,number]> {
    return new Promise ( ( resolve, reject ) => {
      navigator.geolocation.getCurrentPosition (
        ( { coords } ) => {
          this.userLocation = [ coords.longitude, coords.latitude ];
          resolve ( this.userLocation );
        },

        ( err ) => {
          alert ( 'No se pudo obtener la geolocalización' );
          console.log ( err );
          reject();
        }
      );
    } );
  }

  getPlacesByQuery ( query: string = '' ) {
    if ( query.length === 0 ) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    if ( !this.userLocation ) throw new Error ( 'No hay userLocation' );
    this.isLoadingPlaces = true;

    const url = `/${ query }.json`;

    const options = {
      params: {
        proximity: this.userLocation.join ( ',' )
      }
    };

    this.placesApi.get <PlacesResponse> ( url, options )
      .subscribe ( resp => {
        this.isLoadingPlaces = false;
        this.places = resp.features;
        this.mapService.createMarkersFromPlaces ( this.places, this.userLocation! );
      } );
  }

  deletePlaces() {
    this.places = [];
  }
}
