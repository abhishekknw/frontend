angular.module('machadaloPages').filter('replace', [function () {
    return function (input, from, to) {

        if (input === undefined) {
            return;
        }
        var regex = new RegExp(from, 'g');
        return input.replace(regex, to);
    };
}]).controller('covidMeaCtrl',
    ['$scope', '$rootScope', '$window', '$location', 'AuthService', 'suspenseLeadService', '$state', 'userService', 'constants', 'AuthService', 'vcRecaptchaService',
        function ($scope, $rootScope, $window, $location, AuthService, suspenseLeadService, $state, userService, constants, AuthService, vcRecaptchaService) {
            AuthService.Clear();
            var url = $location.url().split("/");
            // $scope.categorys = ['Hospital Beds', 'Cylinders','Refills', 'Concentrators'];
            let cat = url[1].substring(0, 1).toUpperCase() + url[1].substring(1);
            $scope.selectedCategory = cat;
            if ($scope.selectedCategory == 'Doctors') {
                $scope.selectedCategory = 'Free Online Doctor Consulation';
            }
            console.log('++++++++++++++++++++++++++++', $scope.selectedCategory);
            if ($scope.selectedCategory == 'Vaccinecenters') {
                $scope.selectedCategory = 'Vaccine Centers';
            }
            if ($scope.selectedCategory == 'Ambulance') {
                $scope.newSelectedCategory = 'Ambulance';
            } else if ($scope.selectedCategory == 'Plasma') {
                $scope.newSelectedCategory = 'Plasma';
            } else {
                $scope.newSelectedCategory = $scope.selectedCategory.slice(0, -1);
            }

            $scope.loading = true;

            $scope.getCategory1 = function () {
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
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.changeWeb = function () {
                if ($scope.selectedCategory == 'Hospital Beds' || $scope.selectedCategory == 'Beds') {
                    $location.path("/hospitalbeds/");
                } else if ($scope.selectedCategory == 'Refills') {
                    $location.path("/refills/");
                } else if ($scope.selectedCategory == 'Concentrators') {
                    $location.path("/concentrators/");
                } else if ($scope.selectedCategory == 'Cylinders') {
                    $location.path("/cylinders/");
                } else if ($scope.selectedCategory == 'Medicines') {
                    $location.path("/medicines/");
                } else if ($scope.selectedCategory == 'Ambulance') {
                    $location.path("/ambulance/");
                } else if ($scope.selectedCategory == 'Plasma') {
                    $location.path("/plasma/");
                } else if ($scope.selectedCategory == 'Free Online Doctor Consulation') {
                    $location.path("/doctors/");
                } else if ($scope.selectedCategory == 'Covid Cases' || $scope.selectedCategory == 'Covidcases') {
                    $location.path("/covidcases/");
                } else if ($scope.selectedCategory == 'Vaccinecenters') {
                    $location.path("/vaccinecenters/");
                }
                $scope.cylinderDetailData = [];
            }

            $scope.getState = function () {
                AuthService.getAllState($scope.selectedCategoryCode)
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
                $scope.city_code = null;
                $scope.selectedCityName = null;
                $scope.cylinderDetailData = [];
                let param = {
                    categoryCode: $scope.selectedCategoryCode,
                    stateCode: $scope.state_code
                }
                AuthService.getAllCity(param)
                    .then(function onSuccess(response) {
                        $scope.cityData = response.data.data;
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }


            $scope.getCylinderList = function () {
                var localindex_index = $scope.cityData.map(function (el) {
                    return el.city_code;
                }).indexOf($scope.city_code);
                if (localindex_index != -1) {
                    $scope.selectedCityName = $scope.cityData[localindex_index].city_name;
                }
                $scope.loading = null;
                let param = {
                    city: $scope.selectedCityName,
                    categoryKeyword: $scope.selectedCategoryKeyword
                }
                $scope.cylinderDetailData = [];
                $scope.errorMsg = "";
                AuthService.getAllCylinder(param)
                    .then(function onSuccess(response) {
                        $scope.loading = response;
                        if (response.data && response.data.data && !response.data.data.data) {
                            $scope.cylinderDetailData = response.data.data;
                            if (!$scope.cylinderDetailData.length) {
                                $scope.errorMsg = "No Data Available"
                            }
                            if ($scope.cylinderDetailData.length > 0) {
                                $scope.getVolunteer();
                            }
                        }
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.getVolunteer = function () {
                AuthService.getAllVolunteer($scope.selectedCityName)
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

                        for (let j in $scope.cylinderDetailData) {
                            // if($scope.cylinderDetailData[j].MDContactNumber){
                            //     $scope.cylinderDetailData[j].MDContactNumber = JSON.parse($scope.cylinderDetailData[j].MDContactNumber);
                            // }

                            for (let k in $scope.volunteerData) {
                                if ($scope.volunteerData.length == 1) {
                                    $scope.cylinderDetailData[j].Volunteer_Name = $scope.volunteerData[k].Volunteer_Name;
                                    $scope.cylinderDetailData[j].BitLink = $scope.volunteerData[k].BitLink;
                                } else {
                                    if (!$scope.lastIndex || $scope.lastIndex == k) {
                                        $scope.cylinderDetailData[j].Volunteer_Name = $scope.volunteerData[k].Volunteer_Name;
                                        $scope.cylinderDetailData[j].BitLink = $scope.volunteerData[k].BitLink;
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
                    "contact_number": $scope.cylinderDetailData[index].MDContactNumber,
                    "contact_name": $scope.cylinderDetailData[index].MDContactName
                }
                if ($scope.cylinderDetailData[index].resourcesAvailableButton) {
                    param.feedback = '-Resources Available';
                    $scope.cylinderDetailData[index].resourcesAvailableButton = false;
                    swal("Feedback Removed", "Successfully", "success");

                } else {
                    $scope.cylinderDetailData[index].resourcesAvailableButton = true;
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
                    "contact_number": $scope.cylinderDetailData[index].MDContactNumber,
                    "contact_name": $scope.cylinderDetailData[index].MDContactName
                }
                if ($scope.cylinderDetailData[index].notAvailableButton) {
                    param.feedback = '-Not Available';
                    $scope.cylinderDetailData[index].notAvailableButton = false;
                    swal("Feedback Removed", "Successfully", "success");
                } else {
                    $scope.cylinderDetailData[index].notAvailableButton = true;
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
                    "contact_number": $scope.cylinderDetailData[index].MDContactNumber,
                    "contact_name": $scope.cylinderDetailData[index].MDContactName
                }
                if ($scope.cylinderDetailData[index].wrongNumberButton) {
                    param.feedback = '-Wrong Number';
                    $scope.cylinderDetailData[index].wrongNumberButton = false;
                    swal("Feedback Removed", "Successfully", "success");
                } else {
                    $scope.cylinderDetailData[index].wrongNumberButton = true;
                    swal("Feedback Accepted", "Successfully", "success");
                }
            }

            /*new mea controller code** */

            $scope.getToc = function () {
           
                let param = {
                    type_of_customer: "", 
                    category: "", 
                    subcategory: "",
                    subsubcategory: ""
                }
                AuthService.getAllMeaData(param)
                
                    .then(function onSuccess(response) {
                        console.log(response)
                        $scope.typeofCustomer=response.data.data.Toc ; 
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.getCategory= function (value) {
                console.log(value)
$scope.selectedToc=value;
                console.log($scope.selectedToc)

             
                let param = {
                    type_of_customer: $scope.selectedToc, 
                    category: "", 
                    subcategory: "",
                    subsubcategory: ""
                }
                AuthService.getAllMeaData(param)
                
                    .then(function onSuccess(response) {
                        console.log(response)
                        $scope.categoryArray=response.data.data.category ; 
                        console.log('1111111111111',$scope.categoryArray)

                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.getSubCategory= function (value) {
                console.log(value)
                $scope.selectedcategory=value;
                console.log($scope.selectedcategory)
               

                console.log($scope.selectedcategory)


                let param = {
                    type_of_customer: $scope.selectedToc, 
                    category: $scope.selectedcategory, 
                    subcategory: "",
                    subsubcategory: ""
                }
                AuthService.getAllMeaData(param)
                
                    .then(function onSuccess(response) {
                        console.log(response)
                        $scope.subcategoryArray=response.data.data.subcategory ; 
                        console.log('1111111111111',$scope.subcategoryArray)

                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.getSubSubCategory= function (value) {
                console.log(value)
                $scope.selectedsubcategory=value;
                console.log($scope.selectedsubcategory)

                console.log($scope.selectedsubcategory)

             
                let param = {
                    type_of_customer: $scope.selectedToc, 
                    category: $scope.selectedcategory, 
                    subcategory: $scope.selectedsubcategory,
                    subsubcategory: ""
                }
                AuthService.getAllMeaData(param)
                
                    .then(function onSuccess(response) {
                        console.log(response)
                        $scope.subsubcategoryArray=response.data.data.subsubcategory ; 
                        $scope.contentArray=response.data.data.content ; 
                        $scope.contentArray['compairing numbers'].push({ Comment: "Adding two digits on a number line"});
                        $scope.contentArray['compairing numbers'].push({ Comment: "Adding1 two digits on a number line"});
                        $scope.contentArray['compairing numbers'].push({ Comment: "Adding22 two digits on a number line"});
                        $scope.contentArray['compairing numbers'].push({ Comment: "Adding333 two digits on a number line"});
                        console.log('1111111111111',$scope.subsubcategoryArray)

                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

    

            $scope.getHeaderCategory = function(value){
                console.log($scope.selectedTocHeader)
                console.log(value)
                $scope.selectedTocHeader=value
            }

            $scope.getHeaderSubCategory = function(value){
                console.log($scope.selectedcategoryHeader)
                console.log(value)
                $scope.selectedcategoryHeader=value
            }


















        }]);

