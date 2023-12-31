angular.module('machadaloPages').filter('replace', [function () {
    return function (input, from, to) {

        if (input === undefined) {
            return;
        }
        var regex = new RegExp(from, 'g');
        return input.replace(regex, to);
    };
}]).controller('covidLandingCtrl',
    ['$scope', '$rootScope', '$window', '$location', 'AuthService', 'suspenseLeadService', '$state', 'userService', 'constants', 'AuthService', 'vcRecaptchaService',
        function ($scope, $rootScope, $window, $location, AuthService, suspenseLeadService, $state, userService, constants, AuthService, vcRecaptchaService) {
            AuthService.Clear();

            var url = $location.url().split("/");
            let cat = "";
            $scope.selectedCategory = cat;
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
                // if ($scope.selectedCategory == 'Hospital Beds' || $scope.selectedCategory == 'Beds') {
                //     $location.path("/hospitalbeds/covidhelpdesk/");
                // } else if ($scope.selectedCategory == 'Refills') {
                //     $location.path("/refills/covidhelpdesk/");
                // } else if ($scope.selectedCategory == 'Concentrators') {
                //     $location.path("/concentrators/covidhelpdesk/");
                // } else if ($scope.selectedCategory == 'Cylinders') {
                //     $location.path("/cylinders/covidhelpdesk/");
                // } else if ($scope.selectedCategory == 'Medicines') {
                //     $location.path("/medicines/covidhelpdesk/");
                // } else if ($scope.selectedCategory == 'Covid Cases' || $scope.selectedCategory == 'Covidcases') {
                //     $location.path("/covidcases/covidhelpdesk/");
                // }

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
                }  else if ($scope.selectedCategory == 'Free Online Doctor Consulation') {
                    $location.path("/doctors");
                } else if ($scope.selectedCategory == 'Covid Cases' || $scope.selectedCategory == 'Covidcases') {
                    $location.path("/covidcases");
                } else if ($scope.selectedCategory == 'Vaccine Centers') {
                    $location.path("/vaccinecenters/");
                }
                $scope.cylinderDetailData = [];
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
                }
                $scope.cylinderDetailData = [];
            }

        }]);

