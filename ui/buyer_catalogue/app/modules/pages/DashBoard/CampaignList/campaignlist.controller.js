angular.module('catalogueApp')

  .controller('CampaignListCtrl', ['$scope', '$rootScope', '$window', '$location', 'commonDataShare', 'constants', 'campaignListService', 'cfpLoadingBar',
    function ($scope, $rootScope, $window, $location, commonDataShare, constants, campaignListService, cfpLoadingBar) {

      $scope.emailModel = {};
      $scope.campaignHeadings = [
        { header: 'Sr No' },
        { header: 'Campaign Name' },
        { header: 'Assgined To' },
        { header: 'Assgined By' },
        { header: 'Assigned Date' },
        { header: 'Start Date' },
        { header: 'End Date' },
        { header: 'View Booking Details' },
        { header: 'Assign Dates' },
        { header: 'View Execution Image' }
      ];

      $scope.is_Superuser = $window.localStorage.isSuperUser;
      // var vm = this;
      var getCampaignDetails = function (page,search) {
        if(!page){
          page = 1;
        }
        if(!search){
          search = '';
        }
        if ($scope.is_Superuser == 'true') {
          var fetch_all = '1';
          campaignListService.getAllCampaignDetails(fetch_all)
            .then(function onSuccess(response) {
              $scope.campaignData = response.data.data;

              $scope.loading = response.data.data;
              if ($scope.campaignData.length == 0) {
                $scope.isEmpty = true;
                $scope.msg = constants.emptyCampaignList;
              }
              // $scope.loading = response.data;
            })
            .catch(function onError(response) {
              $scope.isEmpty = true;
              $scope.loading = response;
              console.log("error occured", response);
              commonDataShare.showErrorMessage(response);
              // swal(constants.name,constants.errorMsg,constants.error);
            });
        } else {
          var assigned_by = '0';
          var fetch_all = '0';
          var userId = $rootScope.globals.currentUser.user_id;
          $scope.Data = [];
          campaignListService.getCampaignDetails(assigned_by, userId, fetch_all,page,search)
            .then(function onSuccess(response) {
              $scope.campaignData = response.data.data.list;
              $scope.totalrecord = response.data.data.count;
              $scope.currentPage = page;
              $scope.Data = $scope.campaignData;
              $scope.loading = response.data.data;
              if ($scope.campaignData.length == 0) {
                $scope.isEmpty = true;
                $scope.msg = constants.emptyCampaignList;
              }
              // $scope.loading = response.data;
            })
            .catch(function onError(response) {
              $scope.isEmpty = true;
              $scope.loading = response;
              console.log("error occured", response);
              commonDataShare.showErrorMessage(response);
              // swal(constants.name,constants.errorMsg,constants.error);
            });
        }

      }
      $scope.pageChanged = function (page,search) {
        getCampaignDetails(page,search);
      }
      $scope.searchProposalDetails = function(page,search){
        if(search.length == 0 || search.length > 2){
          getCampaignDetails(1,search);
        }
      }  

      var getUsersList = function () {
        commonDataShare.getUsersList()
          .then(function onSuccess(response) {
            $scope.userList = response.data.data;
          })
          .catch(function onError(response) {
            console.log("error occured", response);
            commonDataShare.showErrorMessage(response);
            // swal(constants.name,constants.errorMsg,constants.error);
          });
      }

      var init = function () {
        getCampaignDetails();
        getUsersList();
      }
      //Call init function TO Load reuired data initially..
      init();

      $scope.getDetails = function (proposal_id) {
        $location.path('/' + proposal_id + '/releasePlan');
      }
      $scope.goToAssignDatesPage = function (proposal_id) {
        $location.path('/' + proposal_id + '/auditReleasePlan');
      }
      $scope.getExecutionDetails = function (proposal) {
        $window.localStorage.campaignState = constants[proposal.campaign_state];
        $window.localStorage.campaignId = proposal.proposal_id;
        $window.localStorage.campaignOwner = proposal.created_by;
        $window.localStorage.campaignName = proposal.name;

        $location.path('/' + proposal.proposal_id + '/opsExecutionPlan');
      }

      $scope.downloadSheet = function (campaignId) {
        campaignListService.downloadSheet(campaignId)
          .then(function onSuccess(response) {
            console.log(response);
            if (response.data.data.one_time_hash) {
              $window.open(Config.APIBaseUrl + 'v0/ui/leads/download-campaign-data-sheet/' + response.data.data.one_time_hash + "/", '_blank');
            }
          }).catch(function onError(response) {
            console.log(response);
          })
      }

      $scope.sendBookingEmails = function (proposalId, type) {
        $scope.emailBtnDisabled = true;
        cfpLoadingBar.start();
        var email = undefined;
        var emailType = undefined;
        if (!type) {
          email = $scope.emailModel.email
        }
        if ($scope.emailModel.selected === 'listOfSupplier') {
          emailType = 'send-booking-details'
        } else if ($scope.emailModel.selected === 'activationOfSupplier') {
          emailType = 'send-advanced-booking-details';
        } else if ($scope.emailModel.selected === 'pipelineOfSupplier') {
          emailType = 'send-pipeline-details';
        } else if ($scope.emailModel.selected === 'prehype') {
          emailType = 'send-pre-hype-mails';
        } else if ($scope.emailModel.selected === 'recce') {
          emailType = 'send-recce-mails';
        }
        campaignListService.sendEmail(proposalId, $scope.emailModel.email, emailType)
          .then(function onSuccess() {
            $scope.emailModel = {
              "selected": "",
              "email": []
            };
            $scope.emailBtnDisabled = false;
            cfpLoadingBar.complete();
            swal(constants.name, constants.email_success, constants.success);
            $('#sendEmailModal').modal('hide');
          }).catch(function onError(error) {
            $scope.emailBtnDisabled = false;
            cfpLoadingBar.complete();
            swal(constants.name, 'Error sending email', constants.error);
          })
      }

      // Disable email button if user not entered
      $scope.isEmailButton = false;
      $scope.disableTestEmailButton = function () {
        if (!$scope.emailModel.email) {
          $scope.isEmailButton = true;
        }
      }

      // Set proposal detail in scope
      $scope.getProposalDetails = function (proposal) {
        $scope.proposalDetail = proposal;
      }
      //start synergytop

      // Check for internal comments
      var userInfo = JSON.parse($window.localStorage.userInfo);
      var userEmail = userInfo.email;
      $scope.commentsType = constants.comments_type;
      $scope.commentModal = {};


      $scope.canViewInternalComments = false;
      if (userEmail.includes('machadalo')) {
        $scope.canViewInternalComments = true;
      }


      $scope.selectedCommentForView = {};
      $scope.viewComments = function (campaign,Id) {
         $scope.campaignDataForComment = campaign;
         $scope.campaignId = Id;
        //  $scope.campaignDataForComment.id = campaignId;
         $scope.commentsData = {};
        if($scope.selectedCommentForView.type == undefined){
            $scope.selectedCommentForView.type = $scope.commentsType[0];
        }
         $scope.commentType = 'CAMPAIGN';
        campaignListService.viewComments(campaign.proposal_id,1,'CAMPAIGN')
        .then(function onSuccess(response){
        $scope.commentModal = {};
        $scope.commentsData = response.data.data;
        $scope.viewInvForComments = Object.keys($scope.commentsData);
        $scope.commentsData = $scope.commentsData[$scope.viewInvForComments[0]];
        $scope.selectedInvForView = $scope.viewInvForComments[0];
       
        $('#viewComments').modal('show');
        }).catch(function onError(response){
          console.log(response);
        })
      }

      $scope.addComment = function(){
        $scope.commentModal['related_to'] = 'CAMPAIGN';

        var localindex_index = $scope.campaignData.map(function(el) { 
          return el.id;
        }).indexOf($scope.campaignId);      
        if (localindex_index != -1) { 
          $scope.campaignData[localindex_index].comment = $scope.commentModal.comment
         }
        campaignListService.addComment($scope.campaignDataForComment.proposal_id,$scope.commentModal)
        .then(function onSuccess(response){
          $scope.commentModal = {};
          $scope.campaignDataForComment = undefined;
          $('#viewComments').modal('hide');
          swal(constants.name, constants.add_data_success, constants.success);
        }).catch(function onError(response){
          console.log(response);
        })
      }

      // Internal Comments to show in row
       $scope.getAllComments = function() {
        $scope.allComments = {};
        releaseCampaignService.getAllComments($scope.campaign_id)
          .then(function onSuccess(response) {
            $scope.allComments = response.data.data;
            $scope.comments = {}
            var data = Object.keys($scope.allComments);
            for (var i=0; i<data.length; i++){
              var shortlisted_spaces_id = data[i];
              var comments = $scope.allComments[shortlisted_spaces_id].general;
              $scope.comments[shortlisted_spaces_id] = {}
              for (var j=0; j<comments.length; j++){
                if (comments[j].related_to == 'INTERNAL'){
                  $scope.comments[shortlisted_spaces_id]['internal'] = {
                    comment: comments[j].comment,
                    username: comments[j].user_name,
                    created_on: comments[j].timestamp
                  }
                } else {
                  $scope.comments[shortlisted_spaces_id]['external'] = {
                    comment: comments[j].comment,
                    username: comments[j].user_name,
                    created_on: comments[j].timestamp
                  }
                }
              }
            }
          })
          .catch(function onError(error) {
            console.log('No comments to show');
          })
      }

      $scope.suspenseView = false;
      $scope.suspenseSection = function(){
        $scope.suspenseView = true;
      }
      $scope.options = {};
      $scope.options1 = {};
      $scope.options.maxDate = new Date();
      $scope.fromDate = new Date();
      $scope.toDate = new Date();
      

      $scope.changeFromDate = function (fromDate) {
        $scope.fromDate = fromDate;
        //$scope.options1.minDate = new Date($scope.fromDate);
        $scope.options1.maxDate = new Date();
      }

      $scope.changeToDate = function (toDate) {
        $scope.toDate = toDate;
      
      }

    
      $scope.getSuspenseData = function(){
        $window.open(Config.APIBaseUrl + "v0/ui/b2b/suspance-leads/?start_date=" + commonDataShare.formatDate($scope.fromDate) + "&end_date=" + commonDataShare.formatDate($scope.toDate));
      }

      $scope.getSuspenseCount = function(){
        campaignListService.suspenseCount($scope.fromDate,$scope.toDate)
        .then(function onSuccess(response){ 
          if(response && response.data){
            $scope.suspenseLeadsCount = response.data.data.count;
            $('#viewCommentsq').modal('show');
          }
        });
      }

      $scope.closeModel = function(){
        $scope.emailModel = {};
      }

     // Use common key codes found in $mdConstant.KEY_CODE...
      $scope.keys = [];
      $scope.tags = [];
      // Any key code can be used to create a custom separator
      var semicolon = 186;
      $scope.customKeys = [];
      $scope.emailModel.email = [];
      $scope.validateEmail = function(x) {
        if (event.which === 13) {
          var emailValue = x;
          var reg = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
          if (!reg.test(emailValue)) {
            toastr.error("Please Enter Correct Email");
            $scope.emailModel.email.pop();
          }
        };
      };

      //end synergytop

    }]);
