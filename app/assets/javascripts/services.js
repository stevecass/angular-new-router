angular.module('an-app').factory('CatService', function($resource) {
  return $resource('/cats/:id'); // Note the full endpoint address
});


