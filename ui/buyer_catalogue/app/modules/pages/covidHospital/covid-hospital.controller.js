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
                // if (localStorage.getItem("cityData") && localStorage.getItem("cityData") != undefined) {
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
                $scope.selectedCityName = null;
                $scope.district_code = null;
                var localindex_index = $scope.stateData.map(function (el) {
                    return el.state_code;
                }).indexOf($scope.state_code);
                if (localindex_index != -1) {
                    $scope.selectedStateName = $scope.stateData[localindex_index].name;
                }
                $scope.cityList = $scope.cityData[$scope.state_code];
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
                var localindex_index = $scope.cityList.map(function (el) {
                    return el.district_code;
                }).indexOf($scope.district_code);
                if (localindex_index != -1) {
                    $scope.selectedCityName = $scope.cityList[localindex_index].district_name;
                }
                $scope.loading = null;
                let param = {
                    state: $scope.state_code,
                    city: $scope.district_code
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
            let cdata = {
                "002": [
                    {
                        "state_code": "002",
                        "district_name": "anantapur",
                        "district_code": "0004"
                    },
                    {
                        "state_code": "002",
                        "district_name": "chittoor",
                        "district_code": "0005"
                    },
                    {
                        "state_code": "002",
                        "district_name": "east godavari",
                        "district_code": "0006"
                    },
                    {
                        "state_code": "002",
                        "district_name": "guntur",
                        "district_code": "0007"
                    },
                    {
                        "state_code": "002",
                        "district_name": "kadapa",
                        "district_code": "0008"
                    },
                    {
                        "state_code": "002",
                        "district_name": "krishna",
                        "district_code": "0009"
                    },
                    {
                        "state_code": "002",
                        "district_name": "kurnool",
                        "district_code": "0010"
                    },
                    {
                        "state_code": "002",
                        "district_name": "nellore",
                        "district_code": "0011"
                    },
                    {
                        "state_code": "002",
                        "district_name": "prakasam",
                        "district_code": "0012"
                    },
                    {
                        "state_code": "002",
                        "district_name": "srikakulam",
                        "district_code": "0013"
                    },
                    {
                        "state_code": "002",
                        "district_name": "visakhapatnam",
                        "district_code": "0014"
                    },
                    {
                        "state_code": "002",
                        "district_name": "vizianagaram",
                        "district_code": "0015"
                    },
                    {
                        "state_code": "002",
                        "district_name": "west godavari",
                        "district_code": "0016"
                    }
                ],
                "005": [
                    {
                        "state_code": "005",
                        "district_name": "araria",
                        "district_code": "0076"
                    },
                    {
                        "state_code": "005",
                        "district_name": "arwal",
                        "district_code": "0077"
                    },
                    {
                        "state_code": "005",
                        "district_name": "aurangabad",
                        "district_code": "0078"
                    },
                    {
                        "state_code": "005",
                        "district_name": "banka",
                        "district_code": "0079"
                    },
                    {
                        "state_code": "005",
                        "district_name": "begusarai",
                        "district_code": "0080"
                    },
                    {
                        "state_code": "005",
                        "district_name": "bhagalpur",
                        "district_code": "0081"
                    },
                    {
                        "state_code": "005",
                        "district_name": "bhojpur",
                        "district_code": "0082"
                    },
                    {
                        "state_code": "005",
                        "district_name": "buxar",
                        "district_code": "0083"
                    },
                    {
                        "state_code": "005",
                        "district_name": "darbhanga",
                        "district_code": "0084"
                    },
                    {
                        "state_code": "005",
                        "district_name": "east champaran",
                        "district_code": "0085"
                    },
                    {
                        "state_code": "005",
                        "district_name": "gaya",
                        "district_code": "0086"
                    },
                    {
                        "state_code": "005",
                        "district_name": "gopalganj",
                        "district_code": "0087"
                    },
                    {
                        "state_code": "005",
                        "district_name": "jamui",
                        "district_code": "0088"
                    },
                    {
                        "state_code": "005",
                        "district_name": "jehanabad",
                        "district_code": "0089"
                    },
                    {
                        "state_code": "005",
                        "district_name": "kaimur",
                        "district_code": "0090"
                    },
                    {
                        "state_code": "005",
                        "district_name": "katihar",
                        "district_code": "0091"
                    },
                    {
                        "state_code": "005",
                        "district_name": "khagaria",
                        "district_code": "0092"
                    },
                    {
                        "state_code": "005",
                        "district_name": "kishanganj",
                        "district_code": "0093"
                    },
                    {
                        "state_code": "005",
                        "district_name": "lakhisarai",
                        "district_code": "0094"
                    },
                    {
                        "state_code": "005",
                        "district_name": "madhepura",
                        "district_code": "0095"
                    },
                    {
                        "state_code": "005",
                        "district_name": "madhubani",
                        "district_code": "0096"
                    },
                    {
                        "state_code": "005",
                        "district_name": "munger",
                        "district_code": "0097"
                    },
                    {
                        "state_code": "005",
                        "district_name": "muzaffarpur",
                        "district_code": "0098"
                    },
                    {
                        "state_code": "005",
                        "district_name": "nalanda",
                        "district_code": "0099"
                    },
                    {
                        "state_code": "005",
                        "district_name": "nawada",
                        "district_code": "0100"
                    },
                    {
                        "state_code": "005",
                        "district_name": "patna",
                        "district_code": "0101"
                    },
                    {
                        "state_code": "005",
                        "district_name": "purnia",
                        "district_code": "0102"
                    },
                    {
                        "state_code": "005",
                        "district_name": "rohtas",
                        "district_code": "0103"
                    },
                    {
                        "state_code": "005",
                        "district_name": "saharsa",
                        "district_code": "0104"
                    },
                    {
                        "state_code": "005",
                        "district_name": "samastipur",
                        "district_code": "0105"
                    },
                    {
                        "state_code": "005",
                        "district_name": "saran",
                        "district_code": "0106"
                    },
                    {
                        "state_code": "005",
                        "district_name": "sheikhpura",
                        "district_code": "0107"
                    },
                    {
                        "state_code": "005",
                        "district_name": "sheohar",
                        "district_code": "0108"
                    },
                    {
                        "state_code": "005",
                        "district_name": "sitamarhi",
                        "district_code": "0109"
                    },
                    {
                        "state_code": "005",
                        "district_name": "siwan",
                        "district_code": "0110"
                    },
                    {
                        "state_code": "005",
                        "district_name": "supaul",
                        "district_code": "0111"
                    },
                    {
                        "state_code": "005",
                        "district_name": "vaishali",
                        "district_code": "0112"
                    },
                    {
                        "state_code": "005",
                        "district_name": "west champaran",
                        "district_code": "0113"
                    }
                ],
                "009": [
                    {
                        "state_code": "009",
                        "district_name": "central delhi",
                        "district_code": "0146"
                    },
                    {
                        "state_code": "009",
                        "district_name": "east delhi",
                        "district_code": "0147"
                    },
                    {
                        "state_code": "009",
                        "district_name": "new delhi",
                        "district_code": "0148"
                    },
                    {
                        "state_code": "009",
                        "district_name": "north delhi",
                        "district_code": "0149"
                    },
                    {
                        "state_code": "009",
                        "district_name": "north east delhi",
                        "district_code": "0150"
                    },
                    {
                        "state_code": "009",
                        "district_name": "north west delhi",
                        "district_code": "0151"
                    },
                    {
                        "state_code": "009",
                        "district_name": "shahdara",
                        "district_code": "0152"
                    },
                    {
                        "state_code": "009",
                        "district_name": "south delhi",
                        "district_code": "0153"
                    },
                    {
                        "state_code": "009",
                        "district_name": "south east delhi",
                        "district_code": "0154"
                    },
                    {
                        "state_code": "009",
                        "district_name": "south west delhi",
                        "district_code": "0155"
                    },
                    {
                        "state_code": "009",
                        "district_name": "west delhi",
                        "district_code": "0156"
                    },
                    {
                        "state_code": "009",
                        "district_name": "delhi",
                        "district_code": "0742"
                    }
                ],
            }
        }]);

