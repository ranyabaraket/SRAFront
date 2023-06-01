import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map: Mapboxgl;
  markers: Mapboxgl.Marker[] = [];
//  searchModel: any;
  constructor(
    public dialogRef: MatDialogRef<MapComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
   }

  ngOnInit(): void {
   // this.searchModel = this.data;
    const bounds = [
      [2.5610996, 49.009394],
      [2.2425831, 48.968690099999996]
    ];
    Mapboxgl.accessToken = environment.mapboxkey;
    const map = new Mapboxgl.Map({
      container: 'map-mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.data.pickupLatitude, this.data.pickupLongitude],
      zoom: 10,
    });

    const destination = [this.data.dropoffLatitude, this.data.dropoffLongitude];
    const start = [this.data.pickupLatitude, this.data.pickupLongitude];

    const marker1 = new Mapboxgl.Marker()
      .setLngLat([this.data.pickupLatitude, this.data.pickupLongitude])
      .setPopup(new Mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<p> Pickup </p>'))
      .addTo(map);
    if (destination)
{    const marker2 = new Mapboxgl.Marker()
      .setLngLat([this.data.dropoffLatitude, this.data.dropoffLongitude])
      .setPopup(new Mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<p> Dropoff </p>'))
      .addTo(map); }
    map.addControl(new Mapboxgl.NavigationControl());

    async function getRoute(end) {
      if (destination)
      {const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${destination[0]},${destination[1]}?steps=true&geometries=geojson&access_token=${Mapboxgl.accessToken}`,
        { method: 'GET' }
      );
       const json = await query.json();
       const data = json.routes[0];
       const route = data.geometry.coordinates;
       const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route
        }
      };
       if (map.getSource('route')) {
        map.getSource('route').setData(geojson);
      }
      else {
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: geojson
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
          }
        });
      }
    }

      map.on('load', () => {
      getRoute(start);
    }); }
  }

}
