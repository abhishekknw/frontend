angular.module('machadaloPages').filter('replace', [function () {
    return function (input, from, to) {

        if (input === undefined) {
            return;
        }
        var regex = new RegExp(from, 'g');
        return input.replace(regex, to);
    };
}]).controller('covidCasesCtrl',
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
                    $scope.stateParam[i] = $scope.stateParam[i].charAt(0).toLowerCase() + $scope.stateParam[i].slice(1);
                }
                // $scope.stateParam = $scope.stateParam.toString();
                // $scope.stateParam = $scope.stateParam.replace(',', " ");
                $scope.stateParam = $scope.stateParam.join(" ");
            }
            if ($location.search().city) {
                $scope.cityParam = $location.search().city;
                $scope.cityParam = $scope.cityParam.split(" ");
                for (let i in $scope.cityParam) {
                    $scope.cityParam[i] = $scope.cityParam[i].charAt(0).toLowerCase() + $scope.cityParam[i].slice(1);
                }
                // $scope.cityParam = $scope.cityParam.toString();
                // $scope.cityParam = $scope.cityParam.replace(',', " ");
                $scope.cityParam = $scope.cityParam.join(" ");
        
            }
            url[0] = url[0].substring(1);
            let cat = url[0].substring(0, 1).toUpperCase() + url[0].substring(1);
            $scope.selectedCategory = cat;
            $scope.todayDate = new Date();
            $scope.yesterdayDate = new Date($scope.todayDate)
            $scope.yesterdayDate = $scope.yesterdayDate.setDate($scope.yesterdayDate.getDate() - 1)
            if ($scope.selectedCategory == 'Covidcases') {
                $scope.selectedCategory = 'Covid Cases';
            }

            $scope.loading = true;
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
                $scope.hospitalDetailData = [];
            }


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

                        // for (let i in $scope.categorysArray) {
                        //     if ($scope.categorysArray[i].name == 'Ambulance') {
                        //         $scope.categorysArray.splice(i, 1);
                        //         $scope.categorysArrayNew = $scope.categorysArray;
                        //     }
                        // }

                        // for (let j in $scope.categorysArrayNew) {
                        //     if ($scope.categorysArrayNew[j].name == 'Plasma') {
                        //         $scope.categorysArrayNew.splice(j, 1);
                        //         $scope.categorysArray = $scope.categorysArrayNew;
                        //     }
                        // }
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

            $scope.getCovidCasesState = function () {
                AuthService.getCovidCasesState($scope.selectedCategoryCode)
                    .then(function onSuccess(response) {
                        $scope.stateData = response.data.data;
                        if (url.length > 1 && $scope.stateData) {
                            var localindex_index = $scope.stateData.map(function (el) {
                                return el.state;
                            }).indexOf($scope.stateParam);
                            if (localindex_index != -1) {
                                $scope.selectedStateName = $scope.stateData[localindex_index].state;
                                $scope.state_code = $scope.stateData[localindex_index].state_code;
                                 $scope.getCity('setDynamic');
                                 if(!$scope.cityParam){
                                    $scope.getCovidCases('setDynamic');
                                 }
                                 
                            }
                        }
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.getCity = function (value) {
                if(value != 'setDynamic'){
                    var localindex_index = $scope.stateData.map(function (el) {
                        return el.state_code;
                    }).indexOf($scope.state_code);
                    if (localindex_index != -1) {
                        $scope.selectedStateName = $scope.stateData[localindex_index].state;
                        $location.search('state', $scope.selectedStateName).replace();
                    }
                }
                
                $scope.district_code = null;
                $scope.selectedCityName = null;
                let param = {
                    stateCode: $scope.state_code
                }
                AuthService.getCovidCasesCity(param)
                    .then(function onSuccess(response) {
                        $scope.cityData = response.data.data;
                        // if(value != 'setDynamic'){
                        //     $scope.cityData.splice(0, 0, { 'district_code': 'all', 'district_name': 'all' });
                        //     $scope.district_code = 'all';
                        // } else {
                            $scope.cityData.splice(0, 0, { 'district_code': 'all', 'district_name': 'All Districts' });
                            $scope.district_code = 'all';
                       // }
                        

                        if(value == 'setDynamic' && (url.length > 1 && $scope.state_code) && $scope.cityParam){
                            var localindex_index_city = $scope.cityData.map(function (el) {
                                return el.district_name;
                            }).indexOf($scope.cityParam);
                            if (localindex_index_city != -1) {
                                $scope.selectedCityName = $scope.cityData[localindex_index_city].district_name;
                                $scope.district_code = $scope.cityData[localindex_index_city].district_code;
                                $scope.getCovidCases('setDynamic');
                            }
                        }
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.totalConfirmedCases = 0;
            $scope.totalActiveCases = 0;
            $scope.totalRecoveredCases = 0;
            $scope.totalDeceasedCases = 0;

            $scope.yesterdayTotalConfirmedCases = 0;
            $scope.yesterdayTotalActiveCases = 0;
            $scope.yesterdayTotalRecoveredCases = 0;
            $scope.yesterdayTotalDeceasedCases = 0;
            $scope.getCovidCases = function (value) {
                
                if ($scope.district_code && value != 'setDynamic') {
                    var localindex_index = $scope.cityData.map(function (el) {
                        return el.district_code;
                    }).indexOf($scope.district_code);
                    if (localindex_index != -1) {
                        $scope.selectedCityName = $scope.cityData[localindex_index].district_name;
                        $location.search('city', $scope.selectedCityName).replace()
                    }
                }

                $scope.totalConfirmedCases = 0;
                $scope.totalActiveCases = 0;
                $scope.totalRecoveredCases = 0;
                $scope.totalDeceasedCases = 0;

                $scope.yesterdayTotalConfirmedCases = 0;
                $scope.yesterdayTotalActiveCases = 0;
                $scope.yesterdayTotalRecoveredCases = 0;
                $scope.yesterdayTotalDeceasedCases = 0;

                $scope._7dayTotalConfirmedCases = 0;
                $scope._7dayTotalActiveCases = 0;
                $scope._7dayTotalRecoveredCases = 0;
                $scope._7dayTotalDeceasedCases = 0;

                $scope._14dayTotalConfirmedCases = 0;
                $scope._14dayTotalActiveCases = 0;
                $scope._14dayTotalRecoveredCases = 0;
                $scope._14dayTotalDeceasedCases = 0;
                let param = {
                    state_code: $scope.state_code,
                    district_code: $scope.district_code
                }
                AuthService.getCovidCases(param)
                    .then(function onSuccess(response) {
                        $scope.covidCasesData = response.data.data;
                        if ($scope.covidCasesData && $scope.covidCasesData.length > 0) {
                            for (let i in $scope.covidCasesData) {
                                $scope.totalConfirmedCases = $scope.totalConfirmedCases + $scope.covidCasesData[i].confirmed;
                                $scope.totalActiveCases = $scope.totalActiveCases + $scope.covidCasesData[i].active;
                                $scope.totalRecoveredCases = $scope.totalRecoveredCases + $scope.covidCasesData[i].recovered;
                                $scope.totalDeceasedCases = $scope.totalDeceasedCases + $scope.covidCasesData[i].deceased;

                                $scope.yesterdayTotalConfirmedCases = $scope.yesterdayTotalConfirmedCases + $scope.covidCasesData[i].yesterday_confirmed;
                                $scope.yesterdayTotalActiveCases = $scope.yesterdayTotalActiveCases + $scope.covidCasesData[i].yesterday_active;
                                $scope.yesterdayTotalRecoveredCases = $scope.yesterdayTotalRecoveredCases + $scope.covidCasesData[i].yesterday_recovered;
                                $scope.yesterdayTotalDeceasedCases = $scope.yesterdayTotalDeceasedCases + $scope.covidCasesData[i].yesterday_deceased;

                                $scope._7dayTotalConfirmedCases = $scope._7dayTotalConfirmedCases + $scope.covidCasesData[i]['7_days_avg'].confirmed;
                                $scope._7dayTotalActiveCases = $scope._7dayTotalActiveCases + $scope.covidCasesData[i]['7_days_avg'].active;
                                $scope._7dayTotalRecoveredCases = $scope._7dayTotalRecoveredCases + $scope.covidCasesData[i]['7_days_avg'].recovered;
                                $scope._7dayTotalDeceasedCases = $scope._7dayTotalDeceasedCases + $scope.covidCasesData[i]['7_days_avg'].deceased;

                                $scope._14dayTotalConfirmedCases = $scope._14dayTotalConfirmedCases + $scope.covidCasesData[i]['14_days_avg'].confirmed;
                                $scope._14dayTotalActiveCases = $scope._14dayTotalActiveCases + $scope.covidCasesData[i]['14_days_avg'].active;
                                $scope._14dayTotalRecoveredCases = $scope._14dayTotalRecoveredCases + $scope.covidCasesData[i]['14_days_avg'].recovered;
                                $scope._14dayTotalDeceasedCases = $scope._14dayTotalDeceasedCases + $scope.covidCasesData[i]['14_days_avg'].deceased;
                            }
                        }
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

        }]);

