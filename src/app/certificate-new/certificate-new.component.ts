import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: 'certificate-new',
  templateUrl: './certificate-new.component.html',
  styleUrls: ['./certificate-new.component.css']
})
export class CertificateNewComponent {

  certificateForm: FormGroup;

  constructor(private http: HttpClient, private router: Router) {
    this.certificateForm = new FormGroup({
      alias: new FormControl('', [Validators.required]),
      apiId: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    });
  }


  get f() {
    return this.certificateForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.certificateForm.patchValue({
        fileSource: file
      });
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('file', this.certificateForm.get('fileSource')?.value!);
    let alias = this.certificateForm.get('alias')?.value;
    let apiId = this.certificateForm.get('apiId')?.value;

    let endpoint = localStorage.getItem("capiEndpoint") + environment.certificatesEndpoint;
    this.http.post(endpoint + "/" + alias + "/" + apiId, formData)
      .subscribe(res => {
        this.router.navigate(['/certificates']);
      })
  }
}