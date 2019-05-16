import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { first, pluck } from 'rxjs/operators';
import { icon, tileLayer, latLng, marker, Marker } from 'leaflet';

import * as L from 'leaflet';
import 'leaflet.markercluster';

import '../../../node_modules/leaflet.fullscreen/Control.FullScreen.js';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  map: L.Map;
  json;

  markerClusterData: any[] = [];
  markerClusterGroup: L.MarkerClusterGroup;
  markerClusterOptions: L.MarkerClusterGroupOptions;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.generateData();
  }

  LAYER_OSM = {
    id: 'openstreetmap',
    enabled: false,
    layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 24,
      zoomSnap: 0,
      zoomDelta: 20,
      spiderfyOnMaxZoom: false,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: false

    })
  };

  layersControlOptions = { position: 'bottomright' };
  baseLayers = {
    'Open Street Map': this.LAYER_OSM.layer
  };
  options = {
    zoom: 15,
    center: L.latLng(41.0090329, 28.9716212)
  };
  generateData() {
    this.http
      .get('assets/pois.json')
      .pipe(pluck('features'))
      .subscribe((result: any) => {
        const icon = L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png'
        });

        const data: any[] = [];
        result.forEach(item => {
          const [posX, posY] = item.geometry.coordinates;
          data.push(L.marker([posY, posX], { icon }));
        });

        this.markerClusterData = data;
      });
  }

  markerClusterReady(group: L.MarkerClusterGroup) {
    // console.log(group);
    group.options.disableClusteringAtZoom = 17;
    this.markerClusterGroup = group;

  }

  initMap(map) {
    const ZoomViewer = L.Control.extend({
      onAdd: function() {
        const container = L.DomUtil.create('div');
        const gauge = L.DomUtil.create('div');
        container.style.width = '200px';
        container.style.background = 'rgba(255,255,255,1)';
        container.style.textAlign = 'left';
        map.on('zoomstart zoom zoomend', function(ev) {
          gauge.innerHTML = 'Zoom level: ' + map.getZoom();
        });
        container.appendChild(gauge);

        return container;
      }
    });

    new ZoomViewer().addTo(map);
  }
}
