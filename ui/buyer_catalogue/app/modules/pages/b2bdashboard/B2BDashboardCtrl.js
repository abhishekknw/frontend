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
  }).controller('B2BDashboardCtrl', function ($scope, NgMap, $rootScope, baConfig, colorHelper, DashboardService, B2BDashboardService, commonDataShare, constants, $location, $anchorScroll, uiGmapGoogleMapApi, uiGmapIsReady, Upload, cfpLoadingBar, $stateParams, $timeout, Excel, permissions, $window) {

    $scope.campaign_id = $stateParams.proposal_id;

    $scope.passwordError = constants.password_error;
    $scope.userInfo = $rootScope.globals.userInfo;

    // $scope.supplierTypeCode = constants.supplierTypeCode;
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
    $scope.dateRangeModel = {};

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



    //lead code start here
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

    $scope.purchasedTable = false;
    $scope.notPurchasedTable = false;
    $scope.listClientStatus=[];
    $scope.viewCampaignLeads = function () {
      if($scope.listClientStatus.length==0){
        B2BDashboardService.listClientStatus().then(function onSuccess(response) {
          var listData  = response.data.data.client_status;
          for(var k in listData){
            $scope.listClientStatus.push(listData[k].status_name)
          }
        });
      }
      $scope.purchasedTable = false;
      $scope.notPurchasedTable = false;
      B2BDashboardService.viewCampaignLeads($scope.filterType, $scope.selectedSupplierType.code)
        // B2BDashboardService.viewCampaignLeads()
        .then(function onSuccess(response) {
          if(response.data.data){
            $scope.leadsDataCampaigns = response.data.data;
          }
          
        });
    }

    $scope.getPurchasedLead = function (CampaignId, campaignName) {
      $scope.purchasedTable = true;
      $scope.notPurchasedTable = false;
      $scope.CampaignNameofLeads = campaignName;
      B2BDashboardService.getPurchasedLead(CampaignId)
        .then(function onSuccess(response) {
          $scope.purchasedLeadData = response.data.data;
        });
    }

    $scope.selectFlag=true;
    $scope.clientStatus="";
    $scope.clientComment="";
    $scope.setValue = function (value) {
      $scope.clientStatus=value;
      $scope.selectFlag=false;
    }
    $scope.valuechange=function(value1){
      $scope.clientComment=value1;
    }
    
    $scope.updateLeadClientStatus = function (status,comment,id) {
      if($scope.clientStatus==""){
        $scope.clientStatus=status;
      }
      if($scope.clientComment==""){
        $scope.clientComment=comment;
      }
      B2BDashboardService.updateLeadClientStatus( $scope.clientStatus, $scope.clientComment,id)
        .then(function onSuccess(response) {
          swal(constants.name, response.data.data, constants.success);
          $scope.clientStatus="";
          $scope.clientComment="";
        });
    }

    $scope.updateClientStatus = function (clentId,id,status,comment,type) {
      if($scope.clientStatus==""){
        $scope.clientStatus=status;
      }
      if($scope.clientComment==""){
        $scope.clientComment=comment;
      }
      B2BDashboardService.updateClientStatus(clentId, $scope.clientStatus, $scope.clientComment,id)
        .then(function onSuccess(response) {
          swal(constants.name, response.data.data, constants.success);
          $scope.clientStatus="";
          $scope.clientComment="";
          if(type!='Lead'){
            $scope.leadDecisionPanding($scope.currentTypeForLeadDecisionPanding,$scope.currentPageForLeadDecisionPanding);
          }          
        });
    }

    $scope.clientStatusList = function (data) {      
      B2BDashboardService.clientStatusList(data)
        .then(function onSuccess(response) {
          var list = response.data.data.client_status;           
          for (var k in list){
            for(var i in  list[k]){
              $scope.clientStausListData.push(list[k][i]);              
            }
          }            
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

    $scope.pageChangedPurchage= function(page,leadPurchasedStatus,campaignId,campaignName){
      $scope.getPurchasedNotPurchasedLead(campaignId, campaignName, leadPurchasedStatus, page)
    }

    $scope.getPurchasedNotPurchasedLead = function (CampaignId, campaignName, leadStatus,page) {
      if(!page){
        page=0;
      }
      $scope.leadPurchasedStatus = leadStatus;
      $scope.campaignId = CampaignId;
      $scope.campaignName = campaignName;
      $scope.CampaignNameofLeads = campaignName;
      B2BDashboardService.purchasedNotPurchasedLead(CampaignId, $scope.filterType,$scope.selectedSupplierType.code,page)
        .then(function onSuccess(response) {
          $scope.isTableHide = false;
          $scope.purchasedNotPurchasedLead = response.data.data;
          $scope.purchasedNotPurchasedLeadTotal = response.data.data.length;
          $scope.purchasedNotPurchasedLeadCurrent = page;
          $scope.purchasedNotPurchasedLeadPerPage = 20;
          // $scope.all_values = [];
          // for (let i in values) {
          //     let row = {};
          //     for (let t in values[i]) {
          //       if(t != 0 ){
          //         row[values[i][t].key_name] = values[i][t].value;
          //       } else {               
          //         $scope.lead_purchased = values[i][t].lead_purchased;
          //       }
          //     }
          //     $scope.all_values.push(row);
          // }
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
      }
      else if(value=='sync'){
        $scope.decisionPendingTab = false;
        setTimeout(()=>{                          
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

    $scope.loadedData=true;
    $scope.pageChanged = function(newPage) {
      if($scope.loadedData==true){
        $scope.leadDecisionPanding('all',newPage);  
      }
    };

    $scope.currentPageForLeadDecisionPanding=0;
    $scope.currentTypeForLeadDecisionPanding="";
    $scope.clientStausListData=[];
    $scope.leadDecisionPanding = function (value,page) {
      if (!value) {
        value = 'all'
      }
      $scope.currentTypeForLeadDecisionPanding=value;
      if(!page){
        page=0;
      }
      $scope.currentPageForLeadDecisionPanding=page;
      if($scope.clientStausListData.length==0){
        $scope.clientStatusList();
      }
      B2BDashboardService.leadDecisionPanding(value,page)
        .then(function onSuccess(response) {
          $scope.leadDecisionPandingData = response.data.data.lead;
          $scope.totalrecord = response.data.data.length;
          $scope.itemsPerPageRecord = 20;
          $scope.currentPage = page; 
          
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
    
    $scope.acceptDeclineDecisionPanding = function (index, value) {
      let data = [{
        "requirement_id": $scope.leadDecisionPandingData[index].requirement_id,
        "client_status": value
      }]
      B2BDashboardService.acceptDeclineDecisionPanding({ 'data': data })
        .then(function onSuccess(response) {
          if (response) {
            if(value == "Decline"){
              $scope.leadDecisionPandingData[index].client_status = "Decline";
            }
            else{
              $scope.leadDecisionPandingData.splice(index, 1);
            }
            
            if(value == 'Decline'){
              value = 'Declined';
            }
            swal(constants.name, value + " Successfully", constants.success);
          }
        });
    }

    $scope.acceptDeclineMultiple = function (value) {
      let data = [];
      for (let i in $scope.leadDecisionPandingData) {
        if ($scope.leadDecisionPandingData[i].checkStatus) {
          data.push({
            "requirement_id": $scope.leadDecisionPandingData[i].requirement_id,
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
                  //$scope.leadDecisionPandingData.splice(i, 1);
                }
              }
              $scope.leadDecisionPandingData = lead_Decision;
              if(value == 'Decline'){
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
            // icon: 'http://www.googlemapsmarkers.com/v1/009900/',
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

        //if (supplier && supplier.supplier && supplier.supplier.supplier_id) {
        // if (supplier.supplier.campaignStatus) {
        //   var icon = 'http://maps.google.com/mapfiles/ms/icons/';

        //   if (supplier.supplier.campaignStatus == 'completed') {
        //     icon = icon + 'green-dot.png'
        //   }
        //   if (supplier.supplier.campaignStatus == 'upcoming') {
        //     icon = icon + 'orange-dot.png'
        //   }
        //   if (supplier.supplier.campaignStatus == 'ongoing') {
        //     icon = icon + 'blue-dot.png'
        //   }
        // }
        $scope.map = { zoom: 10, bounds: {}, center: { latitude: supplier.supplier_data.latitude, longitude: supplier.supplier_data.longitude, } };

        markers.push({
          latitude: supplier.supplier_data.latitude,
          longitude: supplier.supplier_data.longitude,
          id: supplier.supplier_data.supplier_id,
          icon: icon,
          options: { draggable: false },
          dataofSupplierAndInvData: supplier.supplier_data,
          // completedLeadsSupplierData: supplier.leads_data,
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
     $scope.aa = 'Leads';
     $scope.supplierType = 'Leads';
    $scope.surveyLeadArray = ['Leads'];
    
    $scope.surveyLeadFilter = function (filter) {
      if(filter == 'Leads' || filter == 'Survey'){
        $scope.filterType = filter;
        $scope.isTableHide = true;
        $scope.viewCampaignLeads();
      }
      

    }

    $scope.surveyLeadFilter('Leads');
    $scope.setButtonIndex = function (index,campaign_id,campaign_name) {
      $scope.buttonIndex = index;
      $scope.getPurchasedNotPurchasedLead(campaign_id,campaign_name) 
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

      B2BDashboardService.getSummaryReport(campaign.proposal_id, start_date, end_date).then(function onSuccess(response) {
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
