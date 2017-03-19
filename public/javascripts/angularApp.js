/*jslint node:true */
'use strict';

// Initialize the application
var myApp = angular.module('nasaImageGallery', [ 'infinite-scroll' ]);
angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 250);

// Controller for the Application
myApp.controller('nasaImages', function ($scope, $http) {
    var api_key = "DEMO_KEY",
        cameraName = '',
        url = '';
    
    $scope.filterCameras = [
        {id: 0, name: 'All', camera: ''},
        {id: 1, name: 'Front Hazard Avoidance Camera', camera: 'fhaz'},
        {id: 2, name: 'Rear Hazard Avoidance Camera', camera: 'rhaz'},
        {id: 3, name: 'Mast Camera', camera: 'mast'},
        {id: 4, name: 'Chemistry and Camera Complex', camera: 'chemcam'},
        {id: 5, name: 'Navigation Camera', camera: 'navcam'}
    ];
    
    $scope.selectedCamera = '';
    
    $scope.loadingData = false;
    
    function pullCameraData() {
        if ($scope.selectedCamera === '') { return; }
        if ($scope.selectedCamera === 0) {
            $scope.loadingData = true;
            url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=" + api_key + "&jsonp=JSON_CALLBACK";
            $http.get(url).success(function (data) {
                $scope.response = data.photos;
                $scope.data = $scope.response.slice(0, 20);
                $scope.moreData = function () {
                    $scope.data = $scope.response.slice(0, $scope.data.length + 20);
                };
                $scope.loadingData = false;
            });
        } else {
            $scope.loadingData = true;
            cameraName = $scope.filterCameras[$scope.selectedCamera].camera;
            url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=" + cameraName + "&api_key=" + api_key + "&jsonp=JSON_CALLBACK";
            $http.get(url).success(function (data) {
                $scope.response = data.photos;
                $scope.data = $scope.response.slice(0, 20);
                $scope.moreData = function () {
                    $scope.data = $scope.response.slice(0, $scope.data.length + 20);
                };
                $scope.loadingData = false;
            });
        }
    }
    
    $scope.chooseCamera = function () {
        pullCameraData();
    };
    
    pullCameraData();
});