export const environment = {
  production: true,
  appName: "Capi Browser",
  
  cachedApiEndpoint: "/manager/cached/",
  allRoutesEndpoint: "/manager/stats/routes",
  certificatesEndpoint: "/manager/certificate",
  statisticsEndpoint: "/manager/info",
  applicationProtected: false,
  certificateManagementEnabled: false,
  authority: "https://domain/oauth2",
  oidcClientId: "XXX",
  redirectUri: "https://ccncapi1.cc.cec.eu.int:8083",
  scope: "openid profile email",
  capiBrowserEndpoint: "https://ccncapi1.cc.cec.eu.int:8083",

  capiEndpointList: [
    "https://ccncapi1.cc.cec.eu.int:8380",
    "https://ccncapi2.cc.cec.eu.int:8380",
    "https://ccncapi3.cc.cec.eu.int:8380",
    "https://ccncapi4.cc.cec.eu.int:8380",
    "https://ccncapi5.cc.cec.eu.int:8380"
  ]
};
