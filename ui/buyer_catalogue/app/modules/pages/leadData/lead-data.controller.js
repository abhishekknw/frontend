// angular.module('catalogueApp')
//   .controller('leadDataCtrl',
//     ['$scope', '$rootScope', '$window', '$location', '$routeParams','AuthService','pagesService', 'resetPasswordService', '$stateParams', 'commonDataShare', 'constants', '$timeout', 'Upload', 'cfpLoadingBar', 'permissions',
//       function ($scope, $rootScope, $window, $location, $routeParams,AuthService,pagesService, resetPasswordService, $stateParams, commonDataShare, constants, $timeout, Upload, cfpLoadingBar, permissions) {


angular.module('machadaloPages')
  .controller('leadDataCtrl',
    function ($scope, $rootScope, $window, $location, pagesService, leadDateService,campaignListService, constants, Upload, commonDataShare, constants, $timeout, AuthService, $state, permissions) {
      $scope.model = {};
      $scope.isValid = false;
     
      $scope.getCampaignDetails = function () {
        var fetch_all = '1';
        let page = 1;
        let search = ''
          campaignListService.getAllCampaignDetails(fetch_all,page,search)
            .then(function onSuccess(response) {
              $scope.campaignData = response.data.data;
            }).catch(function onError(response) {
              console.log("error occured", response);
              commonDataShare.showErrorMessage(response);
            });
      }


      $scope.uploadFiles = function (file) {
        $scope.model.file = file;
      }
      

      $scope.submitLead = function () {
        if($scope.model.file){
          try{
           var uploadUrl = constants.base_url + constants.url_base;
           $scope.hideSpinner = false;
           var token = $rootScope.globals.currentUser.token ;

           Upload.upload({
               url: uploadUrl + 'create-dummy-proposal/',
               data:{file:$scope.model.file,campaign_id:$scope.model.campaign_id},
               headers: {'Authorization': 'JWT ' + token},
           }).then(function onSuccess(response) {
            $scope.uploadResponse = response.data.data;
            $scope.matched_societies = $scope.uploadResponse.matched_societies;
            $scope.unmatched_societies = $scope.uploadResponse.unmatched_societies;

            $scope.lead_count_matched = $scope.uploadResponse.lead_count_matched;
            $scope.lead_count_unmatched = $scope.uploadResponse.lead_count_unmatched;

            

            

            $scope.hideSpinner = true;
             swal(constants.name,constants.uploadfile_success,constants.success);
             
             // uploadFileToAmazonServer(response.data.data,file);
   
           }).catch(function onError(response) {
             $scope.hideSpinner = true;
             commonDataShare.showErrorMessage(response);
               // swal(constants.name,constants.importfile_error,constants.error);
           });
         }catch(error){
           $scope.hideSpinner = true;
           console.log(error.message);
         }
       }

        // leadDateService.createUser($scope.model)
        //   .then(function onSuccess(response) {
        //     console.log("Successful");
        //     swal(constants.name, constants.createUser_success, constants.success);
        //     // alert("Successfully Created");
        //   })
        //   .catch(function onError(response) {
        //     commonDataShare.showErrorMessage(response);
        //     // swal(constants.name,constants.errorMsg,constants.error);
        //     // alert("Error Occured");
        //   });
      }

    });
