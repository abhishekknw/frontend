
angular.module('catalogueApp')
  .controller('ReleaseCampaignCtrl',
    ['$scope', '$rootScope', '$window', '$location', 'releaseCampaignService', 'userService', 'createProposalService', 'auditReleasePlanService', '$stateParams', 'permissions', 'Upload', 'cfpLoadingBar', 'constants', 'mapViewService', '$timeout', 'commonDataShare',
      function ($scope, $rootScope, $window, $location, releaseCampaignService, userService, createProposalService, auditReleasePlanService, $stateParams, permissions, Upload, cfpLoadingBar, constants, mapViewService, $timeout, commonDataShare) {
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
          { name: 'Not Initiated', code: 'NI' },
          { name: 'Complete Lockdown', code: 'LCL' },
          { name: 'Partial Lockdown', code: 'LPL' },
          { name: 'Open Lockdown', code: 'LOL' },
          { name: 'Emergency System', code: 'LES' },
          { name: 'Essential Required', code: 'LMR' },
          { name: 'Medicine Required', code: 'LER' },
          { name: 'Vegetables & Fruits Required', code: 'LVR' },
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

        $scope.requirement_Given = { 'yes': 'Yes', 'no': 'No' };
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
          // { header: 'Contact Type' },
          { header: 'Name' },
          { header: 'Designation' },
          { header: 'Email' },
          { header: 'Relationship Status' },
          { header: 'Comments' },
          // { header: 'STD Code' },
          { header: 'Landline No' },
          { header: 'Mobile No' },
          { header: 'Remove' },

        ];

        $scope.requirement_submitted_headings = [
          { header: '' },
          { header: 'Sector' },
          { header: 'Sub Sector' },
          { header: 'Current Partner' },
          { header: 'FeedBack' },
          { header: 'Preferred Partner' },
          { header: 'L4 Answers' },
          { header: 'L5 Answers' },
          { header: 'L6 Answers' },
          { header: 'L4.1 Answers' },
          { header: 'L5.1 Answers' },
          { header: 'L6.1 Answers' },
          { header: 'Implementation Time' },
          { header: 'Meeting Time' },
          // { header: 'Preferred Meeting Time' },
          { header: 'Lead Status' },
          { header: 'Comment' },
          { header: 'Internal Comment' },
          { header: 'Lead Given by' },
          { header: 'Call Back Time' },
          { header: 'Price' },
          { header: 'Timestamp' },
          { header: 'Action' },
        ];

        $scope.bdrequirement_submitted_headings = [
          { header: '' },
          { header: 'Sector' },
          { header: 'Sub Sector' },
          { header: 'Current Partner' },
          { header: 'FeedBack' },
          { header: 'Preferred Partner' },
          { header: 'L1 Answers' },
          { header: 'L2 Answers' },
          { header: 'Implementation Time' },
          { header: 'Meeting Time' },
          // { header: 'Preferred Meeting Time' },
          { header: 'Lead Status' },
          { header: 'Comment' },
          { header: 'Lead Given by' },
          { header: 'Timestamp' },
          { header: 'Lead Price (Points)' },
          { header: 'Hotness of Lead' },
          { header: 'Client Status' },
          { header: 'Action' },
        ];

        $scope.requirement_sub_headings = [
          { header: '' },
          { header: 'Sub Sector' },
          { header: 'Current Partner' },
          { header: 'Preferred Partner' },
          { header: 'Lead For' },
          { header: 'Implementation Time' },
          { header: 'Meeting Time' },
          //  { header: 'Preferred Meeting Time' },
          { header: 'Lead Status' },
          { header: 'Lead Given by' },
          { header: 'Comment' },
          { header: 'Timestamps' },
          { header: 'Satisfaction Level' },
          { header: 'Reason' },
          { header: 'Action' },
        ];

        $scope.requirement_browsed_headings = [
          { header: '' },
          { header: 'Sector' },
          { header: 'Sub Sector' },
          { header: 'Current Partner' },
          { header: 'FeedBack' },
          { header: 'Preferred Partner' },
          // { header: 'Lead for' },
          { header: 'L1 Answers' },
          { header: 'L2 Answers' },
          { header: 'Implementation Time' },
          { header: 'Meeting Time' },
          // { header: 'Preferred Meeting Time' },
          // { header: 'Lead Status' },
          { header: 'Lead Given by' },
          { header: 'Comment' },
          { header: 'Timestamps' },
          // { header: 'Satisfaction Level' },
          // { header: 'Reason' },
          // { header: 'Action' },
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

        $scope.categorylist = ['Ultra High', 'High', 'Medium High', 'Medium', 'Standard'],
          $scope.assignUserData = {
            campaign_id: '',
          }


        $scope.Relationship_Status = constants.relationship_status;
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

        $scope.requirement_lead_status = constants.requirement_lead_status;
        $scope.requirement_implementation_time = constants.requirement_implementation_time;
        $scope.requirement_meeting_time = constants.requirement_meeting_time;
        $scope.hotnessLead = constants.hotnessLead;
        $scope.clientStatus = constants.clientStatus;
        $scope.current_patner_feedback = constants.current_patner_feedback;
        $scope.call_back_time = constants.call_back_time;

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
          $scope.sno = ((newPage - 1) * 10);
          getResultsPage(newPage);
        };
        var assigned = 0;
        var supplierIdForSearch;
        var getResultsPage = function (newPage) {
          var data = getFilterData();
          if (!$scope.sno) {
            $scope.sno = 0
          }
          if ($scope.master_data_status) {
            releaseCampaignService.bookingStatusData($scope.campaign_id)
              .then(function onSuccess(ResponseData) {
                $scope.bookingStatus = ResponseData.data.data;
              });
          }
          // $scope.releaseDetails = [];
          releaseCampaignService.getCampaignReleaseDetails($scope.campaign_id, newPage, data)
            .then(function onSuccess(response) {
             
              if ($scope.master_data_status) {
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
              }

              // releaseCampaignService.bookingStatusData($scope.campaign_id)
              // .then(function onSuccess(ResponseData) {
              //   $scope.bookingStatus = ResponseData.data.data

              // });


              if ($scope.master_data_status) {
                getUsersList();
                getAssignedSuppliers();
                getOrganisationList();
              }

             var responsedata = response.data.data

              $scope.initialReleaseData = Object.assign({}, responsedata);
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

                if ($scope.initialReleaseData.shortlisted_suppliers[i].last_call_date) {
                  $scope.initialReleaseData.shortlisted_suppliers[i].last_call_date = new Date($scope.initialReleaseData.shortlisted_suppliers[i].last_call_date);
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

                var localindex_index = $scope.bookingStatus.map(function (el) {
                  return el.code;
                }).indexOf($scope.initialReleaseData.shortlisted_suppliers[i].booking_status);
                if (localindex_index != -1) {
                  $scope.initialReleaseData.shortlisted_suppliers[i].meeting_status = $scope.bookingStatus[localindex_index].booking_substatus;
                }

              }

               $scope.releaseDetails = {};

              if ($scope.initialReleaseData) {
                var iniData = $scope.initialReleaseData;
                $scope.releaseDetails = Object.assign({}, iniData);
               
                // if ($scope.releaseDetails.shortlisted_suppliers.length) {
                //   for (let i in $scope.releaseDetails.shortlisted_suppliers.length) {

                //   }
                // }
                $scope.releaseDetailsData = $scope.releaseDetails.campaign.centerData;
                var centerSuppliers = $scope.releaseDetails.campaign.centerSuppliers;
            
                $scope.supplier_names = [];
                if (centerSuppliers) {
              
                  if($scope.releaseDetails.campaign.type_of_end_customer_formatted_name == 'b_to_b_r_g' || $scope.releaseDetails.campaign.type_of_end_customer_formatted_name == 'b_to_b_l_d'){
                    $scope.supplier_names = [{name: 'Residential Society', code: 'RS'},
                    {name: 'Educational Institute', code: 'EI'},
                    {name: 'Corporates', code: 'CO'},
                    {name: 'Hospital', code: 'HL'},
                  ]
                  } else {
                  
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

                    } else if (centerSuppliers[i].supplier_type_code == 'BU') {
                      $scope.supplier_names.push({ name: 'Bus', code: 'BU' });
                    } else if (centerSuppliers[i].supplier_type_code == 'CO') {
                      $scope.supplier_names.push({ name: 'Corporates', code: 'CO' });
                    } else if (centerSuppliers[i].supplier_type_code == 'EI') {
                      $scope.supplier_names.push({ name: 'Educational Institute', code: 'EI' });
                    } else if (centerSuppliers[i].supplier_type_code == 'GN') {
                      $scope.supplier_names.push({ name: 'Gantry', code: 'GN' });
                    } else if (centerSuppliers[i].supplier_type_code == 'HL') {
                      $scope.supplier_names.push({ name: 'Hospital', code: 'HL' });
                    } else if (centerSuppliers[i].supplier_type_code == 'HO') {
                      $scope.supplier_names.push({ name: 'Hording', code: 'HO' });
                    } else if (centerSuppliers[i].supplier_type_code == 'IR') {
                      $scope.supplier_names.push({ name: 'In-shop Retail', code: 'IR' });
                    } else if (centerSuppliers[i].supplier_type_code == 'RC') {
                      $scope.supplier_names.push({ name: 'Radio Channel', code: 'RC' });
                    } else if (centerSuppliers[i].supplier_type_code == 'TV') {
                      $scope.supplier_names.push({ name: 'TV Channel', code: 'TV' });
                    }
                  }
                }

                  if (centerSuppliers.length == 0) {
                    $scope.supplier_names.push({ name: 'ALL', code: 'ALL' });
                  }

                  if ($scope.supplier_names.length == 1 && $scope.releaseDetails.campaign.type_of_end_customer_formatted_name != 'b_to_b_r_g' && $scope.releaseDetails.campaign.type_of_end_customer_formatted_name != 'b_to_b_l_d') {
                    $scope.selectedUser.supplier_type_filter_selected = $scope.supplier_names[0].name;
                    $scope.selectedUser.supplier_type_filter = $scope.supplier_names[0].code;
                  }

                  if ($scope.selectedUser.supplier_type_filter == 'RE') {
                    $scope.categorylist = ['Small', 'Medium', 'Large', 'Very Large', 'Super']
                  } else if ($scope.selectedUser.supplier_type_filter == 'SA') {
                    $scope.categorylist = ['High', 'Medium', 'Standard']
                  } else if (!$scope.selectedUser.supplier_type_filter || $scope.selectedUser.supplier_type_filter == 'ALL') {
                    $scope.categorylist = ['Ultra High', 'High', 'Medium High', 'Medium', 'Standard', 'Small', 'Large', 'Very Large', 'Super']
                  } else {
                    $scope.categorylist = ['Ultra High', 'High', 'Medium High', 'Standard']
                  }

                }
                let supplier = $scope.releaseDetails.shortlisted_suppliers;
                for(let q in supplier){
                  if ($scope.releaseDetails.campaign.type_of_end_customer_formatted_name == "b_to_b_r_g" || $scope.releaseDetails.campaign.type_of_end_customer_formatted_name == 'b_to_b_l_d') {
                    if (supplier[q].color_code == 1) {
                      supplier[q].color_class =  'yellow';;
                    }
                    else if (supplier[q].color_code == 2) {
                      supplier[q].color_class = '#7C4700';
                    }
                    else if (supplier[q].color_code == 3) {
                      supplier[q].color_class = 'green';
                    }
                    else if (supplier[q].color_code == 4) {
                      supplier[q].color_class = 'white';
                    }
                    else if (supplier[q].color_code == 5) {
                      supplier[q].color_class = 'red';
                    }
                  }
                  else {
                    if (supplier[q].booking_status === 'BK' || supplier[q].booking_status === 'MC') {
                      supplier[q].color_class = 'green';
                    }
                    else if (supplier[q].booking_status === 'UN' || supplier[q].booking_status === 'NI' || supplier[q].booking_status === 'NE') {
                      supplier[q].color_class = 'white';
                    }
                    else if (supplier[q].booking_status === 'SR') {
                      supplier[q].color_class = 'red';
                    }
                    else if (supplier[q].booking_status === 'DP' || supplier[q].booking_status === 'TB' || supplier[q].booking_status === 'MF' || supplier[q].booking_status === 'RE') {
                      supplier[q].color_class = 'yellow';
                    }
                    else if (supplier[q].booking_status) {
                      supplier[q].color_class = 'brown';
                    }
                  }
                }

                // setDataToModel($scope.releaseDetails.shortlisted_suppliers);
                mapLeadsWithSuppliers();
                $scope.loading = !!response;

                $scope.master_data_status = false;
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
        $scope.master_data_status = true;
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
          if ($scope.selectedUser.supplier_type_filter == 'RE') {
            $scope.categorylist = ['Small', 'Medium', 'Large', 'Very Large', 'Super']
          } else if ($scope.selectedUser.supplier_type_filter == 'SA') {
            $scope.categorylist = ['High', 'Medium', 'Standard']
          } else if ($scope.selectedUser.supplier_type_filter == '') {
            $scope.categorylist = ['Ultra High', 'High', 'Medium High', 'Medium', 'Standard', 'Small', 'Large', 'Very Large', 'Super']
          } else {
            $scope.categorylist = ['Ultra High', 'High', 'Medium High', 'Standard']
          }

        }

        $scope.setPhase = function (supplier, id) {
          supplier.phase_no = id;
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

          if (supplier.supplier_code == 'RE' || supplier.supplier_code == 'HO' || supplier.supplier_code == 'BS') {
            $scope.Contact_Type = constants.retail_shop_contact_type;
          } else if (supplier.supplier_code == 'CP') {
            $scope.Contact_Type = constants.corporate_contact_type;
          } else if (supplier.supplier_code == 'SA' || supplier.supplier_code == 'GY') {
            $scope.Contact_Type = constants.salon_contact_type;
          } else {
            $scope.Contact_Type = constants.society_contact_type;
          }
          // else if(supplier.supplier_code == 'RS' || supplier.supplier_code == 'SYN'){
          //   $scope.Contact_Type = constants.society_contact_type;
          // } 

          $scope.payment = supplier;
          if ($scope.payment && $scope.payment.contacts) {
            for (let i in $scope.payment.contacts) {
              $scope.payment.contacts[i].landline = JSON.parse($scope.payment.contacts[i].landline);
            }
          }
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
          if ($scope.releaseDetails.campaign.brand == "multi_brand") {
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

        $scope.detailedShow = [];
        $scope.ShowDetailed = function (index) {
          $scope.oldIndex = index;
          $scope.$watch('oldIndex', function (newValue, oldValue) {
            if (newValue != oldValue) {
              $scope.detailedShow[oldValue] = false
            }
          });
          $scope.detailedShow[index] = !$scope.detailedShow[index];
          $scope.opsVerifyButtonDiable = true
          $scope.removeSubSectorDiable = true
          $scope.updateDisable = false;
          for (let i in $scope.requirementDetailData[index].requirements) {
            $scope.requirementDetailData[index].requirements[i].requirementCheck = false;
            if ($scope.opsVerifyButtonDiable && $scope.requirementDetailData[index].requirements[i].varified_ops == 'no') {
              $scope.opsVerifyButtonDiable = false;
            }
            if ($scope.removeSubSectorDiable && $scope.requirementDetailData[index].requirements[i].is_deleted == 'no') {
              $scope.removeSubSectorDiable = false;
            }

            if (!$scope.updateDisable && $scope.requirementDetailData[index].requirements[i].is_deleted == 'yes') {
              $scope.updateDisable = true;
            }

         

          }

          $scope.subSectorCheck = true
        }
        $scope.bddetailedShow = [];
        $scope.bdShowDetailed = function (index){
          $scope.oldIndex = index;
          $scope.$watch('oldIndex', function (newValue, oldValue) {
            if (newValue != oldValue) {
              $scope.bddetailedShow[oldValue] = false
            }
          });
          $scope.bddetailedShow[index] = !$scope.bddetailedShow[index];
        }
        $scope.sites = ['a', 'b', 'c']


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
          $scope.search = {};
          $scope.errorMsg = "";
        }


        //Start: function to select center at add more suplliers
        $scope.selectCenter = function (center_index) {

          $scope.supplierData = [];
          $scope.search = {};
          $scope.center_areas = {};
          $scope.centers.area = "";
          $scope.supplier_center = null
          $scope.errorMsg = "";
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
          $scope.center_areas.sub_areas = "";
          $scope.sub_areas = {};
          $scope.centers.sub_area_id = "";
          $scope.errorMsg = "";

          $scope.supplierData = [];
          $scope.search = {};
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
          $scope.search = {};
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
                if (response) {
                  // $scope.releaseDetails.shortlisted_suppliers = [];
                  //   $scope.releaseDetails.shortlisted_suppliers = response.data.data;
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
          $scope.relationhipStatusData = supplier;
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
        $scope.checkContactDetails = function () {
          $scope.contactArray = [];
          for (let i = 0; i <= $scope.payment.contacts.length; i++) {
            if ($scope.payment.contacts[i] && $scope.payment.contacts[i].name) {
              $scope.contactArray.push($scope.payment.contacts[i])
            }

          }
          $scope.payment.contacts = $scope.contactArray;
          $scope.saveContactDetails();

        }

        $scope.saveContactDetails = function () {
          if ($scope.payment.contacts.length > 0) {
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

        $scope.addPoc = function(){
          console.log('**********************',$scope.pocModel);
          var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
            return el.id;
          }).indexOf($scope.shortlisted_spaces_id);
          if (localindex_index != -1) {
            $scope.releaseDetails.shortlisted_suppliers[localindex_index].contacts = $scope.pocModel;
            }
            console.log('222222222222222222222222222222222',$scope.releaseDetails.shortlisted_suppliers[localindex_index]);
            releaseCampaignService.saveContactDetails($scope.releaseDetails.shortlisted_suppliers[localindex_index], $scope.releaseDetails.shortlisted_suppliers[localindex_index].supplier_id)
            .then(function onSuccess(response) {
              swal(constants.name, constants.add_data_success, constants.success);
            }).catch(function onError(response) {
              console.log(response);
            })
          }

        $scope.removeContact = function (index) {
          swal({
            title: 'Are you sure ?',
            text: 'Remove contact',
            type: constants.warning,
            showCancelButton: true,
            confirmButtonClass: "btn-success",
            confirmButtonText: "Yes, Remove!",
            closeOnConfirm: true
          },
            function (confirm) {
              if (confirm) {
                $scope.$apply(function () {
                  $scope.payment.contacts.splice(index, 1);
                });

              }

            });
        }

        $scope.addPocField = function () {
          $scope.pocModel.push({
            'mobile':'',
            'name':'',
            'contact_type':''
          });
        }
  
        $scope.removePocField = function (index) {
          $scope.pocModel.splice(index,1)
        }

        $scope.opsVerifyButtonDiable = true;
        $scope.getRequirementDetail = function (id, suppleName,supplier) {
          if (supplier.supplier_code == 'RE' || supplier.supplier_code == 'HO' || supplier.supplier_code == 'BS') {
            $scope.poc_designation = constants.retail_shop_contact_type;
          } else if (supplier.supplier_code == 'CP') {
            $scope.poc_designation = constants.corporate_contact_type;
          } else if (supplier.supplier_code == 'SA' || supplier.supplier_code == 'GY') {
            $scope.poc_designation = constants.salon_contact_type;
          } else {
            $scope.poc_designation = constants.society_contact_type;
          }

          // if(supplier.supplier_code == 'RS'){
          //   $scope.poc_designation = constants.designation_society;
          // }else if(supplier.supplier_code == 'CP'){
          //   $scope.poc_designation = constants.designation_corporate;
          
          // }else if(supplier.supplier_code == 'GY' || supplier.supplier_code == 'SA'){
          //   $scope.poc_designation = constants.designation_saloon;
          
          // } else if(supplier.supplier_code == 'EI' || supplier.supplier_code == 'GN'){
          //   $scope.poc_designation = constants.designation_gantry;
          // } else {
          //   $scope.poc_designation = constants.designation_bus_shelter;
          // }
          $scope.pocModel = supplier.contacts;
          if($scope.oldIndex){
            $scope.detailedShow[$scope.oldIndex] = false
          }
          $scope.otherPreferredCompany = false;
          $scope.disableRestore = false
          $scope.supplierName = suppleName;
          $scope.shortlisted_spaces_id = id

          userService.getSector()
            .then(function onSuccess(response) {
              $scope.sectorList = response.data;
            })
          releaseCampaignService.requirementDetail(id)
            .then(function onSuccess(response) {
              $scope.requirementDetailData = response.data.data.requirements;
              $scope.companiesDetailData = response.data.data.companies;
              console.log($scope.requirementDetailData);
              console.log($scope.companiesDetailData);
              for (let k in $scope.companiesDetailData) {
                $scope.companiesDetailData[k].id = $scope.companiesDetailData[k].organisation_id;
                $scope.companiesDetailData[k].label = $scope.companiesDetailData[k].name;
                if (k == response.data.data.companies.length - 1) {
                  $scope.companiesDetailData.push({ id: 'other', label: 'other', organisation_id: '', name: 'other' })
                }
              }


              angular.forEach($scope.requirementDetailData, function (value, i) {
                //start multiselect preferred company
                // var selected_preferred_company = [];
                // $scope.requirementDetailData[i].selected_preferred_company = [];
                // if ($scope.requirementDetailData[i] && $scope.requirementDetailData[i].preferred_company && $scope.requirementDetailData[i].preferred_company.length > 0) {
                //   for (let j in $scope.requirementDetailData[i].preferred_company) {
                //     var localindex_index = $scope.companiesDetailData.map(function (el) {
                //       return el.organisation_id;
                //     }).indexOf($scope.requirementDetailData[i].preferred_company[j]);
                //     if (localindex_index != -1) {
                //       selected_preferred_company.push($scope.companiesDetailData[localindex_index])
                //     }
                //   }
                //   $scope.requirementDetailData[i].selected_preferred_company = selected_preferred_company
                // }
                //end multiselect preferred company
                //START sub sector multiselect preferred company
                if ($scope.requirementDetailData[i].requirements.length > 0) {
                  for (let x in $scope.requirementDetailData[i].requirements) {
                    if (!$scope.requirementDetailData[i].requirements[x].current_company) {
                      $scope.requirementDetailData[i].requirements[x].current_company = '';
                    }
                    var selected_preferred_company_sub_sector = [];
                    $scope.requirementDetailData[i].requirements[x].selected_preferred_company_sub_sector = [];

                    if ($scope.requirementDetailData[i].requirements[x].preferred_company_other) {
                      $scope.otherPreferredCompany = true
                      $scope.requirementDetailData[i].requirements[x].otherPreferredCompany = true
                      $scope.requirementDetailData[i].requirements[x].preferred_company.push("")
                    }
       
                    if ($scope.requirementDetailData[i].requirements[x].preferred_company && $scope.requirementDetailData[i].requirements[x].preferred_company.length > 0) {
                      for (let y in $scope.requirementDetailData[i].requirements[x].preferred_company) {

                        var _index = $scope.companiesDetailData.map(function (el) {
                          return el.organisation_id;
                        }).indexOf($scope.requirementDetailData[i].requirements[x].preferred_company[y]);
                        if (_index != -1) {
                          selected_preferred_company_sub_sector.push($scope.companiesDetailData[_index])
                        }
                      }
  
                      $scope.requirementDetailData[i].requirements[x].selected_preferred_company_sub_sector = selected_preferred_company_sub_sector;
                    }

                    var _indexCompany = $scope.companiesDetailData.map(function (el) {
                      return el.organisation_id;
                    }).indexOf($scope.requirementDetailData[i].requirements[x].company);
                    if (_indexCompany != -1) {
                      $scope.requirementDetailData[i].requirements[x].company_name = $scope.companiesDetailData[_indexCompany].name;
                    }

                    // if ($scope.opsVerifyButtonDiable && $scope.requirementDetailData[i].requirements[x].varified_ops == 'no') {
                    //   $scope.opsVerifyButtonDiable = false;
                    // }

                    $scope.requirementDetailData[i].requirements[x].color_class = 'yellow'
                    if ($scope.requirementDetailData[i].requirements[x].varified_ops == 'yes') {
                      $scope.requirementDetailData[i].requirements[x].color_class = 'green'
                    }

                    if ($scope.requirementDetailData[i].requirements[x].is_deleted == 'yes') {
                      $scope.requirementDetailData[i].requirements[x].color_class = 'red'
                    }


                    //start sub sector name
                    if ($scope.requirementDetailData[i].requirements[x].sub_sector) {
                      if ($scope.sectorList) {
                        for (let p in $scope.sectorList) {
                          if ($scope.sectorList[p].subtypes && $scope.sectorList[p].subtypes.length > 0) {
                            var sub_index = $scope.sectorList[p].subtypes.map(function (el) {
                              return el.id;
                            }).indexOf($scope.requirementDetailData[i].requirements[x].sub_sector);
                            if (sub_index != -1) {
                              $scope.requirementDetailData[i].requirements[x].sub_sector_name = $scope.sectorList[p].subtypes[sub_index].business_sub_type;
                            }
                          }
                        }
                        //end sub sector name
                      }
                    }
                  }
                  
                  
                }
                //END sub sector multiselect preferred company
                //start added sector name
                if ($scope.sectorList) {
                  var localindex_indexs = $scope.sectorList.map(function (el) {
                    return el.id;
                  }).indexOf($scope.requirementDetailData[i].sector);
                  if (localindex_indexs != -1) {
                    $scope.requirementDetailData[i].sector_name = $scope.sectorList[localindex_indexs].business_type
                  }
                  
                }

            
                //end added sector name

              })
              $scope.getRequirementBrowsedData(id);
            }).catch(function onError(response) {
              console.log(response);
            })
            $('#RequirementModel').modal('show');
        }

        $scope.getRequirementBrowsedData = function (id) {
          releaseCampaignService.requirementBrowsedData(id)
            .then(function onSuccess(response) {
              $scope.browsedDetailData = response.data.data.browsed;
              //console.log($scope.browsedDetailData);

              $scope.companiesDetailDataBrowsed = response.data.data.companies;
              //console.log("current partnerData",$scope.companiesDetailDataBrowsed);
              for (let k in $scope.companiesDetailDataBrowsed) {
                $scope.companiesDetailDataBrowsed[k].id = $scope.companiesDetailDataBrowsed[k].organisation_id;
                $scope.companiesDetailDataBrowsed[k].label = $scope.companiesDetailDataBrowsed[k].name;
                $scope.companiesDetailDataBrowsed[k].sector= $scope.companiesDetailDataBrowsed[k].business_type[0];
                if (k == response.data.data.companies.length - 1) {
                  $scope.companiesDetailDataBrowsed.push({ id: 'other', label: 'other', organisation_id: '', name: 'other' })
                }
              }

            
              for (let i in $scope.browsedDetailData) {
                $scope.browsedDetailData[i].created_at = moment($scope.browsedDetailData[i].created_at).toISOString();               
                if (!$scope.browsedDetailData[i].current_patner_id) {
                  $scope.browsedDetailData[i].current_patner_id = '';
                }
                var selected_preferred_company = [];
                $scope.browsedDetailData[i].selected_preferred_company = [];
                 if($scope.browsedDetailData[i].prefered_patner_other){
                    $scope.browsedDetailData[i].otherPreferredCompanyBrowsed = true;
                    $scope.browsedDetailData[i].prefered_patners.push("");
                 }
                if ($scope.browsedDetailData[i].prefered_patners.length > 0) {
                  for (let j in $scope.browsedDetailData[i].prefered_patners) {
                    var localindex_index = $scope.companiesDetailDataBrowsed.map(function (el) {
                      return el.organisation_id;
                    }).indexOf($scope.browsedDetailData[i].prefered_patners[j]);
                    if (localindex_index != -1) {
                      selected_preferred_company.push($scope.companiesDetailDataBrowsed[localindex_index])
                    }
                  }
                  $scope.browsedDetailData[i].selected_preferred_company = selected_preferred_company
                }

              

                userService.getSector()
                .then(function onSuccess(response) {
                  $scope.sectorList = response.data;
                  console.log($scope.sectorList[1].business_type);
                });
                //start added sector name
                if ($scope.sectorList) {
                  var localindex_indexs = $scope.sectorList.map(function (el) {
                    return el.id;
                  }).indexOf($scope.browsedDetailData[i].sector_id);
                  if (localindex_indexs != -1) {
                    $scope.browsedDetailData[i].sector_name = $scope.sectorList[localindex_indexs].business_type
                    console.log($scope.browsedDetailData);
                  }
                }
                //end added sector name


                if ($scope.browsedDetailData[i].sub_sector_id) {
                  if ($scope.sectorList) {
                    for (let p in $scope.sectorList) {
                      if ($scope.sectorList[p].subtypes && $scope.sectorList[p].subtypes.length > 0) {
                        var sub_index = $scope.sectorList[p].subtypes.map(function (el) {
                          return el.id;
                        }).indexOf(JSON.parse($scope.browsedDetailData[i].sub_sector_id));
                        if (sub_index != -1) {
                          $scope.browsedDetailData[i].sub_sector_name = $scope.sectorList[p].subtypes[sub_index].business_sub_type;
                        }
                      }
                    }
                    //end sub sector name
                  }
                }
              }
            }).catch(function onError(response) {
              console.log(response);
            })
        }

        $scope.browsedMulticheck = function (index) {
          $scope.browsCheckBoxAutoCheck(index);
           if($scope.browsedDetailData[index].selected_preferred_company && $scope.browsedDetailData[index].selected_preferred_company.length > 0){
            for(let p in  $scope.browsedDetailData[index].selected_preferred_company){
              if($scope.browsedDetailData[index].selected_preferred_company[p].id == 'other'){
                 $scope.browsedDetailData[index].otherPreferredCompanyBrowsed = true;
              }
            }
           }
           if($scope.browsedDetailData[index].selected_preferred_company && $scope.browsedDetailData[index].selected_preferred_company.length == 0){
            $scope.browsedDetailData[index].otherPreferredCompanyBrowsed = false;
           }
        }

        $scope.selected_preferred_partner = { buttonDefaultText: 'Select Preferred Partner' };
        $scope.preferredMulticheck = function (key) {
          if ($scope.requirementDetailData[key].selected_preferred_company && $scope.requirementDetailData[key].selected_preferred_company.length > 0) {
            $scope.requirementDetailData[key].preferred_company = []
            for (let i in $scope.requirementDetailData[key].selected_preferred_company) {
              $scope.requirementDetailData[key].preferred_company.push($scope.requirementDetailData[key].selected_preferred_company[i].id);
            }
          }
        }
        $scope.otherPreferredCompany = false;
        $scope.subSectorPreferredMulticheck = function (key, index) {
          // $scope.requirementDetailData[key].requirements[index].requirementCheck = true;
          if ($scope.requirementDetailData[key] && $scope.requirementDetailData[key].requirements[index] && $scope.requirementDetailData[key].requirements[index].selected_preferred_company_sub_sector && $scope.requirementDetailData[key].requirements[index].selected_preferred_company_sub_sector.length > 0) {
            $scope.requirementDetailData[key].requirements[index].preferred_company = [];
            $scope.otherPreferredCompany = false;
            for (let i in $scope.requirementDetailData[key].requirements[index].selected_preferred_company_sub_sector) {
              $scope.requirementDetailData[key].requirements[index].otherPreferredCompany = false
              if ($scope.requirementDetailData[key].requirements[index].selected_preferred_company_sub_sector[i].id == 'other') {
                $scope.otherPreferredCompany = true
                $scope.requirementDetailData[key].requirements[index].otherPreferredCompany = true
              } 
              $scope.requirementDetailData[key].requirements[index].preferred_company.push($scope.requirementDetailData[key].requirements[index].selected_preferred_company_sub_sector[i].id);
            }
          }  
          if($scope.requirementDetailData[key] && $scope.requirementDetailData[key].requirements[index] && $scope.requirementDetailData[key].requirements[index].selected_preferred_company_sub_sector && $scope.requirementDetailData[key].requirements[index].selected_preferred_company_sub_sector.length == 0){
            $scope.requirementDetailData[key].requirements[index].preferred_company = [];
            $scope.requirementDetailData[key].requirements[index].otherPreferredCompany = false
          }
        }

        $scope.checkBoxAutoCheck = function (key, index) {
          $scope.requirementDetailData[key].requirements[index].requirementCheck = true;
          $scope.checkbooxCheck(key);
        }

        $scope.browsCheckBoxAutoCheck = function (index) {
          $scope.browsedDetailData[index].browsedCheck = true;
          $scope.checkboxBrowesLeadCheck()
        }

        $scope.distributionBoxAutoCheck = function (key,index) {
          $scope.bdrequirementDetailData[key].requirements[index].requirementCheck = true;
          $scope.bdcheckboxCheck(key);
        }

        


        $scope.events = {
          onItemSelect: function (item) {
          }
        }

        $scope.settings = {
          showCheckAll: false,
          scrollable: false,
          enableSearch: false,
          showUncheckAll: false
        };

        $scope.addRequirementRow = ({});
        $scope.addRequirementDetail = function () {
          // $scope.addRequirementRow = $scope.requirementDetailData;
          $scope.requirementDetailData.push({});
        }

        $scope.removeRequirement = function (key) {
          let requirementData = $scope.requirementDetailData;
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
                let requirement_id = [];
                if (requirementData[key].requirements.length > 0) {
                  for (let i in requirementData[key].requirements) {
                    requirement_id.push(requirementData[key].requirements[i].id)
                  }
                }
                let deleteId = {
                  "requirement_ids": requirement_id
                }
                releaseCampaignService.deleteSubmittedLeads(deleteId)
                  .then(function onSuccess(response) {
                    if (response && response.data.data.error) {
                      swal(constants.name, response.data.data.error, constants.error);
                    } else {
                      swal(constants.name, constants.delete_success, constants.success);
                    }
                  }).catch(function onError(response) {
                    console.log(response);
                  })
                $scope.$apply(function () {
                  delete requirementData[key];
                  $scope.requirementDetailData = requirementData;
                });
              }
            });
        }

        $scope.removeSubSectorRequirement = function (data, key) {
          let deleteSubSectorId = [];
          for (let i in $scope.requirementDetailData[key].requirements) {
            if ($scope.requirementDetailData[key].requirements[i].requirementCheck == true && $scope.requirementDetailData[key].requirements[i].is_deleted == 'no') {
              deleteSubSectorId.push($scope.requirementDetailData[key].requirements[i].id);
            }
          }
          if (deleteSubSectorId.length > 0) {
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
                  let deleteId = {
                    "requirement_ids": deleteSubSectorId
                  }
                  releaseCampaignService.deleteSubmittedLeads(deleteId)
                    .then(function onSuccess(response) {
                      if (response && response.data.data.error) {
                        swal(constants.name, response.data.data.error, constants.error);
                      } else {
                        if(response && response.data && response.data.data && response.data.data.list_color_code != 'null'){
                          let color_class = '';
                          if (response.data.data.list_color_code == 1) {
                           color_class =  'yellow';;
                         }
                         else if (response.data.data.list_color_code == 2) {
                           color_class = '#7C4700';
                         }
                         else if (response.data.data.list_color_code == 3) {
                           color_class = 'green';
                         }
                         else if (response.data.data.list_color_code == 4) {
                           color_class = 'white';
                         } 
                         else if (response.data.data.list_color_code == 5) {
                          color_class = 'red';
                        }
                          var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
                            return el.id;
                          }).indexOf($scope.shortlisted_spaces_id);
                          if (localindex_index != -1) {
                            $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_code = response.data.data.list_color_code;
                              $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_class = color_class;
                            }
                        }
                        swal(constants.name, constants.delete_success, constants.success);
                      }
                    }).catch(function onError(response) {
                      console.log(response);
                    })
                  $scope.$apply(function () {
                    for (let x in deleteSubSectorId) {
                      var localindex_index = $scope.requirementDetailData[key].requirements.map(function (el) {
                        return el.id;
                      }).indexOf(deleteSubSectorId[x]);
                      if (localindex_index != -1) {
                        $scope.requirementDetailData[key].requirements[localindex_index].is_deleted = 'yes';
                        $scope.requirementDetailData[key].requirements[localindex_index].color_class = 'red';
                      }
                    }
                  });
                }
              });
          }
        }

        $scope.singleRemoveSubSector = function (id, key, index) {
          let deleteSubSectorId = [];
          deleteSubSectorId.push(id);
          if (deleteSubSectorId.length > 0) {
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
                  let deleteId = {
                    "requirement_ids": deleteSubSectorId
                  }
                  releaseCampaignService.deleteSubmittedLeads(deleteId)
                    .then(function onSuccess(response) {
                      if (response && response.data.data.error) {
                        swal(constants.name, response.data.data.error, constants.error);
                      } else {
                        if(response && response.data && response.data.data && response.data.data.list_color_code != 'null'){
                          let color_class = '';
                          if (response.data.data.list_color_code == 1) {
                           color_class =  'yellow';;
                         }
                         else if (response.data.data.list_color_code == 2) {
                           color_class = '#7C4700';
                         }
                         else if (response.data.data.list_color_code == 3) {
                           color_class = 'green';
                         }
                         else if (response.data.data.list_color_code == 4) {
                           color_class = 'white';
                         } 
                         else if (response.data.data.list_color_code == 5) {
                          color_class = 'red';
                        }
                          var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
                            return el.id;
                          }).indexOf($scope.shortlisted_spaces_id);
                          if (localindex_index != -1) {
                            $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_code = response.data.data.list_color_code;
                              $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_class = color_class;
                            }
                        }
                        swal(constants.name, constants.delete_success, constants.success);
                      }
                    }).catch(function onError(response) {
                      console.log(response);
                    })
                  $scope.$apply(function () {
                    $scope.requirementDetailData[key].requirements[index].is_deleted = 'yes';
                    $scope.requirementDetailData[key].requirements[index].color_class = 'red';
                  });
                }
              });
          }
        }

        $scope.singleRestoreSubSector = function (id, key, index) {
          let restoreSubSectorId = [];
          restoreSubSectorId.push(id);
          if (restoreSubSectorId.length > 0) {
            swal({
              title: 'Are you sure ?',
              text: 'Restore Requirement',
              type: constants.warning,
              showCancelButton: true,
              confirmButtonClass: "btn-success",
              confirmButtonText: "Yes, Restore!",
              closeOnConfirm: false,
              closeOnCancel: true
            },
              function (confirm) {
                if (confirm) {
                  let restoreId = {
                    "requirement_ids": restoreSubSectorId
                  }
                  releaseCampaignService.restoreSubmittedLeads(restoreId)
                    .then(function onSuccess(response) {
                      if (response && response.data.data.error) {
                        swal(constants.name, response.data.data.error, constants.error);
                      } else {
                        if(response && response.data && response.data.data && response.data.data.list_color_code != 'null'){
                          let color_class = '';
                          if (response.data.data.list_color_code == 1) {
                           color_class =  'yellow';;
                         }
                         else if (response.data.data.list_color_code == 2) {
                           color_class = '#7C4700';
                         }
                         else if (response.data.data.list_color_code == 3) {
                           color_class = 'green';
                         }
                         else if (response.data.data.list_color_code == 4) {
                           color_class = 'white';
                         } 
                         else if (response.data.data.list_color_code == 5) {
                          color_class = 'red';
                        }
                          var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
                            return el.id;
                          }).indexOf($scope.shortlisted_spaces_id);
                          if (localindex_index != -1) {
                            $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_code = response.data.data.list_color_code;
                              $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_class = color_class;
                            }
                        }
                        swal(constants.name, 'Recovered Successfully', constants.success);
                      }
                    }).catch(function onError(response) {
                      console.log(response);
                    })
                  $scope.$apply(function () {
                    $scope.requirementDetailData[key].requirements[index].is_deleted = 'no';
                    if ($scope.requirementDetailData[key].requirements[index].varified_ops == 'yes') {
                      $scope.requirementDetailData[key].requirements[index].color_class = 'green';
                    } else {
                      $scope.requirementDetailData[key].requirements[index].color_class = 'yellow';
                    }

                  });
                }
              });
          }
        }

        $scope.restoreMultiRequirement = function (data, key) {
          let restoreSubSectorId = [];
          $scope.disableRestore = true
          for (let i in $scope.requirementDetailData[key].requirements) {
            if ($scope.requirementDetailData[key].requirements[i].requirementCheck == true && $scope.requirementDetailData[key].requirements[i].is_deleted == 'yes') {
              restoreSubSectorId.push($scope.requirementDetailData[key].requirements[i].id);
              $scope.disableRestore = false
            }
          }
          if (restoreSubSectorId.length > 0) {
            swal({
              title: 'Are you sure ?',
              text: 'Restore Requirement',
              type: constants.warning,
              showCancelButton: true,
              confirmButtonClass: "btn-success",
              confirmButtonText: "Yes, Restore!",
              closeOnConfirm: false,
              closeOnCancel: true
            },
              function (confirm) {
                if (confirm) {
                  let deleteId = {
                    "requirement_ids": restoreSubSectorId
                  }
                  releaseCampaignService.restoreSubmittedLeads(deleteId)
                    .then(function onSuccess(response) {
                      if (response && response.data.data.error) {
                        swal(constants.name, response.data.data.error, constants.error);
                      } else {
                        if(response && response.data && response.data.data && response.data.data.list_color_code != 'null'){
                          let color_class = '';
                          if (response.data.data.list_color_code == 1) {
                           color_class =  'yellow';;
                         }
                         else if (response.data.data.list_color_code == 2) {
                           color_class = '#7C4700';
                         }
                         else if (response.data.data.list_color_code == 3) {
                           color_class = 'green';
                         }
                         else if (response.data.data.list_color_code == 4) {
                           color_class = 'white';
                         } 
                         else if (response.data.data.list_color_code == 5) {
                          color_class = 'red';
                        }
                          var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
                            return el.id;
                          }).indexOf($scope.shortlisted_spaces_id);
                          if (localindex_index != -1) {
                            $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_code = response.data.data.list_color_code;
                              $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_class = color_class;
                            }
                        }
                        swal(constants.name, 'Recovered Successfully', constants.success);
                      }
                    }).catch(function onError(response) {
                      console.log(response);
                    })
                  $scope.$apply(function () {
                    for (let x in restoreSubSectorId) {
                      var localindex_index = $scope.requirementDetailData[key].requirements.map(function (el) {
                        return el.id;
                      }).indexOf(restoreSubSectorId[x]);
                      if (localindex_index != -1) {
                        $scope.requirementDetailData[key].requirements[localindex_index].is_deleted = 'no';
                        if ($scope.requirementDetailData[key].requirements[localindex_index].varified_ops == 'yes') {
                          $scope.requirementDetailData[key].requirements[localindex_index].color_class = 'green';
                        } else {
                          $scope.requirementDetailData[key].requirements[localindex_index].color_class = 'yellow';
                        }
                      }
                    }
                  });
                }
              });
          }
        }

        $scope.updateRequirement = function (data) {
          var reqData = [];
          if (data) {
            if (data.requirements && data.requirements.length > 0) {
              for (let j in data.requirements) {
                reqData.push(data.requirements[j]);
              }
            }
          } else {
            angular.forEach($scope.requirementDetailData, function (value, key) {
              if (value.requirements.length > 0) {
                for (let i in value.requirements) {
                  reqData.push(value.requirements[i]);
                }
              }
            })
          }
          var requirementData = {
            "requirements": reqData
          }
          releaseCampaignService.updateRequirement(requirementData)
            .then(function onSuccess(response) {
              if (response && response.data.data.error) {
                swal(constants.name, response.data.data.error, constants.error);
              } else {
                swal(constants.name, constants.update_success, constants.success);
              }
            }).catch(function onError(response) {
              console.log(response);
            })
        }

        // $scope.opsVerifyRequirement = function (data) {
        //   let verifyId = [];
        //   if (data.requirements.length > 0) {
        //     for (let i in data.requirements) {
        //       if (data.requirements[i].varified_ops == 'no') {
        //         verifyId.push(data.requirements[i].id)
        //       }
        //     }
        //   }
        //   if (verifyId.length > 0) {
        //     $scope.verifyRequirement(verifyId);
        //   }

        // }

        $scope.checkOpsVerifyRequirement = function (data) {
          let verifyId = [];
          for (let i in data) {
            if (data[i].requirementCheck && data[i].varified_ops == 'no') {
              verifyId.push(data[i].id);
            }
          }
          if (verifyId.length > 0) {
            $scope.verifyRequirement(verifyId);
          } else {
            swal(constants.name, 'Already Verified', constants.error);
          }
        }


        $scope.subSectorCheck = true
        $scope.checkbooxCheck = function (key) {
          $scope.subSectorCheck = true
          var requirementsData = $scope.requirementDetailData[key].requirements
          for (let x in requirementsData) {
            if (requirementsData[x].requirementCheck && $scope.subSectorCheck) {            
              $scope.subSectorCheck = false
            }

          }
        }

        $scope.bdcheckboxCheck = function (key) {
          $scope.subSectorCheck = true
          
          var requirementsData = $scope.bdrequirementDetailData[key].requirements
          for (let x in requirementsData) {
            if (requirementsData[x].requirementCheck && $scope.subSectorCheck) {
              if(requirementsData[x].varified_bd == 'no'){
                $scope.subSectorCheck = false
              }
              
            }
          }
        }

        $scope.browsedCheck = true;
        $scope.checkboxBrowesLeadCheck = function () {
          $scope.browsedCheck = true;
          for (let x in $scope.browsedDetailData) {
            if ($scope.browsedDetailData[x].browsedCheck && $scope.browsedCheck) {
              $scope.browsedCheck = false
            }
          }
        }


        $scope.singleOpsVerifyRequirement = function (id) {
          let verifyId = [];
          verifyId.push(id);
          if (verifyId.length > 0) {
            $scope.verifyRequirement(verifyId);
          }
        }

        $scope.getBdRequirementDetail = function (id, suppleName) {
          $scope.shortlisted_spaces_id = id
          userService.getSector()
            .then(function onSuccess(response) {
              $scope.sectorList = response.data;
            })
          releaseCampaignService.bdRequirementDetail(id)
            .then(function onSuccess(response) {
              $scope.bdrequirementDetailData = response.data.data.requirements;
              $scope.bdcompaniesDetailData = response.data.data.companies;
              // for (let k in $scope.bdcompaniesDetailData) {
              //   $scope.bdcompaniesDetailData[k].id = $scope.bdcompaniesDetailData[k].organisation_id;
              //   $scope.bdcompaniesDetailData[k].label = $scope.bdcompaniesDetailData[k].name;
              //   if (k == response.data.data.companies.length - 1) {
              //     $scope.bdcompaniesDetailData.push({ id: 'other', label: 'other', organisation_id: '', name: 'other' })
              //   }
              // }

              angular.forEach($scope.bdrequirementDetailData, function (value, i) {
                if ($scope.sectorList) {
                  //start added sector name
                  var localindex_indexs = $scope.sectorList.map(function (el) {
                    return el.id;
                  }).indexOf($scope.bdrequirementDetailData[i].sector);
                  if (localindex_indexs != -1) {
                    $scope.bdrequirementDetailData[i].sector_name = $scope.sectorList[localindex_indexs].business_type
                  }

                  //end added sector name
                  //start sub sector name
                  for (let x in $scope.bdrequirementDetailData[i].requirements) {
                    if($scope.bdrequirementDetailData[i].requirements[x].varified_bd_date){
                      let date = new Date($scope.bdrequirementDetailData[i].requirements[x].varified_bd_date).toUTCString();
                      $scope.bdrequirementDetailData[i].requirements[x].varified_bd_date = date;
                    }
                    if($scope.bdrequirementDetailData[i].requirements[x].varified_bd == 'yes'){
                      $scope.bdrequirementDetailData[i].requirements[x].color_class = 'green';
                    } else {
                      $scope.bdrequirementDetailData[i].requirements[x].color_class = 'yellow';
                    }
                    if ($scope.bdrequirementDetailData[i].requirements[x].sub_sector) {
                      for (let p in $scope.sectorList) {
                        if ($scope.sectorList[p].subtypes && $scope.sectorList[p].subtypes.length > 0) {
                          var sub_index = $scope.sectorList[p].subtypes.map(function (el) {
                            return el.id;
                          }).indexOf($scope.bdrequirementDetailData[i].requirements[x].sub_sector);
                          if (sub_index != -1) {
                            $scope.bdrequirementDetailData[i].requirements[x].sub_sector_name = $scope.sectorList[p].subtypes[sub_index].business_sub_type;
                          }
                        }
                      }

                    }

                    //end sub sector name
                   // start added preferred_company  yes no
                    // $scope.bdrequirementDetailData[i].requirements[x].is_preferred_company = 'No';
                    // if ($scope.bdrequirementDetailData[i] && $scope.bdrequirementDetailData[i].requirements[x].preferred_company && $scope.bdrequirementDetailData[i].requirements[x].preferred_company.length > 0) {
                    //   // for (let j in $scope.bdrequirementDetailData[i].requirements[x].preferred_company) {
                    //   //   var localindex_index = $scope.bdcompaniesDetailData.map(function (el) {
                    //   //     return el.organisation_id;
                    //   //   }).indexOf($scope.bdrequirementDetailData[i].requirements[x].preferred_company[j]);
                    //   //   if (localindex_index != -1) {
                    //   //     $scope.bdrequirementDetailData[i].requirements[x].is_preferred_company = 'Yes'
                    //   //   }
                    //   // }
                    //     var localindex_index = $scope.bdrequirementDetailData[i].requirements[x].preferred_company.map(function (el) {
                    //       return el;
                    //     }).indexOf($scope.bdrequirementDetailData[i].requirements[x].current_company);
                    //     if (localindex_index != -1) {
                    //       $scope.bdrequirementDetailData[i].requirements[x].is_preferred_company = 'Yes'
                    //     }
                    // }
                    // end added preferred_company  yes no
                    // if($scope.bdrequirementDetailData[i].requirements.length-1 == x){
                    //   $('#RequirementModel').modal('show');
                    // }
                    
                  }
                }

              })
            })
            $scope.subSectorCheck = true
            $('#BDRequirementModel').modal('show');
        }

        $scope.updateSubSector = function (data) {
          let updateData = [];
          for (let i in data) {
            if (data[i].current_company == "") {
              data[i].current_company = null
              data[i].old_current_company = true;
            } else {
              data[i].current_company_other = ""
            }
             $scope.checkIsPreferredCompanyOther = true;
            if (data[i].preferred_company.length > 0) {
              for (let j in data[i].preferred_company) {
                if (data[i].preferred_company[j] == 'other') {
                  $scope.checkIsPreferredCompanyOther  = false;
                  data[i].preferred_company.splice(j, 1)
                } 
              }
            }
            if($scope.checkIsPreferredCompanyOther){
              data[i].preferred_company_other = "";
            }
          
            if (data[i].requirementCheck) {
              updateData.push(data[i]);
            }

          }
          if (updateData.length > 0) {
            var requirementData = {
              "requirements": updateData
            }
            releaseCampaignService.updateRequirement(requirementData)
              .then(function onSuccess(response) {
                if (response && response.data.data.error) {
                  swal(constants.name, response.data.data.error, constants.error);
                } else {
                  let responseData = response.data.data;
                  for (let k in data) {
                    if (data[k].old_current_company) {
                      data[k].current_company = ""
                    }

                    angular.forEach($scope.requirementDetailData, function (value, key) {
                      var localindex_index = $scope.requirementDetailData[key].requirements.map(function (el) {
                        return el.id;
                      }).indexOf(data[k].id);
                      if (localindex_index != -1) {
                        if(responseData && responseData.length > 0){
                          for(let n in responseData){
                            if(responseData[n].id == data[k].id){
                              $scope.requirementDetailData[key].requirements[localindex_index].lead_status = responseData[n].lead_status;
                            }
                          }
                        }
                      }
                    })
                  }
                  swal(constants.name, constants.update_success, constants.success);
                }
              }).catch(function onError(response) {
                console.log(response);
                if(response.data.status == false){
                  if(response.data.data && response.data.data.general_error && response.data.data.general_error.errors && response.data.data.general_error.errors.impl_timeline){
                    swal(constants.name, response.data.data.general_error.errors.impl_timeline[0], constants.error);
                  }
                  if(response.data.data && response.data.data.general_error && response.data.data.general_error.errors && response.data.data.general_error.errors.preferred_company){
                    swal(constants.name, response.data.data.general_error.errors.preferred_company[0], constants.error);
                  }
                  
                }
              })
          }
        }

        $scope.updateSubSectorRow = function (data,l4,l5,l6) {
          let updateData = [];
          console.log(data['L4.1']);
          if (data.current_company == "") {
            data.current_company = null
          } else {
            data.current_company_other = ""
          }
          if (data.preferred_company.length > 0) {
            $scope.checkIsPreferredCompanyOther = true;
            for (let j in data.preferred_company) {
              if (data.preferred_company[j] == 'other') {
            $scope.checkIsPreferredCompanyOther = false;
                data.preferred_company.splice(j, 1)
              } 
            }
            if($scope.checkIsPreferredCompanyOther){
              data.preferred_company_other = "";
            }
          }
          updateData.push(data);
          if (updateData.length > 0) {
            var requirementData = {
              "requirements": updateData
            }
            releaseCampaignService.updateRequirement(requirementData)
              .then(function onSuccess(response) {
                if (response && response.data.data.error) {
                  swal(constants.name, response.data.data.error, constants.error);
                } else {
                  let responseData = response.data.data;
                  angular.forEach($scope.requirementDetailData, function (value, key) {
                    var localindex_index = $scope.requirementDetailData[key].requirements.map(function (el) {
                      return el.id;
                    }).indexOf(data.id);
                    if (localindex_index != -1) {
                      if(responseData && responseData.length > 0){
                        for(let i in responseData){
                          if(responseData[i].id == data.id){
                            $scope.requirementDetailData[key].requirements[localindex_index].lead_status = responseData[i].lead_status;
                          }
                        }
                      }
                    }
                  })
                  swal(constants.name, constants.update_success, constants.success);
                }
              }).catch(function onError(response) {
                console.log(response);
                if(response.data.status == false){
                  if(response.data.data && response.data.data.general_error && response.data.data.general_error.errors && response.data.data.general_error.errors.impl_timeline){
                    swal(constants.name, response.data.data.general_error.errors.impl_timeline[0], constants.error);
                  }
                  if(response.data.data && response.data.data.general_error && response.data.data.general_error.errors && response.data.data.general_error.errors.preferred_company){
                    swal(constants.name, response.data.data.general_error.errors.preferred_company[0], constants.error);
                  }
                }
              })
          }
          if (data.current_company == null && data.current_company_other != '') {
            data.current_company = "";
          }
        }

        $scope.updateLeadDistributionRow = function (data) {
          let updateData = [];
          updateData.push({'lead_price':data.lead_price,'comment':data.comment,'requirement_id':data.id,'hotness_of_lead':data.hotness_of_lead,'client_status':data.client_status});
          if (updateData.length > 0) {
            var DistributionData = {
              "data": updateData
            }
            releaseCampaignService.updateLeadDistribution(DistributionData)
              .then(function onSuccess(response) {
                if (response && response.data.data.error) {
                  swal(constants.name, response.data.data.error, constants.error);
                } else {
                  swal(constants.name, constants.update_success, constants.success);
                }
              }).catch(function onError(response) {
                console.log(response);
                // if(response.data.status == false){
                //   if(response.data.data && response.data.data.general_error && response.data.data.general_error.errors && response.data.data.general_error.errors.impl_timeline){
                //     swal(constants.name, response.data.data.general_error.errors.impl_timeline[0], constants.error);
                //   }
                //   if(response.data.data && response.data.data.general_error && response.data.data.general_error.errors && response.data.data.general_error.errors.preferred_company){
                //     swal(constants.name, response.data.data.general_error.errors.preferred_company[0], constants.error);
                //   }
                  
                // }
              })
          }
        }


        $scope.updateLeadDistribution = function (){
          let updateData = [];
          
          for(let i in $scope.bdrequirementDetailData){
            if($scope.bdrequirementDetailData[i].requirements.length > 0){
              let checkData = $scope.bdrequirementDetailData[i].requirements;
              for(let j in checkData){
                if(checkData[j].requirementCheck){
                  updateData.push({'lead_price':checkData[j].lead_price,'comment':checkData[j].comment,'requirement_id':checkData[j].id,'hotness_of_lead':checkData[j].hotness_of_lead,'client_status':checkData[j].client_status});
                }
              }
            }
          }      
          if (updateData.length > 0) {
            var DistributionData = {
              "data": updateData
            }
            releaseCampaignService.updateLeadDistribution(DistributionData)
              .then(function onSuccess(response) {
                if (response && response.data.data.error) {
                  swal(constants.name, response.data.data.error, constants.error);
                } else {
                  swal(constants.name, constants.update_success, constants.success);
                }
              }).catch(function onError(response) {
                console.log(response);
              
              })
          }
        }

        $scope.verifyRequirement = function (verifyId) {
          swal({
            title: 'Are you sure ?',
            text: 'Do you want to proceed with sector level verification?',
            type: constants.warning,
            showCancelButton: true,
            confirmButtonClass: "btn-success",
            confirmButtonText: "Yes, Verify!",
            closeOnConfirm: false,
              closeOnCancel: true
          },
            function (confirm) {
              if (confirm) {
                releaseCampaignService.opsVerifyRequirement({ "requirement_ids": verifyId })
                  .then(function onSuccess(response) {
                    // var changedBookingPlanListcolor = true;
                    if (response && response.data.data.error) {
                      swal(constants.name, response.data.data.error, constants.error);
                    } else {
                      for (let i in verifyId) {
                        angular.forEach($scope.requirementDetailData, function (value, key) {                   
                          var localindex_index = $scope.requirementDetailData[key].requirements.map(function (el) {
                            return el.id;
                          }).indexOf(verifyId[i]);
                          if (localindex_index != -1) {
                            $scope.requirementDetailData[key].requirements[localindex_index].varified_ops = 'yes';
                            if ($scope.requirementDetailData[key].requirements[localindex_index].is_deleted == 'no') {
                              $scope.requirementDetailData[key].requirements[localindex_index].color_class = 'green';
                            }
                            $scope.requirementDetailData[key].requirements[localindex_index].requirementCheck = false;
                            $scope.requirementDetailData[key].requirements[localindex_index].varified_ops_date = new Date();
                            $scope.requirementDetailData[key].requirements[localindex_index].verified_ops_by_obj = {
                              first_name :response.data.data.verified_ops_by
                            }
                            // if(response && response.data && response.data.data && response.data.data.color_code != 'null'){
                            //   var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
                            //     return el.id;
                            //   }).indexOf($scope.shortlisted_spaces_id);
                            //   if (localindex_index != -1) {
                            //     $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_code = 3;
                            //       $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_class = 'green';
                            //   }
                            // }

                          }
                      //  for(let p in $scope.requirementDetailData[key].requirements){
                      //   if($scope.requirementDetailData[key].requirements[p].color_class == 'yellow' || $scope.requirementDetailData[key].requirements[p].color_code == 1){
                      //     changedBookingPlanListcolor = false;
                      //   }
                      //  }
                         

                          var chechIfVerify = false
                          for (let j in $scope.requirementDetailData[key].requirements) {
                            if ($scope.requirementDetailData[key].requirements[j].varified_ops == 'no' && !chechIfVerify) {
                              chechIfVerify = true
                            }
                          }
                          if (chechIfVerify) {
                            $scope.opsVerifyButtonDiable = false;
                          } else {
                            $scope.opsVerifyButtonDiable = true;
                          }
                        })
                      }
                      // if(response && response.data && response.data.data && response.data.data.color_code != 'null' && changedBookingPlanListcolor){
                      //   var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
                      //     return el.id;
                      //   }).indexOf($scope.shortlisted_spaces_id);
                      //   if (localindex_index != -1) {
                      //     $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_code = 3;
                      //       $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_class = 'green';
                      //   }
                      // }
                      if(response && response.data && response.data.data && response.data.data.list_color_code != 'null'){
                        let color_class = '';
                        if (response.data.data.list_color_code == 1) {
                         color_class =  'yellow';;
                       }
                       else if (response.data.data.list_color_code == 2) {
                         color_class = '#7C4700';
                       }
                       else if (response.data.data.list_color_code == 3) {
                         color_class = 'green';
                       }
                       else if (response.data.data.list_color_code == 4) {
                         color_class = 'white';
                       } else if (response.data.data.list_color_code == 5) {
                        color_class = 'red';
                      }
                        var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
                          return el.id;
                        }).indexOf($scope.shortlisted_spaces_id);
                        if (localindex_index != -1) {
                          $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_code = response.data.data.list_color_code;
                            $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_class = color_class;
                           // $scope.releaseDetails.shortlisted_suppliers[localindex_index].verified_ops_by = response.data.data.verified_ops_by;
    
                          }
                      }
                      $scope.subSectorCheck = true;
                      swal(constants.name, response.data.data.message, constants.success);
                    }
                  }).catch(function onError(response) {
                    if(response && response.data && response.data.data && response.data.data.general_error && response.data.data.general_error.error){
                      swal(constants.name, response.data.data.general_error.error, constants.error);
                    }
                  })
              }
            });

        }



        $scope.bdVerifyRequirement = function (id, key, index) {
          if($scope.bdrequirementDetailData[key].requirements[index].lead_price > 0){
          swal({
            title: 'Are you sure ?',
            text: 'Do you want to proceed with selected sub-sector verification?',
            type: constants.warning,
            showCancelButton: true,
            confirmButtonClass: "btn-success",
            confirmButtonText: "Yes, Verify!",
            closeOnConfirm: false,
            closeOnCancel: true
          },
            function (confirm) {  
              if (confirm) {
                let verifyId = [id];
                releaseCampaignService.bdVerifyRequirement({ "requirement_ids": verifyId })
                  .then(function onSuccess(response) {
                    if (response && response.data.data.error) {
                      swal(constants.name, response.data.data.error, constants.error);
                    } else {
                      $scope.bdrequirementDetailData[key].requirements[index].varified_bd = 'yes';
                      $scope.bdrequirementDetailData[key].requirements[index].color_class = 'green';
                      $scope.bdrequirementDetailData[key].requirements[index].varified_bd_date = new Date();   
                      $scope.bdrequirementDetailData[key].requirements[index].verified_bd_by_obj = {
                        first_name: response.data.data.varified_bd_by
                      };   
                      if(response && response.data && response.data.data && response.data.data.color_code != 'null'){
                        let color_class = '';
                         if (response.data.data.list_color_code == 1) {
                          color_class =  'yellow';;
                        }
                        else if (response.data.data.list_color_code == 2) {
                          color_class = '#7C4700';
                        }
                        else if (response.data.data.list_color_code == 3) {
                          color_class = 'green';
                        }
                        else if (response.data.data.list_color_code == 4) {
                          color_class = 'white';
                        } else if (response.data.data.list_color_code == 5) {
                          color_class = 'red';
                        }

                        var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
                          return el.id;
                        }).indexOf($scope.shortlisted_spaces_id);
                        if (localindex_index != -1) {
                          $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_code = response.data.data.list_color_code;
                            $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_class = color_class;
                        }
                      }
                      swal(constants.name, 'Verified Successfully', constants.success);
                    }
                  }).catch(function onError(response) {
                
                      if(response.data.data && response.data.data.general_error){
                        swal(constants.name, response.data.data.general_error, constants.error);
                      
                    }
                  })
              }
            });
          } else {
            swal(constants.name, 'Please add lead price.', constants.error);
          }
        }

        $scope.saveBrowsed = function () {
          let browsedData = [];
         
          for (let i in $scope.browsedDetailData) {
            if ($scope.browsedDetailData[i].browsedCheck) {
              let preferred_company_other = null;
              if ($scope.browsedDetailData[i].selected_preferred_company && $scope.browsedDetailData[i].selected_preferred_company.length > 0) {
                $scope.browsedDetailData[i].prefered_patners = [];
                for (let j in $scope.browsedDetailData[i].selected_preferred_company) {
                  if($scope.browsedDetailData[i].selected_preferred_company[j].id == 'other'){
                    preferred_company_other = $scope.browsedDetailData[i].prefered_patner_other;
                  }
                  $scope.browsedDetailData[i].prefered_patners.push($scope.browsedDetailData[i].selected_preferred_company[j].id)
                }
              }

              if($scope.browsedDetailData[i].selected_preferred_company && $scope.browsedDetailData[i].selected_preferred_company.length == 0){
                $scope.browsedDetailData[i].prefered_patners = []; 
              }
              let current_patner_id = $scope.browsedDetailData[i].current_patner_id;
              let current_patner_other = $scope.browsedDetailData[i].current_patner_other;
             if($scope.browsedDetailData[i].current_patner_id == "" && $scope.browsedDetailData[i].current_patner_other){
              current_patner_id = null;
             } else {
              current_patner_other = null;
             }

              browsedData.push({'_id':$scope.browsedDetailData[i]._id,
              'comment':$scope.browsedDetailData[i].comment,
              'meating_timeline':$scope.browsedDetailData[i].meating_timeline,
              'implementation_timeline':$scope.browsedDetailData[i].implementation_timeline,
              'current_patner_id':current_patner_id,
              'prefered_patners_id':$scope.browsedDetailData[i].prefered_patners,
              'current_company_other' :current_patner_other,
              'preferred_company_other' :preferred_company_other,
            });
            }
          }
         
          if (browsedData.length > 0) {
            var browsedId = {
              "browsed_ids": browsedData
            }
         
            swal({
              title: 'Are you sure ?',
              text: 'The lead will be moved into submitted leads, do you want to continue?',
              type: constants.warning,
              showCancelButton: true,
              confirmButtonClass: "btn-success",
              confirmButtonText: "Yes, Save!",
              closeOnConfirm: false,
              closeOnCancel: true
          
            },
              function (confirm) {
                if (confirm) {
                  releaseCampaignService.saveBrowsed(browsedId)
                    .then(function onSuccess(response) {
                      if (response && response.data.data.error) {
                    
                        swal(constants.name, response.data.data.error, constants.error);
                      } else {
                        var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
                          return el.id;
                        }).indexOf($scope.shortlisted_spaces_id);
                        if (localindex_index != -1) {
                          $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_code = 1;
                          $scope.show_color($scope.releaseDetails.shortlisted_suppliers[localindex_index]);
                        }
                        let color_class = '';
                        if (response.data.data.list_color_code == 1) {
                         color_class =  'yellow';;
                       }
                       else if (response.data.data.list_color_code == 2) {
                         color_class = '#7C4700';
                       }
                       else if (response.data.data.list_color_code == 3) {
                         color_class = 'green';
                       }
                       else if (response.data.data.list_color_code == 4) {
                         color_class = 'white';
                       } 
                       else if (response.data.data.list_color_code == 5) {
                        color_class = 'red';
                      }
                        var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
                          return el.id;
                        }).indexOf($scope.shortlisted_spaces_id);
                        if (localindex_index != -1) {
                          $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_code = response.data.data.list_color_code;
                            $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_class = color_class;
                          }
                        $scope.getRequirementDetail($scope.shortlisted_spaces_id);
                        swal(constants.name, constants.save_success, constants.success);
                      }
                    }).catch(function onError(response) {
                       
                       if(response.data.data && response.data.data.general_error){
                          swal(constants.name, response.data.data.general_error.error, constants.error);
                      }
                    })
                }
              });
          }
        }

        $scope.updateBrowsed = function () {
          let browsedData = [];
         
          for (let i in $scope.browsedDetailData) {
            if ($scope.browsedDetailData[i].browsedCheck) {
              let preferred_company_other = null;
              if ($scope.browsedDetailData[i].selected_preferred_company && $scope.browsedDetailData[i].selected_preferred_company.length > 0) {
                $scope.browsedDetailData[i].prefered_patners = [];
                for (let j in $scope.browsedDetailData[i].selected_preferred_company) {
                  if($scope.browsedDetailData[i].selected_preferred_company[j].id == 'other'){
                    preferred_company_other = $scope.browsedDetailData[i].prefered_patner_other;
                  }
                  $scope.browsedDetailData[i].prefered_patners.push($scope.browsedDetailData[i].selected_preferred_company[j].id)
                }
              }

              if($scope.browsedDetailData[i].selected_preferred_company && $scope.browsedDetailData[i].selected_preferred_company.length == 0){
                $scope.browsedDetailData[i].prefered_patners = []; 
              }
              let current_patner_id = $scope.browsedDetailData[i].current_patner_id;
              let current_patner_other = $scope.browsedDetailData[i].current_patner_other;
             if($scope.browsedDetailData[i].current_patner_id == "" && $scope.browsedDetailData[i].current_patner_other){
              current_patner_id = null;
             } else {
              current_patner_other = null;
             }

              browsedData.push({'_id':$scope.browsedDetailData[i]._id,
              'comment':$scope.browsedDetailData[i].comment,
              'meating_timeline':$scope.browsedDetailData[i].meating_timeline,
              'implementation_timeline':$scope.browsedDetailData[i].implementation_timeline,
              'current_patner_id':current_patner_id,
              'prefered_patners_id':$scope.browsedDetailData[i].prefered_patners,
              'current_company_other' :current_patner_other,
              'preferred_company_other' :preferred_company_other,
            });
            }
          }
         
          if (browsedData.length > 0) {
            var browsed_leads = {
              "browsed_leads": browsedData
            }
         
            swal({
              title: 'Are you sure ?',
              text: 'Update browes lead',
              type: constants.warning,
              showCancelButton: true,
              confirmButtonClass: "btn-success",
              confirmButtonText: "Yes, Save!",
              closeOnConfirm: false,
              closeOnCancel: true
              
            },
              function (confirm) {
                if (confirm) {
                  releaseCampaignService.updateBrowsed(browsed_leads)
                    .then(function onSuccess(response) {
                      if (response && response.data.data.error) {
                        swal(constants.name, response.data.data.error, constants.error);
                      } else {
                        // var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
                        //   return el.id;
                        // }).indexOf($scope.shortlisted_spaces_id);
                        // if (localindex_index != -1) {
                        //   $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_code = 1;
                        //   $scope.show_color($scope.releaseDetails.shortlisted_suppliers[localindex_index]);
                        // }
                       // $scope.getRequirementDetail($scope.shortlisted_spaces_id);
                        swal(constants.name, constants.save_success, constants.success);
                      }
                    }).catch(function onError(response) {
                        if(response.data.data && response.data.data.general_error){
                          swal(constants.name, response.data.data.general_error.error, constants.error);
                      }
                    })
                }
              });
          }
        }

        // $scope.updateBrowsed = function () {
        //   let browsedData = [];
        //   for (let i in $scope.browsedDetailData) {
        //     if ($scope.browsedDetailData[i].browsedCheck) {
        //       browsedData.push($scope.browsedDetailData[i]);

        //       if ($scope.browsedDetailData[i].selected_preferred_company && $scope.browsedDetailData[i].selected_preferred_company.length > 0) {
        //         $scope.browsedDetailData[i].prefered_patners = [];
        //         for (let j in $scope.browsedDetailData[i].selected_preferred_company) {
        //           $scope.browsedDetailData[i].prefered_patners.push($scope.browsedDetailData[i].selected_preferred_company[j].id)
        //         }
        //       }
        //     }
        //   }
        //   if (browsedData.length > 0) {
        //     var browsedId = {
        //       "browsed_ids": browsedData
        //     }
        //     swal({
        //       title: 'Are you sure ?',
        //       text: 'The lead will be moved into submitted leads, do you want to continue?',
        //       type: constants.warning,
        //       showCancelButton: true,
        //       confirmButtonClass: "btn-success",
        //       confirmButtonText: "Yes, Save!",
        //       closeOnConfirm: true
        //     },
        //       function (confirm) {
        //         if (confirm) {
        //           releaseCampaignService.saveBrowsed(browsedId)
        //             .then(function onSuccess(response) {
        //               if (response && response.data.data.error) {
        //                 swal(constants.name, response.data.data.error, constants.error);
        //               } else {
        //                 var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
        //                   return el.id;
        //                 }).indexOf($scope.shortlisted_spaces_id);
        //                 if (localindex_index != -1) {
        //                   $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_code = 1;
        //                   $scope.show_color($scope.releaseDetails.shortlisted_suppliers[localindex_index]);
        //                 }
        //                 $scope.getRequirementDetail($scope.shortlisted_spaces_id);
        //                 swal(constants.name, constants.save_success, constants.success);
        //               }
        //             }).catch(function onError(response) {
        //               console.log(response);
        //             })
        //         }
        //       });
        //   }
        // }

        $scope.removeBrowsed = function () {
          let browsedData = [];
          for (let i in $scope.browsedDetailData) {
            if ($scope.browsedDetailData[i].browsedCheck) {
              // browsedData.push($scope.browsedDetailData[i]._id);
              browsedData.push({"_id":$scope.browsedDetailData[i]._id,"shortlisted_spaces_id":$scope.shortlisted_spaces_id});
            }
          }
          if (browsedData.length > 0) {
            // var browsedId = {
            //   "browsed_ids": browsedData
            // }

            var browsedId = {
              "browsed": browsedData
            }
           

            swal({
              title: 'Are you sure ?',
              text: ' Remove Browsed Leads',
              type: constants.warning,
              showCancelButton: true,
              confirmButtonClass: "btn-success",
              confirmButtonText: "Yes, Remove!",
              closeOnConfirm: false,
              closeOnCancel: true
            },
              function (confirm) {
                if (confirm) {
                  releaseCampaignService.removeBrowsed(browsedId)
                    .then(function onSuccess(response) {
                      if (response && response.data.data.error) {
                        swal(constants.name, response.data.data.error, constants.error);
                      } else {
                        if(response && response.data && response.data.data && response.data.data.list_color_code != 'null'){
                          let color_class = '';
                          if (response.data.data.list_color_code == 1) {
                           color_class =  'yellow';;
                         }
                         else if (response.data.data.list_color_code == 2) {
                           color_class = '#7C4700';
                         }
                         else if (response.data.data.list_color_code == 3) {
                           color_class = 'green';
                         }
                         else if (response.data.data.list_color_code == 4) {
                           color_class = 'white';
                         } 
                         else if (response.data.data.list_color_code == 5) {
                          color_class = 'red';
                        }
                          var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
                            return el.id;
                          }).indexOf($scope.shortlisted_spaces_id);
                          if (localindex_index != -1) {
                            $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_code = response.data.data.list_color_code;
                              $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_class = color_class;
                              //$scope.releaseDetails.shortlisted_suppliers.splice(localindex_index, 1);
                            }
                        }
                        swal(constants.name, constants.delete_success, constants.success);
                      }

                    }).catch(function onError(response) {
                      console.log(response);
                    })
                  for (let j in browsedData) {
                    var localindex_index = $scope.browsedDetailData.map(function (el) {
                      return el._id;
                    }).indexOf(browsedData[j]._id);
                    if (localindex_index != -1) {
                        $scope.browsedDetailData.splice(localindex_index, 1);                
                    }
                  }
                }
              });
          }
        }


        $scope.sectorName= function(id){
          if(id!=null){
            for (var k in $scope.sectorList){
              if($scope.sectorList[k].id==id){
                return $scope.sectorList[k].business_type;
              }
            }
          }
          else{
            return 'NA';
          }
        }

        $scope.selected_preferred_partner = { buttonDefaultText: 'Select Preferred Partner' };
        $scope.addSubRequirementDetail = function (index) {
          $scope.requirementDetailData[index].requirements.push({});
        }

        $scope.downloadSheet = function (campaignId) {
          // if($scope.releaseDetails.campaign.type_of_end_customer_formatted_name == 'b_to_b_l_d'){
            // $window.open(Config.APIBaseUrl + 'v0/ui/leads/generate-campaign-hash/?campaign_id=' +campaignId );  
            releaseCampaignService.downloadSheet(campaignId)
            .then(function onSuccess(response) {
              console.log(response);
              if (response.data.data.one_time_hash) {
                $window.open(Config.APIBaseUrl + 'v0/ui/leads/download-campaign-data-sheet/' + response.data.data.one_time_hash + "/", '_blank');
              }
            }).catch(function onError(response_data) {
              console.log(response_data);
            })  
          // } else {
          //   $window.open(Config.APIBaseUrl + 'v0/ui/b2b/download-b2b-leads/?campaign_id=' +campaignId );
          // }
         
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


          var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
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
              for (let i in $scope.phases) {
                $scope.phases[i].phase_no = JSON.parse($scope.phases[i].phase_no);
              }


            }).catch(function onError(response) {
              console.log(response);
            })
        }

        $scope.assignUsers = function () {
          let users = [];
          users.push(JSON.parse($scope.assignUserData.userid));
          $scope.assignUserData.assigned_to_ids = users;
          $scope.assignUserData.campaign_id = $scope.campaign_id;
          releaseCampaignService.assignUserSupplier($scope.assignUserData)
            .then(function onSuccess(response) {
              $scope.assignUserData = {};
              swal(constants.name, "Assign user successfully.", constants.success);
            }).catch(function onError(response) {
              console.log(response);
            })
        }


        $scope.editPhaseDetails = function () {
          $scope.editPhase = true;
        }
        $scope.checkPhase = function () {
          for (let i in $scope.phases) {

            if (!$scope.phases[i].phase_no) {
              swal(constants.name, "Please add phase first", constants.warning);
              return false
            }
            if (!$scope.phases[i].start_date) {
              swal(constants.name, "Please select start date", constants.warning);
              return false
            }
            if (!$scope.phases[i].end_date) {
              swal(constants.name, "Please select end date", constants.warning);
              return false
            }
          }
          $scope.savePhases();
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
                if (response && response.data && response.data.data) {
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
              closeOnConfirm: false,
              closeOnCancel: true
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
              $scope.UserDataAssigned = response.data.data;
              // $scope.selectedUsers = [];
              $scope.usersMapListWithObjects = [];
              angular.forEach($scope.userList, function (data) {
                $scope.usersMapListWithObjects[data.id] = data;
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
          // getUsersList();
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
          var url = constants.base_url + constants.url_base + "import-sheet-in-existing-campaign/";
          if ($scope.releaseDetails.campaign.type_of_end_customer_formatted_name == 'b_to_b_r_g') {
            url = constants.base_url + constants.url_base_ui + "b2b/import-lead/" + $scope.campaign_id + "/";
          }
          if ($scope.file) {
            Upload.upload({
              url: url,
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
                if(response && response.data && response.data.data && response.data.data.general_error){
                  swal(constants.name, response.data.data.general_error.errors, constants.warning);
                } 
              });
          }
        }

        $scope.changeStartDate = function (index) {
          $scope.options.minDate = new Date($scope.phases[index].start_date);
          $scope.phases[index].end_date = "";
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
          var todayDate = new Date().toISOString();
          if ($scope.comments[$scope.commentModal.shortlisted_spaces_id]) {
            if ($scope.comments[$scope.commentModal.shortlisted_spaces_id].external) {
              if (commentType == "EXTERNAL") {
                $scope.comments[$scope.commentModal.shortlisted_spaces_id].external = {
                  comment: $scope.commentModal.comment,
                  "created_on": todayDate,
                  username: $rootScope.globals.userInfo.username
                  // internal:{},
                }
              }
            } else {
              if (commentType == "EXTERNAL") {
                $scope.comments[$scope.commentModal.shortlisted_spaces_id]['external'] = {
                  comment: $scope.commentModal.comment,
                  "created_on": todayDate,
                  username: $rootScope.globals.userInfo.username
                  // internal:{},
                }
              }
            }
            if ($scope.comments[$scope.commentModal.shortlisted_spaces_id].internal) {
              if (commentType != "EXTERNAL") {
                $scope.comments[$scope.commentModal.shortlisted_spaces_id].internal = {
                  comment: $scope.commentModal.comment,
                  "created_on": todayDate,
                  username: $rootScope.globals.userInfo.username
                  // internal:{},
                }
              }
            } else {
              if (commentType != "EXTERNAL") {
                $scope.comments[$scope.commentModal.shortlisted_spaces_id]['internal'] = {
                  comment: $scope.commentModal.comment,
                  "created_on": todayDate,
                  username: $rootScope.globals.userInfo.username
                  // internal:{},
                }
              }
            }
          } else {
            if (commentType == "EXTERNAL") {
              $scope.comments[$scope.commentModal.shortlisted_spaces_id] = {
                external: {
                  comment: $scope.commentModal.comment,
                  "created_on": todayDate,
                  username: $rootScope.globals.userInfo.username
                },
                internal: {},
              }
            } else {
              $scope.comments[$scope.commentModal.shortlisted_spaces_id] = {
                internal: {
                  comment: $scope.commentModal.comment,
                  "created_on": todayDate,
                  username: $rootScope.globals.userInfo.username
                },
                external: {},
              }
            }
          }
          releaseCampaignService.addComment($scope.campaign_id, $scope.commentModal)
            .then(function onSuccess(response) {
              $scope.commentModal = {};
              $scope.supplierDataForComment = undefined;
              $('#viewComments').modal('hide');
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

        $scope.viewContactComment = function (comments) {
          $scope.ContactComments = comments;
          $('#viewCommentsContact').modal('show');
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
              $scope.permissionBoxImages.push({ image_path: response.data.data.image_path, object_id: supplier.supplier_id });
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
              $scope.receiptImages.push({ image_path: response.data.data.image_path, object_id: supplier.supplier_id })
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
        $scope.changePhase = function (supplier, index) {
          if (supplier.booking_status == 'NB') {
            supplier.phase_no = '';
          }

          $scope.releaseDetails.shortlisted_suppliers[index].booking_sub_status = null;
          $scope.releaseDetails.shortlisted_suppliers[index].bk_status_id = null;
          $scope.releaseDetails.shortlisted_suppliers[index].bk_substatus_id = null;

          var localindex_index = $scope.bookingStatus.map(function (el) {
            return el.code;
          }).indexOf(supplier.booking_status);
          if (localindex_index != -1) {
            $scope.releaseDetails.shortlisted_suppliers[index].meeting_status = $scope.bookingStatus[localindex_index].booking_substatus;
            $scope.releaseDetails.shortlisted_suppliers[index].bk_status_id = $scope.bookingStatus[localindex_index].id;
          }



        }

        $scope.changeSubStatus = function (supplier, index) {
          var localindex_index = supplier.meeting_status.map(function (el) {
            return el.code;
          }).indexOf(supplier.booking_sub_status);
          if (localindex_index != -1) {
            $scope.releaseDetails.shortlisted_suppliers[index].bk_substatus_id = supplier.meeting_status[localindex_index].id;
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
          var assignUser = {};
          var localindex_index = $scope.usersMapListWithObjects.map(function (el) {
            return el.id;
          }).indexOf(parseInt($scope.userData.user));
          if (localindex_index != -1) {
            assignUser.id = $scope.usersMapListWithObjects[localindex_index].id;
            assignUser.username = $scope.usersMapListWithObjects[localindex_index].username;
            assignUser.supplier_id = data.supplier_id;
            assignUser.updated_at = new Date();
          }


          releaseCampaignService.setUserForBooking(data)
            .then(function onSuccess(response) {
              $scope.userData.user = "";

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
                    $('#addUserModal1').modal('hide');
                    $('#addUserModal').modal('hide');
                    $scope.$apply(function () {
                      $scope.assignedUserList.push(assignUser);
                    });
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
          if ($scope.releaseDetails.shortlisted_suppliers[indexOfSupplier].booking_status !== "BK"
            && $scope.releaseDetails.shortlisted_suppliers[indexOfSupplier].booking_status !== "MC"
            && $scope.releaseDetails.shortlisted_suppliers[indexOfSupplier].booking_status !== "OEL"
            && $scope.releaseDetails.shortlisted_suppliers[indexOfSupplier].booking_status !== "OCL"
            && $scope.releaseDetails.shortlisted_suppliers[indexOfSupplier].booking_status !== "OPBL"
            && $scope.releaseDetails.shortlisted_suppliers[indexOfSupplier].booking_status !== "OPFL"
            && $scope.releaseDetails.shortlisted_suppliers[indexOfSupplier].booking_status !== "OPHL"
            && $scope.releaseDetails.shortlisted_suppliers[indexOfSupplier].booking_status !== "OP"
          ) {
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

        $scope.show_color = function (supplier) {
         
          if ($scope.releaseDetails.campaign.type_of_end_customer_formatted_name == "b_to_b_r_g" || $scope.releaseDetails.campaign.type_of_end_customer_formatted_name == 'b_to_b_l_d') {
            if (supplier.color_code == 1) {
              return 'yellow';
            }
            else if (supplier.color_code == 2) {
              return '#7C4700';
            }
            else if (supplier.color_code == 3) {
              return 'green';
            }
            else if (supplier.color_code == 4) {
              return 'white';
            }
          }
          else {
            if (supplier.booking_status === 'BK' || supplier.booking_status === 'MC') {
              return 'green';
            }
            else if (supplier.booking_status === 'UN' || supplier.booking_status === 'NI' || supplier.booking_status === 'NE') {
              return 'white';
            }
            else if (supplier.booking_status === 'SR') {
              return 'red';
            }
            else if (supplier.booking_status === 'DP' || supplier.booking_status === 'TB' || supplier.booking_status === 'MF' || supplier.booking_status === 'RE') {
              return 'yellow';
            }
            else if (supplier.booking_status) {
              return 'brown';
            }
          }
        }

      }]);//Controller function ends here