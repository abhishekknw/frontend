 'use strict';
 angular.module('catalogueApp')
 .factory('releaseCampaignService', ['machadaloHttp','$stateParams','$rootScope','$routeParams', '$location', '$http',
  function (machadaloHttp, $stateParams, $rootScope, $routeParams, $location, $http) {

    var url_base = 'v0/ui/website/';
    var url_base_ui = 'v0/ui/';
    var url_base_proposal = 'v0/ui/website/';
    var releaseCampaignService = {};


    releaseCampaignService.getCampaignReleaseDetails = function(proposal_id){
         var url = url_base + proposal_id + "/campaign-inventories/";
    	return machadaloHttp.get(url);
    }

    releaseCampaignService.updateAuditReleasePlanDetails = function(proposal_id,data){
         var url = url_base + proposal_id + "/campaign-inventories/";
      return machadaloHttp.put(url,data);
    }

    releaseCampaignService.addSuppliersToCampaign = function(data){
      var url = url_base + 'add-suppliers-direct-to-campaign/';
      return machadaloHttp.post(url,data);
    }

    releaseCampaignService.getRelationShipData = function(supplierId,supplierCode,campaignId){
      var url = url_base + "get-relationship-and-past-campaigns-data/?supplier_id=" + supplierId + "&supplier_code=" + supplierCode
                + "&campaign_id=" + campaignId;
      return machadaloHttp.get(url);
    }

    releaseCampaignService.savePaymentDetails = function(data,supplierId){
      var url = url_base_ui + 'society/';
      return machadaloHttp.post(url,data);
    }
    releaseCampaignService.saveContactDetails = function(data){
      var url = url_base_ui + 'society/';
      return machadaloHttp.post(url,data);
    }

    releaseCampaignService.sendMail = function(data){
      var url = url_base + "mail/";
      return machadaloHttp.post(url,data);
    }

    releaseCampaignService.sendMailInProgress = function(taskId){
      var url = url_base  + "task/is-individual-task-successfull/" + taskId + "/";
      return machadaloHttp.get(url);
    }

    releaseCampaignService.getSociety = function (id,supplierTypeCode) {
      console.log(id);
       var url = url_base_societyDetails + "supplier/" + id + "/image_details/?supplierTypeCode=" + supplierTypeCode;;
       return machadaloHttp.get(url);
    };

    releaseCampaignService.processParam = function(){
     if($stateParams.campaignId){
       $rootScope.campaignId = $stateParams.campaignId;
     }else {
       $rootScope.campaignId = null;
      }

      if($stateParams.societyId){
       $rootScope.societyId = $stateParams.societyId;
     }else {
       $rootScope.societyId = null;
     }
    };
    releaseCampaignService.getPhases = function(campaignId){
      var url = url_base  + "supplier-phase/?campaign_id=" + campaignId;
      return machadaloHttp.get(url);
    }

    releaseCampaignService.savePhases = function(data,campaignId){
      var url = url_base  + "supplier-phase/?campaign_id=" + campaignId;
      return machadaloHttp.post(url,data);
    }

    releaseCampaignService.removePhase = function(id){
      var url = url_base  + "supplier-phase/" + id + "/";
      return machadaloHttp.delete(url);
    }

    releaseCampaignService.getProposalCenters = function(proposalId){
      var url = url_base + "proposal-center-mapping/?proposal_id=" + proposalId;
      return machadaloHttp.get(url);
    }

    releaseCampaignService.addComment = function(campaignId, data){
      var url = url_base +  campaignId + "/comment/";
      return machadaloHttp.post(url,data);
    }

    releaseCampaignService.viewComments = function(campaignId, spaceId, relatedTo){
      var url = url_base +  campaignId + "/comment/?shortlisted_spaces_id=" + spaceId + "&related_to=" + relatedTo;
      return machadaloHttp.get(url);
    }

    releaseCampaignService.deleteSupplier = function(data){
      var url = url_base +  "delete-shortlisted-spaces/";
      return machadaloHttp.post(url,data);
    }

    return releaseCampaignService;
}]);
