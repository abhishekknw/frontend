
angular.module('machadaloCommon')
.directive('navBar', function($window,$rootScope,constants,$timeout, permissions) {
  let userInfo = JSON.parse(localStorage.userInfo);
  return {
    templateUrl: 'modules/common/header/nav-bar.tmpl.html',
    link: function($scope, element, attrs) {
              $scope.perm = permissions.navBar;
              // Do some stuff
              $scope.closeModal = function(){
                $('#menuModal').modal('hide');
                 $('body').removeClass('modal-open');
                 $('.modal-backdrop').remove();
              }
                $('.forScroll').slimScroll({
                    height: '100%'
               });
              
              $scope.custom_user_hide = false;
              if(userInfo && userInfo.profile.id == 108){
                $scope.custom_user_hide = true;
              }
              else if(userInfo && userInfo.profile.name == "Business Admin" && userInfo.profile.organisation.category != "MACHADALO"){
                $scope.custom_user_hide = true;
              }
        }

  };
});


 