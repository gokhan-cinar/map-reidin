import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as L from "leaflet";
import "leaflet.markercluster";


@Component({
  selector: 'app-marker-cluster',
  templateUrl: './marker-cluster.component.html',
  styleUrls: ['./marker-cluster.component.css']
})
export class MarkerClusterComponent implements OnInit {

  constructor(private http: HttpClient) { }

  // Open Street Map Definition
  LAYER_OSM = {
    id: "openstreetmap",
    name: "Open Street Map",
    enabled: false,
    layer: L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "Open Street Map"
    })
  };

  // Values to bind to Leaflet Directive
  layersControlOptions = { position: "bottomright" };
  baseLayers = {
    "Open Street Map": this.LAYER_OSM.layer
  };
  options = {
    zoom: 3,
    center: L.latLng(41.0090329, 28.9716212)
  };

  // Marker cluster stuff
  markerClusterGroup: L.MarkerClusterGroup;
  markerClusterData: any[] = [];
  markerClusterOptions: L.MarkerClusterGroupOptions;

  // Generators for lat/lon values
  generateLat() {
    return Math.random() * 360 - 180;
  }
  generateLon() {
    return Math.random() * 180 - 90;
  }

  ngOnInit() {
    this.generateData();
  }

  markerClusterReady(group: L.MarkerClusterGroup) {
    this.markerClusterGroup = group;
  }

  generateData() {
    const data: any[] = [];
    for (let i = 0; i < 2000; i++) {
      const icon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",

      });
      data.push(L.marker([this.generateLon(), this.generateLat()], { icon }));
    }

    this.markerClusterData = data;
  }

}
