'use strict';


angular.module('catalogueApp')
  .factory('templateDashboardService', ['machadaloHttp', '$stateParams', '$rootScope', '$routeParams', '$location',
    function (machadaloHttp, $stateParams, $scope, $rootScope, $routeParams, $location) {

      var url_base = 'v0/ui/website/';
      var url_base_proposal = 'v0/ui/proposal/';
      var url_analytics = 'v0/ui/analytics/';
      var url_root = 'v0/ui/';
      var url_base_user = 'v0/';
      var DashboardService = {};
      var apiHost = APIBaseUrl;
      var interveneApiHost = Config.interveneMeaAPIBaseUrl;

      DashboardService.transactionalTemplateSummaryMca = function (param) {
        let url = "v0/ui/mca-bot/template-summary-list/?search=" + param.search + '&start_date=' + param.start_date + "&end_date=" + param.end_date;
        return machadaloHttp.get(url);
      }

      DashboardService.transactionalTemplateDatewiseDetail = function (param) {
        let url = "v0/ui/mca-bot/template-date-wise-summary/?template_id=" + param.template_id + "&start_date=" + param.start_date + "&end_date=" + param.end_date + "&next_page=" + param.next_page;
        return machadaloHttp.get(url);

      }

      DashboardService.transactionalTemplateUserDetail = function (param) {
        let url = "v0/ui/mca-bot/template-user-summary-list/?template_id=" + param.template_id +
          "&date=" + param.date + "&next_page=" + param.next_page + "&search=" + param.search;
        if (param.buttonName !== undefined) {
          url += `&${param.buttonName}=` + param.sort;
        }
        return machadaloHttp.get(url);

      }

      DashboardService.transactionalTemplateSummaryDownload = function (param) {
        let url = "v0/ui/mca-bot/download-template-user-summary/?template_id=" + param.template_id;
        return machadaloHttp.get(url);
      }

      DashboardService.formUpload = function (param) {
        let url = "" + param.template_id
        return machadaloHttp.get(url);
      }

      DashboardService.getTemplateTabData = function (page, search, status, campaign) {
        let url = "v0/ui/template/view-template/?next_page=" + page + "&search=" + search + "&status=" + status + "&campaign_id=" + campaign;
        return machadaloHttp.get(url);
      }
      DashboardService.createTemplate = function (data) {
        let url = "v0/ui/template/";
        return machadaloHttp.post(url, { data: data });
      }

      DashboardService.getSector = function () {
        var url = "v0/ui/accounts/create_business/load_business_types/";
        return machadaloHttp.get(url);
      }

      DashboardService.supplierFilterList = function () {
        let url = "v0/ui/b2c-bot/supliers-filter-list/";
        return machadaloHttp.get(url);
      }

      DashboardService.getCallStatusList = function () {
        let url = "v0/ui/b2b/question-dropdown-filter/";
        return machadaloHttp.get(url);
      }

      DashboardService.updateCallStatus = function (data) {
        let url = "v0/ui/template/update-call-status-template";
        return machadaloHttp.post(url, data);
      }

      DashboardService.UpdateAddComments = function (data) {
        let url = "v0/ui/template/update-comment-template";
        return machadaloHttp.post(url, data);
      }

      DashboardService.getDialerCallerIds = function () {
        let url = "v0/ui/mca-bot/dailer-caller-ids/";
        return machadaloHttp.get(url);
      }

      DashboardService.getDialerAgents = function () {
        let url = "v0/ui/mca-bot/dailer-agents/";
        return machadaloHttp.get(url);
      }

      DashboardService.postDataOnQuickCall = function (data) {
        let url = "v0/ui/mca-bot/dailer-call/";
        return machadaloHttp.post(url, data);
      }

      DashboardService.DeleteTemplate = function (id) {
        let url = "v0/ui/template/?md_id=" + id;
        return machadaloHttp.delete(url);
      }

      DashboardService.sendOptinuser = function (data) {
        let url = "v0/ui/mca-bot/optin-users/";
        return machadaloHttp.post(url, data);
      }

      DashboardService.getDropdownData = function (sector) {
        let url = "v0/ui/b2b/dropdown-filter-by-sector/?sector="+ sector.toLowerCase();
        return machadaloHttp.get(url);
      }

      DashboardService.getSectorByNumber = function (number) {
        let url = "v0/ui/b2b/sector-list/?mobile_number=" + number;
        return machadaloHttp.get(url);
      }

      DashboardService.getLeadBySector = function (data) {
        let url = "v0/ui/b2b/sector-wise-lead-details/?mobile_number=" + data.phone_number + "&sector_id=" + data.sector.id;
        return machadaloHttp.get(url);
      }

      return DashboardService;

    }]);
