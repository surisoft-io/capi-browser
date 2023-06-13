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

  endpoint: string = localStorage.getItem("capiEndpoint")!;

  constructor(private http: HttpClient) {
    UIkit.modal("detailsModal",);
  }

  ngOnInit(): void {
    this.getRoutesThreadInfo();
  }

  getDetailsCall(routeId: string) {
    let normalizedRouteId = routeId.substring(0, routeId.lastIndexOf(":"));
    return this.http.get(this.endpoint + environment.cachedApiEndpoint + normalizedRouteId);
  }

  getRoutesThreadInfoCall() {
    let endpoint = localStorage.getItem("capiEndpoint");
    return this.http.get(endpoint + environment.allRoutesEndpoint);
  }

  getDetails(routeId: string) {
    this.getDetailsCall(routeId)
      .subscribe((data: any) => {
        this.apiDetails = data;
        UIkit.modal("#detailsModal").show();
      });
  }

  getRoutesThreadInfo() {
    let tempRouteList: CapiRoute[] = [];
    this.getRoutesThreadInfoCall()
      .subscribe((data: any) => {
        for(let idx in data) {
          var val = data[idx];
          var id = val.id;
          var route = new CapiRoute(id);
          route.exchangesFailed = val.details.failuresHandled;
          route.exchangesInflight = val.details.exchangesInflight;
          route.exchangesTotal = val.details.exchangesTotal;
          route.lastProcessingTime = val.details.lastProcessingTime;
          route.maxProcessingTime = val.details.maxProcessingTime;
          route.state = val.status;
          route.uptime = val.uptime;
          this.routeMap.set(id, route);
          tempRouteList.push(route);
        }
        this.dataSource = tempRouteList;
        this.dataSource.sort((a, b) => a.id > b.id ? 1 : -1)
        this.dataSource.forEach((_routes) => {
          _routes.isExpanded = false;
        });
        this.dataLoaded = true;
        this.showSpinner = false;
      });
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