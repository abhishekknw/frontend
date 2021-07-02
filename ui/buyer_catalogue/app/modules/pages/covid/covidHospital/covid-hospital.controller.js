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

            var url = $location.url().split("?");
            let stateString = "";
            let cityString = "";
            if (url.length > 1) {
                let stateCityString = url[1].split("&");
                stateString = stateCityString[0].split("=");
                cityString = stateCityString[1].split("=");
                cityString[1] = cityString[1].substring(0, 1).toLowerCase() + cityString[1].substring(1);
            }



            //let apiUrl = 'https://liveapi.societybasket.in/';
            let apiUrl = ' https://stagingapi.machadalo.com/';
            url[0] = url[0].substring(1);
            let cat = url[0].substring(0, 1).toUpperCase() + url[0].substring(1);

            $rootScope.selectedCategory = cat;
            if ($scope.selectedCategory == 'Hospitalbeds') {
                $scope.selectedCategory = 'Beds';
            }
            $rootScope.cat = $scope.selectedCategory
            // $scope.categorys = ['Hospital Beds', 'Cylinders'];
            // $scope.selectedCategory = 'Hospital Beds';
            $scope.loading = true;
            $scope.changeWeb = function () {
                if ($scope.selectedCategory == 'Hospital Beds' || $scope.selectedCategory == 'Beds') {
                    $location.path("/hospitalbeds");
                    //$location.path("/hospitalbeds?statename=mp&cityname=indore");
                } else if ($scope.selectedCategory == 'Refills') {
                    //$location.path("/refills/");
                    $location.url('/refills/');
                } else if ($scope.selectedCategory == 'Concentrators') {
                    $location.url("/concentrators/");
                } else if ($scope.selectedCategory == 'Cylinders') {
                    $location.url("/cylinders/");
                } else if ($scope.selectedCategory == 'Medicines') {
                    $location.url("/medicines/");
                } else if ($scope.selectedCategory == 'Ambulance') {
                    $location.url("/ambulance/");
                } else if ($scope.selectedCategory == 'Plasma') {
                    $location.url("/plasma/");
                } else if ($scope.selectedCategory == 'Free Online Doctor Consulation') {
                    $location.url("/doctors/");
                } else if ($scope.selectedCategory == 'Covid Cases' || $scope.selectedCategory == 'Covidcases') {
                    $location.url("/covidcases/");
                } else if ($scope.selectedCategory == 'Vaccine Centers') {
                    $location.url("/vaccinecenters/");
                }
                $scope.hospitalDetailData = [];
            }

            $scope.loading = true;
            $scope.Phone = 1234567892;
            $scope.totalCity = 0;
            setInterval(function () {
                AuthService.getAllBedsState(apiUrl)
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

                AuthService.getAllBedsCity(apiUrl)
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

            $scope.getCategory = function () {
                AuthService.getAllCategory()
                    .then(function onSuccess(response) {
                        $scope.categorysArray = response.data.data;
                        $scope.categorysArray.push(
                            {
                                "category_code": "",
                                "keyword": "MDCovidcases",
                                "name": "Covid Cases",
                            },
                            {
                                "category_code": "",
                                "keyword": "MDVaccineCenters",
                                "name": "Vaccine Centers",
                            },
                            {
                                "category_code": "",
                                "keyword": "MDConsulation",
                                "name": "Free Online Doctor Consulation",
                            });

                        $scope.categorysArrayNew = $scope.categorysArray;
                        for (let j in $scope.categorysArrayNew) {
                            if ($scope.categorysArrayNew[j].name == 'PuffCans') {
                                $scope.categorysArrayNew.splice(j, 1);
                                $scope.categorysArray = $scope.categorysArrayNew;
                            }
                        }

                        if ($scope.selectedCategory && $scope.categorysArray.length > 0) {

                            let selectedCategoryname = $scope.selectedCategory;
                            var localindex_index = $scope.categorysArray.map(function (el) {
                                return el.name;
                            }).indexOf(selectedCategoryname);
                            if (localindex_index != -1) {
                                $scope.selectedCategoryCode = $scope.categorysArray[localindex_index].category_code;
                                $scope.selectedCategoryKeyword = $scope.categorysArray[localindex_index].keyword;
                                // $scope.getState();
                            }
                        }
                        let newArray = [];
                        for (let i in $scope.categorysArray) {
                            if ($scope.categorysArray[i].name == 'Beds') {
                                newArray[0] = $scope.categorysArray[i];
                            }
                            if ($scope.categorysArray[i].name == 'Free Online Doctor Consulation') {
                                newArray[1] = $scope.categorysArray[i];
                            }
                            if ($scope.categorysArray[i].name == 'Medicines') {
                                newArray[2] = $scope.categorysArray[i];
                            }
                            if ($scope.categorysArray[i].name == 'Ambulance') {
                                newArray[3] = $scope.categorysArray[i];
                            }
                            if ($scope.categorysArray[i].name == 'Plasma') {
                                newArray[4] = $scope.categorysArray[i];
                            }
                            if ($scope.categorysArray[i].name == 'Concentrators') {
                                newArray[5] = $scope.categorysArray[i];
                            }
                            if ($scope.categorysArray[i].name == 'Cylinders') {
                                newArray[6] = $scope.categorysArray[i];
                            }
                            if ($scope.categorysArray[i].name == 'Refills') {
                                newArray[7] = $scope.categorysArray[i];
                            }
                            if ($scope.categorysArray[i].name == 'Covid Cases') {
                                newArray[8] = $scope.categorysArray[i];
                            }
                        }

                        $scope.categorysArray = newArray;





                    }).catch(function onError(response) {
                        console.log(response);
                    })


            }

            $scope.getStateCity = function () {
                let localState = localStorage.getItem("stateData");
                // if (localStorage.getItem("stateData") && localStorage.getItem("stateData") != undefined) {
                if (localState && localState != 'undefined' && localState.length != 0) {
                    $scope.stateData = JSON.parse(localState);
                } else {
                    AuthService.getAllBedsState(apiUrl)
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
                if (url.length > 1) {
                    var localindex_index = $scope.stateData.map(function (el) {
                        return el.name;
                    }).indexOf(stateString[1].replace("%20", " "));
                    if (localindex_index != -1) {
                        $scope.selectedStateName = $scope.stateData[localindex_index].name;
                        $scope.state_code = $scope.stateData[localindex_index].state_code;
                    }
                }

                let localCity = localStorage.getItem("cityData");
                // if (localStorage.getItem("cityData") && localStorage.getItem("cityData") != undefined) {
                if (localCity && localCity != 'undefined' && localCity != 0) {
                    $scope.cityData = JSON.parse(localCity);
                    $scope.getCity();
                    angular.forEach($scope.cityData, function (value, key) {
                        $scope.totalCity = $scope.totalCity + value.length;
                    });
                } else {
                    AuthService.getAllBedsCity(apiUrl)
                        .then(function onSuccess(response) {
                            if (response && response.data && response.data.data) {
                                $scope.cityData = response.data.data;
                                $scope.getCity();
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
            // $scope.hospitalVolunteerData = localStorage.getItem("hospitalVolunteerData");
            // $scope.hospitalVolunteerData = JSON.parse($scope.hospitalVolunteerData);
            // if (!$scope.hospitalVolunteerData) {
            //     AuthService.getAllVolunteer()
            //         .then(function onSuccess(response) {
            //             if (response && response.data && response.data.data) {
            //                 $scope.hospitalVolunteerData = response.data.data;
            //                 localStorage.setItem("hospitalVolunteerData", JSON.stringify($scope.hospitalVolunteerData));
            //             } else {
            //                 console.log('error', response);
            //             }
            //         }).catch(function onError(response) {
            //             console.log(response);
            //         })
            // }


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
                if (url.length > 1 && $scope.state_code) {
                    var localindex_index_city = $scope.cityList.map(function (el) {
                        return el.district_name;
                    }).indexOf(cityString[1].replace("%20", " "));
                    if (localindex_index_city != -1) {
                        $scope.selectedCityName = $scope.cityList[localindex_index_city].district_name;
                        $scope.district_code = $scope.cityList[localindex_index_city].district_code;
                        $scope.getBeds();
                    }
                   
                }
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
                $scope.createdDate = false;
                if ($scope.state_code == '002' || $scope.state_code == '016' || $scope.state_code == '029' || $scope.state_code == '021') {
                    $scope.createdDate = true;
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
                AuthService.getAllBeds(param, apiUrl)
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

                                        if (hospitalData[j].created_at) {
                                            let date3 = moment(hospitalData[j].created_at)
                                            let date4 = moment();
                                            let dateDifferenceNew = date4.diff(date3, 'days');
                                            $scope.hospitalDetailData[i].hospital_data[j].isCreatedDateShow = true;
                                            if (dateDifferenceNew > 6) {
                                                $scope.hospitalDetailData[i].hospital_data[j].isCreatedDateShow = false;
                                            }
                                        } else {
                                            $scope.hospitalDetailData[i].hospital_data[j].isCreatedDateShow = false;
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
                            $scope.getVolunteer();
                        }
                        $scope.resourcesTypeData.push({ 'resourceType': 'LATEST UPDATED TIME' }, { 'resourceType': 'FACILITY NAME - ASCENDING' }, { 'resourceType': 'FACILITY NAME - DESCENDING' });
                        $scope.totalAvailableCountsData = $scope.hospitalDetailData.length - $scope.notAvailableCount;
                        // $scope.setVolunteer();

                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            // $scope.setVolunteer = function () {
            //     let volArray = [];
            //     if ($scope.hospitalDetailData && $scope.hospitalDetailData.length > 0) {
            //         let vol = $scope.hospitalVolunteerData
            //         for (let i in vol) {
            //             if (vol[i].District_Code == $scope.district_code) {
            //                 volArray.push(vol[i]);
            //             }
            //         }

            //     }
            //     console.log(volArray);
            //     if(volArray.length == 0){
            //         volArray = [{'Volunteer_Name':'Srishti','BitLink':'https://bit.ly/3fSzx4r'},
            //         {'Volunteer_Name':'Shifna','BitLink':'https://bit.ly/3wzfJK2'},
            //         {'Volunteer_Name':'Pranay','BitLink':'https://bit.ly/3fRp1KO'},
            //         {'Volunteer_Name':'Pradeep','BitLink':' https://bit.ly/3i07Rgx'},
            //         {'Volunteer_Name':'Shyamlee','BitLink':'https://bit.ly/3wKx4Qh'},
            //         {'Volunteer_Name':'Anmol','BitLink':'https://bit.ly/3wKxh61'},]
            //     }
            //     for (let j in $scope.hospitalDetailData) {
            //         for (let k in volArray) {
            //             if (!$scope.lastIndex || $scope.lastIndex == k) {
            //                 $scope.hospitalDetailData[j].Volunteer_Name = volArray[k].Volunteer_Name;
            //                 $scope.hospitalDetailData[j].BitLink = volArray[k].BitLink;
            //                 $scope.lastIndex = k;
            //             }
            //             if (volArray.length - 1 == k) {
            //                 $scope.lastIndex = JSON.parse($scope.lastIndex) + 1;
            //             }
            //             if ($scope.lastIndex == volArray.length) {
            //                 $scope.lastIndex = undefined;
            //             }

            //         }
            //     }
            // }

            $scope.getVolunteer = function () {
                let city = 'D' + $scope.selectedCityName;
                AuthService.getAllVolunteer(city)
                    .then(function onSuccess(response) {
                        $scope.volunteerData = response.data.data;

                        if ($scope.volunteerData.length == 0) {
                            $scope.volunteerData = [{ 'Volunteer_Name': 'Srishti', 'BitLink': 'https://bit.ly/3fSzx4r' },
                            { 'Volunteer_Name': 'Shifna', 'BitLink': 'https://bit.ly/3wzfJK2' },
                            { 'Volunteer_Name': 'Pranay', 'BitLink': 'https://bit.ly/3fRp1KO' },
                            { 'Volunteer_Name': 'Pradeep', 'BitLink': ' https://bit.ly/3i07Rgx' },
                            { 'Volunteer_Name': 'Shyamlee', 'BitLink': 'https://bit.ly/3wKx4Qh' },
                            { 'Volunteer_Name': 'Anmol', 'BitLink': 'https://bit.ly/3wKxh61' },]
                        }

                        for (let j in $scope.hospitalDetailData) {

                            for (let k in $scope.volunteerData) {
                                if ($scope.volunteerData.length == 1) {
                                    $scope.hospitalDetailData[j].Volunteer_Name = $scope.volunteerData[k].Volunteer_Name;
                                    $scope.hospitalDetailData[j].BitLink = $scope.volunteerData[k].BitLink;
                                } else {
                                    if (!$scope.lastIndex || $scope.lastIndex == k) {
                                        $scope.hospitalDetailData[j].Volunteer_Name = $scope.volunteerData[k].Volunteer_Name;
                                        $scope.hospitalDetailData[j].BitLink = $scope.volunteerData[k].BitLink;
                                        $scope.lastIndex = k;
                                    }
                                    if ($scope.volunteerData.length - 1 == k) {
                                        $scope.lastIndex = JSON.parse($scope.lastIndex) + 1;
                                    }
                                    if ($scope.lastIndex == $scope.volunteerData.length) {
                                        $scope.lastIndex = undefined;
                                    }
                                }

                            }
                        }
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }


            $scope.resourcesAvailable = function (vender) {
                let param = {
                    "district": $scope.selectedCityName,
                    "city": "",
                    "category": $scope.selectedCategoryKeyword,
                    "feedback": 'Resources Available',
                    "contact_number": null,
                }
                var localindex_index = $scope.hospitalDetailData.map(function (el) {
                    return el.vendor_name;
                }).indexOf(vender);
                if (localindex_index != -1) {
                    param.contact_name = $scope.hospitalDetailData[localindex_index].vendor_name;
                    if ($scope.hospitalDetailData[localindex_index].resourcesAvailableButton) {
                        param.feedback = '-Resources Available';
                        $scope.hospitalDetailData[localindex_index].resourcesAvailableButton = false;
                        swal("Feedback Removed", "Successfully", "success");
                    } else {
                        $scope.hospitalDetailData[localindex_index].resourcesAvailableButton = true;
                        swal("Feedback Accepted", "Successfully", "success");
                    }
                    AuthService.feedback(param)
                        .then(function onSuccess(response) {
                        }).catch(function onError(response) {
                            console.log(response);
                        })
                } else {
                    swal("Hospital not found.", "", "error");
                }
            }

            $scope.notAvailable = function (vender) {
                let param = {
                    "district": $scope.selectedCityName,
                    "city": "",
                    "category": $scope.selectedCategoryKeyword,
                    "feedback": 'Not Available',
                    "contact_number": null,
                }
                var localindex_index = $scope.hospitalDetailData.map(function (el) {
                    return el.vendor_name;
                }).indexOf(vender);
                if (localindex_index != -1) {
                    param.contact_name = $scope.hospitalDetailData[localindex_index].vendor_name;
                    if ($scope.hospitalDetailData[localindex_index].notAvailableButton) {
                        param.feedback = '-Not Available';
                        $scope.hospitalDetailData[localindex_index].notAvailableButton = false;
                        swal("Feedback Removed", "Successfully", "success");
                    } else {
                        $scope.hospitalDetailData[localindex_index].notAvailableButton = true;
                        swal("Feedback Accepted", "Successfully", "success");
                    }
                    AuthService.feedback(param)
                        .then(function onSuccess(response) {
                        }).catch(function onError(response) {
                            console.log(response);
                        })
                } else {
                    swal("Hospital not found.", "", "error");
                }
            }

            $scope.wrongNumber = function (vender) {
                let param = {
                    "district": $scope.selectedCityName,
                    "city": "",
                    "category": $scope.selectedCategoryKeyword,
                    "feedback": 'Wrong Number',
                    "contact_number": null,

                }
                var localindex_index = $scope.hospitalDetailData.map(function (el) {
                    return el.vendor_name;
                }).indexOf(vender);
                if (localindex_index != -1) {
                    param.contact_name = $scope.hospitalDetailData[localindex_index].vendor_name;
                    if ($scope.hospitalDetailData[localindex_index].wrongNumberButton) {
                        param.feedback = '-Wrong Number';
                        $scope.hospitalDetailData[localindex_index].wrongNumberButton = false;
                        swal("Feedback Removed", "Successfully", "success");
                    } else {
                        $scope.hospitalDetailData[localindex_index].wrongNumberButton = true;
                        swal("Feedback Accepted", "Successfully", "success");
                    }
                    AuthService.feedback(param)
                        .then(function onSuccess(response) {
                        }).catch(function onError(response) {
                            console.log(response);
                        })
                } else {
                    swal("Hospital not found.", "", "error");
                }

            }



            $scope.totalAvailableCountsData = 0;

        }]);

