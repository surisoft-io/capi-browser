import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    serverStatistics: any = "";
    //capiStatistics: any = "";
    dataLoaded: boolean = false;
    showSpinner: boolean = true;
    
    capiBrowserEndpoint: string = environment.capiBrowserEndpoint;
    capiEndpointList: string[] = environment.capiEndpointList;

    //uptimeList: string[] = [];
    //totalRoutesList: number[] = [];

    capiStatisticsList: any[] = [];

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.getCapiStatistics();
    }

    /*getStatisticsCall() {
        let endpoint = localStorage.getItem("capiEndpoint");
        return this.http.get(endpoint + environment.statisticsEndpoint);
    }*/

    getCapiStatisticsCall(node: string) {
        return this.http.get(node + environment.statisticsEndpoint);
    }

    /*getStatistics() {
        this.getStatisticsCall()
            .subscribe((data: any) => {
                this.serverStatistics = data.value;
                this.showSpinner = false;
                this.dataLoaded = true;
            });
    }*/

    getCapiStatistics() {
        this.capiEndpointList.forEach(node => {
            this.getCapiStatisticsCall(node)
            .subscribe((data: any) => {
                data.node = node;
                data.totalRoutes = (data.totalRoutes -1) / 2;
                //this.uptimeList.push(data.uptime);
                //this.totalRoutesList.push();
                //this.capiStatistics = data;
                this.capiStatisticsList.push(data);
            });
        });
        this.showSpinner = false;
        this.dataLoaded = true;
    }
}