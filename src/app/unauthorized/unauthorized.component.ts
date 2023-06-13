import { Component } from "@angular/core";
import { AppComponent } from "../app.component";

@Component({
    selector: 'unauthorized',
    templateUrl: './unauthorized.component.html',
    styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {
    constructor(private appComponent: AppComponent) {}

    login() {
        this.appComponent.handleLogin();
    }
}