angular.module('catalogueApp')

.controller('OpsDashCtrl', ['$scope', '$rootScope', '$window', '$location','opsDashBoardService','commonDataShare','constants','$timeout','permissions',

    function ($scope, $rootScope, $window, $location, opsDashBoardService, commonDataShare,constants,$timeout, permissions) {
    	$scope.proposals = [];
      $scope.reason = null;
      $scope.bucket_url = constants.aws_bucket_url;
      //for loading spinner
      $scope.loadSpinner = true;
      $scope.permissions = permissions.opsDashBoard;
      $scope.userIcon = "icons/usericon.png";

      //Start: code added to show or hide details based on user permissions
      $scope.user_code = $window.localStorage.user_code;
      if($scope.user_code == 'agency')
        $scope.hideData = true;
      //End: code added to show or hide details based on user permissions
    	$scope.headings = [
        {header : 'Index'},
        {header : 'Proposal Id'},
        {header : 'Proposal Name'},
        {header : 'Proposal For'},
        {header : 'Proposal Created By'},
        {header : 'Invoice Number'},
        {header : 'Start Date'},
        {header : 'End Date'},
        {header : 'Create Campaign'},
        {header : 'Assigned To'},
        {header : 'Edit Details'},
        // {header : 'Download Proposal'}
      ];

  var getProposalDetails = function(page){
    if(!page){
      page = 1;
    }
    $scope.Data = [];
    opsDashBoardService.getProposalDetails(page)
    	.then(function onSuccess(response){
        $scope.proposals = response.data.data.list;
        $scope.totalrecord = response.data.data.count;
        $scope.currentPage = page;
        $scope.Data = $scope.proposals;
        if($scope.proposals.length == 0){
          $scope.isEmpty = true;
          $scope.msg = constants.emptyProposalMsg;
        }else {
          $scope.isEmpty = false;
        }
        $scope.loading = response.data;
    	})
    	.catch(function onError(response){
        if(response.status == 403)
          $location.path('/forbidden');
        commonDataShare.showErrorMessage(response);
        $scope.isEmpty = true;
        $scope.loading = response;
    		console.log("error occured", response);
        // swal(constants.name,constants.errorMsg,constants.error);
    	});
    }

    $scope.pageChanged = function(page){
      getProposalDetails(page);
    }

    $scope.getUsersList = function(orgId){
      commonDataShare.getUsersList(orgId)
        .then(function onSuccess(response){
           $scope.userList = [];
          var x = null;
          $scope.userList = (response.data.data).filter(function(objFromA) {
              return !$scope.assignment_detail.find(function(objFromB) {
              return objFromA.id === objFromB.assigned_to.assigned_to_id
            })
          })
          for (let x in $scope.userList){
            $scope.userList[x].label = $scope.userList[x].username
          }
      	})
      	.catch(function onError(response){
      		console.log("error occured", response);
          commonDataShare.showErrorMessage(response);
          // swal(constants.name,constants.errorMsg,constants.error);
      	});
    }
    var init = function(){
      getProposalDetails();
      // getUsersList();
    }
    //Call init function TO Load reuired data initially..
    init();

    $scope.sendNotification = function(){
      $scope.loadSpinner = false;
      var email_Data = {
        subject:'Machadalo Mail',
        body:$scope.reason,
        to:$scope.currentProposal.user.email,
      };
      opsDashBoardService.sendMail(email_Data)
      .then(function onSuccess(response){
        $scope.taskId = response.data.data.task_id;
        sendMailInProgress();
    	})
    	.catch(function onError(response){
        $scope.loadSpinner = true;
        $('#onHoldModal').modal('hide');
        $('#declineModal').modal('hide');
        commonDataShare.showErrorMessage(response);
        // swal(constants.name,constants.onhold_error,constants.error);
    		console.log("error occured", response);
    	});
      $scope.reason = "";
   }
   var sendMailInProgress = function(){
     opsDashBoardService.sendMailInProgress($scope.taskId)
     .then(function onSuccess(response){
       if(response.data.data.ready != true){
          $timeout(sendMailInProgress,constants.sleepTime); // This will perform async
       }
       else if(response.data.data.status == true){
         $scope.loadSpinner = true;
         $('#onHoldModal').modal('hide');
         $('#declineModal').modal('hide');

         swal(constants.name,constants.onhold_success,constants.success);
       }
       else {
         swal(constants.name,constants.email_error,constants.error);
       }
     }).catch(function onError(response){
       $scope.loadSpinner = true;
       $('#onHoldModal').modal('hide');
       $('#declineModal').modal('hide');
       commonDataShare.showErrorMessage(response);
      //  swal(constants.name,constants.email_error,constants.error);
     });
   }

    $scope.updateCampaign = function(proposal){
        $scope.currentProposal = proposal;
      opsDashBoardService.updateProposalDetails(proposal.proposal.proposal_id,proposal.proposal)
      .then(function onSuccess(response){
    	})
    	.catch(function onError(response){
    		console.log("error occured", response);
        commonDataShare.showErrorMessage(response);
    	});
    }

    $scope.convertProposalToCampaign = function(proposal,assignment_detail,index){
      $scope.local_index = index;
      $scope.loadSpinner = false;
      $scope.currentProposal = proposal;
      $scope.assignment_detail = assignment_detail;
      getOrganisationsForAssignment();
      opsDashBoardService.convertProposalToCampaign(proposal.proposal.proposal_id, proposal.proposal)
          .then(function onSuccess(response){
          
            $scope.loadSpinner = true;
              if(response.status == 200){
                $("#assignModal").modal('show');
              }
    	      })
          .catch(function(response){
            getProposalDetails();
            $scope.loadSpinner = true;
            commonDataShare.showErrorMessage(response);
            // swal(constants.name,constants.accept_proposal_error,constants.error);
    	  	    console.log("error occured", status);
              console.log(response);
    	});
    }

    $scope.convertCampaignToProposal = function(proposal){
      $scope.currentProposal = proposal;
      opsDashBoardService.convertCampaignToProposal(proposal.proposal.proposal_id, proposal.proposal)
          .then(function onSuccess(response){
            $("#declineModal").modal('show');
    	    })
          .catch(function onError(response){
            console.log(response);
            getProposalDetails();
            commonDataShare.showErrorMessage(response);
            // swal(constants.name,constants.decline_proposal_error,constants.error);
    	  	    console.log("error occured", status);
    	});
    }
    //code added when the user clicks on proposal id the proposal details page will open
    $scope.showProposalDetails = function(proposal_id){
      $location.path('/' + proposal_id + '/showcurrentproposal');
    }

    $scope.assignedUsers = [];
    $scope.selected_baselines_customTexts = { buttonDefaultText: 'Select Users' };
    $scope.events = {

      onItemSelect: function (item) {
      }
    }

    // $scope.assignementSettings = {
    //   enableSearch: true,
    //   keyboardControls: true, idProp: "id",
    //   template: '{{option.username}}', smartButtonTextConverter(skip, option) { return option; },
    //   selectionLimit: 4,
    //   showCheckAll: true,
    //   scrollableHeight: '300px', scrollable: true
    // };

    $scope.saveAssignment = function(){
      // var userId = $scope.userId;
      var data = {
        to:$scope.assignedUsers,
        campaign_id:$scope.currentProposal.proposal.proposal_id
      };
        var organisationName = "";
        var localindex_index = $scope.organisationList.map(function(el) { 
          return el.organisation_id;
        }).indexOf($scope.orgId);      
        if (localindex_index != -1) {       
          organisationName =  $scope.organisationList[localindex_index].name
        } 
      opsDashBoardService.saveAssignment(data)
          .then(function onSuccess(response){
               for(let i in $scope.assignedUsers){
                $scope.proposals[$scope.local_index].assignment_detail.push({assigned_to:{assigned_to_name:$scope.assignedUsers[i].label,organisation_name:organisationName}})
               }
             $scope.orgId = "";
             $scope.assignedUsers= [];
             $scope.userList = [];

              $('#assignModal').modal('hide');
              swal(constants.name,constants.assign_user_success,constants.success);
    	})
          .catch(function onError(response){
            $('#assignModal').modal('hide');
            commonDataShare.showErrorMessage(response);
    	  	    console.log("error occured", status);
    	});
    }
    $scope.goToCampaignList = function(){
     $location.path("/CampaignList");
    }
    $scope.goToEditProposalDetails = function(proposalId){
      $location.path("/editProposalDetails/" + proposalId + "/");
    }
    var getOrganisationsForAssignment = function(){
      opsDashBoardService.getOrganisationsForAssignment()
      .then(function onSuccess(response){
        $scope.organisationList = response.data.data;
      }).catch(function onError(response){
        console.log(response);
      })
    }


    $scope.commentsType = constants.comments_type;
    $scope.selectedCommentForView = {};
    $scope.commentModal = {};
    $scope.campaign_id = ""

    $scope.addComment = function(commentType) {
      $scope.commentModal['related_to'] = commentType;     
      var localindex_index = $scope.proposals.map(function(el) { 
        return el.id;
      }).indexOf($scope.campaignId);      
      if (localindex_index != -1) { 
        $scope.proposals[localindex_index].latest_comment = $scope.commentModal.comment
       }
      opsDashBoardService.addComment($scope.campaign_id, 1, $scope.commentType, $scope.commentModal)
        .then(function onSuccess(response) {
          // $scope.viewComments($scope.prposalDataForComment, "CAMPAIGN");
          $scope.commentModal = {};
          $scope.prposalDataForComment = undefined;
          
          swal(constants.name, constants.add_data_success, constants.success);
          $('#viewComments').modal('hide');
         
        }).catch(function onError(response) {
          console.log(response);
        })
    }

    $scope.viewComments = function(prposals, commentType) {
  
       $scope.campaignId = prposals.id;
      $scope.campaign_id = prposals.proposal.proposal_id;
      $scope.commentsData = {};
      if ($scope.selectedCommentForView.type == undefined) {
        $scope.selectedCommentForView.type = $scope.commentsType[0];
      }
      $scope.prposalDataForComment = prposals;
      $scope.commentType = commentType;
      var relatedTo = commentType;
      var spaceId = 1;

      opsDashBoardService.viewComments($scope.campaign_id, spaceId, relatedTo)
        .then(function onSuccess(response) {
          $scope.commentModal = {};
          $scope.commentsData = response.data.data;
          $scope.viewInvForComments = Object.keys($scope.commentsData);
          $scope.selectedInvForView = $scope.viewInvForComments[0];
          $scope.commentsData = $scope.commentsData[$scope.viewInvForComments[0]];
          $('#viewComments').modal('show');
        }).catch(function onError(response) {
          console.log(response);
        })
    };

    $scope.model = []; 
    $scope.data = [{id: 1, label: "David"}, {id: 2, label: "Jhon"}, {id: 3, label: "Danny"},{id: 4, label: "df"},{id: 5, label: "opp"},{id:6, label: "opkkkkp"},{id:7, label: "otttttttpkkkkp"}]; 
    $scope.settings = {
       smartButtonMaxItems: 4,
      selectionLimit: 4,
      showCheckAll: true,
      scrollableHeight: '300px', scrollable: true,
      enableSearch: true,
     
    };

}]);//Controller function ends here
