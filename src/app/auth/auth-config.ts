import { AuthConfig } from "angular-oauth2-oidc";
import { environment } from "src/environments/environment";

export const authConfig: AuthConfig = {
  issuer: environment.authority,
  redirectUri: environment.redirectUri,
  clientId: environment.oidcClientId,
  scope: environment.scope,
  clearHashAfterLogin: false,
  strictDiscoveryDocumentValidation: false,
  requireHttps: false
};