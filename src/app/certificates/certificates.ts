import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Certificate } from '../model/certificate.model';
import UIkit from 'uikit';

@Component({
  selector: 'certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {

  certificates: Certificate[] = [];

  aliasToDelete: string = "";

  dataLoaded: boolean = false;
  showSpinner: boolean = true;

  capiEndpoint: string = localStorage.getItem("capiEndpoint")!;

  constructor(private http: HttpClient) {
    UIkit.modal("deleteModal",);
  }

  ngOnInit(): void {
    this.getCertificates();
  }

  getCertificatesCall() {
    let endpoint = localStorage.getItem("capiEndpoint");
    return this.http.get(endpoint + environment.certificatesEndpoint);
  }

  deleteCertificatesCall() {
    let endpoint = localStorage.getItem("capiEndpoint");
    return this.http.delete(endpoint + environment.certificatesEndpoint + "/" + this.aliasToDelete);
  }

  getCertificates() {
    this.getCertificatesCall()
      .subscribe((data: any) => {
        this.certificates = data;
        this.dataLoaded = true;
        this.showSpinner = false;
      });
  }

  openDeleteModal(certificate: Certificate) {
    console.log(certificate);
    this.aliasToDelete = certificate.alias;
    UIkit.modal("#deleteModal").show();
  }

  confirmDelete() {
    this.deleteCertificatesCall()
    .subscribe((data: any) => {
      this.getCertificatesCall()
      .subscribe((data: any) => {
        this.certificates = data;
        UIkit.modal("#deleteModal").hide();
      });
    });
  }
}