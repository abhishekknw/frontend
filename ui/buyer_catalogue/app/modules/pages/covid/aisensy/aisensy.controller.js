angular.module('machadaloPages').filter('firstlater', [function () {
    return function (input, scope) {
        if (input != null)
            input = input.charAt(0).toUpperCase();
        return input;
    }
}]).directive("whenScrolled", function () {
    return {

        restrict: 'A',
        link: function (scope, elem, attrs) {

            // we get a list of elements of size 1 and need the first element
            raw = elem[0];

            // we load more elements when scrolled past a limit
            elem.bind("scroll", function () {
                if (raw.scrollTop + raw.offsetHeight + 5 >= raw.scrollHeight) {
                    scope.loading = true;

                    // we can give any function which loads more elements into the list
                    scope.$apply(attrs.whenScrolled);
                }
            });
        }
    }
}).controller('aisensyCtrl',
    ['$scope', '$rootScope', '$window', '$location', 'AuthService', '$anchorScroll', 'suspenseLeadService', '$state', 'userService', 'constants', 'AuthService', 'vcRecaptchaService', 'commonDataShare',
        function ($scope, $rootScope, $window, $location, AuthService, suspenseLeadService, $anchorScroll, $state, userService, constants, AuthService, vcRecaptchaService, permissions, commonDataShare) {
            // AuthService.Clear();

            let gooIndex = document.getElementById('goo-index');
            let hoverEnter = index => {
                gooIndex.style.top = 100 * index + 'px';
                let allScreens = document.querySelectorAll('.screen');
                allScreens.forEach(e => {
                    e.classList.remove('visible')
                })
                let nowVisible = document.getElementById('screen_' + index);
                nowVisible.classList.add('visible');
            }

            $scope.tab = { name: 'tabA' };



            // AIsensy controller
            $scope.getActiveUser = function (page) {
                $scope.showcontactDetail = false;
                $scope.showhistoryDetail = false;
                $scope.showChatModule = false;
                $scope.showgetActiveUser = true;
                $scope.showtemplateDetail = false;
                $scope.isUserProfile = false;
                //$scope.showfilterDetail = false;

                let param = {
                    next_page: 1
                }
                if (page) {
                    param.next_page = page;
                } else {
                    $scope.totalCount = 1;
                    $scope.currentPage = 1;
                    $scope.itemsPerPage = 10;
                    $scope.serial = 1
                    $scope.pagination = {
                        current: 1
                    };
                }
                AuthService.getAllActiveUserData(param)

                    .then(function onSuccess(response) {
                        $scope.activeUserData = response.data.data.users;
                        $scope.totalCount = response.data.data.total_count
                        console.log($scope.activeUserData)
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }
            $scope.formData = {};

            $scope.getActionRequiredUser = function (page) {
                $scope.isUserProfile = false;
                $scope.formData.interveneSearch = '';
                $scope.showChatModule = false;
                let param = {
                    next_page: 1,
                }
                if (page) {
                    param.next_page = page;
                } else {
                    $scope.totalCount = 1;
                    $scope.currentPage = 1;
                    $scope.itemsPerPage = 10;
                    $scope.serial = 1
                    $scope.pagination = {
                        current: 1
                    };
                }
                if ($scope.formData.actionSearch) {
                    param.search = $scope.formData.actionSearch;
                }
                AuthService.getAllActionRequiredData(param)

                    .then(function onSuccess(response) {
                        $scope.actionRequiredUserData = response.data.data.users;
                        $scope.totalCount = response.data.data.total_count
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.getInterveneUser = function (page) {
                $scope.isUserProfile = false;
                $scope.formData.actionSearch = '';
                $scope.showChatModule = false;
                let param = {
                    next_page: 1
                }
                if (page) {
                    param.next_page = page;
                } else {
                    $scope.totalCount = 1;
                    $scope.currentPage = 1;
                    $scope.itemsPerPage = 10;
                    $scope.serial = 1
                    $scope.pagination = {
                        current: 1
                    };
                }
                if ($scope.formData.interveneSearch) {
                    param.search = $scope.formData.interveneSearch;
                }
                AuthService.getAllInterveneUserData(param)

                    .then(function onSuccess(response) {
                        $scope.interveneUserData = response.data.data.users;
                        $scope.totalCount = response.data.data.total_count
                        console.log($scope.interveneUserData)
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }


            $scope.userDetail = function (value) {
                console.log("1232", value)
                $scope.showChatModule = true;
                let param = {
                    phoneNumber: value,
                    nextPage: 1
                }
                AuthService.getAllUserDetailData(param)

                    .then(function onSuccess(response) {
                        console.log(response)

                        $scope.userDetailData = response.data.data;
                    }).catch(function onError(response) {
                        console.log(response);
                    })
                AuthService.getAllUserChatData(param)

                    .then(function onSuccess(response) {
                        console.log(response)

                        $scope.userChatData = response.data.data;
                        console.log("1234", $scope.userChatData)
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.userProfileIcon = function () {
                $scope.isUserProfile = true;
            }
            $scope.userChatIcon = function () {
                $scope.isUserProfile = false;
            }

            $scope.isUserProfile = false;
            $scope.userChat = function (value) {

                let param = {
                    phoneNumber: value,
                    start: value,
                    end: value
                }
                AuthService.getAllUserChatData(param)

                    .then(function onSuccess(response) {
                        console.log(response)

                        $scope.userChatData = response.data.data;

                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }
            $scope.hideChatModule = function (value) {
                $scope.showChatModule = false;
                $scope.isUserProfile = false;
                $scope.messageBox = false;
            }

            $scope.writeMessage = function (data, tabValue) {
                $scope.messageBox = true;
                $scope.tab = { name: 'tabC' };
                let param = {
                    phone: data.phone_number
                }
                AuthService.addUserToIntervene(param)
                    .then(function onSuccess(response) {
                        if (response.data.status) {
                            if (tabValue == 'active') {
                                var localindex_index = $scope.activeUserData.map(function (el) {
                                    return el.phone_number;
                                }).indexOf(data.phone_number);
                                if (localindex_index != -1) {
                                    $scope.activeUserData.splice(localindex_index, 1);
                                    if ($scope.interveneUserData.length > 0) {
                                        $scope.interveneUserData.unshift(data)
                                    } else {
                                        $scope.interveneUserData.push(data)
                                    }
                                }
                            } else {
                                var localindex_index = $scope.actionRequiredUserData.map(function (el) {
                                    return el.phone_number;
                                }).indexOf(data.phone_number);
                                if (localindex_index != -1) {
                                    $scope.actionRequiredUserData.splice(localindex_index, 1);
                                    if ($scope.interveneUserData.length > 0) {
                                        $scope.interveneUserData.unshift(data)
                                    } else {
                                        $scope.interveneUserData.push(data)
                                    }
                                }
                            }
                        }
                    }).catch(function onError(response) {
                        console.log(response);
                    })

            }
            $scope.messageBox = false;
            $scope.resolveButton = false;

            $scope.interveneButton = function (data) {
                $scope.messageBox = false;
                $scope.resolveButton = true;
                let param = {
                    phone: data.phone_number
                }
                AuthService.addUserToActive(param)
                    .then(function onSuccess(response) {
                        if (response.data.status) {
                            var localindex_index = $scope.interveneUserData.map(function (el) {
                                return el.phone_number;
                            }).indexOf(data.phone_number);
                            if (localindex_index != -1) {
                                $scope.interveneUserData.splice(localindex_index, 1);
                                if ($scope.activeUserData.length > 0) {
                                    $scope.activeUserData.unshift(data)
                                } else {
                                    $scope.activeUserData.push(data)
                                }
                            }

                        }

                    }).catch(function onError(response) {
                        console.log(response);
                    })
                $scope.hideChatModule();
                $scope.tab = { name: 'tabA' };



            }

            $scope.contactDetail = function (page) {
                $scope.showcontactDetail = true;
                $scope.showhistoryDetail = false;
                $scope.totalCount = 0;
                $scope.showgetActiveUser = false;
                $scope.showgetActionRequiredUser = false;
                $scope.showgetInterveneUser = false;
                $scope.showtemplateDetail = false;
                $scope.showfilterDetail = false;
                let param = {
                    next_page: 0
                }
                if (page) {
                    param.next_page = page;
                } else {
                    $scope.totalCount = 0;
                    $scope.currentPage = 1;
                    $scope.itemsPerPage = 10;
                    $scope.serial = 1
                    $scope.pagination = {
                        current: 1
                    };
                }
                AuthService.getAllUserContact(param)
                    .then(function onSuccess(response) {
                        console.log(response)
                        $scope.contactDetailData = response.data.data.users;
                        $scope.totalCount = response.data.data.total_count;
                        console.log($scope.contactDetailData)
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.historyDetail = function (page) {
                $scope.showcontactDetail = false;
                $scope.showhistoryDetail = true;
                $scope.showgetActiveUser = false;
                $scope.showtemplateDetail = false;
                $scope.showfilterDetail = false;
                $scope.isUserProfile = false;
                $scope.showChatModule = false;

                $scope.totalCount = 0;
                let param = {
                    next_page: 0
                }
                if (page) {
                    param.next_page = page;
                } else {
                    $scope.totalCount = 0;
                    $scope.currentPage = 1;
                    $scope.itemsPerPage = 10;
                    $scope.serial = 1
                    $scope.pagination = {
                        current: 1
                    };
                }
                AuthService.getAllUserHistory(param)


                    .then(function onSuccess(response) {
                        console.log(response)
                        $scope.historyDetailData = response.data.data.users;
                        $scope.totalCount = response.data.data.total_count
                        console.log($scope.historyDetailData)
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.templateDetail = function (value) {
                // console.log(value)
                // console.log( $scope.templateSearch)
                let param = {
                    search: value,
                }
                if (!value) {
                    param.search = ""
                }
                // alert("template")
                console.log("111111111", $scope.templateDetailData)
                $scope.showcontactDetail = false;
                $scope.showhistoryDetail = false;
                $scope.showgetActiveUser = false;
                $scope.showgetActionRequiredUser = false;
                $scope.showgetInterveneUser = false;
                $scope.showtemplateDetail = true;
                $scope.showfilterDetail = false;


                AuthService.getTemplateTabData(param)

                    .then(function onSuccess(response) {
                        console.log(response)
                        $scope.templateDetailData = response.data.data;

                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }
            $scope.filterDetail = function (value) {
                // console.log(value)
                // console.log( $scope.templateSearch)
                let param = {

                }

                // alert("template")
                console.log("111111111", $scope.filterDetailData)
                $scope.showcontactDetail = false;
                $scope.showhistoryDetail = false;
                $scope.showgetActiveUser = false;
                $scope.showtemplateDetail = false;
                $scope.showfilterDetail = true;


                AuthService.getFilterTabData(param)

                    .then(function onSuccess(response) {
                        console.log(response)
                        $scope.filterDetailData = response.data.data;

                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }


            $scope.searchChat = function (value) {
                console.log(value)
                $scope.search = value;
                console.log("search", $scope.search)

                if (value != "") {
                    let param = {
                        search: $scope.search
                    }
                    AuthService.getActiveSearch(param)

                        .then(function onSuccess(response) {
                            console.log(response)
                            console.log("31")
                            $scope.activeUserData = response.data.data;

                        }).catch(function onError(response) {
                            console.log(response);
                        })
                } else {
                    $scope.getActiveUser(1)
                }
            }



            $scope.searchChatHistory = function (value) {
                console.log(value)
                $scope.search = value;
                console.log("search", $scope.search)

                if (value != "") {
                    let param = {
                        search: $scope.search
                    }
                    AuthService.getActiveSearch(param)

                        .then(function onSuccess(response) {
                            console.log(response)
                            console.log("31")
                            $scope.historyDetailData = response.data.data;

                        }).catch(function onError(response) {
                            console.log(response);
                        })
                } else {
                    $scope.historyDetail(1)
                }
            }

            $scope.searchChatContact = function (value) {
                console.log(value)
                $scope.search = value;
                console.log("search", $scope.search)

                if (value != "") {
                    let param = {
                        search: $scope.search
                    }
                    AuthService.getActiveSearch(param)

                        .then(function onSuccess(response) {
                            console.log(response)
                            console.log("31")
                            $scope.contactDetailData = response.data.data;

                        }).catch(function onError(response) {
                            console.log(response);
                        })
                } else {
                    $scope.contactDetail(1)
                }
            }


            // $scope.searchChatTemplate = function (value) {
            //     console.log(value)
            //     $scope.search = value;
            //     console.log("search", $scope.search)

            //     if (value != "") {
            //         let param = {
            //             search: $scope.search
            //         }
            //         AuthService.getSearch(param)

            //             .then(function onSuccess(response) {
            //                 console.log(response)
            //                 console.log("31")
            //                 $scope.templateDetailData = response.data.data;

            //             }).catch(function onError(response) {
            //                 console.log(response);
            //             })
            //     } else {
            //         $scope.templateDetail(1)
            //     }
            // }



            // $scope.curPage = 1,
            // $scope.itemsPerPage = 3,
            // $scope.maxSize = 5;


            // $scope.numOfPages = function () {
            //   return Math.ceil(contactDetailData.length / $scope.itemsPerPage);

            // };

            //   $scope.$watch('curPage + numPerPage', function() {
            //   var begin = (($scope.curPage - 1) * $scope.itemsPerPage),
            //   end = begin + $scope.itemsPerPage;

            // //   $scope.filteredItems = contactDetailData.slice(begin, end);
            // });


            $scope.pageChanged = function (newPageNumber, tab) {
                $scope.serial = newPageNumber * 10 - 9;
                $scope.contactDetail(newPageNumber);
            };
            $scope.historyPageChanged = function (newPageNumber, tab) {
                $scope.serial = newPageNumber * 10 - 9;
                $scope.historyDetail(newPageNumber);
            };

            $scope.liveChatPageChanged = function (newPageNumber, tab) {
                $scope.serial = newPageNumber * 10 - 9;
                $scope.getActiveUser(newPageNumber);
            };
            $scope.templatePageChanged = function (newPageNumber, tab) {
                $scope.serial = newPageNumber * 10 - 9;
                $scope.templateDetail(newPageNumber);
            };




            //   $scope.setCurrentPage =  function(){
            //    $scope.pagination = {
            //      current: 1
            //    };
            //    $scope.serial = 1
            //   }

            $scope.pagination = {
                current: 1
            };
            $scope.totalCount = 0;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 10;
            $scope.serial = 1
            $scope.pagination = {
                current: 1
            };
            $scope.options = {};
            $scope.dateRangeModel = {};
            $scope.changeStartDate = function () {
                $scope.dateRangeModel.start_date = $scope.dateRangeModel.start_dates;
                $scope.options.minDate = $scope.dateRangeModel.start_date;
            }

            $scope.changeEndDate = function () {
                $scope.dateRangeModel.end_date = $scope.dateRangeModel.end_dates;
            }
            
            $scope.getFilterData = function () {
                $scope.showcontactDetail = false;
                $scope.showhistoryDetail = false;
                $scope.showgetActiveUser = false;
                $scope.showtemplateDetail = false;
                $scope.showfilterDetail = true;
                $scope.dateRangeModel.start_date = $scope.dateFormat($scope.dateRangeModel.start_dates);
                $scope.dateRangeModel.end_date = $scope.dateFormat($scope.dateRangeModel.end_dates);
                AuthService.getFilterTabData($scope.dateRangeModel)
                    .then(function onSuccess(response) {
                        $scope.filterData = response.data.data.users;
                    }).catch(function onError(response) {
                        console.log(response);
                    })

            }

            $scope.dateFormat = function (date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();
                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                return [year, month, day].join('-');

            }

            // $scope.filterPageChanged = function (newPageNumber, tab) {
            //     $scope.serial = newPageNumber * 10 - 9;
            //     $scope.getFilterData(newPageNumber);
            // };


        }]);



