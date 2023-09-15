export const environment = {
  production: false,
  appName: "Capi Browser",
  
  cachedApiEndpoint: "/manager/cached/",
  allRoutesEndpoint: "/manager/stats/routes",
  certificatesEndpoint: "/manager/certificate",
  statisticsEndpoint: "/manager/info",
  applicationProtected: false,
  certificateManagementEnabled: false,
  authority: "https://domain/oauth2",
  oidcClientId: "XXX",
  redirectUri: "http://localhost:4200",
  scope: "openid profile email",
  
  capiBrowserEndpoint: "http://localhost:4200",

  capiEndpointList: [
    "/n1",
    "/n2",
    "/n3",
    "/n4",
    "/n5"
  ]
};