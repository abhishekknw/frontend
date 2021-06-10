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

            var url = $location.url().split("/");
            let cat = url[1].substring(0, 1).toUpperCase() + url[1].substring(1);
            $scope.selectedCategory = cat;

            if ($scope.selectedCategory == 'Covidcases') {
                $scope.selectedCategory = 'Covid Cases';
            }

            $scope.loading = true;
            $scope.changeWeb = function () {
                if ($scope.selectedCategory == 'Hospital Beds' || $scope.selectedCategory == 'Beds') {
                    $location.path("/hospitalbeds/covidhelpdesk/");
                } else if ($scope.selectedCategory == 'Refills') {
                    $location.path("/refills/covidhelpdesk/");
                } else if ($scope.selectedCategory == 'Concentrators') {
                    $location.path("/concentrators/covidhelpdesk/");
                } else if ($scope.selectedCategory == 'Cylinders') {
                    $location.path("/cylinders/covidhelpdesk/");
                } else if ($scope.selectedCategory == 'Medicines') {
                    $location.path("/medicines/covidhelpdesk/");
                } else if ($scope.selectedCategory == 'Covid Cases' || $scope.selectedCategory == 'Covidcases') {
                    $location.path("/covidcases/covidhelpdesk/");
                }
                $scope.hospitalDetailData = [];
            }


            $scope.getCategory = function () {
                AuthService.getAllCategory()
                    .then(function onSuccess(response) {
                        $scope.categorysArray = response.data.data;
                        // $scope.categorysArray.push({
                        //     "category_code": "",
                        //     "keyword": "MDCovidcases",
                        //     "name": "Covid Cases",
                        // });

                        for (let i in $scope.categorysArray) {
                            if ($scope.categorysArray[i].name == 'Ambulance') {
                                $scope.categorysArray.splice(i, 1);
                                $scope.categorysArrayNew = $scope.categorysArray;
                            }
                        }

                        for (let j in $scope.categorysArrayNew) {
                            if ($scope.categorysArrayNew[j].name == 'Plasma') {
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

                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.getCovidCasesState = function () {
                AuthService.getCovidCasesState($scope.selectedCategoryCode)
                    .then(function onSuccess(response) {
                        $scope.stateData = response.data.data;
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.getCity = function () {
                var localindex_index = $scope.stateData.map(function (el) {
                    return el.state_code;
                }).indexOf($scope.state_code);
                if (localindex_index != -1) {
                    $scope.selectedStateName = $scope.stateData[localindex_index].state;
                }
                $scope.district_code = null;
                $scope.selectedCityName = null;
                let param = {
                    stateCode: $scope.state_code
                }
                AuthService.getCovidCasesCity(param)
                    .then(function onSuccess(response) {
                        $scope.cityData = response.data.data;
                        $scope.cityData.splice(0, 0, { 'district_code': 'all', 'district_name': 'all' });
                        $scope.district_code = 'all';
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.totalConfirmedCases = 0;
            $scope.totalActiveCases = 0;
            $scope.totalRecoveredCases = 0;
            $scope.totalDeceasedCases = 0;
            $scope.getCovidCases = function () {
                $scope.totalConfirmedCases = 0;
                $scope.totalActiveCases = 0;
                $scope.totalRecoveredCases = 0;
                $scope.totalDeceasedCases = 0;
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
                            }

                        }
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

        }]);

