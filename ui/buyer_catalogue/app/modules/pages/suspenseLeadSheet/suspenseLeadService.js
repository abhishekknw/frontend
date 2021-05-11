'use strict';

angular.module('catalogueApp')
  .factory('suspenseLeadService', ['machadaloHttp', '$stateParams', '$window', '$rootScope', '$routeParams', '$location', '$http',

    function (machadaloHttp, $stateParams, $rootScope, $window, $routeParams, $location, $http) {

      var base_url = 'v0/ui/';
      var url_base = 'v0/ui/website/';
      var suspenseLeadService = {};

      suspenseLeadService.getAllSuspenseLead = function () {
        var url = base_url + "b2b/suspense-leads/";
        return machadaloHttp.get(url);
      }


      suspenseLeadService.getLeasTabSuspenseLead = function (page) {
        var url = base_url + "b2b/suspense-leads-tab/?page=" + page;
        return machadaloHttp.get(url);
      }

      suspenseLeadService.removeSuspenseLead = function (data) {
        var url = base_url + "b2b/delete-suspense-leads/";
        return machadaloHttp.post(url, data);
      }

      suspenseLeadService.updateLeadTab = function (data) {
        var url = base_url + "b2b/update-suspense-leads/";
        return machadaloHttp.post(url, data);
      }

      suspenseLeadService.initialData = function () {
        var url = base_url + "create_supplier/load_initial_data/";
        return machadaloHttp.get(url);
      };

      suspenseLeadService.getAreas = function (type, id) {
        var url = base_url + "locations/" + id + "/?type=" + type;
        return machadaloHttp.get(url);
      };
      suspenseLeadService.getSupplierNameList = function (data) {
        var url = base_url + "b2b/suspense-to-supplier/?city=" + data.city + '&area=' + data.area + '&supplier_type=' + data.supplier_type;
        return machadaloHttp.get(url);
      };
      suspenseLeadService.addUpdateSupplier = function (data) {
        var url = base_url + "b2b/suspense-to-supplier/";
        return machadaloHttp.post(url, data);
      }
      suspenseLeadService.addPoc = function (data) {
        var url = base_url + "b2b/add-poc/";
        return machadaloHttp.post(url, data);
      }
      suspenseLeadService.opsVerify = function (id) {
        var url = base_url + "b2b/suspense-lead-ops-verification/?_id=" + id ;
        return machadaloHttp.get(url);
      };

      suspenseLeadService.getPocList = function (id) {
        var url = base_url + "b2b/add-poc/?suspense_id=" + id ;
        return machadaloHttp.get(url);
      };

      suspenseLeadService.getBrowsedTabSuspenseLead = function (page) {
        var url = base_url + "b2b/suspense-browsed-tab/?page=" + page;
        return machadaloHttp.get(url);
      }

      suspenseLeadService.getAllState = function () {
        console.log('hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
        return true;
        // var url = base_url + "b2b/suspense-leads/";
        // return machadaloHttp.get(url);
      }

      suspenseLeadService.getAllCity = function () {
        console.log('citiesssssssssss');
        return true;
        // var url = base_url + "b2b/suspense-leads/";
        // return machadaloHttp.get(url);
      }

      suspenseLeadService.getAllBeds = function () {
        console.log('bedsssssssssssss');
        return true;
        // var url = base_url + "b2b/suspense-leads/";
        // return machadaloHttp.get(url);
      }
  
      return suspenseLeadService;
    }]);
