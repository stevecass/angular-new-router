angular.module('an-app').controller('AppController', ['AuthService', '$router', function AppController (AuthService, $router) {
  $router.config([
    {path: '/', component: 'home' },
    {path: '/sample', component: 'sample' },
    {path: '/detail/:id', component: 'detail' }
  ]);

  AuthService.getCurrentUser()
  .then(function(response) {
    this.rails_current_user = response.data;
  }.bind(this));
}]);

angular.module('an-app')
  .controller('HomeController', ['CatService', function (CatService) {
    this.name = 'I am the home controller';
    CatService.query(function(data){
      this.cats = data;
    }.bind(this));
  }]);

angular.module('an-app')
  .controller('DetailController', ['$routeParams', 'CatService', function ($routeParams, CatService) {

    CatService.get({id:$routeParams.id}, function(data){
      this.cat = data;
    }.bind(this));

    this.saveKitty = function() {
      CatService.update(this.cat)
      .then(function(data) {
        this.cat = data;
      }.bind(this));
    };

}]);

angular.module('an-app').controller('SampleController', [function(){
  this.user_message = "I am user_message from SampleController. SampleController declares no dependencies.";
}]);