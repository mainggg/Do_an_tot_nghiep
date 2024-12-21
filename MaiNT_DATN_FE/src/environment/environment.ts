export const environment = {
  production: false,
  api_end_point: 'http://localhost:9090',
  // api_end_point: 'http://192.168.1.115:10068',
  api_end_point_preview: 'http://localhost:9090/assets',
  api_end_point_download: 'http://localhost:9090/api/assets',
  auth_api: '/api/auth/',
  keycloak: {
    issuer: 'https://sso.xfactory.vn/auth/',
    realm: 'dev',
    clientId: 'angular-client',
  },
  BASE_API_URI: {
    NOTIFICATION_SERVICE: 'http://dev.apiitc.xfactory.vn/api/',
  },
};
