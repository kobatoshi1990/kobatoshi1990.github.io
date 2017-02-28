var myApp = angular.module('myApp', ['ngRoute', 'ngStorage', 'ngAnimate']);


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


// ▼ for Main
myApp.controller('mainController', ['$scope', '$http', '$localStorage', 'jsonData', function ($scope, $http, $localStorage, jsonData) {

  // get Data
  jsonData.getData()
  .then(function(result){
    $scope.articleData = result.data.dataArticle;
  })
  .catch(function (err) {
     // 失敗した場合はエラーが吐く
      console.log(err);
  });


  $scope.articleLimit = 50;

  // 【記事を想定】クリックした際にlocalStorageにしまい込む

    // 引数numとは data.idで、記事のid
    // 変数idは配列内のid、変数countは配列内のcount
    //【はじめてのクリック】配列内のidとnumがアンイコール → idに対してcount+1というセットを作成
    //【二度以上クリック】配列内のidとnumがイコール → idに対してカウント+1

    //var id = $scope.$storage.aryCounter.id;
    //var counter = $$scope.$storage.aryCounter.counter;

    //if($localStorage.aryCounter == null){
      //Lにハッシュがない→新たにハッシュを作成し、Lに保存
      // var aryCounter = {};
      // var cid = 'id_' + id;
      // console.dir( cid );
      // aryCounter = { cid : 1 };
      // $localStorage.aryCounter;
      //
      // console.dir( aryCounter );


}]);



// ▼for Ranking
myApp.controller('rankingController',['$scope', '$http', '$localStorage', 'jsonData', function ($scope, $http, $localStorage, jsonData){

  // get Data
  jsonData.getData()
  .then(function(result){
    $scope.articleData = result.data.dataArticle;
  })
  .catch(function (err) {
     // 失敗した場合はエラーが吐く
      console.log(err);
  });

  // 文字数制限
  $scope.articleLimit = 80;


}]);



// ▼for Page
myApp.controller('pageController', ['$scope', '$http', '$routeParams', '$filter', 'jsonData', function ($scope, $http, $routeParams, $filter, jsonData) {

  // URLパラメータ処理
  $scope.num = $routeParams.num;


  // 記事の書き出し
  jsonData.getData()
  .then(function(result){
    $scope.articleData = result.data.dataArticle;

    //console.log($scope.articleData);
    //console.log("id =" + $scope.articleData.id);
    //console.log("num =" + $scope.num);
  })
  .catch(function (err) {
     // 失敗した場合はエラーが吐く
      console.log(err);
  });

  $scope.pageFilter = function( value, index ){
    return value.id == $scope.num;
  }

  // localStorageに記事データを保存したい
  // $scope.$storage = $localStorage.$default({
  //   aryCounter: {
  //     id : '',
  //     counter : ''
  //   }
  // });
  //
  // $scope.$storage.aryCounter.id = num;
  // $scope.$storage.aryCounter.counter ++;
  // console.log($scope.$storage.aryCounter);




}]);
