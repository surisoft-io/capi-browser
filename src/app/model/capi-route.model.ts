import { CapiEndpoint } from "./capi-endpoint.model";


export class CapiRoute {
    id: string;
    isExpanded: boolean = false;
    endpoints: CapiEndpoint[] = [];
    uptime: string = "";
    exchangesCompleted: number = -1;
    exchangesFailed: number = -1;
    exchangesInflight: number = -1;
    exchangesTotal: number = -1;

    lastProcessingTime: number = -1;
    maxProcessingTime: number = -1;

    state: string = "";

    constructor(id: string) {
        this.id = id;
    }
 }