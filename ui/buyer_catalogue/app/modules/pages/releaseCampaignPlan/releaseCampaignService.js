 'use strict';
 angular.module('catalogueApp')
 .factory('releaseCampaignService', ['machadaloHttp','$stateParams','$rootScope','$routeParams', '$location', '$http',
  function (machadaloHttp, $stateParams, $rootScope, $routeParams, $location, $http) {

    var url_base = 'v0/ui/website/';
    var url_base_ui = 'v0/ui/';
    var url_base_proposal = 'v0/ui/website/';
    var releaseCampaignService = {};


    releaseCampaignService.getCampaignReleaseDetails = function(proposal_id, page, data){
      if(data){
        var url = url_base + proposal_id + "/campaign-inventories/?page=" + page;
        angular.forEach(Object.keys(data), function(element){
          url = url + "&" + element + "=" + data[element];
        })      
      }else{
        var url = url_base + proposal_id + "/campaign-inventories/?page=" + page;
      }
    	return machadaloHttp.get(url);
    }

    releaseCampaignService.bookingStatusData = function(proposal_id){
      var url = url_base + "booking-status/" + proposal_id ;
    return machadaloHttp.get(url);
  }

    releaseCampaignService.getCampaignReleaseDetailsHeader = function(){
        var url = url_base_ui + "getHeaderData";
    	return machadaloHttp.get(url);
    }

    releaseCampaignService.updateAuditReleasePlanDetails = function(proposal_id,data){
         var url = url_base + proposal_id + "/campaign-inventories/";
      return machadaloHttp.put(url,data);
    }

    releaseCampaignService.assignUserSupplier = function(data){
      var url = url_base  + "assign-supplier-users/";
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

    releaseCampaignService.getAllComments = function(campaignId){
      var url = url_base +  campaignId + "/comment/";
      return machadaloHttp.get(url);
    }

    releaseCampaignService.deleteSupplier = function(data){
      var url = url_base +  "delete-shortlisted-spaces/";
      return machadaloHttp.post(url,data);
    }

    releaseCampaignService.getPermissionBoxImages = function(campaignId,supplierId){
      var url = url_base +  "hashtag-images/get_permission_box_images/?campaign_id=" + campaignId + "&supplier_id=" + supplierId;
      return machadaloHttp.get(url);
    }
    releaseCampaignService.getReceiptBoxImages = function(campaignId,supplierId){
      var url = url_base +  "hashtag-images/get_receipt_images/?campaign_id=" + campaignId + "&supplier_id=" + supplierId;
      return machadaloHttp.get(url);
    }

    releaseCampaignService.setUserForBooking = function(data){
      var url = url_base + 'supplier-assignment/';
      return machadaloHttp.post(url,data);
    }

    releaseCampaignService.setBrandForBooking = function(data){
      var url = url_base + 'brand-assignment/';
      return machadaloHttp.post(url,data);
    }

    releaseCampaignService.getAssignedSuppliers = function(campaignId, id){
      var url = url_base + 'supplier-assignment/?campaign_id=' + campaignId + "&id=" + id;
      return machadaloHttp.get(url);
    }
    releaseCampaignService.searchSupplierBySelection = function(campaignId){
      var url = url_base + campaignId + "/list_suppliers/";
      return machadaloHttp.get(url);
    }
    releaseCampaignService.getHashTagImages = function(campaignId){
      var url = url_base + "hashtag-images/get_hashtag_images/?campaign_id=" + campaignId;
      return machadaloHttp.get(url);
    }

    releaseCampaignService.getFilteredResult = function(campaignId, data){
      console.log(Object.keys(data));
      
      var url = url_base + campaignId + "/campaign-inventories/?page=" + 1;
      angular.forEach(Object.keys(data), function(element){
        url = url + "&" + element + "=" + data[element];
      })      
      
      return machadaloHttp.get(url);
    }

    releaseCampaignService.getSuppliersOfCampaignWithStatus = function(data){
      var url = url_base_ui + "analytics/get-leads-data-generic/";
      return machadaloHttp.put(url,data);
    }

    releaseCampaignService.requirementDetail = function(id,phone,supplier_id,supplierType){
      if(phone==undefined){
         phone="";
      }
      if(supplier_id==undefined){
        supplier_id="";
      }
      if(supplierType==undefined){
        supplierType="";
      }
      var url = url_base_ui + "b2b/requirements/?shortlisted_spaces_id=" + id + "&phone_number=" + phone + "&supplier_id=" + supplier_id +"&supplier_type="+supplierType;
      return machadaloHttp.get(url);
    }
        //Api for LeadDetails
    releaseCampaignService.selectLeads = function(){
      var url = url_base_ui + "b2b/question-dropdown-filter/";
      return machadaloHttp.get(url);
    }

    releaseCampaignService.updateRequirement = function(data){
      var url = url_base_ui + "b2b/requirements/";
      return machadaloHttp.put(url,data);
    }

    releaseCampaignService.requirementBrowsedData = function(id,phone,supplier_id){
      var url = url_base_ui + "b2b/browsed-leads/?shortlisted_spaces_id=" + id+ "&phone_number=" + phone + "&supplier_id=" + supplier_id;
      return machadaloHttp.get(url);
    }

    releaseCampaignService.deleteSubmittedLeads = function(data){
      var url = url_base_ui + 'b2b/delete-requirement/';
      return machadaloHttp.post(url,data);
    }

    releaseCampaignService.restoreSubmittedLeads = function(data){
      var url = url_base_ui + 'b2b/restore-requirement/';
      return machadaloHttp.post(url,data);
    }

    releaseCampaignService.opsVerifyRequirement = function(data){
      var url = url_base_ui + 'b2b/ops-lead-verification/';
      return machadaloHttp.post(url,data);
    }

    releaseCampaignService.bdVerifyRequirement = function(data){
      var url = url_base_ui + 'b2b/bd-lead-verification/';
      return machadaloHttp.post(url,data);
    }

    releaseCampaignService.saveBrowsed = function(data){
      var url = url_base_ui + 'b2b/browsed-to-requirement/';
      return machadaloHttp.post(url,data);
    }

    releaseCampaignService.updateBrowsed = function(data){
      var url = url_base_ui + 'b2b/update-browsed-lead/';
      return machadaloHttp.post(url,data);
    }

    releaseCampaignService.removeBrowsed = function(data){
      var url = url_base_ui + 'b2b/delete-browsed-lead/';
      return machadaloHttp.post(url,data);
    }

    releaseCampaignService.sectorList = function(id){
      var url = url_base_ui + "b2b/browsed-leads/?shortlisted_spaces_id=" + id;
      return machadaloHttp.get(url);
    }

    releaseCampaignService.bdRequirementDetail = function(id){
      var url = url_base_ui + "b2b/bd-requirement/?company_shortlisted_spaces_id=" + id;
      return machadaloHttp.get(url);
    }

    releaseCampaignService.updateLeadDistribution = function(data){
      var url = url_base_ui + "b2b/add-requirement-price/";
      return machadaloHttp.post(url,data);
    }

    releaseCampaignService.downloadSheet = function(campaignId){
      var url = url_base_ui + "leads/generate-campaign-hash/" + campaignId + "/";
        return machadaloHttp.get(url);
    }
    releaseCampaignService.viewCommentsDetails = function(Id){
      var url = url_base_ui + "b2b/client-commits-ops/?pre_requirement_id=" + Id;
        return machadaloHttp.get(url);
    }
    releaseCampaignService.basicClientComment = function(comment,req_id){
          var param={};
          var payload=[];
          var payload_param={};
          payload_param['comment']=comment;
          payload_param['pre_requirement_id']=req_id;
          payload.push(payload_param);
          param['data']=payload;

      var url = url_base_ui + "b2b/client-commits-ops/";
        return machadaloHttp.post(url,param);
    }

    releaseCampaignService.viewInternalsComments = function(Id){
      var url = url_base_ui + "b2b/internal-comment/?requirement_id=" + Id;
        return machadaloHttp.get(url);
    }

    releaseCampaignService.internalCommentValue = function(comment,req_id){
      var param={};
      var payload=[];
      var payload_param={};
      payload_param['comment']=comment;
      payload_param['requirement_id']=req_id;
      payload.push(payload_param);
      param['data']=payload;
      var url = url_base_ui + "b2b/internal-comment/";
         return machadaloHttp.post(url,param);
     }

     releaseCampaignService.deleteBasicComment = function (comment_Id,req_id){
           var url = url_base_ui + "b2b/client-commits-ops/?pre_requirement_id="+req_id+"&id="+comment_Id;
           return machadaloHttp.delete(url);
     }
     releaseCampaignService.deleteInternalComment = function (comment_Id,req_id){
          var url = url_base_ui + "b2b/internal-comment/?requirement_id="+req_id+"&id="+comment_Id;
            return machadaloHttp.delete(url);
     }
     releaseCampaignService.browsedPreferredPartner = function(id){
      let url = url_base_ui + "b2b/browsed-companies-list/?sector_id="+id;
      return machadaloHttp.get(url);
    }

    releaseCampaignService.newLeadCreated = function(data){
      var url = url_base_ui + 'b2b/submit-tab-update-leads/';
      return machadaloHttp.post(url,data);
    }

    return releaseCampaignService;
}]);
