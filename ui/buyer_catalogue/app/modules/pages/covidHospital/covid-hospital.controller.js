angular.module('machadaloPages')
    .controller('covidHospitalCtrl',
        ['$scope', '$rootScope', '$window', '$location', 'AuthService', 'suspenseLeadService', '$state', 'userService', 'constants', 'AuthService', 'vcRecaptchaService',
            function ($scope, $rootScope, $window, $location, AuthService, suspenseLeadService, $state, userService, constants, AuthService, vcRecaptchaService) {
                AuthService.Clear();

                // $scope.error = false;
                // $scope.success = false;
               
                // $scope.resetPassword = function () {
                //     $scope.loadingSpinner = true;
                //     var url = $location.host();
                //     $scope.host = url;

                //     AuthService.ForgotPassword($scope.userEmail, $scope.host, $location.protocol(), function (response) {
                //         $scope.loadingSpinner = false;
                //         if (response.status == 200) {
                //             swal("Success!", response.msg, constants.success);
                //             $scope.success = response.msg;
                //             $scope.error = false
                //         } else {
                //             if (response.data.data.general_error) {
                //                 swal("Error!", response.data.data.general_error, constants.error);
                //             }
                //             $scope.error = response.message;
                //             $scope.success = false;
                //         }
                //     });
                // }
                var url = $location.url().split("/");
                $scope.categorys = ['Beds','Hospital'];
                let cat = url[1].substring(0,1).toUpperCase()+url[1].substring(1);
                $scope.selectedCategory = cat;
                // setInterval(function () {
                //     suspenseLeadService.getAllState()
                //         .then(function onSuccess(response) {
                //             $scope.stateData = response.data.state;
                //         }).catch(function onError(response) {
                //             console.log(response);
                //         })
                //     suspenseLeadService.getAllCity()
                //         .then(function onSuccess(response) {
                //             $scope.cityData = response.data.city;
                //         }).catch(function onError(response) {
                //             console.log(response);
                //         })
                // }, 12000)

                $scope.getState = function () {
                    AuthService.getAllState()
                        .then(function onSuccess(response) {
                            $scope.stateData = response.data.data;
                        }).catch(function onError(response) {
                            console.log(response);
                        })
                }

                $scope.getCity = function () {
                    console.log('BBBBBBBBBBBBBBBBBBBBBBB');
                    suspenseLeadService.getAllCity()
                        // .then(function onSuccess(response) {
                        //     $scope.cityData = response.data.city;
                        // }).catch(function onError(response) {
                        //     console.log(response);
                        // })
                }

                $scope.getBeds = function(){
                    suspenseLeadService.getAllBeds()
                    // .then(function onSuccess(response) {
                    //     $scope.bedsData = response.data;
                    // }).catch(function onError(response) {
                    //     console.log(response);
                    // })
                }
            }]);
