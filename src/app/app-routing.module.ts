import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificateNewComponent } from './certificate-new/certificate-new.component';
import { CertificatesComponent } from './certificates/certificates';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListRoutesComponent } from './list-routes/list-routes.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  { path: 'list-routes', component: ListRoutesComponent, canActivate: [AuthGuard] },
  { path: 'certificates', component: CertificatesComponent, canActivate: [AuthGuard] },
  { path: 'certificate-new', component: CertificateNewComponent, canActivate: [AuthGuard] },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
