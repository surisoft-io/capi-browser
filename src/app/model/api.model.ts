import { Mapping } from "./mapping.model";

export class Api {
    id: string = "";
    name: string = "";
    context: string = "";
    mappingList: Mapping[] = [];
    roundRobinEnabled: boolean = false;
    failoverEnabled: boolean = false;
    matchOnUriPrefix: boolean = true;
    httpProtocol: string = "";
}
