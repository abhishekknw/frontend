angular.module('machadaloPages')
.controller('CreateCampaignCtrl',
    ['$scope', '$rootScope', '$window', '$location', 'pagesService',
    function ($scope, $rootScope, $window, $location, pagesService) {

      $scope.model = {};
      $scope.model.business = {};
    	$scope.businesses = [];
      $scope.supplier_types = ['Society', 'Corporate', 'Club', 'Mall', 'School/College']
    	$scope.campaign_types = ['Poster', 'Standee', 'Stall', 'CarDisplay', 'Fliers']
    	$scope.campaign_sub_types = {
    		'Poster': ['A4', 'A3'],
    		'Standee': ['Small', 'Medium', 'Large'],
    		'Stall':['Small', 'Medium', 'Large','Canopy'],
    		'CarDisplay':['Normal', 'Premium'],
            'Fliers': ['Normal']
    	}

        $scope.clear = function() {
        $scope.dt = null;
      };

      $scope.maxDate = new Date(2020, 5, 22);
      $scope.today = new Date();
      $scope.popup1 = false;
      $scope.popup2 = false;


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

      //$scope.phoneNumberPattern = /^[1-9]{1}[0-9]{9}$/
    	$scope.campaign_type = {}

      $scope.contact = {
        name: '',
        designation: '',
        department: '',
        email: '',
        phone: '',
        spoc: ''
      };

      $scope.bsSelect = undefined; // initially nothing selected as existing business

      var contactCopy = angular.copy($scope.contact);
      $scope.model.business.contacts = [$scope.contact];

      pagesService.loadBusinessTypes()
      .success(function (response){
          $scope.busTypes = response;
          console.log("BusTypes : ");
          console.log($scope.busTypes);
        });

        $scope.getSubTypes = function() {
          // debugger;
          console.log($scope.model.business.business_type_id);
          if($scope.model.business.business_type_id == ''){
            $scope.sub_types = {};
            $scope.model.business.sub_type_id = "";
          }else{
            var id = $scope.model.business.business_type_id;

            pagesService.getSubTypes(id)
            .success(function (response){
                $scope.sub_types = response;
              });
          }
        }

      $scope.addNew = function() {
        // object def is directly added to avoid different array elements pointing to same object

        $scope.model.business.contacts.push({
        name: '',     designation: '',    department: '',
        email: '',    phone: '',      spoc: ''
      });
        console.log($scope.model.business.contacts);


      };

       $scope.remove = function(index) {
        $scope.model.business.contacts.splice(index, 1);
        console.log($scope.model.business.contacts);
      };

    	$scope.getAllBusinesses = function() {
        $scope.bsSelect = undefined;
	    	pagesService.getAllBusinesses()
	    	.success(function (response, status) {
	    		    console.log(response);
	            $scope.businesses = response;
	       });
	    };

    	$scope.getBusiness = function() {
    		pagesService.getBusiness($scope.bsSelect)
	    	.success(function (response, status) {
	    		    console.log("model.business :  ")
              console.log(response);
	            $scope.model.business = response;
              $scope.model.business.business_type_id = $scope.model.business.type_name.id.toString();
              $scope.getSubTypes();
              $scope.model.business.sub_type_id = $scope.model.business.sub_type.id.toString();
	            $scope.choice = "selected";
	       });
      };

      $scope.readMore = function() {
              $scope.seeMore = "true";
      };

      $scope.editDetails = function() {
              $scope.choice = "select";
      };

      $scope.newBusiness = function() {
              $scope.choice = "new";
              $scope.bsSelect = undefined;
              $scope.contact = angular.copy(contactCopy);
              $scope.form.$setPristine();
              $scope.model.business = {};
              $scope.model.business.contacts = [$scope.contact];
      };

    	$scope.create = function() {
            // console.log("type_id : ", $scope.type_id, "\n\nbusTypes : ");
            // for (var key in $scope.busTypes){
            //   if ($scope.busTypes.hasOwnProperty(key)){
            //     if ($scope.busTypes[key].id == $scope.type_id){
            //       $scope.model.business.type_name = $scope.busTypes[key];
            //       break;
            //     }
            //   }
            // }

        	  console.log($scope.model);
            pagesService.createBusinessCampaign($scope.model)
            .success(function (response, status) {
            // console.log(response, status);
            console.log("\n\nresponse is : ");
            // response = response ? JSON.parse(response) : {}
            // console.log(response)

            var sub_type_id = $scope.model.business.sub_type_id;
            var type_id = $scope.model.business.business_type_id;

            console.log(sub_type_id, type_id);
            console.log('response is : ',response);
            // response = JSON.parse(response);
            $scope.model.business = response.business;
            $scope.model.business.sub_type_id = sub_type_id;
            $scope.model.business.business_type_id = type_id;
            $scope.model.business.contacts = response.contacts;
            if (status == '201') {
                 $location.path("/manageCampaign/createAccount");
            }
            $scope.successMsg = "Successfully Saved"
            $scope.errorMsg = undefined;
            if (status == '200'){
              $scope.choice = "selected";
            }
        }).error(function(response, status){
             console.log("response is : ", response);
             console.log("status is  : " ,status);
             if (typeof response != 'number'){
               $scope.successMsg = undefined;
               $scope.errorMsg = response.message;
               console.log($scope.errorMsg);
             // $location.path("");
            }

        })
        };
      //[TODO] implement this
    }]);
