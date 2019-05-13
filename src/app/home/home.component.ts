import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { first, pluck } from "rxjs/operators";
import { icon, tileLayer, latLng, marker, Marker } from "leaflet";

import * as L from "leaflet";
import "leaflet.markercluster";

import "../../../node_modules/leaflet.fullscreen/Control.FullScreen.js";
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon.png";

@Component({ templateUrl: "home.component.html" })
export class HomeComponent {
    map: L.Map;
    json;

  markerClusterData: any[] = [];
  markerClusterGroup: L.MarkerClusterGroup;
  markerClusterOptions: L.MarkerClusterGroupOptions;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
        this.generateData();
  }

  

  LAYER_OSM = {
    id: "openstreetmap",
    enabled: false,
    layer: L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18
    })
  }; 

  layersControlOptions = { position: "bottomright" };
  baseLayers = {
    "Open Street Map": this.LAYER_OSM.layer
  };
  options = {
    zoom: 14,
    center: L.latLng(41.0090329, 28.9716212)
  };
  generateData() {
    this.http
    .get("assets/pois.json")
    .pipe(pluck("features"))
    .subscribe((result: any) => {
         const icon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png"
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
      console.log(group);
      
    this.markerClusterGroup = group;
  }
}
