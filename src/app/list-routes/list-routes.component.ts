import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CapiRoute } from '../model/capi-route.model';
import { Api } from '../model/api.model';
import UIkit from 'uikit';
import { environment } from '../../environments/environment';

@Component({
  selector: 'list-routes',
  templateUrl: './list-routes.component.html',
  styleUrls: ['./list-routes.component.css']
})
export class ListRoutesComponent implements OnInit {

  searchText: string = "";
  loading: boolean = false;
  routeMap = new Map<string, CapiRoute>();
  displayedColumns: string[] = ['id', 'endpoints'];
  dataSource: CapiRoute[] = [];
  apiDetails: Api = new Api();
  timeLeft: number = 60;
  interval: any;
  openCoverages = false;
  indexSelectedCoverage = 1;

  dataLoaded: boolean = false;
  showSpinner: boolean = true;
  endpointList: string[] = environment.capiEndpointList;

  constructor(private http: HttpClient) {
    UIkit.modal("detailsModal",);
  }

  ngOnInit(): void {
    this.iterateNodes();
  }

  getDetailsCall(routeId: string) {
    let normalizedRouteId = routeId.substring(0, routeId.lastIndexOf(":"));
    return this.http.get(this.endpointList[0] + environment.cachedApiEndpoint + normalizedRouteId);
  }

  getRoutesThreadInfoCall(endpoint: string) {
    return this.http.get(endpoint);
  }

  getDetails(routeId: string) {
    this.getDetailsCall(routeId)
      .subscribe((data: any) => {
        this.apiDetails = data;
        UIkit.modal("#detailsModal").show();
      });
  }

  iterateNodes() {
    let tempRouteList: CapiRoute[] = [];
    this.endpointList.forEach(node => {
      this.getRoutesThreadInfoCall(node + environment.allRoutesEndpoint)
      .subscribe((data: any) => {
        for(let idx in data) {
          var val = data[idx];
          var id = val.id;
          let existingRoute = tempRouteList.find(e => e.id === id);
          if(existingRoute === undefined) {
            existingRoute = new CapiRoute(id);
            existingRoute.exchangesFailed = val.details.failuresHandled;
            existingRoute.exchangesTotal = val.details.exchangesTotal;
            existingRoute.maxProcessingTime = val.details.maxProcessingTime;
            existingRoute.state = val.status;
            existingRoute.uptime = val.uptime;
            tempRouteList.push(existingRoute);
            this.routeMap.set(id, existingRoute);
          } else {
            existingRoute.exchangesFailed = existingRoute.exchangesFailed + val.details.failuresHandled;
            if(val.details.maxProcessingTime > existingRoute.maxProcessingTime) {
              existingRoute.maxProcessingTime = val.details.maxProcessingTime
            }
            existingRoute.exchangesTotal = existingRoute.exchangesTotal + val.details.exchangesTotal;
            existingRoute.maxProcessingTime = val.details.maxProcessingTime;
            existingRoute.state = val.status;
            existingRoute.uptime = val.uptime;
          }
        }
      });
    });
    this.dataSource = tempRouteList;
        this.dataSource.sort((a, b) => a.id > b.id ? 1 : -1)
        this.dataSource.forEach((_routes) => {
          _routes.isExpanded = false;
        });
    this.dataLoaded = true;
    this.showSpinner = false;
  }

  showDetails(route: CapiRoute) {
    if (!route.isExpanded) {
      this.loading = true;
      route.isExpanded = true;
      this.getDetails(route.id);
    } else {
      route.isExpanded = false;
    }
  }

  closeDetailsModal(route: CapiRoute) {
    route.isExpanded = false;
    UIkit.modal("#detailsModal").hide();
  }
}