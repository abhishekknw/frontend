'use strict';

angular.module('Authentication')

   .factory('AuthService',
      ['$http', '$location', '$rootScope', '$window', '$timeout', 'commonDataShare', 'constants',
         function ($http, $location, $rootScope, $window, $timeout, commonDataShare, constants) {

            var authService = {};
            var userInfo = {};
            var storageCredentials = 'machadalo-credentials';
            var storagePermissions = 'machadalo-permissions';
            var apiHost = APIBaseUrl;
           var interveneApiHost = Config.interveneMeaAPIBaseUrl;
            var permissions = {};
            var userData = {};
            var user_codes = {
               '0': 'root',
               '03': 'agency',
               '99': 'guestUser',
            };
            authService.Login = function (username, password, callback) {
               $http.post(apiHost + 'api-token-auth/', { username: username, password: password })
                  .then(function onSuccess(response) {
                     $window.localStorage.user_code = user_codes[response.data.user_code];
                     if (response.data.token) {
                        userData = response.data;
                        authService.SetCredentials(response.data);
                        response.data.logged_in = true;
                        callback(response.data);
                     }
                     else {
                        response.data.logged_in = false;
                        callback(response.data);
                     }
                  })
                  .catch(function onError(response) {
                     if (!response.data)
                        response.data = {};
                     response.logged_in = false;
                     response.message = "Invalid username or password";
                     callback(response.data);
                  });
            };
            //GET user data, groups assigned  and permissions
            authService.getUserData = function (callback) {
               commonDataShare.getUserDetails($rootScope.globals.currentUser.user_id)
                  .then(function onSuccess(response) {
                     if (response.data.data.profile) {
                        response.data.data.profile['permissions'] = {}
                        angular.forEach(response.data.data.profile.general_user_permission, function (perm) {
                           response.data.data.profile.permissions[perm.name.toLowerCase()] = perm.is_allowed;
                        })
                     }

                     $window.localStorage.userInfo = JSON.stringify(response.data.data);
                     $rootScope.globals.userInfo = JSON.parse($window.localStorage.userInfo);
                     $rootScope.globals.userInfo['permissions'] = $window.localStorage.permissions;
                     response.allowUser = true;
                     callback(response.data);
                  }).catch(function onError(response) {
                     response.allowUser = false;
                     callback(response.data);
                  });
            }

            authService.logoutEvent = function (e) {
               var logging_out = true;
               if (e) {
                  logging_out = false;
                  if (e.originalEvent) e = e.originalEvent;
                  if (e.key == storageCredentials) {
                     if (e.newValue == null || e.newValue.length == 0) {
                        logging_out = true;
                     }
                  }
               }
               return logging_out;
            }

            authService.Logout = function () {
               $window.localStorage.clear();
               $rootScope.user = '';
               $rootScope.role = 0;
               authService.ClearCredentials();
               if ($location.path() != "/login") $rootScope.globals.requestedPath = $location.path();
               $location.path('/login');
            }

            authService.isAuthenticated = function () {
               authService.GetCredentials();
               if ($rootScope.globals && $rootScope.globals.currentUser && $rootScope.globals.currentUser.token) {
                  return true;
               }
               return false;
            }

            authService.Clear = function () {
               authService.ClearCredentials();
            }

            authService.UserInfo = function () {
               return authService.GetCredentials();
            }


            authService.SetCredentials = function (response) {
               $rootScope.globals = $rootScope.globals || {};
               $rootScope.globals.currentUser = $rootScope.globals.currentUser || {};
               for (var property in response) {
                  if (response.hasOwnProperty(property)) {
                     $rootScope.globals.currentUser[property] = response[property];
                  }
               }
               if ($window.localStorage) {
                  var json = JSON.stringify($rootScope.globals.currentUser);
                  if (json) {
                     $window.localStorage.removeItem(storageCredentials);
                     $window.localStorage.setItem(storageCredentials, json);
                  }
                  else {
                     $rootScope.globals.currentUser = {};
                  }
               }
            };

            authService.GetCredentials = function () {
               if ($window.localStorage) {
                  var json = $window.localStorage.getItem(storageCredentials);
                  if (json) {
                     try {
                        $rootScope.globals.currentUser = JSON.parse(json);
                        if ($window.localStorage.userInfo) {
                           $rootScope.globals.userInfo = JSON.parse($window.localStorage.userInfo);
                        }
                        return $rootScope.globals.currentUser;
                     }
                     catch (e) {
                        authService.ClearCredentials();
                     }
                  }
               }
               $rootScope.globals.currentUser = {};
               return null;
            };

            authService.ClearCredentials = function () {
               if ($rootScope.globals) {
                  $rootScope.globals.currentUser = {};
               }
               if ($window.localStorage) {
                  $window.localStorage.removeItem(storageCredentials);
               }
            };


            //code added to add permissions
            authService.userHasPermission = function (permissions) {
               if (!authService.isAuthenticated()) {
                  return false;
               }
               if ($rootScope.globals.userInfo.is_superuser == true)
                  return true;
               for (var i = 0; i < permissions.length; i++) {
                  if ($rootScope.globals.userInfo.profile.permissions.hasOwnProperty(permissions[i])) {
                     if ($rootScope.globals.userInfo.profile.permissions[permissions[i]] == true)
                        return true;
                  }
               }
               return false;
            }
            //to check permission for views or pages
            authService.checkPermissionForView = function (view) {


               if (!view.requiresAuthentication) {
                  return true;
               }
               return userHasPermissionForView(view);
            };

            authService.ForgotPassword = function (email, host, protocol, callback) {
               if (host == 'localhost') {
                  host = host + ':' + $location.port();
               }
               var link = protocol + '://' + host;
               $http.post(apiHost + 'v0/ui/forgotPassword?email=' + email + '&link=' + link)
                  .then(function onSuccess(response) {
                     if (response.data) {
                        callback(response.data);
                     }

                  })
                  .catch(function onError(response) {
                     response.message = "Invalid email";
                     callback(response);
                  });
            };

            authService.ResetPassword = function (params, callback) {
               $http.post(apiHost + 'v0/ui/setResetPassword', { email: params.email, code: params.code, password: params.password })
                  .then(function onSuccess(response) {
                     callback(response.data);
                  })
                  .catch(function onError(response) {
                     callback(response);
                  });
            };

            var userHasPermissionForView = function (view) {
               if (!authService.isAuthenticated()) {
                  return false;
               }
               if (!view.permissions || !view.permissions.length) {
                  return true;
               }

               return authService.userHasPermission(view.permissions);
            };


            authService.getAllState = function (param) {
               return $http.get(apiHost + 'v0/ui/covid-bot/state/')
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getAllCity = function () {
               return $http.get(apiHost + 'v0/ui/covid-bot/district/')
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getAllBeds = function (param, api) {
               // let url = "v0/ui/covid-bot/get-hospital-data"
               // if (param.state) {
               //    url = "v0/ui/covid-bot/get-hospital-data/?state=" + param.state;
               // }
               // if (param.city) {
               //    url = "v0/ui/covid-bot/get-hospital-data/?state=" + param.state + "&district=" + param.city ;
               // }
               // if(param.categoryFilter){
               //    url += '&order=DESC&category=' + param.categoryFilter;
               // }
               //url += '&' + param.sortingParam + '=' + param.sortingType;

               let url = "v0/ui/covid-bot/sort-hospital-data"
               if (param.state) {
                  url = "v0/ui/covid-bot/sort-hospital-data/?state=" + param.state;
               }
               if (param.city) {
                  url = "v0/ui/covid-bot/sort-hospital-data/?state=" + param.state + "&district=" + param.city;
               }
               if (param.categoryFilter) {
                  url += '&order=DESC&category=' + param.categoryFilter;
               }

               if (param.otherFiler) {
                  url += '&hospital_order=' + param.otherFiler;
               }


               return $http.get(api + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            // authService.getAllCylinderState = function (param) {
            //    return $http.get(apiHost + 'v0/ui/covid-bot/cylinder-state/')
            //       .then(function onSuccess(response) {
            //          return response
            //       })
            //       .catch(function onError(response) {
            //          return response
            //       });
            // };
            // authService.getAllCylinderCity = function () {
            //    return $http.get(apiHost + 'v0/ui/covid-bot/cylinder-city/')
            //       .then(function onSuccess(response) {
            //          return response
            //       })
            //       .catch(function onError(response) {
            //          return response
            //       });
            // };


            authService.getAllCylinder = function (param) {

               let url = "v0/ui/covid-bot/covid-data/"

               if (param.city) {
                  url = "v0/ui/covid-bot/covid-data/?city=" + param.city + "&category=" + param.categoryKeyword;
               }

               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getAllVolunteer = function (cityName) {
               let url = "v0/ui/covid-bot/get_sheet_volunteer/?City=" + cityName
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getAllCategory = function () {
               let url = "v0/ui/covid-bot/available-category/"
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getAllState = function (categoryCode) {
               return $http.get(apiHost + 'v0/ui/covid-bot/available-state/?category_code=' + categoryCode)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getAllCity = function (param) {
               return $http.get(apiHost + 'v0/ui/covid-bot/available-city/?category_code=' + param.categoryCode + '&state_code=' + param.stateCode)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getAllBedsState = function (api) {
               return $http.get(api + 'v0/ui/covid-bot/state/')
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getAllBedsCity = function (api) {
               return $http.get(api + 'v0/ui/covid-bot/district/')
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.feedback = function (param) {
               return $http.post(apiHost + 'v0/ui/covid-bot/feedback-from-bot/', param)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });


               // $http.post(apiHost + 'v0/ui/setResetPassword', { email: params.email, code: params.code, password: params.password })
               // .then(function onSuccess(response) {
               //    callback(response.data);
               // })
               // .catch(function onError(response) {
               //    callback(response);
               // });
            };

            authService.getCovidCasesState = function () {
               return $http.get(apiHost + 'v0/ui/covid-bot/covid-cases-state/')
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            }

            authService.getCovidCasesCity = function (param) {
               return $http.get(apiHost + 'v0/ui/covid-bot/covid-cases-district/?state_code=' + param.stateCode)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getCovidCases = function (param) {
               let url = 'v0/ui/covid-bot/get-covid-cases/?state_code=' + param.state_code;
               if (param.district_code && param.district_code != 'all') {
                  url = 'v0/ui/covid-bot/get-covid-cases/?state_code=' + param.state_code + '&district_code=' + param.district_code
               }
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };
            authService.getAllConsulationState = function () {
               return $http.get(apiHost + 'v0/ui/covid-bot/doctor-summary/')
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getAllConsulation = function (param) {
               return $http.get(apiHost + 'v0/ui/covid-bot/doctor-data/?state=' + param.state)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getAllConsulationVolunteer = function (stateName) {
               let url = "v0/ui/covid-bot/volunteer-doctor/?state=" + stateName
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };
            authService.youthChildrenList = function (param) {
               let url = "v0/ui/b2c-bot/meadata/?age_group=" + param.age + '&category=' + param.category;
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };




            authService.getAllMeaData = function (param) {
               console.log(param);
               let url = "v0/ui/b2c-bot/Mea_data/?type_of_customer=" + param.type_of_customer + "&category=" + param.category + "&subcategory=" + param.subcategory + "&subsubcategory=" + param.subsubcategory;

               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };
            
            authService.getAllActiveUserData = function (param,meaType) {
               let url = "v0/ui/b2c-bot/active-users/?next_page=" + param.next_page;
               apiHost = APIBaseUrl;
               if(meaType){
                  url = "v0/ui/mea-bot/active-users/?next_page=" + param.next_page
                  apiHost = interveneApiHost;
               }
               if (param.search) {
                  url += '&search=' + param.search
               }
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };
            authService.getAllActionRequiredData = function (param,meaType) {
               apiHost = APIBaseUrl;
               let url = "v0/ui/b2c-bot/action_required/?next_page=" + param.next_page;
               if(meaType){
                  url = "v0/ui/mea-bot/action_required/?next_page=" + param.next_page;
                  apiHost = interveneApiHost;
               }
               if (param.search) {
                  url += '&search=' + param.search
               }

               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };
            authService.getAllInterveneUserData = function (param,meaType) {
               let url = "/v0/ui/b2c-bot/intervene/?next_page=" + param.next_page;
               apiHost = APIBaseUrl;
               if(meaType){
                  url = "/v0/ui/mea-bot/intervene/?next_page=" + param.next_page;
                  apiHost = interveneApiHost;
               }
               if (param.search) {
                  url += '&search=' + param.search
               }
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };
            authService.getAllUserDetailData = function (param,meaType) {
               let url = "v0/ui/b2c-bot/get-user-details/?phone_number=" + param.phoneNumber
               apiHost = APIBaseUrl;
               if(meaType){
                  url = "v0/ui/mea-bot/get-user-details/?phone_number=" + param.phoneNumber
                  apiHost = interveneApiHost;
               }
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getAllUserChatData = function (param,meaType) {
               let url = "v0/ui/b2c-bot/get-user-conversation/?phone_number=" + param.phoneNumber + "&next_page=" + param.nextPage;
               apiHost = APIBaseUrl;
               if(meaType){
                  url = "v0/ui/mea-bot/get-user-conversation/?phone_number=" + param.phoneNumber + "&next_page=" + param.nextPage;
                  apiHost = interveneApiHost;
               }
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getAllMeaData = function (param) {
               console.log(param);
               let url = "v0/ui/b2c-bot/Mea_data/?type_of_customer=" + param.type_of_customer + "&category=" + param.category + "&subcategory=" + param.subcategory + "&subsubcategory=" + param.subsubcategory;
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getAllTOCNavData = function () {
               let url = "v0/ui/b2c-bot/mea_toc_dropdown/"
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getAllCategoryNavData = function () {
               let url = "v0/ui/b2c-bot/mea_category_dropdown/"
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getAllUserHistory = function (param,meaType) {
               console.log(param);
               let url = "v0/ui/b2c-bot/get-all-users-paginate/?next_page=" + param.next_page;
               apiHost = APIBaseUrl;
               if(meaType){
                  url = "v0/ui/mea-bot/get-all-users-paginate/?next_page=" + param.next_page;
                  apiHost = interveneApiHost;
               }
               if (param.search) {
                  url += '&search=' + param.search
               }
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getActiveSearch = function (param,meaType) {
               console.log(param);
               let url = "v0/ui/b2c-bot/search-user/?search=" + param.search;
               apiHost = APIBaseUrl;
               if(meaType){
                   url = "v0/ui/mea-bot/search-user/?search=" + param.search;
                  apiHost = interveneApiHost;
               }
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };


            authService.getCustomerJourney = function (param,meaType) {
               console.log(param);
               let url = "v0/ui/b2c-bot/user-journey/?phone_number=" +param.phone_number;
               apiHost = APIBaseUrl;
               if(meaType){
                url = "v0/ui/mea-bot/user-journey/?phone_number=" +param.phone_number ;
                 apiHost = interveneApiHost;
              }
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.gettemplateInStatus = function (param,meaType) {
               console.log(param);
               let url = "v0/ui/b2c-bot/get-user-templates1/?phone_number=" +param.phone_number ;
               apiHost = APIBaseUrl;
               if(meaType){
                  url = "v0/ui/mea-bot/get-user-templates1/?phone_number=" +param.phone_number ;
                   apiHost = interveneApiHost;
                }
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getAllUserContact = function (param,meaType) {
               console.log(param);
               let url = "v0/ui/b2c-bot/get-all-users-paginate/?next_page=" + param.next_page;
               apiHost = APIBaseUrl;
               if(meaType){
                  url = "v0/ui/mea-bot/get-all-users-paginate/?next_page=" + param.next_page;
                  apiHost = interveneApiHost;
               }
               if (param.search) {
                  url += '&search=' + param.search
               }
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getTOCNavDetailData = function (param) {
               let url = "v0/ui/b2c-bot/mea_toc_navbar/?type_of_customer=" + param.type_of_customer
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

           
            authService.getCategoryNavDetailData = function (param) {
               let url = "v0/ui/b2c-bot/mea_category_navbar/?category=" + param.category
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getTemplateTabData = function (param,meaType) {
               apiHost = APIBaseUrl;
               let url = "v0/ui/b2c-bot/get-mca-master-templates/?search=" + param.search
               if(meaType){
                   url = "v0/ui/mea-bot/get-mca-master-templates/?search=" + param.search
                  apiHost = interveneApiHost;
               }
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.getFilterTabData = function (param,meaType) {
               let url = "v0/ui/b2c-bot/filter-user/";
               apiHost = APIBaseUrl;
               if(meaType){
                  url = "v0/ui/mea-bot/filter-user/";
                 apiHost = interveneApiHost;
              }
               if (param.attribute_name) {
                  url += '?attribute_name=' + param.attribute_name
               }

               if (param.start_date) {
                  if (param.attribute_name) {
                     url += '&start_date=' + param.start_date
                  } else {
                     url += '?start_date=' + param.start_date
                  }
               }

               if (param.end_date) {
                  url += '&end_date=' + param.end_date
               }

               if (param.date_type) {
                  url += '&date_type=' + param.date_type
               }



               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.addUserToIntervene = function (param,meaType) {
               let url = "v0/ui/b2c-bot/action-status-intervene/?intervene=True&phone_number=" + param.phone + "&username=" + param.username;
               apiHost = APIBaseUrl;
               if(meaType){
                  url = "v0/ui/mea-bot/action-status-intervene/?intervene=True&phone_number=" + param.phone + "&username=" + param.username;
                  apiHost = interveneApiHost;
               }
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.addUserToActive = function (param,meaType) {
               let url = "v0/ui/b2c-bot/action-status-intervene/?resolved=True&phone_number=" + param.phone + "&username=" + param.username;
               apiHost = APIBaseUrl;
               if(meaType){
                  url = "v0/ui/mea-bot/action-status-intervene/?resolved=True&phone_number=" + param.phone + "&username=" + param.username;
                  apiHost = interveneApiHost;
               }
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.sendMessage = function (param,meaType) {
               let url = "v0/ui/b2c-bot/send-intrup-message/?phone_number=" + param.phone + "&text=" + param.text;
               apiHost = APIBaseUrl;
               if(meaType){
                   url = "v0/ui/mea-bot/send-intrup-message/?phone_number=" + param.phone + "&text=" + param.text;
                   apiHost = interveneApiHost;
                }
               return $http.get(apiHost + url)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };


            authService.contactList = function (param,meaType) {
             let url = "v0/ui/mca-bot/intervene-contact-list/?search="+param.search;
               apiHost = APIBaseUrl;
               if(meaType){
                   url = "v0/ui/mea-bot/intervene-contact-list/?search="+param.search;
                   apiHost = interveneApiHost;
                }
               return $http.get(apiHost + url,param)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });
            };

            authService.attachmentContact = function (param,meaType) {
               let url = "";
               apiHost = APIBaseUrl;
               if(meaType){
                   url = "";
                   apiHost = interveneApiHost;
                }
               return $http.get(apiHost + url,param)
                  .then(function onSuccess(response) {
                     return response
                  })
                  .catch(function onError(response) {
                     return response
                  });

               // return $http.post(apiHost + 'v0/ui/covid-bot/feedback-from-bot/', param)
               //    .then(function onSuccess(response) {
               //       return response
               //    })
               //    .catch(function onError(response) {
               //       return response
               //    });
            };

 


            return authService;
         }])
