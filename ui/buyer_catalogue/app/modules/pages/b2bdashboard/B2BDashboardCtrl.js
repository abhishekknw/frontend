/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('catalogueApp').directive('selects', function ($interpolate) {
    return {
      restrict: 'E',
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var defaultOptionTemplate;
        scope.defaultOptionText = attrs.defaultOption || 'Select';
        defaultOptionTemplate = '<option value="" disabled selected style="display: none;">{{defaultOptionText}}</option>';
        elem.prepend($interpolate(defaultOptionTemplate)(scope));
      }
    };
  }).controller('B2BDashboardCtrl', function ($scope, NgMap, $rootScope, baConfig, colorHelper, DashboardService, B2BDashboardService, commonDataShare, constants, $location, $anchorScroll, uiGmapGoogleMapApi, uiGmapIsReady, Upload, cfpLoadingBar, $stateParams, $timeout, Excel, permissions, $window,AuthService) {

    $scope.campaign_id = $stateParams.proposal_id;
    $scope.passwordError = constants.password_error;
    $scope.userInfo = $rootScope.globals.userInfo;
    $scope.APIBaseUrl = Config.APIBaseUrl;
    $scope.ImageBaseUrl = constants.aws_bucket_url;
    $scope.supplierTypeCode = [
      {
        "name": "ALL",
        "value": "all"
      },
      {
        "name": "Residential Society",
        "value": "RS"
      },
    ];
    $scope.entityTypes = constants.entityType;
    $scope.entityType = { value: 'all', name: 'ALL' };
    $scope.selectedEntityType = { value: 'all', name: 'ALL' }
    $scope.supplierTypeCodePerformanceDetail = constants.supplierTypeCodePerformanceDetail;
    $scope.selectedSupplierType = { code: "all", codes: "all" };
    $scope.example14model = [];
    $scope.selected_cities_list = [];
    $scope.settings = {
      showCheckAll: true,
      scrollable: true,
      enableSearch: true,
      showUncheckAll: true
    };
    $scope.startDate = "";
    $scope.endDate = "";
    $scope.submittedDateOptions = {
      maxDate: new Date(),
    };
    $scope.dateRangeModel = {};
    $scope.showPagination = false;
    $scope.selectCity = "";

    $scope.AcceptanceDateRange = {};
    $scope.AcceptanceStartDate = "";
    $scope.AcceptanceEndDate = "";
    $scope.AcceptanceOptions = {
      maxDate: new Date(),
    };

    $scope.UpdateDateRangeModel = {};
    $scope.UpdateStartDate = "";
    $scope.UpdateEndDate = "";
    $scope.UpdateOptions = {
      maxDate: new Date(),
    };

    $scope.purchasedTable = false;
    $scope.notPurchasedTable = false;
    $scope.listClientStatus = [];
    $scope.listClientStatusObj = [];
    $scope.selected_clientStatus = [];

    $scope.primaryCount = { "start": '', "end": '' };

    $scope.clientStatusMachadalo = [
      { "status_name": "Get Verified Leads" },
      { "status_name": "About MCA" },
      { "status_name": "Unsubscribe" },
      { "status_name": "Schedule a demo" },
      // {"status_name":"Checkout sample leads"},
      // {"status_name":"Chat With Your RM"},
      // {"status_name":"Claim Your free dashboard"},
      // {"status_name":"Add Regional sales team"},
      { "status_name": "Verified By BD Head" },
      { "status_name": "Demo Scheduled" },
      { "status_name": "Lead format shared" },
      { "status_name": "Dashboard Credential Shared" },
      { "status_name": "Demo Completed" },
      { "status_name": "Hot" },
      { "status_name": "Warm" },
      { "status_name": "Cold" },
      { "status_name": "proposal sent" },
      { "status_name": "Sales team added" },
      { "status_name": "free leads sharing initiated" },
      { "status_name": "Under negotiation" },
      { "status_name": "PO Under Processing" },
      { "status_name": "Lead sharing Initiated" },
      { "status_name": "Invoice raised" },
      { "status_name": "Advance Payment Received" },
      { "status_name": "Payment Received" },
      { "status_name": "Payment Delayed" },
      { "status_name": "Payment Delayed 7+" },
      { "status_name": "Payment Delayed 15+" },
      { "status_name": "Payment Delayed 21+" },
      // { "status_name": "Under PO Processing" },
      // { "status_name": "Invoice Raised" },
      // { "status_name": "Payment Recieved" },
      // { "status_name": "Payment Delay 7+" },
      // { "status_name": "Payment Delay 15+" },
      // { "status_name": "Payment Delay 30+" },
    ]

    $scope.changeStartDate = function () {
      $scope.dateRangeModel.start_date = $scope.dateRangeModel.start_dates;
      $scope.submittedDateOptions.minDate = $scope.dateRangeModel.start_date;
      $scope.startDate = $scope.dateFormat($scope.dateRangeModel.start_date);
      if ($scope.endDate != "") {
        if ($scope.endDate >= $scope.startDate) {
          $scope.getPurchasedNotPurchasedLead($scope.campaignId, $scope.campaignName, $scope.leadPurchasedStatus, 0, $scope.startDate, $scope.endDate, $scope.AcceptanceStartDate, $scope.AcceptanceEndDate, $scope.UpdateStartDate, $scope.UpdateEndDate, $scope.selectCity, $scope.selectedClientStatus);
        }
        else if ($scope.endDate < $scope.startDate) {
          $scope.endDate = $scope.startDate;
          $scope.dateRangeModel.end_dates = $scope.dateRangeModel.start_date;
          $scope.getPurchasedNotPurchasedLead($scope.campaignId, $scope.campaignName, $scope.leadPurchasedStatus, 0, $scope.startDate, $scope.endDate, $scope.AcceptanceStartDate, $scope.AcceptanceEndDate, $scope.UpdateStartDate, $scope.UpdateEndDate, $scope.selectCity, $scope.selectedClientStatus);
        }
      }
    }

    $scope.changeEndDate = function () {
      if ($scope.changeEndDate > $scope.changeStartDate)
        $scope.dateRangeModel.end_date = $scope.dateRangeModel.end_dates;
      $scope.endDate = $scope.dateFormat($scope.dateRangeModel.end_dates);
      $scope.getPurchasedNotPurchasedLead($scope.campaignId, $scope.campaignName, $scope.leadPurchasedStatus, 0, $scope.startDate, $scope.endDate, $scope.AcceptanceStartDate, $scope.AcceptanceEndDate, $scope.UpdateStartDate, $scope.UpdateEndDate, $scope.selectCity, $scope.selectedClientStatus);
    }

    $scope.searchForDetails = function (search, lead) {
      if (lead == undefined) {
        $scope.getPurchasedNotPurchasedLead($scope.campaignId, $scope.campaignName, $scope.leadPurchasedStatus, 0, $scope.startDate, $scope.endDate, $scope.AcceptanceStartDate, $scope.AcceptanceEndDate, $scope.UpdateStartDate, $scope.UpdateEndDate, $scope.selectCity, $scope.selectedClientStatus, search);
      }
      else {
        $scope.leadDecisionPanding($scope.currentTypeForLeadDecisionPanding, $scope.currentPageForLeadDecisionPanding, 'user', search);
      }
    }

    $scope.dateFormat = function (date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [day, month, year].join('-');
    }

    $scope.invKeysLead = [
      { header: 'LEAD COUNT' },
      { header: 'EXISTING CLIENT FEEDBACK COUNT' },
    ];

    $scope.campaignStatus = {
      overall: {
        status: 'overall', value: false, campaignLabel: 'Overall Campaigns', supplierLabel: 'Overall Societies'
      },
      ongoing: {
        status: 'ongoing', value: false, campaignLabel: 'Ongoing Campaigns', supplierLabel: 'Ongoing Societies'
      },
      completed: {
        status: 'completed', value: false, campaignLabel: 'Completed Campaigns', supplierLabel: 'Completed Societies'
      },
      upcoming: {
        status: 'upcoming', value: false, campaignLabel: 'Upcoming Campaigns', supplierLabel: 'Upcoming Societies'
      },
      onhold: {
        status: 'onhold', value: false, campaignLabel: 'On Hold Campaigns', supplierLabel: 'On Hold Societies'
      },
      compare_campaigns: {
        status: 'compare_campaigns', value: false, campaignLabel: 'Compare Campaigns', supplierLabel: 'Compare Societies'
      },
    };

    $scope.allCampaignStatusType = {
      ongoing: {
        status: 'ongoing_campaigns', value: false, campaignLabel: 'Ongoing Campaigns'
      },
      completed: {
        status: 'completed_campaigns', value: false, campaignLabel: 'Completed Campaigns'
      },
      upcoming: {
        status: 'upcoming_campaigns', value: false, campaignLabel: 'Upcoming Campaigns'
      },
      onhold: {
        status: 'onhold_campaigns', value: false, campaignLabel: 'On Hold Campaigns'
      },
      compare_campaigns: {
        status: 'compare_campaigns', value: false, campaignLabel: 'Compare Campaigns'
      },
    };

    $scope.charts = {
      pie: { name: 'Pie Chart', value: 'pie' },
      doughnut: { name: 'Doughnut Chart', value: 'doughnut' },

    };

    $scope.showPerfPanel = false;
    $scope.inventories = constants.inventories;
    $scope.campaignStatusLabels = [$scope.campaignStatus.ongoing.name, $scope.campaignStatus.completed.name, $scope.campaignStatus.upcoming.name, $scope.campaignStatus.onhold.name, $scope.campaignStatus.overall.name];
    $scope.pieChartDefaulOptions = { legend: { display: true, position: 'right', padding: '10px' } };
    $scope.getCampaignsMenu = function (status) {

      $scope.campaignStatus.overall.value = false;
      $scope.campaignStatus.ongoing.value = false;
      $scope.campaignStatus.completed.value = false;
      $scope.campaignStatus.upcoming.value = false;
      $scope.campaignStatus.onhold.value = false;
      $scope.campaignStatus.compare_campaigns.value = false;
      if (status != 'supplierType') {
        $scope.campaignStatus[status].value = !$scope.campaignStatus[status].value;
      }

    }

    var campaignDataStruct = {
      id: '',
      supplier_id: '',
      proposal_name: '',
      inv_id: '',
      inv_type: '',
      images: [],
      act_name: '',
      act_date: '',
      reAssign_date: '',
    };
    $scope.defaultOption = 'Select Leads,Surveyed Clients';
    var category = $rootScope.globals.userInfo.profile.organisation.category;
    var orgId = $rootScope.globals.userInfo.profile.organisation.organisation_id;
    $scope.campaignDataList = [];
    var getAllCampaignsData = function () {
      DashboardService.getAllCampaignsData(orgId, category)
        .then(function onSuccess(response) {
          $scope.count = 0;
          $scope.invActDateList = [];
          $scope.inventoryActivityCountData = response.data.data;
          $scope.showTableForAllCampaignDisplay = false;
          angular.forEach(response.data.data, function (data, key) {
            $scope.isPanelOpen = !$scope.isPanelOpen;
            $scope.inventoryActivityCountData[key] = sortObject(data);
            $scope.invActDateList = $scope.invActDateList.concat(Object.keys($scope.inventoryActivityCountData[key]));
          })
          $scope.invActDateList = Array.from(new Set($scope.invActDateList));
          $scope.invActDateList.sort().reverse();
          $scope.dateListKeys = {};
          angular.forEach($scope.invActDateList, function (date) {
            $scope.dateListKeys[date] = date;
          })
          getHistory(response.data.data);
          $scope.loading = response.data.data;
        }).catch(function onError(response) {
          console.log(response);
        })
    }

    var getHistory = function (data) {
      $scope.historyData = {};
      var curDate = new Date();
      angular.forEach(data, function (dates, invKey) {
        angular.forEach(dates, function (activities, dateKey) {
          if (new Date(dateKey) <= curDate) {
            if (!$scope.historyData.hasOwnProperty(dateKey)) {
              $scope.historyData[dateKey] = {};
            }
            angular.forEach(activities, function (count, actKey) {
              if (!$scope.historyData[dateKey].hasOwnProperty(actKey)) {
                $scope.historyData[dateKey][actKey] = {};
                $scope.historyData[dateKey][actKey]['actual'] = 0;
                $scope.historyData[dateKey][actKey]['total'] = 0;
              }
              $scope.historyData[dateKey][actKey].actual += data[invKey][dateKey][actKey].actual;
              $scope.historyData[dateKey][actKey].total += data[invKey][dateKey][actKey].total;
            })
          }
        })
      })
    }

    var loadData = function () {
      getAllCampaignsData();
    }
    loadData();

    function sortObject(obj) {
      return Object.keys(obj).sort().reverse().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
      }, {});
    }
    $scope.count = 0;
    $scope.date = new Date();
    $scope.date = commonDataShare.formatDate($scope.date);
    $scope.pre = -1;
    $scope.next = 1;
    $scope.getDate = function (day) {
      $scope.dateWiseSuppliers = [];
      $scope.showAssignedInvTable = false;
      $scope.OntimeOnlocation.ontime.value = false;
      $scope.OntimeOnlocation.onlocation.value = false;
      $scope.date = new Date($scope.date);
      $scope.date.setDate($scope.date.getDate() + day);
      $scope.date = commonDataShare.formatDate($scope.date);
      $scope.leadDate = $scope.date + ' 00:00:00.0000';
      $scope.leadCountByDate($scope.leadDate);

    }
    $scope.getRecentActivity = function (day) {
      $scope.dateWiseSuppliers = [];
      $scope.isPanelOpen = !$scope.isPanelOpen;
      $scope.showAssignedInvTable = false;
      $scope.OntimeOnlocation.ontime.value = false;
      $scope.OntimeOnlocation.onlocation.value = false;
      var initialDate = $scope.date;
      var date = new Date($scope.date);
      var counter = 100000;
      date.setDate(date.getDate() + day);
      date = commonDataShare.formatDate(date);

      while ($scope.dateListKeys[date] != date) {
        date = new Date(date);
        date.setDate(date.getDate() + day);
        date = commonDataShare.formatDate(date);
        counter--;
        if (counter < 0) {
          alert("No Activity");
          break;
        }
      }
      if (counter < 0)
        $scope.date = initialDate;
      else
        $scope.date = date;


      $scope.dates = $scope.date + ' 00:00:00.0000';
      $scope.leadCountByDate($scope.leadDate);
    }

    $scope.getPercent = function (num1, num2) {
      var percent = num1;

      if (num2) {
        percent = num1 / num2 * 100;
      }

      return percent;
    }

    $scope.goToExecutionPage = function (images) {
      $scope.imageUrlList = [];
      angular.forEach(images, function (imageObjects) {
        for (var i = 0; i < imageObjects.length; i++) {
          var imageData = {
            image_url: $scope.aws_campaign_images_url + imageObjects[i].image_path,
            comment: imageObjects[i].comment,
          };
          $scope.imageUrlList.push(imageData);
        }
      })
    }

    $scope.leadCountByDate = function (date) {
      if (!date) {
        var date = new Date();
        date = commonDataShare.formatDate(date);
        date = date + ' 00:00:00.0000';
      }

      B2BDashboardService.leadCountByDate(date).then(function onSuccess(response) {
        $scope.leadCountData = response.data.data;
      });
      $scope.leadCampaignTable = true;
      $scope.existingClientTable = true;
      $scope.leadSupplierTable = true;
    }

    $scope.leadCampaignTable = true;
    $scope.leadCampaignData = function () {
      var date
      if (!$scope.leadDate) {
        date = new Date();
        date = commonDataShare.formatDate(date);
        date = date + ' 00:00:00.0000';
      } else {
        date = $scope.leadDate;
      }
      B2BDashboardService.leadCampaignData(date).then(function onSuccess(response) {
        $scope.campaignLeadData = response.data.data;
        if ($scope.campaignLeadData.campaigns.length > 0) {
          $scope.leadCampaignTable = false;
        }

        $scope.leadSupplierTable = true;
        $scope.existingClientTable = true;
      });
    }

    $scope.leadSupplierTable = true;
    $scope.getLeadSupplier = function (campaign) {
      $scope.principalVendor = campaign.principal_vendor
      $scope.campaignName = campaign.name;
      B2BDashboardService.getLeadSupplier(campaign.proposal_id).then(function onSuccess(response) {
        $scope.leadSupplierData = response.data.data;
        $scope.leadSupplierTable = false;
      });
    }

    $scope.existingClientTable = true;
    $scope.existingClientFeedbackData = function () {
      var date
      if (!$scope.leadDate) {
        date = new Date();
        date = commonDataShare.formatDate(date);
        date = date + ' 00:00:00.0000';
      } else {
        date = $scope.leadDate;
      }
      B2BDashboardService.existingClientFeedbackData(date).then(function onSuccess(response) {
        $scope.clientFeedbackData = response.data.data;
        $scope.existingClientTable = false;
        $scope.leadCampaignTable = true;
        $scope.leadSupplierTable = true;
      });
    }

    $scope.leadCount = function (campaign) {
      $scope.hideDonetOne = false;
      $scope.hideDonettwo = false;
      $scope.selectedCampaignName = undefined;
      var data = {}
      var campaignId
      if (campaign && campaign.proposal_id) {
        data.campaign_id = campaign.proposal_id;
        campaignId = campaign.proposal_id;
        $scope.selectedCampaignName = campaign.name;
      }
      $scope.options = {};
      B2BDashboardService.leadCount(data).then(function onSuccess(response) {
        $scope.AllLeadsData = response.data.data
        $scope.options = angular.copy(doughnutChartOptions);
        $scope.options.chart.pie.dispatch['elementClick'] = function (e) { $scope.pieChartClick(e.data.label); };
        $scope.options.chart.pie.dispatch['elementClick'] = function (e) { $scope.getCampaignInvData(e.data); };
        if ($scope.AllLeadsData.total_leads_purchased == 0 && $scope.AllLeadsData.leads_remain == 0) {
          $scope.hideDonetOne = true;
        }
        if (!$scope.AllLeadsData.total_leads_purchased && !$scope.AllLeadsData.leads_remain) {
          $scope.hideDonetOne = true;
        }
        $scope.campaignChartdata = [
          { label: 'Leads Purchased', value: $scope.AllLeadsData.total_leads_purchased, status: 'yes', campaign_id: campaignId },
          { label: 'Leads Not Purchased', value: $scope.AllLeadsData.leads_remain, status: 'no', campaign_id: campaignId },
        ];
      })
      $scope.clientFeedback(campaign);
    }

    $scope.hideDonetOne = false;
    $scope.hideDonettwo = false;

    $scope.clientFeedback = function (campaign) {
      var data = {};
      var campaignId
      if (campaign && campaign.proposal_id) {
        data.campaign_id = campaign.proposal_id;
        campaignId = campaign.proposal_id;
      }
      $scope.feedbackOptions = {};
      B2BDashboardService.clientFeedback(data).then(function onSuccess(response) {
        $scope.leadFeedbackData = response.data.data


        $scope.feedbackOptions = angular.copy(doughnutChartOptions);
        $scope.feedbackOptions.chart.pie.dispatch['elementClick'] = function (e) { $scope.pieChartClick(e.data.label); };
        $scope.feedbackOptions.chart.pie.dispatch['elementClick'] = function (e) { $scope.getClientFeedbackSummary(e.data, campaignId); };
        if ($scope.leadFeedbackData.dissatisfied_purchased == 0 && $scope.leadFeedbackData.dissatisfied_not_purchased == 0 && $scope.leadFeedbackData.total_satisfied == 0) {
          $scope.hideDonettwo = true;
        }
        if ($scope.leadFeedbackData && !$scope.leadFeedbackData.dissatisfied_purchased && !$scope.leadFeedbackData.dissatisfied_not_purchased && !$scope.leadFeedbackData.total_satisfied) {
          $scope.hideDonettwo = true;
        }

        $scope.campaignChartdatafeedback = [
          { label: 'Dis Satisfied Purchased', value: $scope.leadFeedbackData.dissatisfied_purchased, status: 'yes', campaign_id: campaignId, satisfied_status: 'no' },
          { label: 'Dis Satisfied Not Purchased', value: $scope.leadFeedbackData.dissatisfied_not_purchased, status: 'no', campaign_id: campaignId, satisfied_status: 'no' },
          { label: 'Satisfied', value: $scope.leadFeedbackData.total_satisfied, status: 'no', campaign_id: campaignId, satisfied_status: 'yes' },
        ];
      })
    }

    $scope.getCampaignInvData = function (data) {
      B2BDashboardService.leadSupplerDetail(data).then(function onSuccess(response) {
        $scope.supplierData = response.data.data;
        if ($scope.supplierData.length > 0) {
          for (let i in $scope.supplierData) {
            if ($scope.supplierData[i] && $scope.supplierData[i].supplier_data && $scope.supplierData[i].supplier_data.supplier_type) {


              if ($scope.supplierData[i].supplier_data.supplier_type == 'RS') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Residential Society';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'CP') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Corporate Parks';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'BS') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Bus Shelter';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'GY') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Gym';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'SA') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Saloon';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'RE') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Retail Store';

              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'BU') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Bus';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'CO') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Corporates';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'EI') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Educational Institute';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'GN') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Gantry';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'HL') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Hospital';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'HO') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Hording';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'IR') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'In-shop Retail';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'RC') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Radio Channel';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'TV') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'TV Channel';
              }
            }
          }
        }
        if ($scope.supplierData.length > 0) {
          $scope.showLeadtable = true;
          $scope.showClientFeedbackTable = false;
        }
        $scope.supplierMarkers = assignMarkersToMap($scope.supplierData, 'Lead');
      })

    }
    $scope.showLeadtable = false;
    $scope.showClientFeedbackTable = false;

    $scope.getClientFeedbackSummary = function (data) {
      B2BDashboardService.ClientFeedbackSupplierDetail(data).then(function onSuccess(response) {
        $scope.supplierData = response.data.data.lead_data;
        if ($scope.supplierData.length > 0) {
          for (let i in $scope.supplierData) {
            if ($scope.supplierData[i] && $scope.supplierData[i].supplier_data && $scope.supplierData[i].supplier_data.supplier_type) {
              if ($scope.supplierData[i].supplier_data.supplier_type == 'RS') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Residential Society';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'CP') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Corporate Parks';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'BS') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Bus Shelter';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'GY') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Gym';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'SA') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Saloon';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'RE') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Retail Store';
              }
              else if ($scope.supplierData[i].supplier_data.supplier_type == 'BU') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Bus';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'CO') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Corporates';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'EI') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Educational Institute';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'GN') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Gantry';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'HL') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Hospital';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'HO') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Hording';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'IR') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'In-shop Retail';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'RC') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'Radio Channel';
              } else if ($scope.supplierData[i].supplier_data.supplier_type == 'TV') {
                $scope.supplierData[i].supplier_data.supplier_type_name = 'TV Channel';
              }
            }
          }
        }
        if ($scope.supplierData.length > 0) {
          $scope.showClientFeedbackTable = true;
          $scope.showLeadtable = false;
        }
        $scope.supplierMarkers = assignMarkersToMap($scope.supplierData);
      })
    }

    $scope.getCampaignsList = function () {
      if (!$scope.campaignListData) {
        B2BDashboardService.getCampaignsList()
          .then(function onSuccess(response) {
            $scope.campaignListData = response.data.data;
          });
      }
      $scope.leadCount();
    };

    $scope.pieChartClick = function (label) {
      $anchorScroll('bottom');
      $scope.campaignStatusName = label;
      var campaignStatus = _.findKey($scope.campaignStatus, { 'campaignLabel': label });
      getCountOfSupplierTypesByCampaignStatus(campaignStatus);
    }

    var getCountOfSupplierTypesByCampaignStatus = function (campaignStatus) {
      cfpLoadingBar.start();
      DashboardService.getCountOfSupplierTypesByCampaignStatus(campaignStatus)
        .then(function onSuccess(response) {
          cfpLoadingBar.complete();
          $scope.AllCampaignData = response.data.data;

          $scope.supplierPanIndiaMarkers = assignPanIndiaMarkersToMap($scope.AllCampaignData);
          if (response.data.data) {
            $scope.supplierCodeCountData = formatCountData(response.data.data);
            $scope.supplierTypesData = response.data.data;
            $scope.supplierTypesDataList = [];
            angular.forEach($scope.supplierTypesData, function (data) {
              $scope.supplierTypesDataList = $scope.supplierTypesDataList.concat(data);

            })
            $scope.supplierCodeCountOptions = angular.copy(doughnutChartOptions);
            $scope.showSupplierTypeCountChart = true;
          }
        }).catch(function onError(response) {
          console.log(response);
        })
    }
    $scope.viewCampaignLeads = function (campaign_id) {
      $scope.listClientStatus = [];
      $scope.listClientStatusObj = [];
      let storeData = JSON.parse(localStorage.userInfo);
      if (!campaign_id) {
        campaign_id = '';
      }
      if (storeData.username != "machadalosales") {
        B2BDashboardService.listClientStatus(campaign_id).then(function onSuccess(response) {
          var listData = response.data.data.client_status;
          for (var k in listData) {
            $scope.listClientStatus.push(listData[k].status_name);
            $scope.listClientStatusObj.push({ 'label': listData[k].status_name });
          }
        });
      }
      else {
        var listData = $scope.clientStatusMachadalo;
        for (let k in listData) {
          $scope.listClientStatus.push(listData[k].status_name);
          $scope.listClientStatusObj.push({ 'label': listData[k].status_name });
        }
      }
      $scope.purchasedTable = false;
      $scope.notPurchasedTable = false;
      let user_type = "", tabName = "";
      B2BDashboardService.viewCampaignLeads($scope.filterType, $scope.selectedSupplierType.code, user_type, tabName)
        .then(function onSuccess(response) {
          if (response.data.data) {
            $scope.leadsDataCampaigns = response.data.data;
            $scope.userName = response.data.data[0].name;
            $scope.campaign_id = $scope.leadsDataCampaigns[0].campaign_id;
          }
        });
    }
    // $scope.machadaloClientStatus = function (data) {
    //   if (data == null) {
    //     $scope.value8 = $scope.listClientStatus[0];
    //   }
    //   else {
    //     $scope.value8 = data;
    //   }
    // }
    $scope.getPurchasedLead = function (CampaignId, campaignName) {
      $scope.purchasedTable = true;
      $scope.notPurchasedTable = false;
      $scope.CampaignNameofLeads = campaignName;
      B2BDashboardService.getPurchasedLead(CampaignId)
        .then(function onSuccess(response) {
          $scope.purchasedLeadData = response.data.data;
        });
    }

    $scope.selectFlag = true;
    $scope.clientStatus = "";
    $scope.clientComment = "";
    $scope.requirement_id = "";
    $scope.setValue = function (value, comment, id, req_id) {
      $scope.clientStatus = value;
      $scope.requirement_id = req_id;
      if ($scope.clientComment == "") {
        $scope.clientComment = comment;
      }
      $scope.selectFlag = false;
      $scope.updateLeadClientStatus($scope.clientStatus, $scope.clientComment, id, $scope.requirement_id);
    }
    $scope.viewCommentsLeadDetails = function (Id, req_id) {
      $scope.id_detail = Id;
      $scope.req_id_detail = req_id;
      $('#viewCommentsLeadDetails').modal('show');
      B2BDashboardService.viewCommentsDetails(Id, $scope.req_id_detail)
        .then(function onSuccess(response) {
          $scope.externalComment = response.data.data;
        })
    }

    $scope.condition = "";
    $scope.commentValueDetails = function (comment, Id, req_id, check) {
      $scope.condition = check;
      B2BDashboardService.basicExternalComment(comment.comment, Id, req_id)
        .then(function onSuccess(response) {
          $scope.mymodel["comment"] = "";
          swal("Successfull", "comment added sucessfully", "success");
          if ($scope.condition == true) {
            $scope.viewCommentsLeadDetails($scope.id_detail, $scope.req_id_detail);
          }
          else {
            B2BDashboardService.viewCommentsDetails(Id, $scope.req_id_detail)
              .then(function onSuccess(response) {
                $scope.externalComment = response.data.data;
              })

          }
        })
    }
    $scope.valuechange = function (value1, status, id, req_id) {
      $scope.clientComment = value1;
      $scope.requirement_id = req_id;
      $scope.clientStatus = status;
      if ($scope.clientComment != $scope.commentCheck) {
        $scope.updateLeadClientStatus($scope.clientStatus, $scope.clientComment, id, $scope.requirement_id);
      }
    }
    $scope.leadDetailDataList = "";
    $scope.showLeadDetail = function (_id, req_id) {
      $scope.id_detail = _id;
      $scope.req_id_detail = req_id;
      B2BDashboardService.showLeadDetail(_id)
        .then(function onSuccess(response) {
          $scope.leadDetailDataList = response.data.data;
        });

      B2BDashboardService.viewCommentsDetails(_id, req_id)
        .then(function onSuccess(response) {
          $scope.externalComment = response.data.data;
        })

      B2BDashboardService.viewStatusFunnel(req_id)
        .then(function onSuccess(response) {
          $scope.StatusFunnel = response.data.data;
        })
    }

    $scope.deleteBasicComment = function (comment_id, req_id) {
      B2BDashboardService.deleteBasicComment(comment_id, req_id)
        .then(function onSuccess(response) {
          swal("", response.data.data, "success");
          B2BDashboardService.viewCommentsDetails($scope.id_detail, $scope.req_id_detail)
            .then(function onSuccess(response) {
              $scope.externalComment = response.data.data;
            })
        })
    }

    $scope.updateLeadClientStatus = function (status, comment, id) {
      if ($scope.clientStatus == "") {
        $scope.clientStatus = status;
      }
      if ($scope.clientComment == "") {
        $scope.clientComment = comment;
      }
      B2BDashboardService.updateLeadClientStatus($scope.clientStatus, $scope.clientComment, id, $scope.requirement_id)
        .then(function onSuccess(response) {
          swal(constants.name, response.data.data, constants.success);
          $scope.clientStatus = "";
          $scope.clientComment = "";
        });
      B2BDashboardService.showLeads($scope.supp_id)
        .then(function onSuccess(response) {
          $scope.supplier_leads = response.data.data.lead;
        })
      B2BDashboardService.showSubLeadDetail($scope.campaignId, $scope.selectedSupplierType.code, $scope.page, $scope.supp_id)
        .then(function onSuccess(response) {
          $scope.detail_supplier_leads = response.data.data.lead;
        })
    }

    $scope.updateClientStatus = function (clentId, id, status, comment, type) {
      if ($scope.clientStatus == "") {
        $scope.clientStatus = status;
      }
      if ($scope.clientComment == "") {
        $scope.clientComment = comment;
      }
      B2BDashboardService.updateClientStatus(clentId, $scope.clientStatus, $scope.clientComment, id)
        .then(function onSuccess(response) {
          swal(constants.name, response.data.data, constants.success);
          $scope.clientStatus = "";
          $scope.clientComment = "";
          if (type != 'Lead') {
            $scope.leadDecisionPanding($scope.currentTypeForLeadDecisionPanding, $scope.currentPageForLeadDecisionPanding);
          }
        });
    }

    $scope.clientStatusList = function (data) {
      B2BDashboardService.clientStatusList(data)
        .then(function onSuccess(response) {
          var list = response.data.data.client_status;
          for (var k in list) {
            for (var i in list[k]) {
              $scope.clientStausListData.push(list[k][i]);
            }
          }
        });
    }
    $scope.downloadUploadFile = function (campaign_id, leads_type) {
      $scope.campaign = campaign_id;
      $scope.leads = leads_type;
      $scope.supplier_code = "all";
    }
    $scope.getFormDetails = function (campaign_id, leads_type) {
      $scope.checkForEmailModal = true;
      $scope.campaign = campaign_id;
      $scope.leads = leads_type;
      $scope.supplier_code = "all";
    }
    $scope.sendBookingEmails = function (email) {
      if ($scope.checkForEmailModal == false) {
        if (!email) {
          return 0;
        }
        else {
          sendEmailByFilter(email);
          return 0;
        }
      }
      let tabname = "";
      B2BDashboardService.sendBookingEmails($scope.leads, $scope.supplier_code, $scope.campaign, email, tabname)
        .then(function onSuccess(response) {
          if (response.data.status && response.data.data) {
            $scope.emailModel = {};
            swal(constants.name, "Email Sent Sucessfully", constants.success);
          }
        })
        .catch(function onError(response) {
          swal(constants.name, "Error", constants.error);
        });
    }
    $scope.getNotPurchasedLead = function (CampaignId, campaignName) {
      $scope.purchasedTable = false;
      $scope.notPurchasedTable = true;
      $scope.CampaignNameofLeads = campaignName;
      B2BDashboardService.notPurchasedLead(CampaignId)
        .then(function onSuccess(response) {
          $scope.notPurchasedLeadData = response.data.data;
        });
    }

    $scope.pageChangedPurchage = function (page, leadPurchasedStatus, campaignId, campaignName) {
      $scope.getPurchasedNotPurchasedLead(campaignId, campaignName, leadPurchasedStatus, page, $scope.startDate, $scope.endDate, $scope.AcceptanceStartDate, $scope.AcceptanceEndDate, $scope.UpdateStartDate, $scope.UpdateEndDate, $scope.selectCity, $scope.selectedClientStatus);
    }

    $scope.getPurchasedNotPurchasedLead = function (CampaignId, campaignName, leadStatus, page, startDate, endDate, acceptStartDate, acceptEndDate, updateStartDate, updateEndDate, city, ClientStatus, search) {
      $scope.page = page;
      if (!page) {
        $scope.page = 0;
      }
      if (!startDate || startDate == 'NaN-NaN-NaN') {
        startDate = "";
      }
      if (!endDate || endDate == 'NaN-NaN-NaN') {
        endDate = "";
      }
      if (!city) {
        city = "";
      }
      if (!search) {
        search = "";
      }
      if (!$scope.primaryCount.start) {
        $scope.primaryCount.start = "";
      }
      if (!$scope.primaryCount.end) {
        $scope.primaryCount.end = "";
      }
      if (!acceptStartDate || acceptStartDate == 'NaN-NaN-NaN') {
        acceptStartDate = "";
      }
      if (!acceptEndDate || acceptEndDate == 'NaN-NaN-NaN') {
        acceptEndDate = "";
      }
      if (!updateStartDate || updateStartDate == 'NaN-NaN-NaN') {
        updateStartDate = "";
      }
      if (!updateEndDate || updateEndDate == 'NaN-NaN-NaN') {
        updateEndDate = "";
      }
      if (!ClientStatus) {
        ClientStatus = "";
      }
      $scope.leadPurchasedStatus = leadStatus;
      $scope.campaignId = CampaignId;
      $scope.campaignName = campaignName;
      $scope.CampaignNameofLeads = campaignName;
      B2BDashboardService.purchasedNotPurchasedLead(CampaignId, $scope.filterType, $scope.selectedSupplierType.code, $scope.page, startDate, endDate, acceptStartDate, acceptEndDate, updateStartDate, updateEndDate, city, ClientStatus, search, $scope.primaryCount)
        .then(function onSuccess(response) {
          $scope.isTableHide = false;
          $scope.purchasedNotPurchasedLead = response.data.data;
          $scope.purchasedNotPurchasedLeadTotal = response.data.data.length;
          $scope.purchasedNotPurchasedLeadCurrent = page;
          $scope.purchasedNotPurchasedLeadPerPage = 20;
        });
    }

    $scope.isTableHide = true;



    $scope.setSupplierType = function () {
      $scope.isTableHide = true;
      $scope.viewCampaignLeads()
    }


    $scope.viewLicenceDetail = function () {
      B2BDashboardService.viewLicenceDetail()
        .then(function onSuccess(response) {
          $scope.viewLicenceDetailData = response.data.data;
        });
    }
    $scope.licenceTab = true;
    $scope.changeTab = function (value) {
      if (value == 'licence') {
        $scope.licenceTab = true;
        $scope.paymentTab = false;
      } else {
        $scope.licenceTab = false;
        $scope.paymentTab = true;
        $scope.paymentDetails();
      }
    }


    $scope.decisionPendingTab = true;
    $scope.changeLeadTab = function (value) {
      if (value == 'decisionPending') {
        $scope.decisionPendingTab = true;
        $scope.newLeadsTab = false;
        $scope.leadDecisionPanding();
        $scope.viewCampaignLeads();
      }
      else if (value == 'sync') {
        $scope.decisionPendingTab = false;
        setTimeout(() => {
          $scope.changeLeadTab('decisionPending');
        }, 1000);
      } else {
        $scope.decisionPendingTab = false;
        $scope.newLeadsTab = true;
        $scope.leadCountByDate();
      }
    }

    $scope.updateCompanyDetails = function () {
      var Request = $scope.viewLicenceDetailData.companydetail;
      B2BDashboardService.updateCompanyDetails(Request)
        .then(function onSuccess(response) {
          if (response && response.data && response.data.data && response.data.data.data) {
            swal(constants.name, response.data.data.data, constants.error);
          } else {
            swal(constants.name, constants.updateData_success, constants.success);
          }
        });
    }

    $scope.updateRelationshipManagerDetails = function () {
      console.log('++++++++++++++++++++++++++++++++++++', $scope.viewLicenceDetailData)
    }

    $scope.updateMyDetails = function () {
      B2BDashboardService.updateMyDetails($scope.viewLicenceDetailData.mydetail)
        .then(function onSuccess(response) {
          if (response) {
            swal(constants.name, constants.updateData_success, constants.success);
          }
        });
    }


    $scope.paymentDetails = function () {
      B2BDashboardService.paymentDetails()
        .then(function onSuccess(response) {
          $scope.paymentDetailsData = response.data.data;
        });
    }

    $scope.loadedData = true;
    $scope.pageChanged = function (newPage) {
      if ($scope.loadedData == true) {
        $scope.leadDecisionPanding('all', newPage);
      }
    };

    $scope.currentPageForLeadDecisionPanding = 0;
    $scope.currentTypeForLeadDecisionPanding = "";
    $scope.clientStausListData = [];
    $scope.leadDecisionPanding = function (value, page, user, search) {
      if (!value) {
        value = 'all';
      }
      if (!search) {
        search = '';
      }
      $scope.currentTypeForLeadDecisionPanding = value;
      if (!page) {
        page = 0;
      }
      $scope.currentPageForLeadDecisionPanding = page;
      if ($scope.clientStausListData.length == 0) {
        $scope.clientStatusList();
      }
      user = !user ? "" : user;
      B2BDashboardService.leadDecisionPanding(value, page, user, search)
        .then(function onSuccess(response) {
          $scope.leadDecisionPandingData = response.data.data.lead;
          $scope.totalrecord = response.data.data.length;
          $scope.itemsPerPageRecord = 20;
          $scope.currentPage = page;
        });
    }

    $scope.ratingStar = function (rating) {
      let star = "";
      for (let i = 0; i < rating; i++) {
        star += '*';
      }
      return star;
    }


    $scope.addMultiButtons = function (button) {
      if ($scope.button) {
        $scope.addmultiButton = $scope.button;
        $scope.button = "";
      }
    }
    $scope.updateButton = {};
    $scope.MultipleButtonShow = function (button) {
      console.log(button);
      $scope.updateButton.one = button[0].name;
      $scope.updateButton.two = button[1].name;
      $scope.updateButton.three = button[2].name;
    }

    $scope.updateMultiButtons = function (updateButton) {
      $scope.updateButton = updateButton;
    }


    $scope.listOfCreateField = function (campaign_id) {
      $scope.campaign_id = campaign_id;
      B2BDashboardService.listOfCreateField(campaign_id)
        .then(function onSuccess(response) {
          $scope.createFieldList = response.data.data.rows;
          $scope.fieldName = response.data.data.field_list;
          $scope.typeOfField = response.data.data.template_type;
        });
    }
    $scope.submitCreateField = function (datalist) {
      let fieldName = datalist.fieldName;
      let param = datalist.param;
      datalist.param = param.split(',');
      delete datalist.fieldName;
      datalist.status_id = fieldName.id;
      datalist.field_name = fieldName.name;
      datalist.campaign_id = $scope.campaign_id;
      datalist.buttonOne = $scope.addmultiButton?.one;
      datalist.buttonTwo = $scope.addmultiButton?.two;
      datalist.buttonThree = $scope.addmultiButton?.three;
      let dataObj = {};
      dataObj.data = datalist;

      B2BDashboardService.submitCreateField(dataObj)
        .then(function onSuccess(response) {
          $scope.createData = "";
          $scope.addmultiButton = "";
          $scope.listOfCreateField($scope.campaign_id);
        }).catch(function onError(response) {
          console.log(response);
        });
    }
    $scope.isCheck = false;
    $scope.checkboxCheck = function () {
      for (let i in $scope.leadDecisionPandingData) {
        if ($scope.leadDecisionPandingData[i].checkStatus) {
          $scope.isCheck = true;
        }
      }
    }
    $scope.changeLeadTab('sync')
    $scope.setEntityType = function (value) {
      $scope.leadDecisionPanding(value)
    }

    $scope.acceptDeclineDecisionPanding = function (index, value, id, requirement_id) {
      let data = [{
        "requirement_id": requirement_id,
        "client_status": value,
        "_id": id
      }]
      B2BDashboardService.acceptDeclineDecisionPanding({ 'data': data })
        .then(function onSuccess(response) {
          if (response) {
            if (value == "Decline") {
              $scope.leadDecisionPandingData[index].client_status = "Decline";
            }
            else {
              $scope.leadDecisionPandingData.splice(index, 1);
            }

            if (value == 'Decline') {
              value = 'Declined';
            }
            swal(constants.name, value + " Successfully", constants.success);
          }
          B2BDashboardService.showLeads($scope.supp_id)
            .then(function onSuccess(response) {
              $scope.supplier_leads = response.data.data.lead;
            })
        });
    }
    $scope.viewLeadsPopup = function () {
      $('#viewLeadsPopup').modal('show');
    }

    $scope.acceptDeclineMultiple = function (value) {
      let data = [];
      for (let i in $scope.leadDecisionPandingData) {
        if ($scope.leadDecisionPandingData[i].checkStatus) {
          data.push({
            "requirement_id": $scope.leadDecisionPandingData[i].requirement_id,
            "_id": $scope.leadDecisionPandingData[i]._id,
            "client_status": value
          })
        }
      }
      if (data.length > 0) {
        let lead_Decision = [];
        B2BDashboardService.acceptDeclineDecisionPanding({ 'data': data })
          .then(function onSuccess(response) {
            if (response) {
              for (let i in $scope.leadDecisionPandingData) {
                if (!$scope.leadDecisionPandingData[i].checkStatus) {
                  lead_Decision.push($scope.leadDecisionPandingData[i]);
                }
              }
              $scope.leadDecisionPandingData = lead_Decision;
              if (value == 'Decline') {
                value = 'Declined';
              }
              swal(constants.name, value + " Successfully", constants.success);
            }
          });
      }
    }

    $scope.doughnutChartOptions = function () {
      $anchorScroll('bottom');
    }


    var formatCountData = function (data) {
      var countData = [];
      angular.forEach(data, function (items, key) {
        var temp_data = {
          label: constants[key] + ' Campaigns',
          value: items.length,
          campaigns: items
        }
        countData.push(temp_data);
      })
      return countData;
    }


    $scope.type = $scope.charts.doughnut.value;
    $scope.series = ["Campaigns"];
    $scope.getChart = function (chartType) {
      $scope.data = [$scope.campaigns];
      if (chartType == 'doughnut') {
        $scope.options = angular.copy(doughnutChartOptions);
        $scope.options.chart.pie.dispatch['elementClick'] = function (e) {
          $scope.pieChartClick(e.data.label);


        };

      }
      if (chartType == 'pie') {
        $scope.options = $scope.pieChartOptions;
      }
      $scope.type = chartType;
    }

    $scope.onLocationDetails = false;
    $scope.onTimeDetails = false;

    $scope.OntimeOnlocation = {
      ontime: {
        status: 'ontime', value: false
      },
      onlocation: {
        status: 'onlocation', value: false
      },
    };

    $scope.showOntimeOnlocation = function (status) {
      $scope.showOnClickDetails = true;
      $scope.OntimeOnlocation.ontime.value = false;
      $scope.OntimeOnlocation.onlocation.value = false;

      $scope.OntimeOnlocation[status].value = !$scope.OntimeOnlocation[status].value;
    }

    var doughnutChartOptions = {
      chart: {
        type: 'pieChart',
        height: 350,
        top: -30,
        donut: true,
        x: function (d) { return d.label; },
        y: function (d) { return d.value; },

        showLabels: true,
        labelType: 'value',
        pie: {
          startAngle: function (d) { return d.startAngle - Math.PI / 2 },
          endAngle: function (d) { return d.endAngle - Math.PI / 2 },
          dispatch: {
          }
        },
        duration: 500,
        legend: {
          rightAlign: false,

        },
        legendPosition: 'bottom',
        tooltip: {
        },
        interactive: true
      }
    };

    $scope.pieChartOptions = {
      chart: {
        type: 'pieChart',
        height: 350,
        x: function (d) { return d.label; },
        y: function (d) { return d.value; },
        showLabels: true,
        labelType: 'value',
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: {
          rightAlign: false,

        },
        legendPosition: 'bottom',
      }
    };

    $scope.windowCoords = {};
    $scope.marker = {
      events: {
        mouseover: function (marker, eventName, model) {
          $scope.space = model;
          $scope.campaignInventory = model;
          $scope.windowCoords.latitude = model.latitude;
          $scope.windowCoords.longitude = model.longitude;
          $scope.show = true;
        }
      }
    };
    $scope.windowAllCoords = {};
    $scope.markerPanIndia = {
      mouseoverevent: {
        mouseover: function (markerPanIndia, eventName, modelAll) {
          $scope.spacePanIndia = modelAll;
          $scope.campaignInventory = modelAll;
          $scope.windowAllCoords.latitude = modelAll.latitude;
          $scope.windowAllCoords.longitude = modelAll.longitude;
          $scope.show = true;
        }
      }
    };

    function assignPanIndiaMarkersToMap(panIndiaCampaigns) {
      var markersOfPanIndia = [];
      angular.forEach(panIndiaCampaigns, function (data) {
        angular.forEach(data, function (campaign) {
          markersOfPanIndia.push({
            latitude: campaign.center__latitude,
            longitude: campaign.center__longitude,
            id: campaign.proposal_id,
            options: { draggable: false },
            dataOfPanIndia: campaign,
            title: {
              name: campaign.proposal__name,
              society_count: campaign.total,

            },
          });
        })
      });
      return markersOfPanIndia;

    };
    function assignMarkersToMap(suppliers, type) {
      if (type == 'Lead') {
        $scope.mapTextFirst = 'Lead Date';
        $scope.mapTextSecond = 'Type of Lead';
      } else {
        $scope.mapTextFirst = 'Survey Date';
        $scope.mapTextSecond = 'Satisfaction Level';
      }
      var markers = [];
      var icon = 'http://maps.google.com/mapfiles/ms/icons/';
      var checkInv = true;
      icon = icon + 'green-dot.png'
      angular.forEach(suppliers, function (supplier, $index) {
        var icon = 'http://maps.google.com/mapfiles/ms/icons/';
        if ($index == 0) {
          icon = icon + 'green-dot.png';
        } else {
          icon = icon + 'blue-dot.png'
        }
        $scope.map = { zoom: 10, bounds: {}, center: { latitude: supplier.supplier_data.latitude, longitude: supplier.supplier_data.longitude, } };

        markers.push({
          latitude: supplier.supplier_data.latitude,
          longitude: supplier.supplier_data.longitude,
          id: supplier.supplier_data.supplier_id,
          icon: icon,
          options: { draggable: false },
          dataofSupplierAndInvData: supplier.supplier_data,
          title: {
            name: supplier.supplier_data.name,
            flat_count: supplier.supplier_data.flat_count,
            leadDate: supplier.created_at,
            leadType: supplier.company_lead_status,
            feedback: supplier.current_patner_feedback
          },
        });
        // }
        if (checkInv) {
          angular.forEach($scope.invStatusKeys, function (inv, key) {
            if ($scope.invStatusKeys[key].status) {
              if ('inv_data' in supplier.supplier_data && key in supplier.supplier_data.inv_data) {
                markers[$index].title[key] = {
                  'key': key,
                  'total': supplier.supplier_data.inv_data[key].total.total
                }
              }
              else {
                markers[$index].title[key] = {
                  'key': key,
                  'total': 0
                }
              }

            }
          })
        }


      });
      return markers;

    };

    $scope.supplierMarkers = [];
    $scope.supplierPanIndiaMarkers = [];

    $scope.map = { zoom: 5, bounds: {}, center: { latitude: 19.119, longitude: 73.48, } };
    $scope.options = {
      scrollwheel: false, mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_LEFT
      },
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      streetViewControl: true,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
      },
    };





    $scope.map;
    NgMap.getMap().then(function (evtMap) {
      $scope.map = evtMap;
    });
    $scope.showDetail = function (evt, supplierData) {
      $scope.map;
      NgMap.getMap().then(function (evtMap) {
        $scope.map = evtMap;
      });
      $scope.windowDisplay = supplierData;
      $scope.map.showInfoWindow('myWindow', this);
    };

    $scope.getCampaigns = function () {
      if (!$scope.campaignListData && !$scope.campaignData) {
        cfpLoadingBar.start();
        B2BDashboardService.getCampaigns().then(function onSuccess(response) {
          cfpLoadingBar.complete();
          $scope.campaignData = response.data.data;
        }).catch(function onError(response) {
          cfpLoadingBar.complete();
        });
      } else if ($scope.campaignListData && !$scope.campaignData) {
        $scope.campaignData = $scope.campaignListData;
      }
    }

    $scope.submitAnalysisDate = function () {
      if ($scope.analysisCampaign) {
        $scope.getLeadsByCampaign($scope.analysisCampaign);
      }
    }

    $scope.getLeadsByCampaign = function (campaign) {
      $scope.analysisCampaign = angular.copy(campaign);
      $scope.toggle_sort_data = {};

      $scope.CampaignLeadsName = campaign.name;

      $scope.getSummaryReport(campaign);
    }

    $scope.getFlatSummaryReport = function (campaign) {

      let start_date = null;
      let end_date = null;
      if ($scope.dateRangeModel.start_dates && $scope.dateRangeModel.end_dates) {
        start_date = commonDataShare.formatDate($scope.dateRangeModel.start_dates);
        end_date = commonDataShare.formatDate($scope.dateRangeModel.end_dates);
      }

      B2BDashboardService.getFlatSummaryReport(campaign.proposal_id, start_date, end_date).then(function onSuccess(response) {
        $scope.flat_summary_res = response.data.data;

        let obj = {
          "lead_count": 0,
          "hot_lead_count": 0,
          "deep_lead_count": 0,
          "flat_count": 0
        };

        $scope.flat_summary = {
          "<150": angular.copy(obj),
          "150-400": angular.copy(obj),
          ">400": angular.copy(obj)
        };

        $scope.location_summary = {};
        $scope.date_summary = {};

        for (var x in response.data.data) {
          var row = response.data.data[x];

          if (!$scope.location_summary[row.supplier_area]) {
            $scope.location_summary[row.supplier_area] = angular.copy(obj);
          }

          var created_at = new Date(row.created_at);
          var dateKey = created_at.getFullYear() + "-" + (created_at.getMonth() + 1) + "-" + created_at.getDate();

          if (!$scope.date_summary[dateKey]) {
            $scope.date_summary[dateKey] = angular.copy(obj);
          }

          var type = "<150";
          if (row.supplier_primary_count > 150 && row.supplier_primary_count < 400) {
            type = "150-400";
          }
          else if (row.supplier_primary_count > 400) {
            type = ">400";
          }

          $scope.flat_summary[type].lead_count += 1;
          $scope.flat_summary[type].flat_count += row.supplier_primary_count ? row.supplier_primary_count : 0;

          $scope.location_summary[row.supplier_area].lead_count += 1;
          $scope.location_summary[row.supplier_area].flat_count += row.supplier_primary_count ? row.supplier_primary_count : 0;

          $scope.date_summary[dateKey].lead_count += 1;
          $scope.date_summary[dateKey].flat_count += row.supplier_primary_count ? row.supplier_primary_count : 0;

          if (row.lead_status == "Hot Lead") {
            $scope.flat_summary[type].hot_lead_count += 1;
            $scope.location_summary[row.supplier_area].hot_lead_count += 1;
            $scope.date_summary[dateKey].hot_lead_count += 1;
          } else if (row.lead_status == "Deep Lead") {
            $scope.flat_summary[type].deep_lead_count += 1;
            $scope.location_summary[row.supplier_area].deep_lead_count += 1;
            $scope.date_summary[dateKey].deep_lead_count += 1;
          }

        }

        $scope.flat_summary_graph_data = [
          {
            key: "Total Leads",
            values:
              [
                { x: '1-150', y: $scope.flat_summary["<150"].lead_count },
                { x: '151-400', y: $scope.flat_summary["150-400"].lead_count },
                { x: '401+', y: $scope.flat_summary[">400"].lead_count },
              ]
          },
          {
            key: $scope.getHotLeadName,
            values:
              [
                { x: '1-150', y: $scope.flat_summary["<150"].hot_lead_count },
                { x: '151-400', y: $scope.flat_summary["150-400"].hot_lead_count },
                { x: '401+', y: $scope.flat_summary[">400"].hot_lead_count },
              ]
          },
          {
            key: $scope.getDeepLeadName,
            values:
              [
                { x: '1-150', y: $scope.flat_summary["<150"].deep_lead_count },
                { x: '151-400', y: $scope.flat_summary["150-400"].deep_lead_count },
                { x: '401+', y: $scope.flat_summary[">400"].deep_lead_count },
              ]
          },
        ];

        $scope.location_summary_graph_data = [
          {
            key: "Total Leads",
            values: $scope.getLocationGraphValues("lead_count")
          },
          {
            key: $scope.getHotLeadName,
            values: $scope.getLocationGraphValues("hot_lead_count")
          },
          {
            key: $scope.getDeepLeadName,
            values: $scope.getLocationGraphValues("deep_lead_count")
          },
        ];

        $scope.date_summary_graph_data = [
          {
            key: "Total Leads",
            values: $scope.getDateGraphValues("lead_count")
          },
          {
            key: $scope.getHotLeadName,
            values: $scope.getDateGraphValues("hot_lead_count")
          },
          {
            key: $scope.getDeepLeadName,
            values: $scope.getDateGraphValues("deep_lead_count")
          },
        ];

        cfpLoadingBar.complete();
      }).catch(function onError(response) {
        cfpLoadingBar.complete();
      });
    }

    $scope.getLocationGraphValues = function (type) {
      let values = [];

      for (let i in $scope.location_summary) {
        values.push({ x: i, y: $scope.location_summary[i][type] });
      }
      return values;
    }
    $scope.supplierType = 'Leads';
    $scope.surveyLeadArray = ['Leads', 'Survey', 'Survey Leads', 'Feedback'];

    $scope.surveyLeadFilter = function (filter) {
      $scope.filterType = filter;
      $scope.showPagination = false;
      if (filter == 'Leads' || filter == 'Survey') {
        $scope.filterType = filter;
        $scope.isTableHide = true;
        $scope.viewCampaignLeads();
      }
    }
    $scope.surveyLeadFilter('Leads');
    $scope.setButtonIndex = function (index, campaign_id, campaign_name) {
      $scope.campaign = campaign_id;
      $scope.buttonIndex = index;
      $scope.showPagination = true;
      $scope.selected_cities_list = [];
      $scope.selected_clientStatus = [];
      $scope.startDate = "";
      $scope.endDate = "";
      $scope.submittedDateOptions = {
        maxDate: new Date(),
      };
      $scope.dateRangeModel = {};
      $scope.selectCity = "";

      $scope.AcceptanceDateRange = {};
      $scope.AcceptanceStartDate = "";
      $scope.AcceptanceEndDate = "";
      $scope.AcceptanceOptions = {
        maxDate: new Date(),
      };

      $scope.UpdateDateRangeModel = {};
      $scope.UpdateStartDate = "";
      $scope.UpdateEndDate = "";
      $scope.UpdateOptions = {
        maxDate: new Date(),
      };

      $scope.purchasedTable = false;
      $scope.notPurchasedTable = false;
      $scope.selected_clientStatus = [];
      $scope.primaryCount = { "start": '', "end": '' };
      setTimeout(function () {
        $anchorScroll('scrollToTable');
      }, 90);
      $scope.getPurchasedNotPurchasedLead(campaign_id, campaign_name);
      $scope.getCityList(campaign_id);
      $scope.viewCampaignLeads(campaign_id)
      //remove if show 2 butoon
    }

    $scope.getDateGraphValues = function (type) {
      let values = [];

      for (let i in $scope.date_summary) {
        values.push({ x: i, y: $scope.date_summary[i][type] });
      }

      return values;
    }

    $scope.Sort = function (val) {
      if ($scope.sort == val) {
        $scope.reversesort = !$scope.reversesort;
      }
      $scope.sort = val;
      $('td a i').each(function () {
        $(this).removeClass().addClass('icon-sort');
      });
    };

    $scope.Sorts = function (val) {
      if ($scope.sorts == val) {
        $scope.reversesorts = !$scope.reversesorts;
      }
      $scope.sorts = val;
      $('td a i').each(function () {
        $(this).removeClass().addClass('icon-sort');
      });
    };

    $scope.getSummaryReport = function (campaign) {
      cfpLoadingBar.start();

      let start_date = null;
      let end_date = null;
      if ($scope.dateRangeModel.start_dates && $scope.dateRangeModel.end_dates) {
        start_date = commonDataShare.formatDate($scope.dateRangeModel.start_dates);
        end_date = commonDataShare.formatDate($scope.dateRangeModel.end_dates);
      }

      B2BDashboardService.getSummaryReport(campaign.proposal_id, start_date, end_date)
        .then(function onSuccess(response) {
          $scope.summary_report = response.data.data;

          $scope.getHotLeadName = ($scope.summary_report.overall_data.company_hot_lead_status || 'Hot Leads');

          $scope.getDeepLeadName = ($scope.summary_report.overall_data.company_deep_lead_status || 'Deep Leads');

          $scope.sortMenu = [
            { name: 'Total Leads(ASC)', type: 'Total Leads', order: 'ASC', id: 1 },
            { name: 'Total Leads(DESC)', type: 'Total Leads', order: 'DESC', id: 2 },
            { name: $scope.getHotLeadName + '(ASC)', type: $scope.getHotLeadName, order: 'ASC', id: 3 },
            { name: $scope.getHotLeadName + '(DESC)', type: $scope.getHotLeadName, order: 'DESC', id: 4 },
            { name: $scope.getDeepLeadName + '(ASC)', type: $scope.getDeepLeadName, order: 'ASC', id: 5 },
            { name: $scope.getDeepLeadName + '(DESC)', type: $scope.getDeepLeadName, order: 'DESC', id: 6 },
            { name: 'All', type: '', order: '', id: 7 },
          ];

          var summary_report = response.data.data;

          $scope.summary_report_graph_data = [
            {
              key: "Total Leads",
              values:
                [
                  { x: 'Overall', y: summary_report.overall_data.total_lead },
                  { x: 'Last Week', y: summary_report.last_week.total_lead },
                  { x: 'Last Two Week', y: summary_report.last_two_weeks.total_lead },
                  { x: 'Last Three Week', y: summary_report.last_three_weeks.total_lead }
                ]
            },
            {
              key: $scope.getHotLeadName,
              values:
                [
                  { x: 'Overall', y: summary_report.overall_data.hot_lead_count },
                  { x: 'Last Week', y: summary_report.last_week.hot_lead_count },
                  { x: 'Last Two Week', y: summary_report.last_two_weeks.hot_lead_count },
                  { x: 'Last Three Week', y: summary_report.last_three_weeks.hot_lead_count }
                ]
            },
            {
              key: $scope.getDeepLeadName,
              values:
                [
                  { x: 'Overall', y: summary_report.overall_data.total_deep_count },
                  { x: 'Last Week', y: summary_report.last_week.total_deep_count },
                  { x: 'Last Two Week', y: summary_report.last_two_weeks.total_deep_count },
                  { x: 'Last Three Week', y: summary_report.last_three_weeks.total_deep_count }
                ]
            }
          ];

          $scope.getFlatSummaryReport(campaign);
        }).catch(function onError(response) {
          cfpLoadingBar.complete();
        });
    };

    $scope.getPercentBrackets = function (num1, num2) {
      if (num1 && num2) {
        var percent = num1 / num2 * 100;

        return "(" + percent + "%)";
      }

      return "";
    }
    $scope.getFiles = function (file) {
      $scope.file = file;
      console.log(file);
    }
    $scope.uploadSelectFile = function () {
      let uploadurl = {
        url: Config.APIBaseUrl + 'v0/ui/b2b/upload-lead-comments/',
        method: "POST",
        timeout: 0,
        data: {
          "file": $scope.file[0],
        },
        headers: {
          "Authorization": 'JWT ' + $rootScope.globals.currentUser.token
        },
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
      }
      Upload.upload(uploadurl).then(function onSuccess(response) {
        $scope.file = undefined;
        console.log(response);
        swal(constants.name, response.data.data, constants.success);
      })
    }

    $scope.weekSummaryStackedBar = {
      "chart": {
        "type": "multiBarChart",
        "height": 450,
        "margin": {
          "top": 100,
          "right": 20,
          "bottom": 145,
          "left": 45
        },
        "clipEdge": true,
        "duration": 500,
        "grouped": true,
        "sortDescending": false,
        "xAxis": {
          "axisLabel": "Summary Report Graph",
          "axisLabelDistance": -50,
          "showMaxMin": false,
          "rotateLabels": -30
        },
        "yAxis": {
          "axisLabel": "Leads",
          "axisLabelDistance": -20
        },
        "legend": {
          "margin": {
            "top": 5,
            "right": 3,
            "bottom": 5,
            "left": 15
          },
        },

        "reduceXTicks": false
      }
    };

    $scope.flatSummaryBarChart = {
      "chart": {
        "type": "multiBarChart",
        "height": 450,
        "margin": {
          "top": 100,
          "right": 20,
          "bottom": 145,
          "left": 45
        },
        "clipEdge": true,
        "duration": 500,
        "grouped": true,
        "sortDescending": false,
        "xAxis": {
          "axisLabel": "Flat Range",
          "axisLabelDistance": -50,
          "showMaxMin": false,
          "rotateLabels": -30
        },
        "yAxis": {
          "axisLabel": "Leads",
          "axisLabelDistance": -20,
        },
        "legend": {
          "margin": {
            "top": 5,
            "right": 3,
            "bottom": 5,
            "left": 15
          },
        },

        "reduceXTicks": false
      }
    };

    /** Sort funtionality */

    $scope.toggle_sort_data = {};

    $scope.sortData = function (keyName, id) {
      let selectMenu = $scope.sortMenu.filter(row => id == row.id)[0];

      if (keyName && selectMenu.name && selectMenu.type && selectMenu.order) {
        var data = angular.copy($scope[keyName]);

        var new_data = {};

        for (var i in data) {
          if (data[i].key == selectMenu.type) {
            new_data = data[i];
          }
        }

        new_data.values.sort(function (a, b) {
          return a.y - b.y;
        });

        if (selectMenu.order == "DESC") {
          new_data.values.reverse();
        }

        $scope.toggle_sort_data[keyName] = [new_data];
      }
      else {
        delete $scope.toggle_sort_data[keyName];
      }
    }
    /** /Sort funtionality */


    $scope.arrowIcon = 0;
    $scope.showLeads = function (row, supplier_id) {
      $scope.supp_id = supplier_id;
      if ($scope.id == row) {
        $scope.id = "";
        $scope.arrowIcon = 0;
      }
      else if ($scope.id != row) {
        $scope.id = row;
        $scope.arrowIcon = 1;
        B2BDashboardService.showLeads(supplier_id)
          .then(function onSuccess(response) {
            $scope.supplier_leads = response.data.data.lead;
          })

      }
    }

    $scope.icon = 0;
    $scope.showSubLeadDetail = function (row, supplier_id) {
      $scope.supp_id = supplier_id;
      if ($scope.id == row) {
        $scope.id = "";
        $scope.icon = 0;
      }
      else if ($scope.id != row) {
        $scope.id = row;
        $scope.icon = 1;
        B2BDashboardService.showSubLeadDetail($scope.campaignId, $scope.selectedSupplierType.code, $scope.page, supplier_id)
          .then(function onSuccess(response) {
            $scope.detail_supplier_leads = response.data.data.lead;
          })
      }
    }
    $scope.updatingIndex = -1;
    $scope.originalData = null;
    $scope.changeEditDisable = function (index) {
      $scope.createFieldList[index].isEditing = true;
      if ($scope.updatingIndex !== -1) {
        $scope.createFieldList[$scope.updatingIndex] = angular.copy($scope.originalData);
        $scope.createFieldList[$scope.updatingIndex].isEditing = false;
      }
      $scope.updatingIndex = index;
      $scope.originalData = angular.copy($scope.createFieldList[index]);
    }
    $scope.statusId = function (id) {
      $scope.statusId = id;
    }
    $scope.onUpdate = function (index, data) {
      let dataObj = {};
      let param = data.param.toString();
      dataObj.param = param.split(',');
      dataObj.campaign_id = data.campaign_id;
      dataObj.field_name = data.field_name;
      dataObj.alias_name = data.alias_name;
      dataObj.type_of_fields = data.g_templateType;
      dataObj.comment = data.comment;
      dataObj.send_triger = data.send_trigger;
      dataObj.md_id = data.md_id;
      dataObj.data = data.data;
      dataObj.buttonOne = $scope.updateButton.one;
      dataObj.buttonTwo = $scope.updateButton.two;
      dataObj.buttonThree = $scope.updateButton.three;
      dataObj.status_id = $scope.statusId;
      $scope.createFieldList[index].isEditing = false;
      $scope.updatingIndex = -1;
      $scope.originalData = null;
      let datalist = {};
      datalist.data = dataObj;
      swal({
        title: 'Are you sure ?',
        text: 'Update Template',
        type: constants.warning,
        showCancelButton: true,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Yes, Update!",
        closeOnConfirm: false,
        closeOnCancel: true
      },
        function (confirm) {
          if (confirm) {
            B2BDashboardService.UpdatedCreateField(datalist)
              .then(function onSuccess(response) {
                console.log(response.data.data);
                swal('Updated', response.data.data)
                $scope.listOfCreateField($scope.campaign_id);
              }).catch(function onError(response) {
                console.log(response);
              });
          }
        })
    }
    $scope.removeSingleField = function (id, index) {
      swal({
        title: 'Are you sure ?',
        text: 'Remove Requirement',
        type: constants.warning,
        showCancelButton: true,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Yes, Remove!",
        closeOnConfirm: false,
        closeOnCancel: true
      },
        function (confirm) {
          if (confirm) {
            B2BDashboardService.removeSingleField(id)
              .then(function onSuccess(response) {
                $scope.createFieldList.splice(index, 1);
                swal('Remove', 'Successfully');
                // $scope.listOfCreateField($scope.campaign_id);
              })
          }
        }
      )
    }

    $scope.filterComment = function (type) {
      B2BDashboardService.viewCommentsDetails($scope.id_detail, $scope.req_id_detail, type)
        .then(function onSuccess(response) {
          $scope.externalComment = response.data.data;
        })
    }

    $scope.changeAcceptanceStartDate = function () {
      $scope.AcceptanceDateRange.start_date = $scope.AcceptanceDateRange.start_dates;
      $scope.AcceptanceOptions.minDate = $scope.AcceptanceDateRange.start_date;
      $scope.AcceptanceStartDate = $scope.dateFormat($scope.AcceptanceDateRange.start_date);
      if ($scope.AcceptanceEndDate != "") {
        if ($scope.AcceptanceEndDate >= $scope.AcceptanceStartDate) {
          $scope.getPurchasedNotPurchasedLead($scope.campaignId, $scope.campaignName, $scope.leadPurchasedStatus, 0, $scope.startDate, $scope.endDate, $scope.AcceptanceStartDate, $scope.AcceptanceEndDate, $scope.UpdateStartDate, $scope.UpdateEndDate, $scope.selectCity, $scope.selectedClientStatus, undefined);
        }
        else if ($scope.AcceptanceEndDate < $scope.AcceptanceStartDate) {
          $scope.AcceptanceEndDate = $scope.AcceptanceStartDate;
          $scope.AcceptanceDateRange.end_dates = $scope.AcceptanceDateRange.start_date;
          $scope.getPurchasedNotPurchasedLead($scope.campaignId, $scope.campaignName, $scope.leadPurchasedStatus, 0, $scope.startDate, $scope.endDate, $scope.AcceptanceStartDate, $scope.AcceptanceEndDate, $scope.UpdateStartDate, $scope.UpdateEndDate, $scope.selectCity, $scope.selectedClientStatus, undefined);
        }
      }
    }

    $scope.changeAcceptanceEndDate = function () {
      if ($scope.changeAcceptanceEndDate > $scope.changeAcceptanceStartDate)
        $scope.AcceptanceDateRange.end_date = $scope.AcceptanceDateRange.end_dates;
      $scope.AcceptanceEndDate = $scope.dateFormat($scope.AcceptanceDateRange.end_dates);
      $scope.getPurchasedNotPurchasedLead($scope.campaignId, $scope.campaignName, $scope.leadPurchasedStatus, 0, $scope.startDate, $scope.endDate, $scope.AcceptanceStartDate, $scope.AcceptanceEndDate, $scope.UpdateStartDate, $scope.UpdateEndDate, $scope.selectCity, $scope.selectedClientStatus, undefined);
    }


    $scope.changeUpdateStartDate = function () {
      $scope.UpdateDateRangeModel.start_date = $scope.UpdateDateRangeModel.start_dates;
      $scope.UpdateOptions.minDate = $scope.UpdateDateRangeModel.start_date;
      $scope.UpdateStartDate = $scope.dateFormat($scope.UpdateDateRangeModel.start_date);
      if ($scope.UpdateEndDate != "") {
        if ($scope.UpdateEndDate >= $scope.UpdateStartDate) {
          $scope.getPurchasedNotPurchasedLead($scope.campaignId, $scope.campaignName, $scope.leadPurchasedStatus, 0, $scope.startDate, $scope.endDate, $scope.AcceptanceStartDate, $scope.AcceptanceEndDate, $scope.UpdateStartDate, $scope.UpdateEndDate, $scope.selectCity, $scope.selectedClientStatus, undefined);
        }
        else if ($scope.UpdateEndDate < $scope.UpdateStartDate) {
          $scope.UpdateEndDate = $scope.UpdateStartDate;
          $scope.UpdateDateRangeModel.end_dates = $scope.UpdateDateRangeModel.start_date;
          $scope.getPurchasedNotPurchasedLead($scope.campaignId, $scope.campaignName, $scope.leadPurchasedStatus, 0, $scope.startDate, $scope.endDate, $scope.AcceptanceStartDate, $scope.AcceptanceEndDate, $scope.UpdateStartDate, $scope.UpdateEndDate, $scope.selectCity, $scope.selectedClientStatus, undefined);
        }
      }
    }

    $scope.changeUpdateEndDate = function () {
      if ($scope.changeUpdateEndDate > $scope.changeUpdateStartDate)
        $scope.UpdateDateRangeModel.end_date = $scope.UpdateDateRangeModel.end_dates;
      $scope.UpdateEndDate = $scope.dateFormat($scope.UpdateDateRangeModel.end_dates);
      $scope.getPurchasedNotPurchasedLead($scope.campaignId, $scope.campaignName, $scope.leadPurchasedStatus, 0, $scope.startDate, $scope.endDate, $scope.AcceptanceStartDate, $scope.AcceptanceEndDate, $scope.UpdateStartDate, $scope.UpdateEndDate, $scope.selectCity, $scope.selectedClientStatus, undefined);
    }

    $scope.searchPrimaryCount = function (primarySearch) {
      $scope.getPurchasedNotPurchasedLead($scope.campaignId, $scope.campaignName, $scope.leadPurchasedStatus, 0, $scope.startDate, $scope.endDate, $scope.AcceptanceStartDate, $scope.AcceptanceEndDate, $scope.UpdateStartDate, $scope.UpdateEndDate, $scope.selectCity, $scope.selectedClientStatus, undefined);
    }

    $scope.selectedClientSatusFilter = function () {
      let data = [];
      $scope.CheckForSelectedStatus = false;
      for (let i in $scope.selected_clientStatus) {
        data.push($scope.selected_clientStatus[i].label)
      }

      if ($scope.listClientStatus.length == data.length) {
        $scope.selectedClientStatus = null;
        $scope.CheckForSelectedStatus = true;
      }
      else {
        $scope.selectedClientStatus = data.toString();
      }
      $scope.getPurchasedNotPurchasedLead($scope.campaignId, $scope.campaignName, $scope.leadPurchasedStatus, 0, $scope.startDate, $scope.endDate, $scope.AcceptanceStartDate, $scope.AcceptanceEndDate, $scope.UpdateStartDate, $scope.UpdateEndDate, $scope.selectCity, $scope.selectedClientStatus);
    }

    $scope.getCityList = function (campaign_id) {
      B2BDashboardService.getCityList(campaign_id)
        .then(function onSuccess(response) {
          $scope.cityListDetails = response.data.data;
        }).catch(function onError(response) {
          console.log(response);
        });
    }

    $scope.selectedCityFilter = function () {
      $scope.CheckForAllSelectedCity = false;
      let array = [];
      for (let i in $scope.selected_cities_list) {
        array.push($scope.selected_cities_list[i].label);
      }
      if ($scope.cityListDetails.length == array.length) {
        $scope.selectCity = null;
        $scope.CheckForAllSelectedCity = true;
      }
      else {
        $scope.selectCity = array.toString();
      }
      $scope.getPurchasedNotPurchasedLead($scope.campaignId, $scope.campaignName, $scope.leadPurchasedStatus, 0, $scope.startDate, $scope.endDate, $scope.AcceptanceStartDate, $scope.AcceptanceEndDate, $scope.UpdateStartDate, $scope.UpdateEndDate, $scope.selectCity, $scope.selectedClientStatus);
    }

    $scope.downloadLeadsByFilter = function () {
      if (!$scope.primaryCount.start) {
        $scope.primaryCount.start = "";
      }
      if (!$scope.primaryCount.end) {
        $scope.primaryCount.end = "";
      }
      if (!$scope.startDate || $scope.startDate == 'NaN-NaN-NaN') {
        $scope.startDate = "";
      }
      if (!$scope.endDate || $scope.endDate == 'NaN-NaN-NaN') {
        $scope.endDate = "";
      }
      if (!$scope.AcceptanceStartDate || $scope.AcceptanceStartDate == 'NaN-NaN-NaN') {
        $scope.AcceptanceStartDate = "";
      }
      if (!$scope.AcceptanceEndDate || $scope.AcceptanceEndDate == 'NaN-NaN-NaN') {
        $scope.AcceptanceEndDate = "";
      }
      if (!$scope.UpdateStartDate || $scope.UpdateStartDate == 'NaN-NaN-NaN') {
        $scope.UpdateStartDate = "";
      }
      if (!$scope.UpdateEndDate || $scope.UpdateEndDate == 'NaN-NaN-NaN') {
        $scope.UpdateEndDate = "";
      }
      if (!$scope.selectCity) {
        $scope.selectCity = "";
      }
      if (!$scope.selectedClientStatus) {
        $scope.selectedClientStatus = "";
      }
      if (!$scope.primaryCount.start) {
        $scope.primaryCount.start = "";
      }
      if (!$scope.primaryCount.end) {
        $scope.primaryCount.end = "";
      }
      let url = $scope.APIBaseUrl + "v0/ui/b2b/download-leads-summary/?lead_type=" + $scope.filterType + "&supplier_code=all&campaign_id=" + $scope.campaign +
        "&start_date=" + $scope.startDate + "&end_date=" + $scope.endDate +
        "&start_acceptance_date=" + $scope.AcceptanceStartDate + "&end_acceptance_date=" + $scope.AcceptanceEndDate +
        "&start_update_date=" + $scope.UpdateStartDate + "&end_update_date=" + $scope.UpdateEndDate +
        "&city=" + $scope.selectCity + "&client_status=" + $scope.selectedClientStatus +
        "&from_primary_count=" + $scope.primaryCount.start + "&to_primary_count=" + $scope.primaryCount.end;
      window.open(url, '_blank');
    }

    $scope.EmailLeadsByFilter = function () {
      $scope.checkForEmailModal = false;
      $('#sendEmailModal').modal('show');
    }

    var sendEmailByFilter = function (email) {
      let tabname = "";
      let supplier_code = "all"
      if (!$scope.primaryCount.start) {
        $scope.primaryCount.start = "";
      }
      if (!$scope.primaryCount.end) {
        $scope.primaryCount.end = "";
      }
      if (!$scope.startDate || $scope.startDate == 'NaN-NaN-NaN') {
        $scope.startDate = "";
      }
      if (!$scope.endDate || $scope.endDate == 'NaN-NaN-NaN') {
        $scope.endDate = "";
      }
      if (!$scope.AcceptanceStartDate || $scope.AcceptanceStartDate == 'NaN-NaN-NaN') {
        $scope.AcceptanceStartDate = "";
      }
      if (!$scope.AcceptanceEndDate || $scope.AcceptanceEndDate == 'NaN-NaN-NaN') {
        $scope.AcceptanceEndDate = "";
      }
      if (!$scope.UpdateStartDate || $scope.UpdateStartDate == 'NaN-NaN-NaN') {
        $scope.UpdateStartDate = "";
      }
      if (!$scope.UpdateEndDate || $scope.UpdateEndDate == 'NaN-NaN-NaN') {
        $scope.UpdateEndDate = "";
      }
      if (!$scope.selectCity) {
        $scope.selectCity = "";
      }
      if (!$scope.selectedClientStatus) {
        $scope.selectedClientStatus = "";
      }
      if (!$scope.primaryCount.start) {
        $scope.primaryCount.start = "";
      }
      if (!$scope.primaryCount.end) {
        $scope.primaryCount.end = "";
      }
      B2BDashboardService.sendBookingEmailsByFilter($scope.filterType, supplier_code, $scope.campaign, email, tabname,
        $scope.startDate, $scope.endDate, $scope.AcceptanceStartDate, $scope.AcceptanceEndDate,
        $scope.UpdateStartDate, $scope.UpdateEndDate, $scope.selectCity, $scope.selectedClientStatus,
        $scope.primaryCount.start, $scope.primaryCount.end)
        .then(function onSuccess(response) {
          if (response.data.status && response.data.data) {
            $scope.emailModel = {};
            swal(constants.name, "Email Sent Sucessfully", constants.success);
          }
        })
        .catch(function onError(response) {
          swal(constants.name, "Error", constants.error);
        });
    }
    $scope.toggleClassFilter = false;
    $scope.toggleFilterClass = function () {
      $scope.toggleClassFilter = $scope.toggleClassFilter ? false : true;
    }
    $scope.refeshFilters = function () {
      $scope.selected_cities_list = [];
      $scope.selected_clientStatus = [];
      $scope.startDate = "";
      $scope.endDate = "";
      $scope.submittedDateOptions = {
        maxDate: new Date(),
      };
      $scope.dateRangeModel = {};
      $scope.selectCity = "";

      $scope.AcceptanceDateRange = {};
      $scope.AcceptanceStartDate = "";
      $scope.AcceptanceEndDate = "";
      $scope.AcceptanceOptions = {
        maxDate: new Date(),
      };

      $scope.UpdateDateRangeModel = {};
      $scope.UpdateStartDate = "";
      $scope.UpdateEndDate = "";
      $scope.UpdateOptions = {
        maxDate: new Date(),
      };

      $scope.purchasedTable = false;
      $scope.notPurchasedTable = false;
      $scope.selected_clientStatus = [];
      $scope.primaryCount = { "start": '', "end": '' };
      $scope.getPurchasedNotPurchasedLead($scope.campaignId, $scope.campaignName);
    }

    $scope.getImagesUrl = function (data) {
      data.supplier_type = 'RS';
      AuthService.getSocietyImageList(data)
        .then(function onSuccess(response) {
          $scope.imageUrlList = response.data.data;
          if($scope.imageUrlList.length > 0){
            $('#imageModal').modal('show');
          }
          else{
            $('#imageModal').modal('hide');
            swal(constants.name, constants.image_empty, constants.warning);
          }
        })
        .catch(function onError(response) {
          swal(constants.name,constants.errorMsg, constants.error);
        });
    }

  })
})();
app.factory('Excel', function ($window) {
  var uri = 'data:application/vnd.ms-excel;base64,',
    template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
    base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
    format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
  return {
    tableToExcel: function (tableId, worksheetName) {
      var table = $(tableId),
        ctx = { worksheet: worksheetName, table: table.html() },
        href = uri + base64(format(template, ctx));
      return href;
    }
  };
})
