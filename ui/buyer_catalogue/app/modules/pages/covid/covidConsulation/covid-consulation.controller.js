angular.module('machadaloPages').filter('replace', [function () {
    return function (input, from, to) {

        if (input === undefined) {
            return;
        }
        var regex = new RegExp(from, 'g');
        return input.replace(regex, to);
    };
}]).controller('covidConsulationCtrl',
    ['$scope', '$rootScope', '$window', '$location', 'AuthService', 'suspenseLeadService', '$state', 'userService', 'constants', 'AuthService', 'vcRecaptchaService',
        function ($scope, $rootScope, $window, $location, AuthService, suspenseLeadService, $state, userService, constants, AuthService, vcRecaptchaService) {
            AuthService.Clear();

            // var url = $location.url().split("/");
            // let cat = url[1].substring(0, 1).toUpperCase() + url[1].substring(1);

            var url = $location.url().split("?");
            if ($location.search().state) {
                $scope.stateParam = $location.search().state;
                $scope.stateParam = $scope.stateParam.split(" ");
                for (let i in $scope.stateParam) {
                    if($scope.stateParam[i] != 'and'){
                        $scope.stateParam[i] = $scope.stateParam[i].charAt(0).toUpperCase() + $scope.stateParam[i].slice(1);
                    }
                    
                }
                // $scope.stateParam = $scope.stateParam.toString();
                // $scope.stateParam = $scope.stateParam.replace(',', " ");
                $scope.stateParam = $scope.stateParam.join(" ");
            }

            url[0] = url[0].substring(1);
            let cat = url[0].substring(0, 1).toUpperCase() + url[0].substring(1);

            $scope.selectedCategory = cat;
            if ($scope.selectedCategory == 'Doctors') {
                $scope.selectedCategory = 'Free Online Doctor Consulation';
            }
            if ($scope.selectedCategory == 'Ambulance') {
                $scope.newSelectedCategory = 'Ambulance';
            } else if ($scope.selectedCategory == 'Plasma') {
                $scope.newSelectedCategory = 'Plasma';
            } else {
                $scope.newSelectedCategory = $scope.selectedCategory.slice(0, -1);
            }

            $scope.loading = true;

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
                                $scope.getState();
                            }
                        }
                        let newArray = [];
                        for(let i in $scope.categorysArray){
                            if($scope.categorysArray[i].name == 'Beds'){
                                newArray[0] = $scope.categorysArray[i];
                            }
                            if($scope.categorysArray[i].name == 'Free Online Doctor Consulation'){
                                newArray[1] = $scope.categorysArray[i];
                            }
                            if($scope.categorysArray[i].name == 'Medicines'){
                                newArray[2] = $scope.categorysArray[i];
                            }
                            if($scope.categorysArray[i].name == 'Ambulance'){
                                newArray[3] = $scope.categorysArray[i];
                            }
                            if($scope.categorysArray[i].name == 'Plasma'){
                                newArray[4] = $scope.categorysArray[i];
                            }
                            if($scope.categorysArray[i].name == 'Concentrators'){
                                newArray[5] = $scope.categorysArray[i];
                            }
                            if($scope.categorysArray[i].name == 'Cylinders'){
                                newArray[6] = $scope.categorysArray[i];
                            }
                            if($scope.categorysArray[i].name == 'Refills'){
                                newArray[7] = $scope.categorysArray[i];
                            }
                            if($scope.categorysArray[i].name == 'Covid Cases'){
                                newArray[8] = $scope.categorysArray[i];
                            }
                        }

                        $scope.categorysArray = newArray;
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.changeWeb = function () {
                if ($scope.selectedCategory == 'Hospital Beds' || $scope.selectedCategory == 'Beds') {
                    $location.path("/hospitalbeds");
                } else if ($scope.selectedCategory == 'Refills') {
                    $location.path("/refills");
                } else if ($scope.selectedCategory == 'Concentrators') {
                    $location.path("/concentrators");
                } else if ($scope.selectedCategory == 'Cylinders') {
                    $location.path("/cylinders");
                } else if ($scope.selectedCategory == 'Medicines') {
                    $location.path("/medicines");
                } else if ($scope.selectedCategory == 'Ambulance') {
                    $location.path("/ambulance");
                } else if ($scope.selectedCategory == 'Plasma') {
                    $location.path("/plasma");
                } else if ($scope.selectedCategory == 'Free Online Doctor Consulation') {
                    $location.path("/doctors");
                } else if ($scope.selectedCategory == 'Covid Cases' || $scope.selectedCategory == 'Covidcases') {
                    $location.path("/covidcases");
                } else if ($scope.selectedCategory == 'Vaccine Centers') {
                    $location.path("/vaccinecenters/");
                }
                $scope.consulationDetailData = [];
            }

            $scope.getState = function () {
                AuthService.getAllConsulationState()
                    .then(function onSuccess(response) {
                        $scope.stateData = response.data.data;
                        $scope.selectedStateName = 'Pan India';
                        if (url.length > 1 && $scope.stateData) {
                            var localindex_index = $scope.stateData.map(function (el) {
                                return el.state;
                            }).indexOf($scope.stateParam);
                            if (localindex_index != -1) {
                                $scope.selectedStateName = $scope.stateData[localindex_index].state;
                                // $scope.state_code = $scope.stateData[localindex_index].state_code;  
                            }
                        }
                        $scope.getConsulationList();

                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            // $scope.getCity = function () {
            //     var localindex_index = $scope.stateData.map(function (el) {
            //         return el.state_code;
            //     }).indexOf($scope.state_code);
            //     if (localindex_index != -1) {
            //         $scope.selectedStateName = $scope.stateData[localindex_index].state;
            //     }
            //     $scope.city_code = null;
            //     $scope.selectedCityName = null;
            //     $scope.consulationDetailData = [];
            //     let param = {
            //         categoryCode: $scope.selectedCategoryCode,
            //         stateCode: $scope.state_code
            //     }
            //     AuthService.getAllCity(param)
            //         .then(function onSuccess(response) {
            //             $scope.cityData = response.data.data;
            //         }).catch(function onError(response) {
            //             console.log(response);
            //         })
            // }


            $scope.getConsulationList = function () {
                $location.search('state', $scope.selectedStateName).replace();
                $scope.loading = null;
                let param = {
                    state: $scope.selectedStateName,
                }
                $scope.consulationDetailData = [];
                $scope.errorMsg = "";
                $scope.specializationList = [];
                AuthService.getAllConsulation(param)
                    .then(function onSuccess(response) {
                        $scope.loading = response;
                        if (response.data && response.data.data && !response.data.data.data) {
                            $scope.consulationDetailData = response.data.data;
                            if (!$scope.consulationDetailData.length) {
                                $scope.errorMsg = "No Data Available"
                            }
                            if ($scope.consulationDetailData.length > 0) {
                                for (let i in $scope.consulationDetailData) {
                                    if ($scope.specializationList.length > 0) {
                                        var localindex_index = $scope.specializationList.map(function (el) {
                                            return el.name;
                                        }).indexOf($scope.consulationDetailData[i].specialization);
                                        if (localindex_index == -1) {
                                            if ($scope.consulationDetailData[i].specialization != " ") {
                                                $scope.specializationList.push({ 'name': $scope.consulationDetailData[i].specialization });
                                            }

                                        }
                                    } else {
                                        if ($scope.consulationDetailData[i].specialization != " ") {
                                            $scope.specializationList.push({'name':"All"},{ 'name': $scope.consulationDetailData[i].specialization });
                                           
                                        }
                                    }
                                }

                                $scope.getVolunteer();
                            }
                        }
    
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.shorting = function (value) {
                $scope.sort = value;
                if(value == 'All'){
                    $scope.sort = "";
                }
            }

            $scope.getVolunteer = function () {
                AuthService.getAllConsulationVolunteer($scope.selectedStateName)
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

                        for (let j in $scope.consulationDetailData) {
                            // if($scope.consulationDetailData[j].MDContactNumber){
                            //     $scope.consulationDetailData[j].MDContactNumber = JSON.parse($scope.consulationDetailData[j].MDContactNumber);
                            // }

                            for (let k in $scope.volunteerData) {
                                if ($scope.volunteerData.length == 1) {
                                    $scope.consulationDetailData[j].Volunteer_Name = $scope.volunteerData[k].Volunteer_Name;
                                    $scope.consulationDetailData[j].BitLink = $scope.volunteerData[k].BitLink;
                                } else {
                                    if (!$scope.lastIndex || $scope.lastIndex == k) {
                                        $scope.consulationDetailData[j].Volunteer_Name = $scope.volunteerData[k].Volunteer_Name;
                                        $scope.consulationDetailData[j].BitLink = $scope.volunteerData[k].BitLink;
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


            $scope.triggerCall = function (number) {
                document.location.href = 'tel:' + number;
            }

            $scope.resourcesAvailable = function (index) {

                let param = {
                    "district": "",
                    "city": $scope.selectedCityName,
                    "category": $scope.selectedCategoryKeyword,
                    "feedback": 'Resources Available',
                    "contact_number": $scope.consulationDetailData[index].contact_number,
                    "contact_name": $scope.consulationDetailData[index].contact_name
                }
                if ($scope.consulationDetailData[index].resourcesAvailableButton) {
                    param.feedback = '-Resources Available';
                    $scope.consulationDetailData[index].resourcesAvailableButton = false;
                    swal("Feedback Removed", "Successfully", "success");

                } else {
                    $scope.consulationDetailData[index].resourcesAvailableButton = true;
                    swal("Feedback Accepted", "Successfully", "success");
                }
                AuthService.feedback(param)
                    .then(function onSuccess(response) {
                    }).catch(function onError(response) {
                        console.log(response);
                    })

            }

            $scope.notAvailable = function (index) {
                let param = {
                    "district": "",
                    "city": $scope.selectedCityName,
                    "category": $scope.selectedCategoryKeyword,
                    "feedback": 'Not Available',
                    "contact_number": $scope.consulationDetailData[index].contact_number,
                    "contact_name": $scope.consulationDetailData[index].contact_name
                }
                if ($scope.consulationDetailData[index].notAvailableButton) {
                    param.feedback = '-Not Available';
                    $scope.consulationDetailData[index].notAvailableButton = false;
                    swal("Feedback Removed", "Successfully", "success");
                } else {
                    $scope.consulationDetailData[index].notAvailableButton = true;
                    swal("Feedback Accepted", "Successfully", "success");
                }
                AuthService.feedback(param)
                    .then(function onSuccess(response) {
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.wrongNumber = function (index) {
                let param = {
                    "district": "",
                    "city": $scope.selectedCityName,
                    "category": $scope.selectedCategoryKeyword,
                    "feedback": 'Wrong Number',
                    "contact_number": $scope.consulationDetailData[index].contact_number,
                    "contact_name": $scope.consulationDetailData[index].contact_name
                }
                if ($scope.consulationDetailData[index].wrongNumberButton) {
                    param.feedback = '-Wrong Number';
                    $scope.consulationDetailData[index].wrongNumberButton = false;
                    swal("Feedback Removed", "Successfully", "success");
                } else {
                    $scope.consulationDetailData[index].wrongNumberButton = true;
                    swal("Feedback Accepted", "Successfully", "success");
                }
            }

        }]);

