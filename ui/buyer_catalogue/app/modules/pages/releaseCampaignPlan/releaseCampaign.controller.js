angular.module('catalogueApp')
.controller('ReleaseCampaignCtrl',
    ['$scope', '$rootScope', '$window', '$location','releaseCampaignService','$stateParams','permissions','Upload','cfpLoadingBar','constants','mapViewService','$timeout','commonDataShare',
    function ($scope, $rootScope, $window, $location, releaseCampaignService, $stateParams, permissions, Upload, cfpLoadingBar,constants, mapViewService, $timeout, commonDataShare) {
  $scope.campaign_id = $stateParams.proposal_id;
  $scope.positiveNoError = constants.positive_number_error;
  $scope.campaign_manager = constants.campaign_manager;
  $scope.editPaymentDetails = true;
  $scope.commentModal = {};
  $scope.userData = {};
  $scope.assign = {};
  $scope.body = {
    message : '',
  };
  $scope.editContactDetails = true;
  $scope.addContactDetails = true;
  $scope.userIcon = "icons/usericon.png";
  $scope.userInfo = $rootScope.globals.userInfo;
$scope.addNewPhase = true;
  if($rootScope.globals.userInfo.is_superuser == true){
    $scope.backButton = true;
  }
  $scope.supplierSummaryData = {};
  $scope.shortlistedSuppliersIdList = {}
  $scope.permissions = permissions.supplierBookingPage;
  $scope.showSummaryTab = false;
  $scope.editPaymentDetails = true;
  $scope.editContactDetails = true;
  $scope.addContactDetails = true;
$scope.addNewPhase =true;
 	$scope.headings = [
        {header : 'Index'},
        {header : 'Supplier Name'},
        {header : 'Area,(Sub Area)'},
        {header : 'Address'},
        {header : 'RelationShip Data'},
        {header : 'Flat Count'},
        {header : 'Tower Count'},
        // {header : 'Status'},
        // {header : 'Supplier ID'},
        {header : 'Inventory Type'},
        // {header : 'Stall Location'},
        {header : 'Inventory Count'},
        {header : 'Inventory Supplier Price'},
        {header : 'Total Supplier Price   (Per Flat)  '},
        {header : 'Negotiated Price'},
        {header : 'Freebies'},
        {header : 'Booking Status'},
        {header : 'Phase'},
        {header : 'Mode Of Payment'},
        {header : 'Contacts'},
        {header : 'Payment Status'},
      ];
  $scope.booking_status = [
    {name:'Undecided', code : 'NB'},
    {name:'Decision Pending', code : 'DP'},
    {name:'Confirmed Booking', code : 'BK'},
    {name:'Tentative Booking', code : 'TB'},
    {name:'Phone Booked' , code : 'PB'},
    {name:'Visit Booked', code : 'VB'},
    {name:'Rejected', code : 'SR'},
    {name:'Send Email', code : 'SE'},
    {name:'Visit Required', code : 'VR'},
    {name:'Call Required', code : 'CR'},
  ];
  $scope.bookingPriority = [
    {name: 'Very High', code: 'VH'},
    {name: 'High', code: 'HH'}
  ];


  $scope.payment_status = [
    {name:'Not Initiated', code : 'PNI'},
    {name:'Pending', code : 'PP'},
    {name:'Cheque Released' , code : 'PCR'},
    {name:'Paid', code : 'PD'},
    {name:'Rejected', code : 'PR'},
  ];

  $scope.contact_headings = [
    {header : 'Salutation'},
    {header : 'Name'},
    {header : 'Designation'},
    {header : 'Email'},
    {header : 'STD Code'},
    {header : 'Landline No'},
    {header : 'Mobile No'},
    {header : 'Remove'},

  ];
  $scope.payment_headings = [
    {header : 'Name On Cheque'},
    {header : 'Bank Name'},
    {header : 'IFSC Code'},
    {header : 'Account Number'},
  ];
  $scope.filters = [
    {name : 'Poster(PO)',  code : 'PO',   selected : false },
    {name : 'Standee(ST)', code : 'ST',   selected : false },
    {name : 'Stall(SL)',   code : 'SL',   selected : false },
    {name : 'Flyer(FL)',   code : 'FL',   selected : false },
    {name : 'Banner(BA)',   code : 'BA',   selected : false },
    {name : 'Gateway Arch',   code : 'GA',   selected : false },
    {name : 'SunBoard(SB)',   code : 'SB',   selected : false },
  ];
  $scope.invForComments = constants.inventoryNames;
  $scope.commentsType = constants.comments_type;
  $scope.shortlisted = constants.shortlisted;
  $scope.buffered = constants.buffered;
  $scope.removed = constants.removed;
  $scope.finalized = constants.finalized;

  $scope.statusCode = {
      shortlisted : constants.statusCode_shortlisted,
      buffered : constants.statusCode_buffered,
      removed : constants.statusCode_removed,
      finalized: constants.statusCodeFinalized,
  }
    $scope.clear = function() {
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

      $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
      };
      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[1];
      $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.saveDetails = function(){
      // alert("vidhi");
    };
    releaseCampaignService.getCampaignReleaseDetails($scope.campaign_id)
    	.then(function onSuccess(response){
        console.log(response);
        getUsersList();
        $scope.initialReleaseData = angular.copy(response.data.data);
        console.log($scope.initialReleaseData);
    		$scope.releaseDetails = angular.copy($scope.initialReleaseData);
        getAssignedSuppliers();
        // formatData();
        // -------------
        if(response.data.data){
          $scope.releaseDetails = response.data.data;
          $scope.Data = $scope.releaseDetails.shortlisted_suppliers;
          console.log($scope.Data);
          console.log($scope.releaseDetails);

          angular.forEach($scope.releaseDetails.shortlisted_suppliers, function(supplier,key){
            console.log(supplier);
            $scope.mapViewLat = supplier.latitude;
            $scope.mapViewLong = supplier.longitude;
            if(!supplier.stall_locations){
              supplier.stall_locations = [];
            }
            // console.log($scope.mapViewLat);
            // console.log($scope.mapViewLong);


          })


          setDataToModel($scope.releaseDetails.shortlisted_suppliers);
          $scope.loading = response;
          angular.forEach($scope.releaseDetails.shortlisted_suppliers, function(supplier){
            $scope.shortlistedSuppliersIdList[supplier.supplier_id] = supplier;
          })
        }else {
          swal(constants.name, "You do not have access to Proposal", constants.warning);
          $scope.loading = response;
        }
// ---------------
    	})
    	.catch(function onError(response){
        console.log(response);
        $scope.loading = response;
        commonDataShare.showErrorMessage(response);
    		console.log("error occured", response.status);
    	});

      var setDataToModel = function(suppliers){
        for(var i=0;i<suppliers.length;i++){
          console.log(suppliers);
          suppliers[i].total_negotiated_price = parseInt(suppliers[i].total_negotiated_price);
          // angular.forEach($scope.phases, function(phase){
          //   suppliers[i].phase_no = parseInt(phase.id);
          //
          // })
        }
      }

      $scope.setPhase = function (supplier,id) {
                 console.log(supplier,id);
                 supplier.phase_no = id;
                 console.log(supplier.phase_no);
             }

    $scope.setUserForBooking = function() {
      console.log($scope.userSupplierData);
      $scope.societySupplierName = $scope.userSupplierData.supplierName;
      var data = {
        assigned_by: $scope.userInfo.id,
        assigned_to_ids:  [parseInt($scope.userData.user)],
        campaign_id: $scope.campaign_id,
        supplier_id: $scope.userSupplierData.supplier_id,
        supplierName: $scope.userSupplierData.name,
      }
      console.log(data);
      $scope.societySupplierName = data.supplierName;
      releaseCampaignService.setUserForBooking(data)
      .then(function onSuccess(response){
        console.log(response);

      swal(constants.name,constants.assign_success,constants.success);
      })
      .catch(function onError(response){
      });
    }

    $scope.emptyList = {NA:'NA'};
    $scope.getFilters = function(supplier){
      var keys = Object.keys(supplier.shortlisted_inventories);
      if(keys.length > 0){
        $scope.inventory_type = supplier.shortlisted_inventories
        return supplier.shortlisted_inventories;
      }
      else{
        return $scope.emptyList;
      }
    }
    //Start:To set contacts to show in contactModal
    $scope.setContact = function(supplier){
      $scope.payment = supplier;
      $scope.editContactDetails = true;
      console.log(supplier);

    }
    //End:To set contacts to show in contactModal
    //Start:To set payment details to show in paymentModal
    $scope.setPayment = function(supplier){
        $scope.payment = supplier;
    }
    //End:To set payment details to show in paymentModal
    //Start: TO go to audit release plan pages
    $scope.changeLocation = function(){
      $location.path('/' + $scope.campaign_id + '/auditReleasePlan');
    }
    //To show inventory ids in modal after clicking on inventory type
    $scope.setInventoryIds = function(filter){
      $scope.inventoryIds = [];
      $scope.inventoryIds = filter.detail;
    }
    $scope.updateData = function(){
      console.log($scope.releaseDetails.shortlisted_suppliers);
      releaseCampaignService.updateAuditReleasePlanDetails($scope.campaign_id,$scope.releaseDetails.shortlisted_suppliers)
      .then(function onSuccess(response){
        console.log(response);
        swal(constants.name,constants.updateData_success,constants.success);
      })
      .catch(function onError(response){
        commonDataShare.showErrorMessage(response);
        // swal(constants.name,constants.updateData_error,constants.error);
        console.log("error occured", response.status);
      });
    }
    $scope.getCampaignState = function(state){
      return constants[state];
    }
    $scope.getInventoryPrice = function(price, inventory){
      if(inventory == 'POSTER')
        price = price * 0.3;
      return price;
    }
    $scope.getTotalSupplierPrice = function(supplier){
      var totalPrice = 0;
      angular.forEach(supplier.shortlisted_inventories, function(value, key){
        value['days'] = value.detail[0].inventory_number_of_days;
        if(key == 'POSTER')
          totalPrice = totalPrice + value.actual_supplier_price *0.3;
        else
          totalPrice += value.actual_supplier_price;
      })
      return totalPrice;
    }
    //Start: code added to search & show all suppliers on add societies tab
    $scope.supplier_names = [
      { name: 'Residential',      code:'RS'},
      { name: 'Corporate Parks',  code:'CP'},
      { name: 'Bus Shelter',  code:'BS'},
      { name: 'Gym',  code:'GY'},
      { name: 'Saloon',  code:'SA'},
      { name: 'Retail Store',  code:'RE'},
      ];
    $scope.search = {};
    $scope.search_status = false;
    $scope.supplier_type_code = {};
    $scope.center_index = null;
    $scope.searchSuppliers = function(){
     try{
      $scope.search_status = false;
      console.log($scope.supplier_type_code.code,$scope.search.query);
      if($scope.supplier_type_code.code && $scope.search.query){
        mapViewService.searchSuppliers($scope.supplier_type_code.code,$scope.search.query,$scope.releaseDetails.campaign.principal_vendor)
          .then(function onSuccess(response, status){
            console.log(response);
              $scope.center_index = null;
            $scope.supplierData = response.data.data;
            if($scope.supplierData.length > 0){
              $scope.search_status = true;
              $scope.errorMsg = undefined;
            }
            else {
              $scope.errorMsg = "No Results Found, Please enter valid Search Text";
              $scope.search_status = false;
            }
          })
          .catch(function onError(response, status){
              console.log("Error Happened while searching");
              commonDataShare.showErrorMessage(response);
              // swal(constants.name,constants.errorMsg,constants.error);
          });
        }
        else {
          $scope.errorMsg = "Please Fill all the details";
          $scope.supplierData = [];
          $scope.search_status = false;
        }
      }catch(error){
        console.log(error.message);
      }
    }
      //End: code added to search & show all suppliers on add societies tab
    $scope.addSuppliersToList = function(supplier){
      if(!(supplier.supplier_id in $scope.shortlistedSuppliersIdList || supplier.supplier_id in $scope.supplierSummaryData)){
        $scope.supplierSummaryData[supplier.supplier_id] = supplier;
        swal(constants.name,constants.updateData_success,constants.success);
      }
      else
      swal(constants.name,constants.already_exist,constants.error);
    }
    $scope.removeSupplierToList = function(supplier_id){
      delete $scope.supplierSummaryData[supplier_id];
    }
    //Start: function to clear searched supplier data whenever add suppliers button clicked
    $scope.clearSearchData = function(){
      try{
        $scope.supplierData = [];
        $scope.search_status = false;
        $scope.supplier_type_code = {};
        $scope.search = {};
        $scope.errorMsg = undefined;
        $scope.center_index = null;

        $scope.supplierSummaryData = {};

      }catch(error){
        console.log(error.message);
      }
    }
    $scope.addSuppliersToCampaign = function(){
      var supplier_ids = [];
      var filters = [];
      angular.forEach($scope.supplierSummaryData, function(supplier){
        var supplierKeyValueData = {
          id : supplier.supplier_id,
          status : 'F',
        }
        supplier_ids.push(supplierKeyValueData);

      })
      angular.forEach($scope.filters, function(filter){
        if(filter.selected){
          var filterKeyValuData = {
            id : filter.code
          }
          filters.push(filterKeyValuData);
        }
      })
      console.log(filters,$scope.supplier_type_code.code);

      var data = {
        campaign_id : $scope.releaseDetails.campaign.proposal_id,
        center_data : {
        },
      }
      data.center_data[$scope.supplier_type_code.code] = {
       supplier_data : supplier_ids,
       filter_codes : filters,
     };
      console.log(data);
      if(filters.length && supplier_ids.length){
        releaseCampaignService.addSuppliersToCampaign(data)
        .then(function onSuccess(response){
          console.log(response);
              $('#addNewSocities').modal('hide');
          swal(constants.name,constants.add_data_success,constants.success);
        }).catch(function onError(response){
          console.log(response);
        })
      }else{
        alert("Atleast One Supplier and One Filter is required to Continue");
      }

    }


$scope.orderProperty = "f";
$scope.setOrderProperty = function(propertyName) {
        if ($scope.orderProperty === propertyName) {
            $scope.orderProperty = '-' + propertyName;
        } else if ($scope.orderProperty === '-' + propertyName) {
            $scope.orderProperty = propertyName;
        } else {
            $scope.orderProperty = propertyName;
        }
    };

$scope.searchSelectAllModel=[];

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


    //
    // $scope.selected_baselines_customTexts = {buttonDefaultText: 'Select Freebies'};
    //
    // $scope.selectAllLocation=[];
    // $scope.neighborhoods2 = [
    //   "Near Entry Gate",
    //   "Near Exit Gate",
    //   "In Front of Tower",
    //   "Near Garden",
    //   "Near Play Area",
    //   "Near Club House",
    //   "Near Swimming Pool",
    //   "Near Parking Area",
    //   "Near Shopping Area",
    // ];
    // $scope.selected_baseline = {
    //    template: '<b>{{option}}</b>',
    //    // selectedToTop: true,
    //    smartButtonTextConverter(skip, option) { return option; },
    //  };
    //      $scope.customEvents = {onItemSelect: function(item) {console.log(item,$scope.selectAllLocation);}};
    //
    //     $scope.selected_customTexts = {buttonDefaultText: 'Stall Location'};

        $scope.getRelationShipData = function(supplier){
          $scope.relationshipData = {};
          var supplierCode = 'RS';
          var campaignId = $scope.releaseDetails.campaign.proposal_id;
          $scope.supplierFlatCount = supplier.flat_count;
          releaseCampaignService.getRelationShipData(supplier.supplier_id,supplierCode,campaignId)
          .then(function onSuccess(response){
            $scope.relationshipData = response.data.data;
            console.log(response);
          }).catch(function onError(response){
            console.log(response);
          })
        }

        $scope.savePaymentDetails = function(){
          console.log($scope.payment);
          releaseCampaignService.savePaymentDetails($scope.payment,$scope.payment.supplier_id)
          .then(function onSuccess(response){
            $scope.editPaymentDetails = true;
            console.log($scope.editPaymentDetails);

            // $scope.payment.name_for_payment = response.data.name_for_payment;
            // $scope.payment.bank_name = response.data.bank_name;
            // $scope.payment.ifsc_code = response.data.ifsc_code;
            // $scope.payment.ifsc_code = response.data.account_no;
            console.log(response);
          }).catch(function onError(response){
            console.log(response);
          })
        }

      $scope.setEditPaymentDetails = function(){
          $scope.editPaymentDetails = false;
          console.log($scope.editPaymentDetails);
        }

        var temp_data = [];

        $scope.saveContactDetails = function(){
          $scope.payment['basic_contact_available'] = true;
          $scope.payment['basic_contacts'] = $scope.payment.contacts;
          releaseCampaignService.saveContactDetails($scope.payment,$scope.payment.supplier_id)
          .then(function onSuccess(response){
            console.log(response);
            $scope.editContactDetails = true;
            swal(constants.name, constants.add_data_success, constants.success);
          }).catch(function onError(response){
            console.log(response);
          })

        }
        $scope.setEditContactDetails = function(){
            $scope.editContactDetails = false;
            console.log($scope.editContactDetails);
          }
          $scope.addRow = ({});
          $scope.addContactDetail = function(){
            $scope.addRow = $scope.payment.contacts;
            $scope.addContactDetails = false;
            console.log($scope.addRow);
          $scope.addRow.push({});
          }

          $scope.removeContact = function(index){
            $scope.payment.contacts.splice(index , 1);
          }
        $scope.IsVisible = false;
       $scope.updateSupplierStatus = function (value) {
      //If DIV is visible it will be hidden and vice versa.
      $scope.IsVisible = value == "Y";
      }

   $scope.uploadImage = function(file,supplier){
     console.log(supplier);

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
                 // 'inventory_activity_assignment_id' : inventory.id,
                 // 'supplier_name' : inventory.supplier_name,
                 // 'activity_name' : inventory.act_name,
                 // 'inventory_name' : inventory.inv_type,
                 // 'activity_date' : inventory.act_date,
               },
               headers: {'Authorization': 'JWT ' + token}
           }).then(function onSuccess(response){
                 uploaded_image = {'image_path': response.data.data };
                 supplier.images.push(uploaded_image);
                 cfpLoadingBar.complete();
                 // $("#progressBarModal").modal('hide');
           })
           .catch(function onError(response) {
             cfpLoadingBar.complete();
             console.log(response);
           });
         }
       }
        //to send email
        $scope.loadSpinner = true;
        $scope.sendNotification = function(){
          console.log($scope.body);
          $scope.loadSpinner = false;
          var email_Data = {
            subject:$scope.paymentStatus + " Details For " + $scope.supplierPaymentData.name,
            body:$scope.body.message,
            to:constants.account_email_id,
          };
          releaseCampaignService.sendMail(email_Data)
          .then(function onSuccess(response){
            console.log(response);
            $scope.taskId = response.data.data.task_id;
            sendMailInProgress();
        	})
        	.catch(function onError(response){
            $scope.loadSpinner = true;
            $('#selectedPaymentModal').modal('hide');
            // $('#declineModal').modal('hide');
            commonDataShare.showErrorMessage(response);
            // swal(constants.name,constants.onhold_error,constants.error);
        		console.log("error occured", response);
        	});
          $scope.reason = "";
       }

       var sendMailInProgress = function(){
         releaseCampaignService.sendMailInProgress($scope.taskId)
         .then(function onSuccess(response){
           if(response.data.data.ready != true){
              $timeout(sendMailInProgress,constants.sleepTime); // This will perform async
           }
           else if(response.data.data.status == true){
             $scope.loadSpinner = true;
             $('#selectedPaymentModal').modal('hide');
             // $('#selectedPaymentModal').modal('hide');

             swal(constants.name,constants.email_success,constants.success);
           }
           else {
             $scope.loadSpinner = true;
             swal(constants.name,constants.email_error,constants.error);
           }
         }).catch(function onError(response){
           $scope.loadSpinner = true;
           $('#onHoldModal').modal('hide');
           $('#declineModal').modal('hide');
           commonDataShare.showErrorMessage(response);
           swal(constants.name,constants.email_error,constants.error);
         });
       }

       $scope.getPaymentDetails = function(supplier,status){
         console.log(supplier);
         $scope.body.message = '';
         $scope.supplierPaymentData = supplier;
          $scope.paymentStatus = status;
          if(status == 'NEFT' || status == 'CASH'){
            supplier.payment_status = 'PP';
          }else if(status == 'CHEQUE'){
            supplier.payment_status = 'PCR';
          }

          supplier.booking_status = 'NB';

          $scope.body.message = "Beneficiary Name : " +  $scope.supplierPaymentData.name_for_payment + ",     " +
            "Bank Account Number : " + $scope.supplierPaymentData.account_no + ",     " +
            "IFSC Code : " + $scope.supplierPaymentData.ifsc_code + ",     " +
            "Negotiated Price :" + $scope.supplierPaymentData.total_negotiated_price + ",     " +
            "Message : ";
       }

       $scope.updateSupplierStatus = function(supplier){
         if(supplier.transaction_or_check_number){
           console.log("hello");
           supplier.payment_status = 'PD';
           supplier.booking_status = 'BK';
         }

       }
       $scope.getPhases = function(){
         $scope.editPhase = false;
         releaseCampaignService.getPhases($scope.campaign_id)
         .then(function onSuccess(response){
           console.log(response);
           $scope.phaseMappingList = {};
           angular.forEach(response.data.data, function(phase){
             phase.start_date = new Date(phase.start_date);
             phase.end_date = new Date(phase.end_date);
             $scope.phaseMappingList[phase.id] = phase;
           })
           console.log($scope.phaseMappingList);
           $scope.phases = response.data.data;
           console.log($scope.phases);

         }).catch(function onError(response){
           console.log(response);
         })
       }


       $scope.editPhaseDetails = function(){
         $scope.editPhase = true;
       }
       $scope.savePhases = function(){
         console.log($scope.phases);
         releaseCampaignService.savePhases($scope.phases,$scope.campaign_id)
         .then(function onSuccess(response){
           console.log(response);
           swal(constants.name, constants.add_data_success, constants.success);
           angular.forEach($scope.phases, function(phase){
             phase.start_date = new Date(phase.start_date);
             phase.end_date = new Date(phase.end_date);
           })
           $scope.getPhases();
           $scope.editPhase = false;
         }).catch(function onError(response){
           console.log(response);
         })
       }

        $scope.getPhases();
        $scope.addPhase = ({});
        $scope.addPhases = function(){
          $scope.addPhase = $scope.phases;
          $scope.addNewPhase = false;
          console.log($scope.addPhase);
        $scope.phases.push({});
        }

        $scope.removePhase = function(id){
          // $scope.phases.splice(index , 1);
          $scope.editPhase = false;
          console.log(id);
          releaseCampaignService.removePhase(id)
          .then(function onSuccess(response){
            console.log(response);
            swal(constants.name, constants.delete_success, constants.success);
            $scope.getPhases();
          }).catch(function onError(response){
            console.log(response);
          })
        }

       var setSocietyLocationOnMap = function(supplier){
         var mapOptions = {
              center:new google.maps.LatLng(0,0),
             //  zoom:13
              mapTypeId: google.maps.MapTypeId.ROADMAP
           }
           var map = new google.maps.Map(document.getElementById("supplierMap"),mapOptions);

           var marker = new google.maps.Marker({
              position: new google.maps.LatLng(supplier.society_latitude, supplier.society_longitude),
              map: map,
              mapTypeId: google.maps.MapTypeId.ROADMAP
           });


           var latlngbounds = new google.maps.LatLngBounds();
           latlngbounds.extend(marker.position);
           // map.setCenter(latlngbounds.getCenter());
           map.fitBounds(latlngbounds);
           //  map.setZoom(15);
           // map.setCenter(marker.getPosition());

           google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
             //  map.setCenter(marker.getPosition());
               if (this.getZoom()){
                   this.setZoom(16);
               }
             });

             google.maps.event.addListenerOnce(map, 'idle', function() {
               google.maps.event.trigger(map, 'resize');
             });
             // map.panToBounds(latlngbounds);

           // bounds.extend(new google.maps.LatLngBounds(19.088291, 72.442383));
           // map.fitBounds(bounds);

         }
         function inventoryCount (inventoryDetails){
                var totalPoster = inventoryDetails.lift_count + inventoryDetails.nb_count ;
                $scope.totalInventoryCount = {
                   totalPoster  : totalPoster,
                };
                return $scope.totalInventoryCount;
         }

       $scope.getSocietyDetails = function(supplier,supplierId,center,index){
         console.log(supplier);
         // $location.path('/' + supplierId + '/SocietyDetailsPages' , '_blank');
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
         mapViewService.getSociety(supplier_id,$scope.supplier_type_code)
          .then(function onSuccess(response) {
            console.log(response);
            $scope.loading = response;
            setSocietyLocationOnMap(response.data.data.supplier_data);
             $scope.loading = response.data.data.supplier_data;
            $scope.myInterval=300;
            $scope.society_images = response.data.data.supplier_images;
            $scope.amenities = response.data.data.amenities;
            $scope.society = supplier;
           //  $scope.society = response.data.supplier_data;
            //$rootScope.societyname = response.society_data.society_name;
            $scope.residentCount = estimatedResidents(response.data.data.supplier_data.flat_count);
            $scope.flatcountflier = response.data.data.supplier_data.flat_count;
            var baseUrl = constants.aws_bucket_url;

            // Start : Code added to seperate images by their image tag names
            var imageUrl;
            $scope.SocietyImages = [],$scope.FlierImages=[],$scope.PosterImages=[],$scope.StandeeImages=[],$scope.StallImages=[],$scope.CarImages=[];
            for(var i=0;i<$scope.society_images.length;i++){
              if($scope.society_images[i].name == 'Society'){
                imageUrl = baseUrl + $scope.society_images[i].image_url;
                $scope.SocietyImages.push(imageUrl);
              }
              if($scope.society_images[i].name == 'Standee Space'){
                imageUrl = baseUrl + $scope.society_images[i].image_url;
                $scope.StandeeImages.push(imageUrl);
              }
              if($scope.society_images[i].name == 'Stall Space'){
                imageUrl = baseUrl + $scope.society_images[i].image_url;
                $scope.StallImages.push(imageUrl);
              }
              if($scope.society_images[i].name == 'Fliers'){
                imageUrl = baseUrl + $scope.society_images[i].image_url;
                $scope.FlierImages.push(imageUrl);
              }
              if($scope.society_images[i].name == 'Car Display'){
                imageUrl = baseUrl + $scope.society_images[i].image_url;
                $scope.CarImages.push(imageUrl);
              }
              if($scope.society_images[i].name == 'Lift' || $scope.society_images[i].name == 'Notice Board'){
                imageUrl = baseUrl + $scope.society_images[i].image_url;
                $scope.PosterImages.push(imageUrl);
              }
          }
          // End : Code added to seperate images by their image tag names
         });

         mapViewService.get_inventory_summary(supplier_id, $scope.supplier_type_code)
         .then(function onSuccess(response){
           console.log(response);
           $scope.societyDetails = true;
           if('inventory' in response.data){
             $scope.inventoryDetails = response.data.inventory;
              $scope.totalInventoryCount = inventoryCount($scope.inventoryDetails);
              $scope.model = response.data.inventory;
              $scope.inventories_allowed = response.data.inventories_allowed_codes;
              $scope.show_inventory = true;
            }
         }).catch(function onError(response){
           console.log("error",response);
           commonDataShare.showErrorMessage(response);
         });
       }//End of function getSocietyDetails

       var getUsersList = function(){
         commonDataShare.getUsersList()
           .then(function onSuccess(response){
             $scope.userList = response.data.data;
             $scope.selectedUsers = [];
             $scope.usersMapListWithObjects = [];
             angular.forEach($scope.userList, function(data){
               $scope.usersMapListWithObjects[data.id] = data;
             })
             console.log($scope.usersMapListWithObjects);
           })
           .catch(function onError(response){
             console.log("error occured", response.status);
             commonDataShare.showErrorMessage(response);
           });
       }

       $scope.settingsForUsers = { enableSearch: true,
           keyboardControls: true ,idProp : "id",
           template: '{{option.username}}', smartButtonTextConverter(skip, option) { return option; },
           showCheckAll : true,
           scrollableHeight: '300px', scrollable: true};
           $scope.selected_baselines_customTexts_users = {buttonDefaultText: 'Select Users'};
           $scope.eventsForUsers = {
             onItemSelect : function(item){
             }
          }
       $scope.initialiseImportSheet = function(){
         getUsersList();
         getProposalCenters();
       }
       var getProposalCenters = function(){
         releaseCampaignService.getProposalCenters($scope.campaign_id)
         .then(function onSuccess(response){
           $scope.centerData = response.data.data[0];
           console.log(response);
         }).catch(function onError(response){
           console.log(response);
         })
       }
       $scope.importThroughSheet = function(){

         console.log("hello", $scope.assign);
         var token = $rootScope.globals.currentUser.token;
         if ($scope.file) {
           Upload.upload({
               url: constants.base_url + constants.url_base + "import-sheet-in-existing-campaign/",
               data: {
                 file: $scope.file,
                 is_import_sheet : true,
                 proposal_id : $scope.campaign_id,
                 center_id : $scope.centerData.id,
                 invoice_number : '',
                 tentative_start_date : '',
                 tentative_end_date : '',
                 assigned_by : $scope.assign.to,
                 assigned_to : $scope.assign.to,
                 data_import_type : "base-data"
               },
               headers: {'Authorization': 'JWT ' + token}
           }).then(function onSuccess(response){
                 console.log(response);

           })
           .catch(function onError(response) {
               console.log(response);
               // if(response.data){
               //   swal(constants.name,response.data.data.general_error,constants.error);
               // }
             });
       }
     }
       $scope.uploadFiles = function(file){
         $scope.file = file;
       }
       $scope.addComment = function(){
         console.log($scope.commentModal);
         // $scope.commentModal['related_to'] = constants.booking_related_comment;
         $scope.commentModal['shortlisted_spaces_id'] = $scope.supplierDataForComment.id;
         releaseCampaignService.addComment($scope.campaign_id,$scope.commentModal)
         .then(function onSuccess(response){
           console.log(response);
           $scope.commentModal = {};
           $scope.supplierDataForComment = undefined;
           $('#addComments').modal('hide');
           swal(constants.name, constants.add_data_success, constants.success);
         }).catch(function onError(response){
           console.log(response);
         })
       }
      $scope.getSupplierForComments = function(supplier){
        $scope.supplierDataForComment = supplier;
      }
      $scope.selectedCommentForView = {};
      $scope.viewComments = function(supplier){
        $scope.supplierDataForComment = supplier;
        console.log(supplier);
        $scope.commentsData = {};
        console.log($scope.commentsData);
        // console.log(relatedTo);
        console.log($scope.selectedCommentForView.type);
        if($scope.selectedCommentForView.type == undefined){
            $scope.selectedCommentForView.type = $scope.commentsType[0];
            console.log($scope.commentsType);
        }

        var relatedTo = $scope.selectedCommentForView.type;
        console.log(relatedTo);
        var spaceId = $scope.supplierDataForComment.id;

        releaseCampaignService.viewComments($scope.campaign_id,spaceId,relatedTo)
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

      $scope.customFreebies = [
          'Whatsapp Group',
          'Email Group',
          'Building ERP',
          'Door to Door'
        ];
          $scope.addFreebies = function(freebiesData,rowIndex,index){
          console.log(freebiesData);
            $scope.customfreebies.push(freebiesData);
            $scope.selectedRow = rowIndex;
            console.log($scope.selectedRow);
          //
          // else
          //   $scope.customfreebies.splice(index,1);
          // console.log($scope.customfreebies);
        }
  $scope.deleteSupplier = function(id,index){

    var data = [];
    data.push(id);
    console.log(data,index);
    releaseCampaignService.deleteSupplier(data)
    .then(function onSuccess(response){
      console.log(response);
      $scope.releaseDetails.shortlisted_suppliers.splice(index,1);
      $scope.$watch();
      swal(constants.name, constants.delete_success, constants.success);
    }).catch(function onError(response){
      console.log(response);
    })
  }

  $scope.uploadImagePermission = function(file){
        $scope.permissionBoxFile = file;
  }
  $scope.permissionBoxData = {};
  $scope.uploadPermissionBoxImage = function(supplier){
    // cfpLoadingBar.set(0.3)
    console.log(supplier);
        var token = $rootScope.globals.currentUser.token;
        if ($scope.permissionBoxFile) {
          cfpLoadingBar.start();
          Upload.upload({
              url: constants.base_url + constants.url_base + "hashtag-images/" + $scope.campaign_id +constants.upload_permission_box_image_url,
              data: {
                file: $scope.permissionBoxFile,
                'comment' : supplier.permissionComment||'',
                'object_id' : supplier.supplier_id,
                'hashtag' : 'Permission Box',
                'campaign_name' : $scope.releaseDetails.campaign.name,
                'supplier_name' : supplier.name,
                'supplier_type_code' : 'RS'
              },
              headers: {'Authorization': 'JWT ' + token}
          }).then(function onSuccess(response){
              console.log(response);
                supplier.permissionComment = '';
                // uploaded_image = {'image_path': response.data.data };
                // inventory.images.push(uploaded_image);
                cfpLoadingBar.complete();
                swal(constants.name, constants.image_success, constants.success);
                // $("#progressBarModal").modal('hide');
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
      $scope.getPermissionBoxImages = function(supplier){
        releaseCampaignService.getPermissionBoxImages($scope.campaign_id,supplier.supplier_id)
        .then(function onSuccess(response){
          console.log(response);
          if(response.data.data.length){
              angular.forEach(response.data.data, function(data){
                data['image_url'] = 'http://androidtokyo.s3.amazonaws.com/' + data.image_path;
              })
          }else {
            swal(constants.name, constants.image_empty, constants.warning);
          }
          $scope.perBoxImageData = response.data.data;
        }).catch(function onError(response){
          console.log(response);
        })
      }
      $scope.changeInventoryInDays = function(supplier,inv,filter){
        console.log(filter);
        angular.forEach(supplier.shortlisted_inventories[inv].detail, function(data){
          data.inventory_number_of_days = filter.days;
        })
      }

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
    $scope.changePhase = function(supplier){
      if(supplier.booking_status == 'NB'){
        console.log("hello");
        supplier.phase_no = '';
      }
      console.log(supplier);
    }
    $scope.setUserSupplier = function(supplier){
      console.log(supplier);
      $scope.userSupplierData = supplier;
    }
    var getAssignedSuppliers = function(){
      releaseCampaignService.getAssignedSuppliers($scope.campaign_id, $scope.userInfo.id)
      .then(function onSuccess(response){
        console.log(response);
        $scope.assignedData = response.data.data;
        $scope.assignedDataIdsList = {};
        $scope.assignedDataFinal = [];
        angular.forEach($scope.assignedData, function(data){
          $scope.assignedDataIdsList[data.supplier_id] = data;
        })
        angular.forEach($scope.initialReleaseData.shortlisted_suppliers, function(data){
          if($scope.assignedDataIdsList.hasOwnProperty(data.supplier_id)){
            $scope.assignedDataFinal.push(data);
          }
          })
        $scope.releaseDetails.shortlisted_suppliers = [];
        $scope.releaseDetails.shortlisted_suppliers = angular.copy($scope.assignedDataFinal);

        formatData();
      }).catch(function onError(response){
        console.log(response);
      })
    }
    var formatData = function(){
      // $scope.Data = $scope.releaseDetails.shortlisted_suppliers;
      // console.log($scope.Data);
      // console.log($scope.releaseDetails);

      angular.forEach($scope.releaseDetails.shortlisted_suppliers, function(supplier,key){
        console.log(supplier);
        $scope.mapViewLat = supplier.latitude;
        $scope.mapViewLong = supplier.longitude;
        if(!supplier.stall_locations){
          supplier.stall_locations = [];
        }
        // console.log($scope.mapViewLat);
        // console.log($scope.mapViewLong);


      })


      setDataToModel($scope.releaseDetails.shortlisted_suppliers);
      $scope.loading = true;
      angular.forEach($scope.releaseDetails.shortlisted_suppliers, function(supplier){
        $scope.shortlistedSuppliersIdList[supplier.supplier_id] = supplier;
      })
    }
    $scope.selectedUser = {};
    $scope.changeSupplierData = function(){
      console.log("hello");
      if($scope.selectedUser.value == 'all'){
        $scope.releaseDetails = angular.copy($scope.initialReleaseData);
        console.log($scope.releaseDetails);
        formatData();
      }
      if($scope.selectedUser.value == 'assigned'){
        $scope.releaseDetails.shortlisted_suppliers = $scope.assignedDataFinal;
        console.log($scope.releaseDetails);
        formatData();
      }
    }

}]);//Controller function ends here
