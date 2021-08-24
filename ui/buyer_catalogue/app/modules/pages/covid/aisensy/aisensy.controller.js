angular.module('machadaloPages').filter('replace', [function () {
    return function (input, from, to) {

        if (input === undefined) {
            return;
        }
        var regex = new RegExp(from, 'g');
        return input.replace(regex, to);
    };
}]).controller('aisensyCtrl',
    ['$scope', '$rootScope', '$window', '$location', 'AuthService', 'suspenseLeadService', '$state', 'userService', 'constants', 'AuthService', 'vcRecaptchaService',
        function ($scope, $rootScope, $window, $location, AuthService, suspenseLeadService, $state, userService, constants, AuthService, vcRecaptchaService) {
            AuthService.Clear();

     
            let gooIndex = document.getElementById('goo-index');
let hoverEnter = index =>{
  gooIndex.style.top = 100*index+'px';
  let allScreens = document.querySelectorAll('.screen');
  allScreens.forEach(e=>{
    e.classList.remove('visible')
  })
  let nowVisible = document.getElementById('screen_'+index);
  nowVisible.classList.add('visible');
}


// AIsensy controller
$scope.getActiveUser = function () {
           alert("API call");
    AuthService.getAllActiveUserData()
    
        .then(function onSuccess(response) {
            console.log(response)
            
            $scope.activeUserData=response.data.data ; 
            console.log($scope.activeUserData)
        }).catch(function onError(response) {
            console.log(response);
        })
}

$scope.userDetail = function (value) {
    alert("Phone Number");
    let param = {
        phoneNumber:value,
        start:0,
        end:10
    }
     AuthService.getAllUserDetailData(param)

 .then(function onSuccess(response) {
     console.log(response)
     
     $scope.userDetailData=response.data.data; 
 }).catch(function onError(response) {
     console.log(response);
 })
 AuthService.getAllUserChatData(param)

 .then(function onSuccess(response) {
     console.log(response)
     
     $scope.userChatData=response.data.data; 
     console.log("1234", $scope.userChatData) 
 }).catch(function onError(response) {
     console.log(response);
 })
}

$scope.userChat = function (value) {
    alert("Chat");
    let param = {
        phoneNumber:value,
        start:value,
        end:value
    }
     AuthService.getAllUserChatData(param)

 .then(function onSuccess(response) {
     console.log(response)
     
     $scope.userChatData=response.data.data;
     
 }).catch(function onError(response) {
     console.log(response);
 })
}



        }]);



