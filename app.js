var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'ngStorage', 'angular-toArrayFilter']);


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
  .when('/ranking',{
    templateUrl : 'pages/ranking.html',
    controller : 'rankingController'
  })
  .otherwise({
    redirectTo: '/'
  })
});

// For Json => Localhost
myApp.config(['$localStorageProvider',
    function ($localStorageProvider) {
        $localStorageProvider.setKeyPrefix('article_');
    }]);

//html5 mode
myApp.config(function($locationProvider){
  $locationProvider.html5Mode(true);
})


myApp.factory('registarJson', ['$resource', '$localStorage', function($resource, $localStorage){
  // $resource(ngResource)を使って読み込む
  var res = $resource('db.json');

  // $resourceは遅延実行なので$promiseを使ってデータを取得できるまで
  // 待ってから$localStorageへ保存
  var data = res.query();

  data.$promise.then(function(){
    $localStorage.$default(data); // localStorageの$defaultへ
  });

  // factoryサービスのreturn部
  return{
    all: function(){
      return $localStorage; // $localStorageを返す
    }
  };
}])






// ▼ for Main
myApp.controller('mainController', ['$scope', '$http', '$localStorage', 'registarJson', function ($scope, $http, $localStorage, registarJson) {

  $scope.articleLimit = 50;
  $scope.articleData = registarJson.all();
  console.log(  $scope.articleData );

}]);



// ▼for Ranking
myApp.controller('rankingController',['$scope', '$http', '$localStorage', function ( $scope, $http, $localStorage){

  // ローカルストレージ内を格納
  $scope.articleData = $localStorage;
  console.log($scope.articleData);

  // 文字数制限
  $scope.articleLimit = 180;


}]);



// ▼for Page
myApp.controller('pageController', ['$scope', '$http', '$routeParams', '$filter', '$localStorage', function ($scope, $http, $routeParams, $filter, $localStorage) {

  // URLパラメータ処理
  $scope.num = $routeParams.num;

  $scope.articleData = $localStorage;

  $scope.pageFilter = function( value, index ){
    return value.id == $scope.num;
  }


}]);
