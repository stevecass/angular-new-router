angular.module('an-app').controller('AppController', ['AuthService', 'Session', '$router', function AppController (AuthService, Session, $router) {
  $router.config([
    {path: '/', component: 'home' },
    {path: '/sample', component: 'sample' },
    {path: '/detail/:id', component: 'detail' }
  ]);

  AuthService.getCurrentUser()
  .then(function(response) {
    this.rails_current_user = Session.userData;
  }.bind(this));

  this.logout = function () {
    AuthService.logout()
    .then(function(){
      this.rails_current_user = Session.userData;
    }.bind(this));
  };

  this.loginform = {};

  this.logUserIn = function() {
    var credentials = {
      username: this.loginform.username,
      password: this.loginform.password
    };
    AuthService.login(credentials)
    .then(function(){
      if (Session.userData) {
        this.rails_current_user = Session.userData;
        this.loginform = {};
      }
    }.bind(this));
  };


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
      CatService.update(this.cat, function(data){
        this.cat = data;
        jQuery('#single-kitty-detail').fadeIn(50).fadeOut(50).fadeIn(50);
      }.bind(this));
    };

}]);

angular.module('an-app').controller('SampleController', [function(){
  this.user_message = "I am user_message from SampleController. SampleController declares no dependencies.";
}]);