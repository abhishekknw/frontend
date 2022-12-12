'use strict';


angular.module('catalogueApp')
  .factory('B2BDashboardService', ['machadaloHttp', '$stateParams','$window', '$rootScope', '$routeParams', '$location', '$http',
    function (machadaloHttp, $stateParams, $scope, $rootScope,$window, $routeParams, $location, $http) {

      var url_base = 'v0/ui/website/';
      var url_base_proposal = 'v0/ui/proposal/';
      var url_analytics = 'v0/ui/analytics/';
      var url_root = 'v0/ui/';
      var url_base_user = 'v0/';
      var DashboardService = {};

      DashboardService.getCampaigns = function () {
        var url = url_root + "b2b/campaign-list-by-status/";
        return machadaloHttp.get(url);
      }

      DashboardService.getSummaryReport = function (campaign_id, start_date=null, end_date=null) {
        var url = url_root + "b2b/summary-reports/?campaign_id="+campaign_id;
        if(start_date && end_date){
          url += "&start_date="+start_date+"&end_date="+end_date;
        }
        return machadaloHttp.get(url);
      }

      DashboardService.getFlatSummaryReport = function (campaign_id, start_date=null, end_date=null) {
        var url = url_root + "b2b/flat-summary-details/?campaign_id="+campaign_id;
        if(start_date && end_date){
          url += "&start_date="+start_date+"&end_date="+end_date;
        }
        return machadaloHttp.get(url);
      }

      DashboardService.getCampaignDetails = function (campaignId, query) {
        var url = url_base + "dashboard/suppliers_booking_status/?campaign_id=" + campaignId + "&query=" + query;
        return machadaloHttp.get(url);
      }


      DashboardService.getAllCampaignsData = function (organisationId, category) {
        var url = url_base + "campaigns-assigned-inventory-counts/" + organisationId + "/?category=" + category;
        return machadaloHttp.get(url);
      }

      DashboardService.getAssignedIdsAndImages = function (organisationId, category, type, date, inventory) {
        var url = url_base + "campaigns-assigned-inventory-ids-and-images/" + organisationId + "/?category=" + category
          + "&type=" + type + "&date=" + date + "&inventory=" + inventory;
        return machadaloHttp.get(url);
      }

      DashboardService.getCountOfSupplierTypesByCampaignStatus = function (campaignStatus) {
        var url = url_base + "dashboard/get_count_of_supplier_types_by_campaign_status/?status=" + campaignStatus;
        return machadaloHttp.get(url);
      }

      DashboardService.getSuppliersOfCampaignWithStatus = function (campaignId) {
        var url = url_base + "dashboard/get_suppliers_current_status/?campaign_id=" + campaignId;
        return machadaloHttp.get(url);
      }

      DashboardService.getCampaignFilters = function (campaignId) {
        var url = url_base + "dashboard/get_campaign_filters/?campaign_id=" + campaignId;
        return machadaloHttp.get(url);
      }

      DashboardService.getPerformanceMetricsData = function (campaignId, type, inv, perf_param) {
        var url = url_base + "dashboard/get_performance_metrics_data/?campaign_id=" + campaignId + "&type=" + type + "&inv_code=" + inv + "&perf_param=" + perf_param;
        return machadaloHttp.get(url);
      }

      DashboardService.getLocationData = function (campaignId, inv) {
        var url = url_base + "dashboard/get_location_difference_of_inventory/?campaign_id=" + campaignId + "&inv=" + inv;
        return machadaloHttp.get(url);
      }

      DashboardService.getCampaignInvTypesData = function (campaignId) {
        var url = url_base + "dashboard/get_supplier_data_by_campaign/?campaign_id=" + campaignId;
        return machadaloHttp.get(url);
      }

      DashboardService.getCampaignInventoryActivitydetails = function (campaignId) {
        var url = url_base + "dashboard/get_campaign_inventory_activity_details/?campaign_id=" + campaignId;
        return machadaloHttp.get(url);
      }


      DashboardService.getLeadsByCampaign = function (campaignId, data, supplierType) {
        var url = url_base + "dashboard/get_leads_by_campaign_new/?campaign_id=" + campaignId;
        if (data && data.hasOwnProperty('start_date') && data.hasOwnProperty('end_date')) {
          url += "&start_date=" + data.start_date + "&end_date=" + data.end_date;
          console.log(data.start_date, data.end_date);
        }
        if (supplierType) {
          url += "&supplier_code=" + supplierType;
        }
        // if (data && data.hasOwnProperty('start_date') && data.hasOwnProperty('end_date')) {
        //   var url = url_base + "dashboard/get_leads_by_campaign_new/?campaign_id=" + campaignId + "&start_date=" + data.start_date + "&end_date=" + data.end_date;
        //   console.log(data.start_date, data.end_date);
        // }
        // else {
        //   var url = url_base + "dashboard/get_leads_by_campaign_new/?campaign_id=" + campaignId;
        // } 
        return machadaloHttp.get(url);
      }
      //
      // DashboardService.getSortedLeadsByCampaign = function(campaignId, query_type){
      //   var url = url_base + "dashboard/get_leads_by_campaign_custom/?campaign_id=" + campaignId + "&query_type=" + query_type;
      //   return machadaloHttp.get(url);
      // }

      DashboardService.getCompareCampaignChartData = function (data, supplierType) {
        var url = url_base + "dashboard/proposal_id/get_leads_by_multiple_campaigns/";
        // if (supplierType) {
        //   url += "?supplier_code=" + supplierType;
        // }
        return machadaloHttp.post(url, data);
      }

      DashboardService.getSupplierImages = function (supplierId, invType, activityType, date) {
        var url = url_base + "dashboard/get_activity_images_by_suppliers/?supplier_id=" + supplierId + "&inv_code=" + invType + "&act_type=" + activityType + "&date=" + date;
        return machadaloHttp.get(url);
      }

      DashboardService.getHashtagImages = function (campaignId, supplier_id) {
        var url = url_base + "hashtag-images/?campaign_id=" + campaignId + "&supplier_id=" + supplier_id;
        return machadaloHttp.get(url);
      }

      DashboardService.getDatewiseSuppliersInventory = function (campaignId, date, invName, actType) {
        var url = url_base + "dashboard/get_datewise_suppliers_inventory_status/?campaign_id=" + campaignId + "&date=" + date + "&inv_type=" + invName + "&act_type=" + actType;
        return machadaloHttp.get(url);
      }
      DashboardService.getBookingCampaigns = function (campaign) {
        var url = url_base + campaign + "/get-suppliers-by-status/";
        return machadaloHttp.get(url);
      }
      DashboardService.viewLeadsForSelectedCampaign = function (data, campaignId) {
        var url = url_root + "leads/" + campaignId + "/entry_list_by_campaign_id";
        return machadaloHttp.get(url);
      }

      DashboardService.addComment = function (campaignId, data) {
        var url = url_base + campaignId + "/comment/";
        return machadaloHttp.post(url, data);
      }

      DashboardService.getCampaign = function (proposal_id) {
        $location.path('/' + proposal_id + '/releasePlan');
      }

      DashboardService.viewComments = function (campaignId, spaceId, relatedTo) {
        var url = url_base + campaignId + "/comment/?shortlisted_spaces_id=" + spaceId + "&related_to=" + relatedTo;
        return machadaloHttp.get(url);
      }

      DashboardService.viewBookingComments = function (campaignId, spaceId, relatedTo) {
        var url = url_base + campaignId + "/comment/?shortlisted_spaces_id=" + spaceId + "&related_to=" + relatedTo;
        return machadaloHttp.get(url);
      }

      DashboardService.changePassword = function (id, data) {
        var url = url_base_user + "user/" + id + "/change_password/";
        return machadaloHttp.post(url, data);
      }

      DashboardService.getFormDetails = function (campaignId) {
        var url = url_root + "leads/" + campaignId + "/form";
        return machadaloHttp.get(url);
      }

      DashboardService.sendMeEmail = function (data) {
        var url = url_base + "send-leads-to-self/";
        return machadaloHttp.post(url, data);
      }

      DashboardService.getPermissionBoxImages = function (campaignId, supplierId) {
        var url = url_base + "hashtag-images/get_permission_box_images/?campaign_id=" + campaignId + "&supplier_id=" + supplierId;
        return machadaloHttp.get(url);
      }


      DashboardService.getPhases = function (campaignId) {
        var url = url_base + "supplier-phase/?campaign_id=" + campaignId;
        return machadaloHttp.get(url);
      }
      DashboardService.sendListOfSuppliersEmail = function (campaignId, email) {
        var url = url_base + "send-booking-details/" + campaignId + "/?email=" + email;
        return machadaloHttp.get(url);
      }

      DashboardService.sendListOfSuppliersConfirmEmail = function (campaignId) {
        var url = url_base + "send-booking-details/" + campaignId + "/";
        return machadaloHttp.get(url);
      }

      DashboardService.sendActivationOfSuppliersEmail = function (campaignId, email) {
        var url = url_base + "send-advanced-booking-details/" + campaignId + "/?email=" + email;
        return machadaloHttp.get(url);
      }

      DashboardService.sendActivationOfSuppliersConfirmEmail = function (campaignId) {
        var url = url_base + "send-advanced-booking-details/" + campaignId + "/";
        return machadaloHttp.get(url);
      }

      DashboardService.sendPipelinedSuppliersEmail = function (campaignId, email) {
        var url = url_base + "send-pipeline-details/" + campaignId + "/?email=" + email;
        return machadaloHttp.get(url);
      }

      DashboardService.sendPipelinedSuppliersConfirmEmail = function (campaignId) {
        var url = url_base + "send-pipeline-details/" + campaignId + "/";
        return machadaloHttp.get(url);
      }
      DashboardService.getCampaignWiseSummary = function (data, supplierType) {
        var url = url_root + "campaign/campaign-wise-summary";

        // if (supplierType) {
        //     url += "?supplier_code=" + supplierType;
        // }
        
        if (data && data.hasOwnProperty('start_date') && data.hasOwnProperty('end_date') && data.start_date != "Invalid Date" && data.end_date != "Invalid Date") {
          url += "?start_date=" + data.start_date + "&end_date=" + data.end_date;
          if (supplierType) {
            url += "&supplier_code=" + supplierType;
          }
        } else {
          if (supplierType) {
            url += "?supplier_code=" + supplierType;
          }
        }
        return machadaloHttp.get(url);
      }

      DashboardService.getCampaignDateWiseData = function (data, supplierType) {
        if (data && data.hasOwnProperty('start_date') && data.hasOwnProperty('end_date')) {
          var url = url_root + "campaign/campaign-wise-summary" + "?start_date=" + data.start_date + "&end_date=" + data.end_date;
          console.log(data.start_date, data.end_date);
          if (supplierType) {
            url += "&supplier_code=" + supplierType;
          }

        } else {
          var url = url_root + "campaign/campaign-wise-summary";
          if (supplierType) {
            url += "?supplier_code=" + supplierType;
          }
        }
        return machadaloHttp.get(url);
      }

      DashboardService.getVendorWiseSummary = function (supplierType) {
        var url = url_base + "vendor-wise-summary";
        if (supplierType) {
          url += "?supplier_code=" + supplierType;
        }
        return machadaloHttp.get(url);
      }

      DashboardService.getDistributionGraphsStatics = function (data) {
        var url = url_root + "analytics/get-leads-data-generic/";
        return machadaloHttp.put(url, data);
      }

      DashboardService.deleteLeads = function (data) {
        var token = $rootScope.globals.currentUser.token;
        $http({
          url: Config.APIBaseUrl + "v0/ui/leads/delete-leads/",
          method: "DELETE",
          data: data,
          headers: { 'Authorization': 'JWT ' + token, 'Content-Type': 'application/json' }
        })
          .then(function () {
            swal("Leads Deleted", "Successfully", "success");
          })
          .catch(function (error) {
            swal("Leads Deletion", "Failed", "error");
            console.log('error :', error);
          });
      }

      DashboardService.getShortlistedSuppliers = function (campaignId, supplier_code) {
        var url = url_root + "website/get-shortlisted-suppliers/" + campaignId + "/?supplier_type_code=" + supplier_code;
        return machadaloHttp.get(url);
      }

      DashboardService.printLeadsInExcel = function (data) {
        var url = url_root + "leads/" + data.leads_form_id + "/generate_lead_data_excel?supplier_id=" +
          data.supplier_id + "&start_date=" + data.start_date + "&end_date=" +
          data.end_date;
        return machadaloHttp.get(url);
      }
      DashboardService.getCampaignsWiseForCity = function (dataCity, supplierType) {
        var url = url_analytics + "city-vendor-campaigns/";
        if (supplierType) {
          url += "?supplier_code=" + supplierType;
        }
        console.log(url);
        return machadaloHttp.put(url, dataCity);
      }
      DashboardService.getCampaignsWiseForVendor = function (dataVendor, supplierType) {
        var url = url_analytics + "city-vendor-campaigns/";
        if (supplierType) {
          url += "?supplier_code=" + supplierType;
        }
        return machadaloHttp.put(url, dataVendor);
      }
      DashboardService.getCityUsers = function () {
        var url = url_root + "campaign/user-cities/";
        return machadaloHttp.get(url);
      }
      DashboardService.viewCommentsBasic = function (id) {
        var url = url_root + "b2b/basic-client-comment/?_id=" + id;
        return machadaloHttp.get(url);
      }
      DashboardService.viewCommentsDetails = function (id,req_id,type) {
        if(!type){
          type = "all";
        }
        var url = url_root + "b2b/basic-client-comment/?requirement_id=" + req_id + "&_id="+id + "&comment_type="+type;
        return machadaloHttp.get(url);
      }
      DashboardService.basicExternalComment=function(comment,Id,req_id){
          var param={};
          var payload=[];
          var payload_param={};
          payload_param['comment']=comment;
          payload_param['_id']=Id;
          payload_param['requirement_id']=req_id;
          payload.push(payload_param);
          param['data']=payload;
        var url = url_root + "b2b/basic-client-comment/";
        return machadaloHttp.post(url,param);
      }
      DashboardService.deleteBasicComment = function (comment_Id,req_id){
        var url = url_root + "b2b/basic-client-comment/?requirement_id="+req_id+"&id="+comment_Id;
        return machadaloHttp.delete(url);
      }

      DashboardService.downloadSheet = function (formId) {
        var url = url_root + "leads/" + formId + "/generate_lead_data_excel";
        return machadaloHttp.get(url);
      }


      DashboardService.getAllComments = function (campaignId) {
        var url = url_base + campaignId + "/comment/";
        return machadaloHttp.get(url);
      }

      //lead start 

      DashboardService.leadCountByDate = function (date) {
       // var url = url_root + "b2b/lead-count-by-date/?date=2020-11-6 00:00:00.00000";
        var url = url_root + "b2b/lead-count-by-date/";
        if(date){
          url += "?date=" + date;
        }
        return machadaloHttp.get(url);
      }

      DashboardService.leadCampaignData = function (date) {
       // var url = url_root + "b2b/lead-campaign-data/?date=2020-10-31 08:15:27.243860";
        var url = url_root + "b2b/lead-campaign-data/";
        if(date){
          url += "?date=" + date;
        }
        return machadaloHttp.get(url);
      }

      DashboardService.getLeadSupplier = function (campaignId) {
        var url = url_root + "b2b/supplier-by-campaign/?campaign_id=" + campaignId;
        return machadaloHttp.get(url);
      }

   

      DashboardService.existingClientFeedbackData = function (date) {
       // var url = url_root + "b2b/existing-client-feedback/?date=2020-10-31 08:15:27.243860";
        var url = url_root + "b2b/existing-client-feedback/";
        if(date){
          url += "?date=" + date;
        }
        return machadaloHttp.get(url);
      }
      

      DashboardService.getCampaignsList = function () {
        var url = url_root + "b2b/campaign-list-by-status/";
        return machadaloHttp.get(url);
      }

      DashboardService.leadCount = function (data) {
       // var url = url_root + "b2b/donut-1st/?campaign_id=MACJITEC8F";
        var url = url_root + "b2b/donut-1st/";
        if(data && data.campaign_id){
          url += "?campaign_id=" + data.campaign_id;
        }
        return machadaloHttp.get(url);
      }

      DashboardService.clientFeedback = function (data) {
        //var url = url_root + "b2b/donut-2nd/?campaign_id=MACJITEC8F";
        var url = url_root + "b2b/donut-2nd/";
        if(data && data.campaign_id){
          url += "?campaign_id=" + data.campaign_id;
        }
        return machadaloHttp.get(url);
      }

      DashboardService.leadSupplerDetail = function (data) {
       // var url = url_root + "b2b/donut-table-1st/?campaign_id=MACJITEC8F&is_purchased=no";
         var url = url_root + "b2b/donut-table-1st/";
        if(data && data.campaign_id){
          url += "?campaign_id=" + data.campaign_id;
             if(data.status){
              url += "&is_purchased=" +  data.status;
             }
        } else {
          url += "?is_purchased=" +  data.status;
        }
        return machadaloHttp.get(url);
      }

      DashboardService.ClientFeedbackSupplierDetail = function (data) {
       // var url = url_root + "b2b/donut-table-2nd/?campaign_id=MACJITEC8F&is_purchased=no";
          var url = url_root + "b2b/donut-table-2nd/";
        if(data && data.campaign_id){
          url += "?campaign_id=" + data.campaign_id;
             if(data.status){
              url += "&is_purchased=" + data.status;
             }
        } else {
          url += "?is_purchased=" +  data.status;
        }

        if(data.satisfied_status){
          url += "&is_satisfied=" +  data.satisfied_status;
        }
        return machadaloHttp.get(url);
      }

      DashboardService.viewCampaignLeads = function (vendor, supplierType,user_type,tabName) {
        if (vendor) {
          var url = url_root + "b2b/lead-distribution-campaign/?lead_type=" + vendor + "&user_type="+user_type + "&tabname="+tabName;
        } else {
          var url = url_root + "b2b/lead-distribution-campaign/";
        }
        if (supplierType) {
          if (vendor) {
            url += "&supplier_code=" + supplierType;
          } else {
            url += "?supplier_code=" + supplierType;
          }
        }
        return machadaloHttp.get(url);
      }

      DashboardService.getPurchasedLead = function (campaignId) {
        var url = url_root + "b2b/purchased-lead-data/";
        if (campaignId) {
          var url = url_root + "b2b/purchased-lead-data/?campaign_id=" + campaignId;
        } 
        return machadaloHttp.get(url);
      }

      DashboardService.notPurchasedLead = function (campaignId) {
        // var url = url_root + "b2b/not-purchased-lead-data/";
        // if (campaignId) {
          var url = url_root + "b2b/not-purchased-lead-data/?campaign_id=" + campaignId;
     //   } 
        return machadaloHttp.get(url);
      }

      DashboardService.updateClientStatus = function (clientId, status, comment, id) {
        // var url = url_root + "b2b/not-purchased-lead-data/";
        // if (campaignId) {
          var param={};
          var payload=[];
          var payload_param={};
          payload_param['requirement_id']=clientId;
          payload_param['client_status']=status;
          payload_param['client_comment']=comment;
          payload_param['_id']=id;
          payload.push(payload_param);
          param['data']=payload;
          var url = url_root + "b2b/update-client-decision-status/";
     //   } 
        return machadaloHttp.post(url,param);
      }
      DashboardService.sendBookingEmails= function(leads,supplier_code,campaign,email,tabName){
        var url = url_root + "b2b/email-leads-summary/?lead_type=" + leads + "&supplier_code="+supplier_code+"&campaign_id="+campaign+"&emails="+email.email+"&tabname="+tabName+"&Client_Status="+email.selected;
        return machadaloHttp.get(url);
      }

      DashboardService.updateLeadClientStatus = function (status, comment, id,req_id) {
        // var url = url_root + "b2b/not-purchased-lead-data/";
        // if (campaignId) {
          var param={};
          var payload=[];
          var payload_param={};
          payload_param['macchadalo_client_status']=status;
          payload_param['macchadalo_client_comment']=comment;
          payload_param['_id']=id;
          payload_param['requirement_id']=req_id;
          payload.push(payload_param);
          param['data']=payload;
          var url = url_root + "b2b/update-machadalo-client-status/";
     //   } 
        return machadaloHttp.post(url,param);
      }

      DashboardService.clientStatusList = function () {
        var url = url_root + "b2b/client-status-list/";
        return machadaloHttp.get(url);
      }

      DashboardService.showLeadDetail = function (_id) {
        var url = url_root + "b2b/lead-details/?_id="+_id;
        return machadaloHttp.get(url);
      }
      
      DashboardService.listClientStatus = function () {
        var url = url_root + "b2b/machadalo-client-status-list/";
        return machadaloHttp.get(url);
      }
      
      DashboardService.updateCompanyDetails = function (data) {
        var url = url_root + "b2b/licence-details/";
        return machadaloHttp.put(url,data);
      }


      DashboardService.purchasedNotPurchasedLead = function (campaignId,filterType,supplierCode,page,startDate,endDate,city,search) {
        if (search==undefined){
            search="";
        }
        //var url = url_root + "b2b/lead-form-headers/?campaign_id=" + campaignId + "&lead_type=" + filterType;
        var url = url_root + "b2b/lead-form-headers/?campaign_id=" + campaignId + "&supplier_type=" + supplierCode+"&next_page="+page+"&start_date="+startDate+"&end_date="+endDate+"&city="+city+"&search="+search;
        if(filterType){
          url += "&lead_type=" + filterType;
        }
        return machadaloHttp.get(url);
      }
      

      DashboardService.viewLicenceDetail = function () {
        var url = url_root + "b2b/licence-details/";
        return machadaloHttp.get(url);
      }

      DashboardService.updateCompanyDetails = function (data) {
        var url = url_root + "b2b/licence-details/";
        return machadaloHttp.put(url,data);
      }

      DashboardService.updateMyDetails = function (data) {
         var url = url_base_user + "user/" + data.id + "/";
        return machadaloHttp.put(url,data);
      }

      DashboardService.paymentDetails = function () {
        var url = url_root + "b2b/payment-details/";
        return machadaloHttp.get(url);
      }

      DashboardService.leadDecisionPanding = function (type,page,user,search) {  
        var url = url_root + "b2b/lead-decision-panding/";
        if(type){
          url = url_root + "b2b/lead-decision-panding/?type_of_entity=" + type +"&next_page="+page+"&user_type="+user+"&search="+search;
        }
        return machadaloHttp.get(url);
      }

      DashboardService.acceptDeclineDecisionPanding = function (data) {
        var url = url_root + "b2b/update-client-decision-status/";
        return machadaloHttp.post(url, data);
      }
      DashboardService.showLeads = function (supplier_id) {
        var url = url_root + "b2b/supplier-leads-decision-pending/?supplier_id=" + supplier_id;
        return machadaloHttp.get(url);
      }


      DashboardService.showSubLeadDetail = function (campaignId,supplier_code,page,supp_id) {
        var url = url_root + "b2b/supplier-leads-details-page/?campaign_id="+ campaignId + "&supplier_type="+ supplier_code +"&next_page="+page+"&supplier_id="+supp_id;
        return machadaloHttp.get(url);
      }
      DashboardService.basicCampaignList = function (tabName) {
        var url = url_root +"b2b/get-basic-lead-distribution-campaign/?tabname="+tabName;
        return machadaloHttp.get(url);
      }
      DashboardService.basicLeadsOfCampaigns = function (campaignId,supplier_code,page,city,startDate,endDate,search) {
        var url = url_root +"b2b/get-dynamic-basic-lead-form-headers/?campaign_id="+campaignId+"&supplier_type="+supplier_code+"&next_page="+page+"&city="+city+"&startDate="+startDate+"&endDate="+endDate+"&search="+search;
        return machadaloHttp.get(url);
      }
      DashboardService.listOfCreateField = function (campaign_id) {
        var url = url_root +"template/view-template/?campaign_id="+campaign_id;
        return machadaloHttp.get(url);
      }
      DashboardService.submitCreateField = function (data) {
        var url = url_root +"template/add-template/";
        return machadaloHttp.post(url,data);
      }
      DashboardService.removeSingleField = function(id){
        var url = url_root +"template/add-template/?md_id="+id;
        return machadaloHttp.delete(url); 
      }

      return DashboardService;

    }]);
