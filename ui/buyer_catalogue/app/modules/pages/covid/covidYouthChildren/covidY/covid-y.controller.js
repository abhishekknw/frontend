angular.module('machadaloPages').filter('replace', [function () {
    return function (input, from, to) {

        if (input === undefined) {
            return;
        }
        var regex = new RegExp(from, 'g');
        return input.replace(regex, to);
    };
}]).controller('covidYouthCtrl',
    ['$scope', '$rootScope', '$window', '$location', 'AuthService', '$sce', 'suspenseLeadService', '$state', 'userService', 'constants', 'AuthService', 'vcRecaptchaService',
        function ($scope, $rootScope, $window, $location, AuthService, $sce, suspenseLeadService, $state, userService, constants, AuthService, vcRecaptchaService) {
            AuthService.Clear();

            var url = $location.url().split("/");
            // $scope.categorys = ['Hospital Beds', 'Cylinders','Refills', 'Concentrators'];
            let cat = url[1].substring(0, 1).toUpperCase() + url[1].substring(1);
            // $scope.selectedCategory = cat;
            $scope.selectedCategory = "";
            $scope.selectedSubCategory = "";
            $scope.loading = true;

            $scope.getCategory = function () {
                // AuthService.getAllCategory()
                //     .then(function onSuccess(response) {
                //         $scope.categorysArray = response.data.data;
                //         $scope.categorysArray.push(

                //          {
                //             "category_code": "",
                //             "keyword": "MDConsulation",
                //             "name": "Free Online Doctor Consulation",
                //         });


                //         if ($scope.selectedCategory && $scope.categorysArray.length > 0) {
                //             let selectedCategoryname = $scope.selectedCategory;
                //             var localindex_index = $scope.categorysArray.map(function (el) {
                //                 return el.name;
                //             }).indexOf(selectedCategoryname);
                //             if (localindex_index != -1) {
                //                 $scope.selectedCategoryCode = $scope.categorysArray[localindex_index].category_code;
                //                 $scope.selectedCategoryKeyword = $scope.categorysArray[localindex_index].keyword;
                //                 $scope.getState();
                //             }
                //         }
                //     }).catch(function onError(response) {
                //         console.log(response);
                //     })
                $scope.categorysArray = [{
                    "category_code": "",
                    "keyword": "Social and Emotional Quotient",
                    "name": "Social and Emotional Quotient ",
                }, {
                    "category_code": "",
                    "keyword": "Covid Prevention",
                    "name": "Covid Prevention",
                }, {
                    "category_code": "",
                    "keyword": "Healthy Eating and Exercise",
                    "name": "Healthy Eating and Exercise",
                }, {
                    "category_code": "",
                    "keyword": "Yoga and Mindfulness",
                    "name": "Yoga and Mindfulness",
                }]
                $scope.ageArray = [
                    { 'age': 'Toddlers (<4yrs)' },
                    { 'age': 'Class KG' },
                    { 'age': 'Class 1' },
                    { 'age': 'Class 2' },
                    { 'age': 'Class 3' },
                    { 'age': 'Class 4' },
                    { 'age': 'Class 5' },
                    { 'age': 'Class 6' },
                    { 'age': 'Class 7' },
                    { 'age': 'Class 8' },
                    { 'age': 'Class 9' },
                    { 'age': 'Class 10' },
                    { 'age': 'Class 11' },
                    { 'age': 'Class 12' },
                    { 'age': 'Professionals' },

                ]
                $scope.subCategoryArray = [
                    {
                        "subcategory_code": "",
                        "keyword": "Math",
                        "name": "Math",
                    }, {
                        "subcategory_code": "",
                        "keyword": "Science",
                        "name": "Science",
                    }, {
                        "subcategory_code": "",
                        "keyword": "English",
                        "name": "English",
                    }, {
                        "subcategory_code": "",
                        "keyword": "History",
                        "name": "History",
                    }]
            }

            $scope.youthChildrenList = function () {
                let param = {
                    category: $scope.selectedCategory,
                    age: $scope.selectedAge,
                    subcategory: $scope.selectedSubCategory,
                }
                AuthService.youthChildrenList(param)
                    .then(function onSuccess(response) {
                        $scope.youthData = response.data.data.result;
                        if ($scope.youthData.length > 0) {
                            for (let i in $scope.youthData) {
                                if (i == 0) {
                                    $scope.youthData[i].demolink = $sce.trustAsResourceUrl('https://www.youtube.com/embed/yubzJw0uiE4');
                                } else if (i == 1) {
                                    $scope.youthData[i].demolink = $sce.trustAsResourceUrl('https://www.youtube.com/embed/bDtxF7qSofg?start=290&&end=437');
                                } else if (i == 2) {
                                    $scope.youthData[i].demolink = $sce.trustAsResourceUrl('https://www.youtube.com/embed/zIfo3vdlWq4');
                                } else {
                                    $scope.youthData[i].demolink = $sce.trustAsResourceUrl('https://www.youtube.com/embed/3kGFBBy3Lyg');
                                }

                                //$scope.youthData[i].link = 'https://www.youtube.com/embed/' + $scope.youthData[i].link;
                            }
                        }
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.getCategoryList = function () {
                $scope.categorysArray = [];
                $scope.youthData = [];
                $scope.subCategoryArray = [];
                $scope.subSubCategoryArray = [];
                $scope.selectedCategory = "";
                $scope.selectedSubCategory = "";
                $scope.selectedSubSubCategory = "";
                for (let i in $scope.covidCasesData) {
                    if ($scope.selectedAge == $scope.covidCasesData[i].Class) {
                        let emdUrl = $scope.covidCasesData[i]['Embed URL']
                        if (emdUrl.indexOf('watch?v=') != -1) {
                            emdUrl = emdUrl.replace("watch?v=", "embed/");
                        }
                        $scope.covidCasesData[i].EmbedUrl = $sce.trustAsResourceUrl(emdUrl);
                        $scope.youthData.push($scope.covidCasesData[i]);
                        let category = $scope.covidCasesData[i]['category/subject'];
                        var localindex_index = $scope.categorysArray.map(function (el) {
                            return el.name;
                        }).indexOf(category);
                        if (localindex_index == -1) {
                            $scope.categorysArray.push({
                                "category_code": "",
                                "keyword": category,
                                "name": category
                            })
                        }
                    }
                }
                $scope.youthDataNew = $scope.youthData;
                // console.log('AAAAAAAAAAAAAAAAAAAAA$scope.youthData', $scope.youthData.length);
                // console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBB$scope.categorysArray', $scope.categorysArray);
            }

            $scope.getSubCategoryList = function () {
                $scope.subCategoryArray = [];
                // $scope.youthData = [];
                $scope.youthDataNew = [];
                $scope.subSubCategoryArray = [];
                $scope.selectedSubCategory = "";
                $scope.selectedSubSubCategory = "";
                for (let i in $scope.youthData) {
                    if (($scope.selectedCategory == $scope.youthData[i]['category/subject']) && ($scope.selectedAge == $scope.youthData[i].Class)) {
                        let emdUrl = $scope.youthData[i]['Embed URL']
                        if (emdUrl.indexOf('watch?v=') != -1) {
                            emdUrl = emdUrl.replace("watch?v=", "embed/");
                        }
                        $scope.youthData[i].EmbedUrl = $sce.trustAsResourceUrl(emdUrl);
                        $scope.youthDataNew.push($scope.youthData[i])
                        let subcategory = $scope.youthData[i]['topic/subcategory'];
                        var localindex_index = $scope.subCategoryArray.map(function (el) {
                            return el.name;
                        }).indexOf(subcategory);
                        if (localindex_index == -1) {
                            $scope.subCategoryArray.push({
                                "subcategory_code": "",
                                "keyword": subcategory,
                                "name": subcategory
                            })
                        }
                    }
                }
                $scope.youthData = $scope.youthDataNew;
                // console.log('AAAAAAAAAAAAAAAAAAAAA$scope.youthData', $scope.youthData);
                // console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBB$scope.subCategoryArray', $scope.subCategoryArray);
            }

            $scope.getSubSubCategoryList = function () {

                $scope.selectedSubSubCategory = "";
                $scope.subSubCategoryArray = [];
                // $scope.youthData = [];
                $scope.youthDataNew = [];
                for (let i in $scope.youthData) {
                    if (($scope.selectedSubCategory == $scope.youthData[i]['topic/subcategory']) && ($scope.selectedCategory == $scope.youthData[i]['category/subject']) && ($scope.selectedAge == $scope.youthData[i].Class)) {
                        let emdUrl = $scope.youthData[i]['Embed URL']
                        if (emdUrl.indexOf('watch?v=') != -1) {
                            emdUrl = emdUrl.replace("watch?v=", "embed/");
                        }
                        $scope.youthData[i].EmbedUrl = $sce.trustAsResourceUrl(emdUrl);
                        $scope.youthDataNew.push($scope.youthData[i])
                        let subsubcategory = $scope.youthData[i]['subtopic/subsubcategory'];
                        var localindex_index = $scope.subSubCategoryArray.map(function (el) {
                            return el.name;
                        }).indexOf(subsubcategory);
                        if (localindex_index == -1) {
                            $scope.subSubCategoryArray.push({
                                "subsubcategory_code": "",
                                "keyword": subsubcategory,
                                "name": subsubcategory
                            })
                        }
                    }
                }
                $scope.youthData = $scope.youthDataNew;
                // console.log('AAAAAAAAAAAAAAAAAAAAA$scope.youthData', $scope.youthData);
                // console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBB$scope.subSubCategoryArray', $scope.subSubCategoryArray);
            }

            $scope.getList = function () {
                // $scope.youthData = [];
                $scope.youthDataNew = [];
                for (let i in $scope.youthData) {
                    if (($scope.selectedSubSubCategory == $scope.youthData[i]['subtopic/subsubcategory']) && ($scope.selectedSubCategory == $scope.youthData[i]['topic/subcategory']) && ($scope.selectedCategory == $scope.youthData[i]['category/subject']) && ($scope.selectedAge == $scope.youthData[i].Class)) {
                        let emdUrl = $scope.youthData[i]['Embed URL']
                        if (emdUrl.indexOf('watch?v=') != -1) {
                            emdUrl = emdUrl.replace("watch?v=", "embed/");
                        }
                        $scope.youthData[i].EmbedUrl = $sce.trustAsResourceUrl(emdUrl);
                        $scope.youthDataNew.push($scope.youthData[i])
                    }
                }
                $scope.youthData = $scope.youthDataNew;
                // console.log('AAAAAAAAAAAAAAAAAAAAA$scope.youthData', $scope.youthData);

            }
            $scope.covidCasesData = constants.covidCasesData;
        }]);