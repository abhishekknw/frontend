angular.module('machadaloPages')
  .directive('ngEnter', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if (event.which === 13) {
          scope.$apply(function () {
            scope.$eval(attrs.ngEnter);
          });

          event.preventDefault();
        }
      })
    }
  })
  .controller('userCtrl',
    ['$scope', '$rootScope', '$window', '$location', 'userService', 'constants', '$timeout', 'cfpLoadingBar', 'commonDataShare', 'AuthService',
      function ($scope, $rootScope, $window, $location, userService, constants, $timeout, cfpLoadingBar, commonDataShare, AuthService) {
        //  console.log("$location", $location.path());

        // console.log("pathName", pathName);

        // console.log("pathName", pathName);
        // reset login status
        $scope.model = {};
        $scope.cloneFromProfileId = {};
        $scope.standardOrganisation = constants.standard_organisation;
        $scope.permissionList = [];
        $scope.groupName = {};
        $scope.selectedGroupList = [];
        $scope.permissionsDict = [];
        $scope.userInfo = {};
        $scope.passwordError = constants.password_error;
        $scope.profileData = {};// to create profile
        $scope.organisationData = {}; // to create organisation
        $scope.organisationMappedIdList = []; // to create a list of organisation ids
        $scope.objectLevelPermissions = []; // list of object level permissions
        $scope.generalUserLevelPermissionData = {};// to create generalUserLevelPermissionData
        $scope.generalUserLevelPermissionsList = [];
        $scope.contentTypeObject = {};
        $scope.contentTypeListById = [];
        $scope.cloneProfileNewName = '';
        $scope.mappingData = {};
        $scope.rolesData = {};


        $scope.userInfo = $rootScope.globals.userInfo;

        $scope.options = [
          { usercode: 'BD', id: '01' },
          { usercode: 'Ops', id: '02' },
          { usercode: 'Agency', id: '03' }
        ];

        $scope.userInfoHeaders = [
          { header: 'First Name' },
          { header: 'Last Name' },
          { header: 'Is SuperUser' },
          { header: 'Email Id' },
          { header: 'Username' },
          { header: 'Organisation' },
          { header: 'Profile' },
          { header: 'Edit' },
          { header: 'Delete' },
          { header: 'Change Password' },
        ];
        $scope.groupHeaders = [
          { header: 'Name of Group' },
          { header: 'Edit' },
          { header: 'Delete' },
        ]

        //to create organisation we should map that organisation to category
        $scope.organisationCategories = [
          'MACHADALO',
          'BUSINESS',
          'BUSINESS_AGENCY',
          'SUPPLIER_AGENCY',
          'SUPPLIER',
        ]
        $scope.operationOrganisation = {
          view: false,
          edit: false,
          create: false,
        }
        $scope.operationOnBoard = {
          organisation: true,
          profile: false,
          user: false,
        }

        $scope.operationProfile = angular.copy($scope.operationOrganisation);
        //To get permission list
        userService.getAllUserPermissions()
          .then(function onSuccess(response) {
            console.log(response);
            $scope.permissions = response.data.data;
            $scope.loading = response.data.data;

            addMoreFieldsToPermission();
            angular.forEach($scope.permissions, function (permission) {
              $scope.permissionsDict[permission.id] = permission;
            })
            console.log($scope.permissionsDict);
          }).catch(function onError(response) {
            commonDataShare.showErrorMessage(response);
            console.log("error occured");
          });


        userService.getSector()
          .then(function onSuccess(response) {
            $scope.businessTypeData = response.data;
            for (let x in $scope.businessTypeData) {
              $scope.businessTypeData[x].label = $scope.businessTypeData[x].business_type
            }
          })
        $scope.selected_business_type = { buttonDefaultText: 'Select Business Type' };
        $scope.selected_business_sub_type = { buttonDefaultText: 'Select Business Sub Type' };

        $scope.selectedbusinessType = [];
        $scope.businessSubTypeData = [];
        $scope.selectedbusinessSubType = [];
        $scope.events = {
          onItemSelect: function (item) {
            if (item.subtypes && item.subtypes.length > 0) {
              for (let i in item.subtypes) {
                $scope.businessSubTypeData.push({
                  businessTypeId: item.subtypes[i].business_type,
                  id: item.subtypes[i].id,
                  label: item.subtypes[i].business_sub_type,
                })
              }
            }
          },
          onItemDeselect: function (items) {
            for (let j in $scope.businessSubTypeData) {
              if ($scope.businessSubTypeData[j].businessTypeId === items.id) {
                delete $scope.businessSubTypeData[j];
              }
            }
          }
        }
        $scope.settings = {
          //   smartButtonMaxItems: 4,
          //  selectionLimit: 4,
          //  showCheckAll: true,
          //  enableSearch: true,
          showCheckAll: false,
          scrollableHeight: '300px', scrollable: false,
          enableSearch: false,
          showUncheckAll: false
        };


        var getAllUserGroups = function () {
          userService.getAllUserGroups()
            .then(function onSuccess(response) {
              console.log(response);
              $scope.permissionGroups = response.data.data;
              addMoreFieldsToGroup();
            })
            .catch(function onError(response) {
              commonDataShare.showErrorMessage(response);
              console.log("error occured");
            });
        }
        //get content types with model names
        var getContentTypes = function () {
          userService.getContentTypes()
            .then(function onSuccess(response) {
              console.log(response);
              $scope.contentTypeList = response.data.data;
              angular.forEach($scope.contentTypeList, function (contentType) {
                $scope.contentTypeListById[contentType.id] = contentType;
              })
            }).catch(function onError(response) {
              console.log(response);
            })
        }
        $scope.selectedState = [];
        $scope.selectedCity = [];
        $scope.stateDrodownSetting = {
          scrollableHeight: '200px',
          scrollable: true, 
          enableSearch: true, 
          selectedToTop: true,
          showCheckAll: false,
          showUncheckAll: false,
        };
        $scope.stateEvents = { 
          onInitDone: function (item) { console.log(item); }, 
          onItemDeselect: function (item) { getCityListByFilter(item); }, 
          onItemSelect: function (item) { getCityListByFilter(item); } 
      };
        $scope.cityEvents = {
          onInitDone: function (item) { console.log(item); },
          onItemDeselect: function (item) { arrangeLocation(item); },
          onItemSelect: function (item) { arrangeLocation(item); },
          onSelectAll: function (item) { arrangeLocation(item); },
          onDeselectAll: function (item) { arrangeLocation(item); },
        };

        let getStateCityList = function () {
          AuthService.initialStateList()
            .then(function onSuccess(response) {
              $scope.StateList = response.data.data.map(({ state_name: label, ...rest }) => ({ label, ...rest }));
            }).catch(function onError(response) {
              console.log(response);
            })
          AuthService.initialData()
            .then(function onSuccess(response) {
              $scope.CityList = response.data.cities.map(({ city_name: label, ...rest }) => ({ label, ...rest }));
            }).catch(function onError(response) {
              console.log(response);
            })
        }

        let getCityListByFilter = function () {
          let stateIds = []
          $scope.selectedState?.map((item) => {
            stateIds.push(item.id)
          })
          $scope.filterCity = $scope.CityList?.filter((obj) => stateIds.includes(obj.state_code));
        }
        let arrangeLocation = function () {
          let location = []
          $scope.selectedState.map((state) => {
            let cityObj = $scope.selectedCity?.filter((item) => (item.state_code === state.id));
            let cityName = [];
            cityObj.map((c) => {
              cityName.push(c.label);
            })
            location.push({ state: state.label, city: cityName });
          })
          return location;
        }

        $scope.getProfiles = function (organisationId) {
          var promise = [];
          if (!organisationId)
            promise = userService.getProfiles()
          else
            promise = userService.getProfiles(organisationId)
          promise.then(function onSuccess(response) {
            $scope.profilesList = response.data.data;
            console.log(response);
          }).catch(function onError(response) {
            console.log(response);
          })
          userService.getRoles(organisationId)
            .then(function onSuccess(response) {
              $scope.rolesList = response.data.data;
            }).catch(function onError(response) {
              console.log(response);
            })
          getStateCityList();
        }
        var getOrganisations = function () {
          userService.getOrganisations()
            .then(function onSuccess(response) {
              $scope.organisationList = response.data.data;
              angular.forEach($scope.organisationList, function (organisation) {
                $scope.organisationMappedIdList[organisation.organisation_id] = organisation;
              })
              console.log(response);
            }).catch(function onError(response) {
              console.log(response);
            })
        }
        var getStandardProfileToClone = function () {
          userService.getStandardProfileToClone()
            .then(function onSuccess(response) {
              $scope.standardProfileList = response.data.data;

            }).catch(function onError(response) {
              console.log(response);
            })
        }
        //calling when page load
        getAllUserGroups();
        getContentTypes();
        $scope.getProfiles();
        getStandardProfileToClone();
        var addMoreFieldsToPermission = function () {
          angular.forEach($scope.permissions, function (permission) {
            permission.selected = false;
          })
        }
        var addMoreFieldsToGroup = function () {
          angular.forEach($scope.permissionGroups, function (group) {
            group.selected = false;
          });
        }
        $scope.register = function (wizardFinish) {

          //  $scope.model['groups'] = $scope.selectedGroupList;
          if (!wizardFinish || (wizardFinish && $scope.model.first_name && $scope.model.last_name && $scope.model.username && $scope.model.email && $scope.model.password)) {
            if (wizardFinish)
              $scope.model['profile'] = $scope.clonedProfileId;
              $scope.model['location'] = arrangeLocation();
              $scope.model['user_type'] = getRoleNameById($scope.model.role)
            userService.createUser($scope.model)
              .then(function onSuccess(response) {
                console.log("Successful");
                $scope.selectedGroupList = [];
                $scope.model = {};
                addMoreFieldsToGroup();
                if (wizardFinish)
                  $scope.getContent($scope.contentItem.organisationCommon);
                swal(constants.name, constants.createUser_success, constants.success);
                // alert("Successfully Created");
              })
              .catch(function onError(response) {
                commonDataShare.showErrorMessage(response);
                // swal(constants.name,constants.errorMsg,constants.error);
                // alert("Error Occured");
              });
          }
        }
        //Start: to navigate menu list
        $scope.menuItem = [
          { name: 'createUser' },
          { name: 'createGroup' },
          { name: 'viewUsers' },
          { name: 'viewGroups' },
          { name: 'editUser' },
          { name: 'editGroup' },
          { name: 'profile' },
          { name: 'organisationCommon' },
          { name: 'organisation' },
          { name: 'profileView' },
          { name: 'onBoard' },
          { name: 'aboutYou' },
          { name: 'mapOrganisations' },
          { name: 'createRoles' },
          { name: 'assignRole' }
        ];
        $scope.contentItem = {
          createUser: 'createUser',
          createGroup: 'createGroup',
          viewUsers: 'viewUsers',
          viewGroups: 'viewGroups',
          editUser: 'editUser',
          editGroup: 'editGroup',
          profile: 'profile',
          organisation: 'organisation',
          organisationCommon: 'organisationCommon',
          profileView: 'profileView',
          onBoard: 'onBoard',
          aboutYou: 'aboutYou',
          mapOrganisations: 'mapOrganisations',
          createRoles: 'createRoles',
          assignRole: 'assignRole',
        }
        //$scope.menuItem.name = "aboutYou";
        $scope.changeLocation = function (viewTemplate) {
          $location.path('/manageUser/' + viewTemplate);
        }

        $scope.getContent = function (item, data) {
          $scope.menuItem.name = item;
          // location.hash=item;
          switch (item) {
            case $scope.contentItem.createUser:
              $scope.getProfiles();
              getOrganisations();
            case $scope.contentItem.viewUsers:
              getAllUsers();
              addMoreFieldsToGroup();
              getOrganisations();
              break;
            case $scope.contentItem.editUser:
              editUserInfo(data);
              console.log(data,"!1111111111111")
              addMoreFieldsToPermission();
              break;
            case $scope.contentItem.editGroup:
              $scope.permissionList = [];
              addMoreFieldsToGroup();
              $scope.menuItem.name = $scope.contentItem.createGroup;
              editGroupDetails(data);
              break;
            case $scope.contentItem.createGroup:
              $scope.isEditGroup = false;
              $scope.permissionList = [];
              addMoreFieldsToPermission();
              // $scope.permissions = [];
              $scope.groupName.name = null;
              break;
            case $scope.contentItem.organisationCommon:
              getOrganisations();
              break;
            case $scope.contentItem.profileView:
              $scope.getProfiles();
              // $scope.changeLocation("profile")
              // getObjectLevelPermissions();
              getOrganisations();
              // getGeneralUserLevelPermissions();
              break;
            case $scope.contentItem.onBoard:
              $scope.profileData = {};
              $scope.organisationData = {};
              $scope.cloneFromProfileId.id = null;
              $scope.activityNumber = 1;
              break;
            case $scope.contentItem.mapOrganisations:
              getOrganisationMappingList($scope.userInfo.profile.organisation.organisation_id);
              break;
            case $scope.contentItem.createRoles || $scope.contentItem.assignRole:
              getOrganisations();
              break;
            case $scope.contentItem.assignRole:
              getOrganisations();
              break;
          }
        }
        //End: to navigate menu list
        $scope.addPermission = function (permission, index) {
          console.log($scope.userPermission);
          if (permission.selected == true)
            $scope.permissionList.push(permission)
          else {
            $timeout(function () {
              $scope.permissionList.splice($scope.permissionList.indexOf(permission), 1);
            });
          }
        }
        $scope.createGroup = function () {
          console.log($scope.groupName);
          var permissions = [];
          angular.forEach($scope.permissionList, function (permission) {
            console.log(permission);
            permissions.push(permission.id);
          });
          var data = {
            name: $scope.groupName.name,
            permissions: permissions,
          }
          console.log(data);
          userService.createGroup(data)
            .then(function onSuccess(response) {
              console.log(response);
              $scope.groupName.name = null;
              $scope.permissionList = [];
              addMoreFieldsToPermission();
              getAllUserGroups();
              swal(constants.name, constants.create_group_success, constants.success);
            }).catch(function onError(response) {
              console.log(response);
              commonDataShare.showErrorMessage(response);
              //  swal(constants.name,constants.create_group_error,constants.error);
            });
        }
        //start:adding groups
        $scope.addGroups = function (group, index) {
          console.log(group);
          if (group.selected == true)
            $scope.selectedGroupList.push(group.name);
          else {
            $timeout(function () {
              $scope.selectedGroupList.splice($scope.selectedGroupList.indexOf(group.name), 1);
            });
          }
          console.log($scope.selectedGroupList);
        }
        //end:adding groups
        $scope.validatePassword = function () {
          console.log("hello");
          if ($scope.model.password == $scope.model.confirm_password)
            $scope.isValid = true;
          else
            $scope.isValid = false;
        }
        //start:get all users list
        var getAllUsers = function () {
          console.log("users calling");
          var orgId = $scope.userInfo.profile.organisation.organisation_id;
          userService.getAllUsers(orgId)
            .then(function onSuccess(response) {
              console.log(response);
              $scope.usersList = response.data.data;
            }).catch(function onError(response) {
              commonDataShare.showErrorMessage(response);
              console.log(response);
            });
        }
        //end:get all users list
        // tooltip on edit and delete button
        $(document).ready(function () {
          $('[data-toggle="tooltip"]').tooltip();
        });
        //start:edit user
        var editUserInfo = function (user) {
          console.log(user);
          $scope.userDetails = user;
          if (user.profile.id) {
            $scope.userDetails.profile = JSON.stringify(user.profile.id)
          }
          angular.forEach($scope.userDetails.groups, function (group) {
            for (var i = 0; i < $scope.permissionGroups.length; i++) {
              console.log(group);
              if (group.name == $scope.permissionGroups[i].name)
                $scope.permissionGroups[i].selected = true;
            }
          });
        }
        $scope.editUserGroups = function (group, index) {
          if (group.selected == true)
            $scope.userDetails.groups.push(group);
          else {
            $timeout(function () {
              $scope.userDetails.groups.splice($scope.userDetails.groups.indexOf(group), 1);
            });
          }
          // console.log($scope.selectedGroupList);
        }
        $scope.updateUserDetails = function (userDetails) {
          var groups = [];
          angular.forEach(userDetails.groups, function (group) {
            groups.push(group.id);
          });
          userDetails.groups = groups;
          userDetails.location = arrangeLocation();
          userDetails.user_type = getRoleNameById(userDetails.role);
          userService.updateUserDetails(userDetails.id, userDetails)
            .then(function onSuccess(response) {
              swal(constants.name, constants.save_success, constants.success);
              $scope.selectedCity = [];
              $scope.selectedState = [];
              $scope.getContent($scope.contentItem.viewUsers);
            }).catch(function onError(response) {
              console.log(response);
              // commonDataShare.showErrorMessage(response);
              // swal(constants.name,constants.save_error,constants.error);
            });
        }
        //end:edit user
        //start: delete user
        $scope.deleteUser = function (user) {
          swal({
            title: constants.warn_user_msg,
            text: constants.delete_confirm_user,
            type: constants.warning,
            showCancelButton: true,
            confirmButtonClass: constants.btn_success,
            confirmButtonText: constants.delete_confirm,
            closeOnConfirm: true
          },
            function () {
              console.log(user);
              userService.deleteUser(user.id)
                .then(function onSuccess(response) {
                  console.log(response);
                  getAllUsers();
                }).catch(function onError(response) {
                  console.log(response);
                  commonDataShare.showErrorMessage(response);
                });
            });
        }
        //end: delete user
        //start:code for edit group details
        var editGroupDetails = function (group) {
          console.log(group);
          $scope.groupId = group.id;
          $scope.isEditGroup = true;
          $scope.groupName.name = group.name;
          console.log($scope.permissionsDict);
          angular.forEach(group.permissions, function (permission) {
            console.log(permission);
            console.log($scope.permissionGroups);
            $scope.permissionsDict[permission].selected = true;
            $scope.permissionList.push($scope.permissionsDict[permission]);
            console.log($scope.permissionList);
          })
        }
        $scope.updateGroupDetails = function () {
          var permissions = [];
          angular.forEach($scope.permissionList, function (permission) {
            console.log(permission);
            permissions.push(permission.id);
          });
          var data = {
            name: $scope.groupName.name,
            permissions: permissions,
          }
          userService.updateGroupDetails($scope.groupId, data)
            .then(function onSuccess(response) {
              console.log(response);
              getAllUserGroups();
              swal(constants.name, constants.save_success, constants.success);
            }).catch(function onError(response) {
              console.log(response);
              commonDataShare.showErrorMessage(response);
              // swal(constants.name,constants.save_error,constants.error);
            });
        }
        //end:code for edit group details
        //start : delete group code
        $scope.deleteGroup = function (group) {
          console.log(group);
          swal({
            title: constants.warn_user_msg,
            text: constants.delete_confirm_group,
            type: constants.warning,
            showCancelButton: true,
            confirmButtonClass: constants.btn_success,
            confirmButtonText: constants.delete_confirm,
            closeOnConfirm: true
          },
            function () {
              userService.deleteGroup(group.id)
                .then(function onSuccess(response) {
                  console.log(response);
                  getAllUserGroups();
                }).catch(function onError(response) {
                  console.log(response);
                  commonDataShare.showErrorMessage(response);
                });
            });
        }

        //end : delete group code
        //start : change password
        $scope.setPasswordDetails = function (user) {
          console.log(user);
          $scope.userInfo = user;
        }
        $scope.checkPassword = function (password, confirm_password) {
          if (password == confirm_password)
            $scope.passwordValid = true;
          else
            $scope.passwordValid = false;
        }

        $scope.changePassword = function () {
          var data = {
            password: $scope.userInfo.password,
          }
          userService.changePassword($scope.userInfo.id, data)
            .then(function onSuccess(response) {
              console.log(response);
              $scope.userInfo = {};
              commonDataShare.closeModal('#passwordModal');
              swal(constants.name, constants.changePassword_success, constants.success);
            }).catch(function onError(response) {
              console.log(response);
              commonDataShare.showErrorMessage(response);
              // swal(constants.name,constants.errorMsg,constants.error);
            });
        }

        $scope.createOrganisation = function () {
          userService.createOrganisation($scope.organisationData)
            .then(function onSuccess(response) {
              console.log(response);
              $scope.onBoardOrgId = response.data.data.organisation_id;
              swal(constants.name, constants.create_success, constants.success);
            }).catch(function onError(response) {
              console.log(response);
            })
        }
        //end : change password
        $scope.updateOrganisation = function () {
          userService.updateOrganisationDetails($scope.organisationData)
            .then(function onSuccess(response) {
              console.log(response);
              swal(constants.name, constants.update_success, constants.success);
            }).catch(function onError(response) {
              console.log(response);
            })
        }
        $scope.goToOrganisation = function (contentItem, operation, data = {}) {
          console.log(data);
          $scope.organisationData = data;
          $scope.operationOrganisation.view = false;
          $scope.operationOrganisation.create = false;
          $scope.operationOrganisation.edit = false;
          $scope.operationOrganisation[operation] = true;
          $scope.getContent(contentItem);
        }
        //start: create profile
        $scope.createProfile = function () {
          $scope.profileData.general_user_permission = [];

          for (let id in $scope.userInfo.profile.general_user_permission) {
            let row = $scope.userInfo.profile.general_user_permission[id];
            delete row["id"];
            row["is_allowed"] = "";
            $scope.profileData.general_user_permission.push(row);
          }

          userService.createProfile($scope.profileData)
            .then(function onSuccess(response) {

              $scope.profileData = response.data.data;

              for (var x in $scope.contentTypeList) {
                var contentType = $scope.contentTypeList[x]

                var object_level_permission1 = {
                  "name": contentType.model.toUpperCase(),
                  "content_type": contentType.id,
                  "profile": $scope.profileData.id
                }
                userService.createObjectLevelPermission(object_level_permission1)
                  .then(function onSuccess(response) {

                    if (!$scope.profileData.object_level_permission)
                      $scope.profileData['object_level_permission'] = [];
                    $scope.profileData['object_level_permission'].push(response.data.data);
                  }).catch(function onError(response) {
                    console.log(response);
                  })
              }


              swal(constants.name, constants.create_success, constants.success);
            }).catch(function onError(response) {
              console.log(response);
            })
        }
        //end: create profile
        $scope.goToProfiles = function (contentItem, operation, data = {}) {


          $scope.profileData = data;
          $scope.operationProfile.view = false;
          $scope.operationProfile.create = false;
          $scope.operationProfile.edit = false;
          $scope.operationProfile[operation] = true;
          console.log($scope.profileData);
          // $scope.profileData.organisation = $scope.profileData.organisation.organisation_id;
          $scope.getContent(contentItem);
        }
        $scope.updateProfile = function () {
          console.log($scope.profileData);
          userService.updateProfile($scope.profileData)
            .then(function onSuccess(response) {
              console.log(response);
              swal(constants.name, constants.update_success, constants.success);
            }).catch(function onError(response) {
              console.log(response);
            })
        }

        $scope.deleteProfile = function (profile) {

          swal({
            title: constants.warn_user_msg,
            text: constants.delete_profile,
            type: constants.warning,
            showCancelButton: true,
            confirmButtonClass: constants.btn_success,
            confirmButtonText: constants.delete_confirm,
            closeOnConfirm: true
          },
            function () {

              userService.deleteProfile(profile.id)
                .then(function onSuccess(response) {
                  console.log(response);
                  if (response && response.data && response.data.status) {
                    swal(constants.name, constants.delete_success, constants.success);
                    var localindex_index = $scope.profilesList.map(function (el) {
                      return el.id;
                    }).indexOf(profile.id);
                    if (localindex_index != -1) {
                      $scope.profilesList.splice(localindex_index, 1);
                    }
                  }

                }).catch(function onError(response) {
                  console.log(response);
                  commonDataShare.showErrorMessage(response);
                });
            });
        }
        //for generaluser permissionsDict
        var getObjectLevelPermissions = function () {
          userService.getObjectLevelPermissions()
            .then(function onSuccess(response) {
              console.log(response);
              $scope.objectLevelPermissions = response.data.data;
            }).catch(function onError(response) {
              console.log(response);
            })
        }
        $scope.objectLevelPermissionData = {};
        $scope.createObjectLevelPermission = function () {
          console.log($scope.contentTypeObject);
          $scope.objectLevelPermissionData['name'] = $scope.contentTypeListById[$scope.objectLevelPermissionData.content_type].model.toUpperCase();
          userService.createObjectLevelPermission($scope.objectLevelPermissionData)
            .then(function onSuccess(response) {
              console.log(response);
              if (!$scope.profileData.object_level_permission)
                $scope.profileData['object_level_permission'] = [];
              $scope.profileData['object_level_permission'].push(response.data.data);
              // getObjectLevelPermissions();/
              commonDataShare.closeModal('#createObjectLevelPermissionModal');
              swal(constants.name, constants.create_success, constants.success);
            }).catch(function onError(response) {
              console.log(response);
            })
        }


        // $scope.updateObjectLevelPermission = function(){
        //   cfpLoadingBar.start();
        //   cfpLoadingBar.inc();
        //   userService.updateObjectLevelPermission()
        //   .then(function onSuccess(response){
        //     console.log(response);
        //     cfpLoadingBar.complete();
        //   }).catch(function onError(response){
        //     console.log(response);
        //   })
        // }
        $scope.assignObjectName = function (c) {
          console.log(c);
        }
        //genral user level permissions
        var getGeneralUserLevelPermissions = function () {
          userService.getGeneralUserLevelPermissions()
            .then(function onSuccess(response) {
              console.log(response);
              $scope.generalUserLevelPermissionsList = response.data.data;
            }).catch(function onError(response) {
              console.log(response);
            })
        }

        // //start: create profile
        // $scope.createProfile = function () {
        //   $scope.profileData.general_user_permission = [];



        $scope.mobileValidation = function () {
          $scope.showMobileError = true;
          if ($scope.organisationData.phone.toString().length == 10) {
            $scope.showMobileError = false;
          }
        }



        // $scope.deleteProfile = function (profile) {

        //   swal({
        //     title: constants.warn_user_msg,
        //     text: constants.delete_profile,
        //     type: constants.warning,
        //     showCancelButton: true,
        //     confirmButtonClass: constants.btn_success,
        //     confirmButtonText: constants.delete_confirm,
        //     closeOnConfirm: true
        //   },
        //     function () {

        //       userService.deleteProfile(profile.id)
        //         .then(function onSuccess(response) {
        //           console.log(response);
        //           if (response && response.data && response.data.status) {
        //             swal(constants.name, constants.delete_success, constants.success);
        //             var localindex_index = $scope.profilesList.map(function (el) {
        //               return el.id;
        //             }).indexOf(profile.id);
        //             if (localindex_index != -1) {
        //               $scope.profilesList.splice(localindex_index, 1);
        //             }
        //           }

        //         }).catch(function onError(response) {
        //           console.log(response);
        //           commonDataShare.showErrorMessage(response);
        //         });
        //     });
        // }
        // $scope.updateProfile = function () {
        //   console.log($scope.profileData);
        //   userService.updateProfile($scope.profileData)
        //     .then(function onSuccess(response) {
        //       console.log(response);
        //       swal(constants.name, constants.update_success, constants.success);
        //     }).catch(function onError(response) {
        //       console.log(response);
        //     })
        // }
        //for generaluser permissionsDict
        // var getObjectLevelPermissions = function () {
        //   userService.getObjectLevelPermissions()
        //     .then(function onSuccess(response) {
        //       console.log(response);
        //       $scope.objectLevelPermissions = response.data.data;
        //     }).catch(function onError(response) {
        //       console.log(response);
        //     })
        // }
        // $scope.objectLevelPermissionData = {};
        // $scope.createObjectLevelPermission = function () {
        //   console.log($scope.contentTypeObject);
        //   $scope.objectLevelPermissionData['name'] = $scope.contentTypeListById[$scope.objectLevelPermissionData.content_type].model.toUpperCase();
        //   userService.createObjectLevelPermission($scope.objectLevelPermissionData)
        //     .then(function onSuccess(response) {
        //       console.log(response);
        //       if (!$scope.profileData.object_level_permission)
        //         $scope.profileData['object_level_permission'] = [];
        //       $scope.profileData['object_level_permission'].push(response.data.data);
        //       // getObjectLevelPermissions();/
        //       commonDataShare.closeModal('#createObjectLevelPermissionModal');
        //       swal(constants.name, constants.create_success, constants.success);
        //     }).catch(function onError(response) {
        //       console.log(response);
        //     })
        // }
        // $scope.updateObjectLevelPermission = function(){
        //   cfpLoadingBar.start();
        //   cfpLoadingBar.inc();
        //   userService.updateObjectLevelPermission()
        //   .then(function onSuccess(response){
        //     console.log(response);
        //     cfpLoadingBar.complete();
        //   }).catch(function onError(response){
        //     console.log(response);
        //   })
        // }
        // $scope.assignObjectName = function (c) {
        //   console.log(c);
        // }
        //genral user level permissions
        // var getGeneralUserLevelPermissions = function () {
        //   userService.getGeneralUserLevelPermissions()
        //     .then(function onSuccess(response) {
        //       console.log(response);
        //       $scope.generalUserLevelPermissionsList = response.data.data;
        //     }).catch(function onError(response) {
        //       console.log(response);
        //     })
        // }

        $scope.createGeneralUserLevelPermission = function () {
          console.log($scope.generalUserLevelPermissionData);
          userService.createGeneralUserLevelPermission($scope.generalUserLevelPermissionData)
            .then(function onSuccess(response) {
              console.log(response);
              console.log("hello" + $scope.profileData);
              commonDataShare.closeModal('#createGeneralUserPermissionModal');
              // getGeneralUserLevelPermissions();
              if (!$scope.profileData.general_user_permission)
                $scope.profileData['general_user_permission'] = [];
              $scope.profileData['general_user_permission'].push(response.data.data);
              swal(constants.name, constants.create_success, constants.success);
            }).catch(function onError(response) {
              console.log(response);
            })
        }
        $scope.setModalData = function (data) {
          console.log(data);
          $scope.modalData = data;
        }
        // start : update object and general user level permission
        $scope.updateObjectLevelPermission = function (permission, index) {
          $scope.isDataUpdating = true;
          cfpLoadingBar.start();
          userService.updateObjectLevelPermission(permission)
            .then(function onSuccess(response) {
              console.log(response);
              cfpLoadingBar.complete();
              $scope.isDataUpdating = false;
              $scope.profileData.object_level_permission[index] = response.data.data;
            }).catch(function onError(response) {
              console.log(response);
              $scope.isDataUpdating = false;
            })
        }
        $scope.updateGeneralUserPermission = function (permission, index) {
          $scope.isDataUpdating = true;
          cfpLoadingBar.start();
          userService.updateGeneralUserPermission(permission)
            .then(function onSuccess(response) {
              console.log(response);
              cfpLoadingBar.complete();
              $scope.isDataUpdating = false;
              $scope.profileData.general_user_permission[index] = response.data.data;
            }).catch(function onError(response) {
              console.log(response);
              $scope.isDataUpdating = false;
            })

        }


        //start:onboard functionality
        $scope.activityNumber = 1;
        $scope.createOnBoardActivity = function (number) {
          if (number == 1 && $scope.organisationData.name && $scope.organisationData.phone && $scope.organisationData.email && $scope.organisationData.category && !$scope.showMobileError) {
            $scope.organisationData.business_type = [];
            if ($scope.selectedbusinessType.length > 0) {
              for (let i in $scope.selectedbusinessType) {
                $scope.organisationData.business_type.push($scope.selectedbusinessType[i].id)
              }
            }
            $scope.organisationData.business_subtype = [];
            if ($scope.selectedbusinessSubType.length > 0) {
              for (let j in $scope.selectedbusinessSubType) {
                $scope.organisationData.business_subtype.push($scope.selectedbusinessSubType[j].id)
              }
            }
            $scope.createOrganisation();
            $scope.activityNumber++;
          }
          if (number == 2 && $scope.profileData.name && $scope.cloneFromProfileId.id) {
            $scope.cloneProfileGeneral($scope.cloneFromProfileId.id, $scope.onBoardOrgId, $scope.profileData.name);
          }
        }
        // use this function to clone a profile within an organisation
        $scope.cloneProfileGeneral = function (cloneFromProfileId, onBoardOrgId, profileNewName) {

          console.log("cloneProfileGeneral", cloneFromProfileId, onBoardOrgId, profileNewName);

          var data = {
            clone_from_profile_id: cloneFromProfileId,
            new_organisation_id: onBoardOrgId,
            new_name: profileNewName,
          }
          userService.cloneProfile(data)
            .then(function onSuccess(response) {
              console.log("cloned", response);
              $scope.clonedProfileId = response.data.data.id;
              $scope.getProfiles();
              commonDataShare.closeModal('#cloneProfileModal');
              swal(constants.name, constants.create_success, constants.success);
            }).catch(function onError(response) {
              console.log(response);
              swal(constants.name, constants.errorMsg, constants.error);
            })

        }

        $scope.validateOnBoardData = function (activity) {
          if (activity == 'finish') {
            if ($scope.model.firstname && $scope.model.lastname && $scope.model.username && $scope.model.email && $scope.model.password)
              return false;
            else
              return true;
          }
        }
        $scope.getOrganisationsByCategory = function (category, source) {
          userService.getOrganisationsByCategory(category)
            .then(function onSuccess(response) {
              console.log("categoryOrg", response);
              if (source)
                $scope.sourceOrganisationListByCategory = response.data.data;
              else
                $scope.destinationOrganisationListByCategory = response.data.data;
            }).catch(function onError(response) {
              console.log(response);
            })
        }
        $scope.createOrganisationMapping = function () {
          console.log($scope.mappingData);
          userService.createOrganisationMapping($scope.mappingData)
            .then(function onSuccess(response) {
              console.log(response);
              commonDataShare.closeModal('#createNewOrganisationMapModal');
              $scope.organisationMappingList.push(response.data.data);
              swal(constants.name, constants.create_success, constants.success);
            }).catch(function onError(response) {
              console.log(response);
              swal(constants.name, constants.errorMsg, constants.error);
            })
        }
        var getOrganisationMappingList = function (organisationId) {
          userService.getOrganisationMappingList(organisationId)
            .then(function onSuccess(response) {
              console.log(response);
              $scope.organisationMappingList = response.data.data;
            }).catch(function onError(response) {
              console.log(response);
            })
        }
        $scope.createNewRole = function () {
          console.log($scope.rolesData);
          userService.createNewRole($scope.rolesData)
            .then(function onSuccess(response) {
              console.log(response);
              swal(constants.name, constants.create_success, constants.success);
            }).catch(function onError(response) {
              console.log(response);
              swal(constants.name, constants.errorMsg, constants.error);
            })
        }
        $scope.getRoles = function () {
          userService.getRoles($scope.rolesData.organisation)
            .then(function onSuccess(response) {
              $scope.rolesList = response.data.data;
            }).catch(function onError(response) {
              console.log(response);
            })
        }
        $scope.assignRole = function () {
          if ($scope.rolesData.parent === $scope.rolesData.child) {
            swal(constants.name, constants.role_assignment_error, constants.warning);
          }
          else {
            userService.assignRole($scope.rolesData)
              .then(function onSuccess(response) {
                console.log(response);
                swal(constants.name, constants.update_success, constants.success);
              }).catch(function onError(response) {
                console.log(response);
                swal(constants.name, constants.errorMsg, constants.error);
              })
          }
        }

        let getRoleNameById = function (id){
          try {
            let roleObj = $scope.rolesList?.find(x => x.id === Number(id))?.name;
            return roleObj;
          }
          catch (err) {
            console.log(err);
            return ""
          }
        }

        let pathName = $location.path()
        if (pathName === "/manageMent/profileView") {
          $scope.getContent("profileView");
        }
        if (pathName === "/manageMent/organisationView") {
          $scope.getContent("organisationCommon");
        }
        if (pathName === "/manageMent/organisationOnBoard") {
          $scope.getContent("onBoard");
        }
        if (pathName === "/manageMent/mapOrganisations") {
          $scope.getContent("mapOrganisations");
        }
        if (pathName === "/manageMent/createRoles") {
          $scope.getContent("createRoles");
        }
        if (pathName === "/manageMent/assignRole") {
          $scope.getContent("assignRole");
        }
        if (pathName === "/manageMent/viewRole") {
          $scope.getContent();
        }
        if (pathName === "/manageMent/createUser") {
          $scope.getContent("createUser");
        }
        if (pathName === "/manageMent/viewUsers") {
          $scope.getContent("viewUsers");
        }
        if (pathName === "/manageMent/aboutYou") {
          $scope.getContent("aboutYou");
        }

        var keepGoing = true;
        $scope.checkClick = function () {
          keepGoing = true;
          angular.forEach($scope.profileData.general_user_permission, function (permission) {
            if (keepGoing == true) {
              if (permission.is_allowed) {
                $("#allCheck").prop("checked", true);
                $scope.selectChkBoxAll = true;
                $scope.selectTextAll = "Unselect";
              } else {
                $("#allCheck").prop("checked", false);
                $scope.selectChkBoxAll = false;
                $scope.selectTextAll = "Select";
                keepGoing = false;
              }
            }
          });
        }

        $scope.selectChkBoxAll = false;
        $scope.selectTextAll = "Select";

        $scope.checkAll = function () {
          if ($scope.selectChkBoxAll) {
            $scope.selectChkBoxAll = false;
            $scope.selectTextAll = "Select";
          } else {
            $scope.selectChkBoxAll = true;
            $scope.selectTextAll = "Unselect";
          }
          angular.forEach($scope.profileData.general_user_permission, function (permission) {
            permission.is_allowed = $scope.selectChkBoxAll;
          });
        };

        $scope.checkClick();


      }]);//end of controller
