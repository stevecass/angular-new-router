angular.module('an-app')
  .controller('HomeController', [ 'CatService', function (CatService) {
    this.name = 'I am the home controller';

    CatService.query(function(data){
      console.log(data);
      this.cats = data;
    }.bind(this));

}]);

angular.module('an-app')
  .controller('DetailController', ['$routeParams', 'CatService', function ($routeParams, CatService) {

    CatService.get({id:$routeParams.id}, function(data){
      this.cat = data;
    }.bind(this));

}]);

angular.module('an-app').controller('SampleController', [function(){
  this.user_message = "I am user_message from SampleController. SampleController declares no dependencies.";
}]);