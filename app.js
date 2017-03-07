var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'ngStorage', 'angular-toArrayFilter', 'ngAnimate']);


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
  .when('/recommend',{
    templateUrl : 'pages/recommend.html',
    controlelr : 'recommendController'
  })
  .otherwise({
    redirectTo: '/'
  })
});

//html5 mode
myApp.config(function($locationProvider){
  $locationProvider.html5Mode(true);
})


// JsonをLocalStorageに入れる
myApp.config(['$localStorageProvider',
    function ($localStorageProvider) {
        $localStorageProvider.setKeyPrefix('article_');
    }]);
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






// ▼ Main Controller
myApp.controller('mainController', ['$scope', '$http', '$localStorage', 'registarJson', function ($scope, $http, $localStorage, registarJson) {

  $scope.articleLimit = 50;
  // $scope.articleData = registarJson.all();

  $scope.articleData = $localStorage;
  console.log($scope.articleData);
  console.log($localStorage);


  // if( $localStorage = null ){
  //   $scope.articleData = registarJson.all();
  //   console.log("a");
  // }else{
  //   $scope.articleData = $localStorage;
  //   console.log("b");
  // }

}]);



// ▼ Ranking Controller
myApp.controller('rankingController',['$scope', '$http', '$localStorage', function ( $scope, $http, $localStorage){

  // ローカルストレージ内のデータを格納
  $scope.articleData = $localStorage;

  // 文字数制限
  $scope.articleLimit = 80;

}]);



// ▼ Page Controller
myApp.controller('pageController', ['$scope', '$http', '$routeParams', '$filter', '$localStorage', function ($scope, $http, $routeParams, $filter, $localStorage) {

  // URLパラメータ処理
  $scope.num = $routeParams.num;

  // ローカルストレージ内のデータを格納
  $scope.articleData = $localStorage;

  $scope.pageFilter = function( value, index ){
    return value.id == $scope.num;
  }

}]);
