angular.module('an-app', ['ngNewRouter'])
  .controller('AppController', ['$router', AppController]);

function AppController ($router) {
  $router.config([
    {path: '/', component: 'home' },
    {path: '/detail', component: 'detail' }
  ]);
}
