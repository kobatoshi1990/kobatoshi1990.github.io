var myApp = angular.module('myApp', ['ngRoute']);

// Routing
myApp.config(function($routeProvider){

  $routeProvider
  .when('/', {
    templateUrl : 'pages/home.html',
    controller : 'mainController'
  })
  .when('/pages/:num', {
    templateUrl : 'pages/page.html',
    controller : 'pageController'
  })
  .otherwise({
    redirectTo: '/'
  })

});


//  Value for getJson
// myApp.value('getJson', ['$http','$scope', function( $http, $scope ){
//
//   $http.get('db.json')
//     .then(function(result){
//       $scope.articleData = result.data.data;
//     })
//
// }]);


// Controller for Main
myApp.controller('mainController', ['$scope', '$http', function ($scope, $http) {


  // Jsonを取得
  $http.get('db.json')
      .then(function (result) {
        // 成功した場合、データを$scope.articleDataに入れる
          $scope.articleData = result.data.data;
          //console.log($scope.articleData);
      })
      .catch(function (err) {
         // 失敗した場合はエラーが吐く
          console.log(err);
      });

}]);

// Controller for Page
myApp.controller('pageController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

  // URLパラメータ処理
  $scope.num = $routeParams.num;

  //Json取得
  $http.get('db.json')
      .then(function (result) {
        // 成功した場合、データを$scope.articleDataに入れる
          $scope.articleData = result.data;
          console.log($scope.articleData);
      })
      .catch(function (err) {
        // 失敗した場合はエラーが吐く
          console.log(err);
      });

}]);
