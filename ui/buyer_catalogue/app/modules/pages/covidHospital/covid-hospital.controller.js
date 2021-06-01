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
            //let cat = url[1].substring(0, 1).toUpperCase() + url[1].substring(1);
            // $scope.selectedCategory = cat;
            

            $scope.categorys = ['Hospital Beds', 'Cylinders'];
            $scope.selectedCategory = 'Hospital Beds';
            $scope.loading = true;
            $scope.changeWeb = function () {
                if ($scope.selectedCategory == 'Cylinders') {
                    $location.path("/cylinder/covidhelpdesk/");
                }
            }
            $scope.loading = true;
            $scope.Phone = 1234567892;
            $scope.totalCity = 0;
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
                            angular.forEach($scope.cityData, function (value, key) {
                                $scope.totalCity = $scope.totalCity + value.length;
                            });
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
                    angular.forEach($scope.cityData, function (value, key) {
                        $scope.totalCity = $scope.totalCity + value.length;
                    });
                } else {
                    AuthService.getAllCity()
                        .then(function onSuccess(response) {
                            if (response && response.data && response.data.data) {
                                $scope.cityData = response.data.data;
                                angular.forEach($scope.cityData, function (value, key) {
                                    $scope.totalCity = $scope.totalCity + value.length;
                                });
                                localStorage.setItem("cityData", JSON.stringify($scope.cityData));
                            } else {
                                console.log('error', response);
                            }
                        }).catch(function onError(response) {
                            console.log(response);
                        })
                }
            }
            // $scope.sort = '+vendor_name';
            // $scope.Sort = function (val) {
            //     $scope.categoryFilter = undefined;
            //     $scope.sort = val;
            //     // if ($scope.sort == val) {
            //     //   $scope.reversesort = !$scope.reversesort;
            //     //   //return;
            //     // }
            // }


            //gethospitalVolunteerData
            $scope.hospitalVolunteerData = localStorage.getItem("hospitalVolunteerData");
            $scope.hospitalVolunteerData = JSON.parse($scope.hospitalVolunteerData);
            if (!$scope.hospitalVolunteerData) {
                AuthService.getAllVolunteer()
                    .then(function onSuccess(response) {
                        if (response && response.data && response.data.data) {
                            $scope.hospitalVolunteerData = response.data.data;
                            localStorage.setItem("hospitalVolunteerData", JSON.stringify($scope.hospitalVolunteerData));
                        } else {
                            console.log('error', response);
                        }
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }


            $scope.getCity = function () {
                // $scope.hospitalDetailData = [];
                $scope.cityList = [];
                $scope.hospitalDetailData = [];
                $scope.resourcesTypeData = [];
                $scope.totalHospitalBeds = 0;
                $scope.totalAvailableCountsData = 0;
                $scope.totalAvailableBeds = 0;
                $scope.selectedCityName = null;
                $scope.district_code = null;
                var localindex_index = $scope.stateData.map(function (el) {
                    return el.state_code;
                }).indexOf($scope.state_code);
                if (localindex_index != -1) {
                    $scope.selectedStateName = $scope.stateData[localindex_index].name;
                }
                $scope.cityList = $scope.cityData[$scope.state_code];
                // $scope.getBeds();
            }
            // $scope.totalOxyzenBeds = 0;
            // $scope.totalNonOxyzenBeds = 0;
            // $scope.totalICUBeds = 0;
            // $scope.totalVentilatorsBeds = 0;
            // $scope.totalNonVentilatorsBeds = 0;
            // $scope.totalBeds = 0;
            $scope.totalAvailableBeds = 0;
            $scope.totalHospitalBeds = 0;
            $scope.getBeds = function (value) {
                $scope.sort = '';
                if (!value) {
                    $scope.categoryFilter = 'TOTAL BEDS AVAILABLE';
                }

                if ($scope.categoryFilter == 'TOTAL BEDS AVAILABLE') {
                    $scope.sort = '-AvailableofBedsinHospital';
                }
                // $scope.sortingParam = 'quantity';
                // $scope.sortingType = 'Desc';
                // if(value && sortType){
                //     $scope.sort = '';
                //     $scope.sortingParam = value;
                //     $scope.sortingType = sortType;
                // }
                // $scope.hospitalDetailData = [];
                var localindex_index = $scope.cityList.map(function (el) {
                    return el.district_code;
                }).indexOf($scope.district_code);
                if (localindex_index != -1) {
                    $scope.selectedCityName = $scope.cityList[localindex_index].district_name;
                }
                $scope.loading = null;
                let param = {
                    state: $scope.state_code,
                    city: $scope.district_code,
                    categoryFilter: $scope.categoryFilter,
                    // sortingParam:$scope.sortingParam,
                    // sortingType: $scope.sortingType
                }

                if ($scope.categoryFilter == 'FACILITY NAME - ASCENDING') {
                    param.otherFiler = 'ASC';
                    param.categoryFilter = undefined;
                }

                if ($scope.categoryFilter == 'FACILITY NAME - DESCENDING') {
                    param.otherFiler = 'DESC';
                    param.categoryFilter = undefined;
                }

                if ($scope.categoryFilter == 'LATEST UPDATED TIME') {
                    param.categoryFilter = undefined;
                }

                if ($scope.categoryFilter == 'TOTAL BEDS AVAILABLE') {
                    param.categoryFilter = undefined;
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
                        $scope.resourcesTypeData.push({ 'resourceType': 'TOTAL BEDS AVAILABLE' });
                        $scope.totalAvailableBeds = 0;
                        $scope.totalHospitalBeds = 0;
                        if ($scope.hospitalDetailData.length > 0) {
                            for (let i in $scope.hospitalDetailData) {
                                let hospitalData = $scope.hospitalDetailData[i].hospital_data;
                                if (hospitalData.length > 0) {
                                    for (let j in hospitalData) {
                                        let date = moment(hospitalData[j].last_updated_time).format('DD');
                                        let month = moment(hospitalData[j].last_updated_time).format('MM');
                                        let year = moment(hospitalData[j].last_updated_time).format('YYYY');
                                        let currentYear = moment().format('YYYY');
                                        let currentMonth = moment().format('MM');
                                        let currentDate = moment().format('DD');
                                        //let date1 = moment([year, month, date])
                                        // let date2 = moment([currentYear, currentMonth, currentDate])
                                        let date1 = moment(hospitalData[j].last_updated_time)
                                        let date2 = moment();

                                        let dateDifference = date2.diff(date1, 'days');
                                        $scope.hospitalDetailData[i].hospital_data[j].isDateShow = true;
                                        if (dateDifference > 6) {
                                            $scope.hospitalDetailData[i].hospital_data[j].isDateShow = false;
                                        }

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
                        $scope.resourcesTypeData.push({ 'resourceType': 'LATEST UPDATED TIME' }, { 'resourceType': 'FACILITY NAME - ASCENDING' }, { 'resourceType': 'FACILITY NAME - DESCENDING' });
                        $scope.totalAvailableCountsData = $scope.hospitalDetailData.length - $scope.notAvailableCount;
                        $scope.setVolunteer();
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.setVolunteer = function () {
                let volArray = [];
                if ($scope.hospitalDetailData && $scope.hospitalDetailData.length > 0) {
                    let vol = $scope.hospitalVolunteerData
                    for (let i in vol) {
                        if (vol[i].District_Code == $scope.district_code) {
                            volArray.push(vol[i]);
                        }
                    }
                    if(volArray.length == 0){
                        volArray = [{'Volunteer_Name':'Srishti','BitLink':'https://bit.ly/3fSzx4r'},
                        {'Volunteer_Name':'Shifna','BitLink':'https://bit.ly/3wzfJK2'},
                        {'Volunteer_Name':'Pranay','BitLink':'https://bit.ly/3fRp1KO'},
                        {'Volunteer_Name':'Pradeep','BitLink':' https://bit.ly/3i07Rgx'},
                        {'Volunteer_Name':'Shyamlee','BitLink':'https://bit.ly/3wKx4Qh'},
                        {'Volunteer_Name':'Anmol','BitLink':'https://bit.ly/3wKxh61'},]
                    }
                }
                for (let j in $scope.hospitalDetailData) {
                    for (let k in volArray) {
                        if (!$scope.lastIndex || $scope.lastIndex == k) {
                            $scope.hospitalDetailData[j].Volunteer_Name = volArray[k].Volunteer_Name;
                            $scope.hospitalDetailData[j].BitLink = volArray[k].BitLink;
                            $scope.lastIndex = k;
                        }
                        if (volArray.length - 1 == k) {
                            $scope.lastIndex = JSON.parse($scope.lastIndex) + 1;
                        }
                        if ($scope.lastIndex == volArray.length) {
                            $scope.lastIndex = undefined;
                        }

                    }
                }
            }


            $scope.resourcesAvailable = function (vender) {
                var localindex_index = $scope.hospitalDetailData.map(function (el) {
                    return el.vendor_name;
                }).indexOf(vender);
                if (localindex_index != -1) {
                    if($scope.hospitalDetailData[localindex_index].resourcesAvailableButton){
                        $scope.hospitalDetailData[localindex_index].resourcesAvailableButton = false;
                        swal("Feedback Removed", "Successfully", "success");
                    } else {
                        $scope.hospitalDetailData[localindex_index].resourcesAvailableButton = true;
                        swal("Feedback Accepted", "Successfully", "success");
                    }
                } else {
                    swal("Hospital not found.", "", "error");
                }
            }

            $scope.notAvailable = function (vender) {
                var localindex_index = $scope.hospitalDetailData.map(function (el) {
                    return el.vendor_name;
                }).indexOf(vender);
                if (localindex_index != -1) {
                    if($scope.hospitalDetailData[localindex_index].notAvailableButton){
                        $scope.hospitalDetailData[localindex_index].notAvailableButton = false;
                        swal("Feedback Removed", "Successfully", "success");
                    } else {
                        $scope.hospitalDetailData[localindex_index].notAvailableButton = true;
                        swal("Feedback Accepted", "Successfully", "success");
                    }
                } else {
                    swal("Hospital not found.", "", "error");
                }
            }

            $scope.wrongNumber = function (vender) {
                var localindex_index = $scope.hospitalDetailData.map(function (el) {
                    return el.vendor_name;
                }).indexOf(vender);
                if (localindex_index != -1) {
                    if($scope.hospitalDetailData[localindex_index].wrongNumberButton){
                        $scope.hospitalDetailData[localindex_index].wrongNumberButton = false;
                        swal("Feedback Removed", "Successfully", "success");
                    } else {
                        $scope.hospitalDetailData[localindex_index].wrongNumberButton = true;
                        swal("Feedback Accepted", "Successfully", "success");
                    }
                } else {
                    swal("Hospital not found.", "", "error");
                }
                
            }



            $scope.totalAvailableCountsData = 0;

        }]);

