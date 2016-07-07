angular.module('machadaloPages')
.controller('CreateAccountCtrl',
    ['$scope', '$rootScope', '$window', '$location', 'pagesService',
    function ($scope, $rootScope, $window, $location, pagesService) {

      $scope.model = {};
      $scope.model.account = {};
    	$scope.accounts = [];
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

      var contactCopy = angular.copy($scope.contact);
      $scope.model.account.contacts = [$scope.contact];

      pagesService.getAllBusinesses()
        .success(function (response, status) {
              console.log("Get All Business response : ");
              console.log(response);
              $scope.businesses = response;
         });

      // pagesService.loadBusinessTypes()
      // .success(function (response){
      //     $scope.busTypes = response;
      //   });

        // $scope.getSubTypes = function() {
        //   var id = $scope.model.business.type;
        //   pagesService.getSubTypes(id)
        //   .success(function (response){
        //       $scope.sub_types = response;
        //     });
        // }


      $scope.addNew = function() {
        // object def is directly added to avoid different array elements pointing to same object

        $scope.model.account.contacts.push({
        name: '',     designation: '',    department: '',     
        email: '',    phone: '',      spoc: ''
      });
        console.log($scope.model.account.contacts);
      

      };


       $scope.remove = function(index) {
        $scope.model.account.contacts.splice(index, 1);
        console.log($scope.model.account.contacts);
      };


      $scope.updatefields = function(){
        if ($scope.model.account.business_id == ""){
          $scope.business_type = "";
          $scope.business_sub_type = "";
        }else{
          
        }
      }

    	$scope.getAllAccounts = function() {
        $scope.selectAcc = undefined;
	    	pagesService.getAllAccounts()
	    	.success(function (response, status) {
	    		    console.log(response);
	            $scope.accounts = response;
	       });
	    };

    	$scope.getAccount = function() {
    		pagesService.getAccount($scope.selectAcc)
	    	.success(function (response, status) {
	    		    console.log(response);
	            $scope.model.account = response.account;
              $scope.model.business = response.business;
              $scope.model.account.business_id = response.business.id.toString();
	            $scope.choice = "selected";
	       });
      };

      $scope.readMore = function() {
              $scope.seeMore = "true";
      };

      $scope.editDetails = function() {
              $scope.choice = "select";
      };

      $scope.newAccount = function() {
              $scope.choice = "new";
              $scope.selectAcc = undefined;
        // complete object definition given to avoid multiple refrence to same field
              $scope.contact = {
                name: '',     
                designation: '',    
                department: '',     
                email: '',    
                phone: '',      
                spoc: ''
              };

              $scope.form.$setPristine();
              $scope.model.account = {};
              $scope.model.account.contacts = [$scope.contact];
      };


      // $scope.resetValues = function(){
      //           $scope.model.campaign_type = undefined;
      //           $scope.model.tentative = undefined;
      //           $scope.supplier_type = undefined;
      //           $scope.campaign_type1 = undefined;
      //           $scope.supplier_type1 = undefined;

      // }

    	$scope.create = function() {
            console.log("$scope.model is :");
        	  console.log($scope.model);
            pagesService.createAccountCampaign($scope.model)
            .success(function (response, status) {
            

              console.log("\n\nresponse is : ");
              console.log(response);

              var business_id = $scope.model.account.business_id
              
              if (status == '200'){
                pagesService.setBusinessId(business_id);
                $location.path("/manageCampaign/create");
                $scope.model.account = response.account;
                $scope.model.account.contacts = response.contacts;
                $scope.model.account.business_id = business_id;
                // if(typeof response.campaign != "undefined"){
                //   $scope.model.campaign_type = response.campaign;
                //    console.log("\n\nresponse.campaign is : ");
                //    console.log(response.campaign);
                //    $scope.campaign_present = true;
                // }
                // $scope.resetValues();

                $scope.successMsg = "Successfully Saved"
                $scope.errorMsg = undefined;
                $scope.choice = "selected";
              }
          }).error(function(response, status){

            // status = 406 comes from backend if some information is missing with info in response.message
             // response = response ? JSON.parse(response) : {}
             // console.log(response.message);
             // $scope.successMsg = undefined;
             // $scope.errorMsg = response.message ;
             // console.log(status);
             console.log("response is : ", response);
             console.log("Status is : ", status);
             if (typeof response != 'number'){
               $scope.successMsg = undefined;
               $scope.errorMsg = response.message;
               console.log($scope.errorMsg);
            }

        })
        };
    }]);
