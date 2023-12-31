angular
  .module("machadaloCommon")
  .directive(
    "chatDetail",
    function (
      $window,
      $rootScope,
      constants,
      $timeout,
      permissions,
      AuthService,
      $sce,
      $anchorScroll,
      releaseCampaignService,
      userService
    ) {
      let userInfo = JSON.parse(localStorage.userInfo);
      return {
        templateUrl: "modules/common/chatDetail/chat-detail.tmpl.html",
        link: function ($scope, element, attrs) {
          $scope.getTemplateDataParams = { page: 0, search: "" };
          $scope.opsVerifiedValidation = { phoneNumber: null };
          $scope.messageBox = { show: false };
          $scope.detailedShow = [];
          $scope.sector_name = "";
          $scope.companiesDetailDataArray = [];
          $scope.addRemoveBtn = "Add row";
          $scope.NewaddRemoveBtn = "Add row";
          $scope.mymodel = [];
          $scope.otherPreferredCompany = false;
          $scope.filterLeadData = {};
          $scope.subSectorCheck = true;
          $scope.companiesBrowseDetailDataArray = [];
          $scope.companiesBrowseDetailDataArrayCompany = {};
          $scope.newbrowsed = {};
          $scope.browsedCheck = true;
          $scope.SelectedCompany = [];
          $scope.newCompaniesBrowseDetailDataArray = [];
          $scope.new_data_check = false;
          $scope.countBrowsedRow = false;
          $scope.NewcountBrowsedRow = false;

          $scope.requirement_submitted_headings = [
            { header: "" },
            { header: "Sector" },
            { header: "Sub Sector" },
            { header: "Current Partner" },
            { header: "FeedBack" },
            { header: "Preferred Partner" },
            { header: "L4 Answers" },
            { header: "L5 Answers" },
            { header: "L6 Answers" },
            { header: "Lead Status" },
            { header: "Comment" },
            { header: "Internal Comment" },
            { header: "Lead Given by" },
            { header: "Supplier Agency " },
            { header: "Agency User" },
            { header: "Call Status" },
            { header: "Price" },
            { header: "Timestamp" },
            { header: "Action" },
          ];

          $scope.subSectorList = ["option1", "option2", "option3"];
          $scope.requirement_browsed_headings = [
            { header: "" },
            { header: "Sector" },
            { header: "Sub Sector" },
            { header: "Current Partner" },
            { header: "FeedBack" },
            { header: "Preferred Partner" },
            { header: "L1 Answers" },
            { header: "L2 Answers" },
            { header: "L3 Answers" },
            { header: "Lead Given by" },
            { header: "Comment" },
            { header: "Timestamps" },
          ];

          $scope.userDetail = function (number, page) {
            $scope.showChatModule = true;

            $scope.NewsupplierAddUpdateData = {};
            $scope.newSupplierPocModel = [];
            $scope.Supplier_id = "";
            $scope.societyNameList = [];
            $scope.newSelectedArea = [];
            $scope.Areas = "";

            let param = {
              nextPage: 1,
              phoneNumber: number,
            };
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
                $scope.NewsupplierAddUpdateData.phone_number =
                  $scope.userDetailData.phone_number;
                $scope.getSupplierDataByNumber(
                  $scope.userDetailData.phone_number
                );
              })
              .catch(function onError(response) {
                console.log(response);
              });
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

                if (
                  $scope.userChatData &&
                  $scope.userChatData.payload &&
                  $scope.userChatData.payload.length > 0
                ) {
                  for (let i in $scope.userChatData.payload) {
                    if (
                      $scope.userChatData.payload[i].content &&
                      $scope.userChatData.payload[i].content.url
                    ) {
                      let typesArray = $scope.userChatData.payload[i].content.contentType.split("/");
                      $scope.userChatData.payload[i].content.types = typesArray;
                      if (typesArray[0] == "image") {
                        $scope.userChatData.payload[i].content.url =
                          $scope.userChatData.payload[i].content.url +
                          typesArray[1];
                      }
                      else {
                        let emdUrl = $scope.userChatData.payload[i].content.url + typesArray[1];
                        $scope.userChatData.payload[i].content.url = $sce.trustAsResourceUrl(emdUrl);
                      }
                    }
                  }
                }
              })
              .catch(function onError(response) {
                console.log(response);
              });
              setTimeout(function () {
                $anchorScroll('scrollToIntervene');
              }, 1);
          };
          $scope.userDetail(attrs.number);
          // $scope.userDetail("9752276168");

          $scope.writeMessage = function (data, intervenResolved) {
            let param = {
              phone: data.phone_number,
              username: data.whatsapp_name
            }
            if (!intervenResolved) {
              AuthService.addUserToIntervene(param, false)
                .then(function onSuccess(response) {
                  setTimeout(function () {
                    $anchorScroll('scrollToBottom');
                  }, 1);
                  $scope.messageBox.show = true;
                }).catch(function onError(response) {
                  console.log(response);
                })
            }
            else {
              AuthService.addUserToActive(param, false)
                .then(function onSuccess(response) {
                  console.log("RESOLVED");
                  $scope.messageBox.show = false;
                }).catch(function onError(response) {
                  console.log(response);
                })
            }
          }

          $scope.sendMessage = function (phone) {
            let param = {
              phone: phone,
            }
            if ($scope.messageBox.activeMessage) {
              $scope.oldString = $scope.messageBox.activeMessage;
              param.text = $scope.oldString.split("\n").join("%0a");
            }
            else {
              return false
            }
            AuthService.sendMessage(param)
              .then(function onSuccess(response) {
                if (response.data.status) {
                  let data = {
                    content: { text: $scope.messageBox.activeMessage },
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
                  $scope.messageBox = { ...$scope.messageBox, activeMessage: '' };
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
            AuthService.contactList(param, true)
              .then(function onSuccess(response) {
                $scope.contactListData = response.data.data;
              }).catch(function onError(response) {
                console.log(response);
              })
          }

          $scope.getTemplateData = function () {
            if (!$scope.getTemplateDataParams.page) {
              $scope.getTemplateDataParams.page = 0;
            }
            if (!$scope.getTemplateDataParams.search) {
              $scope.getTemplateDataParams.search = "";
            }
            $scope.TemplateCollapseRow = "";
            AuthService.getTemplateTabData($scope.getTemplateDataParams)
              .then(function onSuccess(response) {
                $scope.TemplateList = response.data.data;
              })
              .catch(function onError(response) {
                console.log(response);
              });
          };

          $scope.getselectedTemplate = function (list) {
            $scope.TemplateCollapseRow = list.id;
          };

          $scope.setSendTemplateParams = function (param, row) {
            let payload = [
              {
                template_id: row.id,
                phone_number: $scope.userChatData.phone_number,
                params: param.split(","),
                default_params: row.param,
              },
            ];
            AuthService.sendTemplateToUser(payload)
              .then(function onSuccess(response) {
                $("#TemplateModal").modal("hide");
                swal("Success", "Sent successfully", constants.success);
              })
              .catch(function onError(response) {
                console.log(response);
                swal("Error", constants.errorMsg, constants.error);
              });
          };
          $scope.CallTemplate = function (data) {
            $scope.CallModel = { destination_number: data.phone_number };
            getCallStatusList();
          };

          let getCallStatusList = function () {
            AuthService.getDialerCallerIds()
              .then(function onSuccess(response) {
                $scope.DialerCallerIds = response.data.data;
              })
              .catch(function onError(response) {
                console.log(response);
              });
            AuthService.getDialerAgents()
              .then(function onSuccess(response) {
                $scope.DialerAgentList = response.data.data;
                console.log($scope.DialerAgentList);
              })
              .catch(function onError(response) {
                console.log(response);
              });
          };
          $scope.OnQuickCall = function (data) {
            AuthService.postDataOnQuickCall(data)
              .then(function onSuccess(response) {
                swal("", response.data.data.message, constants.success);
              })
              .catch(function onError(response) {
                console.log(response);
                swal("Error", constants.errorMsg, constants.error);
              });
          };
          $scope.visitmap = function (link) {
            window.open(link, "_blank");
          };
          $scope.nextPageChat = function (phone) {
            $scope.userDetail(phone, $scope.pageCount + 1);
          };
          $scope.prvPageChat = function (phone) {
            $scope.userDetail(phone, $scope.pageCount - 1);
          };

          //Start OPS Verified Modal
          $scope.opsVerified = function (phone, supplier_id, supplierType) {
            if ($scope.opsVerifiedValidation.phoneNumber !== phone) {
              $scope.requirementDetailData = {};
              $scope.detailedShow = [];
              $scope.newbrowsed = {};
              $scope.SelectedCompany = [];
              $scope.preferred_partnerList = {};
              $scope.leads_Data_1 = {};
              $scope.userMinimalList = [];
              // let organisation = JSON.parse(localStorage["userInfo"]);

              userService.getSector().then(function onSuccess(response) {
                $scope.sectorList = response.data;
              });
              releaseCampaignService
                .selectLeads()
                .then(function onSuccess(response) {
                  $scope.leads_time = response.data;
                  $scope.lastIndex = $scope.leads_time.data.length - 1;
                  $scope.leads_Data = response.data.data;
                });

              AuthService.getOrganisationsForAssignment()
                .then(function onSuccess(response) {
                  $scope.organisationList = response.data.data;
                })
                .catch(function onError(response) {
                  console.log(response);
                });

              releaseCampaignService
                .requirementDetail("", phone, supplier_id, supplierType)
                .then(function onSuccess(response) {
                  $scope.requirementDetailData =
                    response.data.data.requirements;
                  $scope.companiesDetailData = response.data.data.companies;
                  for (let k in $scope.companiesDetailData) {
                    $scope.companiesDetailData[k].id =
                      $scope.companiesDetailData[k].organisation_id;
                    $scope.companiesDetailData[k].label =
                      $scope.companiesDetailData[k].name;
                    $scope.companiesDetailData[k].sector =
                      $scope.companiesDetailData[k].business_type[0];
                    if (k == response.data.data.companies.length - 1) {
                      $scope.companiesDetailData.push({
                        id: "other",
                        label: "other",
                        organisation_id: "",
                        name: "other",
                      });
                    }
                  }
                  angular.forEach(
                    $scope.requirementDetailData,
                    function (value, i) {
                      if (
                        $scope.requirementDetailData[i].requirements.length > 0
                      ) {
                        for (let x in $scope.requirementDetailData[i].requirements) {
                          if (!$scope.requirementDetailData[i].requirements[x].current_company) {
                            $scope.requirementDetailData[i].requirements[x].current_company = "";
                          }
                          var selected_preferred_company_sub_sector = [];
                          $scope.requirementDetailData[i].requirements[x].selected_preferred_company_sub_sector = [];
                          if ($scope.requirementDetailData[i].requirements[x].preferred_company_other) {
                            $scope.otherPreferredCompany = true;
                            $scope.requirementDetailData[i].requirements[x].otherPreferredCompany = true;
                            $scope.requirementDetailData[i].requirements[x].preferred_company.push("");
                          }
                          if ($scope.requirementDetailData[i].requirements[x].preferred_company && $scope.requirementDetailData[i].requirements[x].preferred_company.length > 0) {
                            for (let y in $scope.requirementDetailData[i].requirements[x].preferred_company) {
                              var _index = $scope.companiesDetailData.map(function (el) {
                                return el.organisation_id;
                              })
                                .indexOf(
                                  $scope.requirementDetailData[i].requirements[
                                    x
                                  ].preferred_company[y]
                                );
                              if (_index != -1) {
                                selected_preferred_company_sub_sector.push(
                                  $scope.companiesDetailData[_index]
                                );
                              }
                            }

                            $scope.requirementDetailData[i].requirements[x].selected_preferred_company_sub_sector = selected_preferred_company_sub_sector;
                          }

                          var _indexCompany = $scope.companiesDetailData
                            .map(function (el) {
                              return el.organisation_id;
                            })
                            .indexOf(
                              $scope.requirementDetailData[i].requirements[x].company);
                          if (_indexCompany != -1) {
                            $scope.requirementDetailData[i].requirements[x].company_name =
                              $scope.companiesDetailData[_indexCompany].name;
                          }

                          $scope.requirementDetailData[i].requirements[x].color_class = "yellow";
                          if ($scope.requirementDetailData[i].requirements[x].varified_ops == "yes") {
                            $scope.requirementDetailData[i].requirements[x].color_class = "green";
                          }
                          if ($scope.requirementDetailData[i].requirements[x].is_deleted == "yes") {
                            $scope.requirementDetailData[i].requirements[x].color_class = "red";
                          }

                          //start sub sector name
                          if ($scope.requirementDetailData[i].requirements[x].sub_sector) {
                            if ($scope.sectorList) {
                              for (let p in $scope.sectorList) {
                                if (
                                  $scope.sectorList[p].subtypes &&
                                  $scope.sectorList[p].subtypes.length > 0
                                ) {
                                  var sub_index = $scope.sectorList[p].subtypes
                                    .map(function (el) {
                                      return el.id;
                                    })
                                    .indexOf(
                                      $scope.requirementDetailData[i].requirements[x].sub_sector
                                    );
                                  if (sub_index != -1) {
                                    $scope.requirementDetailData[i].requirements[x].sub_sector_name =
                                      $scope.sectorList[p].subtypes[sub_index].business_sub_type;
                                  }
                                }
                              }
                              //end sub sector name
                            }
                          }
                        }
                      }
                      if ($scope.sectorList) {
                        var localindex_indexs = $scope.sectorList
                          .map(function (el) {
                            return el.id;
                          })
                          .indexOf($scope.requirementDetailData[i].sector);
                        if (localindex_indexs != -1) {
                          $scope.requirementDetailData[i].sector_name =
                            $scope.sectorList[localindex_indexs].business_type;
                        }
                      }
                    }
                  );
                });
              $scope.getRequirementBrowsedData("", phone, supplier_id);
              $scope.opsVerifiedValidation.phoneNumber = phone;
            } else return 0;
          };

          $scope.getRequirementBrowsedData = function (id, phone, supplierId) {
            $scope.phoneNumber = phone;
            $scope.supplierId = supplierId;
            releaseCampaignService
              .requirementBrowsedData(id, phone, supplierId)
              .then(function onSuccess(response) {
                $scope.browsedDetailData = response.data.data.browsed;
                $scope.companiesDetailDataBrowsed = response.data.data.companies;
                $scope.browsedSectorList = response.data.data.sector;

                for (let k in $scope.companiesDetailDataBrowsed) {
                  $scope.companiesDetailDataBrowsed[k].id = $scope.companiesDetailDataBrowsed[k].organisation_id;
                  $scope.companiesDetailDataBrowsed[k].label = $scope.companiesDetailDataBrowsed[k].name;
                  $scope.companiesDetailDataBrowsed[k].sector = $scope.companiesDetailDataBrowsed[k].business_type[0];
                  if (k == response.data.data.companies.length - 1) {
                    $scope.companiesDetailDataBrowsed.push({
                      id: "other",
                      label: "other",
                      organisation_id: "",
                      name: "other",
                    });
                  }
                }

                for (let i in $scope.browsedDetailData) {
                  $scope.browsedDetailData[i].created_at = moment(
                    $scope.browsedDetailData[i].created_at
                  ).toISOString();
                  if (!$scope.browsedDetailData[i].current_patner_id) {
                    $scope.browsedDetailData[i].current_patner_id = "";
                  }
                  var selected_preferred_company = [];
                  $scope.browsedDetailData[i].selected_preferred_company = [];
                  if ($scope.browsedDetailData[i].prefered_patner_other) {
                    $scope.browsedDetailData[i].otherPreferredCompanyBrowsed = true;
                    $scope.browsedDetailData[i].prefered_patners.push("");
                  }
                  if ($scope.browsedDetailData[i].prefered_patners && $scope.browsedDetailData[i].prefered_patners.length > 0) {
                    for (let j in $scope.browsedDetailData[i].prefered_patners) {
                      var localindex_index = $scope.companiesDetailDataBrowsed.map(function (el) {
                        return el.organisation_id;
                      }).indexOf($scope.browsedDetailData[i].prefered_patners[j]);
                      if (localindex_index != -1) {
                        selected_preferred_company.push(
                          $scope.companiesDetailDataBrowsed[localindex_index]
                        );
                      }
                    }
                    $scope.browsedDetailData[i].selected_preferred_company = selected_preferred_company;
                  }
                  if ($scope.sectorList) {
                    var localindex_indexs = $scope.sectorList
                      .map(function (el) {
                        return el.id;
                      })
                      .indexOf($scope.browsedDetailData[i].sector_id);
                    if (localindex_indexs != -1) {
                      $scope.browsedDetailData[i].sector_name =
                        $scope.sectorList[localindex_indexs].business_type;
                    }
                  }
                  //end added sector name

                  if ($scope.browsedDetailData[i].sub_sector_id) {
                    if ($scope.sectorList) {
                      for (let p in $scope.sectorList) {
                        if (
                          $scope.sectorList[p].subtypes &&
                          $scope.sectorList[p].subtypes.length > 0
                        ) {
                          var sub_index = $scope.sectorList[p].subtypes
                            .map(function (el) {
                              return el.id;
                            })
                            .indexOf(
                              JSON.parse(
                                $scope.browsedDetailData[i].sub_sector_id
                              )
                            );
                          if (sub_index != -1) {
                            $scope.browsedDetailData[i].sub_sector_name =
                              $scope.sectorList[p].subtypes[
                                sub_index
                              ].business_sub_type;
                          }
                        }
                      }
                      //end sub sector name
                    }
                  }
                }
              })
              .catch(function onError(response) {
                console.log(response);
              });
          };

          $scope.getSupplierDataByNumber = function (number, society) {
            if (!number && !society) {
              $scope.NewsupplierAddUpdateData = {};
              $scope.newSupplierPocModel = [];
              $scope.Supplier_id = "";
              $scope.societyNameList = [];
              $scope.newSelectedArea = [];
              $scope.Areas = "";
              $scope.societyImages = [];
              return 0;
            }
            AuthService.getSupplierDataByNumber(number, society)
              .then(function onSuccess(response) {
                $scope.societyNameList = response.data.data;
                if ($scope.societyNameList.length == 1) {
                  $scope.getSupplierDataBySociety(
                    $scope.societyNameList[0].supplier_id
                  );
                  $scope.Supplier_id = $scope.societyNameList[0].supplier_id;
                }
              })
              .catch(function onError(response) {
                console.log(response);
              });
          };

          $scope.ShowDetailed = function (index, sector) {
            $scope.companyData(sector);
            $scope.sector_name = $scope.sectorName(sector);
            $scope.selectLeadData($scope.sector_name.toLowerCase());
            $scope.oldIndex = index;
            $scope.$watch("oldIndex", function (newValue, oldValue) {
              if (newValue != oldValue) {
                $scope.detailedShow[oldValue] = false;
              }
            });
            $scope.detailedShow[index] = !$scope.detailedShow[index];
            $scope.opsVerifyButtonDiable = true;
            $scope.removeSubSectorDiable = true;
            $scope.updateDisable = false;
            for (let i in $scope.requirementDetailData[index].requirements) {
              $scope.requirementDetailData[index].requirements[i].requirementCheck = false;
              if (
                $scope.opsVerifyButtonDiable &&
                $scope.requirementDetailData[index].requirements[i]
                  .varified_ops == "no"
              ) {
                $scope.opsVerifyButtonDiable = false;
              }
              if (
                $scope.removeSubSectorDiable &&
                $scope.requirementDetailData[index].requirements[i]
                  .is_deleted == "no"
              ) {
                $scope.removeSubSectorDiable = false;
              }

              if (
                !$scope.updateDisable &&
                $scope.requirementDetailData[index].requirements[i]
                  .is_deleted == "yes"
              ) {
                $scope.updateDisable = true;
              }
            }
          };
          $scope.checkBoxAutoCheck = function (key, index) {
            $scope.requirementDetailData[key].requirements[
              index
            ].requirementCheck = true;
            $scope.checkbooxCheck(key);
          };
          $scope.checkbooxCheck = function (key) {
            $scope.subSectorCheck = true;
            var requirementsData =
              $scope.requirementDetailData[key].requirements;
            for (let x in requirementsData) {
              if (
                requirementsData[x].requirementCheck &&
                $scope.subSectorCheck
              ) {
                $scope.subSectorCheck = false;
              }
            }
          };
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
          };
          $scope.sectorName = function (sectorName) {
            for (i in $scope.sectorList) {
              if ($scope.sectorList[i].id == sectorName) {
                let sector = $scope.sectorList[i].business_type;
                return sector;
              }
            }
          };

          $scope.selectLeadData = function (data) {
            for (let i in $scope.leads_Data) {
              for (let j in $scope.leads_Data[i]) {
                if (data === j) {
                  $scope.leads_Data_1 = $scope.leads_Data[i][data];
                  break;
                }
              }
            }
          };

          $scope.viewCommentsLeadDetails = function (Id, check) {
            $scope.req_id = Id;
            $scope.check = check;
            $("#viewCommentsLeadDetails").modal("show");
            if (check == "external") {
              releaseCampaignService
                .viewCommentsDetails(Id)
                .then(function onSuccess(response) {
                  $scope.externalComment = response.data.data;
                });
            } else {
              releaseCampaignService
                .viewInternalsComments(Id)
                .then(function onSuccess(response) {
                  $scope.externalComment = response.data.data;
                });
            }
          };

          $scope.commentValueDetails = function (comment) {
            if ($scope.check == "external") {
              releaseCampaignService
                .basicClientComment(comment.comment, $scope.req_id)
                .then(function onSuccess(response) {
                  swal("DONE", constants.commentAdd, constants.success);
                  $scope.mymodel["comment"] = "";
                  $scope.viewCommentsLeadDetails($scope.req_id, $scope.check);
                });
            } else {
              releaseCampaignService
                .internalCommentValue(comment.comment, $scope.req_id)
                .then(function onSuccess(response) {
                  swal("DONE", constants.commentAdd, constants.success);
                  $scope.mymodel["comment"] = "";
                  $scope.viewCommentsLeadDetails($scope.req_id, $scope.check);
                });
            }
          };
          $scope.deleteBasicComment = function (comment_id) {
            if ($scope.check == "external") {
              releaseCampaignService
                .deleteBasicComment(comment_id, $scope.req_id)
                .then(function onSuccess(response) {
                  swal("", response.data.data, "success");
                  releaseCampaignService
                    .viewCommentsDetails($scope.req_id, $scope.check)
                    .then(function onSuccess(response) {
                      $scope.externalComment = response.data.data;
                    });
                });
            } else {
              releaseCampaignService
                .deleteInternalComment(comment_id, $scope.req_id)
                .then(function onSuccess(response) {
                  swal("", response.data.data, "success");
                  releaseCampaignService
                    .viewInternalsComments($scope.req_id, $scope.check)
                    .then(function onSuccess(response) {
                      $scope.externalComment = response.data.data;
                    });
                });
            }
          };
          $scope.getSourceDataList = function (organisation_id) {
            // let organisation = JSON.parse(localStorage["userInfo"]);
            AuthService.getUserMinimalList(organisation_id)
              .then(function onSuccess(response) {
                $scope.userMinimalList = response.data.data;
              })
              .catch(function onError(response) {
                console.log(response);
              });
          };

          $scope.updateSubSectorRow = function (data) {
            let updateData = [];
            if (data.current_company == "") {
              data.current_company = null;
            } else {
              data.current_company_other = "";
            }
            if (data.preferred_company.length > 0) {
              $scope.checkIsPreferredCompanyOther = true;
              for (let j in data.preferred_company) {
                if (data.preferred_company[j] == "other") {
                  $scope.checkIsPreferredCompanyOther = false;
                  data.preferred_company.splice(j, 1);
                }
              }
              if ($scope.checkIsPreferredCompanyOther) {
                data.preferred_company_other = "";
              }
            }
            updateData.push(data);
            if (updateData.length > 0) {
              var requirementData = {
                requirements: updateData,
              };
              releaseCampaignService
                .updateRequirement(requirementData)
                .then(function onSuccess(response) {
                  if (response && response.data.data.error) {
                    swal(
                      constants.name,
                      response.data.data.error,
                      constants.error
                    );
                  } else {
                    let responseData = response.data.data;
                    angular.forEach(
                      $scope.requirementDetailData,
                      function (value, key) {
                        var localindex_index = $scope.requirementDetailData[key].requirements
                          .map(function (el) {
                            return el.id;
                          })
                          .indexOf(data.id);
                        if (localindex_index != -1) {
                          if (responseData && responseData.length > 0) {
                            for (let i in responseData) {
                              if (responseData[i].id == data.id) {
                                $scope.requirementDetailData[key].requirements[localindex_index].lead_status = responseData[i].lead_status;
                              }
                            }
                          }
                        }
                      }
                    );
                    swal(
                      constants.name,
                      constants.update_success,
                      constants.success
                    );
                  }
                })
                .catch(function onError(response) {
                  if (response.data.status == false) {
                    if (
                      response.data.data &&
                      response.data.data.general_error &&
                      response.data.data.general_error.errors &&
                      response.data.data.general_error.errors
                        .call_back_preference
                    ) {
                      swal(
                        constants.name,
                        response.data.data.general_error.errors
                          .call_back_preference[0],
                        constants.error
                      );
                    }
                    if (
                      response.data.data &&
                      response.data.data.general_error &&
                      response.data.data.general_error.errors &&
                      response.data.data.general_error.errors.preferred_company
                    ) {
                      swal(
                        constants.name,
                        response.data.data.general_error.errors
                          .preferred_company[0],
                        constants.error
                      );
                    }
                  }
                });
            }
            if (data.current_company == null && data.current_company_other != "") {
              data.current_company = "";
            }
          };
          $scope.singleRestoreSubSector = function (id, key, index) {
            let restoreSubSectorId = [];
            restoreSubSectorId.push(id);
            if (restoreSubSectorId.length > 0) {
              swal(
                {
                  title: "Are you sure ?",
                  text: "Restore Requirement",
                  type: constants.warning,
                  showCancelButton: true,
                  confirmButtonClass: "btn-success",
                  confirmButtonText: "Yes, Restore!",
                  closeOnConfirm: false,
                  closeOnCancel: true,
                },
                function (confirm) {
                  if (confirm) {
                    let restoreId = {
                      requirement_ids: restoreSubSectorId,
                    };
                    releaseCampaignService
                      .restoreSubmittedLeads(restoreId)
                      .then(function onSuccess(response) {
                        if (response && response.data.data.error) {
                          swal(
                            constants.name,
                            response.data.data.error,
                            constants.error
                          );
                        } else {
                          if (
                            response &&
                            response.data &&
                            response.data.data &&
                            response.data.data.list_color_code != "null"
                          ) {
                            let color_class = "";
                            if (response.data.data.list_color_code == 1) {
                              color_class = "yellow";
                            } else if (
                              response.data.data.list_color_code == 2
                            ) {
                              color_class = "#7C4700";
                            } else if (
                              response.data.data.list_color_code == 3
                            ) {
                              color_class = "green";
                            } else if (
                              response.data.data.list_color_code == 4
                            ) {
                              color_class = "white";
                            } else if (
                              response.data.data.list_color_code == 5
                            ) {
                              color_class = "red";
                            }
                          }
                          swal(
                            constants.name,
                            "Recovered Successfully",
                            constants.success
                          );
                        }
                      })
                      .catch(function onError(response) {
                        console.log(response);
                      });
                    $scope.$apply(function () {
                      $scope.requirementDetailData[key].requirements[index].is_deleted = "no";
                      if ($scope.requirementDetailData[key].requirements[index].varified_ops == "yes") {
                        $scope.requirementDetailData[key].requirements[index].color_class = "green";
                      }
                      else {
                        $scope.requirementDetailData[key].requirements[index].color_class = "yellow";
                      }
                    });
                  }
                }
              );
            }
          };
          $scope.singleOpsVerifyRequirement = function (id) {
            let verifyId = [];
            verifyId.push(id);
            if (verifyId.length > 0) {
              $scope.verifyRequirement(verifyId);
            }
          };

          $scope.verifyRequirement = function (verifyId) {
            swal(
              {
                title: "Are you sure ?",
                text: "Do you want to proceed with sector level verification?",
                type: constants.warning,
                showCancelButton: true,
                confirmButtonClass: "btn-success",
                confirmButtonText: "Yes, Verify!",
                closeOnConfirm: false,
                closeOnCancel: true,
              },
              function (confirm) {
                if (confirm) {
                  $(".confirm").attr("disabled", "disabled");

                  releaseCampaignService
                    .opsVerifyRequirement({ requirement_ids: verifyId })
                    .then(function onSuccess(response) {
                      if (response && response.data.data.error) {
                        swal(
                          constants.name,
                          response.data.data.error,
                          constants.error
                        );
                      } else {
                        swal(
                          constants.name,
                          response.data.data.message,
                          constants.success
                        );
                        for (let i in verifyId) {
                          angular.forEach(
                            $scope.requirementDetailData,
                            function (value, key) {
                              var localindex_index =
                                $scope.requirementDetailData[key].requirements
                                  .map(function (el) {
                                    return el.id;
                                  })
                                  .indexOf(verifyId[i]);
                              if (localindex_index != -1) {
                                $scope.requirementDetailData[key].requirements[
                                  localindex_index
                                ].varified_ops = "yes";
                                if (
                                  $scope.requirementDetailData[key]
                                    .requirements[localindex_index]
                                    .is_deleted == "no"
                                ) {
                                  $scope.requirementDetailData[
                                    key
                                  ].requirements[localindex_index].color_class =
                                    "green";
                                }
                                $scope.requirementDetailData[key].requirements[
                                  localindex_index
                                ].requirementCheck = false;
                                $scope.requirementDetailData[key].requirements[
                                  localindex_index
                                ].varified_ops_date = new Date();
                                $scope.requirementDetailData[key].requirements[
                                  localindex_index
                                ].verified_ops_by_obj = {
                                  first_name:
                                    response.data.data.verified_ops_by,
                                };
                              }
                              var chechIfVerify = false;
                              for (let j in $scope.requirementDetailData[key]
                                .requirements) {
                                if (
                                  $scope.requirementDetailData[key]
                                    .requirements[j].varified_ops == "no" &&
                                  !chechIfVerify
                                ) {
                                  chechIfVerify = true;
                                }
                              }
                              if (chechIfVerify) {
                                $scope.opsVerifyButtonDiable = false;
                              } else {
                                $scope.opsVerifyButtonDiable = true;
                              }
                            }
                          );
                        }
                        if (
                          response &&
                          response.data &&
                          response.data.data &&
                          response.data.data.list_color_code != "null"
                        ) {
                          let color_class = "";
                          if (response.data.data.list_color_code == 1) {
                            color_class = "yellow";
                          } else if (response.data.data.list_color_code == 2) {
                            color_class = "#7C4700";
                          } else if (response.data.data.list_color_code == 3) {
                            color_class = "green";
                          } else if (response.data.data.list_color_code == 4) {
                            color_class = "white";
                          } else if (response.data.data.list_color_code == 5) {
                            color_class = "red";
                          }
                        }
                        $scope.subSectorCheck = true;
                      }
                    })
                    .catch(function onError(response) {
                      if (
                        response &&
                        response.data &&
                        response.data.data &&
                        response.data.data.general_error &&
                        response.data.data.general_error.error
                      ) {
                        swal(
                          constants.name,
                          response.data.data.general_error.error,
                          constants.error
                        );
                      } else if (response.statusText) {
                        swal(
                          constants.name,
                          response.statusText,
                          constants.error
                        );
                      }
                    });
                }
              }
            );
          };

          $scope.subSectorPreferredMulticheck = function (key, index) {
            if (
              $scope.requirementDetailData[key] &&
              $scope.requirementDetailData[key].requirements[index] &&
              $scope.requirementDetailData[key].requirements[index]
                .selected_preferred_company_sub_sector &&
              $scope.requirementDetailData[key].requirements[index]
                .selected_preferred_company_sub_sector.length > 0
            ) {
              $scope.requirementDetailData[key].requirements[
                index
              ].preferred_company = [];
              $scope.otherPreferredCompany = false;
              for (let i in $scope.requirementDetailData[key].requirements[
                index
              ].selected_preferred_company_sub_sector) {
                $scope.requirementDetailData[key].requirements[
                  index
                ].otherPreferredCompany = false;
                if (
                  $scope.requirementDetailData[key].requirements[index]
                    .selected_preferred_company_sub_sector[i].id == "other"
                ) {
                  $scope.otherPreferredCompany = true;
                  $scope.requirementDetailData[key].requirements[
                    index
                  ].otherPreferredCompany = true;
                }
                $scope.requirementDetailData[key].requirements[
                  index
                ].preferred_company.push(
                  $scope.requirementDetailData[key].requirements[index]
                    .selected_preferred_company_sub_sector[i].id
                );
              }
            }
            if (
              $scope.requirementDetailData[key] &&
              $scope.requirementDetailData[key].requirements[index] &&
              $scope.requirementDetailData[key].requirements[index]
                .selected_preferred_company_sub_sector &&
              $scope.requirementDetailData[key].requirements[index]
                .selected_preferred_company_sub_sector.length == 0
            ) {
              $scope.requirementDetailData[key].requirements[
                index
              ].preferred_company = [];
              $scope.requirementDetailData[key].requirements[
                index
              ].otherPreferredCompany = false;
            }
          };

          $scope.NewbrowsedPreferredPartner = function (data) {
            $scope.newRequirement = {};
            $scope.requirementCompany = [];
            $scope.newRequirement.sector_id = data.id;
            $scope.browsedPreferredPartner(data)
          }

          $scope.SubmittedaddBrowsedRow = function () {
            if ($scope.NewcountBrowsedRow == false) {
              $scope.NewcountBrowsedRow = true;
              $scope.NewaddRemoveBtn = "Remove row";
            } else {
              $scope.NewcountBrowsedRow = false;
              $scope.new_data_check = false;
              $scope.NewaddRemoveBtn = "Add row";
            }
          };
          $scope.addBrowsedRow = function () {
            if ($scope.countBrowsedRow == false) {
              $scope.countBrowsedRow = true;
              $scope.addRemoveBtn = "Remove row";
            }
            else {
              $scope.countBrowsedRow = false;
              $scope.new_data_check = false;
              $scope.addRemoveBtn = "Add row";
            }
          }
          $scope.singleRemoveSubSector = function (id, key, index) {
            let deleteSubSectorId = [];
            deleteSubSectorId.push(id);
            if (deleteSubSectorId.length > 0) {
              swal(
                {
                  title: "Are you sure ?",
                  text: "Remove Requirement",
                  type: constants.warning,
                  showCancelButton: true,
                  confirmButtonClass: "btn-success",
                  confirmButtonText: "Yes, Remove!",
                  closeOnConfirm: false,
                  closeOnCancel: true,
                },
                function (confirm) {
                  if (confirm) {
                    let deleteId = {
                      requirement_ids: deleteSubSectorId,
                    };
                    releaseCampaignService
                      .deleteSubmittedLeads(deleteId)
                      .then(function onSuccess(response) {
                        if (response && response.data.data.error) {
                          swal(
                            constants.name,
                            response.data.data.error,
                            constants.error
                          );
                        } else {
                          if (
                            response &&
                            response.data &&
                            response.data.data &&
                            response.data.data.list_color_code != "null"
                          ) {
                            let color_class = "";
                            if (response.data.data.list_color_code == 1) {
                              color_class = "yellow";
                            } else if (
                              response.data.data.list_color_code == 2
                            ) {
                              color_class = "#7C4700";
                            } else if (
                              response.data.data.list_color_code == 3
                            ) {
                              color_class = "green";
                            } else if (
                              response.data.data.list_color_code == 4
                            ) {
                              color_class = "white";
                            } else if (
                              response.data.data.list_color_code == 5
                            ) {
                              color_class = "red";
                            }
                          }
                          swal(
                            constants.name,
                            constants.delete_success,
                            constants.success
                          );
                        }
                      })
                      .catch(function onError(response) {
                        console.log(response);
                      });
                    $scope.$apply(function () {
                      $scope.requirementDetailData[key].requirements[
                        index
                      ].is_deleted = "yes";
                      $scope.requirementDetailData[key].requirements[
                        index
                      ].color_class = "red";
                    });
                  }
                }
              );
            }
          };

          $scope.filterBrowsedLeadData = function (sectorName) {
            for (i in $scope.sectorList) {
              if ($scope.sectorList[i].id == sectorName) {
                let sector = $scope.sectorList[i].business_type;
                $scope.sectorBrowseLead(sector.toLowerCase(), sectorName);
                return sector;
              }
            }
          };
          $scope.sectorBrowseLead = function (name, id) {
            for (let i in $scope.leads_Data) {
              for (let j in $scope.leads_Data[i]) {
                if (name === j) {
                  $scope.leads_Data_browsed = $scope.leads_Data[i][name];
                  $scope.filterLeadData[id] = $scope.leads_Data_browsed;
                  break;
                }
              }
            }
          };
          $scope.newCheckboxSubmitted = function (check) {
            $scope.newRequirementCheckbox = check;
          };
          $scope.newLeadCreated = function (data) {
            let browsed_ids = [];
            let obj = [];
            for (let i in $scope.requirementCompany) {
              obj.push($scope.requirementCompany[i].organisation_id);
            }
            data.prefered_patners = obj;
            data.prefered_patner_other = "";
            // data.current_patner_other = "";
            data.phone_number = $scope.phoneNumber;
            data.supplier_id = $scope.supplierId;
            data.sub_sector_id = null;
            data.call_back_preference = "";
            data.current_patner_feedback = "";
            data.current_patner_feedback_reason = "";
            data.campaign_id = "";
            data.status = "";
            data.supplier_type = $scope.userChatPayload.type_of_entity;
            data.shortlisted_spaces_id = null;
            browsed_ids.push(data);
            let newObj = {};
            newObj.browsed_ids = browsed_ids;
            releaseCampaignService
              .newLeadCreated(newObj)
              .then(function onSuccess(response) {
                $scope.newRequirement = {};
                $scope.requirementCompany = [];
                $scope.newRequirementCheckbox = false;
                if (response && response.data.data.error) {
                  swal(
                    constants.name,
                    response.data.data.error,
                    constants.error
                  );
                } else {
                  $scope.opsVerifiedValidation.phoneNumber = "";
                  $scope.opsVerified(
                    $scope.phoneNumber,
                    $scope.supplierId,
                    $scope.userChatPayload.type_of_entity
                  );
                  $scope.newRequirement = {};
                  $scope.NewcountBrowsedRow = false;
                  $scope.NewaddRemoveBtn = "Add row";
                  swal(
                    constants.name,
                    response.data.data.message,
                    constants.success
                  );
                }
              })
              .catch(function onError(response) {
                console.log(response);
              });
          };

          $scope.removeSubSectorRequirement = function (data, key) {
            let deleteSubSectorId = [];
            for (let i in $scope.requirementDetailData[key].requirements) {
              if ($scope.requirementDetailData[key].requirements[i].requirementCheck == true && $scope.requirementDetailData[key].requirements[i].is_deleted == "no") {
                deleteSubSectorId.push($scope.requirementDetailData[key].requirements[i].id);
              }
            }
            console.log(deleteSubSectorId, "weqkjhdfg")
            if (deleteSubSectorId.length > 0) {
              swal(
                {
                  title: "Are you sure ?",
                  text: "Remove Requirement",
                  type: constants.warning,
                  showCancelButton: true,
                  confirmButtonClass: "btn-success",
                  confirmButtonText: "Yes, Remove!",
                  closeOnConfirm: false,
                  closeOnCancel: true,
                },
                function (confirm) {
                  if (confirm) {
                    let deleteId = {
                      requirement_ids: deleteSubSectorId,
                    };
                    releaseCampaignService
                      .deleteSubmittedLeads(deleteId)
                      .then(function onSuccess(response) {
                        if (response && response.data.data.error) {
                          swal(
                            constants.name,
                            response.data.data.error,
                            constants.error
                          );
                        }
                        else {
                          if (
                            response &&
                            response.data &&
                            response.data.data &&
                            response.data.data.list_color_code != "null"
                          ) {
                            let color_class = "";
                            if (response.data.data.list_color_code == 1) {
                              color_class = "yellow";
                            } else if (
                              response.data.data.list_color_code == 2
                            ) {
                              color_class = "#7C4700";
                            } else if (
                              response.data.data.list_color_code == 3
                            ) {
                              color_class = "green";
                            } else if (
                              response.data.data.list_color_code == 4
                            ) {
                              color_class = "white";
                            } else if (
                              response.data.data.list_color_code == 5
                            ) {
                              color_class = "red";
                            }
                          }
                          swal(
                            constants.name,
                            constants.delete_success,
                            constants.success
                          );
                        }
                      })
                      .catch(function onError(response) {
                        console.log(response);
                      });
                    $scope.$apply(function () {
                      for (let x in deleteSubSectorId) {
                        var localindex_index = $scope.requirementDetailData[
                          key
                        ].requirements
                          .map(function (el) {
                            return el.id;
                          })
                          .indexOf(deleteSubSectorId[x]);
                        if (localindex_index != -1) {
                          $scope.requirementDetailData[key].requirements[
                            localindex_index
                          ].is_deleted = "yes";
                          $scope.requirementDetailData[key].requirements[
                            localindex_index
                          ].color_class = "red";
                        }
                      }
                    });
                  }
                }
              );
            }
          };
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
          $scope.companyBrowseData = function (id) {
            while ($scope.companiesBrowseDetailDataArray.length) {
              $scope.companiesBrowseDetailDataArray.pop();
            }
            var i = 0;
            for (let k in $scope.companiesDetailDataBrowsed) {
              if ($scope.companiesDetailDataBrowsed[k].business_type !== undefined) {
                if (id == $scope.companiesDetailDataBrowsed[k].business_type[0]) {
                  $scope.companiesBrowseDetailDataArray[i] = $scope.companiesDetailDataBrowsed[k];
                  $scope.companiesBrowseDetailDataArray[i].id = $scope.companiesDetailDataBrowsed[k].organisation_id;
                  $scope.companiesBrowseDetailDataArray[i].label = $scope.companiesDetailDataBrowsed[k].name;
                  $scope.companiesBrowseDetailDataArray[i].sector = $scope.companiesDetailDataBrowsed[k].business_type[0];
                  i++;
                }
              }
            }
            $scope.companiesBrowseDetailDataArrayCompany[id] = $scope.companiesBrowseDetailDataArray;
          }


          $scope.checkboxBrowesLeadCheck = function () {
            $scope.browsedCheck = true;
            for (let x in $scope.browsedDetailData) {
              if ($scope.browsedDetailData[x].browsedCheck && $scope.browsedCheck) {
                $scope.browsedCheck = false
              }
            }
            if ($scope.newbrowsed.newBrowsedCheck) {
              $scope.browsedCheck = false;
            }
          }

          $scope.updateBrowsed = function (new_data) {
            let browsedData = [];
            for (let i in $scope.browsedDetailData) {
              if ($scope.browsedDetailData[i].browsedCheck) {
                let preferred_company_other = null;
                if ($scope.browsedDetailData[i].selected_preferred_company && $scope.browsedDetailData[i].selected_preferred_company.length > 0) {
                  $scope.browsedDetailData[i].prefered_patners = [];
                  for (let j in $scope.browsedDetailData[i].selected_preferred_company) {
                    if ($scope.browsedDetailData[i].selected_preferred_company[j].id == 'other') {
                      preferred_company_other = $scope.browsedDetailData[i].prefered_patner_other;
                    }
                    $scope.browsedDetailData[i].prefered_patners.push($scope.browsedDetailData[i].selected_preferred_company[j].id)
                  }
                }

                if ($scope.browsedDetailData[i].selected_preferred_company && $scope.browsedDetailData[i].selected_preferred_company.length == 0) {
                  $scope.browsedDetailData[i].prefered_patners = [];
                }
                let current_patner_id = $scope.browsedDetailData[i].current_patner_id;
                let current_patner_other = $scope.browsedDetailData[i].current_patner_other;
                if ($scope.browsedDetailData[i].current_patner_id == "" && $scope.browsedDetailData[i].current_patner_other) {
                  current_patner_id = null;
                } else {
                  current_patner_other = null;
                }
                browsedData.push({
                  'sector_id': $scope.browsedDetailData[i].sector_id,
                  'sub_sector_id': null,
                  '_id': $scope.browsedDetailData[i]._id,
                  'comment': $scope.browsedDetailData[i].comment,
                  // 'meating_timeline': $scope.browsedDetailData[i].meating_timeline,
                  // 'implementation_timeline': $scope.browsedDetailData[i].implementation_timeline,
                  'current_patner_id': current_patner_id,
                  'prefered_patners_id': $scope.browsedDetailData[i].prefered_patners,
                  'current_company_other': current_patner_other,
                  'preferred_company_other': preferred_company_other,
                  'supplier_type': $scope.userChatPayload.type_of_entity,
                  'L4': $scope.browsedDetailData[i].l1_answers,
                  'L5': $scope.browsedDetailData[i].l1_answer_2,
                  'L6': $scope.browsedDetailData[i].l2_answers,
                });
              }
            }
            if ($scope.new_data_check == true) {
              let prefered_patners = [];
              for (let i in $scope.SelectedCompany) {
                prefered_patners.push($scope.SelectedCompany[i].organisation_id)
              }
              new_data.prefered_patners_id = prefered_patners;
              new_data._id = null;
              new_data.sub_sector_id = null;
              new_data.current_company_other = "";
              new_data.preferred_company_other = "";
              new_data.phone_number = $scope.phoneNumber;
              new_data.supplier_id = $scope.supplierId;
              new_data.supplier_type = $scope.userChatPayload.type_of_entity;
              new_data.sector_id = $scope.selected_sectorId;
              browsedData.push(new_data);
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
                        $scope.browsedCheck = true;
                        if (response && response.data.data.error) {
                          swal(constants.name, response.data.data.error, constants.error);
                        }
                        else {
                          swal(constants.name, constants.save_success, constants.success);
                          if ($scope.new_data_check == true) {
                            $scope.opsVerifiedValidation.phoneNumber = "";
                            $scope.opsVerified($scope.phoneNumber, $scope.supplierId, $scope.userChatPayload.type_of_entity);
                            $scope.SelectedCompany = [];
                            $scope.countBrowsedRow = false;
                            $scope.addRemoveBtn = "Add row"
                            $scope.new_data_check = false;
                            $scope.newbrowsed.newBrowsedCheck = false;
                            JSON.stringify($scope.newbrowsed) === '{}';
                          }
                          else {
                            $scope.getRequirementBrowsedData("", $scope.phoneNumber, $scope.supplierId);
                          }
                        }
                      }).catch(function onError(response) {
                        if (response.data.data && response.data.data.general_error) {
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
                browsedData.push({ "_id": $scope.browsedDetailData[i]._id, "shortlisted_spaces_id": $scope.shortlisted_spaces_id });
              }
            }
            if (browsedData.length > 0) {
              var browsedId = { "browsed": browsedData }
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
                          // if (response && response.data && response.data.data && response.data.data.list_color_code != 'null') {
                          //   let color_class = '';
                          //   if (response.data.data.list_color_code == 1) {
                          //     color_class = 'yellow';;
                          //   }
                          //   else if (response.data.data.list_color_code == 2) {
                          //     color_class = '#7C4700';
                          //   }
                          //   else if (response.data.data.list_color_code == 3) {
                          //     color_class = 'green';
                          //   }
                          //   else if (response.data.data.list_color_code == 4) {
                          //     color_class = 'white';
                          //   }
                          //   else if (response.data.data.list_color_code == 5) {
                          //     color_class = 'red';
                          //   }
                          //   var localindex_index = $scope.releaseDetails.shortlisted_suppliers.map(function (el) {
                          //     return el.id;
                          //   }).indexOf($scope.shortlisted_spaces_id);
                          //   if (localindex_index != -1) {
                          //     $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_code = response.data.data.list_color_code;
                          //     $scope.releaseDetails.shortlisted_suppliers[localindex_index].color_class = color_class;
                          //     //$scope.releaseDetails.shortlisted_suppliers.splice(localindex_index, 1);
                          //   }
                          // }
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
          $scope.saveBrowsed = function () {
            let browsedData = [];

            for (let i in $scope.browsedDetailData) {
              if ($scope.browsedDetailData[i].browsedCheck) {
                let preferred_company_other = null;
                if ($scope.browsedDetailData[i].selected_preferred_company && $scope.browsedDetailData[i].selected_preferred_company.length > 0) {
                  $scope.browsedDetailData[i].prefered_patners = [];
                  for (let j in $scope.browsedDetailData[i].selected_preferred_company) {
                    if ($scope.browsedDetailData[i].selected_preferred_company[j].id == 'other') {
                      preferred_company_other = $scope.browsedDetailData[i].prefered_patner_other;
                    }
                    $scope.browsedDetailData[i].prefered_patners.push($scope.browsedDetailData[i].selected_preferred_company[j].id)
                  }
                }

                if ($scope.browsedDetailData[i].selected_preferred_company && $scope.browsedDetailData[i].selected_preferred_company.length == 0) {
                  $scope.browsedDetailData[i].prefered_patners = [];
                }
                let current_patner_id = $scope.browsedDetailData[i].current_patner_id;
                let current_patner_other = $scope.browsedDetailData[i].current_patner_other;
                if ($scope.browsedDetailData[i].current_patner_id == "" && $scope.browsedDetailData[i].current_patner_other) {
                  current_patner_id = null;
                }
                else {
                  current_patner_other = null;
                }
                browsedData.push({
                  '_id': $scope.browsedDetailData[i]._id,
                  'comment': $scope.browsedDetailData[i].comment,
                  'meating_timeline': $scope.browsedDetailData[i].meating_timeline,
                  'implementation_timeline': $scope.browsedDetailData[i].implementation_timeline,
                  'current_patner_id': current_patner_id,
                  'prefered_patners_id': $scope.browsedDetailData[i].prefered_patners,
                  'current_company_other': current_patner_other,
                  'preferred_company_other': preferred_company_other,
                  'supplier_type': $scope.userChatPayload.type_of_entity,
                  "supplier_id": $scope.supplierId,
                  'L4': $scope.browsedDetailData[i].l1_answers,
                  'L5': $scope.browsedDetailData[i].l1_answer_2,
                  'L6': $scope.browsedDetailData[i].l2_answers,
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
                        $scope.browsedCheck = true;
                        if (response && response.data.data.error) {
                          swal(constants.name, response.data.data.error, constants.error);
                        }
                        else {
                          $scope.opsVerifiedValidation.phoneNumber = "";
                          $scope.opsVerified($scope.phoneNumber, $scope.supplierId, $scope.userChatPayload.type_of_entity);
                          swal(constants.name, response.data.data.message, constants.success);
                        }
                      }).catch(function onError(response) {

                        if (response.data.data && response.data.data.general_error) {
                          swal(constants.name, response.data.data.general_error.error, constants.error);
                        }
                      })
                  }
                });
            }
          }
          $scope.newCheckboxBrowesLeadCheck = function () {
            if ($scope.browsedDetailData.length < 1) {
              for (let x in $scope.browsedDetailData) {
                if ($scope.browsedDetailData[x].browsedCheck && $scope.browsedCheck) {
                  $scope.browsedCheck = false
                  break
                }
                else if ($scope.newbrowsed.newBrowsedCheck) {
                  $scope.browsedCheck = false
                }
              }
            }
            if ($scope.new_data_check == false) {
              $scope.new_data_check = true;
              $scope.browsedCheck = false;
            }
            else {
              $scope.new_data_check = false;
              for (let x in $scope.browsedDetailData) {
                if ($scope.browsedDetailData[x].browsedCheck && $scope.browsedCheck) {
                  $scope.browsedCheck = false
                  break
                }
                else {
                  $scope.browsedCheck = true;
                }
              }
            }
          }

          $scope.browsedPreferredPartner = function (data, check) {
            $scope.selected_sectorId = "";
            $scope.leads_Data_1 = "";
            if (check == true) {
              $scope.selected_sectorId = data;
            }
            else {
              $scope.selected_sectorId = data.id;
              $scope.selectLeadData(data.business_type.toLowerCase());
            }
            $scope.SelectedCompany = [];
            releaseCampaignService.browsedPreferredPartner($scope.selected_sectorId)
              .then(function onSuccess(response) {
                $scope.preferred_partnerList = response.data.data.companies;
                for (let j in $scope.preferred_partnerList) {
                  $scope.preferred_partnerList[j]['label'] = $scope.preferred_partnerList[j].name;
                }
                $scope.sub_sectorList = response.data.data.sub_sector;
              }).catch(function onError(response) {
                console.log(response);
              })
          }
          // End OPS Verified Modal

          // Suspense Sheet Modal Start
          $scope.companiessuspenseLeads = [];



          $scope.getLeadsTabSuspenseLeads = function (phone, page) {
            $scope.loading = null;
            if (!page) {
              page = 1;
              $scope.browsedSuspenseLeads(phone, "1");
            }
            $scope.leadTabData = [{}];
            $scope.currentPageLead = page;
            $scope.companiesData = [{}];
            AuthService.getLeasTabSuspenseLead(phone, page)
              .then(function onSuccess(response) {
                $scope.loading = response;
                $scope.leadTabData = response.data.data.suspense_lead.suspense_data;
                $scope.totalCountLead = response.data.data.suspense_lead.count;
                $scope.itemsPerPageLead = 10;
                $scope.currentPageLead = 0;
                $scope.companiesData = response.data.data.companies;

                if ($scope.leadTabData && $scope.leadTabData.length > 0) {
                  for (let i in $scope.leadTabData) {
                    var localTime = moment
                      .utc($scope.leadTabData[i].created_at)
                      .local();
                    $scope.leadTabData[i].created_at = localTime._d;
                    if (!$scope.leadTabData[i].current_patner) {
                      $scope.leadTabData[i].current_patner = "";
                    }
                    var selected_preferred_patner = [];
                    $scope.leadTabData[i].selected_preferred_patner = [];
                    if ($scope.leadTabData[i].prefered_patner_other) {
                      $scope.otherPreferredPatner = true;
                      $scope.leadTabData[i].otherPreferredPatner = true;
                      $scope.leadTabData[i].prefered_patners.push("");
                    }

                    if (
                      $scope.leadTabData[i].prefered_patners &&
                      $scope.leadTabData[i].prefered_patners.length > 0
                    ) {
                      for (let y in $scope.leadTabData[i].prefered_patners) {
                        var _index = $scope.companiesData
                          .map(function (el) {
                            return el.organisation_id;
                          })
                          .indexOf($scope.leadTabData[i].prefered_patners[y]);
                        if (_index != -1) {
                          selected_preferred_patner.push(
                            $scope.companiesData[_index]
                          );
                        }
                      }
                      $scope.leadTabData[i].selected_preferred_patner =
                        selected_preferred_patner;
                    }
                  }
                }
              })
              .catch(function onError(response) {
                console.log(response);
              });

            releaseCampaignService
              .selectLeads()
              .then(function onSuccess(response) {
                $scope.leads_Data = response.data.data;
              });
            userService.getSector().then(function onSuccess(response) {
              $scope.sectorList = response.data;
            });

            let organisation = JSON.parse(localStorage["userInfo"]);
            AuthService.getUserMinimalList(
              organisation.profile.organisation.organisation_id
            )
              .then(function onSuccess(response) {
                $scope.userMinimalList = response.data.data;
              })
              .catch(function onError(response) {
                console.log(response);
              });
          };

          $scope.browsedSuspenseLeads = function (phone, page) {
            if (!page) {
              page = 1;
            }
            $scope.currentPageBrowsed = page;
            $scope.leadTabDataBrowsed = [{}];
            AuthService.getBrowsedTabSuspenseLead(phone, page)
              .then(function onSuccess(response) {
                $scope.loading = response;
                $scope.leadTabDataBrowsed =
                  response.data.data.suspense_lead.suspense_data;
                $scope.companiesDataBrowsed = response.data.data.companies;
                for (let k in $scope.companiesDataBrowsed) {
                  $scope.companiesDataBrowsed[k].id =
                    $scope.companiesDataBrowsed[k].organisation_id;
                  $scope.companiesDataBrowsed[k].label =
                    $scope.companiesDataBrowsed[k].name;
                  if (k == response.data.data.companies.length - 1) {
                    $scope.companiesDataBrowsed.push({
                      id: "other",
                      label: "other",
                      organisation_id: "",
                      name: "other",
                    });
                  }
                }
                if (
                  $scope.leadTabDataBrowsed &&
                  $scope.leadTabDataBrowsed.length > 0
                ) {
                  for (let i in $scope.leadTabDataBrowsed) {
                    var localTime = moment
                      .utc($scope.leadTabDataBrowsed[i].created_at)
                      .local();
                    $scope.leadTabDataBrowsed[i].created_at = localTime._d;
                    if (!$scope.leadTabDataBrowsed[i].current_patner) {
                      $scope.leadTabDataBrowsed[i].current_patner = "";
                    }
                    var selected_preferred_patner = [];
                    $scope.leadTabDataBrowsed[i].selected_preferred_patner = [];
                    if ($scope.leadTabDataBrowsed[i].prefered_patner_other) {
                      $scope.otherPreferredPatner = true;
                      $scope.leadTabDataBrowsed[i].otherPreferredPatner = true;
                      $scope.leadTabDataBrowsed[i].prefered_patners.push("");
                    }

                    if (
                      $scope.leadTabDataBrowsed[i].prefered_patners &&
                      $scope.leadTabDataBrowsed[i].prefered_patners.length > 0
                    ) {
                      for (let y in $scope.leadTabDataBrowsed[i]
                        .prefered_patners) {
                        var _index = $scope.companiesDataBrowsed
                          .map(function (el) {
                            return el.organisation_id;
                          })
                          .indexOf(
                            $scope.leadTabDataBrowsed[i].prefered_patners[y]
                          );
                        if (_index != -1) {
                          selected_preferred_patner.push(
                            $scope.companiesDataBrowsed[_index]
                          );
                        }
                      }
                      $scope.leadTabDataBrowsed[i].selected_preferred_patner =
                        selected_preferred_patner;
                    }
                  }
                }
              })
              .catch(function onError(response) {
                console.log(response);
              });
          };

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

          $scope.suspenseLeadsPreferredPartner = function (id) {
            while ($scope.companiessuspenseLeads.length) {
              $scope.companiessuspenseLeads.pop();
            }
            var i = 0;
            for (let k in $scope.companiesData) {
              if ($scope.companiesData[k].business_type !== undefined) {
                if (id == $scope.companiesData[k].business_type[0]) {
                  $scope.companiessuspenseLeads[i] = $scope.companiesData[k];
                  $scope.companiessuspenseLeads[i].id = $scope.companiesData[k].organisation_id;
                  $scope.companiessuspenseLeads[i].label = $scope.companiesData[k].name;
                  $scope.companiessuspenseLeads[i].sector = $scope.companiesData[k].business_type[0];
                  i++;
                }
              }
            }
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
            let selected_preferred_patner = [];
            if ($scope.leadTabData[index].selected_preferred_patner) {
              for (let i in $scope.leadTabData[index].selected_preferred_patner) {
                selected_preferred_patner.push($scope.leadTabData[index].selected_preferred_patner[i].id)
              }
            }
            let data = [{
              "_id": $scope.leadTabData[index]._id,
              "implementation_timeline": $scope.leadTabData[index].implementation_timeline,
              "meating_timeline": $scope.leadTabData[index].meating_timeline,
              "comment": $scope.leadTabData[index].comment,
              "current_patner_id": $scope.leadTabData[index].current_patner,
              "current_patner_other": $scope.leadTabData[index].current_patner_other ? $scope.leadTabData[index].current_patner_other : null,
              // "prefered_patners_id": $scope.leadTabData[index].prefered_patners,
              "prefered_patners_id": selected_preferred_patner,
              "prefered_patner_other": otherPreferred,
              "call_back_preference": $scope.leadTabData[index].call_back_preference,
              "current_patner_feedback": $scope.leadTabData[index].current_patner_feedback,
              "current_patner_feedback_reason": $scope.leadTabData[index].current_patner_feedback_reason,
              "l3_answer_1": $scope.leadTabData[index].l3_answer_1,
              "internal_comment": $scope.leadTabData[index].internal_comment,
              "L4": $scope.leadTabData[index].L4,
              "L5": $scope.leadTabData[index].L5,
              "L6": $scope.leadTabData[index].L6,
              "sector_name": $scope.leadTabData[index].sector_name,
              "lead_source": $scope.leadTabData[index].lead_source,
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
                        // if ($scope.leadTabData[index].meating_timeline == 'not given') {
                        //   $scope.leadTabData.splice(index, 1)
                        // }
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
                        $scope.leadTabDataBrowsed.splice(index, 1)
                        swal(constants.name, response.data.data.message, constants.success);
                      }
                    }).catch(function onError(response) {
                      console.log(response);
                    });
                }
              });
          }
          // Suspemse Sheet Modal End
        },
      };
    }
  );
