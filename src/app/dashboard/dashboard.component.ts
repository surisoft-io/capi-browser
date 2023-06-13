import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    serverStatistics: any = "";
    capiStatistics: any = "";
    dataLoaded: boolean = false;
    showSpinner: boolean = true;
    capiBrowserEndpoint: string = environment.capiBrowserEndpoint;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.getCapiStatistics();
    }

    getStatisticsCall() {
        let endpoint = localStorage.getItem("capiEndpoint");
        return this.http.get(endpoint + environment.statisticsEndpoint);
    }

    getCapiStatisticsCall() {
        let endpoint = localStorage.getItem("capiEndpoint");
        return this.http.get(endpoint + environment.statisticsEndpoint);
    }

    getStatistics() {
        this.getStatisticsCall()
            .subscribe((data: any) => {
                this.serverStatistics = data.value;
                this.showSpinner = false;
                this.dataLoaded = true;
            });
    }

    getCapiStatistics() {
        this.getCapiStatisticsCall()
            .subscribe((data: any) => {
                this.capiStatistics = data;
                this.showSpinner = false;
                this.dataLoaded = true;
            });

    }
}