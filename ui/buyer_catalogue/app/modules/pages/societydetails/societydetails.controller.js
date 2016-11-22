angular.module('machadaloPages',['ui.bootstrap'])
.controller('SocietyCtrl',
    ['$scope', '$rootScope', '$window', '$location','societyDetailsService',
    function ($scope, $rootScope, $window, $location, societyDetailsService) {
     societyDetailsService.processParam();
     $scope.society = {};
     $scope.disable = false;
     $scope.residentCount = {};
     $scope.inventoryDetails = {};
     $scope.totalInventoryCount = {};
     societyDetailsService.getSociety($rootScope.societyId)
      .success(function (response) {
        console.log("vidhi", response);
        $scope.myInterval=300;
        $scope.society_images = response.society_images;
        $scope.society = response.society_data;
        //$rootScope.societyname = response.society_data.society_name;
        $scope.residentCount = estimatedResidents(response.society_data.flat_count);
        $scope.flatcountflier = response.society_data.flat_count;
        // Start : Code added to seperate images by their image tag names
        $scope.SocietyImages = [],$scope.FlierImages=[],$scope.PosterImages=[],$scope.StandeeImages=[],$scope.StallImages=[],$scope.CarImages=[];
        for(var i=0;i<$scope.society_images.length;i++){
          if($scope.society_images[i].name == 'Society'){
            var imageUrl = 'http://mdimages.s3.amazonaws.com/' + $scope.society_images[i].image_url;
            $scope.SocietyImages.push(imageUrl);
        }
          if($scope.society_images[i].name == 'Standee Space')
            $scope.StandeeImages.push($scope.society_images[i]);
          if($scope.society_images[i].name == 'Stall Space')
            $scope.StallImages.push($scope.society_images[i]);
          if($scope.society_images[i].name == 'Fliers')
            $scope.FlierImages.push($scope.society_images[i]);
          if($scope.society_images[i].name == 'Car Display')
            $scope.CarImages.push($scope.society_images[i]);
          if($scope.society_images[i].name == 'Lift' || $scope.society_images[i].name == 'Notice Board')
            $scope.PosterImages.push($scope.society_images[i]);
      }
      console.log(imageUrl);
      console.log($scope.SocietyImages);
      // End : Code added to seperate images by their image tag names
     });

     societyDetailsService.get_inventory_summary($rootScope.societyId, "RS")
     .success(function (response){
       $scope.inventoryDetails = response;
        $scope.totalInventoryCount = inventoryCount($scope.inventoryDetails);
        $scope.model = response;
     });

     function estimatedResidents (flatcount){
       var residents = flatcount * 4;
       $scope.residentCount = {
          residents  : residents,
       };
       return $scope.residentCount;
     }
     function inventoryCount (inventoryDetails){
            var totalPoster = inventoryDetails.lift_count + inventoryDetails.nb_count ;
            $scope.totalInventoryCount = {
               totalPoster  : totalPoster,
            };
            return $scope.totalInventoryCount;
     }

    if($rootScope.campaignId){
        societyDetailsService.getShortlistedSocietyCount($rootScope.campaignId)
        .success(function(response,status){
            $scope.societies_count = response.count;

        }).error(function(response,status){
            console.log("error ",response.error);
        });
    }

    $scope.society_ids = {}
    societyDetailsService.getSocietyIds()
    .success(function(response,status){
        $scope.society_ids = response.society_ids;
        $scope.minlength = 0;
        $scope.maxlength = $scope.society_ids.length-1;
        for(var i=0;i<= $scope.maxlength; i++){
            if($rootScope.societyId == $scope.society_ids[i]){
                $scope.index = i;
                break;
            }
        }
    });

        $scope.nextSociety = function(){
        $scope.index = $scope.index + 1;
        if($scope.index <= $scope.maxlength){
            // getsocietyfunc($scope.model[$scope.index].supplier_id)
            var current_path = $location.path()
            var pos = current_path.lastIndexOf("/");
            var required_path = current_path.slice(0,pos+1) + $scope.society_ids[$scope.index] ;
            $location.path(required_path);
            // history.pushState({bar : "foo"}, "page 3", required_path);
            // setCurrentPage(required_path);
        }else{
            $scope.index = $scope.index - 1;
        }
    }

    $scope.previousSociety = function(){
       $scope.index = $scope.index - 1;
        if($scope.index >= $scope.minlength){
            var current_path = $location.path()
            var pos = current_path.lastIndexOf("/");
            var required_path = current_path.slice(0,pos+1) + $scope.society_ids[$scope.index] ;
            $location.path(required_path);
            // history.pushState({bar : "foo"}, "page 3", required_path);
            // setCurrentPage(required_path);
        }
        else{
           $scope.index = $scope.index + 1;
        }
    }

    $scope.societyByIndex = function(index){
        $scope.numberError = false;
        if(index <= $scope.maxlength && index >= $scope.minlength){
            $scope.index = index;
            var current_path = $location.path()
            var pos = current_path.lastIndexOf("/");
            var required_path = current_path.slice(0,pos+1) + $scope.society_ids[$scope.index] ;
            $location.path(required_path);
        }
        else{
            $scope.numberError = true;
             // $scope.startFade = true;
             //  $timeout(function(){
             //    $scope.numberError = true;
             //  }, 2000);
        }
        $scope.societyIndex = undefined;
    }

     $scope.societyList = function() {
       $location.path("manageCampaign/shortlisted/" + $rootScope.campaignId + "/societies");
     };

     //Start:For adding shortlisted society
     if($rootScope.campaignId){
       $scope.shortlistThis = function(id) {
       societyDetailsService.addShortlistedSociety($rootScope.campaignId, id)
        .success(function (response){
            // $scope.model = response;
              // $location.path("manageCampaign/shortlisted/" + $rootScope.campaignId + "/societies");
              $scope.disable = true;
              $scope.societies_count = response.count;

              // var temp = "#alert_placeholder" + index;
              var temp = "#alert_placeholder";
            var style1 = 'style="position:absolute;z-index:1000;margin-left:-321px;margin-top:-100px;background-color:gold;font-size:18px;"'
            $(temp).html('<div ' + style1 + 'class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>'+response.message +'</span></div>')
            setTimeout(function() {
                $("div.alert").remove();
            }, 3000);
       });
     }}//End: For adding shortlisted society
   }]);//Controller function ends here
