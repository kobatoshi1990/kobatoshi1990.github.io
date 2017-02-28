var myApp = angular.module('myApp', ['ngRoute', 'ngStorage']);


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


  // 【記事を想定】クリックした際にlocalStorageにしまい込む

  //$scope.countOne = $scope.$storage.x;
  $scope.clickOne = function(num){
    // 引数numとは data.idで、記事のid
    // 変数idは配列内のid、変数countは配列内のcount
    //【はじめてのクリック】配列内のidとnumがアンイコール → idに対してcount+1というセットを作成
    //【二度以上クリック】配列内のidとnumがイコール → idに対してカウント+1

    var id = $localStorage.id;
    var count = $localStorage.count;

    if($localStorage.aryCounter == null){
      //Lにハッシュがない→新たにハッシュを作成し、Lに保存
      // var aryCounter = {};
      // var cid = 'id_' + id;
      // console.dir( cid );
      // aryCounter = { cid : 1 };
      // $localStorage.aryCounter;
      //
      // console.dir( aryCounter );

    }else{
      //Lにハッシュがある→既存のハッシュを展開し、情報を付け加え、Lに保存
      console.log("テスト中...")

    }


    // if( id != num ){
    //   console.log("はじめてのクリック" + id + num);
    //
    // }else{
    //   console.log("二度目以上のクリック" + id + num);
    // }



    // $scope.$storage = $localStorage.$default({ id :0, num : 0 });
    // countNum = $scope.$storage.num + 1;
    // $scope.$storage.num = { id: num, count : countNum };
    // console.log( id );

    // 参考→ http://qiita.com/daikon_buu/items/e898eafe8cf05c8814a2

    // $scope.countOne = $scope.$storage.num;
    // console.log($scope.$storage.num);

  }
}]);









// ▼for Page
myApp.controller('pageController', ['$scope', '$http', '$routeParams', '$filter', 'jsonData', function ($scope, $http, $routeParams, $filter, jsonData) {

  // URLパラメータ処理
  $scope.num = $routeParams.num;




  jsonData.getData()
  .then(function(result){
    $scope.articleData = result.data.dataArticle;
    //console.log($scope.articleData);
  })
  .catch(function (err) {
     // 失敗した場合はエラーが吐く
      console.log(err);
  });




}]);
