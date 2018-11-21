/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

  angular.module('catalogueApp')
      .controller('DashboardCtrl',function($scope,NgMap, $rootScope, baConfig, colorHelper,DashboardService, commonDataShare, constants,$location,$anchorScroll,uiGmapGoogleMapApi,uiGmapIsReady,Upload,cfpLoadingBar,$stateParams) {
 $scope.itemsByPage=15;
 $scope.campaign_id = $stateParams.proposal_id;
 $scope.query = "";
 $scope.oneAtATime = true;
 $scope.bookingStatusSuppliers = constants.booking_status;
 $scope.showCampaigns = true;
 $scope.rowCollection = [];
 $scope.userIcon = "icons/usericon.png";
 $scope.passwordError = constants.password_error;
 $scope.userInfo = $rootScope.globals.userInfo;
 $scope.dateRangeModel = {};
 console.log($scope.userInfo);
 $scope.invNameToCode = {
   'POSTER' : 'PO',
   'STALL' : 'SL',
   'STANDEE' : 'ST',
   'FLIER' : 'FL',
   'GATEWAY ARCH' : 'GA'
 };
 $scope.queryType = {
   'Locality' : 'Locality',
   'date' : 'Date',
    };
        $scope.invKeys = [
          {header : 'POSTER'},
          {header : 'STANDEE'},
          {header : 'STALL'},
          {header : 'FLIER'},
          {header : 'GATEWAY ARCH'},
        ];
        $scope.invCodes = {
          PO : 'PO',
          ST : 'ST',
          SL : 'SL',
          FL : 'FL',
          GA : 'GA'
        };
        $scope.actKeys = [
          {header : 'RELEASE', key : 'release', label1 : 'Released', label2 : 'UnReleased'},
          // {header : 'AUDIT', key : 'audit', label1 : 'Audited', label2 : 'UnAudited'},
          // {header : 'CLOSURE', key : 'closure', label1 : 'Closed', label2 : 'UnClosed' },
        ];


        $scope.supHeaders = [
          {header : 'Campaign Name', key : 'proposal_name'},
          {header : 'Inventory', key : 'supplier_name'},
          {header : 'Total Assigned', key : 'assigned'},
          {header : 'Today Released', key : 'inv_type'},
          {header : 'Average Delay(In Hours)', key : 'act_name'},
          {header : 'Average Off Location(Meters)', key : 'act_name'},
          {header : 'Images', key : 'images'},
        ];
        $scope.campaignStatus = {
          ongoing : {
            status : 'ongoing', value : false, campaignLabel : 'Ongoing Campaigns', supplierLabel : 'Ongoing Societies'
          },
          completed : {
            status : 'completed', value : false, campaignLabel : 'Completed Campaigns', supplierLabel : 'Completed Societies'
          },
          upcoming : {
            status : 'upcoming', value : false, campaignLabel : 'Upcoming Campaigns', supplierLabel : 'Upcoming Societies'
          },
          onhold : {
            status : 'onhold', value : false, campaignLabel : 'On Hold Campaigns', supplierLabel : 'On Hold Societies'
          },
          compare_campaigns : {
            status : 'compare_campaigns', value : false, campaignLabel : 'Compare Campaigns', supplierLabel : 'Compare Societies'
          },
        };
        $scope.charts = {
          pie : { name : 'Pie Chart', value : 'pie' },
          doughnut : { name : 'Doughnut Chart', value : 'doughnut' },

        };
        $scope.LeadsHeader = [
          {header : 'Ongoing'},
          {header : 'Completed'},

        ];
        $scope.perfLeads = {
          all : 'all',
          invleads : 'invleads',
        };
        $scope.showPerfLeads = false;

        $scope.perfMetrics = {
          inv : 'inv',
          ontime : 'onTime',
          location : 'onLocation',
          leads : 'leads',
          multipleLeads : 'multipleLeads',
          blank : 'blank'
        };
        $scope.showPerfMetrics = false;

       $scope.perfPanel = {
          all : 'all',
          respective : 'respective'
          };
        $scope.showPerfPanel = false;
        $scope.inventories = constants.inventories;
        $scope.campaignStatusLabels = [$scope.campaignStatus.ongoing.name,$scope.campaignStatus.completed.name, $scope.campaignStatus.upcoming.name];
        $scope.pieChartDefaulOptions = { legend: { display: true, position: 'right',padding: '10px' } };
        $scope.getCampaignsMenu = function(status){
          $scope.campaignStatus.ongoing.value = false;
          $scope.campaignStatus.completed.value = false;
          $scope.campaignStatus.upcoming.value = false;
          $scope.campaignStatus.onhold.value = false;
          $scope.campaignStatus.compare_campaigns.value = false;
          $scope.campaignStatus[status].value = !$scope.campaignStatus[status].value;
        }

        var campaignDataStruct = {
          id : '',
          supplier_id : '',
          proposal_name : '',
          inv_id : '',
          inv_type : '',
          images : [],
          act_name : '',
          act_date : '',
          reAssign_date : '',
        };

        var category = $rootScope.globals.userInfo.profile.organisation.category;
        var orgId = $rootScope.globals.userInfo.profile.organisation.organisation_id;
        $scope.campaignDataList = [];
        var getAllCampaignsData = function(){
          DashboardService.getAllCampaignsData(orgId, category)
          .then(function onSuccess(response){
            console.log(response);
            $scope.count = 0;
            $scope.invActDateList = [];
            $scope.inventoryActivityCountData = response.data.data;
            angular.forEach(response.data.data, function(data,key){
              $scope.isPanelOpen = !$scope.isPanelOpen;
              $scope.inventoryActivityCountData[key] = sortObject(data);
              $scope.invActDateList = $scope.invActDateList.concat(Object.keys($scope.inventoryActivityCountData[key]));
            })
            $scope.invActDateList = Array.from(new Set($scope.invActDateList));
            $scope.invActDateList.sort().reverse();
            $scope.dateListKeys = {};
            angular.forEach($scope.invActDateList, function(date){
              $scope.dateListKeys[date] = date;
            })
            getHistory(response.data.data);
            $scope.loading = response.data.data;
          }).catch(function onError(response){
            console.log(response);
          })
        }

        var loadData = function(){
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
        $scope.getDate = function(day){
          $scope.dateWiseSuppliers = [];

          $scope.showAssignedInvTable = false;
          $scope.OntimeOnlocation.ontime.value = false;
          $scope.OntimeOnlocation.onlocation.value = false;
          $scope.date = new Date($scope.date);
          $scope.date.setDate($scope.date.getDate() + day);
          $scope.date = commonDataShare.formatDate($scope.date);
        }
        $scope.getRecentActivity = function(day){
          $scope.dateWiseSuppliers = [];
          $scope.isPanelOpen =!$scope.isPanelOpen;
          $scope.showAssignedInvTable = false;
          $scope.OntimeOnlocation.ontime.value = false;
          $scope.OntimeOnlocation.onlocation.value = false;
          var initialDate = $scope.date;
          var date = new Date($scope.date);
          var counter = 100000;
          date.setDate(date.getDate() + day);
          date = commonDataShare.formatDate(date);

          while($scope.dateListKeys[date] != date){
            date = new Date(date);
            date.setDate(date.getDate() + day);
            date = commonDataShare.formatDate(date);
            counter--;
            if(counter < 0){
              alert("No Activity");
              break;
            }
          }
          if(counter < 0)
            $scope.date = initialDate;
          else
            $scope.date = date;
        }

        $scope.getPercent = function(num1,num2){
          var percent = num1/num2*100;
          return percent;
        }

        $scope.getAssignedIdsAndImages = function(date,type,inventory){
          cfpLoadingBar.start();
          $scope.dateWiseSuppliers = [];
          $scope.invName = inventory;
          $scope.actType = type;
          DashboardService.getAssignedIdsAndImages(orgId, category, type, date, inventory)
          .then(function onSuccess(response){
            console.log(response);
            cfpLoadingBar.complete();
            $scope.campaignReleaseData = [];
            var campaignReleaseData = [];

            campaignReleaseData['totalOnTimeCount'] = 0;
            campaignReleaseData['totalOffTimeCount'] = 0;
            campaignReleaseData['totalOnLocationCount'] = 0;
            campaignReleaseData['totalOffLocationCount'] = 0;
            campaignReleaseData['totalOffLocationDistance'] = 0;
            campaignReleaseData['totalOffTimeDays'] = 0;
            campaignReleaseData['totalInvCount'] = 0;

            angular.forEach(response.data.data, function(data,campaignName){
              $scope.campaignData = [];
              var campaignData = {};
              campaignData['name'] = campaignName;
              campaignData['images'] = [];
              campaignData['inv_count'] = 0;
              campaignData['onLocationCount'] = 0;
              campaignData['offLocationCount'] = 0;
              campaignData['onTimeCount'] = 0;
              campaignData['offTimeCount'] = 0;
              campaignData['offTimeDays'] = 0;
              campaignData['offLocationDistance'] = 0;
              campaignData['assigned'] = Object.keys(data.assigned).length;

              if(!campaignData['proposalId']){
                campaignData['proposalId'] = data.assigned[Object.keys(data.assigned)[0]][0].proposal_id;
              }
              if(Object.keys(data.completed).length == 0){
                var days = Math.floor((new Date() - new Date($scope.date)) / (1000 * 60 * 60 * 24));
                campaignData['offTimeDays'] = days * Object.keys(data.assigned).length;
              }else{
                var total = Object.keys(data.assigned).length - Object.keys(data.completed).length;
                var days = Math.floor((new Date() - new Date($scope.date)) / (1000 * 60 * 60 * 24));
                campaignData['offTimeDays'] = total * days;
              }

              angular.forEach(data.completed, function(items,inv){
                campaignData.inv_count += 1;
                campaignData[inv] = {};
                campaignData[inv]['onLocation'] = false;
                campaignData[inv]['onTime'] = false;
                // campaignData[inv]['minDistance'] = 100;
                campaignData[inv]['dayCount'] = undefined;

                  for(var i=0; i<items.length; i++){
                    campaignData['proposalId'] = items[i].proposal_id;
                    if(items[i].hasOwnProperty('distance') && items[i].distance <= constants.distanceLimit){
                      campaignData[inv]['onLocation'] = true;
                      campaignData[inv]['minDistance'] = items[i].distance;
                      break;
                    }
                    else if(items[i].hasOwnProperty('distance')){
                      if(!campaignData[inv].hasOwnProperty('minDistance') || items[i].distance < campaignData[inv]['minDistance']){
                        campaignData[inv]['minDistance'] = items[i].distance;
                      }
                    }
                  }
                  for(var i=0; i<items.length; i++){
                    var days = Math.floor((new Date(items[i].created_at) - new Date(items[i].actual_activity_date)) / (1000 * 60 * 60 * 24));
                    if(days == 0){
                      campaignData[inv]['onTime'] = true;
                      campaignData[inv]['dayCount'] = 0;
                      break;
                    }else if(campaignData[inv]['dayCount'] && days < campaignData[inv]['dayCount']){
                      if(items[i].latitude)
                        campaignData[inv]['dayCount'] = days;
                      else {
                        campaignData[inv]['dayCount'] = 0;
                      }
                    }else if(!campaignData[inv]['dayCount']){
                      if(items[i].latitude)
                        campaignData[inv]['dayCount'] = days;
                      else {
                        campaignData[inv]['dayCount'] = 0;
                      }

                    }
                  }
                  if(campaignData[inv]['onLocation']){
                    campaignData['onLocationCount'] += 1;
                    if(campaignData[inv]['minDistance'])
                      campaignData['offLocationDistance'] += campaignData[inv]['minDistance'];
                  }
                  else{
                    campaignData['offLocationCount'] += 1;
                    if(campaignData[inv]['minDistance'])
                      campaignData['offLocationDistance'] += campaignData[inv]['minDistance'];
                  }


                  if(campaignData[inv]['onTime'])
                    campaignData['onTimeCount'] += 1;
                  else{
                    campaignData['offTimeCount'] += 1;
                    campaignData['offTimeDays'] += campaignData[inv]['dayCount'];
                  }
                  campaignData['images'].push(items);

              })
              campaignReleaseData['totalOnTimeCount'] += campaignData['onTimeCount'];
              campaignReleaseData['totalOffTimeCount'] += campaignData['offTimeCount'];
              campaignReleaseData['totalOnLocationCount'] += campaignData['onLocationCount'];
              campaignReleaseData['totalOffLocationCount'] += campaignData['offLocationCount'];
              campaignReleaseData['totalOffLocationDistance'] += campaignData['offLocationDistance'];
              campaignReleaseData['totalInvCount'] += campaignData['inv_count'];
              campaignReleaseData['totalOffTimeDays'] += campaignData['offTimeDays'];

              campaignReleaseData.push(campaignData);
            })
            $scope.campaignReleaseData = campaignReleaseData;
            if($scope.campaignReleaseData.length){
                $scope.showAssignedInvTable = true;
            }else{
                $scope.showAssignedInvTable = false;
            }
            $scope.campaignDataList = [];
          }).catch(function onError(response){
            console.log(response);
          })
        }

        $scope.goToExecutionPage = function(images){
          $scope.imageUrlList = [];
          angular.forEach(images, function(imageObjects){
            for(var i=0; i<imageObjects.length; i++){
              var imageData = {
                image_url : 'http://androidtokyo.s3.amazonaws.com/' + imageObjects[i].image_path,
                comment : imageObjects[i].comment,
              };
              $scope.imageUrlList.push(imageData);
            }
          })
        }


        $scope.getCampaigns = function(date){
          cfpLoadingBar.start();
            $scope.showSupplierTypeCountChart = false;
            $scope.selectedBookingCampaignName = undefined;
          if(!date)
            date = new Date();
          date = commonDataShare.formatDate(date);
          date = date + ' 00:00:00';
          $scope.showCampaignGraph = true;
          $scope.campaignLabel = false;
          $scope.showLeadsDetails = false;
          $scope.showDisplayDetailsTable = false;
          $scope.allCampaignsLeadsData = {};
          $scope.viewCampaignLeads(true);
          DashboardService.getCampaigns(orgId, category, date)
          .then(function onSuccess(response){
            console.log(response);
            cfpLoadingBar.complete();
            $scope.searchSelectAllModel = [];
            $scope.showSingleCampaignChart = false;
            $scope.campaignData = response.data.data;
            $scope.mergedarray = [];

            angular.forEach($scope.campaignData, function(data){
              angular.forEach(data,function(campaign){
                  $scope.mergedarray.push(campaign);
              })
            })
            $scope.campaigns = [$scope.campaignData.ongoing_campaigns.length,$scope.campaignData.completed_campaigns.length,$scope.campaignData.upcoming_campaigns.length];
              $scope.campaignChartdata = [
              { label : $scope.campaignStatus.ongoing.campaignLabel, value : $scope.campaignData.ongoing_campaigns.length },
              { label : $scope.campaignStatus.completed.campaignLabel, value : $scope.campaignData.completed_campaigns.length },
              { label : $scope.campaignStatus.upcoming.campaignLabel, value : $scope.campaignData.upcoming_campaigns.length }
            ];
            $scope.options = angular.copy(doughnutChartOptions);
            $scope.options.chart.pie.dispatch['elementClick'] = function(e){ $scope.pieChartClick(e.data.label); };
            $scope.showPerfPanel = $scope.perfPanel.all;
          }).catch(function onError(response){
            console.log(response);
          })
        }


      $scope.pieChartClick = function(label){

        $anchorScroll('bottom');
        $scope.campaignStatusName = label;
        var campaignStatus = _.findKey($scope.campaignStatus, {'campaignLabel' : label});
        // getCountOfSupplierTypesByCampaignStatus(campaignStatus);
      }
       var getCountOfSupplierTypesByCampaignStatus = function(campaignStatus){
         cfpLoadingBar.start();
         DashboardService.getCountOfSupplierTypesByCampaignStatus(campaignStatus)
         .then(function onSuccess(response){
           console.log(response);
           cfpLoadingBar.complete();
           $scope.AllCampaignData = response.data.data;
           $scope.supplierAllCampaignMarkers = assignMarkersToMap($scope.AllCampaignData);
           if(response.data.data){
              $scope.supplierCodeCountData = formatCountData(response.data.data);
              $scope.supplierTypesData = response.data.data;
              $scope.supplierTypesDataList = [];
              angular.forEach($scope.supplierTypesData, function(data){
                $scope.supplierTypesDataList = $scope.supplierTypesDataList.concat(data);

              })
              $scope.supplierCodeCountOptions = angular.copy(doughnutChartOptions);
              $scope.showSupplierTypeCountChart = true;
           }
         }).catch(function onError(response){
           console.log(response);
         })
       }

          $scope.doughnutChartOptions = function(){
               $anchorScroll('bottom');
          }


       var formatCountData = function(data){
         var countData = [];
         angular.forEach(data, function(items,key){
           var temp_data = {
             label : constants[key] + ' Campaigns',
             value : items.length,
             campaigns : items
           }
           countData.push(temp_data);
         })
         return countData;
       }
       var formatSupplierCountData = function(data){
         var countData = [];
         angular.forEach(data, function(item){
           var temp_data = {
             label : constants[item.supplier_code] + ' Count',
             value : item.total,
           }
           countData.push(temp_data);
         })
         return countData;
       }

       var formatLabelData = function(data,label){
         var labelData = [];
         angular.forEach(data, function(item){
           labelData.push(item[label]);
         })
         return labelData;
       }
       $scope.type = $scope.charts.doughnut.value;
       $scope.series = ["Campaigns"];
       $scope.getChart = function(chartType){
         $scope.data = [$scope.campaigns];
         if(chartType == 'doughnut'){
           $scope.options = angular.copy(doughnutChartOptions);
           $scope.options.chart.pie.dispatch['elementClick'] = function(e){
             $scope.pieChartClick(e.data.label);


            };

         }
         if(chartType == 'pie'){
           $scope.options = $scope.pieChartOptions;
         }
         $scope.type = chartType;
       }



       var doughnutChartOptions = {
            chart: {
                type: 'pieChart',
                height: 350,
                top: -30,
                donut: true,
                x: function(d){return d.label;},
                y: function(d){return d.value;},

                showLabels: true,
                labelType : 'value',
                pie: {
                    startAngle: function(d) { return d.startAngle -Math.PI/2 },
                    endAngle: function(d) { return d.endAngle -Math.PI/2 },
                    dispatch : {
                    }
                },
                duration: 500,
                legend: {
                  rightAlign:false,

                },
                legendPosition : 'bottom',
                tooltip: {
              },
              interactive : true
            }
        };

        $scope.pieChartOptions = {
           chart: {
               type: 'pieChart',
               height: 350,
               x: function(d){return d.label;},
               y: function(d){return d.value;},
               showLabels: true,
               labelType : 'value',
               duration: 500,
               labelThreshold: 0.01,
               labelSunbeamLayout: true,
               legend: {
                 rightAlign:false,

               },
               legendPosition : 'bottom',
           }
       };

       $scope.variableoptions = {
         chart: {
               type: 'linePlusBarChart',
               height: 500,
               margin: {
                   top: 30,
                   right: 75,
                   bottom: 50,
                   left: 75
               },
               bars: {
                   forceY: [0]
               },
               bars2: {
                   forceY: [0]
               },
               color: ['#2ca02c', 'darkred'],
               x: function(d,i) { return i; },
                showLabels: true,
               xAxis: {
                   axisLabel: 'X Axis',
                   tickFormat: function(d) {
                   // var label = $scope.formatMultiBarChartDataForSuppliers[0].values[d].x;
                   var label = $scope.values1;
                   return label;
                  }
               },
               x2Axis: {
                   showMaxMin: false

               },
               y1Axis: {
                   axisLabel: 'Y1 Axis',
                   tickFormat: function(d){
                       return d3.format(',f')(d);
                   },
                   axisLabelDistance: 12
               },
               y2Axis: {
                   axisLabel: 'Y2 Axis',
                   tickFormat: function(d) {
                       return 'HQ ' + d3.format(',.2f')(d)
                   }
               },
               y3Axis: {
                   tickFormat: function(d){
                       return d3.format(',f')(d);
                   }
               },
               y4Axis: {
                   tickFormat: function(d) {
                       return '$' + d3.format(',.2f')(d)
                   }
               }
           }
               };

               var societySummaryBarChart = {
                  "chart": {
                    "type": "multiBarChart",
                    "height": 450,
                    // "labelType" : "11",
                    "margin": {
                      "top": 100,
                      "right": 20,
                      "bottom": 145,
                      "left": 45
                    },
                    "clipEdge": true,
                    "duration": 500,
                    "grouped": true,
                    "sortDescending" : false,
                      "xAxis": {
                      "axisLabel": "Society (Flat Count) in Percentage",
                      "showMaxMin": false,
                      "rotateLabels" : -30
                    },
                    "yAxis": {
                      "axisLabel": "Leads in %",
                      "axisLabelDistance": -20,
                      "ticks" : 8
                    },
                    "legend" : {
                            "margin": {
                            "top": 5,
                            "right": 3,
                            "bottom": 5,
                            "left": 15
                        },
                    },

                    "reduceXTicks" : false
                  }
                };

                var stackedBarChart = {
                   "chart": {
                     "type": "multiBarChart",
                     "height": 450,
                     // "labelType" : "11",
                     "margin": {
                       "top": 100,
                       "right": 20,
                       "bottom": 145,
                       "left": 45
                     },
                     "clipEdge": true,
                     "duration": 500,
                     "grouped": true,
                     "sortDescending" : false,
                       "xAxis": {
                       "axisLabel": "campaign (Flat Count) in Percentage",
                       "showMaxMin": false,
                       "rotateLabels" : -30
                     },
                     "yAxis": {
                       "axisLabel": "Leads in %",
                       "axisLabelDistance": -20,

                       "ticks" : 8
                     },
                     "legend" : {
                             "margin": {
                             "top": 5,
                             "right": 3,
                             "bottom": 5,
                             "left": 15
                         },
                     },

                     "reduceXTicks" : false
                   }
                 };

                var dateSummaryBarChart = {
                   "chart": {
                     "type": "multiBarChart",
                     "height": 450,
                     // "labelType" : "11",
                     "margin": {
                       "top": 100,
                       "right": 20,
                       "bottom": 145,
                       "left": 45
                     },
                     "clipEdge": true,
                     "duration": 500,
                     "grouped": true,
                     "sortDescending" : false,
                       "xAxis": {
                       "axisLabel": "Date (Flat Count) in Percentage",
                       "showMaxMin": false,
                       "rotateLabels" : -30
                     },
                     "yAxis": {
                       "axisLabel": "Leads in %",
                       "axisLabelDistance": -20,

                       "ticks" : 8
                     },
                     "legend" : {
                             "margin": {
                             "top": 5,
                             "right": 3,
                             "bottom": 5,
                             "left": 15
                         },
                     },

                     "reduceXTicks" : false
                   }
                 };

       var flatSummaryBarChart = {
          "chart": {
            "type": "multiBarChart",
            "height": 450,
            // "labelType" : "11",
            "margin": {
              "top": 100,
              "right": 20,
              "bottom": 145,
              "left": 45
            },
            "clipEdge": true,
            "duration": 500,
            "grouped": true,
            "sortDescending" : false,
              "xAxis": {
              "axisLabel": "Flat Range (Flat Count) in Percentage",
              "axisLabelDistance" : -50,
              "showMaxMin": false,
              "rotateLabels" : -30
            },
            "yAxis": {
              "axisLabel": "Leads in %",
              "axisLabelDistance": -20,

              "ticks" : 8
            },
            "legend" : {
                    "margin": {
                    "top": 5,
                    "right": 3,
                    "bottom": 5,
                    "left": 15
                },
            },

            "reduceXTicks" : false
          }
        };

        var locationSummaryBarChart = {
           "chart": {
             "type": "multiBarChart",
             "height": 450,
             // "labelType" : "11",
             "margin": {
               "top": 100,
               "right": 20,
               "bottom": 145,
               "left": 45
             },
             "clipEdge": true,
             "duration": 500,
             "grouped": true,
             "sortDescending" : false,
               "xAxis": {
               "axisLabel": "Society Area (Flat Count) in Percentage",
               "showMaxMin": false,
               "rotateLabels" : -30
             },
             "yAxis": {
               "axisLabel": "Leads in %",
               "axisLabelDistance": -20,

               "ticks" : 8
             },
             "legend" : {
                     "margin": {
                     "top": 5,
                     "right": 3,
                     "bottom": 5,
                     "left": 15
                 },
             },

             "reduceXTicks" : false
           }
         };

         var phaseSummaryBarChart = {
            "chart": {
              "type": "multiBarChart",
              "height": 450,
              // "labelType" : "11",
              "margin": {
                "top": 100,
                "right": 20,
                "bottom": 145,
                "left": 45
              },
              "clipEdge": true,
              "duration": 500,
              "grouped": true,
              "sortDescending" : false,
                "xAxis": {
                "axisLabel": "Phases (Flat Count) in Percentage",
                "showMaxMin": false,
                "rotateLabels" : -30
              },
              "yAxis": {
                "axisLabel": "Leads in %",
                "axisLabelDistance": -20,

                "ticks" : 8
              },
              "legend" : {
                      "margin": {
                      "top": 5,
                      "right": 3,
                      "bottom": 5,
                      "left": 15
                  },
              },

              "reduceXTicks" : false
            }
          };

          var citySummaryBarChart = {
             "chart": {
               "type": "multiBarChart",
               "height": 450,
               // "labelType" : "11",
               "margin": {
                 "top": 100,
                 "right": 20,
                 "bottom": 145,
                 "left": 45
               },
               "clipEdge": true,
               "duration": 500,
               "grouped": true,
               "sortDescending" : false,
                 "xAxis": {
                 "axisLabel": "City (Flat Count) in Percentage",
                 "showMaxMin": false,
                 "rotateLabels" : -30
               },
               "yAxis": {
                 "axisLabel": "Leads in %",
                 "axisLabelDistance": -20,

                 "ticks" : 8
               },
               "legend" : {
                       "margin": {
                       "top": 5,
                       "right": 3,
                       "bottom": 5,
                       "left": 15
                   },
               },

               "reduceXTicks" : false
             }
           };

        var lineChart = {
          "chart": {
            "type": "lineChart",
            "height": 450,
            "useInteractiveGuideline": true,
            "dispatch": {},
            "xAxis": {
              "axisLabel": "Campaigns",
              tickFormat: function(d) {
                return d.y;
              }
            },
            "yAxis": {
              "axisLabel": "",
            }
          }
        };

        var  discreteBarChart = {
           chart: {
               type: 'discreteBarChart',
               height: 450,
               margin : {
                   top: 20,
                   right: 20,
                   bottom: 50,
                   left: 55
               },
               x: function(d){return d.label;},
               y: function(d){return d.value + (1e-10);},
               showValues: true,
               valueFormat: function(d){
                   return d3.format(',.2f')(d);
               },
               duration: 1500,
               xAxis: {
                   axisLabel: '',
                   "showMaxMin": false,
                   "rotateLabels" : -30
               },
               yAxis: {
                   axisLabel: 'Leads in %',
                   axisLabelDistance: -10
               }
           }
       };

       // START : service call to get suppliers as campaign status
       $scope.getSuppliersOfCampaignWithStatus = function(campaign){
         getCampaignInventoryActivitydetails(campaign.campaign);
         cfpLoadingBar.start();
         $scope.campaignTabPropsalName = campaign.name;
         $scope.campaignLabel = true;
         $scope.getCampaignFilters(campaign.campaign);
         $scope.campaignId = campaign.campaign;
         $scope.inv = campaign;
         DashboardService.getSuppliersOfCampaignWithStatus(campaign.campaign)
         .then(function onSuccess(response){
           console.log(response);
           cfpLoadingBar.complete();
           $scope.getPhases(campaign.campaign);

           // $scope.overallMetricStatus = [
           //   { label : $scope.campaignStatus.ongoing.supplierLabel, value : $scope.campaignStatusData.ongoing.length, status : $scope.campaignStatus.ongoing.status },
           //   { label : $scope.campaignStatus.completed.supplierLabel, value : $scope.campaignStatusData.completed.length, status : $scope.campaignStatus.completed.status },
           //   { label : $scope.campaignStatus.upcoming.supplierLabel, value : $scope.campaignStatusData.upcoming.length, status : $scope.campaignStatus.upcoming.status }
           // ];
           // console.log($scope.overallMetricStatus);
           $scope.overallMetric = response.data.data.overall_metrics;

            angular.forEach($scope.overallMetric , function(data,key){
              $scope.metricStatusValue = data;
              // $scope.avgLeadsPerFlat = data.total_leads_count/data.flat_count * 100;
            });
           $scope.showLeadsDetails = false;
           $scope.showDisplayDetailsTable = false;
           $scope.showSupplierTypeCountChart = false;
           $scope.showCampaignInvTable = false;
           $scope.showSupplierInvTable = false;
           $scope.showSingleCampaignChart = true;

           $scope.campaignStatusData = response.data.data;
           $scope.campaignSupplierAndInvData = response.data.data;
           $scope.showSupplierSocietywiseInvTable = false;
           $scope.showSupplierInvdDataTable = function(invData){
             $scope.SocietyInvTable = $scope.campaignStatusData;
             $scope.showSupplierSocietywiseInvTable = true;
          };
           $scope.countallsupplier = $scope.campaignStatusData.completed.length+$scope.campaignStatusData.ongoing.length+$scope.campaignStatusData.upcoming.length;
           var totalFlats=0,totalLeads=0,totalSuppliers=0,hotLeads=0;

           // $scope.totalLeadsCount = response.data.data.supplier_data.length;
           $scope.campaignStatusData['totalSuppliers'] = 0;
           angular.forEach($scope.campaignStatusData, function(data,key){
              if($scope.campaignStatusData[key].length && key != 'upcoming'){
                $scope.campaignStatusData['totalSuppliers'] += $scope.campaignStatusData[key].length;
                $scope.campaignStatusData[key]['totalFlats'] = 0;
                $scope.campaignStatusData[key]['totalLeads'] = 0;
                $scope.campaignStatusData[key]['hotLeads'] = 0;
                angular.forEach(data, function(supplierData){
                  $scope.campaignStatusData[key]['totalFlats'] += supplierData.supplier.flat_count;
                  $scope.campaignStatusData[key]['totalLeads'] += supplierData.leads_data.length;
                  if(supplierData.leads_data.length){
                    $scope.showLeadsDetails = true;
                    angular.forEach(supplierData.leads_data, function(lead) {
                      if(lead.is_interested){
                        $scope.campaignStatusData[key]['hotLeads'] += 1;

                      }
                    })
                  }
                })
                totalLeads += $scope.campaignStatusData[key].totalLeads;
                totalFlats += $scope.campaignStatusData[key].totalFlats;
              }
         })
            $scope.avgLeadsPerFlat = totalLeads/totalFlats * 100;
            $scope.avgLeadsPerSupplier = totalLeads/$scope.campaignStatusData.totalSuppliers;
            $scope.avgHotLeadsPerFlat = hotLeads/totalFlats * 100;
            $scope.avgHotLeadsPerSupplier = hotLeads/$scope.campaignStatusData.totalSuppliers;

           $scope.campaignChartdata = [
             { label : $scope.campaignStatus.ongoing.supplierLabel, value : $scope.campaignStatusData.ongoing.length, status : $scope.campaignStatus.ongoing.status },
             { label : $scope.campaignStatus.completed.supplierLabel, value : $scope.campaignStatusData.completed.length, status : $scope.campaignStatus.completed.status },
             { label : $scope.campaignStatus.upcoming.supplierLabel, value : $scope.campaignStatusData.upcoming.length, status : $scope.campaignStatus.upcoming.status }
           ];
           $scope.options1 = angular.copy(doughnutChartOptions);
           $scope.options1.chart.pie.dispatch['elementClick'] = function(e){ $scope.getSupplierAndInvData(e.data); };



         }
       ).catch(function onError(response){
           console.log(response);

         })
       }

       $scope.getPhases = function(campaignId){
         DashboardService.getPhases(campaignId)
         .then(function onSuccess(response){
           console.log(response);
           $scope.phaseMappingList = {};
           angular.forEach(response.data.data, function(phase){
             phase.start_date = new Date(phase.start_date);
             phase.end_date = new Date(phase.end_date);
             $scope.phaseMappingList[phase.no] = phase;

           })
           $scope.phaseNo = response.data.data.phase_no;
           console.log($scope.phaseMappingList);
           $scope.phasesDataOfSociety = response.data.data;
           console.log($scope.phasesDataOfSociety.phase_no);
           }).catch(function onError(response){
           console.log(response);
         })
       }
       // END : service call to get suppliers as campaign status


       // START : get campaign filters
       $scope.getCampaignFilters = function(campaignId){
         cfpLoadingBar.start();
         $scope.showTimeLocBtn = false;
         $scope.campaignId = campaignId;
         $scope.showPerfMetrics = $scope.perfMetrics.blank;
         DashboardService.getCampaignFilters(campaignId)
         .then(function onSuccess(response){
           console.log(response);
           cfpLoadingBar.complete();
           $scope.campaignInventories = [];
           $scope.showinv = true;
           $scope.select = {
            campaignInventories: ""
          };
           angular.forEach(response.data.data, function(inv){
             if($scope.invCodes.hasOwnProperty(inv.filter_code)){
               $scope.campaignInventories.push(inv);
             }
           })
           $scope.performanceMetricsData = [];

         }).catch(function onError(response){
           console.log(response);
         })
       }
       // END : get campaign filters

       // START : get Performance metrics data
        $scope.getPerformanceMetricsData = {};
       $scope.getPerformanceMetricsData = function(inv,perf_param){
         cfpLoadingBar.start();
         $scope.inv = inv;
         var type = 'inv';
         if(!perf_param)
            perf_param = 'inv';
         $scope.select.campaignInventories = "";

         DashboardService.getPerformanceMetricsData($scope.campaignId,type,inv,perf_param )
         .then(function onSuccess(response){
           console.log(response);
           cfpLoadingBar.complete();
           $scope.performanceMetricsData = response.data.data;
           $scope.activityInvPerfData = {
             release : Object.keys($scope.performanceMetricsData.actual.release).length,
             audit : Object.keys($scope.performanceMetricsData.actual.audit).length,
             closure : Object.keys($scope.performanceMetricsData.actual.closure).length
           }
           $scope.showPerfMetrics = $scope.perfMetrics.inv;
            $scope.showTimeLocBtn = true;
           if(perf_param == 'on_time'){
             setOntimeData($scope.performanceMetricsData.actual);
             $scope.showPerfMetrics = $scope.perfMetrics.ontime;
           }
           if(perf_param == 'on_location'){
            getOnLocationData($scope.performanceMetricsData.actual);
            $scope.showPerfMetrics = $scope.perfMetrics.onLocation;
           }

         }).catch(function onError(response){
           console.log(response);
         })
       }
       // END : get Performance metrics data

       // START : create on time data on activities
        var setOntimeData = function(data){
          angular.forEach(data, function(activity,key){
            activity['ontime'] = 0;
            angular.forEach(activity, function(imageData){
              for(var i=0;i<imageData.length;i++){
                var days = Math.floor((new Date(imageData[i].created_at) - new Date(imageData[i].activity_date)) / (1000 * 60 * 60 * 24));
                if(days == 0){
                  activity['ontime'] += 1;
                  break;
                }
              }
            })

          })
        }
       // END : create on time data on activities
       $scope.getOnTimeData = function(perf_param){
         $scope.getPerformanceMetricsData($scope.inv, perf_param);
       }

       $scope.getLocationData = function(perf_param){
         $scope.getPerformanceMetricsData($scope.inv, perf_param);
       }

       var getOnLocationData = function(data){
             angular.forEach(data, function(activity,key){
               data[key]['onLocation'] = 0;
               angular.forEach(activity, function(imageData){
                 for(var i=0; i<imageData.length; i++){
                   if(imageData[i].hasOwnProperty('distance') && imageData[i].distance <= constants.distanceLimit){
                     data[key].onLocation += 1;
                     break;
                   }
                 }
               })

             })


       }
       $scope.initializePerfMetrix = function(){
         $scope.showSupplierTypeCountChart = false;
       }

     $scope.getCampaignInvTypesData = function(campaign){
       cfpLoadingBar.start();
       $scope.proposal_id = campaign.proposal_id;
       $scope.campaignName = campaign.proposal__name;
       DashboardService.getCampaignInvTypesData($scope.proposal_id)
       .then(function onSuccess(response){
         console.log(response);
         cfpLoadingBar.complete();
        $scope.campaignInventoryTypesData = response.data.data;
        $scope.loading = response.data.data;
        $scope.getSupplierInvTableData($scope.campaignInventoryTypesData);
        $scope.campaignInventoryData = response.data.data;
        $scope.totalTowerCount = 0;
        $scope.totalFlatCount = 0;
        $scope.totalSupplierCount = response.data.data.supplier_data.length;
        angular.forEach(response.data.data.supplier_data, function(data,key){

          $scope.totalTowerCount += data.tower_count;
          $scope.totalFlatCount += data.flat_count;

        })

     }).catch(function onError(response){
       console.log(response);
     })
    }

    $scope.getSupplierInvTableData = function(supplier){
      $scope.supplierInvData = supplier;
      $scope.showSupplierInvTable = true;

    }

    var getCampaignInventoryActivitydetails = function(campaignId){
      cfpLoadingBar.start();
    DashboardService.getCampaignInventoryActivitydetails(campaignId)
      .then(function onSuccess(response){
        console.log(response);
        $scope.campaignInventoryActivityData = response.data.data;
        cfpLoadingBar.complete();
        }).catch(function onError(response){
      console.log(response);
    })
   }




     $scope.onLocationDetails = false;
       $scope.onTimeDetails = false;

   $scope.OntimeOnlocation = {
     ontime : {
       status : 'ontime', value : false
     },
     onlocation : {
       status : 'onlocation', value : false
     },
   };

   $scope.showOntimeOnlocation = function(status){
     $scope.showOnClickDetails = true;
     $scope.OntimeOnlocation.ontime.value = false;
     $scope.OntimeOnlocation.onlocation.value = false;

     $scope.OntimeOnlocation[status].value = !$scope.OntimeOnlocation[status].value;
   }


   var getHistory = function(data){
     $scope.historyData = {};
     var curDate = new Date();
     angular.forEach(data, function(dates,invKey){
       angular.forEach(dates, function(activities,dateKey){
         if(new Date(dateKey) <= curDate){
           if(!$scope.historyData.hasOwnProperty(dateKey)){
             $scope.historyData[dateKey] = {};
           }
           angular.forEach(activities, function(count,actKey){
             if(!$scope.historyData[dateKey].hasOwnProperty(actKey)){
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
   $scope.getDatewiseSuppliersInventory = function(proposalId, proposalName){
     cfpLoadingBar.start();
     $scope.dateWiseSuppliers = [];
     $scope.selectedProposalname = proposalName;
     $scope.proposalId= proposalId;
     DashboardService.getDatewiseSuppliersInventory(proposalId, $scope.date, $scope.invName, $scope.actType)
     .then(function onSuccess(response){
       console.log(response);
       cfpLoadingBar.complete();
       angular.forEach(response.data.data, function(data){
         $scope.dateWiseSuppliers.push(data);
       })
     }).catch(function onError(response){
       console.log(response);
     })
   }
   $scope.getLeadsByCampaign = function(campaignId,campaign){
     cfpLoadingBar.start();
     $scope.CampaignLeadsName = campaign.name;
     $scope.LeadsByCampaign = {};
     $scope.showReportBtn = false;
     // $scope.getSortedLeadsByCampaign();
     $scope.showTimeLocBtn = false;
     $scope.showinv = false;
     $scope.showSelection = true;
     $scope.campaignIdForPerfMetrics = campaignId;
     $scope.campaignInfoForPerfMetrics = campaign;
     $scope.showPerfMetrics = $scope.perfMetrics.blank;
     var result;
     if($scope.dateRangeModel.hasOwnProperty('start_date') && $scope.dateRangeModel.hasOwnProperty('end_date')){
       $scope.dateRangeModel.start_date = commonDataShare.formatDateToString($scope.dateRangeModel.start_date);
       $scope.dateRangeModel.end_date = commonDataShare.formatDateToString($scope.dateRangeModel.end_date);
       console.log($scope.dateRangeModel);
        result = DashboardService.getLeadsByCampaign(campaignId,$scope.dateRangeModel)
     }else{
        result = DashboardService.getLeadsByCampaign(campaignId)
     }
     // DashboardService.getLeadsByCampaign(campaignId)
     result.then(function onSuccess(response){
       console.log(response);
       cfpLoadingBar.complete();
       $scope.LeadsByCampaign = response.data.data;
       $scope.Data = $scope.LeadsByCampaign;
       $scope.localityData =  $scope.LeadsByCampaign.locality_data;
        $scope.phaseData =  $scope.LeadsByCampaign.phase_data;
       $scope.locationHeader = [];
       angular.forEach($scope.LeadsByCampaign.locality_data, function(data,key){
          $scope.value1 = key;
          $scope.locationHeader.push($scope.value1);
       })
       $scope.d3StackedBarChartData = formatD3StackedBarChartData($scope.LeadsByCampaign.supplier_data);
       $scope.stackedBarChartOptions = angular.copy(stackedBarChart);
       $scope.stackedBarChartSocietyWise = angular.copy(societySummaryBarChart);
       $scope.stackedBarChartDateWise = angular.copy(dateSummaryBarChart);
       $scope.stackedBarChartFlatWise = angular.copy(flatSummaryBarChart);
       $scope.stackedBarChartLocationWise = angular.copy(locationSummaryBarChart);
       $scope.stackedBarChartPhaseWise = angular.copy(phaseSummaryBarChart);
       $scope.stackedBarChartCityWise = angular.copy(citySummaryBarChart);
       $scope.stackedBarChartSupplierData = formatMultiBarChartDataForSuppliers(response.data.data.supplier_data);
       $scope.stackedBarChartDateData = formatMultiBarChartDataByDate(response.data.data.date_data);
       $scope.stackedBarFLatCountChart = formatFlatCountChart(response.data.data.flat_data);
       $scope.stackedBarLocationCountChart = formatLocationCountChart(response.data.data.locality_data);
       $scope.stackedBarPhaseChart = formatPhaseChart(response.data.data.phase_data);

       $scope.campaignLeadsData = response.data.data;
       $scope.showPerfMetrics = $scope.perfMetrics.leads;
       $scope.showReportBtn = true;
     }).catch(function onError(response){
       console.log(response);
     })
   }

  //  $scope.formatMultiBarChartDataForSuppliers = [
  //      {
  //          "key" : "Quantity" ,
  //          "bar": true,
  //          "values" : [ [ 1136005200000, 1271000.0] , [ 1138683600000, 1271000.0], [ 1138683600000, 1271000.0], [ 1138683600000, 1271000.0] ]
  //      },
  //      {
  //          "key" : "Price",
  //          "values" : [ [ 1136005200000 , 71.89] , [ 1138683600000 , 75.51], [ 1138683600000 , 75.51] , [ 1138683600000 , 75.51] ]
  //      }
  //  ].map((series) => {
  //          series.values = series.values.map((d) => { return {x: d[0], y: d[1] } });
  //          return series;
  // });

   var formatMultiBarChartDataForSuppliers = function(data){
     var values1 = [];
     var values2 = [];
     angular.forEach(data, function(supplier){
       if(supplier['flat_count'] != 0){
         $scope.hotLeadsValues =  supplier.interested / supplier['flat_count'] * 100;
         $scope.normalLeadsValues =  supplier.total/supplier['flat_count'] * 100;
        }
        else {
          $scope.hotLeadsValues =  supplier.interested;
          $scope.normalLeadsValues =  supplier.total;

        }

        var keyWithFlatLabel =  supplier.data.society_name + ' (' + supplier['flat_count'] + ')';
        var value1 =
           [keyWithFlatLabel, $scope.normalLeadsValues];
        var value2 =
           [keyWithFlatLabel, $scope.hotLeadsValues];
        values1.push(value1);
        values2.push(value2);


     })

     var temp_data = [
       {
         key : "Total Leads in %",
         color : constants.colorKey1,
         values : values1,
         "bar": true,
       },
       {
         key : "High Potential Leads in %",
         color : constants.colorKey2,
         values : values2,

       }
     ].map((series) => {
             series.values = series.values.map((d) => { return {x: d[0], y: d[1] } });
             return series;
    });
     return temp_data;
   }

   var formatMultiBarChartDataByDate = function(data){
     var values1 = [];
     var values2 = [];
     angular.forEach(data, function(date){
       if(date['flat_count'] != 0){
         $scope.hotLeadsValues =  date.interested / date['flat_count'] * 100;
         $scope.normalLeadsValues =  date.total/date['flat_count'] * 100;
        }
        else {
          $scope.hotLeadsValues =  date.interested;
          $scope.normalLeadsValues =  date.total ;

        }

       var tempDate = commonDataShare.formatDate(date.created_at);
       var DateLabel = tempDate + ' (' + date['flat_count'] + ')';
        var value1 =
           { x : DateLabel, y :$scope.normalLeadsValues };
        var value2 =
           { x : DateLabel, y : $scope.hotLeadsValues };
        values1.push(value1);
        values2.push(value2);
     })
     var temp_data = [
       {
         key : "Total Leads in %",
         color : constants.colorKey1,
         values : values1
       },
       {
         key : "High Potential Leads in %",
         color : constants.colorKey2,
         values : values2
       }
     ];
     return temp_data;
   }

   var formatFlatCountChart = function(data){
     var values1 = [];
     var values2 = [];
     angular.forEach(data, function(data,key){
       if(data['flat_count'] != 0){
         $scope.hotLeadsValues =  data.interested / data['flat_count'] * 100;
         $scope.normalLeadsValues =  data.total/data['flat_count'] * 100;
        }
        else {
          $scope.hotLeadsValues =  data.interested;
          $scope.normalLeadsValues =  data.total;

        }
       var keyWithFlatLabel =  key + ' (' + data['flat_count'] + ')';
       var value1 =
          { x : keyWithFlatLabel, y : $scope.normalLeadsValues };
       var value2 =
          { x : keyWithFlatLabel, y : $scope.hotLeadsValues };
       values1.push(value1);
       values2.push(value2);


     })

     var temp_data = [
       {
         key : "Total Leads in % :",
         color : constants.colorKey1,
         values : values1
         },
       {
         key : "High Potential Leads in % :",
         color : constants.colorKey2,
         values : values2
       }
     ];

     return temp_data;
   }

   var formatLocationCountChart = function(data){
     var values1 = [];
     var values2 = [];
     angular.forEach(data, function(data,key){
       if(data['flat_count'] != 0){
         $scope.hotLeadsValues =  data.interested / data['flat_count'] * 100;
         $scope.normalLeadsValues =  data.total/data['flat_count'] * 100;
        }
        else {
          $scope.hotLeadsValues =  data.interested;
          $scope.normalLeadsValues =  data.total;

        }
         var keyWithFlatLabel =  key + ' (' + data['flat_count'] + ')';
       var value1 =
          { x : keyWithFlatLabel, y : $scope.normalLeadsValues};
       var value2 =
          { x : keyWithFlatLabel, y : $scope.hotLeadsValues};
       values1.push(value1);
       values2.push(value2);


     })

     var temp_data = [
       {
         key : "Total Leads in %",
         color : constants.colorKey1,
         values : values1
       },
       {
         key : "High Potential Leads in %",
         color : constants.colorKey2,
         values : values2
       }
     ];

     return temp_data;
   }

   var formatPhaseChart = function(data){
     var values1 = [];
     var values2 = [];
     angular.forEach(data, function(data,key){
       if(data['flat_count'] != 0){
         $scope.hotLeadsValues =  data.interested / data['flat_count'] * 100;
         $scope.normalLeadsValues =  data.total/data['flat_count'] * 100;
        }
        else {
          $scope.hotLeadsValues =  data.interested;
          $scope.normalLeadsValues =  data.total;

        }

       var keyWithFlatLabel =  key + ' (' + data['flat_count'] + ')';
       var value1 =
          { x : keyWithFlatLabel, y :$scope.normalLeadsValues};
       var value2 =
          { x : keyWithFlatLabel, y : $scope.hotLeadsValues};
       values1.push(value1);
       values2.push(value2);


     })

     var temp_data = [
       {
         key : "Total Leads in %",
         color : constants.colorKey1,
         values : values1
       },
       {
         key : "High Potential Leads in %",
         color : constants.colorKey2,
         values : values2
       }
     ];

     return temp_data;
   }


   $scope.getDateData = function(date){
     $scope.date = date;
   }


   $scope.graphicalComparision = {
     leads : {
       status : 'leads', value : false
     },
     inventory : {
       status : 'inventory', value : false
     },
   };
   $scope.getGraphicalComparision = function(status){
     $scope.graphicalComparision.leads.value = false;
     $scope.graphicalComparision.inventory.value = false;
     $scope.showPerfMetrics = false;
     $scope.campaignInventories = [];
     $scope.showTimeLocBtn = false;
     $scope.graphicalComparision[status].value = !$scope.graphicalComparision[status].value;
     $scope.getCampaignsMenu($scope.campaignStatus.compare_campaigns.status);
   }

   $scope.searchSelectAllSettings = { enableSearch: true,
       keyboardControls: true ,idProp : "campaign",
       template: '{{option.name}}', smartButtonTextConverter(skip, option) { return option; },
       selectionLimit: 4,
       showCheckAll : true,
       scrollableHeight: '300px', scrollable: true};

 $scope.selected_baselines_customTexts = {buttonDefaultText: 'Select Campaigns'};

   $scope.events = {

   onItemSelect : function(item){
   }
 }

    $scope.compCampaigns = {
      campaigns : {
        status : 'campaigns', value : false
      }
    };
    $scope.getCompareCampaigns = function(status){
      $scope.compCampaigns.value = false;
      $scope.showPerfMetrics = false;
      $scope.getCampaignsMenu($scope.campaignStatus.compare_campaigns.status);
      $scope.compCampaigns[status].value = !$scope.compCampaigns[status].value;
    }

    $scope.ontimelocation = {
      ontimeloc : {
        status : 'ontimeloc', value : false
      },
      showdrop : {
        status : 'showdrop', value : false
      }
    };
    $scope.getontimelocation = function(status){
      $scope.ontimelocation.value = false;
      $scope.ontimelocation[status].value = !$scope.ontimelocation[status].value;
    }


    $scope.getCompareCampaignChartData = function(campaignChartData){
      cfpLoadingBar.start();
      var proposalIdData = [];
      var proposalIdDataNames = {};
      angular.forEach($scope.searchSelectAllModel,function(data){
        proposalIdData.push(data.id);
        proposalIdDataNames[data.id] = {
          name : data.id.name,
        };
      })
      DashboardService.getCompareCampaignChartData(proposalIdData)
      .then(function onSuccess(response){
        console.log(response);
        cfpLoadingBar.complete();
        var campaignIds = Object.keys(response.data.data);
        angular.forEach(proposalIdData, function(campaignId){
          if(!(campaignIds.indexOf(campaignId) > -1)){
            response.data.data[campaignId] = {};
            response.data.data[campaignId]['data'] = {};
            response.data.data[campaignId]['total'] = 0;
            response.data.data[campaignId]['interested'] = 0;
            response.data.data[campaignId]['data']['name'] = proposalIdDataNames[campaignId].name;
          }
        });
        formatLineChartData(response.data.data);
        $scope.stackedBarChartOptions = angular.copy(stackedBarChart);
        $scope.stackedBarChartcampaignsData = formatMultiBarChartDataByMultCampaigns(response.data.data);
        $scope.showPerfMetrics = $scope.perfMetrics.multipleLeads;

      }).catch(function onError(response){
        console.log(response);
      })
    }
    var formatMultiBarChartDataByMultCampaigns = function(data){
      var values1 = [];
      var values2 = [];
      angular.forEach(data, function(campaign, key){
        if(campaign['flat_count'] != 0){
          $scope.hotLeadsValues =  campaign.interested / campaign['flat_count'] * 100;
          $scope.normalLeadsValues = campaign.total /campaign['flat_count'] * 100;
         }
         else {
           $scope.hotLeadsValues =  campaign.interested;
           $scope.normalLeadsValues =  campaign.total ;

         }
         var keyWithFlatLabel =  campaign.data.name + ' (' + campaign['flat_count'] + ')';
         var value1 =
            { x : keyWithFlatLabel, y : $scope.normalLeadsValues};
         var value2 =
            { x : keyWithFlatLabel, y : $scope.hotLeadsValues};
         values1.push(value1);
         values2.push(value2);
      })
      var temp_data = [
        {
          key : "Total Leads",
          color : constants.colorKey1,
          values : values1
        },
        {
          key : "High Potential Leads",
          color : constants.colorKey2,
          values : values2
        }
      ];
      return temp_data;
    };
    var formatLineChartData = function(data){
      $scope.lineChartLabels = [];
      $scope.lineChartValues = [];
      var values1 = [];
      var values2 = [];

      var count = Object.keys(data).length;
      angular.forEach(data, function(campaign){
        $scope.lineChartLabels.push(campaign.data.name);
        values1.push(campaign.total/count);
        values2.push((campaign.interested)/count);
      });
      $scope.lineChartValues.push(values1);
      $scope.lineChartValues.push(values2);
    }

    $scope.lineChartOptions = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },

      ],
      xAxes: [{
        ticks: {
        autoSkip: false
        }
      }],
      responsive: true,
      maintainAspectRatio: false,
    },
    series: ['Normal','High Potential'],
    legend: {display: true},
    colors: ['#d7525b', '#fcfc5f'],

  };
  $scope.datasetOverride =  [
            {
                fill: true,
                backgroundColor: [
               "#d7525b",

                ]
            },
            {
                fill: true,
                backgroundColor: [
               "#fcfc5f",

                ]
            },
            ];

  $scope.openMenu = function($mdMenu, ev) {
      $mdMenu.open(ev);
    };
    var invStatusKeys = {
      'STALL' : {
        status : false, total : 0
      },
      'POSTER' : {
        status : false, total : 0
      },
      'FLIER' : {
        status : false, total : 0
      },
      'STANDEE' : {
        status : false, total : 0
      },
      'GATEWAY ARCH' : {
        status : false, total : 0
      },

    }
    $scope.getSupplierAndInvData = function(data){
      $scope.societyCampaignName = true;
      $scope.campaignName = false;
      $scope.supplierStatus = data.status;
      $scope.supplierAndInvData = $scope.campaignSupplierAndInvData[data.status];
      $scope.invStatusKeys = angular.copy(invStatusKeys);

      $scope.TotalSupplierFlatCount = 0;
      $scope.TotalSupplierLeadsCount = 0;
      $scope.TotalLeadsPerFlat = 0;
      $scope.TotalSupplierHotLeadsCount = 0;
      angular.forEach($scope.supplierAndInvData, function(supplier,key){
        $scope.latitude = supplier.supplier.society_latitude;
        $scope.longitude = supplier.supplier.society_longitude;
        $scope.societyName = supplier.supplier.society_name;
        $scope.length = $scope.supplierAndInvData.length;
        $scope.TotalSupplierFlatCount += supplier.supplier.flat_count;
        if($scope.TotalSupplierLeadsCount){
        $scope.TotalSupplierLeadsCount += supplier.leads_data.total_leads_count;
        console.log($scope.TotalSupplierLeadsCount);
         }

        $scope.TotalLeadsPerFlat += supplier.leads_data.leads_flat_percentage;
        if($scope.TotalSupplierHotLeadsCount){
          $scope.TotalSupplierHotLeadsCount += supplier.leads_data.hot_leads_count;
        }
        $scope.societyName = supplier.supplier.society_name;

          angular.forEach(supplier.supplier.inv_data, function(inv,key){
          $scope.invStatusKeys[key].status = true;
          })
          $scope.ImageURL = function(supplier,images){

            $scope.ImageURLListOfAll = [];
            angular.forEach(images, function(data){
                var imagesData = {
                  image_url : 'http://androidtokyo.s3.amazonaws.com/' + data.image_path,
                  comment : data.comment,
                  // distance : data.distance,
                };
                $scope.ImageURLListOfAll.push(imagesData);

            })
          }

           angular.forEach(supplier.leads_data, function(inv,key){
            $scope.leads_data = inv;
            // console.log($scope.leads_data);
            $scope.showLeads = true;
            $scope.countLeads += 1;

            if($scope.leads_data.is_interested){
              $scope.supplierHotLeads += 1;
            }
          })
      })

      $scope.showDisplayDetailsTable = true;
      $scope.map = { zoom: 13,bounds: {},center: {latitude: $scope.latitude,longitude: $scope.longitude}};
      $scope.supplierMarkers = assignMarkersToMap($scope.supplierAndInvData);

      uiGmapIsReady.promise()
        .then(function(instances) {
          uiGmapGoogleMapApi.then(function(maps) {

          });
        });
      $scope.$apply();

    }
    $scope.windowCoords = {};
    $scope.onClick = function(marker, eventName, model) {
      $scope.space = model;
      $scope.campaignInventory = model;
      $scope.windowCoords.latitude = model.latitude;
      $scope.windowCoords.longitude = model.longitude;
      $scope.show = true;
    }
    function assignMarkersToMap(suppliers) {
        var markers = [];
        // var icon;
        var checkInv = true;
        angular.forEach(suppliers, function(supplier,$index){

              markers.push({
                  latitude: supplier.supplier.society_latitude,
                  longitude: supplier.supplier.society_longitude,
                  id: supplier.supplier.supplier_id,
                  // icon: 'http://www.googlemapsmarkers.com/v1/009900/',
                  options : {draggable : false},
                  dataofSupplierAndInvData : supplier.supplier,
                  title : {
                      name : supplier.supplier.society_name,
                      flat_count : supplier.supplier.flat_count,
                  },
              });
              if(checkInv){
                  angular.forEach($scope.invStatusKeys, function(inv,key){
                    if($scope.invStatusKeys[key].status){
                      if('inv_data' in supplier.supplier && key in supplier.supplier.inv_data){
                        markers[$index].title[key] = {
                            'key' : key,
                            'total' : supplier.supplier.inv_data[key].total.total
                        }
                      }else {
                          markers[$index].title[key] = {
                              'key' : key,
                              'total' : 0
                          }
                        }

                    }
                  })
              }


        });
        return markers;

    };
    $scope.supplierMarkers = [];
    $scope.map = { zoom: 5,bounds: {},center: {latitude: 19.119,longitude: 73.48,}};
    $scope.options = { scrollwheel: false, mapTypeControl: true,
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



    $scope.calculateTotalCount = function(invKey, value){
      if(value)
        $scope.invStatusKeys[invKey].total += value;
    }


  $scope.selectTabIndex = {
    value : 0
  }

$scope.switchToLeads = function(){
  $scope.selectTabIndex.value = 2;
  $scope.getLeadsByCampaign($scope.campaignId);
}


$scope.switchToInventory = function(inv){
  $scope.selectTabIndex.value = 2;
  // var perf_param = null;
  // $scope.getPerformanceMetricsData(inv,perf_param);
}
$scope.setImageUrl = function(item,images){
  $scope.campaignNameOnImageModal = item.name;
  $scope.campaignName = true;
  $scope.societyCampaignName = false;
  $scope.imageUrlList = [];
  angular.forEach(images, function(data){
    for(var i=0; i<data.length; i++){
      var imageData = {
        image_url : 'http://androidtokyo.s3.amazonaws.com/' + data[i].image_path,
        comment : data[i].comment,
        distance : data[i].distance,
        timestamp : data[i].created_at,
      };
      $scope.imageUrlList.push(imageData);
    }
  })
}
// map

$scope.setInventoryInfoModalDetails = function(supplier,inv){
}


$scope.map;
   NgMap.getMap().then(function(evtMap) {
       $scope.map = evtMap;
   });
   $scope.showDetail = function(evt, supplierData){
     $scope.map;
     NgMap.getMap().then(function(evtMap) {
         $scope.map = evtMap;
     });
     $scope.windowDisplay = supplierData;
     $scope.map.showInfoWindow('myWindow', this);
   };

$scope.viewSupplierImages = function(supplierId, invType, activityType, date){

    $scope.imageUrlList = [];
  DashboardService.getSupplierImages(supplierId, invType, activityType, date)
  .then(function onSuccess(response){
    console.log(response);

    angular.forEach(response.data.data, function(data){
      var imageData = {
        image_url : 'http://androidtokyo.s3.amazonaws.com/' + data.image_path,
        comment : data.comment,
        distance : data.distance,
        timestamp : data.created_at
      };
      $scope.imageUrlList.push(imageData);
    })
  }).catch(function onError(response){
    console.log(response);
  })
}

$scope.setHashtagImageUrl = function(item,images){
  $scope.campaignNameOnImageModal = item.name;
  $scope.campaignName = true;
  $scope.societyCampaignName = false;
  $scope.hashTagImageUrl = [];
  angular.forEach(images, function(data){
    for(var i=0; i<data.length; i++){
      var imageData = {
        image_url : 'http://androidtokyo.s3.amazonaws.com/' + data[i].image_path,
        comment : data[i].comment,
        distance : data[i].distance,
      };
      $scope.hashTagImageUrl.push(imageData);
    }
  })
}
$scope.getHashtagImages = function(item){
    $scope.hashTagImageUrl = [];
  DashboardService.getHashtagImages($scope.proposalId,$scope.date)
  .then(function onSuccess(response){
    console.log(response);
    $scope.hashTagImageData = [];
    angular.forEach(response.data.data, function(data){
      var imageData = {
        image_url : constants.aws_campaign_images_url + data.image_path,
        comment : data.hashtag,
        supplier_name : data.supplier_data.society_name,
        timestamp : data.created_at
      };
      $scope.hashTagImageData.push(imageData);
    })
    if(!$scope.hashTagImageData.length){
      $('#imageHashtag').modal('hide');
      swal(constants.name, "No Hashtag Images Clicked", constants.warning);
    }else {
      $('#imageHashtag').modal('show');
    }
  }).catch(function onError(response){
    console.log(response);
  })
}
//
$scope.options = {width: 500, height: 300, 'bar': 'aaa'};
           // $scope.data = [1, 2, 3, 4];
//            $scope.hovered = function(d){
//                $scope.barValue = d;
//                $scope.$apply();
//            };
//            $scope.barValue = 'None';


var formatD3StackedBarChartData = function(data){
  var d3Data = [];
  // var d3Data['counts'] = [];
  angular.forEach(data, function(value){
    var object_data = {
      label : value.data.society_name,
      total : value.total,
      counts : []
    };
    // object_data['counts'] = [];

    var temp_data = {
       'name'  : 'count',
       'y0'  : 0,
       'y1' : value.total - value.interested,
       'label' : value.data.society_name,
       'total' : value.total,
      };
    object_data['counts'].push(temp_data);
    var temp_data = {
       'name'  : 'count2',
       'y0'  : value.total - value.interested,
       'y1' : value.total,
       'label' : value.data.society_name,
       'total' : value.total,
      };
    object_data['counts'].push(temp_data);

   d3Data.push(object_data);
  });
  return d3Data;
}

$scope.getBookingCampaigns = function(campaign){
  cfpLoadingBar.start();
  $scope.headerForSupplierBookings = undefined;
  $scope.bookingPhases = [];
  $scope.bookingSuppliersData = [];

  $scope.proposalId = campaign.campaign;
  console.log(campaign);
  $scope.selectedBookingCampaignName = campaign.name;
  DashboardService.getBookingCampaigns(campaign.campaign)
  .then(function onSuccess(response){
    console.log(response);
    cfpLoadingBar.complete();
      $scope.bookingPhases = response.data.data;

      // if(!$scope.bookingPhases.length){
        // swal(constants.name, "Suppliers Booking is going on.Currently, No supplier is Booked", constants.warning)
      // }
  }).catch(function onError(response){
    console.log(response);
  })
}
$scope.getTotalFlatCount = function(data){
  var total = 0;
  if(data){
    angular.forEach(data , function(supplier){
      total += supplier.flat_count||0;
    })
  }
  return total;
}
$scope.getSuppliersOfBookingDetails = function(data,header){
  $scope.headerForSupplierBookings = header;
  $scope.bookingSuppliersData = {};
  $scope.supplierBookingStatus = constants.supplierBookingStatus;
  if(data){
    $scope.bookingSuppliersData = data;
  }else{
    swal(constants.name,"Suppliers Not Available In this Status",constants.warning);
  }
}
$scope.geToSupplierDetails = function(supplierId){
  $location.path(supplierId + "/SocietyDetailsPages");
}
$scope.checkNan = function(number){
  return isNaN(number);
}
$scope.viewCampaignLeads = function(value){
  cfpLoadingBar.start();
  DashboardService.viewCampaignLeads()
  .then(function onSuccess(response){
    console.log(response);
    cfpLoadingBar.complete();
    $scope.leadsDataCampaigns = response.data.data;
    if(value){
      angular.forEach($scope.leadsDataCampaigns, function(data){
        if(!$scope.allCampaignsLeadsData.hasOwnProperty(data.campaign_status)){
            $scope.allCampaignsLeadsData[data.campaign_status] = {};
            $scope.allCampaignsLeadsData[data.campaign_status]['total_leads'] = 0;
            $scope.allCampaignsLeadsData[data.campaign_status]['hot_leads'] = 0;
            $scope.allCampaignsLeadsData[data.campaign_status]['supplier_count'] = 0;
            $scope.allCampaignsLeadsData[data.campaign_status]['flat_count'] = 0;
        }
        if(data.total_leads){
            $scope.allCampaignsLeadsData[data.campaign_status]['total_leads'] += data.total_leads;
        }

        if(data.hot_leads){
          $scope.allCampaignsLeadsData[data.campaign_status]['hot_leads'] += data.hot_leads;
        }
        if(data.supplier_count){
          $scope.allCampaignsLeadsData[data.campaign_status]['supplier_count'] += data.supplier_count;
        }
        if(data.flat_count){
          $scope.allCampaignsLeadsData[data.campaign_status]['flat_count'] += data.flat_count;
        }
      })
    }
  }).catch(function onError(response){
    console.log(response);
  })
}
    $scope.viewLeadsForSelectedCampaign = function(campaignId){
      cfpLoadingBar.start();
      DashboardService.viewLeadsForSelectedCampaign(campaignId)
      .then(function onSuccess(response){
      console.log(response);
      cfpLoadingBar.complete();
      $scope.selectedCampaignLeads = response.data.data;
      $scope.showCampaigns = false;
    }).catch(function onError(response){
      console.log(response);
    })
  }
$scope.backToCampaign = function(){
  $scope.showCampaigns = true;
}
//
//
// $scope.getSortedLeadsByCampaign = function(campaignId,query_type){
//   console.log(query_type);
//   $scope.showTimeLocBtn = false;
//   $scope.showinv = false;
//   $scope.showSelection = true;
//   $scope.showPerfMetrics = $scope.perfMetrics.blank;
//   DashboardService.getSortedLeadsByCampaign(campaignId)
//   .then(function onSuccess(response){
//     console.log(response);
//   }).catch(function onError(response){
//     console.log(response);
//   })
// }

$scope.viewComments = function(supplier,index){
  // $scope.supplierDataForComment = supplier;
  // $scope.supplierNameForComment = undefined;
  // $scope.supplierNameForComment = supplier.supplier_data.society_name;
  $scope.commentsData = {};
  var relatedTo = constants.execution_related_comment;
  var spaceId = supplier.shortlisted_space_id;
  DashboardService.viewComments($scope.campaignId,spaceId,relatedTo)
  .then(function onSuccess(response){
    console.log(response);
    $scope.commentModal = {};
    $scope.enableViewComments = index;
    $scope.commentsData = response.data.data;
    // if(Object.keys($scope.commentsData).length != 0){
    //   $scope.viewInvForComments = Object.keys($scope.commentsData);
    //   $scope.selectedInvForView = $scope.viewInvForComments[0];
    //   $('#viewComments').modal('show');
    // }else{
    //   $('#viewComments').modal('hide');
    //   swal(constants.name,constants.no_comments_msg,constants.warning);
    // }
  }).catch(function onError(response){
    console.log(response);
  })
}

$scope.viewBookingComments = function(supplier){
  $scope.supplierNameForComment = undefined;
  $scope.supplierNameForComment = supplier.society_name;
  $scope.commentsData = {};
  var relatedTo = constants.booking_related_comment;
  var spaceId = supplier.space_id;
  DashboardService.viewBookingComments($scope.proposalId,spaceId,relatedTo)
  .then(function onSuccess(response){
    console.log(response);
    $scope.commentModal = {};
    $scope.commentsData = response.data.data;
    if(Object.keys($scope.commentsData).length != 0){
      $scope.viewInvForComments = Object.keys($scope.commentsData);
      $scope.selectedInvForView = $scope.viewInvForComments[0];
      $('#viewComments').modal('show');
    }else{
      $('#viewComments').modal('hide');
      swal(constants.name,constants.no_comments_msg,constants.warning);
    }
  }).catch(function onError(response){
    console.log(response);
  })
}
$scope.addCount = function(data,key){
  var total = 0;
  angular.forEach(data, function(item){
    total += item[key];
  })
  return total;
}
$scope.sortMenu = [
  {name : 'Total(ASC)', type : 'total', order : 'ASC', id : 1},
  {name : 'Total(DESC)', type : 'total', order : 'DESC', id : 2},
  {name : 'HotLeads(ASC)', type : 'interested', order : 'ASC', id : 3},
  {name : 'HotLeads(DESC)', type : 'interested', order : 'DESC', id : 4},
  {name : 'All', type : '', order : '', id : 5},
];
var sortMenuMap = {};
angular.forEach($scope.sortMenu, function(data){
  sortMenuMap[data.id] = data;
});
$scope.sortedLocationData = {};
$scope.togglesortedGraphs = {
  'location' : false,
  'weekwise' : false,
  'datewise' : false,
  'flatData' : false,
  'supplier' : false,
}
$scope.sortData = function(keyName,id){
  if(id == 5){
    $scope.togglesortedGraphs[keyName] = false;
  }else {
    $scope.togglesortedGraphs[keyName] = true;
  }
  if(keyName == 'location'){
      $scope.sortedData = angular.copy($scope.LeadsByCampaign.locality_data[0]);
  }
  if(keyName == 'weekwise'){
      $scope.sortedData = angular.copy($scope.LeadsByCampaign.phase_data[0]);
  }
  if(keyName == 'datewise'){
      $scope.sortedData = angular.copy($scope.LeadsByCampaign.date_data);
  }
  if(keyName == 'flatData'){
      $scope.sortedData = angular.copy($scope.LeadsByCampaign.flat_data);
  }
  if(keyName == 'supplier'){
      $scope.sortedData = angular.copy($scope.LeadsByCampaign.supplier_data);
  }
  var sortable = [];
  for (var key in $scope.sortedData) {
      sortable.push([key, $scope.sortedData[key]]);
  }
  if(sortMenuMap[id].type == 'total'){
    sortable.sort(function(a, b) {
        a = a[1].total / a[1].flat_count * 100;
        b = b[1].total / b[1].flat_count * 100;
        return a-b;
    });
  }
  if(sortMenuMap[id].type == 'interested'){
    sortable.sort(function(a, b) {
        a = a[1].interested / a[1].flat_count * 100;
        b = b[1].interested / b[1].flat_count * 100;
        return a-b;
    });
  }

  $scope.sortedLocationData[keyName] = {};

  $scope.locationChartOptions = angular.copy(discreteBarChart);
  if(sortMenuMap[id].order == 'ASC'){
    $scope.sortedLocationData[keyName] = formatByLocation(sortable,keyName,sortMenuMap[id].type);
  }
  if(sortMenuMap[id].order == 'DESC'){
    $scope.sortedLocationData[keyName] = formatByLocation(sortable.reverse(),keyName,sortMenuMap[id].type);
  }





$scope.showLocationData = true;
}


var formatByLocation = function(data,key,type){
  var temp_data = {};

  temp_data['key'] = key;
  temp_data['values'] = [];
  angular.forEach(data, function(item){
    console.log(item,key);
    if (key == 'supplier'){
      item[0] = item[1].data.society_name + " (" + item[1].data.flat_count + ")";
    }
    var value = {
      'label' : item[0],
      'value' : item[1][type]/item[1].flat_count * 100
    }
    temp_data.values.push(value);
  })
  return [temp_data];
}
$scope.commentModal = {};
$scope.addComment = function(id){

  $scope.commentModal['related_to'] = constants.execution_related_comment;
  $scope.commentModal['shortlisted_spaces_id'] = id;
  DashboardService.addComment($scope.campaignId,$scope.commentModal)
  .then(function onSuccess(response){
    console.log(response);
    $scope.commentModal = {};
    $scope.supplierDataForComment = undefined;
    // $('#addComments').modal('hide');
    swal(constants.name, constants.add_data_success, constants.success);
  }).catch(function onError(response){
    console.log(response);
  })
}
$scope.openChat = function(){
  $scope.showChat = true;
}
$scope.changePassword = function(){
  console.log("hello");
  $('#changePassword').modal('show');
}
$scope.changeUserPassword = function(){
  cfpLoadingBar.start();
  DashboardService.changePassword($scope.userInfo.id,$scope.passwordModel)
  .then(function onSuccess(response){
    console.log(response);
    cfpLoadingBar.complete();
    $('#changePassword').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    swal(constants.name,constants.changePassword_success,constants.success);
    $location.path("/logout");
  }).catch(function onError(response){
    console.log(response);
    commonDataShare.showErrorMessage(response);
    swal(constants.name,constants.errorMsg,constants.error);
    // swal(constants.name,constants.errorMsg,constants.error);
  });
}
$scope.validatePassword = function(){
  console.log("hello");
  if($scope.passwordModel.password == $scope.passwordModel.confirm_password)
    $scope.isValid = true;
  else
    $scope.isValid = false;
  console.log($scope.isValid,$scope.model);
}

$scope.getFormDetails = function(campaignId){
  console.log(campaignId);
  cfpLoadingBar.start();
  $scope.campaignIdForleads = campaignId;
  $scope.emailCampaignLeadsModel = {};
  $scope.sendEmailList = [];
  // angular.forEach(campaignId, function(data){
  //   for(var i=0; i<data.length; i++){
  //     var emailData = {
  //       // start_date : ,
  //       // end_date : ,
  //       // leads_form_id : ,
  //       // campaign_id : ,
  //
  //     };
  //     $scope.sendEmailList.push(emailData);
  //   }
  //   console.log(sendEmailList);
  // }) ;
   DashboardService.getFormDetails(campaignId)
    .then(function onSuccess(response){
      console.log(response);
      cfpLoadingBar.complete();
      $scope.formDetails = response.data.data;
      console.log($scope.formDetails);
        $scope.campaign_id = $scope.formDetails.leads_form_items;
      console.log($scope.campaign_id );
    }).catch(function onError(response){
        console.log(response);
    })
}

$scope.sendMeEmail = function(){
  cfpLoadingBar.start();
  console.log($scope.emailCampaignLeadsModel);
  $scope.emailCampaignLeadsModel['campaign_id'] = $scope.campaignIdForleads;
  DashboardService.sendMeEmail($scope.emailCampaignLeadsModel)
  .then(function onSuccess(response){
    console.log(response);
    cfpLoadingBar.complete();
    $('#sendEmailModal').modal('hide');
    swal(constants.name, constants.email_success, constants.success);

  }).catch(function onError(response){
    console.log(response);
  })
}

$scope.sendReport = function(){
  var token = $rootScope.globals.currentUser.token;
  if ($scope.file) {
    Upload.upload({
        url: Config.APIBaseUrl + "v0/ui/website/send-graph-pdf/",
        data: {
          file: $scope.file,
          campaign_id : $scope.campaignIdForPerfMetrics,
          data_import_type : "base-data"
        },
        headers: {'Authorization': 'JWT ' + token}
    }).then(function onSuccess(response){
          console.log(response);
          $scope.file = undefined;
          swal(constants.name,constants.email_success,constants.success);
    })
    .catch(function onError(response) {
        console.log(response);
      });
    }
}
var reportFile;
$scope.uploadFiles = function(file){
  var reportFile;
  console.log("hello");
  $scope.file = file;
  console.log($scope.file);
}
$scope.enableAddComments = function(index){
  $scope.enableComments = index;
}
$scope.getPermissionBoxImages = function(supplier){
  console.log(supplier);
  $scope.supplierNameForPermBox = supplier.society_name;
  console.log($scope.supplierNameForPermBox);
  DashboardService.getPermissionBoxImages($scope.campaignId,supplier.supplier_id)
  .then(function onSuccess(response){
    console.log(response);
    if(response.data.data.length){
        angular.forEach(response.data.data, function(data){
          data['image_url'] = 'http://androidtokyo.s3.amazonaws.com/' + data.image_path;
        })
        // $('#imageModalForPermBox').modal('show');
    }else {
      swal(constants.name, constants.image_empty, constants.warning);
    }
    $scope.perBoxImageData = response.data.data;
    console.log($scope.perBoxImageData);

  }).catch(function onError(response){
    console.log(response);
  })
}

$scope.sendEmailDetails = function(){
  $scope.sendDetails = true;
  console.log("Hello dropdown");
}

$scope.sendBookingEmails = function(){
  DashboardService.sendBookingEmails()
  .then(function onSuccess(response){
    console.log(response);
  }).catch(function onError(response){
    console.log(response);
  })
}

$scope.Sort = function(val)
   {
       if($scope.sort == val)
       {
           $scope.reversesort = !$scope.reversesort;
           //return;
       }
       $scope.sort = val;
        $('td a i').each(function()
       {
           //alert(this.className);
           $(this).removeClass().addClass('icon-sort');
       });

     };
//END
})


})();
