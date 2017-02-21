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

//html5 mode
myApp.config(function($locationProvider){
  $locationProvider.html5Mode(true);
})


//  Value for getJson
myApp.factory('jsonData', function ( $http ) {

  return{
    getData: function(){
      //データアクセス
      return $http.get('db.json')
        .then(function(result){
          //データ取得
          return result
        })
        .catch(function (err) {
           // 失敗した場合はエラーが吐く
            console.log(err);
        });
    }
  }
});


// Controller for Main
myApp.controller('mainController', ['$scope', '$http', 'jsonData', function ($scope, $http, jsonData) {

  jsonData.getData()
  .then(function(result){
    $scope.articleData = result.data.dataArticle;
  })
  .catch(function (err) {
     // 失敗した場合はエラーが吐く
      console.log(err);
  });
}]);

// Controller for Page
myApp.controller('pageController', ['$scope', '$http', '$routeParams', '$filter', 'jsonData', function ($scope, $http, $routeParams, $filter, jsonData) {

  // URLパラメータ処理
  $scope.num = $routeParams.num;


  jsonData.getData()
  .then(function(result){
    $scope.articleData = result.data.dataArticle;
    console.log($scope.articleData);
  })
  .catch(function (err) {
     // 失敗した場合はエラーが吐く
      console.log(err);
  });




}]);
