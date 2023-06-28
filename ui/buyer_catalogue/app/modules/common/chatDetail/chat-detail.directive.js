
angular.module('machadaloCommon')
.directive('chatDetail', function($window,$rootScope,constants,$timeout, permissions,AuthService) {
  let userInfo = JSON.parse(localStorage.userInfo);
  return {
    templateUrl: 'modules/common/chatDetail/chat-detail.tmpl.html',
    link: function($scope, element, attrs) {
              // $scope.perm = permissions.navBar;
              // // Do some stuff
              // $scope.closeModal = function(){
              //   $('#menuModal').modal('hide');
              //    $('body').removeClass('modal-open');
              //    $('.modal-backdrop').remove();
              // }
              //   $('.forScroll').slimScroll({
              //       height: '100%'
              //  });
              //  $rootScope.category = "";
              // if($rootScope.globals && $rootScope.globals.userInfo && $rootScope.globals.userInfo.profile && $rootScope.globals.userInfo.profile.organisation && $rootScope.globals.userInfo.profile.organisation.category){
              //   $rootScope.category = $rootScope.globals.userInfo.profile.organisation.category;
              // }
              // $scope.custom_user_hide = false;
              // if(userInfo && (userInfo.profile.id == 108 || userInfo.profile.name == "ClientBD")){
              //   $scope.custom_user_hide = true;
              // }
              $scope.userDetail = function (number, page) {

                $scope.showChatModule = true;
    
                $scope.NewsupplierAddUpdateData = {};
                $scope.newSupplierPocModel = [];
                $scope.Supplier_id = "";
                $scope.societyNameList = [];
                $scope.newSelectedArea = [];
                $scope.Areas = ""
    
                let param = {
                  nextPage: 1,
                  phoneNumber: number,
                }
                if (page) {
                  param.nextPage = page;
                } else {
                  $scope.totalCount = 0;
                }
    
                $scope.pageCount = param.nextPage;
                $scope.disableNextPagebutton = false;
                AuthService.getAllUserDetailData(param)
    
                  .then(function onSuccess(response) {
                    $scope.userDetailData = response.data.data;
                    $scope.userChatPayload = $scope.userDetailData.payload;
                    $scope.NewsupplierAddUpdateData.phone_number = $scope.userDetailData.phone_number;
                    $scope.getSupplierDataByNumber($scope.userDetailData.phone_number);
                  }).catch(function onError(response) {
                    console.log(response);
                  })
                AuthService.getAllUserChatData(param)
                  .then(function onSuccess(response) {
                    $scope.userChatData = response.data.data;
                    $scope.totalCount = $scope.userChatData.total_count;
                    if ($scope.totalCount > 20) {
                      let count = $scope.totalCount / 20;
                      if ($scope.pageCount < count) {
                        $scope.disableNextPagebutton = true;
                      }
                    }
    
                    if ($scope.userChatData && $scope.userChatData.payload && $scope.userChatData.payload.length > 0) {
                      for (let i in $scope.userChatData.payload) {
                        if ($scope.userChatData.payload[i].content && $scope.userChatData.payload[i].content.url) {
                          let typesArray = $scope.userChatData.payload[i].content.contentType.split("/");
                          $scope.userChatData.payload[i].content.types = typesArray;
                          if (typesArray[0] == 'image') {
                            $scope.userChatData.payload[i].content.url = $scope.userChatData.payload[i].content.url + typesArray[1]
                          } else {
                            let emdUrl = $scope.userChatData.payload[i].content.url + typesArray[1]
                            $scope.userChatData.payload[i].content.url = $sce.trustAsResourceUrl(emdUrl);
                          }
                        }
                      }
    
                    }
                  }).catch(function onError(response) {
                    console.log(response);
                  })
              }
              $scope.userDetail(attrs.number);
        }

  };
});


 