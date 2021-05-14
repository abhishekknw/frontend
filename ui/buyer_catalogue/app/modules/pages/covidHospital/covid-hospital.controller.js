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
            $scope.categorys = ['Beds', 'Hospital'];
            let cat = url[1].substring(0, 1).toUpperCase() + url[1].substring(1);
            $scope.selectedCategory = cat;
            // setInterval(function () {
            //     suspenseLeadService.getAllState()
            //         .then(function onSuccess(response) {
            //             $scope.stateData = response.data.state;
            //         }).catch(function onError(response) {
            //             console.log(response);
            //         })
            //     suspenseLeadService.getAllCity()
            //         .then(function onSuccess(response) {
            //             $scope.cityData = response.data.city;
            //         }).catch(function onError(response) {
            //             console.log(response);
            //         })
            // }, 12000)

            $scope.getState = function () {
                AuthService.getAllState()
                    .then(function onSuccess(response) {
                        $scope.stateData = response.data.data;
                    }).catch(function onError(response) {
                        console.log(response);
                    })
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
            $scope.getBeds = function () {
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
                AuthService.getAllBeds(param)
                    .then(function onSuccess(response) {
                        $scope.hospitalDetailData = response.data.data;
                        $scope.resourcesTypeData = [];
                        $scope.totalAvailableBeds = 0;
                        if ($scope.hospitalDetailData.length > 0) {
                            for (let i in $scope.hospitalDetailData) {
                                let hospitalData = $scope.hospitalDetailData[i].hospital_data;
                                if (hospitalData.length > 0) {
                                    for (let j in hospitalData) {
                                        let resourcesData = hospitalData[j].resources;
                                        if (resourcesData.length > 0) {
                                            for (let k in resourcesData) {
                                                if ($scope.resourcesTypeData.length > 0) {
                                                    var localindex_index = $scope.resourcesTypeData.map(function (el) {
                                                        return el.resourceType;
                                                    }).indexOf(resourcesData[k].resourceType);
                                                    if(localindex_index !=-1){
                                                        $scope.resourcesTypeData[localindex_index].totalQuantity = $scope.resourcesTypeData[localindex_index].totalQuantity + resourcesData[k].totalQuantity;
                                                        $scope.resourcesTypeData[localindex_index].quantity = $scope.resourcesTypeData[localindex_index].quantity + resourcesData[k].quantity;
                                                    }

                                                    if(localindex_index == -1){
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
                                                if(resourcesData[k].quantity){
                                                    $scope.totalAvailableBeds =  $scope.totalAvailableBeds + resourcesData[k].quantity;
                                                
                                                }
                                    
                                                //   if(resourcesData[k].resourceType == 'BED_WITH_OXYGEN'){
                                                //     $scope.totalOxyzenBeds = $scope.totalOxyzenBeds + resourcesData[k].totalQuantity;
                                                //   }
                                                //   if(resourcesData[k].resourceType == 'BED_WITHOUT_OXYGEN'){
                                                //     $scope.totalNonOxyzenBeds = $scope.totalNonOxyzenBeds + resourcesData[k].totalQuantity;
                                                //   }

                                                //   if(resourcesData[k].resourceType == 'ICU_WITH_VENTILATOR'){
                                                //     $scope.totalVentilatorsBeds = $scope.totalVentilatorsBeds + resourcesData[k].totalQuantity;
                                                //   }
                                                //   if(resourcesData[k].resourceType == 'ICU_WITHOUT_VENTILATOR'){
                                                //     $scope.totalNonVentilatorsBeds = $scope.totalNonVentilatorsBeds + resourcesData[k].totalQuantity;
                                                //   }

                                                //   if(resourcesData[k].resourceType == 'BEDS'){
                                                //     $scope.totalBeds = $scope.totalBeds + resourcesData[k].totalQuantity;
                                                //   }

                                                //   if(resourcesData[k].resourceType == 'ICUS'){
                                                //     $scope.totalICUBeds = $scope.totalICUBeds + resourcesData[k].totalQuantity;
                                                //   }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

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
