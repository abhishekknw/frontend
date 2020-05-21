
angular.module('catalogueApp')
  .controller('ReleaseCampaignCtrl',
    ['$scope', '$rootScope', '$window', '$location', 'releaseCampaignService', 'createProposalService', 'auditReleasePlanService', '$stateParams', 'permissions', 'Upload', 'cfpLoadingBar', 'constants', 'mapViewService', '$timeout', 'commonDataShare',
      function ($scope, $rootScope, $window, $location, releaseCampaignService, createProposalService, auditReleasePlanService, $stateParams, permissions, Upload, cfpLoadingBar, constants, mapViewService, $timeout, commonDataShare) {
        $scope.campaign_id = $stateParams.proposal_id;
        $scope.positiveNoError = constants.positive_number_error;
        $scope.campaign_manager = constants.campaign_manager;
        $scope.aws_campaign_images_url = constants.aws_campaign_images_url;
        $scope.editPaymentDetails = true;
        $scope.commentModal = {};
        $scope.userData = {};
        $scope.orgData = {};
        $scope.assign = {};
        $scope.options = {};
        $scope.selectedUser = { value: undefined, supplier_type_filter: undefined };
        $scope.body = {
          message: '',
        };
        var allSuppliersById = {};
        $scope.editContactDetails = true;
        $scope.addContactDetails = true;
        $scope.userIcon = "icons/usericon.png";
        $scope.userInfo = $rootScope.globals.userInfo;
        $scope.addNewPhase = true;
        if ($rootScope.globals.userInfo.is_superuser == true) {
          $scope.backButton = true;
        }
        $scope.selected1 = "";
        $scope.supplierSummaryData = [];
        $scope.shortlistedSuppliersIdList = {}
        $scope.permissions = permissions.supplierBookingPage;
        $scope.showSummaryTab = false;
        $scope.editPaymentDetails = true;
        $scope.editContactDetails = true;
        $scope.addContactDetails = true;
        $scope.addNewPhase = true;
        $scope.headings = [
          { header: 'Index' },
          { header: 'Supplier Name' },
          { header: 'Area,(Sub Area)' },
          { header: 'Address' },
          { header: 'RelationShip Data' },
          { header: 'Flat Count' },
          { header: 'Tower Count' },
          // {header : 'Status'},
          // {header : 'Supplier ID'},
          { header: 'Inventory Type' },
          // {header : 'Stall Location'},
          { header: 'Inventory Count' },
          { header: 'Inventory Supplier Price' },
          { header: 'Total Supplier Price   (Per Flat)  ' },
          { header: 'Negotiated Price' },
          { header: 'Freebies' },
          { header: 'Booking Status' },
          { header: 'Phase' },
          { header: 'Mode Of Payment' },
          { header: 'Contacts' },
          { header: 'Payment Status' },
        ];
        $scope.booking_status = [
          { name: 'Confirmed Booking', code: 'BK' },
          { name: 'Tentative Booking', code: 'TB' },
          { name: 'Decision Pending', code: 'DP' },
          { name: 'Recce', code: 'RE' },
          { name: 'Unknown', code: 'UN' },
          { name: 'Meeting Fixed', code: 'MF' },
          { name: 'Meeting Converted', code: 'MC' },
          { name: 'New Entity', code: 'NE' },
          { name: 'Rejected', code: 'SR' },
          { name: 'Not Initiated', code: 'NI' }
        ];

        $scope.booking_unknown = [
          { name: 'Phone Number Issue', code: 'UPNI' },
          { name: 'Contact Person Issue', code: 'UCPI' }
        ];

        $scope.meeting_status = [
          { name: 'Meeting with AGM', code: 'MWA' },
          { name: 'Meeting with Secretory', code: 'MWS' },
          { name: 'Meeting with Chairman', code: 'MWC' },
          { name: 'Meeting with Treasurer', code: 'MWT' },
          { name: 'Meeting with Other', code: 'MWO' }
        ];


        $scope.booking_recce = [
          { name: 'Recce Required', code: 'DPRR' },
          { name: 'Recce Approved', code: 'RERA' },
        ];

        $scope.booking_pending = [
          { name: 'Visit Required', code: 'DPVR' },
          { name: 'Call Required', code: 'DPCR' },
          { name: 'Negotiation Required', code: 'DPNR' },
          { name: 'Not Available', code: 'DPNA' },
          { name: 'Postponed', code: 'DPP' },
          { name: 'Specific Occasion Only', code: 'DPDOO' },
          { name: 'Others(Specify)', code: 'DPOS' },
        ];


        $scope.booking_rejected = [
          { name: 'Less occupancy', code: 'RLO' },
          { name: 'Less Children', code: 'RLC' },
          { name: 'Under Builder', code: 'RUB' },
          { name: 'Very Expensive', code: 'RVE' },
          { name: 'Client Rejected', code: 'RCR' },
          { name: 'Rejected by Society', code: 'RRS' },
          { name: 'Others(Specify)', code: 'ROS' },
        ];
        $scope.sheetUrl = '../../assets/img/booking_plan_sheet_v1.xlsx'

        $scope.booking_tentative = [
          { name: 'Phone Booking', code: 'PB' },
          { name: 'Visit Booking', code: 'VB' }
        ]

        $scope.booking_new_entity = [
          { name: 'Wikimapia', code: 'NVW' },
          { name: 'Google', code: 'NVG' },
          { name: '99Acres', code: 'NVA' },
          { name: 'Magic Brick', code: 'NVMB' },
          { name: 'First Time Assigned', code: 'NVFT' },
          { name: 'Others(Specify)', code: 'NVOS' },
        ];

        $scope.bookingPriority = [
          { name: 'Very High', code: 'VH' },
          { name: 'High', code: 'HH' }
        ];


        $scope.payment_status = [
          { name: 'Not Initiated', code: 'PNI' },
          { name: 'Pending', code: 'PP' },
          { name: 'Cheque Released', code: 'PCR' },
          { name: 'Paid', code: 'PD' },
          { name: 'Rejected', code: 'PR' },
        ];

        $scope.contact_headings = [
          { header: 'Salutation' },
          { header: 'Name' },
          { header: 'Designation' },
          { header: 'Email' },
          { header: 'STD Code' },
          { header: 'Landline No' },
          { header: 'Mobile No' },
          { header: 'Remove' },

        ];
        $scope.payment_headings = [
          { header: 'Name On Cheque' },
          { header: 'Bank Name' },
          { header: 'IFSC Code' },
          { header: 'Account Number' },
        ];
        $scope.filters = [
          { name: 'Poster(PO)', code: 'PO', selected: false },
          { name: 'Standee(ST)', code: 'ST', selected: false },
          { name: 'Stall(SL)', code: 'SL', selected: false },
          { name: 'Flyer(FL)', code: 'FL', selected: false },
          { name: 'Banner(BA)', code: 'BA', selected: false },
          { name: 'Gateway Arch', code: 'GA', selected: false },
          { name: 'SunBoard(SB)', code: 'SB', selected: false },
        ];
        $scope.invForComments = constants.inventoryNames;
        $scope.commentsType = constants.comments_type;
        $scope.shortlisted = constants.shortlisted;
        $scope.buffered = constants.buffered;
        $scope.removed = constants.removed;
        $scope.finalized = constants.finalized;

        $scope.statusCode = {
          shortlisted: constants.statusCode_shortlisted,
          buffered: constants.statusCode_buffered,
          removed: constants.statusCode_removed,
          finalized: constants.statusCodeFinalized,
        }

        $scope.datePicker = {
          date: { startDate: null, endDate: null },
          options: {
            locale: {
              clearable: true,
              format: "YYYY-MM-DD",
            },
          }
        };

        $scope.clear = function () {
          $scope.dt = null;
        };

        $scope.maxDate = new Date(2020, 5, 22);
        $scope.today = new Date();
        $scope.popup1 = false;
        $scope.popup2 = false;
        $scope.popup3 = false;
        $scope.phaseStartDate = false;
        $scope.phaseEndDate = false;
        $scope.error = false;

        $scope.setDate = function (year, month, day) {
          $scope.dt = new Date(year, month, day);
        };
        $scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[1];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        var getFilterData = function () {
          var data = {};

          if (supplierIdForSearch)
            data['search'] = supplierIdForSearch;
          if ($scope.datePicker.date.startDate && $scope.datePicker.date.endDate) {
            data['start_date'] = commonDataShare.formatDate($scope.datePicker.date.startDate);
            data['end_date'] = commonDataShare.formatDate($scope.datePicker.date.endDate);
          }
          if ($scope.selectedUser.value) {
            data['assigned'] = $scope.selectedUser.value;
          }

          if ($scope.selectedUser.supplier_type_filter) {
            data['supplier_type_code'] = $scope.selectedUser.supplier_type_filter;
          }

          if ($scope.selectedUser.booking_status_code) {
            data['booking_status_code'] = $scope.selectedUser.booking_status_code;
          }

          if ($scope.selectedUser.phase_id) {
            data['phase_id'] = $scope.selectedUser.phase_id;
          }


          return data;
        }

        $scope.totalSuppliers = 0;
        $scope.suppliersPerPage = 10;
        // $scope.pageNo = 1;
        $scope.pagination = {
          current: 1
        };
        $scope.pageChanged = function (newPage) {
          getResultsPage(newPage);
        };
        var assigned = 0;
        var supplierIdForSearch;
        var getResultsPage = function (newPage) {
          var data = getFilterData();
          releaseCampaignService.getCampaignReleaseDetails($scope.campaign_id, newPage, data)
            .then(function onSuccess(response) {
              releaseCampaignService.getCampaignReleaseDetailsHeader()
                .then(function onSuccess(headerResponse) {
                  $scope.detailsHeaders = headerResponse.data.data;
                  var detailsHeader = headerResponse.data.data;
                  if (!$scope.selectedUser.supplier_type_filter) {
                    $scope.detailsHeader = detailsHeader['ALL'];
                  } else {
                    $scope.detailsHeader = detailsHeader[$scope.selectedUser.supplier_type_filter];
                  }
                })

              getUsersList();
              getAssignedSuppliers();
              getOrganisationList();

              $scope.initialReleaseData = Object.assign({}, response.data.data);
              $scope.totalSuppliers = $scope.initialReleaseData.total_count;

              for (var i = 0, l = $scope.initialReleaseData.shortlisted_suppliers.length; i < l; i += 1) {
                $scope.initialReleaseData.shortlisted_suppliers[i].average_weekday = parseInt($scope.initialReleaseData.shortlisted_suppliers[i].average_weekday, 10);
                $scope.initialReleaseData.shortlisted_suppliers[i].average_weekend = parseInt($scope.initialReleaseData.shortlisted_suppliers[i].average_weekend, 10);
                $scope.initialReleaseData.shortlisted_suppliers[i].total_negotiated_price = parseInt($scope.initialReleaseData.shortlisted_suppliers[i].total_negotiated_price, 10);
                $scope.mapViewLat = $scope.initialReleaseData.shortlisted_suppliers[i].latitude;
                $scope.mapViewLong = $scope.initialReleaseData.shortlisted_suppliers[i].longitude;

                if ($scope.initialReleaseData.shortlisted_suppliers[i].next_action_date) {
                  $scope.initialReleaseData.shortlisted_suppliers[i].next_action_date = new Date($scope.initialReleaseData.shortlisted_suppliers[i].next_action_date);
                }
                $scope.shortlistedSuppliersIdList[$scope.initialReleaseData.shortlisted_suppliers[i].supplier_id] = $scope.initialReleaseData.shortlisted_suppliers[i];
                if (Object.keys($scope.initialReleaseData.shortlisted_suppliers[i].shortlisted_inventories).length == 0) {
                  $scope.initialReleaseData.shortlisted_suppliers[i].shortlisted_inventories['NA'] = 'NA';
                }
                $scope.getTotalSupplierPrice($scope.initialReleaseData.shortlisted_suppliers[i]);
                if (!$scope.initialReleaseData.shortlisted_suppliers[i].stall_locations) {
                  $scope.initialReleaseData.shortlisted_suppliers[i].stall_locations = [];
                }

                $scope.getTotalSupplierPriceNew($scope.initialReleaseData.shortlisted_suppliers[i], i);

              }

              $scope.releaseDetails = {};

              if ($scope.initialReleaseData) {
                $scope.releaseDetails = Object.assign({}, $scope.initialReleaseData);

                // if ($scope.releaseDetails.shortlisted_suppliers.length) {
                //   for (let i in $scope.releaseDetails.shortlisted_suppliers.length) {

                //   }
                // }
                $scope.releaseDetailsData = $scope.releaseDetails.campaign.centerData;
                var centerSuppliers = $scope.releaseDetails.campaign.centerSuppliers;

                if (centerSuppliers) {

                  $scope.supplier_names = [];
                  for (let i in centerSuppliers) {
                    if (centerSuppliers[i].supplier_type_code == 'RS') {
                      $scope.supplier_names.push({ name: 'Residential Society', code: 'RS' });
                    } else if (centerSuppliers[i].supplier_type_code == 'CP') {
                      $scope.supplier_names.push({ name: 'Corporate Parks', code: 'CP' });
                    } else if (centerSuppliers[i].supplier_type_code == 'BS') {
                      $scope.supplier_names.push({ name: 'Bus Shelter', code: 'BS' });
                    } else if (centerSuppliers[i].supplier_type_code == 'GY') {
                      $scope.supplier_names.push({ name: 'Gym', code: 'GY' });
                    } else if (centerSuppliers[i].supplier_type_code == 'SA') {
                      $scope.supplier_names.push({ name: 'Saloon', code: 'SA' });
                    } else if (centerSuppliers[i].supplier_type_code == 'RE') {
                      $scope.supplier_names.push({ name: 'Retail Store', code: 'RE' });
                    }
                  }
                  if (centerSuppliers.length == 0) {
                    $scope.supplier_names.push({ name: 'ALL', code: 'ALL' });
                  }

                  if ($scope.supplier_names.length == 1) {
                    $scope.selectedUser.supplier_type_filter_selected = $scope.supplier_names[0].name;
                    $scope.selectedUser.supplier_type_filter = $scope.supplier_names[0].code;
                  }


                }

                // setDataToModel($scope.releaseDetails.shortlisted_suppliers);
                mapLeadsWithSuppliers();
                $scope.loading = !!response;
              } else {
                swal(constants.name, "You do not have access to Proposal", constants.warning);
                $scope.loading = !!response;
              }
            })
            .catch(function onError(response) {
              $scope.loading = !!response;
              commonDataShare.showErrorMessage(response);
            });
        }
        getResultsPage(1);

        var setDataToModel = function (suppliers) {
          for (var i = 0; i < suppliers.length; i++) {
            suppliers[i].total_negotiated_price = parseInt(suppliers[i].total_negotiated_price);
          }
        }

        $scope.changeType = function () {

          if ($scope.selectedUser.supplier_type_filter == "") {
            $scope.detailsHeader = $scope.detailsHeaders['ALL'];
          } else {
            $scope.detailsHeader = $scope.detailsHeaders[$scope.selectedUser.supplier_type_filter];
          }



        }

        $scope.setPhase = function (supplier, id) {
          supplier.phase_no = id;
        }

        $scope.test = function (index) {
          alert(index);
        }

        $scope.setBrandForBooking = function () {
          let data = {
            id: $scope.userSupplierData.id,
            brand_organisation_id: $scope.organisationMapListWithObjects[$scope.orgData.index].organisation_id
          }
          var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
            return el.id;
          }).indexOf($scope.userSupplierData.id);
          if (localindex_index != -1) {
            $scope.releaseDetails.shortlisted_suppliers[localindex_index].brand_organisation_data = { name: $scope.organisationMapListWithObjects[$scope.orgData.index].name }
            $scope.orgData = {};
          }
          releaseCampaignService.setBrandForBooking(data)
            .then(function onSuccess(response) {
              swal({
                title: "",
                text: constants.assign_success,
                type: "success",
                confirmButtonText: "ok",
              });
            })
            .catch(function onError(error) {
              console.log(error);
            });
        }

        $scope.emptyList = { NA: 'NA' };
        $scope.getFilters = function (supplier) {
          return $scope.emptyList;
          var keys = Object.keys(supplier.shortlisted_inventories);
          if (keys.length > 0) {
            return supplier.shortlisted_inventories;
          }
          else {
            return $scope.emptyList;
          }
        }
        //Start:To set contacts to show in contactModal
        $scope.setContact = function (supplier) {

          $scope.payment = supplier;
          $scope.editContactDetails = true;
          $scope.statusEditContactDetails = (!supplier.is_completed);

        }
        //End:To set contacts to show in contactModal
        //Start:To set payment details to show in paymentModal
        $scope.setPayment = function (supplier) {
          $scope.payment = supplier;
        }
        //End:To set payment details to show in paymentModal
        //Start: TO go to audit release plan pages
        $scope.changeLocation = function () {
          $location.path('/' + $scope.campaign_id + '/auditReleasePlan');
        }
        $scope.changeDate = function (index) {

          $scope.releaseDetails.shortlisted_suppliers[index].next_action_date = moment.utc($scope.releaseDetails.shortlisted_suppliers[index].next_action_date).local();


        }
        //To show inventory ids in modal after clicking on inventory type
        $scope.setInventoryIds = function (filter) {
          $scope.inventoryIds = [];
          $scope.inventoryIds = filter.detail;
        }
        $scope.updateData = function (id, index) {
          let updateData = [];
          if (id && index && id == $scope.releaseDetails.shortlisted_suppliers[index].id) {
            updateData.push($scope.releaseDetails.shortlisted_suppliers[index]);
          } else {
            updateData = $scope.releaseDetails.shortlisted_suppliers;
          }
          releaseCampaignService.updateAuditReleasePlanDetails($scope.campaign_id, updateData)
            .then(function onSuccess(response) {
              swal(constants.name, constants.updateData_success, constants.success);
            })
            .catch(function onError(response) {
              commonDataShare.showErrorMessage(response);
            });
        }
        $scope.getCampaignState = function (state) {
          return constants[state];
        }
        $scope.getInventoryPrice = function (price, inventory) {
          if (inventory == 'POSTER')
            price = price * 0.3;
          return price;
        }
        $scope.getTotalSupplierPrice = function (supplier) {
          var totalPrice = 0;
          angular.forEach(supplier.shortlisted_inventories, function (value, key) {
            value['totalPrice'] = 0;
            value['price'] = 0;
            if (key != 'NA') {
              value['days'] = value.detail[0].inventory_number_of_days;
              if (key == 'POSTER') {
                value['totalPrice'] = value['totalPrice'] + value.actual_supplier_price * 0.3;
                value['price'] = value.actual_supplier_price * 0.3;
              }

              else {
                value['totalPrice'] += value.actual_supplier_price;
                value['price'] = value.actual_supplier_price;
              }
            }
            else {
              value['totalPrice'] = 0;
            }
          })

        }

        $scope.getTotalSupplierPriceNew = function (supplier, index) {
          var totalPrice = 0;
          angular.forEach(supplier.shortlisted_inventories, function (value, key) {
            var duration = 1;
            if (value.inventory_duration_name == 'Campaign Weekly') {
              duration = 7;
            } else if (value.inventory_duration_name == 'Campaign Monthly') {
              duration = 30;
            }
            totalPrice = totalPrice + (value.actual_supplier_price / duration);
          })

          $scope.initialReleaseData.shortlisted_suppliers[index].shortlisted_inventories_totalPrice = totalPrice;

        }
        //Start: code added to search & show all suppliers on add societies tab
        // $scope.supplier_names = [
        //   { name: 'Residential Society', code:'RS'},
        //   { name: 'Corporate Parks',  code:'CP'},
        //   { name: 'Bus Shelter',  code:'BS'},
        //   { name: 'Gym',  code:'GY'},
        //   { name: 'Saloon',  code:'SA'},
        //   { name: 'Retail Store',  code:'RE'},
        //   ];
        $scope.search = {};
        $scope.search_status = false;
        $scope.supplier_type_code = {};
        $scope.center_index = {};
        $scope.searchDisable = false;
        $scope.supplier_err = false;
        $scope.center_err = false;

        $scope.searchSuppliers = function () {
          var proposal_id = $scope.releaseDetails.campaign.proposal_id;
          if($scope.releaseDetails.campaign.brand == "multi_brand"){
            proposal_id = undefined;
          }

          $scope.searchDisable = true;
          if (!$scope.supplier_type_code.code) {
            $scope.supplier_err = true;
          }
          if (!$scope.supplier_center) {
            $scope.center_err = true;
          }
          try {
            $scope.search_status = false;
            if ($scope.supplier_type_code.code && $scope.supplier_center) {
               mapViewService.searchSuppliers($scope.supplier_type_code.code, $scope.search.query, '', $scope.supplier_center, $scope.center_areas, proposal_id)
              .then(function onSuccess(response, status) {
                  $scope.center_index = null;
                  $scope.supplierData = response.data.data;
                  $scope.searchDisable = false;
                  if ($scope.supplierData.length > 0) {
                    $scope.search_status = true;
                    $scope.errorMsg = undefined;
                  }
                  else {
                    $scope.errorMsg = "No Results Found";
                    $scope.search_status = false;
                  }
                })
                .catch(function onError(response, status) {
                  commonDataShare.showErrorMessage(response);
                  // swal(constants.name,constants.errorMsg,constants.error);
                });
            }
            else {
              // $scope.errorMsg = "Please Fill all the details";
              $scope.supplierData = [];
              $scope.search_status = false;
              $scope.searchDisable = false;
            }
          } catch (error) {
            console.log(error.message);
          }
        }

        //End: code added to search & show all suppliers on add societies tab
        $scope.selectSupplier = function () {
          $scope.supplierData = [];
          $scope.center_areas = {};
          $scope.selectCenter();
          $scope.sub_areas = {};
          $scope.areas = {};
          $scope.supplier_center = "";
          $scope.center_areas.areas = "";
          $scope.center_areas.sub_areas = "";
          $scope.supplier_err = false;
          $scope.center_index = null;
          $scope.supplier_center = "";
          $scope.indexData = {};
          $scope.areas = {};
          $scope.sub_areas = {};
          $scope.center_areas = {};
          $scope.centers = {};
          $scope.releaseDetailsData = $scope.releaseDetails.campaign.centerData;
        }


        //Start: function to select center at add more suplliers
        $scope.selectCenter = function (center_index) {

          $scope.supplierData = [];
          try {
            $scope.center_index = center_index;
            if (center_index != null) {
              for (var i = 0; i < $scope.releaseDetails.campaign.centerData.length; i++) {
                if ($scope.releaseDetails.campaign.centerData[i].id == center_index) {
                  $scope.current_center_index = i;
                  $scope.supplier_center = $scope.releaseDetails.campaign.centerData[i].city
                }
              }
              //$scope.supplier_center = $scope.releaseDetails.campaign.centerData.center_name;
              if ($scope.supplier_center) {
                $scope.center_err = false;
                mapViewService.getLocations($scope.supplier_center)
                  .then(function onSuccess(response) {

                    $scope.areas = response.data.data;
                  }).
                  catch(function onError(response) {
                    commonDataShare.showErrorMessage(response);
                  });
              }
            } else {
              $scope.areas = {};
              $scope.sub_areas = {};
            }

          } catch (error) {
            console.log(error.message);
          }
        }

        $scope.get_sub_areas = function (index) {
          $scope.supplierData = [];
          if (index) {
            $scope.center_areas = {
              areas: $scope.areas[index].label
            };
            createProposalService.getLocations('sub_areas', $scope.areas[index].id)
              .then(function onSuccess(response) {
                $scope.sub_areas = response.data;
              });
          } else {
            $scope.center_areas = {};
            $scope.centers = [];
            $scope.sub_areas = [];
          }
        }

        $scope.selectSubArea = function (index) {
          $scope.supplierData = [];
          if (index) {
            $scope.center_areas.sub_areas = $scope.sub_areas[index].subarea_name;
          } else {
            $scope.center_areas.sub_areas = "";
          }
        }
        //End: function to select center at add more suplliers



        $scope.addSuppliersToList = function (supplier) {
          if ($scope.releaseDetails.campaign.brand == 'multi_brand') {
            $scope.supplierSummaryData.push(supplier)
            swal(constants.name, constants.updateData_success, constants.success);
          } else {
            var localindex_index = $scope.supplierSummaryData.map(function (el) {
              return el.supplier_id;
            }).indexOf(supplier.supplier_id);
            if (localindex_index != -1) {
              swal(constants.name, constants.already_exist, constants.error);
            } else {
              $scope.supplierSummaryData.push(supplier)
              swal(constants.name, constants.updateData_success, constants.success);
            }

          }
          // if (!(supplier.supplier_id in $scope.shortlistedSuppliersIdList || supplier.supplier_id in $scope.supplierSummaryData)) {
          //   $scope.supplierSummaryData[supplier.supplier_id] = supplier;
          //   swal(constants.name, constants.updateData_success, constants.success);
          // }
          // else
          //   swal(constants.name, constants.already_exist, constants.error);
        }
        $scope.removeSupplierToList = function (index) {
          $scope.supplierSummaryData.splice(index, 1);
        }
        //Start: function to clear searched supplier data whenever add suppliers button clicked
        $scope.clearSearchData = function () {
          try {
            $scope.supplierData = [];
            $scope.search_status = false;
            $scope.supplier_type_code = {};
            $scope.search = {};
            $scope.errorMsg = undefined;
            $scope.center_index = null;
            $scope.supplierSummaryData = [];
            $scope.supplier_center = {};

            $scope.indexData = {};
            $scope.areas = {};
            $scope.sub_areas = {};
            $scope.center_areas = {};
            $scope.centers = {};


          } catch (error) {
            console.log(error.message);
          }
        }

        $scope.closeModel = function () {
          try {

            $scope.areas = {};
            $scope.sub_areas = {};
            $scope.releaseDetailsData = {};
            $scope.center_areas = {};
            $scope.supplier_err = false;
            $scope.center_err = false;

          } catch (error) {
            console.log(error.message);
          }
        }

        $scope.addSuppliersToCampaign = function () {

          var supplier_ids = [];
          var filters = [];
          var center_data = {};
          angular.forEach($scope.filters, function (filter) {
            if (filter.selected) {
              var filterKeyValuData = {
                id: filter.code
              }
              filters.push(filterKeyValuData);
            }
          })

          angular.forEach($scope.supplierSummaryData, function (supplier) {
            let code = "";
            if (supplier.supplier_code) {
              code = supplier.supplier_code;
            }
            if (supplier.supplier_type) {
              code = supplier.supplier_type;
            }

            var supplierKeyValueData = {
              id: supplier.supplier_id,
              status: 'F',
            }
            if (!center_data[code]) {
              center_data[code] = {};
              center_data[code]['supplier_data'] = [];
              center_data[code]['filter_codes'] = filters;
            }
            if (code != null)
              center_data[code]['supplier_data'].push(supplierKeyValueData);
          })

          var data = {
            campaign_id: $scope.releaseDetails.campaign.proposal_id,
            center_data: center_data
          }

          if (filters.length) {
            releaseCampaignService.addSuppliersToCampaign(data)
              .then(function onSuccess(response) {
                //synergy
                if (response) {
                  $scope.releaseDetails.shortlisted_suppliers = response.data.data;
                  window.location.reload();
                }

                $('#addNewSocities').modal('hide');
                swal(constants.name, constants.add_data_success, constants.success);
              }).catch(function onError(response) {
              })
          } else {
            alert("Atleast One Supplier and One Filter is required to Continue");
          }

        }


        $scope.orderProperty = "f";
        $scope.setOrderProperty = function (propertyName) {
          if ($scope.orderProperty === propertyName) {
            $scope.orderProperty = '-' + propertyName;
          } else if ($scope.orderProperty === '-' + propertyName) {
            $scope.orderProperty = propertyName;
          } else {
            $scope.orderProperty = propertyName;
          }
        };

        $scope.searchSelectAllModel = [];

        $scope.multiSelect =
          [{
            name: "Whatsapp Group",
            id: "1",

          }, {
            name: "Email Group",
            id: "2",

          }, {
            name: "Building ERP",
            id: "3",

          }, {
            name: "Door To Door",
            id: "4",

          }];
        $scope.selected_baseline_settings = {
          template: '<b>{{option.name}}</b>',
          selectedToTop: true // Doesn't work
        };

        $scope.getRelationShipData = function (supplier) {

          $scope.relationshipData = {};
          // var supplierCode = 'RS';
          var supplierCode = supplier.supplierCode;
          var campaignId = $scope.releaseDetails.campaign.proposal_id;
          $scope.supplierFlatCount = supplier.flat_count;
          releaseCampaignService.getRelationShipData(supplier.supplier_id, supplierCode, campaignId)
            .then(function onSuccess(response) {
              $scope.relationshipData = response.data.data;
            }).catch(function onError(response) {
              console.log(response);
            })
        }

        $scope.savePaymentDetails = function () {
          releaseCampaignService.savePaymentDetails($scope.payment, $scope.payment.supplier_id)
            .then(function onSuccess(response) {
              $scope.editPaymentDetails = true;
            }).catch(function onError(response) {
              console.log(response);
            })
        }

        $scope.setEditPaymentDetails = function () {
          $scope.editPaymentDetails = false;
        }

        var temp_data = [];

        $scope.saveContactDetails = function () {
          $scope.payment['basic_contact_available'] = true;
          $scope.payment['basic_contacts'] = $scope.payment.contacts;
          $scope.payment['food_tasting_allowed'] = null;
          releaseCampaignService.saveContactDetails($scope.payment, $scope.payment.supplier_id)
            .then(function onSuccess(response) {
              $scope.editContactDetails = true;
              swal(constants.name, constants.add_data_success, constants.success);
            }).catch(function onError(response) {
              console.log(response);
            })

        }
        $scope.setEditContactDetails = function () {
          $scope.editContactDetails = false;
        }
        $scope.addRow = ({});
        $scope.addContactDetail = function () {
          $scope.addRow = $scope.payment.contacts;
          $scope.addContactDetails = false;
          $scope.addRow.push({});
        }

        $scope.removeContact = function (index) {
          $scope.payment.contacts.splice(index, 1);
        }
        $scope.IsVisible = false;
        $scope.updateSupplierStatus = function (value) {
          //If DIV is visible it will be hidden and vice versa.
          $scope.IsVisible = value == "Y";
        }

        $scope.uploadImage = function (file, supplier) {

          // cfpLoadingBar.set(0.3)

          var token = $rootScope.globals.currentUser.token;
          if (file) {
            // $("#progressBarModal").modal();
            cfpLoadingBar.start();
            // cfpLoadingBar.inc();
            Upload.upload({
              url: constants.base_url + constants.url_base + constants.upload_image_activity_url,
              data: {
                file: file,
              },
              headers: { 'Authorization': 'JWT ' + token }
            }).then(function onSuccess(response) {
              uploaded_image = { 'image_path': response.data.data };
              supplier.images.push(uploaded_image);
              cfpLoadingBar.complete();
            })
              .catch(function onError(response) {
                cfpLoadingBar.complete();
                console.log(response);
              });
          }
        }
        //to send email
        $scope.loadSpinner = true;
        $scope.sendNotification = function () {

          let message = "Beneficiary Name :" + $scope.body.Beneficiary_Name + ", Bank Account Number :" + $scope.body.Bank_Account_Number + ", IFSC Code :" + $scope.body.IFSC_Code + ", Negotiated Price :" + $scope.body.Negotiated_Price + ", Message :" + $scope.body.msg;

          $scope.loadSpinner = false;
          var email_Data = {
            subject: $scope.paymentStatus + " Details For " + $scope.supplierPaymentData.name,
            body: message,
            to: constants.account_email_id,
          };


var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function(el) { 
  return el.id;
}).indexOf($scope.supplierPaymentData.id);  
   
if (localindex_index != -1) {   
  $scope.releaseDetails.shortlisted_suppliers[localindex_index].account_number = $scope.body.Bank_Account_Number;
  $scope.releaseDetails.shortlisted_suppliers[localindex_index].beneficiary_name = $scope.body.Beneficiary_Name;
  $scope.releaseDetails.shortlisted_suppliers[localindex_index].ifsc_code = $scope.body.IFSC_Code;
  $scope.releaseDetails.shortlisted_suppliers[localindex_index].payment_message = $scope.body.msg;
}
          releaseCampaignService.sendMail(email_Data)
            .then(function onSuccess(response) {
              $scope.taskId = response.data.data.task_id;
              sendMailInProgress();
            })
            .catch(function onError(response) {
              $scope.loadSpinner = true;
              $('#selectedPaymentModal').modal('hide');
              commonDataShare.showErrorMessage(response);
              console.log("error occured", response);
            });
          $scope.reason = "";
        }

        var sendMailInProgress = function () {
          releaseCampaignService.sendMailInProgress($scope.taskId)
            .then(function onSuccess(response) {
              if (response.data.data.ready != true) {
                $timeout(sendMailInProgress, constants.sleepTime); // This will perform async
              }
              else if (response.data.data.status == true) {
                $scope.loadSpinner = true;
                $('#selectedPaymentModal').modal('hide');

                swal(constants.name, constants.email_success, constants.success);
              }
              else {
                $scope.loadSpinner = true;
                swal(constants.name, constants.email_error, constants.error);
              }
            }).catch(function onError(response) {
              $scope.loadSpinner = true;
              $('#onHoldModal').modal('hide');
              $('#declineModal').modal('hide');
              commonDataShare.showErrorMessage(response);
              swal(constants.name, constants.email_error, constants.error);
            });
        }

        $scope.getPaymentDetails = function (supplier, status) {
          $scope.body = {};
          $scope.supplierPaymentData = supplier;
          $scope.paymentStatus = status;
          if (status == 'NEFT' || status == 'CASH') {
            supplier.payment_status = 'PP';
          } else if (status == 'CHEQUE') {
            supplier.payment_status = 'PCR';
          }

          //supplier.booking_status = 'NB';

          $scope.body.message = "Beneficiary Name : " + $scope.supplierPaymentData.name_for_payment + ",     " +
            "Bank Account Number : " + $scope.supplierPaymentData.account_no + ",     " +
            "IFSC Code : " + $scope.supplierPaymentData.ifsc_code + ",     " +
            "Negotiated Price :" + $scope.supplierPaymentData.total_negotiated_price + ",     " +
            "Message : ";
        }

        $scope.updateSupplierStatus = function (supplier) {
          if (supplier.transaction_or_check_number) {
            supplier.payment_status = 'PD';
            supplier.booking_status = 'BK';
          }

        }
        $scope.getPhases = function () {
          $scope.editPhase = false;
          releaseCampaignService.getPhases($scope.campaign_id)
            .then(function onSuccess(response) {
              $scope.phaseMappingList = {};
              angular.forEach(response.data.data, function (phase) {
                phase.start_date = new Date(phase.start_date);
                phase.end_date = new Date(phase.end_date);
                $scope.phaseMappingList[phase.id] = phase;
              })
              $scope.phases = response.data.data;



            }).catch(function onError(response) {
              console.log(response);
            })
        }


        $scope.editPhaseDetails = function () {
          $scope.editPhase = true;
        }
        $scope.savePhases = function () {
          if ($scope.phases[0] && $scope.phases[0].phase_no) {
            releaseCampaignService.savePhases($scope.phases, $scope.campaign_id)
              .then(function onSuccess(response) {
                swal(constants.name, constants.add_data_success, constants.success);
                angular.forEach($scope.phases, function (phase) {
                  phase.start_date = new Date(phase.start_date);
                  phase.end_date = new Date(phase.end_date);
                })
                $scope.getPhases();
                $scope.editPhase = false;
              }).catch(function onError(response) {
                if(response && response.data && response.data.data){
                  swal(constants.name, response.data.data.general_error, constants.error);
                }
              
              })
          } else {
            swal(constants.name, "Please add phase first", constants.warning);
          }

        }

        $scope.getPhases();
        $scope.addPhase = ({});
        $scope.addPhases = function () {
          $scope.addPhase = $scope.phases;
          $scope.addNewPhase = false;
          $scope.phases.push({});
        }

        $scope.removePhase = function (index) {
          if ($scope.phases && $scope.phases[index].id) {
            swal({
              title: 'Are you sure ?',
              text: "You want to remove phase",
              type: constants.warning,
              showCancelButton: true,
              confirmButtonClass: "btn-success",
              confirmButtonText: "Yes, Remove!",
              closeOnConfirm: true
            },
              function () {
                $scope.editPhase = false;
                releaseCampaignService.removePhase($scope.phases[index].id)
                  .then(function onSuccess(response) {
                    swal(constants.name, constants.delete_success, constants.success);
                    $scope.getPhases();
                  }).catch(function onError(response) {
                    console.log(response);
                  })
              })
          } else {
            $scope.phases.splice(index, 1);
          }

        }

        var setSocietyLocationOnMap = function (supplier) {
          var mapOptions = {
            center: new google.maps.LatLng(0, 0),
            //  zoom:13
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          var map = new google.maps.Map(document.getElementById("supplierMap"), mapOptions);

          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(supplier.society_latitude, supplier.society_longitude),
            map: map,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });


          var latlngbounds = new google.maps.LatLngBounds();
          latlngbounds.extend(marker.position);
          map.fitBounds(latlngbounds);

          google.maps.event.addListenerOnce(map, 'bounds_changed', function (event) {
            if (this.getZoom()) {
              this.setZoom(16);
            }
          });

          google.maps.event.addListenerOnce(map, 'idle', function () {
            google.maps.event.trigger(map, 'resize');
          });

        }
        function inventoryCount(inventoryDetails) {
          var totalPoster = inventoryDetails.lift_count + inventoryDetails.nb_count;
          $scope.totalInventoryCount = {
            totalPoster: totalPoster,
          };
          return $scope.totalInventoryCount;
        }

        $scope.getSocietyDetails = function (supplier, supplierId, center, index) {
          $scope.temp_index = index;
          $scope.center = center;
          mapViewService.processParam();
          var supplier_id = supplier.supplier_id;
          $scope.society = {};
          $scope.disable = false;
          $scope.residentCount = {};
          $scope.inventoryDetails = {};
          $scope.totalInventoryCount = {};
          $scope.supplier_type_code = "RS";
          mapViewService.getSociety(supplier_id, $scope.supplier_type_code)
            .then(function onSuccess(response) {
              $scope.loading = response;
              setSocietyLocationOnMap(response.data.data.supplier_data);
              $scope.loading = response.data.data.supplier_data;
              $scope.myInterval = 300;
              $scope.society_images = response.data.data.supplier_images;
              $scope.amenities = response.data.data.amenities;
              $scope.society = supplier;
              $scope.residentCount = estimatedResidents(response.data.data.supplier_data.flat_count);
              $scope.flatcountflier = response.data.data.supplier_data.flat_count;
              var baseUrl = constants.aws_bucket_url;

              // Start : Code added to seperate images by their image tag names
              var imageUrl;
              $scope.SocietyImages = [], $scope.FlierImages = [], $scope.PosterImages = [], $scope.StandeeImages = [], $scope.StallImages = [], $scope.CarImages = [];
              for (var i = 0; i < $scope.society_images.length; i++) {
                if ($scope.society_images[i].name == 'Society') {
                  imageUrl = baseUrl + $scope.society_images[i].image_url;
                  $scope.SocietyImages.push(imageUrl);
                }
                if ($scope.society_images[i].name == 'Standee Space') {
                  imageUrl = baseUrl + $scope.society_images[i].image_url;
                  $scope.StandeeImages.push(imageUrl);
                }
                if ($scope.society_images[i].name == 'Stall Space') {
                  imageUrl = baseUrl + $scope.society_images[i].image_url;
                  $scope.StallImages.push(imageUrl);
                }
                if ($scope.society_images[i].name == 'Fliers') {
                  imageUrl = baseUrl + $scope.society_images[i].image_url;
                  $scope.FlierImages.push(imageUrl);
                }
                if ($scope.society_images[i].name == 'Car Display') {
                  imageUrl = baseUrl + $scope.society_images[i].image_url;
                  $scope.CarImages.push(imageUrl);
                }
                if ($scope.society_images[i].name == 'Lift' || $scope.society_images[i].name == 'Notice Board') {
                  imageUrl = baseUrl + $scope.society_images[i].image_url;
                  $scope.PosterImages.push(imageUrl);
                }
              }
              // End : Code added to seperate images by their image tag names
            });

          mapViewService.get_inventory_summary(supplier_id, $scope.supplier_type_code)
            .then(function onSuccess(response) {
              $scope.societyDetails = true;
              if ('inventory' in response.data) {
                $scope.inventoryDetails = response.data.inventory;
                $scope.totalInventoryCount = inventoryCount($scope.inventoryDetails);
                $scope.model = response.data.inventory;
                $scope.inventories_allowed = response.data.inventories_allowed_codes;
                $scope.show_inventory = true;
              }
            }).catch(function onError(response) {
              console.log("error", response);
              commonDataShare.showErrorMessage(response);
            });
        }//End of function getSocietyDetails

        var getUsersList = function () {
          commonDataShare.getUsersList()
            .then(function onSuccess(response) {
              $scope.userList = response.data.data;
              $scope.selectedUsers = [];
              $scope.usersMapListWithObjects = [];
              angular.forEach($scope.userList, function (data) {
                $scope.usersMapListWithObjects[data.id] = data;
                $scope.UserDataAssigned = response.data.data;
              })
            })
            .catch(function onError(response) {
              console.log("error occured", response.status);
              commonDataShare.showErrorMessage(response);
            });
        }

        var getOrganisationList = function () {
          commonDataShare.getOrganisationList()
            .then(function onSuccess(response) {
              $scope.OrganisationList = response.data.data;
              $scope.selectedOrganisation = [];
              $scope.organisationMapListWithObjects = [];
              angular.forEach($scope.OrganisationList, function (data) {
                $scope.organisationMapListWithObjects.push(data);
                //$scope.UserDataAssigned = response.data.data;
              })
            })
            .catch(function onError(response) {
              console.log("error occured", response.status);
              commonDataShare.showErrorMessage(response);
            });
        }

        $scope.settingsForUsers = {
          enableSearch: true,
          keyboardControls: true, idProp: "id",
          template: '{{option.username}}', smartButtonTextConverter(skip, option) { return option; },
          showCheckAll: true,
          scrollableHeight: '300px', scrollable: true
        };
        $scope.selected_baselines_customTexts_users = { buttonDefaultText: 'Select Users' };
        $scope.eventsForUsers = {
          onItemSelect: function (item) {
          }
        }
        $scope.initialiseImportSheet = function () {
          getUsersList();
          getProposalCenters();
        }
        var getProposalCenters = function () {
          releaseCampaignService.getProposalCenters($scope.campaign_id)
            .then(function onSuccess(response) {
              $scope.centerData = response.data.data[0];
            }).catch(function onError(response) {
              console.log(response);
            })
        }
        $scope.importThroughSheet = function () {

          var token = $rootScope.globals.currentUser.token;
          if ($scope.file) {
            Upload.upload({
              url: constants.base_url + constants.url_base + "import-sheet-in-existing-campaign/",
              data: {
                file: $scope.file,
                is_import_sheet: true,
                proposal_id: $scope.campaign_id,
                center_id: $scope.centerData.id,
                invoice_number: '',
                tentative_start_date: '',
                tentative_end_date: '',
                assigned_by: $scope.assign.to,
                assigned_to: $scope.assign.to,
                data_import_type: "base-data"
              },
              headers: { 'Authorization': 'JWT ' + token }
            }).then(function onSuccess(response) {
              swal(constants.name, "Import sheet successfully", constants.success);
              window.location.reload();

            })
              .catch(function onError(response) {
                console.log(response);
              });
          }
        }

        $scope.changeStartDate = function (index) {
          $scope.options.minDate = new Date($scope.phases[index].start_date);
        }


        $scope.changeEndDate = function (index) {
          if ($scope.phases[index].start_date > $scope.phases[index].end_date) {
            $scope.phases[index].end_date = "";
          }
          $scope.options.minDate = new Date($scope.phases[index].start_date);
        }


        $scope.uploadFiles = function (file) {
          $scope.file = file;
        }
        $scope.addComment = function (commentType) {
          $scope.commentModal['shortlisted_spaces_id'] = $scope.supplierDataForComment.id;
          $scope.commentModal['related_to'] = commentType;
          releaseCampaignService.addComment($scope.campaign_id, $scope.commentModal)
            .then(function onSuccess(response) {
              $scope.commentModal = {};
              $scope.supplierDataForComment = undefined;
              $('#addComments').modal('hide');
              swal(constants.name, constants.add_data_success, constants.success);
            }).catch(function onError(response) {
              console.log(response);
            })
        }
        $scope.getSupplierForComments = function (supplier) {
          $scope.supplierDataForComment = supplier;
        }
        $scope.selectedCommentForView = {};
        $scope.viewComments = function (supplier, commentType) {
          $scope.supplierDataForComment = supplier;
          $scope.commentsData = {};
          if ($scope.selectedCommentForView.type == undefined) {
            $scope.selectedCommentForView.type = $scope.commentsType[0];
          }

          $scope.commentType = commentType;
          var relatedTo = commentType;
          var spaceId = $scope.supplierDataForComment.id;

          releaseCampaignService.viewComments($scope.campaign_id, spaceId, relatedTo)
            .then(function onSuccess(response) {
              $scope.commentModal = {};
              $scope.commentsData = response.data.data;
              $scope.viewInvForComments = Object.keys($scope.commentsData);
              $scope.selectedInvForView = $scope.viewInvForComments[0];
              $('#viewComments').modal('show');
            }).catch(function onError(response) {
              console.log(response);
            })
        }

        // Internal Comments to show in row
        var getAllComments = function () {
          $scope.allComments = {};
          releaseCampaignService.getAllComments($scope.campaign_id)
            .then(function onSuccess(response) {
              $scope.allComments = response.data.data;
              $scope.comments = {}
              var data = Object.keys($scope.allComments);
              for (var i = 0; i < data.length; i++) {
                var shortlisted_spaces_id = data[i];
                var comments = $scope.allComments[shortlisted_spaces_id].general;
                $scope.comments[shortlisted_spaces_id] = {}
                for (var j = 0; j < comments.length; j++) {
                  if (comments[j].related_to == 'INTERNAL') {
                    $scope.comments[shortlisted_spaces_id]['internal'] = {
                      comment: comments[j].comment,
                      username: comments[j].user_name,
                      created_on: comments[j].timestamp
                    }
                  } else {
                    $scope.comments[shortlisted_spaces_id]['external'] = {
                      comment: comments[j].comment,
                      username: comments[j].user_name,
                      created_on: comments[j].timestamp
                    }
                  }
                }
              }
            })
            .catch(function onError(error) {
              console.log('No comments to show');
            })
        }

        // Call get all comments
        getAllComments()

        $scope.customFreebies = [
          'WhatsApp Group',
          'Email',
          'Billing',
          'Announcements'
        ];
        $scope.addFreebies = function (freebiesData, rowIndex, index) {
          $scope.customfreebies.push(freebiesData);
          $scope.selectedRow = rowIndex;
        }
        $scope.deleteSupplier = function (id, index) {

          var data = [];
          data.push(id);
          releaseCampaignService.deleteSupplier(data)
            .then(function onSuccess(response) {
              $scope.releaseDetails.shortlisted_suppliers.splice(index, 1);
              $scope.$watch();
              swal(constants.name, constants.delete_success, constants.success);
            }).catch(function onError(response) {
              console.log(response);
            })
        }

        $scope.uploadImagePermission = function (file) {
          $scope.permissionBoxFile = file;
        }
        $scope.uploadImageReceipt = function (file) {
          $scope.ReceiptFile = file;
        }
        $scope.permissionBoxData = {};
        $scope.uploadPermissionBoxImage = function (supplier) {
          var token = $rootScope.globals.currentUser.token;
          if ($scope.permissionBoxFile) {
            cfpLoadingBar.start();
            Upload.upload({
              url: constants.base_url + constants.url_base + "hashtag-images/" + $scope.campaign_id + constants.upload_permission_box_image_url,
              data: {
                file: $scope.permissionBoxFile,
                'comment': supplier.permissionComment || '',
                'object_id': supplier.supplier_id,
                'hashtag': 'Permission Box',
                'campaign_name': $scope.releaseDetails.campaign.name,
                'supplier_name': supplier.name,
                'supplier_type_code': 'RS'
              },
              headers: { 'Authorization': 'JWT ' + token }
            }).then(function onSuccess(response) {
              supplier.permissionComment = '';
              cfpLoadingBar.complete();
              swal(constants.name, constants.image_success, constants.success);
            })
              .catch(function onError(response) {
                cfpLoadingBar.complete();
                console.log(response);
              });
          }
          else {
            swal(constants.name, "Max 2MB Supported, Your Image Size Exceeds", constants.warning);
          }
        }
        $scope.ReceiptData = {};
        $scope.uploadReceiptImage = function (supplier) {
          var token = $rootScope.globals.currentUser.token;
          if ($scope.ReceiptFile) {
            cfpLoadingBar.start();
            Upload.upload({
              url: constants.base_url + constants.url_base + "hashtag-images/" + $scope.campaign_id + constants.upload_receipt_url,
              data: {
                file: $scope.ReceiptFile,
                'comment': supplier.receiptComment || '',
                'object_id': supplier.supplier_id,
                'hashtag': 'Receipt',
                'campaign_name': $scope.releaseDetails.campaign.name,
                'supplier_name': supplier.name,
                'supplier_type_code': 'RS'
              },
              headers: { 'Authorization': 'JWT ' + token }
            }).then(function onSuccess(response) {
              supplier.receiptComment = '';
              cfpLoadingBar.complete();
              swal(constants.name, constants.image_success, constants.success);
            })
              .catch(function onError(response) {
                cfpLoadingBar.complete();
              });
          }
          else {
            swal(constants.name, "Max 2MB Supported, Your Image Size Exceeds", constants.warning);
          }
        }
        $scope.getPermissionBoxImages = function (supplier) {
          $scope.permissionImageSupplier = supplier;
          releaseCampaignService.getPermissionBoxImages($scope.campaign_id, supplier.supplier_id)
            .then(function onSuccess(response) {

              if (response.data.data.length) {
                angular.forEach(response.data.data, function (data) {
                  data['image_url'] = $scope.aws_campaign_images_url + data.image_path;
                })
              }
              $scope.perBoxImageData = response.data.data;
            }).catch(function onError(response) {
              console.log(response);
            })
        }
        $scope.getReceiptBoxImages = function (supplier) {
          $scope.receiptImageSupplier = supplier;
          releaseCampaignService.getReceiptBoxImages($scope.campaign_id, supplier.supplier_id)
            .then(function onSuccess(response) {
              if (response.data.data.length) {
                angular.forEach(response.data.data, function (data) {
                  data['image_url'] = $scope.aws_campaign_images_url + data.image_path;
                })
              }
              $scope.perReceiptImageData = response.data.data;
            }).catch(function onError(response) {
              console.log(response);
            })
        }
        $scope.changeInventoryInDays = function (supplier, inv, filter) {
          angular.forEach(supplier.shortlisted_inventories[inv].detail, function (data) {
            data.inventory_number_of_days = filter.days;
          })
        }

        $scope.changeInventory = function (key, filter, index) {
          $scope.releaseDetails.shortlisted_suppliers[index].shortlisted_inventories[key].total_count = filter.inventoryCount;
        }


        //Start: Inventory count update
        // $scope.getInventoryRelatedData = function (supplier, key,index) {
        //   $scope.adInvModel.index = index;
        //   $scope.adInvModel.campaign_id = supplier.proposal;
        //   $scope.adInvModel.supplier_id = supplier.supplier_id;
        //   $scope.shortlistedSupplierData = supplier;
        //   auditReleasePlanService.getInventoryRelatedData()
        //     .then(function onSuccess(response) {
        //       $scope.adInventoryTypes = [];
        //       var adInventoryTypesData = response.data.data.inventory_types;
        //       // console.log('+++++++++++----------------', $scope.adInventoryTypes);
        //       if (adInventoryTypesData.length > 0) {
        //         for (let i in adInventoryTypesData) {
        //           if (adInventoryTypesData[i].adinventory_name == key) {
        //             $scope.adInventoryTypes.push(adInventoryTypesData[i]);
        //           }

        //         }
        //       }
        //       $scope.durationTypes = response.data.data.duration_types;
        //     }).catch(function onError(response) {
        //       console.log(response);
        //     })
        // }


        // $scope.adInvModel = {};
        // $scope.addAdInventoryIds = function () {
        //   $scope.adInvModel['space_id'] = $scope.shortlistedSupplierData.id;

        //   auditReleasePlanService.addAdInventoryIds($scope.adInvModel)
        //     .then(function onSuccess(response) {

        //       $scope.releaseDetails.shortlisted_suppliers[$scope.adInvModel.index].shortlisted_inventories = response.data.data;

        //       $('#addInventoryModal').on('hide.bs.modal', function () { });

        //          swal({
        //         title: "",
        //         text: constants.add_data_success,
        //         type: "success",
        //         confirmButtonText: "ok",
        //       },
        //         function (isConfirm) {
        //           if (isConfirm) {
        //             $scope.adInvModel = {};
        //           }
        //         }
        //       );
        //     }).catch(function onError(response) {
        //       console.log(response);
        //       swal(constants.name, constants.save_error, constants.error);
        //     })
        // }

        //End: Inventory count update




        $scope.StallOptions = [
          "Near Entry Gate",
          "Near Exit Gate",
          "In Front of Tower",
          "Near Garden",
          "Near Play Area",
          "Near Club House",
          "Near Swimming Pool",
          "Near Parking Area",
          "Near Shopping Area",
        ];
        $scope.SunboardOptions = [
          "Near Entry Gate",
          "Near Exit Gate",
          "In Front of Tower",
          "Near Garden",
          "Near Play Area",
          "Near Club House",
          "Near Swimming Pool",
          "Near Parking Area",
          "Near Shopping Area",
        ];
        $scope.FreebiesOptions = [
          "Whatsapp Group",
          "Email Group",
          "Building ERP",
          "Door To Door",
        ];
        $scope.changePhase = function (supplier) {
          if (supplier.booking_status == 'NB') {
            supplier.phase_no = '';
          }
        }
        $scope.setUserSupplier = function (supplier) {
          $scope.userSupplierData = supplier;
        }
        $scope.setUserForBooking = function () {
          $scope.societySupplierName = $scope.userSupplierData.supplierName;
          var data = {
            assigned_by: $scope.userInfo.id,
            assigned_to_ids: [parseInt($scope.userData.user)],
            campaign_id: $scope.campaign_id,
            supplier_id: $scope.userSupplierData.supplier_id,
            supplierName: $scope.userSupplierData.name,
          }
          $scope.societySupplierName = data.supplierName;
          releaseCampaignService.setUserForBooking(data)
            .then(function onSuccess(response) {
              // swal(constants.name, constants.assign_success, constants.success)
              // location.reload();

              swal({
                title: "",
                text: constants.assign_success,
                type: "success",
                confirmButtonText: "ok",
              },
                function (isConfirm) {
                  if (isConfirm) {
                    // location.reload();
                  }
                }
              );
            })
            .catch(function onError(error) {
              console.log(error);
            });
        }
        var getAssignedSuppliers = function () {
          releaseCampaignService.getAssignedSuppliers($scope.campaign_id, $scope.userInfo.id)
            .then(function onSuccess(response) {
              $scope.assignedSuppliers = [];
              var assignedSuppliers = response.data.data;
              var assignedSuppliersMap = {};
              // var assignedUserMap = {};
              $scope.assignedUserList = []
              for (var i = 0, l = assignedSuppliers.length; i < l; i += 1) {
                assignedSuppliersMap[assignedSuppliers[i].supplier_id] = $scope.UserDataAssigned
                // var assignedUserMap = {};
                for (var j = 0; j < $scope.UserDataAssigned.length; j++) {
                  if (assignedSuppliers[i].assigned_to == $scope.UserDataAssigned[j].id) {
                    var username = $scope.UserDataAssigned[j].username;
                    var userId = $scope.UserDataAssigned[j].id;
                    $scope.assignedUserList.push({
                      supplier_id: assignedSuppliers[i].supplier_id,
                      username: username,
                      updated_at: assignedSuppliers[i].updated_at,
                      id: userId
                    })
                  }
                }
              }
              for (var i = 0, l = $scope.initialReleaseData.shortlisted_suppliers.length; i < l; i += 1) {
                if (assignedSuppliersMap[$scope.initialReleaseData.shortlisted_suppliers[i].supplier_id]) {
                  $scope.assignedSuppliers.push($scope.initialReleaseData.shortlisted_suppliers[i]);
                }
              }

            }).catch(function onError(response) {
              console.log(response);
            })
        }
        var formatData = function () {


          angular.forEach($scope.releaseDetails.shortlisted_suppliers, function (supplier, key) {
            $scope.mapViewLat = supplier.latitude;
            $scope.mapViewLong = supplier.longitude;
            if (!supplier.stall_locations) {
              supplier.stall_locations = [];
            }


          })


          setDataToModel($scope.releaseDetails.shortlisted_suppliers);
          $scope.loading = true;
          angular.forEach($scope.releaseDetails.shortlisted_suppliers, function (supplier) {
            $scope.shortlistedSuppliersIdList[supplier.supplier_id] = supplier;
          })
        }
        $scope.changeSupplierData = function () {
          $scope.selectedUser = {};
          $scope.datePicker.date = {};
          supplierIdForSearch = undefined;
          var document = angular.element('#searchId');
          document[0].value = '';
          $scope.getFilteredResult();
        }

        var searchSupplierBySelection = function () {
          releaseCampaignService.searchSupplierBySelection($scope.campaign_id)
            .then(function onSuccess(response) {
              $scope.allShortlistedSuppliers = response.data.data;
            }).catch(function onError(response) {
              console.log(response);
            })
        }
        searchSupplierBySelection();

        $scope.getSearchedSupplierData = function (supplier) {
          supplierIdForSearch = supplier.supplier_id;
          // getResultsPage(1);
        }

        $scope.initTable = function () {
          var tableOffset = $(".table-suppliers").offset().top;
          var $header = $(".table-suppliers > thead");

          $(window).bind("scroll", function () {
            var offset = $(this).scrollTop();

            if (offset >= tableOffset - 65) {
              $header.css({
                position: 'fixed',
                top: '65px',
                'z-index': 1000,
              });
            }
            else if (offset < tableOffset) {
              $header.css('position', 'static');
            }
          });

          $('.table-wrapper').scroll(function () {
            if ($header.width() > $(this).scrollLeft()) {
              $header.css('left', '-' + $(this).scrollLeft() + 'px');
            }
          });
        };

        var getHashTagImages = function () {
          releaseCampaignService.getHashTagImages($scope.campaign_id)
            .then(function onSuccess(response) {
              $scope.hashtagImages = response.data.data;
              $scope.permissionBoxImages = [];
              $scope.receiptImages = [];
              for (var i = 0; i < $scope.hashtagImages.length; i++) {
                if ($scope.hashtagImages[i].permission_box) {
                  $scope.permissionBoxImages.push($scope.hashtagImages[i].permission_box)
                }
                if ($scope.hashtagImages[i].receipt) {
                  $scope.receiptImages.push($scope.hashtagImages[i].receipt)
                }
              }
            }).catch(function onError(response) {
              console.log(response);
            })
        }
        getHashTagImages();

        $scope.getFilteredResult = function () {
          getResultsPage(1);
        }

        $scope.completionStatus = function (idOfSupplier) {
          let indexOfSupplier = $scope.releaseDetails.shortlisted_suppliers.findIndex(x => x.id === idOfSupplier);
          if ($scope.releaseDetails.shortlisted_suppliers[indexOfSupplier].booking_status !== "BK" && $scope.releaseDetails.shortlisted_suppliers[indexOfSupplier].booking_status !== "MC") {
            swal(constants.name, constants.booking_completion_status, constants.warning);
            $scope.releaseDetails.shortlisted_suppliers[indexOfSupplier].is_completed = false;
          }
        }




        // Check for internal comments
        var userInfo = JSON.parse($window.localStorage.userInfo);
        var userEmail = userInfo.email;
        $scope.canViewInternalComments = false;
        if (userEmail.includes('machadalo')) {
          $scope.canViewInternalComments = true;
        }

        var getSuppliersOfCampaignWithStatus = function () {
          var reqData = {
            "data_scope": {
              "1": {
                "category": "unordered",
                "level": "campaign",
                "match_type": 0,
                "values": {
                  "exact": [
                    $scope.campaign_id
                  ]
                },
                "value_type": "campaign"
              }
            },
            "data_point": {
              "category": "unordered",
              "level": [
                "supplier",
                "campaign"
              ]
            },
            "raw_data": [
              "lead",
              "hot_lead",
              "flat",
              "cost_flat",
              "hotness_level_2",
              "total_booking_confirmed",
              "total_orders_punched"
            ],
            "metrics": [["1", "3", "/"], ["m1", 100, "*"], ["2", "3", "/"], ["m3", 100, "*"], ["5", "3", "/"],
            ["m5", 100, "*"], ["6", "3", "/"], ["m7", 100, "*"], ["7", "3", "/"], ["m9", 100, "*"], ["4", "1", "/"],
            ["4", "2", "/"], ["4", "5", "/"], ["4", "6", "/"], ["4", "7", "/"],
            ["3", "4", "*"], ["m16", "1", "/"], ["m16", "2", "/"], ["m16", "6", "/"], ["m16", "7", "/"]],

            "statistical_information": {
              "stats": [
                "z_score"
              ],
              "metrics": [
                "m1",
                "m3"
              ]
            },
            "higher_level_statistical_information": {
              "level": [
                "campaign"
              ],
              "stats": [
                "frequency_distribution",
                "weighted_mean",
                "variance_stdev"
              ],
              "metrics": [
                "m2",
                "m4"
              ]
            }
          }
          releaseCampaignService.getSuppliersOfCampaignWithStatus(reqData)
            .then(function onSuccess(response) {
              allSuppliersById = {};
              angular.forEach(response.data.data.lower_group_data, function (supplier) {
                allSuppliersById[supplier.supplier] = supplier;
              })

              mapLeadsWithSuppliers();
            }).catch(function onError(response) {
              console.log(response);

            })
        }
        getSuppliersOfCampaignWithStatus();
        var mapLeadsWithSuppliers = function () {
          if (Object.keys(allSuppliersById).length && $scope.releaseDetails &&
            $scope.releaseDetails.shortlisted_suppliers.length) {
            angular.forEach($scope.releaseDetails.shortlisted_suppliers, function (supplier) {
              supplier['leads_data'] = allSuppliersById[supplier.supplier_id];
            })
          }
        }

        $scope.getFiltersCount = function (supplier) {
          var keys = Object.keys(supplier.shortlisted_inventories);
          return keys.length;
        }

      }]);//Controller function ends here