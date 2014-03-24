'use strict';
angular.module('app', [
  'ui.router',
  'mv.resource.admin',
  'mv.managers.User',
  'mv.resource.Session',
  'mv.notification'
]);

angular.module('app').config(function($stateProvider, $locationProvider, $urlRouterProvider, RestangularProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('/', { url: '/', templateUrl: '/partials/main/main', controller: 'mvMainCtrl'})
    .state('/admin', {
      url: '/admin',
      templateUrl: '/partials/admin/admin',
      controller: 'mvAdminCtrl',
      resolve: {
        auth: function (mvIdentity, $q) {
          if (mvIdentity.isAuthorized('admin')) {
            return true;
          } else {
            return $q.reject('NOT_AUTHORIZED');
          }
        }
      }
    });
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRestangularFields({ id: '_id' });
});

angular.module('app').run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (e, to, toParams, from, fromParams, err) {
    if (err === 'NOT_AUTHORIZED') $state.go('/');
  });
});

