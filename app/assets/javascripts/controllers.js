angular.module('an-app')
  .controller('HomeController', [function () {
    this.name = 'I am the home controller';
}]);

angular.module('an-app')
  .controller('DetailController', [function () {
    this.some_data = "I am some data";
}]);
