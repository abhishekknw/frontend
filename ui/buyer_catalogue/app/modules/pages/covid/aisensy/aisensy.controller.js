angular.module('machadaloPages').filter('firstlater', [function () {
    return function (input, scope) {
        if (input != null)
            input = input.charAt(0).toUpperCase();
        return input;
    }
}]).controller('aisensyCtrl',
    ['$scope', '$rootScope', '$window', '$location', 'AuthService', 'suspenseLeadService', '$state', 'userService', 'constants', 'AuthService', 'vcRecaptchaService',
        function ($scope, $rootScope, $window, $location, AuthService, suspenseLeadService, $state, userService, constants, AuthService, vcRecaptchaService) {
            AuthService.Clear();


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
            $scope.getActiveUser = function () {

                AuthService.getAllActiveUserData()

                    .then(function onSuccess(response) {
                        console.log(response)

                        $scope.activeUserData = response.data.data;
                        console.log($scope.activeUserData)
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.userDetail = function (value) {
                $scope.showChatModule = true;
                let param = {
                    phoneNumber: value,
                    start: 0,
                    end: 10
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
            }

            $scope.contactDetail = function (value)
            {
                $scope.showcontactDetail=true;
                $scope.showhistoryDetail=false;
                let param={
                    next_page: 1
                }
                AuthService.getAllUserContact(param)
                

                    .then(function onSuccess(response) {
                        console.log(response)
                        $scope.contactDetailData = response.data.data;
                        console.log($scope.contactDetailData)
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.historyDetail = function () {
                $scope.showcontactDetail=false;
                $scope.showhistoryDetail=true;
                let param = {
                    next_page:1
                }
                
                AuthService.getAllUserHistory(param)
                

                    .then(function onSuccess(response) {
                        console.log(response)
                        $scope.historyDetailData = response.data.data;
                        console.log($scope.historyDetailData)
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }
            $scope.searchChat= function (value) {
                console.log(value)
                $scope.search=value;
                console.log("search",$scope.search)

                let param = {
                    search:$scope.search
                }
                AuthService.getSearch(param)

                    .then(function onSuccess(response) {
                        console.log(response)
                    console.log("31")
                        $scope.activeUserData= response.data.data;
                     
                    }).catch(function onError(response) {
                        console.log(response);
                    })
            }

            $scope.curPage = 1,
            $scope.itemsPerPage = 3,
            $scope.maxSize = 5;
                
            
            $scope.numOfPages = function () {
              return Math.ceil(contactDetailData.length / $scope.itemsPerPage);
                
            };
              
              $scope.$watch('curPage + numPerPage', function() {
              var begin = (($scope.curPage - 1) * $scope.itemsPerPage),
              end = begin + $scope.itemsPerPage;
                
              $scope.filteredItems = contactDetailData.slice(begin, end);
            });
            

        }]);



