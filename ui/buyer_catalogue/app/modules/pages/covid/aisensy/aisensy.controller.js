angular.module('machadaloPages').filter('firstlater', [function () {
  return function (input, scope) {
    if (input != null)
      input = input.charAt(0).toUpperCase();
    return input;
  }
}])
  .directive('myEnter', function () {
    return function (scope, element, attrs) {

      element.bind("keydown keypress", function (event) {
        if (event.which === 13 && !event.shiftKey) {
          scope.$apply(function () {
            // pasteIntoInput(this, "%0a");
            scope.$eval(attrs.myEnter);

          }
          );
          event.preventDefault();
        }

      });
    };
  })
  .controller('aisensyCtrl',
    ['$scope', '$rootScope', '$window', '$sce', '$location', 'AuthService', 'machadaloHttp', 'releaseCampaignService', '$anchorScroll', 'suspenseLeadService', '$state', 'userService', 'constants', 'AuthService', 'vcRecaptchaService', 'commonDataShare',
      function ($scope, $rootScope, $window, $sce, $location, AuthService, machadaloHttp, releaseCampaignService, suspenseLeadService, $anchorScroll, $state, userService, constants, AuthService, vcRecaptchaService, permissions, commonDataShare) {
        // AuthService.Clear();

        $scope.isCollapsed = true;
        $scope.$on('$routeChangeSuccess', function () {
          $scope.isCollapsed = true;
        });

        var apiHost = APIBaseUrl;
        var interveneApiHost = Config.interveneMeaAPIBaseUrl;

        $scope.ckeckdUserAisensy = [];
        $scope.ckeckdUserAisensy1 = [];
        $scope.call_back_time = constants.call_back_time;
        $scope.implementationTime = constants.requirement_implementation_time;
        $scope.meetingTime = constants.requirement_meeting_time;
        $scope.current_patner_feedback = constants.current_patner_feedback;
        let gooIndex = document.getElementById('goo-index');
        let hoverEnter = index => {
          gooIndex.style.top = 100 * index + 'px';
          let allScreens = document.querySelectorAll('.screen');
          allScreens.forEach(e => {
            e.classList.remove('visible')
          })
          let nowVisible = document.getElementById('screen_' + index);
          nowVisible.classList.add('visible');
        }

        $scope.tab = { name: 'tabA' };
        // console.log("start 78787")

        // AIsensy controller
        $scope.getActiveUser = function (page) {
          // alert("first api call")
          $scope.tab.name = 'tabA';
          $scope.hideChatModule();
          $scope.formData.historySearch = "";
          $scope.showcontactDetail = false;
          $scope.showhistoryDetail = false;
          $scope.showChatModule = false;
          $scope.showgetActiveUser = true;
          $scope.showtemplateDetail = false;
          $scope.isUserProfile = false;
          $scope.showfilterDetail = false;
          $scope.formData.contactSearch = "";
          $scope.countBrowsedRow = false;
          $scope.addRemoveBtn = "Add row";


          let param = {
            next_page: 1
          }
          if (page) {
            param.next_page = page;
          } else {
            $scope.totalCount = 1;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 10;
            $scope.serial = 1
            $scope.pagination = {
              current: 1
            };
          }
          if ($scope.formData.activesearch) {
            param.search = $scope.formData.activesearch;
          }

          AuthService.getAllActiveUserData(param)

            .then(function onSuccess(response) {
              $scope.activeUserData = response.data.data.users;
              $scope.totalCount = response.data.data.total_count;

            }).catch(function onError(response) {
              console.log(response);
            })
        }
        $scope.formData = {};

        $scope.getActionRequiredUser = function (page) {

          $scope.tab.name = 'tabB';
          $scope.isUserProfile = false;
          $scope.formData.interveneSearch = '';
          $scope.formData.activesearch = '';
          $scope.showChatModule = false;
          $scope.showfilterDetail = false;
          let param = {
            next_page: 1,
          }
          if (page) {
            param.next_page = page;
          } else {
            $scope.totalCount = 1;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 10;
            $scope.serial = 1
            $scope.pagination = {
              current: 1
            };
          }
          if ($scope.formData.actionSearch) {
            parsuspenam.search = $scope.formData.actionSearch;
          }
          AuthService.getAllActionRequiredData(param)

            .then(function onSuccess(response) {
              $scope.actionRequiredUserData = response.data.data.users;
              $scope.totalCount = response.data.data.total_count
            }).catch(function onError(response) {
              console.log(response);
            })
        }

        $scope.getInterveneUser = function (page) {
          $scope.tab.name = 'tabC';
          $scope.isUserProfile = false;
          $scope.formData.actionSearch = '';
          $scope.formData.activesearch = '';
          $scope.showChatModule = false;
          $scope.showfilterDetail = false;
          let param = {
            next_page: 1
          }
          if (page) {
            param.next_page = page;
          } else {
            $scope.totalCount = 1;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 10;
            $scope.serial = 1
            $scope.pagination = {
              current: 1
            };
          }
          if ($scope.formData.interveneSearch) {
            param.search = $scope.formData.interveneSearch;
          }
          AuthService.getAllInterveneUserData(param)

            .then(function onSuccess(response) {
              $scope.interveneUserData = response.data.data.users;
              $scope.totalCount = response.data.data.total_count
            }).catch(function onError(response) {
              console.log(response);
            })
        }

        $scope.nextPageChat = function (phone) {
          $scope.userDetail(phone, $scope.pageCount + 1);

        }

        $scope.prvPageChat = function (phone) {
          $scope.userDetail(phone, $scope.pageCount - 1);

        }


        $scope.userDetail = function (value, page) {
          $scope.showChatModule = true;
          // let param = {
          //     phoneNumber: value,
          //     nextPage: 1
          // }

          let param = {
            nextPage: 1,
            phoneNumber: value,
          }
          if (page) {
            param.nextPage = page;
          } else {
            $scope.totalCount = 0;
          }

          $scope.pageCount = param.nextPage;
          $scope.disableNextPagebutton = false;
          AuthService.getAllUserDetailData(param)

            .then(function onSuccess(response) {
              $scope.userDetailData = response.data.data;
              $scope.userChatPayload = $scope.userDetailData.payload;
            }).catch(function onError(response) {
              console.log(response);
            })
          AuthService.getAllUserChatData(param)
            .then(function onSuccess(response) {
              $scope.userChatData = response.data.data;
              $scope.totalCount = $scope.userChatData.total_count;
              if ($scope.totalCount > 20) {
                let count = $scope.totalCount / 20;
                if ($scope.pageCount < count) {
                  $scope.disableNextPagebutton = true;
                }
              }

              if ($scope.userChatData && $scope.userChatData.payload && $scope.userChatData.payload.length > 0) {
                for (let i in $scope.userChatData.payload) {
                  //console.log('oppppppppppppppppppp',$scope.userChatData.payload[i].content.contentType);

                  if ($scope.userChatData.payload[i].content && $scope.userChatData.payload[i].content.url) {
                    let typesArray = $scope.userChatData.payload[i].content.contentType.split("/");
                    $scope.userChatData.payload[i].content.types = typesArray;
                    // $scope.userChatData.payload[i].content.url = $scope.userChatData.payload[i].content.url + typesArray[1];
                    if (typesArray[0] == 'image') {
                      $scope.userChatData.payload[i].content.url = $scope.userChatData.payload[i].content.url + typesArray[1]
                    } else {
                      // $scope.userChatData.payload[i].content.url = $scope.userChatData.payload[i].content.url + typesArray[1]
                      let emdUrl = $scope.userChatData.payload[i].content.url + typesArray[1]
                      $scope.userChatData.payload[i].content.url = $sce.trustAsResourceUrl(emdUrl);
                    }


                  }
                }

              }
            }).catch(function onError(response) {
              console.log(response);
            })
        }

        $scope.userProfileIcon = function () {
          $scope.isUserProfile = true;
        }
        $scope.userChatIcon = function () {
          $scope.isUserProfile = false;
        }

        $scope.isUserProfile = false;
        $scope.userChat = function (value) {

          let param = {
            phoneNumber: value,
            start: value,
            end: value
          }
          AuthService.getAllUserChatData(param)

            .then(function onSuccess(response) {
              console.log(response)

              $scope.userChatData = response.data.data;

            }).catch(function onError(response) {
              console.log(response);
            })
        }
        $scope.hideChatModule = function (value) {
          $scope.showChatModule = false;
          $scope.isUserProfile = false;
          $scope.messageBox = false;
        }

        $scope.writeMessage = function (data, tabValue) {
          $scope.messageBox = true;
          $scope.tab = { name: 'tabC' };
          let param = {
            phone: data.phone_number,
            username: data.whatsapp_name
          }
          $scope.addUserToIntervene(param)
            .then(function onSuccess(response) {
              if (response.data.status) {
                if (tabValue == 'active') {
                  var localindex_index = $scope.activeUserData.map(function (el) {
                    return el.phone_number;
                  }).indexOf(data.phone_number);
                  if (localindex_index != -1) {
                    $scope.activeUserData.splice(localindex_index, 1);
                    if ($scope.interveneUserData.length > 0) {
                      $scope.interveneUserData.unshift(data)
                    } else {
                      $scope.interveneUserData.push(data)
                    }
                  }
                } else {
                  var localindex_index = $scope.actionRequiredUserData.map(function (el) {
                    return el.phone_number;
                  }).indexOf(data.phone_number);
                  if (localindex_index != -1) {
                    $scope.actionRequiredUserData.splice(localindex_index, 1);
                    if ($scope.interveneUserData.length > 0) {
                      $scope.interveneUserData.unshift(data)
                    } else {
                      $scope.interveneUserData.push(data)
                    }
                  }
                }
              }
            }).catch(function onError(response) {
              console.log(response);
            })

        }

        $scope.addUserToIntervene = function (param, meaType) {
          let url = "v0/ui/b2c-bot/action-status-intervene/?intervene=True&phone_number=" + param.phone + "&username=" + param.username;
          // apiHost = APIBaseUrl;
          if (meaType) {
            url = "v0/ui/mea-bot/action-status-intervene/?intervene=True&phone_number=" + param.phone + "&username=" + param.username;
            //  apiHost = interveneApiHost;
          }
          return machadaloHttp.get(url)
            .then(function onSuccess(response) {
              return response
            })
            .catch(function onError(response) {
              return response
            });
        };

        $scope.messageBox = false;
        $scope.resolveButton = false;

        $scope.interveneButton = function (data) {
          console.log('+++++++++++++++++++++++++++', data);
          $scope.messageBox = false;
          $scope.resolveButton = true;
          let param = {
            phone: data.phone_number,
            username: data.whatsapp_name
          }

          $scope.addUserToActive(param)
            .then(function onSuccess(response) {
              if (response.data.status) {
                var localindex_index = $scope.interveneUserData.map(function (el) {
                  return el.phone_number;
                }).indexOf(data.phone_number);
                if (localindex_index != -1) {
                  $scope.interveneUserData.splice(localindex_index, 1);
                  // if ($scope.activeUserData.length > 0) {
                  //     $scope.activeUserData.unshift(data)
                  // } else {
                  //     $scope.activeUserData.push(data)
                  // }
                }

              }

            }).catch(function onError(response) {
              console.log(response);
            })
          $scope.hideChatModule();
          $scope.getActiveUser();
          $scope.tab = { name: 'tabA' };
        }
        $scope.addUserToActive = function (param, meaType) {
          let url = "v0/ui/b2c-bot/action-status-intervene/?resolved=True&phone_number=" + param.phone + "&username=" + param.username;
          //apiHost = APIBaseUrl;
          if (meaType) {
            url = "v0/ui/mea-bot/action-status-intervene/?resolved=True&phone_number=" + param.phone + "&username=" + param.username;
            // apiHost = interveneApiHost;
          }
          return machadaloHttp.get(url)
            .then(function onSuccess(response) {
              return response
            })
            .catch(function onError(response) {
              return response
            });

        };

        $scope.contactDetail = function (page) {
          $scope.formData.historySearch = "";
          $scope.showcontactDetail = true;
          $scope.showhistoryDetail = false;
          $scope.totalCount = 0;
          $scope.showgetActiveUser = false;
          $scope.showgetActionRequiredUser = false;
          $scope.showgetInterveneUser = false;
          $scope.showtemplateDetail = false;
          //$scope.contactDetailData = [];
          $scope.showfilterDetail = false;
          let param = {
            next_page: 0
          }
          if (page) {
            page = page - 1;
            param.next_page = page;
          } else {
            $scope.totalCount = 0;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 10;
            $scope.serial = 1
            $scope.pagination = {
              current: 1
            };
          }
          if ($scope.formData.contactSearch) {
            param.search = $scope.formData.contactSearch;
          }
          AuthService.getAllUserContact(param)
            .then(function onSuccess(response) {
              console.log(response)
              $scope.contactDetailData = response.data.data.users;
              $scope.totalCount = response.data.data.total_count;
              console.log($scope.contactDetailData)
            }).catch(function onError(response) {
              console.log(response);
            })
        }

        $scope.historyDetail = function (page) {

          $scope.formData.contactSearch = "";
          $scope.showcontactDetail = false;
          $scope.showhistoryDetail = true;
          $scope.showgetActiveUser = false;
          $scope.showtemplateDetail = false;
          $scope.showfilterDetail = false;
          $scope.isUserProfile = false;
          $scope.showChatModule = false;
          //$scope.historyDetailData = [];
          $scope.totalCount = 0;
          let param = {
            next_page: 0
          }
          if (page) {
            page = page - 1;
            param.next_page = page;
          } else {
            $scope.totalCount = 0;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 10;
            $scope.serial = 1
            $scope.pagination = {
              current: 1
            };
          }
          if ($scope.formData.historySearch) {
            param.search = $scope.formData.historySearch;
          }
          AuthService.getAllUserHistory(param)


            .then(function onSuccess(response) {
              console.log(response)
              $scope.historyDetailData = response.data.data.users;
              $scope.totalCount = response.data.data.total_count
              console.log($scope.historyDetailData)
            }).catch(function onError(response) {
              console.log(response);
            })
        }


        $scope.templateDetail = function (value) {
          // console.log(value)
          // console.log( $scope.templateSearch)
          let param = {
            search: value,
          }
          if (!value) {
            param.search = ""
          }
          // alert("template")

          console.log("111111111", $scope.templateDetailData)
          $scope.showcontactDetail = false;
          $scope.showhistoryDetail = false;
          $scope.showgetActiveUser = false;
          $scope.showgetActionRequiredUser = false;
          $scope.showgetInterveneUser = false;
          $scope.showtemplateDetail = true;
          $scope.showfilterDetail = false;
          $scope.formData.historySearch = "";
          $scope.formData.contactSearch = "";
          AuthService.getTemplateTabData(param)

            .then(function onSuccess(response) {
              console.log(response)
              $scope.templateDetailData = response.data.data;

            }).catch(function onError(response) {
              console.log(response);
            })
        }
        $scope.filterDetail = function (value) {
          // console.log(value)
          // console.log( $scope.templateSearch)
          let param = {

          }

          // alert("template")
          console.log("111111111", $scope.filterDetailData)
          $scope.showcontactDetail = false;
          $scope.showhistoryDetail = false;
          $scope.showgetActiveUser = false;
          $scope.showtemplateDetail = false;
          $scope.showfilterDetail = true;
          $scope.isUserProfile = false;
          $scope.showChatModule = false;
          $scope.formData.historySearch = "";
          $scope.formData.contactSearch = "";

          AuthService.getFilterTabData(param)

            .then(function onSuccess(response) {
              console.log(response)
              $scope.filterDetailData = response.data.data;

            }).catch(function onError(response) {
              console.log(response);
            })
        }


        $scope.searchChat = function (value) {
          console.log(value)
          $scope.search = value;
          console.log("search", $scope.search)

          if (value != "") {
            let param = {
              search: $scope.search
            }
            AuthService.getActiveSearch(param)

              .then(function onSuccess(response) {
                console.log(response)
                console.log("31")
                $scope.activeUserData = response.data.data;

              }).catch(function onError(response) {
                console.log(response);
              })
          } else {
            $scope.getActiveUser(1)
          }
        }



        $scope.searchChatHistory = function (value) {
          console.log(value)
          $scope.search = value;
          console.log("search", $scope.search)


          if (value != "") {
            let param = {
              search: $scope.search
            }
            AuthService.getActiveSearch(param)

              .then(function onSuccess(response) {
                console.log(response)
                console.log("31")
                $scope.historyDetailData = response.data.data;

              }).catch(function onError(response) {
                console.log(response);
              })
          }
          else {
            $scope.historyDetail()
          }
        }

        $scope.searchChatContact = function (value) {
          console.log(value)
          $scope.search = value;
          console.log("search", $scope.search)

          if (value != "") {
            let param = {
              search: $scope.search
            }
            AuthService.getActiveSearch(param)

              .then(function onSuccess(response) {
                console.log(response)
                console.log("31")
                $scope.contactDetailData = response.data.data;

              }).catch(function onError(response) {
                console.log(response);
              })
          } else {
            $scope.contactDetail()
          }
        }


        // $scope.searchChatTemplate = function (value) {
        //     console.log(value)
        //     $scope.search = value;
        //     console.log("search", $scope.search)

        //     if (value != "") {
        //         let param = {
        //             search: $scope.search
        //         }
        //         AuthService.getSearch(param)

        //             .then(function onSuccess(response) {
        //                 console.log(response)
        //                 console.log("31")
        //                 $scope.templateDetailData = response.data.data;

        //             }).catch(function onError(response) {
        //                 console.log(response);
        //             })
        //     } else {
        //         $scope.templateDetail(1)
        //     }
        // }



        // $scope.curPage = 1,
        // $scope.itemsPerPage = 3,
        // $scope.maxSize = 5;


        // $scope.numOfPages = function () {
        //   return Math.ceil(contactDetailData.length / $scope.itemsPerPage);

        // };

        //   $scope.$watch('curPage + numPerPage', function() {
        //   var begin = (($scope.curPage - 1) * $scope.itemsPerPage),
        //   end = begin + $scope.itemsPerPage;

        // //   $scope.filteredItems = contactDetailData.slice(begin, end);
        // });


        $scope.pageChanged = function (newPageNumber, tab) {
          $scope.serial = newPageNumber * 10 - 9;
          $scope.contactDetail(newPageNumber);
        };
        $scope.historyPageChanged = function (newPageNumber, tab) {
          $scope.serial = newPageNumber * 10 - 9;
          $scope.historyDetail(newPageNumber);
        };



        $scope.liveChatPageChanged = function (newPageNumber, tab) {
          $scope.serial = newPageNumber * 10 - 9;
          $scope.getActiveUser(newPageNumber);
        };


        $scope.actionRequiredPageChanged = function (newPageNumber, tab) {
          $scope.serial = newPageNumber * 10 - 9;
          $scope.getActionRequiredUser(newPageNumber);
        };

        $scope.interveneDataPageChanged = function (newPageNumber, tab) {

          $scope.serial = newPageNumber * 10 - 9;
          $scope.getInterveneUser(newPageNumber);
        };

        $scope.templatePageChanged = function (newPageNumber, tab) {
          $scope.serial = newPageNumber * 10 - 9;
          $scope.templateDetail(newPageNumber);
        };




        //   $scope.setCurrentPage =  function(){
        //    $scope.pagination = {
        //      current: 1
        //    };
        //    $scope.serial = 1
        //   }

        $scope.pagination = {
          current: 1
        };
        $scope.totalCount = 0;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
        $scope.serial = 1
        $scope.pagination = {
          current: 1
        };
        $scope.options = {};
        $scope.dateRangeModel = {};
        $scope.changeStartDate = function () {
          $scope.dateRangeModel.start_date = $scope.dateRangeModel.start_dates;
          $scope.options.minDate = $scope.dateRangeModel.start_date;
        }

        $scope.changeEndDate = function () {
          if ($scope.changeEndDate > $scope.changeStartDate)
            $scope.dateRangeModel.end_date = $scope.dateRangeModel.end_dates;
        }

        $scope.filterTab = function () {
          $scope.hideChatModule();
          $scope.dateRangeModel = {};
          $scope.getFilterData();
        }

        $scope.getFilterData = function () {
          $scope.showcontactDetail = false;
          $scope.showhistoryDetail = false;
          $scope.showgetActiveUser = false;
          $scope.showtemplateDetail = false;
          $scope.showfilterDetail = true;
          $scope.dateRangeModel.start_date = $scope.dateFormat($scope.dateRangeModel.start_dates);
          $scope.dateRangeModel.end_date = $scope.dateFormat($scope.dateRangeModel.end_dates);
          AuthService.getFilterTabData($scope.dateRangeModel)
            .then(function onSuccess(response) {
              $scope.filterData = response.data.data.users;
            }).catch(function onError(response) {
              console.log(response);
            })

        }

        $scope.customerJourney = function (data) {
          console.log(data)
          let param = {
            phone_number: data.phone_number
          }
          AuthService.getCustomerJourney(param)
            .then(function onSuccess(response) {
              $scope.customerJourneyData = response.data.data;
              console.log($scope.customerJourneyData)
            }).catch(function onError(response) {
              console.log(response);
            })
        }

        $scope.templateInStatus = function (data) {
          console.log(data)
          let param = {
            phone_number: data.phone_number
          }
          AuthService.gettemplateInStatus(param)
            .then(function onSuccess(response) {
              $scope.templateInStatusData = response.data.data;
              console.log($scope.templateInStatusData)
            }).catch(function onError(response) {
              console.log(response);
            })
        }



        $scope.dateFormat = function (date) {
          var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;
          return [year, month, day].join('-');

        }
        $scope.message = {};
        $scope.sendMessage = function (phone) {

          let param = {
            phone: phone,

          }

          // if(param.text!=null){
          if ($scope.message.activeMessage) {
            $scope.oldString = $scope.message.activeMessage;
            param.text = $scope.oldString.split("\n").join("%0a");
            // }
          }
          else {
            return false
          }
          // if ($scope.message.activeMessage == "") {
          //     return false;
          // }
          // if($scope.message==''){
          //     return false;
          // }
          console.log('11111111111112222222222222222222', param.text);
          AuthService.sendMessage(param)
            .then(function onSuccess(response) {
              console.log(param)
              if (response.data.status) {
                let data = {
                  content: { text: $scope.message.activeMessage },
                  sender: "bot",
                  timestamp: new Date()
                }
                if ($scope.userChatData) {
                  if ($scope.userChatData.payload && $scope.userChatData.payload.length > 0) {
                    $scope.userChatData.payload.unshift(data);

                  }
                  else {
                    $scope.userChatData.payload.push(data);

                  }
                }
                $scope.message = {};


              }
            }).catch(function onError(response) {
              console.log(response);
            })
        }



        $scope.getContactList = function (value) {
          let param = {
            search: value
          }
          if (!value) {
            param.search = ""
          }
          console.log("1contct1");
          console.log(param)
          AuthService.contactList(param, true)
            .then(function onSuccess(response) {
              $scope.contactListData = response.data.data;
            }).catch(function onError(response) {
              console.log(response);
            })

        }

        $scope.getselectedContact = function (email, name, number, c_name) {

          // var data = {}
          var data = {
            gmail: "shahid.dar@machadalo.com",
            name: name,
            contact_number: number,
            company_name: c_name,
          }
          var data11 = {
            0: {
              name: { firstName: name },
              phones: [{ phone: number }],
            }
          }

          $scope.ckeckdUserAisensy.push(data);
          $scope.ckeckdUserAisensy1.push(data11);
          console.log($scope.ckeckdUserAisensy)
          console.log(',,,,', $scope.ckeckdUserAisensy1)
          // $scope.sendContact(phone)
        }
        $scope.sendContact = function (phone) {

          let param = {
            phone_number: phone,
          }
          var data = $scope.ckeckdUserAisensy
          var data22 = $scope.ckeckdUserAisensy1
          // console.log("--------",typeof(data))
          // $scope.ckeckdUserAisensy = {};
          console.log('90909', param.phone_number, data)
          console.log('90====', data22)
          AuthService.attachmentContact(param, data)
            .then(function onSuccess(response) {
              if (response.data.status) {
                for (const i in data22) {
                  let datas = {
                    content: { contacts: data22[i] },
                    sender: "bot",
                    timestamp: new Date()
                  }
                  console.log(i, "=-=-=")
                  console.log("-0-00", datas)
                  if ($scope.userChatData) {
                    if ($scope.userChatData.payload && $scope.userChatData.payload.length > 0) {
                      $scope.userChatData.payload.unshift(datas);
                      console.log(datas, "0000")
                    }
                    else {
                      $scope.userChatData.payload.push(datas);
                      console.log(datas, "1111")
                    }
                  }

                }

              }


            }).catch(function onError(response) {
              console.log(response);
            })
        }

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
          { header: 'Lead Status' },
          { header: 'Comment' },
          { header: 'Internal Comment' },
          { header: 'Lead Given by' },
          { header: 'Call Status' },
          { header: 'Price' },
          { header: 'Timestamp' },
          { header: 'Action' },
        ];
        $scope.subSectorList = ['option1', 'option2', 'option3']
        $scope.requirement_browsed_headings = [
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
          { header: 'Lead Given by' },
          { header: 'Comment' },
          { header: 'Timestamps' }
        ];
        $scope.singleRemoveSubSector = function () {
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
              swal('Remove', 'Remove Successfully', 'success');
            }
          )
        }
        $scope.pocModel = [];
        $scope.addPocField = function () {
          $scope.pocModel.push({
            'mobile': '',
            'name': '',
            'contact_type': ''
          });
        }
        $scope.removePocField = function (index) {
          $scope.pocModel.splice(index, 1)
        }
        $scope.addPoc = function () {
          var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
            return el.id;
          }).indexOf($scope.shortlisted_spaces_id);
          if (localindex_index != -1) {
            $scope.releaseDetails.shortlisted_suppliers[localindex_index].contacts = $scope.pocModel;
          }
        }

        $scope.opsVerifyButtonDiable = true;
        $scope.opsVerified = function (phone, supplier_id) {
          $scope.detailedShow = [];
          userService.getSector()
            .then(function onSuccess(response) {
              $scope.sectorList = response.data;
            })
          releaseCampaignService.selectLeads()
            .then(function onSuccess(response) {
              $scope.leads_time = response.data;
              $scope.lastIndex = $scope.leads_time.data.length - 1;
              $scope.leads_Data = response.data.data;
            })

          releaseCampaignService.requirementDetail("", phone, supplier_id)
            .then(function onSuccess(response) {
              $scope.requirementDetailData = response.data.data.requirements;
              $scope.companiesDetailData = response.data.data.companies;
              for (let k in $scope.companiesDetailData) {
                $scope.companiesDetailData[k].id = $scope.companiesDetailData[k].organisation_id;
                $scope.companiesDetailData[k].label = $scope.companiesDetailData[k].name;
                $scope.companiesDetailData[k].sector = $scope.companiesDetailData[k].business_type[0];
                if (k == response.data.data.companies.length - 1) {
                  $scope.companiesDetailData.push({ id: 'other', label: 'other', organisation_id: '', name: 'other' })
                }
              }
              angular.forEach($scope.requirementDetailData, function (value, i) {
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
              })
            })


          $scope.getRequirementBrowsedData("", phone, supplier_id);

        }

        $scope.sectorName = function (sectorName) {
          $scope.sectorId = sectorName;
          for (i in $scope.sectorList) {
            if ($scope.sectorList[i].id == sectorName) {
              $scope.sector = $scope.sectorList[i].business_type;
              return $scope.sector;
            }
          }
        }
        $scope.selectLeadData = function (data) {
          for (let i in $scope.leads_Data) {
            for (let j in $scope.leads_Data[i]) {
              if (data === j) {
                $scope.leads_Data_1 = $scope.leads_Data[i][data];
                break;
              }
            }
          }
        }
        $scope.settings = {
          showCheckAll: false,
          scrollable: false,
          enableSearch: false,
          showUncheckAll: false
        };

        $scope.detailedShow = [];
        $scope.sector_name = "";
        $scope.ShowDetailed = function (index, sector) {
          $scope.companyData(sector);
          $scope.sector_name = $scope.sectorName(sector);
          $scope.selectLeadData($scope.sector_name.toLowerCase())
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
        }
        $scope.subSectorCheck = true;
        $scope.checkBoxAutoCheck = function (key, index) {
          $scope.requirementDetailData[key].requirements[index].requirementCheck = true;
          $scope.checkbooxCheck(key);
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
        $scope.companiesDetailDataArray = [];
        $scope.companyData = function (id) {
          while ($scope.companiesDetailDataArray.length) {
            $scope.companiesDetailDataArray.pop();
          }

          var i = 0;
          for (let k in $scope.companiesDetailData) {

            if ($scope.companiesDetailData[k].business_type !== undefined) {
              if (id == $scope.companiesDetailData[k].business_type[0]) {
                $scope.companiesDetailDataArray[i] = $scope.companiesDetailData[k];
                $scope.companiesDetailDataArray[i].id = $scope.companiesDetailData[k].organisation_id;
                $scope.companiesDetailDataArray[i].label = $scope.companiesDetailData[k].name;
                $scope.companiesDetailDataArray[i].sector = $scope.companiesDetailData[k].business_type[0];
                i++;
              }
            }
          }
        }

        $scope.otherPreferredCompany = false;
        $scope.subSectorPreferredMulticheck = function (key, index) {
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
          if ($scope.requirementDetailData[key] && $scope.requirementDetailData[key].requirements[index] && $scope.requirementDetailData[key].requirements[index].selected_preferred_company_sub_sector && $scope.requirementDetailData[key].requirements[index].selected_preferred_company_sub_sector.length == 0) {
            $scope.requirementDetailData[key].requirements[index].preferred_company = [];
            $scope.requirementDetailData[key].requirements[index].otherPreferredCompany = false
          }
        }

        $scope.updateSubSectorRow = function (data) {
          let updateData = [];
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
            if ($scope.checkIsPreferredCompanyOther) {
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
                      if (responseData && responseData.length > 0) {
                        for (let i in responseData) {
                          if (responseData[i].id == data.id) {
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
                if (response.data.status == false) {
                  if (response.data.data && response.data.data.general_error && response.data.data.general_error.errors && response.data.data.general_error.errors.impl_timeline) {
                    swal(constants.name, response.data.data.general_error.errors.impl_timeline[0], constants.error);
                  }
                  if (response.data.data && response.data.data.general_error && response.data.data.general_error.errors && response.data.data.general_error.errors.preferred_company) {
                    swal(constants.name, response.data.data.general_error.errors.preferred_company[0], constants.error);
                  }
                }
              })
          }
          if (data.current_company == null && data.current_company_other != '') {
            data.current_company = "";
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
                        if (response && response.data && response.data.data && response.data.data.list_color_code != 'null') {
                          let color_class = '';
                          //swal(constants.name, constants.delete_success, constants.success);

                          if (response.data.data.list_color_code == 1) {
                            color_class = 'yellow';;
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
                          //  var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
                          //   return el.id;
                          // }).indexOf($scope.shortlisted_spaces_id);
                          // if (localindex_index != -1) {
                          //   $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_code = response.data.data.list_color_code;
                          //     $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_class = color_class;
                          //   }
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
                        if (response && response.data && response.data.data && response.data.data.list_color_code != 'null') {
                          let color_class = '';
                          if (response.data.data.list_color_code == 1) {
                            color_class = 'yellow';;
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
                          // var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
                          //   return el.id;
                          // }).indexOf($scope.shortlisted_spaces_id);
                          // if (localindex_index != -1) {
                          //   $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_code = response.data.data.list_color_code;
                          //     $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_class = color_class;
                          //   }
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
                              first_name: response.data.data.verified_ops_by
                            }

                          }


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
                      if (response && response.data && response.data.data && response.data.data.list_color_code != 'null') {
                        let color_class = '';
                        if (response.data.data.list_color_code == 1) {
                          color_class = 'yellow';;
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
                    if (response && response.data && response.data.data && response.data.data.general_error && response.data.data.general_error.error) {
                      swal(constants.name, response.data.data.general_error.error, constants.error);
                    }
                  })
              }
            });

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
                  $scope.checkIsPreferredCompanyOther = false;
                  data[i].preferred_company.splice(j, 1)
                }
              }
            }
            if ($scope.checkIsPreferredCompanyOther) {
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
                        if (responseData && responseData.length > 0) {
                          for (let n in responseData) {
                            if (responseData[n].id == data[k].id) {
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
                if (response.data.status == false) {
                  if (response.data.data && response.data.data.general_error && response.data.data.general_error.errors && response.data.data.general_error.errors.impl_timeline) {
                    swal(constants.name, response.data.data.general_error.errors.impl_timeline[0], constants.error);
                  }
                  if (response.data.data && response.data.data.general_error && response.data.data.general_error.errors && response.data.data.general_error.errors.preferred_company) {
                    swal(constants.name, response.data.data.general_error.errors.preferred_company[0], constants.error);
                  }

                }
              })
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
                        if (response && response.data && response.data.data && response.data.data.list_color_code != 'null') {
                          let color_class = '';
                          if (response.data.data.list_color_code == 1) {
                            color_class = 'yellow';;
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
                          // var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
                          //   return el.id;
                          // }).indexOf($scope.shortlisted_spaces_id);
                          // if (localindex_index != -1) {
                          //   $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_code = response.data.data.list_color_code;
                          //     $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_class = color_class;
                          //   }
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
                        if (response && response.data && response.data.data && response.data.data.list_color_code != 'null') {
                          let color_class = '';
                          if (response.data.data.list_color_code == 1) {
                            color_class = 'yellow';;
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

        $scope.mymodel = [];
        $scope.viewCommentsLeadDetails = function (Id, check) {
          $scope.req_id = Id;
          $scope.check = check;
          $('#viewCommentsLeadDetails').modal('show');
          if (check == 'external') {
            releaseCampaignService.viewCommentsDetails(Id)
              .then(function onSuccess(response) {
                $scope.externalComment = response.data.data;
              })
          }
          else {
            releaseCampaignService.viewInternalsComments(Id)
              .then(function onSuccess(response) {
                $scope.externalComment = response.data.data;
              })
          }
        }

        $scope.commentValueDetails = function (comment) {
          if ($scope.check == 'external') {
            releaseCampaignService.basicClientComment(comment.comment, $scope.req_id)
              .then(function onSuccess(response) {
                swal("Successfull", "comment added sucessfully", "success");
                $scope.mymodel['comment'] = '';
                $scope.viewCommentsLeadDetails($scope.req_id, $scope.check);
              })
          }
          else {
            releaseCampaignService.internalCommentValue(comment.comment, $scope.req_id)
              .then(function onSuccess(response) {
                swal("Successfull", "comment added sucessfully", "success");
                $scope.mymodel['comment'] = '';
                $scope.viewCommentsLeadDetails($scope.req_id, $scope.check);
              })
          }
        }
        $scope.deleteBasicComment = function (comment_id) {
          if ($scope.check == 'external') {
            releaseCampaignService.deleteBasicComment(comment_id, $scope.req_id)
              .then(function onSuccess(response) {
                swal("", response.data.data, "success");
                releaseCampaignService.viewCommentsDetails($scope.req_id, $scope.check)
                  .then(function onSuccess(response) {
                    $scope.externalComment = response.data.data;
                  })
              })
          }
          else {
            releaseCampaignService.deleteInternalComment(comment_id, $scope.req_id)
              .then(function onSuccess(response) {
                swal("", response.data.data, "success");
                releaseCampaignService.viewInternalsComments($scope.req_id, $scope.check)
                  .then(function onSuccess(response) {
                    $scope.externalComment = response.data.data;
                  })
              })
          }
        }

        $scope.getRequirementBrowsedData = function (id, phone, supplierId) {
          releaseCampaignService.requirementBrowsedData(id, phone, supplierId)
            .then(function onSuccess(response)  {
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
                if ($scope.browsedDetailData[i].prefered_patners && $scope.browsedDetailData[i].prefered_patners.length > 0) {
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

              

                // userService.getSector()
                // .then(function onSuccess(response) {
                //   $scope.sectorList = response.data;
                // });
                //start added sector name
                if ($scope.sectorList) {
                  var localindex_indexs = $scope.sectorList.map(function (el) {
                    return el.id;
                  }).indexOf($scope.browsedDetailData[i].sector_id);
                  if (localindex_indexs != -1) {
                    $scope.browsedDetailData[i].sector_name = $scope.sectorList[localindex_indexs].business_type
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
        $scope.browsCheckBoxAutoCheck = function (index) {
          $scope.browsedDetailData[index].browsedCheck = true;
          $scope.checkboxBrowesLeadCheck()
        }
        $scope.companiesBrowseDetailDataArray=[];
        $scope.companyBrowseData=function(id){
          while ($scope.companiesBrowseDetailDataArray.length) { 
            $scope.companiesBrowseDetailDataArray.pop(); 
          }
          var i=0;
          for (let k in $scope.companiesDetailDataBrowsed) {
            if($scope.companiesDetailDataBrowsed[k].business_type!==undefined){
              if(id==$scope.companiesDetailDataBrowsed[k].business_type[0]){
                $scope.companiesBrowseDetailDataArray[i]=$scope.companiesDetailDataBrowsed[k];
                $scope.companiesBrowseDetailDataArray[i].id = $scope.companiesDetailDataBrowsed[k].organisation_id;
                $scope.companiesBrowseDetailDataArray[i].label = $scope.companiesDetailDataBrowsed[k].name;
                $scope.companiesBrowseDetailDataArray[i].sector = $scope.companiesDetailDataBrowsed[k].business_type[0];
                i++;
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
                        $scope.getRequirementDetail($scope.shortlisted_spaces_id,"null","null");
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

        $scope.singleOpsVerifyRequirement = function (id) {
          let verifyId = []; alert(1)
          verifyId.push(id);
          if (verifyId.length > 0) {
            $scope.verifyRequirement(verifyId);
          }
        }
        $scope.pageChangedSuspenseLead = function (page, condition) {
          if (condition == true) {
            $scope.getLeadsTabSuspenseLeads(page);
          }
          else {
            $scope.browsedSuspenseLeads(page);
          }
        }
        $scope.getLeadsTabSuspenseLeads = function (page) {
          $scope.loading = null;
          if (!page) {
            page = 1;
            $scope.browsedSuspenseLeads("1");
          }
          $scope.leadTabData = [{}];
          $scope.currentPageLead = page;
          $scope.companiesData = [{}];
          AuthService.getLeasTabSuspenseLead(page)
            .then(function onSuccess(response) {
              $scope.loading = response;
              $scope.leadTabData = response.data.data.suspense_lead.suspense_data;
              $scope.totalCountLead = response.data.data.suspense_lead.count;
              $scope.itemsPerPageLead = 10;
              $scope.currentPageLead = 0;
              $scope.companiesData = response.data.data.companies;
              for (let k in $scope.companiesData) {
                $scope.companiesData[k].id = $scope.companiesData[k].organisation_id;
                $scope.companiesData[k].label = $scope.companiesData[k].name;
                if (k == response.data.data.companies.length - 1) {
                  $scope.companiesData.push({ id: 'other', label: 'other', organisation_id: '', name: 'other' })
                }
              }

              if ($scope.leadTabData && $scope.leadTabData.length > 0) {
                for (let i in $scope.leadTabData) {
                  var localTime = moment.utc($scope.leadTabData[i].created_at).local();
                  $scope.leadTabData[i].created_at = localTime._d;
                  if (!$scope.leadTabData[i].current_patner) {
                    $scope.leadTabData[i].current_patner = '';
                  }
                  var selected_preferred_patner = [];
                  $scope.leadTabData[i].selected_preferred_patner = [];
                  if ($scope.leadTabData[i].prefered_patner_other) {
                    $scope.otherPreferredPatner = true
                    $scope.leadTabData[i].otherPreferredPatner = true
                    $scope.leadTabData[i].prefered_patners.push("")
                  }

                  if ($scope.leadTabData[i].prefered_patners && $scope.leadTabData[i].prefered_patners.length > 0) {
                    for (let y in $scope.leadTabData[i].prefered_patners) {
                      var _index = $scope.companiesData.map(function (el) {
                        return el.organisation_id;
                      }).indexOf($scope.leadTabData[i].prefered_patners[y]);
                      if (_index != -1) {
                        selected_preferred_patner.push($scope.companiesData[_index])
                      }
                    }
                    $scope.leadTabData[i].selected_preferred_patner = selected_preferred_patner;
                  }

                }
              }

            }).catch(function onError(response) {
              console.log(response);
            })
        }

        //browsed data

        $scope.browsedSuspenseLeads = function (page) {
          if (!page) {
            page = 1;
          }
          $scope.currentPageBrowsed = page;
          $scope.leadTabDataBrowsed = [{}];
          AuthService.getBrowsedTabSuspenseLead(page)
            .then(function onSuccess(response) {
              $scope.loading = response;
              $scope.leadTabDataBrowsed = response.data.data.suspense_lead.suspense_data;
              $scope.companiesDataBrowsed = response.data.data.companies;
              for (let k in $scope.companiesDataBrowsed) {
                $scope.companiesDataBrowsed[k].id = $scope.companiesDataBrowsed[k].organisation_id;
                $scope.companiesDataBrowsed[k].label = $scope.companiesDataBrowsed[k].name;
                if (k == response.data.data.companies.length - 1) {
                  $scope.companiesDataBrowsed.push({ id: 'other', label: 'other', organisation_id: '', name: 'other' })
                }
              }
              if ($scope.leadTabDataBrowsed && $scope.leadTabDataBrowsed.length > 0) {
                for (let i in $scope.leadTabDataBrowsed) {
                  var localTime = moment.utc($scope.leadTabDataBrowsed[i].created_at).local();
                  $scope.leadTabDataBrowsed[i].created_at = localTime._d;
                  if (!$scope.leadTabDataBrowsed[i].current_patner) {
                    $scope.leadTabDataBrowsed[i].current_patner = '';
                  }
                  var selected_preferred_patner = [];
                  $scope.leadTabDataBrowsed[i].selected_preferred_patner = [];
                  if ($scope.leadTabDataBrowsed[i].prefered_patner_other) {
                    $scope.otherPreferredPatner = true
                    $scope.leadTabDataBrowsed[i].otherPreferredPatner = true
                    $scope.leadTabDataBrowsed[i].prefered_patners.push("")
                  }

                  if ($scope.leadTabDataBrowsed[i].prefered_patners && $scope.leadTabDataBrowsed[i].prefered_patners.length > 0) {
                    for (let y in $scope.leadTabDataBrowsed[i].prefered_patners) {
                      var _index = $scope.companiesDataBrowsed.map(function (el) {
                        return el.organisation_id;
                      }).indexOf($scope.leadTabDataBrowsed[i].prefered_patners[y]);
                      if (_index != -1) {
                        selected_preferred_patner.push($scope.companiesDataBrowsed[_index])
                      }
                    }
                    $scope.leadTabDataBrowsed[i].selected_preferred_patner = selected_preferred_patner;
                  }

                }
              }
            }).catch(function onError(response) {
              console.log(response);
            })
        }

        $scope.changeSupplier = function (type) {
          if (type == 'RS') {
            $scope.designation = constants.designation_society;
          } else if (type == 'CP') {
            $scope.designation = constants.designation_corporate;

          } else if (type == 'GY' || type == 'SA') {
            $scope.designation = constants.designation_saloon;

          } else if (type == 'EI' || type == 'GN') {
            $scope.designation = constants.designation_gantry;

          } else {
            $scope.designation = constants.designation_bus_shelter;
          }
          $scope.supplierForAddUpdateData.designation = "";
        }
        $scope.supplierForAddUpdate = function (index) {
          $scope.supplierForAddUpdateData = {};
          $scope.supplierForAddUpdateData = $scope.leadTabData[index];
          if ($scope.supplierForAddUpdateData.supplier_type == 'RS') {
            $scope.designation = constants.designation_society;
          } else if ($scope.supplierForAddUpdateData.supplier_type == 'CP') {
            $scope.designation = constants.designation_corporate;

          } else if ($scope.supplierForAddUpdateData.supplier_type == 'GY' || $scope.supplierForAddUpdateData.supplier_type == 'SA') {
            $scope.designation = constants.designation_saloon;

          } else if ($scope.supplierForAddUpdateData.supplier_type == 'EI' || $scope.supplierForAddUpdateData.supplier_type == 'GN') {
            $scope.designation = constants.designation_gantry;
          } else {
            $scope.designation = constants.designation_bus_shelter;
          }
          $scope.leadDataIndex = index;
          $scope.suppliersName = [];
          $scope.Areas = [];
          $scope.model = {};
          $scope.selectedArea = [];
          $scope.selectedSupplierName = [];
          if ($scope.supplierForAddUpdateData.city_id) {
            $scope.model = {
              city_id: $scope.supplierForAddUpdateData.city_id,
              city: $scope.supplierForAddUpdateData.city,
            }
            $scope.getArea(true)
          }
          if ($scope.supplierForAddUpdateData.is_updated == "True") {
            $scope.selectArea();
          }
          AuthService.initialData()
            .then(function onSuccess(response) {
              $scope.Cities = response.data.cities;
              $scope.supplierTypes = response.data.supplier_types;
            }).catch(function onError(response) {
              console.log(response);
            })
        }
        $scope.getArea = function (value) {
          $scope.selectedSupplierName = [];
          var id = $scope.supplierForAddUpdateData.city_id;
          var localindex_index = $scope.Cities.map(function (el) {
            return el.id;
          }).indexOf(JSON.parse($scope.supplierForAddUpdateData.city_id));
          if (localindex_index != -1) {
            $scope.supplierForAddUpdateData['city_id'] = $scope.Cities[localindex_index].id;
            $scope.supplierForAddUpdateData['city'] = $scope.Cities[localindex_index].city_name;
          }
          AuthService.getAreas('areas', id)
            .success(function (response) {
              $scope.selectedArea = [];
              if (!value) {
                $scope.supplierForAddUpdateData['area_id'] = "";
                $scope.supplierForAddUpdateData['area'] = "";
              }
              $scope.Areas = response;
            });
        }

        $scope.selectArea = function () {
          $scope.suppliersName = [];
          $scope.selectedSupplierName = [];
          if ($scope.selectedArea && $scope.selectedArea.length > 0) {
            $scope.supplierForAddUpdateData['area'] = $scope.selectedArea[0].label;
            $scope.supplierForAddUpdateData['area_id'] = $scope.selectedArea[0].id;
          }
          let data = {
            city: $scope.supplierForAddUpdateData.city,
            area: $scope.supplierForAddUpdateData.area,
            supplier_type: $scope.supplierForAddUpdateData.supplier_type
          }
          AuthService.getSupplierNameList(data)
            .then(function onSuccess(response) {
              if (response) {
                $scope.suppliersName = response.data.data.supplier_list;
                if ($scope.suppliersName.length > 0) {
                  for (let i in $scope.suppliersName) {
                    if ($scope.suppliersName[i].supplier_name) {
                      $scope.suppliersName[i].label = $scope.suppliersName[i].supplier_name;
                    } else {
                      $scope.suppliersName[i].label = $scope.suppliersName[i].society_name;
                    }

                    $scope.suppliersName[i].id = $scope.suppliersName[i].supplier_id;
                  }
                }
              }
            }).catch(function onError(response) {
              console.log(response);
            });
        }

        $scope.updateLeadTab = function (index) {
          if ($scope.leadTabData[index].current_patner) {
            $scope.leadTabData[index].current_patner_other = null;
          }

          let otherPreferred = null
          if ($scope.leadTabData[index].prefered_patners && $scope.leadTabData[index].prefered_patners.length > 0) {
            for (let i in $scope.leadTabData[index].prefered_patners) {
              if (!$scope.leadTabData[index].prefered_patners[i]) {
                $scope.leadTabData[index].prefered_patners.splice(i, 1);
              }
              if ($scope.leadTabData[index].prefered_patners[i] == 'other') {
                otherPreferred = $scope.leadTabData[index].prefered_patner_other
              }
            }
          }
          let data = [{
            "_id": $scope.leadTabData[index]._id,
            "implementation_timeline": $scope.leadTabData[index].implementation_timeline,
            "meating_timeline": $scope.leadTabData[index].meating_timeline,
            "comment": $scope.leadTabData[index].comment,
            "current_patner_id": $scope.leadTabData[index].current_patner,
            "current_patner_other": $scope.leadTabData[index].current_patner_other ? $scope.leadTabData[index].current_patner_other : null,
            "prefered_patners_id": $scope.leadTabData[index].prefered_patners,
            "prefered_patner_other": otherPreferred,
            "call_back_preference": $scope.leadTabData[index].call_back_preference,
            "current_patner_feedback": $scope.leadTabData[index].current_patner_feedback,
            "current_patner_feedback_reason": $scope.leadTabData[index].current_patner_feedback_reason,
            "l3_answer_1": $scope.leadTabData[index].l3_answer_1,
            "internal_comment": $scope.leadTabData[index].internal_comment,
          }];

          let update = {
            "suspense_leads": data
          }
          swal({
            title: 'Are you sure ?',
            text: 'Update Suspense Lead',
            type: constants.warning,
            showCancelButton: true,
            confirmButtonClass: "btn-success",
            confirmButtonText: "Yes, Save!",
            closeOnConfirm: false,
            closeOnCancel: true

          },
            function (confirm) {
              if (confirm) {
                AuthService.updateLeadTab(update)
                  .then(function onSuccess(response) {
                    if (response && response.data.data.error) {
                      swal(constants.name, response.data.data.error, constants.error);
                    } else {
                      swal(constants.name, response.data.data.message, constants.success);
                      $scope.leadTabData[index].lead_status = response.data.data.lead_status;
                      if ($scope.leadTabData[index].meating_timeline == 'not given') {
                        $scope.leadTabData.splice(index, 1)
                      }
                    }
                  }).catch(function onError(response) {
                    console.log(response);
                  })
              }
            });
        }
        $scope.removeSuspenseLead = function (id, index) {
          let removeData = {
            "suspense_ids": [id]
          }
          swal({
            title: 'Are you sure ?',
            text: 'Remove Suspense Lead',
            type: constants.warning,
            showCancelButton: true,
            confirmButtonClass: "btn-success",
            confirmButtonText: "Yes, Remove!",
            closeOnConfirm: false,
            closeOnCancel: true
          },
            function (confirm) {
              if (confirm) {
                AuthService.removeSuspenseLead(removeData)
                  .then(function onSuccess(response) {
                    if (response && response.data.data.error) {
                      swal(constants.name, response.data.data.error, constants.error);
                    } else {
                      $scope.leadTabData.splice(index, 1)
                      swal(constants.name, response.data.data.message, constants.success);
                    }
                  }).catch(function onError(response) {
                    console.log(response);
                  });
              }
            });
        }

        $scope.opsVerify = function (id) {
          AuthService.opsVerify(id)
            .then(function onSuccess(response) {
              if (response && response.data.data.error) {
                swal(constants.name, response.data.data.error, constants.error);
              } else {
                swal(constants.name, response.data.data.message, constants.success);
              }
            }).catch(function onError(response) {
              if (response && response.data && response.data.data && response.data.data.general_error && response.data.data.general_error.error) {
                swal(constants.name, response.data.data.general_error.error, constants.error);
              }
            });
        }
        $scope.addUpdateSupplier = function () {
          if ($scope.supplierForAddUpdateData.isNewArea) {
            $scope.supplierForAddUpdateData.area_id = null
          }
          if ($scope.supplierForAddUpdateData.isNewSupplier) {
            $scope.supplierForAddUpdateData.supplier_id = null
          }
          if ($scope.supplierForAddUpdateData.address1) {
            $scope.supplierForAddUpdateData.address = $scope.supplierForAddUpdateData.address1;
          }
          $scope.supplierForAddUpdateData.suspense_id = $scope.supplierForAddUpdateData._id
          AuthService.addUpdateSupplier($scope.supplierForAddUpdateData)
            .then(function onSuccess(response) {
              if (response && response.data.data.error) {
                swal(constants.name, response.data.data.error, constants.error);
              } else {
                $scope.leadTabData[$scope.leadDataIndex] = $scope.supplierForAddUpdateData;
                $scope.leadTabData[$scope.leadDataIndex].is_updated = 'True';

                for (let i in $scope.leadTabData) {
                  if ($scope.leadTabData[i].phone_number == $scope.supplierForAddUpdateData.phone_number) {
                    $scope.leadTabData[i].is_updated = 'True';
                  }
                }

                swal(constants.name, response.data.data.message, constants.success);
              }
            }).catch(function onError(response) {
              console.log(response);
            });
        }

        $scope.openAddPoc = function (id, supplier_type) {
          if (supplier_type == 'RS') {
            $scope.poc_designation = constants.designation_society;
          } else if (supplier_type == 'CP') {
            $scope.poc_designation = constants.designation_corporate;

          } else if (supplier_type == 'GY' || supplier_type == 'SA') {
            $scope.poc_designation = constants.designation_saloon;

          } else if (supplier_type == 'EI' || supplier_type == 'GN') {
            $scope.poc_designation = constants.designation_gantry;
          } else {
            $scope.poc_designation = constants.designation_bus_shelter;
          }
          $scope.suspenseLeadId = id
          $scope.pocModel = [{
            'mobile': '',
            'name': '',
            'contact_type': ''
          }];
          suspenseLeadService.getPocList(id)
            .then(function onSuccess(response) {
              if (response) {
                $scope.pocModel = response.data.data.contact_detail;
              }
            }).catch(function onError(response) {
              console.log(response);
            });
        }

        $scope.addBrowsedRow = function () {
          if ($scope.countBrowsedRow == false) {
            $scope.countBrowsedRow = true;
            $scope.addRemoveBtn = "Remove row";
          }
          else {
            $scope.countBrowsedRow = false;
            $scope.addRemoveBtn = "Add row";
          }
        }


      }]);



