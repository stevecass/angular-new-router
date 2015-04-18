##Angular with rails - one way to work

###Setup

In vendor/assets/javascripts, put files
* angular.js
* angular-resource.js
* router.es5.js 

Add 
```
//= require angular.js
//= require angular-resource.js
//= require router.es5.js
```

above ```require_tree .``` in application.js

In app/assets/javascripts create
app.js - declare your module here e.g.
```
angular.module('an-app', ['ngNewRouter', 'ngResource']);
angular.module('an-app').controller('AppController', ['$router', AppController]);

function AppController ($router) {
  $router.config([
    {path: '/', component: 'home' },
    {path: '/detail', component: 'detail' }
  ]);
}
```

controllers.js - controllers here (you could have >1 of these)
services.js - declare services here

Here's my example CatService:
```
angular.module('an-app').factory('CatService', function($resource) {
  return $resource('/cats/:id'); // Note the full endpoint address
});
```


As far as rails is concerned you have only one page - in our case it's the index action in HomeController

In config/routes.rb put 
```root 'home#index'```

In app/views/home/index.html.erb add
```
<div ng-app="an-app" ng-controller="AppController as app">
  <div ng-viewport>
  </div>
</div>
```


Then to add angular routes/components you can add to the route declarations in app.js

So e.g. add
```
    {path: '/mything', component: 'jimbo' },
```
in the routing block. Then angular will expect there to be a **public/components/jimbo/jimbo.html** template file and it will try to construct a controller called **JimboController**. The contents of the template file will go into the ng-viewport div in the single page.

### Example new route
The changes to add a new component/route called "sample" are visible in this commit https://github.com/stevecass/angular-new-router/commit/2ef0088e231d5082f99e76c47184b4b125d32817

Steps:
* Update the router config with ```{path: '/sample', component: 'sample' },```
* Implement a controller called SampleController
* Create a template file called (from rails app root) public/components/sample/sample.html

### Tips / gotchas
* Data you set on your SampleController as this.jimbo is available in your template as {{sample.jimbo}}
* If you use callbacks in your controllers (you probably will), remember to bind "this" to them so that you are setting data on the right object (example below).

Always bind this:
```
CatService.get({id:$routeParams.id}, function(data){
  this.cat = data;
}.bind(this));
```


