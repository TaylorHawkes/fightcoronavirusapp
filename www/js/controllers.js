angular.module('starter.controllers', []) 
.controller('DashCtrl', function($scope) {})
.controller('PreventCtrl', function($scope) { })
.controller('SupportCtrl', function($scope) {

    })
.controller('ReportCtrl', function($scope,$http,$rootScope) {

    $scope.user_id="test_device";

   $scope.openCDCSteps=function(){
       if(cordova){
            var ref = cordova.InAppBrowser.open('https://www.cdc.gov/coronavirus/2019-ncov/about/steps-when-sick.html', '_system');
        }
   }
   $scope.reportSick=function(level){
     // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    //
    var onSuccess = function(position) {
            var data={};
                data.sick_id = level;
                data.lat = position.coords.latitude.toFixed(8);
                data.lng= position.coords.longitude.toFixed(8);
                data.user_id= $rootScope.user_id;
             $http.post("http://www.fightcoronavirusapp.com/api/report_sick.php", data).then(function(response) {
                $scope.doneReporting= true;
            }, function (response){});
    
    };

    function onError(error) {
            var data={};
                data.sick_id = level;
                //data.lat = position.coords.latitude.toFixed(8);
                //data.lng= position.coords.longitude.toFixed(8);
                data.user_id= $rootScope.user_id;
         $http.post("http://www.fightcoronavirusapp.com/api/report_sick.php", data).then(function(response) {
                $scope.doneReporting= true;
            }, function (response){});
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
   }

    $scope.showMap = false;
    $scope.hasMapBeenLoaded = false;

    $scope.doHideMap=function(){
        $scope.showMap = false;
     }
    $scope.doShowMap=function(){
        $scope.showMap = true;
        if(!$scope.hasMapBeenLoaded){
            $scope.initMapAndGetPoints();
        }
        $scope.hasMapBeenLoaded = true;
    }

    $scope.initMapAndGetPoints=function(){

        var uluru = {lat: 39.908178, lng:-105.114872};
        var map = new google.maps.Map(document.getElementById('map'), { zoom: 4, center: uluru });
         $http.get("http://www.fightcoronavirusapp.com/api/get_points.php").then(function(points_data) {
            var points= points_data.data; 
            for(var i=0;i<points.length;i++){
                        var north = points[i].north;
                        var south = points[i].south;
                        var east = points[i].east;
                        var west= points[i].west;
                        var color= points[i].color;
                        var rectangle = new google.maps.Rectangle({
                          strokeColor: color,
                          strokeOpacity: 0.8,
                          strokeWeight: 2,
                          fillColor: color,
                          fillOpacity: 0.35,
                          map: map,
                          bounds: { north: north, south: south,east:east,west:west }
                        });

            }
        });
    }
    var isIOS = ionic.Platform.isIOS();
    var screenWidth = isIOS
      ? window.screen.width
      : window.innerWidth * window.devicePixelRatio;
    var screenHeight = isIOS
      ? window.screen.height
      : window.innerHeight * window.devicePixelRatio;

      document.getElementById("show_map_holder").style.height=(screenHeight-20)+"px";
     // console.log(screenHeight);

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
