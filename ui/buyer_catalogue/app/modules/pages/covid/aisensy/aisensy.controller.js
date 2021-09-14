angular.module('machadaloPages').filter('firstlater', [function () {
    return function (input, scope) {
        if (input != null)
            input = input.charAt(0).toUpperCase();
        return input;
    }
}]).controller('aisensyCtrl',
    ['$scope', '$rootScope', '$window', '$location', 'AuthService', 'suspenseLeadService', '$state', 'userService', 'constants', 'AuthService', 'vcRecaptchaService',
        function ($scope, $rootScope, $window, $location, AuthService, suspenseLeadService, $state, userService, constants, AuthService, vcRecaptchaService, permissions) {
            // AuthService.Clear();

            console.log('ppppppppppppppppppppppppp', $rootScope.globals.currentUser);

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


            // AIsensy controller
            $scope.getActiveUser = function (page) {
                $scope.showcontactDetail = false;
                $scope.showhistoryDetail = false;
                $scope.showChatModule = false;
                $scope.showgetActiveUser = true;
                $scope.showtemplateDetail = false;
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

            $scope.actionsearch=''
            $scope.getActionRequiredUser = function (page) {
                console.log("1111111",$scope.actionsearch)
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
                AuthService.getAllActionRequiredData(param)

                    .then(function onSuccess(response) {
                        $scope.actionRequiredUserData = response.data.data.users;
                        $scope.totalCount = response.data.data.total_count
                        console.log($scope.actionRequiredUserData)
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.getInterveneUser = function (page) {
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
                console.log("1232",value)
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

            $scope.writeMessage = function () {
                $scope.messageBox = true;
            }
            $scope.messageBox = false;
            $scope.resolveButton = false;
            $scope.interveneButton = function () {
                $scope.messageBox = false;
                $scope.resolveButton = true;
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
                $scope.showgetActionRequiredUser = false;
                $scope.showgetInterveneUser = false;
                $scope.showtemplateDetail = false;
                $scope.showfilterDetail = false;
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
                if(!value){
                    param.search=""
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
                $scope.showgetInterveneUser = false;
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
        }]);



