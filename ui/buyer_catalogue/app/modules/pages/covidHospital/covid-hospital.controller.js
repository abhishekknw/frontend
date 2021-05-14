angular.module('machadaloPages').filter('replace', [function () {
    return function (input, from, to) {

        if (input === undefined) {
            return;
        }
        var regex = new RegExp(from, 'g');
        return input.replace(regex, to);
    };
}]).controller('covidHospitalCtrl',
    ['$scope', '$rootScope', '$window', '$location', 'AuthService', 'suspenseLeadService', '$state', 'userService', 'constants', 'AuthService', 'vcRecaptchaService',
        function ($scope, $rootScope, $window, $location, AuthService, suspenseLeadService, $state, userService, constants, AuthService, vcRecaptchaService) {
            AuthService.Clear();

            // $scope.error = false;
            // $scope.success = false;

            // $scope.resetPassword = function () {
            //     $scope.loadingSpinner = true;
            //     var url = $location.host();
            //     $scope.host = url;

            //     AuthService.ForgotPassword($scope.userEmail, $scope.host, $location.protocol(), function (response) {
            //         $scope.loadingSpinner = false;
            //         if (response.status == 200) {
            //             swal("Success!", response.msg, constants.success);
            //             $scope.success = response.msg;
            //             $scope.error = false
            //         } else {
            //             if (response.data.data.general_error) {
            //                 swal("Error!", response.data.data.general_error, constants.error);
            //             }
            //             $scope.error = response.message;
            //             $scope.success = false;
            //         }
            //     });
            // }
            var url = $location.url().split("/");
            // $scope.categorys = ['Beds', 'Hospitals'];
            $scope.categorys = ['Hospital Beds'];
            let cat = url[1].substring(0, 1).toUpperCase() + url[1].substring(1);
            // $scope.selectedCategory = cat;
            $scope.selectedCategory = 'Hospital Beds';
            $scope.loading = true;

            setInterval(function () {
                suspenseLeadService.getAllState()
                    .then(function onSuccess(response) {
                        $scope.stateData = response.data.state;
                        localStorage.setItem("stateData", JSON.stringify($scope.stateData));
                    }).catch(function onError(response) {
                        console.log(response);
                    })
                // suspenseLeadService.getAllCity()
                //     .then(function onSuccess(response) {
                //         $scope.cityData = response.data.city;
                //     }).catch(function onError(response) {
                //         console.log(response);
                //     })
            }, 1800000)

            $scope.getState = function () {
                if (!localStorage.getItem("stateData")) {
                    AuthService.getAllState()
                        .then(function onSuccess(response) {
                            $scope.stateData = response.data.data;
                            localStorage.setItem("stateData", JSON.stringify($scope.stateData));
                        }).catch(function onError(response) {
                            console.log(response);
                        })
                } else {
                    $scope.stateData = JSON.parse(localStorage.getItem("stateData"));
                }
            }
            $scope.getCity = function () {
                $scope.selectedCityName = null;
                var localindex_index = $scope.stateData.map(function (el) {
                    return el.state_code;
                }).indexOf($scope.state_code);
                if (localindex_index != -1) {
                    $scope.selectedStateName = $scope.stateData[localindex_index].name;
                }
                AuthService.getAllCity($scope.state_code)
                    .then(function onSuccess(response) {
                        $scope.cityData = response.data.data;
                    }).catch(function onError(response) {
                        console.log(response);
                    })
                $scope.getBeds();
            }
            // $scope.totalOxyzenBeds = 0;
            // $scope.totalNonOxyzenBeds = 0;
            // $scope.totalICUBeds = 0;
            // $scope.totalVentilatorsBeds = 0;
            // $scope.totalNonVentilatorsBeds = 0;
            // $scope.totalBeds = 0;
            $scope.totalAvailableBeds = 0;
            $scope.totalHospitalBeds = 0;
            $scope.getBeds = function () {
                $scope.loading = null;
                let param = {
                    state: $scope.selectedStateName,
                    city: $scope.selectedCityName
                }

                // suspenseLeadService.getAllBeds()
                // .then(function onSuccess(response) {
                //     $scope.bedsData = response.data;
                // }).catch(function onError(response) {
                //     console.log(response);
                // })
                $scope.notAvailableCount = 0;
                AuthService.getAllBeds(param)
                    .then(function onSuccess(response) {
                        $scope.loading = response;
                        $scope.hospitalDetailData = response.data.data;
                        $scope.resourcesTypeData = [];
                        $scope.totalAvailableBeds = 0;
                        $scope.totalHospitalBeds = 0;

                        if ($scope.hospitalDetailData.length > 0) {
                            for (let i in $scope.hospitalDetailData) {
                                let hospitalData = $scope.hospitalDetailData[i].hospital_data;
                                if (hospitalData.length > 0) {
                                    for (let j in hospitalData) {
                                        let resourcesData = hospitalData[j].resources;
                                        let checkAvailable = false;
                                        if (resourcesData.length > 0) {
                                            $scope.AvailableofBedsinHospital = 0;
                                            for (let k in resourcesData) {

                                                if (resourcesData[k].quantity < 0) {
                                                    $scope.hospitalDetailData[i].hospital_data[j].resources[k].quantity = 0;
                                                    resourcesData[k].quantity = 0;
                                                }
                                                if (resourcesData[k].totalQuantity < 0) {
                                                    $scope.hospitalDetailData[i].hospital_data[j].resources[k].totalQuantity = 0;
                                                    resourcesData[k].totalQuantity = 0;
                                                }

                                                $scope.AvailableofBedsinHospital = $scope.AvailableofBedsinHospital + resourcesData[k].quantity
                                                $scope.hospitalDetailData[i].AvailableofBedsinHospital = $scope.AvailableofBedsinHospital;
                                                if (resourcesData[k].quantity && resourcesData[k].quantity > 0) {
                                                    checkAvailable = true;
                                                }

                                                if ($scope.resourcesTypeData.length > 0) {
                                                    var localindex_index = $scope.resourcesTypeData.map(function (el) {
                                                        return el.resourceType;
                                                    }).indexOf(resourcesData[k].resourceType);
                                                    if (localindex_index != -1) {
                                                        $scope.resourcesTypeData[localindex_index].totalQuantity = $scope.resourcesTypeData[localindex_index].totalQuantity + resourcesData[k].totalQuantity;
                                                        $scope.resourcesTypeData[localindex_index].quantity = $scope.resourcesTypeData[localindex_index].quantity + resourcesData[k].quantity;
                                                    }
                                                    if (localindex_index == -1) {
                                                        $scope.resourcesTypeData.push({
                                                            'resourceType': resourcesData[k].resourceType,
                                                            'totalQuantity': resourcesData[k].totalQuantity,
                                                            'quantity': resourcesData[k].quantity,
                                                        })
                                                    }
                                                } else {
                                                    $scope.resourcesTypeData.push({
                                                        'resourceType': resourcesData[k].resourceType,
                                                        'totalQuantity': resourcesData[k].totalQuantity,
                                                        'quantity': resourcesData[k].quantity,
                                                    })
                                                }
                                                if (resourcesData[k].quantity) {
                                                    $scope.totalAvailableBeds = $scope.totalAvailableBeds + resourcesData[k].quantity;
                                                }
                                                if (resourcesData[k].totalQuantity) {
                                                    $scope.totalHospitalBeds = $scope.totalHospitalBeds + resourcesData[k].totalQuantity;
                                                }

                                                if (resourcesData.length - 1 == k && checkAvailable == false) {
                                                    $scope.notAvailableCount = ($scope.notAvailableCount + 1);
                                                }

                                            }

                                        }
                                    }
                                }
                            }
                        }
                        $scope.totalAvailableCountsData = $scope.hospitalDetailData.length - $scope.notAvailableCount;
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }
            $scope.totalAvailableCountsData = 0;
            // $scope.getTotal = function(){
            //     var total = 0;
            //     for(var i = 0; i < $scope.resourcesTypeData.length; i++){
            //         total = total + $scope.resourcesTypeData[i].quantity;
            //     }
            //     return total;
            // }
        }]);

            // angular.filter('replace', [function () {
            //     return function (input, from, to) {

            //       if(input === undefined) {
            //         return;
            //       }
            //       var regex = new RegExp(from, 'g');
            //       return input.replace(regex, to);
            //     };


            // }]);