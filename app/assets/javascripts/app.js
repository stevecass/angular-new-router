angular.module('an-app', ['ngNewRouter', 'ngResource']);
angular.module('an-app').controller('AppController', ['$router', AppController]);

function AppController ($router) {
  $router.config([
    {path: '/', component: 'home' },
    {path: '/detail', component: 'detail' }
  ]);
}
