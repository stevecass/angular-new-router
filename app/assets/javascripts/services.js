/*
  The {id: '@id'} means use the id of the passed object to make the url.
  The extra update method is needed because ngResource by default provides only
  .save which is a POST. Rails expects post for create and PUT/PATCH for update.
*/
angular.module('an-app').factory('CatService', function($resource) {
  return $resource('/cats/:id', {id: '@id'},
    {
      'update': { method:'PUT' }
    }
  );
});

angular.module('an-app').service('Session', function () {
  this.create = function (userData) {
    this.userData = userData;
  };
  this.destroy = function () {
    this.userData = null;
  };
});

angular.module('an-app').factory('AuthService', function(Session, $http) {
  var authService = {};

  authService.login = function(credentials) {
    return $http.post('/session', credentials)
      .then(function(response){
        console.log('then', response);
        Session.create(response.data);
      })
      .catch(function(response){
        console.log('catch', response);
      });
  };

  authService.getCurrentUser = function() {
    return $http.get('/session');
  }
  return authService;
});

