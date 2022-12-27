 'use strict';

 angular.module('catalogueApp')
 .factory('opsDashBoardService', ['machadaloHttp','$stateParams','$rootScope','$routeParams', '$location', '$http',

  function (machadaloHttp, $stateParams, $rootScope, $routeParams, $location, $http) {

    var url_base = 'v0/ui/website/';
    var opsDashBoard = {};

  	opsDashBoard.getProposalDetails = function(page){
      var url = url_base + "proposal/invoice_proposals/?next_page="+page;
  		return machadaloHttp.get(url);
  	}
    opsDashBoard.updateProposalDetails = function(proposal_id,data){
      var url = url_base + "proposal/" + proposal_id + "/";
      return machadaloHttp.put(url,data);
    }

    opsDashBoard.sendMail = function(data){
      var url = url_base + "mail/";
      return machadaloHttp.post(url,data);
    }
    // this endpoint converts proposal to campaign
    opsDashBoard.convertProposalToCampaign = function(proposal_id, data){
      var url = url_base  + proposal_id + "/convert-to-campaign/";
      return machadaloHttp.post(url,data);
    }
    // this endpoint converts a campaign to proposal
    opsDashBoard.convertCampaignToProposal = function(proposal_id, data){
      var url = url_base + proposal_id + "/convert-to-proposal/";
      return machadaloHttp.post(url,data);
    }
    opsDashBoard.saveAssignment = function(data){
      var url = url_base  + "campaign-assignment/";
      return machadaloHttp.post(url,data);
    }

    opsDashBoard.sendMailInProgress = function(taskId){
      var url = url_base  + "task/is-individual-task-successfull/" + taskId + "/";
      return machadaloHttp.get(url);
    }

    opsDashBoard.getOrganisationsForAssignment = function(){
      var url = url_base  + "organisation/get_organisations_for_assignment/";
      return machadaloHttp.get(url);
    }

    opsDashBoard.addComment = function(campaignId,spaceId, relatedTo, data){
     // var url =  url_base +  campaignId + "/comment/?shortlisted_spaces_id=" + spaceId + "&related_to=" + relatedTo;
      var url = url_base +  campaignId + "/comment/";
      return machadaloHttp.post(url,data);
    }

    opsDashBoard.viewComments = function(campaignId, spaceId, relatedTo){
      var url = url_base +  campaignId + "/comment/?related_to=" + relatedTo;
      return machadaloHttp.get(url);
    }

    opsDashBoard.getAllComments = function(campaignId){
      var url = url_base +  campaignId + "/comment/";
      return machadaloHttp.get(url);
    }

    return opsDashBoard;
}]);
