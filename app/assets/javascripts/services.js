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

  authService.logout = function() {
    return $http.get('/logout')
    .then(function(response){
      Session.destroy();
    });
  };

  authService.login = function(credentials) {
    return $http.post('/session', credentials)
      .then(function(response){
        if (response.data.userId > 0) {
          Session.create(response.data);
        }
      })
      .catch(function(response){
        console.log('caught', response);
      });
  };

  authService.getCurrentUser = function() {
    return $http.get('/session')
    .then(function(response){
      if (response.data.userId > 0) {
        Session.create(response.data);
      } else {
        Session.destroy();
      }
    }.bind(this))
    .catch(function(response){
      console.log('caught', response);
    });
    ;
  };

  return authService;
});

