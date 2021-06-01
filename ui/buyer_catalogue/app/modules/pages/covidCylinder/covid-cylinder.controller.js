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
                AuthService.getAllCylinderState()
                    .then(function onSuccess(response) {
                        if (response && response.data && response.data.data) {
                            $scope.stateData = response.data.data;
                            localStorage.setItem("cylinderStateData", JSON.stringify($scope.stateData));
                        } else {
                            console.log('error', response);
                        }
                    }).catch(function onError(response) {
                        console.log(response);
                    })

                AuthService.getAllCylinderCity()
                    .then(function onSuccess(response) {
                        if (response && response.data && response.data.data) {
                            $scope.cityData = response.data.data;
                            localStorage.setItem("cylinderCityData", JSON.stringify($scope.cityData));
                        } else {
                            console.log('error', response);
                        }
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }, 1800000)
            //  1800000
            $scope.getStateCity = function () {
                let localState = localStorage.getItem("cylinderStateData");
                // if (localStorage.getItem("stateData") && localStorage.getItem("stateData") != undefined) {
                if (localState && localState != 'undefined') {

                    $scope.stateData = JSON.parse(localState);
                } else {
                    AuthService.getAllCylinderState()
                        .then(function onSuccess(response) {
                            if (response && response.data && response.data.data) {
                                $scope.stateData = response.data.data;
                                localStorage.setItem("cylinderStateData", JSON.stringify($scope.stateData));
                            } else {
                                console.log('error', response);
                            }
                        }).catch(function onError(response) {
                            console.log(response);
                        })
                }
                let localCity = localStorage.getItem("cylinderCityData");
                if (localCity && localCity != 'undefined') {
                    $scope.cityData = JSON.parse(localCity);
                } else {
                    AuthService.getAllCylinderCity()
                        .then(function onSuccess(response) {
                            if (response && response.data && response.data.data) {
                                $scope.cityData = response.data.data;
                                localStorage.setItem("cylinderCityData", JSON.stringify($scope.cityData));
                            } else {
                                console.log('error', response);
                            }
                        }).catch(function onError(response) {
                            console.log(response);
                        })
                }
            }

            //getVolunteerData
            $scope.volunteerData = localStorage.getItem("volunteerData");
            $scope.volunteerData = JSON.parse($scope.volunteerData);
            if (!$scope.volunteerData) {
                AuthService.getAllVolunteer()
                    .then(function onSuccess(response) {
                        if (response && response.data && response.data.data) {
                            $scope.volunteerData = response.data.data;
                            localStorage.setItem("volunteerData", JSON.stringify($scope.volunteerData));
                        } else {
                            console.log('error', response);
                        }
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }


            $scope.getCity = function () {
                $scope.cityList = [];
                $scope.selectedCityName = null;
                $scope.city_code = null;
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
                    return el.city_code;
                }).indexOf($scope.city_code);
                if (localindex_index != -1) {
                    $scope.selectedCityName = $scope.cityList[localindex_index].city_name;
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
                        if (response.data && response.data.data && !response.data.data.data) {
                            $scope.cylinderDetailData = response.data.data;
                            console.log('+++++++++++++++++++++++++++', $scope.cylinderDetailData);
                            if ($scope.cylinderDetailData.length > 0) {
                                $scope.setVolunteer();
                            }
                        }
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.setVolunteer = function () {
                let volArray = [];
                if ($scope.cylinderDetailData && $scope.cylinderDetailData.length > 0) {
                    let vol = $scope.volunteerData
                    for (let i in vol) {
                        if (vol[i].City_Code == 149) {
                            volArray.push(vol[i]);
                        }
                    }
                }
                for (let j in $scope.cylinderDetailData) {
                    for (let k in volArray) {
                        if (!$scope.lastIndex || $scope.lastIndex == k) {
                            $scope.cylinderDetailData[j].Volunteer_Name = volArray[k].Volunteer_Name;
                            $scope.cylinderDetailData[j].BitLink = volArray[k].BitLink;
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
                console.log('+++++++++++++++++', $scope.cylinderDetailData);
            }

            $scope.resourcesAvailable = function (index) {
                if ($scope.cylinderDetailData[index].resourcesAvailableButton) {
                    $scope.cylinderDetailData[index].resourcesAvailableButton = false;
                    swal("Feedback Removed", "Successfully", "success");
                } else {
                    $scope.cylinderDetailData[index].resourcesAvailableButton = true;
                    swal("Feedback Accepted", "Successfully", "success");
                }

            }

            $scope.notAvailable = function (index) {
                if ($scope.cylinderDetailData[index].notAvailableButton) {
                    $scope.cylinderDetailData[index].notAvailableButton = false;
                    swal("Feedback Removed", "Successfully", "success");
                } else {
                    $scope.cylinderDetailData[index].notAvailableButton = true;
                    swal("Feedback Accepted", "Successfully", "success");
                }
            }

            $scope.wrongNumber = function (index) {
                if ($scope.cylinderDetailData[index].wrongNumberButton) {
                    $scope.cylinderDetailData[index].wrongNumberButton = false;
                    swal("Feedback Removed", "Successfully", "success");
                } else {
                    $scope.cylinderDetailData[index].wrongNumberButton = true;
                    swal("Feedback Accepted", "Successfully", "success");
                }
            }

            //            let volunteerData =  {"status": true,
            // "data": [
            // {
            // "State": "Andhra Pradesh",
            // "State_Code": 2,
            // "District": "Visakhapatnam",
            // "District_Code": 14,
            // "City": "Visakhapatnam",
            // "City_Code": 110,
            // "Volunteer_Name": "Manjunath",
            // "Contact_Number": 9494616123,
            // "BitLink": "https://bit.ly/3eKGWlT"
            // },
            // {
            // "State": "Andhra Pradesh",
            // "State_Code": 2,
            // "District": "Krishna",
            // "District_Code": 9,
            // "City": "Vijayawada",
            // "City_Code": 57,
            // "Volunteer_Name": "Manjunath",
            // "Contact_Number": 9494616123,
            // "BitLink": "https://bit.ly/3eKGWlT"
            // },
            // {
            // "State": "Andhra Pradesh",
            // "State_Code": 2,
            // "District": "Krishna",
            // "District_Code": 9,
            // "City": "Vijayawada",
            // "City_Code": 57,
            // "Volunteer_Name": "Murali Krishna Ganguri",
            // "Contact_Number": 8309080672,
            // "BitLink": "https://bit.ly/3oRb6s5"
            // },
            // {
            // "State": "Andhra Pradesh",
            // "State_Code": 2,
            // "District": "Visakhapatnam",
            // "District_Code": 14,
            // "City": "Visakhapatnam",
            // "City_Code": 110,
            // "Volunteer_Name": "Mohammed Taha Khan",
            // "Contact_Number": 6303160604,
            // "BitLink": "https://bit.ly/34g4qKR"
            // },
            // {
            // "State": "Bihar",
            // "State_Code": 5,
            // "District": "Patna",
            // "District_Code": 101,
            // "City": "Patna",
            // "City_Code": 84,
            // "Volunteer_Name": "Jaya kumari",
            // "Contact_Number": 9304611151,
            // "BitLink": "https://bit.ly/3w3eR0d"
            // },
            // {
            // "State": "Chhattisgarh",
            // "State_Code": 7,
            // "District": "Raipur",
            // "District_Code": 138,
            // "City": "Raipur",
            // "City_Code": 141,
            // "Volunteer_Name": "Honey Gupta",
            // "Contact_Number": 7879331484,
            // "BitLink": "https://bit.ly/3w0IYFd"
            // },
            // {
            // "State": "Delhi",
            // "State_Code": 9,
            // "District": "Delhi",
            // "District_Code": 742,
            // "City": "Delhi",
            // "City_Code": 149,
            // "Volunteer_Name": "Sachin",
            // "Contact_Number": 9013955083,
            // "BitLink": "https://bit.ly/3nXOGFi"
            // },
            // {
            // "State": "Delhi",
            // "State_Code": 9,
            // "District": "Delhi",
            // "District_Code": 742,
            // "City": "Delhi",
            // "City_Code": 149,
            // "Volunteer_Name": "Mukulm",
            // "Contact_Number": 9599006765,
            // "BitLink": "https://bit.ly/3f7K6A9"
            // },
            // {
            // "State": "Delhi",
            // "State_Code": 9,
            // "District": "Delhi",
            // "District_Code": 742,
            // "City": "Delhi",
            // "City_Code": 149,
            // "Volunteer_Name": "Shashi Barla",
            // "Contact_Number": 9818061788,
            // "BitLink": "https://bit.ly/3f21sP6"
            // },
            // {
            // "State": "Delhi",
            // "State_Code": 9,
            // "District": "Delhi",
            // "District_Code": 742,
            // "City": "Delhi",
            // "City_Code": 149,
            // "Volunteer_Name": "Mukulm",
            // "Contact_Number": 9599006765,
            // "BitLink": "https://bit.ly/3f7K6A9"
            // },
            // {
            // "State": "Delhi",
            // "State_Code": 9,
            // "District": "Delhi",
            // "District_Code": 742,
            // "City": "Delhi",
            // "City_Code": 149,
            // "Volunteer_Name": "Brijesh singh",
            // "Contact_Number": 8097192580,
            // "BitLink": "https://bit.ly/3ujYLhf"
            // },
            // {
            // "State": "Delhi",
            // "State_Code": 9,
            // "District": "Delhi",
            // "District_Code": 742,
            // "City": "Delhi",
            // "City_Code": 149,
            // "Volunteer_Name": "Komal Priya Chaturvedi",
            // "Contact_Number": 9868121191,
            // "BitLink": "https://bit.ly/2R9OMxA"
            // },
            // {
            // "State": "Delhi",
            // "State_Code": 9,
            // "District": "Delhi",
            // "District_Code": 742,
            // "City": "Delhi",
            // "City_Code": 149,
            // "Volunteer_Name": "Ribhav R Karthikeyan",
            // "Contact_Number": 9871234224,
            // "BitLink": "https://bit.ly/3o3l5dC"
            // },
            // {
            // "State": "Delhi",
            // "State_Code": 9,
            // "District": "Delhi",
            // "District_Code": 742,
            // "City": "Delhi",
            // "City_Code": 149,
            // "Volunteer_Name": "Ashish",
            // "Contact_Number": 9899989167,
            // "BitLink": "https://bit.ly/3w2jaJ7"
            // },
            // {
            // "State": "Delhi",
            // "State_Code": 9,
            // "District": "Delhi",
            // "District_Code": 742,
            // "City": "Delhi",
            // "City_Code": 149,
            // "Volunteer_Name": "Sachin",
            // "Contact_Number": 9013955083,
            // "BitLink": "https://bit.ly/3nXOGFi"
            // },
            // {
            // "State": "Delhi",
            // "State_Code": 9,
            // "District": "Delhi",
            // "District_Code": 742,
            // "City": "Delhi",
            // "City_Code": 149,
            // "Volunteer_Name": "Shashi Barla",
            // "Contact_Number": 9818061788,
            // "BitLink": "https://bit.ly/3f21sP6"
            // }
            // ]}
        }]);

