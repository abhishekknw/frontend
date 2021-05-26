angular.module('machadaloPages').filter('replace', [function () {
    return function (input, from, to) {

        if (input === undefined) {
            return;
        }
        var regex = new RegExp(from, 'g');
        return input.replace(regex, to);
    };
}]).controller('covidCylinderCtrl',
    ['$scope', '$rootScope', '$window', '$location', 'AuthService', 'suspenseLeadService', '$state', 'userService', 'constants', 'AuthService', 'vcRecaptchaService',
        function ($scope, $rootScope, $window, $location, AuthService, suspenseLeadService, $state, userService, constants, AuthService, vcRecaptchaService) {
            AuthService.Clear();

            var url = $location.url().split("/");
            $scope.categorys = ['Hospital Beds', 'Cylinder'];
            //let cat = url[1].substring(0, 1).toUpperCase() + url[1].substring(1);
            // $scope.selectedCategory = cat;
            $scope.selectedCategory = 'Cylinder';
            $scope.loading = true;
            $scope.changeWeb = function () {
                if ($scope.selectedCategory == 'Hospital Beds') {
                    $location.path("/hospitalbeds/covidhelpdesk/");
                }
            }
            setInterval(function () {
                AuthService.getAllState()
                    .then(function onSuccess(response) {
                        if (response && response.data && response.data.data) {
                            $scope.stateData = response.data.data;
                            localStorage.setItem("stateData", JSON.stringify($scope.stateData));
                        } else {
                            console.log('error', response);
                        }
                    }).catch(function onError(response) {
                        console.log(response);
                    })

                AuthService.getAllCity()
                    .then(function onSuccess(response) {
                        if (response && response.data && response.data.data) {
                            $scope.cityData = response.data.data;
                            localStorage.setItem("cityData", JSON.stringify($scope.cityData));
                        } else {
                            console.log('error', response);
                        }
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }, 1800000)
            //  1800000
            $scope.getStateCity = function () {
                let localState = localStorage.getItem("stateData");
                // if (localStorage.getItem("stateData") && localStorage.getItem("stateData") != undefined) {
                if (localState && localState != 'undefined') {

                    $scope.stateData = JSON.parse(localState);
                } else {
                    AuthService.getAllState()
                        .then(function onSuccess(response) {
                            if (response && response.data && response.data.data) {
                                $scope.stateData = response.data.data;
                                localStorage.setItem("stateData", JSON.stringify($scope.stateData));
                            } else {
                                console.log('error', response);
                            }
                        }).catch(function onError(response) {
                            console.log(response);
                        })
                }
                let localCity = localStorage.getItem("cityData");
                if (localCity && localCity != 'undefined') {
                    $scope.cityData = JSON.parse(localCity);
                } else {
                    AuthService.getAllCity()
                        .then(function onSuccess(response) {
                            if (response && response.data && response.data.data) {
                                $scope.cityData = response.data.data;
                                localStorage.setItem("cityData", JSON.stringify($scope.cityData));
                            } else {
                                console.log('error', response);
                            }
                        }).catch(function onError(response) {
                            console.log(response);
                        })
                }
            }

            $scope.getCity = function () {
                $scope.cityList = [];
                $scope.selectedCityName = null;
                $scope.district_code = null;
                var localindex_index = $scope.stateData.map(function (el) {
                    return el.state_code;
                }).indexOf($scope.state_code);
                if (localindex_index != -1) {
                    $scope.selectedStateName = $scope.stateData[localindex_index].name;
                }
                $scope.cityList = $scope.cityData[$scope.state_code];
            }

            $scope.getCylinderList = function () {
                var localindex_index = $scope.cityList.map(function (el) {
                    return el.district_code;
                }).indexOf($scope.district_code);
                if (localindex_index != -1) {
                    $scope.selectedCityName = $scope.cityList[localindex_index].district_name;
                }
                $scope.loading = null;
                let param = {
                    //state: $scope.state_code,
                    city: $scope.selectedCityName,
                }
                $scope.cylinderDetailData = [];
                AuthService.getAllCylinder(param)
                    .then(function onSuccess(response) {
                        $scope.loading = response;
                        if(response.data && response.data.data && !response.data.data.data){
                            $scope.cylinderDetailData = response.data.data;
                        }
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }
        }]);

