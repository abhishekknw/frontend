'use strict';

/**
 * @ngdoc overview
 * @name catalogueAppospios
 * @description
 * # catalogueApp
 *
 * Main module of the application.
 */

// var APIBaseUrl = 'http://coreapi-test.3j6wudg4pu.ap-southeast-1.elasticbeanstalk.com/';
//var APIBaseUrl = 'http://13.232.210.224:8000/';
var APIBaseUrl = Config.APIBaseUrl;

angular.module('Authentication', []);

angular
  .module('catalogueApp', [
    // 'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ui.router',
    'ngSanitize',
    'machadaloCommon',
    'machadaloPages',
    'Authentication',
    'rzModule',
    'ui.bootstrap',
    'angular.filter',
    'angularUtils.directives.dirPagination',
    'angularjs-dropdown-multiselect',
    'ngFileUpload',
    'uiGmapgoogle-maps',
    'ncy-angular-breadcrumb',
    'slickCarousel',
    'scrollable-table',
    'cfp.loadingBar',
    'vcRecaptcha',
    'ngMaterial',
    'nvd3',
    'chart.js',
    'angularUtils.directives.dirPagination',
    'percentCircle-directive',
    'ngTableToCsv',
    'ui.grid',
    'angular-js-xlsx',
    'toastr',
    'smart-table',
    'angular-chartist',
    'angular.morris-chart',
    'textAngular',
    'ngJsTree',
    'xeditable',
    'angular-progress-button-styles',
    'catalogueApp.theme.components',
    'catalogueApp.theme.inputs',
    'catalogueApp.theme',
    'angular-circular-progress',
    'ngMap',
    'AngularPrint',
    'checklist-model',
    'btorfs.multiselect',
    'angularUtils.directives.dirPagination',
    'angularMoment',
    'daterangepicker',
    'ui.select',
    'ngSanitize',
  
  ])
  .config(function ($routeProvider, $stateProvider, $urlRouterProvider, $httpProvider, $qProvider, $locationProvider, cfpLoadingBarProvider) {
    $stateProvider
      .state('society', {
        url: '/society',
        controller: 'CatalogueBaseCtrl',
        templateUrl: 'modules/pages/base/base.tmpl.html'
      })
      .state('campaign', {
        url: '/campaign/:campaignId',
        templateUrl: 'index.html',
        controller: ''
      })
      .state('campaign.societyList', {
        url: '/societyList', //:societyId/
        templateUrl: 'modules/pages/societylist/societylist.tmpl.html',
        controller: 'SocietyListCtrl'
      })
      .state('MapView', {
        url: '/:proposal_id/mapview',
        templateUrl: 'modules/pages/mapview/mapview.tmpl.html',
        controller: 'MapCtrl',
        ncyBreadcrumb: {
          label: 'Map View',
          parent: function ($rootScope) {
            return $rootScope.getCurState();
          },
        },
        data: {
          permission: 'mapview_page_access'
        }
      })
      .state('createProposalMe', {
        url: '/:account_id/createproposal',
        templateUrl: 'modules/pages/createProposal/createproposal.tmpl.html',
        controller: 'ProposalCtrl',
        ncyBreadcrumb: {
          label: 'Create Proposal',
          parent: 'manageCampaign.create'
        },
        data: {
          permission: 'create_proposal_page_access'
        }
      })
      .state('showCurrentProposal', {
        url: '/:proposal_id/showcurrentproposal',
        templateUrl: 'modules/pages/currentProposal/currentProposal.tmpl.html',
        controller: 'CurrentProposal',
        ncyBreadcrumb: {
          label: 'Proposal Summary',
          parent: 'manageCampaign.create'
        },
        data: {
          permission: 'current_proposal_page_access'
        }
      })
      .state('showProposalHistory', {
        url: '/:proposal_id/showproposalhistory',
        templateUrl: 'modules/pages/ProposalHistory/proposalHistory.tmpl.html',
        controller: 'ProposalHistory',
        ncyBreadcrumb: {
          label: 'Proposal History',
          parent: 'manageCampaign.create'
        },
        data: {
          permission: 'show_proposal_hostory_page_access'
        }
      })
      .state('campaign.societyDetails', {
        url: '/societyDetails/:societyId', //:societyId/
        templateUrl: 'modules/pages/societydetails/societydetails.tmpl.html',
        controller: 'SocietyCtrl'
      })
      .state('campaign.societyList.filter', {
        url: '/societyList/:filter',
        templateUrl: 'modules/pages/societylist/societylist.tmpl.html',
        controller: 'SocietyFilterCtrl',
      })
      .state('showSocietyDetails', {
        url: '/societyDetails/:societyId',
        templateUrl: 'modules/pages/supplierDetails/societyDetails/newsocietyDetails.tmpl.html',
        controller: 'NewSocietyCtrl',
        data: {
          permission: 'show_society_details_page_access'
        }
      })
      .state('login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'modules/pages/login/login.tmpl.html',
        data: {
          permission: 'loginAccess'
        }
      })
      .state('forgotPassword', {
        url: '/forgot-password',
        controller: 'forgotPasswordCtrl',
        templateUrl: 'modules/pages/forgotPassword/forgot-password.tmpl.html',
        // data :{
        //   permission : 'loginAccess'
        // }
      })

      // .state('covidHospital', {
      //   url: '/beds/covid/machadalo',
      //   controller: 'covidHospitalCtrl',
      //   templateUrl: 'modules/pages/covidHospital/covid-hospital.tmpl.html',
      //   // data :{
      //   //   permission : 'loginAccess'
      //   // }
      // })
      .state('covidHospital', {
        url: '/hospitalbeds',
        controller: 'covidHospitalCtrl',
        templateUrl: 'modules/pages/covid/covidHospital/covid-hospital.tmpl.html',
        // data :{
        //   permission : 'loginAccess'
        // }
      })

      .state('covidCylinder', {
        url: '/cylinders',
        controller: 'covidCylinderCtrl',
        templateUrl: 'modules/pages/covid/covidCylinder/covid-cylinder.tmpl.html',

      })

      .state('covidRefill', {
        url: '/refills',
        controller: 'covidCylinderCtrl',
        templateUrl: 'modules/pages/covid/covidCylinder/covid-cylinder.tmpl.html',
      })

      .state('covidConcentrators', {
        url: '/concentrators',
        controller: 'covidCylinderCtrl',
        templateUrl: 'modules/pages/covid/covidCylinder/covid-cylinder.tmpl.html',
      })

      .state('covidMedicines', {
        url: '/medicines',
        controller: 'covidCylinderCtrl',
        templateUrl: 'modules/pages/covid/covidCylinder/covid-cylinder.tmpl.html',
      })

      .state('covidAmbulance', {
        url: '/ambulance',
        controller: 'covidCylinderCtrl',
        templateUrl: 'modules/pages/covid/covidCylinder/covid-cylinder.tmpl.html',
      })

      .state('covidPlasma', {
        url: '/plasma',
        controller: 'covidCylinderCtrl',
        templateUrl: 'modules/pages/covid/covidCylinder/covid-cylinder.tmpl.html',
      })

      .state('covidConsulation', {
        url: '/doctors',
        controller: 'covidConsulationCtrl',
        templateUrl: 'modules/pages/covid/covidConsulation/covid-consulation.tmpl.html',
      })
      
      .state('covidCases', {
        url: '/covidcases',
        controller: 'covidCasesCtrl',
        templateUrl: 'modules/pages/covid/covidCases/covid-cases.tmpl.html',
      })

      .state('covidLanding', {
        url: '/covidLanding/',
        controller: 'covidLandingCtrl',
        templateUrl: 'modules/pages/covid/covidLanding/covid-landing.tmpl.html',
      })

      .state('covidYouth', {
        url: '/mea/',
        controller: 'covidYouthCtrl',
        templateUrl: 'modules/pages/covid/covidYouthChildren/covidY/covid-y.tmpl.html',
      })

      .state('covidMea', {
        url: '/mea',
        controller: 'covidMeaCtrl',
        templateUrl: 'modules/pages/covid/covidMea/covid-mea.tmpl.html',
      })

      .state('covidMca', {
        url: '/mca',
        controller: 'covidMcaCtrl',
        templateUrl: 'modules/pages/covid/covidMca/covid-mca.tmpl.html',
      })
      
      .state('aisensy', {
        url: '/intervene',
        controller: 'aisensyCtrl',
        templateUrl: 'modules/pages/covid/aisensy/aisensy.tmpl.html',
          data :{
          permission : 'can_view_intervene'
        }
        
      })

      .state('aisensyMea', {
        url: '/intervene/mea',
        controller: 'aisensyMeaCtrl',
        templateUrl: 'modules/pages/covid/aisensyMea/aisensyMea.tmpl.html',
          data :{
          permission : 'can_view_intervene'
        }
        
      })
      
      .state('covidVaccineCenter', {
        url: '/vaccinecenters/',
        controller: 'covidVaccineCentersCtrl',
        templateUrl: 'modules/pages/covid/covidVaccineCenters/covid-vaccine-centers.tmpl.html',
      })

  

      .state('resetPassword', {
        url: '/reset-password/:code/:email',
        controller: 'resetPasswordCtrl',
        templateUrl: 'modules/pages/resetPassword/reset-password.tmpl.html',
        // data :{
        //   permission : 'loginAccess'
        // }
      })

      .state('leadData', {
        url: '/lead-data',
        controller: 'leadDataCtrl',
        templateUrl: 'modules/pages/leadData/lead-data.tmpl.html',
      })

      .state('bookingPlan', {
        url: '/booking-plan',
        controller: 'bookingPlanCtrl',
        templateUrl: 'modules/pages/bookingPlan/booking-plan.tmpl.html',
      })

      .state('manageCampaign', {
        url: '/manageCampaign',
        controller: 'CreateCampaignCtrl',
        templateUrl: 'modules/pages/manageCampaign/manage-campaign.tmpl.html',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        },
        data: {
          permission: 'homepage_access'
        }
      })
      .state('manageCampaign.create', {
        url: '/create',
        controller: 'CreateCampaignCtrl',
        templateUrl: 'modules/pages/manageCampaign/create/create-campaign.tmpl.html',
        ncyBreadcrumb: {
          label: 'Home'
        },
        data: {
          permission: 'homepage_access'
        }
      })
      .state('editAccount', {
        url: '/editAccount/:accountId',
        controller: 'CreateAccountCtrl',
        templateUrl: 'modules/pages/manageCampaign/createaccount/create-account.tmpl.html',
        ncyBreadcrumb: {
          label: 'Account',
          parent: 'manageCampaign.create'
        },
        data: {
          permission: 'edit_account_page_access'
        }
      })
      .state('createaccount', {
        url: '/createAccount/:organisationId',
        controller: 'CreateAccountCtrl',
        templateUrl: 'modules/pages/manageCampaign/createaccount/create-account.tmpl.html',
        ncyBreadcrumb: {
          label: 'Account',
          parent: 'manageCampaign.create'
        },
        data: {
          permission: 'create_account_page_access'
        }
      })
      .state('manageCampaign.shortlisted', {
        url: '/shortlisted',
        controller: 'ShortlistedCampaignCtrl',
        templateUrl: 'modules/pages/manageCampaign/shortlisted/shortlisted.tmpl.html'
      })
      .state('manageCampaign.shortlisted.societies', {
        url: '/:campaignId/societies',
        controller: 'ShortlistedSocietiesCtrl',
        templateUrl: 'modules/pages/manageCampaign/shortlisted/shortlisted-societies.tmpl.html'
      })
      .state('manageCampaign.requested', {
        url: '/requested',
        controller: 'RequestedCampaignCtrl',
        templateUrl: 'modules/pages/manageCampaign/shortlisted/shortlisted.tmpl.html'
      })
      .state('manageCampaign.requested.societies', {
        url: '/:campaignId/societies',
        controller: 'RequestedSocietiesCtrl',
        templateUrl: 'modules/pages/manageCampaign/shortlisted/shortlisted-societies.tmpl.html'
      })
      .state('manageCampaign.finalized', {
        url: '/finalized',
        controller: 'FinalizedCampaignCtrl',
        templateUrl: 'modules/pages/manageCampaign/shortlisted/shortlisted.tmpl.html'
      })
      .state('manageCampaign.finalized.finalbooking', {
        url: '/:campaignId/finalbooking',
        controller: 'FinalBookingCampaignCtrl',
        templateUrl: 'modules/pages/manageCampaign/finalbooking/finalbooking.tmpl.html'
      })
      .state('manageCampaign.finalized.societies', {
        url: '/:campaignId/societies',
        controller: 'FinalizedSocietiesCtrl',
        templateUrl: 'modules/pages/manageCampaign/shortlisted/shortlisted-societies.tmpl.html'
      })
      .state('manageCampaign.finalize', {
        url: '/finalize',
        controller: 'FinalizeCampaignCtrl',
        templateUrl: 'modules/pages/manageCampaign/finalize/finalize.tmpl.html'
      })
      .state('manageCampaign.release', {
        url: '/release',
        controller: 'ReleaseCampaignCtrl',
        templateUrl: 'modules/pages/manageCampaign/release/release-campaign.tmpl.html'
      })
      .state('manageCampaign.finalize.finalizeInventory', {
        url: '/:campaignId/finalizeInventory/',
        controller: 'FinalizeInventoryCtrl',
        templateUrl: 'modules/pages/manageCampaign/finalize/finalizeInventory.tmpl.html'
      })
      .state('society.details.poster', {
        url: '/poster', //:societyId/
        templateUrl: 'modules/common/postertab/poster-tab.tmpl.html',
        controller: ''
      })
      .state('society.details.info', {
        url: '/info', //:societyId/
        templateUrl: 'modules/common/infotab/societyinfo-tab.tmpl.html',
        controller: ''
      })
      .state('manageCampaign.ongoingcampaign', {
        url: '/ongoingcampaign',
        controller: 'OngoingCampaignCtrl',
        templateUrl: 'modules/pages/manageCampaign/ongoingcampaign/ongoing-campaign.tmpl.html',
        data: {
          permission: 'manageCampaign.ongoingcampaignPageAccess'
        }

      })
      .state('mapView', {
        url: '/mapview',
        controller: 'MapCtrl',
        templateUrl: 'modules/pages/mapview/mapview.tmpl.html',
        data: {
          permission: 'mapview_page_Access'
        }
      })
      .state('societydetailspage', {
        // url : '/SocietyDetailsPages',
        url: '/:supplierId/SocietyDetailsPages',
        controller: 'SocietyDetailsPagesCtrl',
        templateUrl: 'modules/pages/SocietyDetailsPages/societydetailspage.tmpl.html',
        data: {
          permission: 'society_details_page_access'
        }
      })

      .state('changePassword', {
        url: '/changePassword',
        controller: 'changePswdCtrl',
        templateUrl: 'modules/pages/changePassword/changePassword.tmpl.html',
        ncyBreadcrumb: {
             label:'Change Password',
           },
        data: {
          permission: 'change_password_page_access'
        }
      })


      .state('releasePlan',{
           url : '/:proposal_id/releasePlan',
           controller : 'ReleaseCampaignCtrl',
           templateUrl : 'modules/pages/releaseCampaignPlan/releaseCampaign.tmpl.html',
           ncyBreadcrumb: {
             label:'Booking Plan',
             parent : 'CampaignList'
           },
           data :{
             permission : 'release_plan_page_access'
           }
       })
      .state('OpsDashBoard',{
           url : '/campaignDecisionBoard',
           controller : 'OpsDashCtrl',
           templateUrl : 'modules/pages/DashBoard/OperationsDashBoard/opsdashboard.tmpl.html',
           ncyBreadcrumb: {
             label:'Campaign Decision Board',
             parent : 'manageCampaign.create'
           },
           data :{
             permission : 'ops_dashboard_page_access'
           }
       })
       .state('CampaignList',{
            url : '/CampaignList',
            controller : 'CampaignListCtrl',
            templateUrl : 'modules/pages/DashBoard/CampaignList/campaignlist.tmpl.html',
            ncyBreadcrumb: {
              label:'Campaign List',
              parent : 'OpsDashBoard'
            },
            data :{
              permission : 'campaign_list_page_access'
            }
        })

        .state('SuspenseLeadSheet',{
          url : '/SuspenseLeadSheet',
          controller : 'SuspenseLeadSheetCtrl',
          templateUrl : 'modules/pages/suspenseLeadSheet/suspenselead.tmpl.html',
          // controller : 'CampaignListCtrl',
          // templateUrl : 'modules/pages/DashBoard/CampaignList/campaignlist.tmpl.html',
          ncyBreadcrumb: {
            label:'Suspense Lead Sheet',
          },
          
      })

      // .state('manageUsers', {
      //   url: '/manageUser',
      //   controller: 'userCtrl',
      //   templateUrl: 'modules/pages/manageUsers/user.tmpl.html',
      //   data: {
      //     permission: 'manage_users_page_access'
      //   }
      // })      
      .state('manageUsers', {
        url: '/manageMent/:templatePage',
        controller: 'userCtrl',
        templateUrl: 'modules/pages/manageUsers/user.tmpl.html',
        data: {
          permission: 'manage_users_page_access'
        }
      })
      .state('auditReleasePlan', {
        url: '/:proposal_id/auditReleasePlan',
        controller: 'AuditReleasePlanCtrl',
        templateUrl: 'modules/pages/operations/auditReleasePlan/auditReleasePlan.tmpl.html',
        ncyBreadcrumb: {
          label: 'Campaign Release And Audit Plan',
          parent: 'releasePlan'
        },
        data: {
          permission: 'audit_release_plan_page_access'
        }
      })
      .state('opsExecutionPlan', {
        url: '/:proposal_id/opsExecutionPlan',
        controller: 'OpsExecutionPlanCtrl',
        templateUrl: 'modules/pages/operations/opsExecutionPlan/opsExecutionPlan.tmpl.html',
        ncyBreadcrumb: {
          label: 'Execution Plan',
          parent: 'CampaignList'
        },
        data: {
          permission: 'ops_execution_plan_page_access'
        }
      })
      .state('guestHomePage', {
        url: '/guestHomePage',
        controller: 'guestHomePageController',
        templateUrl: 'modules/pages/guestPage/homepage.tmpl.html',
        ncyBreadcrumb: {
          label: 'Home',
        },
        data: {
          permission: 'guest_home_page_access'
        }
      })
      .state('ongoingCampaigns', {
        url: '/ongoingCampaigns',
        controller: 'OngoingCampaignCtrl',
        templateUrl: 'modules/pages/campaignStatus/ongoingCampaigns/ongoingCampaign.tmpl.html',
        data: {
          permission: 'ongoingCampaignsPageAccess'
        }

      })
      .state('upcomingCampaigns', {
        url: '/upcomingCampaigns',
        controller: 'UpcomingCampaignCtrl',
        templateUrl: 'modules/pages/campaignStatus/upcomingCampaigns/upcomingCampaign.tmpl.html',
        data: {
          permission: 'upcomingCampaignsPageAccess'
        }
      })
      .state('completedCampaigns', {
        url: '/completedCampaigns',
        controller: 'CompletedCampaignCtrl',
        templateUrl: 'modules/pages/campaignStatus/completedCampaigns/completedCampaign.tmpl.html',
        data: {
          permission: 'completedCampaignsPageAccess'
        }
      })
      .state('dashboard', {
        url: '/dashboard',
        controller: 'DashboardCtrl',
        templateUrl: 'modules/pages/dashboard/dashboard.html',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        data: {
          permission: 'dashboard_page_access'
        }
      })
      .state('templateDashboard', {
        url: '/templateDashboard',
        controller: 'TemplateDashboardCtrl',
        templateUrl: 'modules/pages/covid/templateDashboard/templateDashboard.html',
        // sidebarMeta: {
        //   icon: 'ion-android-home',
        //   order: 0,
        // },
        data: {
          permission: 'can_view_template_dashboard'
        }
      })
      .state('templateDashboardMea', {
        url: '/templateDashboardMea',
        controller: 'TemplateDashboardMeaCtrl',
        templateUrl: 'modules/pages/covid/templateDashboardMea/templateDashboardMea.html',
        // sidebarMeta: {
        //   icon: 'ion-android-home',
        //   order: 0,
        // },
        data: {
          permission: 'can_view_template_dashboard'
        }
      })
      .state('b2bdashboard', {
        url: '/b2b/dashboard',
        controller: 'B2BDashboardCtrl',
        templateUrl: 'modules/pages/b2bdashboard/b2bdashboard.html',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        data: {
          permission: 'dashboard_page_access'
        }
      })
      .state('sheetToCampaign', {
        url: '/sheetToCampaign',
        controller: 'sheetToCampaignController',
        templateUrl: 'modules/pages/sheetToCampaign/sheetToCampaign.tmpl.html',
        data: {
          permission: 'sheet_to_campaign_page_access'
        }
      })
      .state('campaignLeads', {
        url: '/campaignLeads',
        controller: 'CampaignLeadsCtrl',
        templateUrl: 'modules/pages/leads/campaignLeads.tmpl.html',
        ncyBreadcrumb: {
          label: 'Campaign Leads',
        },
        data: {
          permission: 'campaign_leads_page_access'
        }
      })
      // .state('enterLeads',{
      //       url : '/leadsForm/:supplierCode/:campaignId/:supplierId',
      //       controller : 'LeadFormCtrl',
      //       templateUrl : 'modules/pages/leadForm/leadsForm.tmpl.html',
      //       data :{
      //         permission : 'enterLeadsPageAccess'
      //       }
      // })

      .state('enterLeadsFromApplication', {
        url: '/enterLeadsFromApplication/:formId/:supplierId',
        controller: 'enterLeadFormCtrl',
        templateUrl: 'modules/pages/enterLeadsFromApplication/enterLeads.tmpl.html',
        ncyBreadcrumb: {
          label: 'Enter Leads From Application',
        },
        data: {
          permission: 'enter_leads_from_application_access'
        }
      })

      .state('forbiddenPage', {
        url: '/forbiddenPage',
        templateUrl: 'modules/common/forbiddenErrorPage.tmpl.html',
        data: {
          permission: 'forbidden_page_access'
        }
      }).state('dashboard1', {
        url: '/dashboard1',
        // controller : 'DashboardCtrl',
        templateUrl: 'modules/pages/dashboard-gulp/admin/release/index.html',
        data: {
          permission: 'dashboard1PageAccess'
        }

      }).state('loginLogs', {
        url: '/loginLogs',
        controller: 'loginLogsCtrl',
        templateUrl: 'modules/pages/loginLogs/loginLogs.tmpl.html',
        ncyBreadcrumb: {
          label: 'Login Logs',
        },
        data: {
          permission: 'login_logs_page_access'
        }
      }).state('editProposalDetails', {
        url: '/editProposalDetails/:proposalId/',
        controller: 'EditProposalDetailsCtrl',
        templateUrl: 'modules/pages/editProposalDetails/editProposalDetails.tmpl.html',
        data: {
          permission: 'editProposalDetailsPage'
        }
      })
      
      // .state('dynamicGraphs',{
      //       url : '/dynamicGraphs',
      //       controller : 'DashboarddynamicGraphsCtrl',
      //       templateUrl : 'modules/pages/dynamicGraphs/dynamicGraphs.html',
      //        data :{
      //         permission : 'dashboard_dynamic_graphs'
      //       }
      // })
      ;


    //$qProvider.errorOnUnhandledRejections(false);
    $locationProvider.hashPrefix('');
    // console.log = () => {};
  })
  .run(['$rootScope', '$window', '$location', 'AuthService', '$state', '$cookieStore',
    function ($rootScope, $window, $location, AuthService, $state, $cookieStore) {
      $rootScope.globals = $rootScope.globals || {};
      $rootScope.globals.currentUser = AuthService.UserInfo();
      $rootScope.getCurState = function () {
        if ($window.localStorage.isSavedProposal == 'true')
          return 'showCurrentProposal';
        else if ($window.localStorage.isSavedProposal == 'false')
          return 'createProposalMe';
        else if ($window.localStorage.user_code == 'guestUser')
          return 'guestHomePage';
      }

      var whence = $location.path();

      $rootScope.$on('$stateChangeSuccess', function (e, toState, toParams, fromState, fromParams) {
        var permissions = "";
        if($rootScope.globals && $rootScope.globals.userInfo && $rootScope.globals.userInfo.profile && $rootScope.globals.userInfo.profile.permissions){
          var permissions = $rootScope.globals.userInfo.profile.permissions;
        }
        var page = "";
       if(toState && toState.data && toState.data.permission){
         page = toState.data.permission;
       }
        
        if ($rootScope.globals.currentUser && !(permissions.hasOwnProperty(page.toLowerCase()) && permissions[page.toLowerCase()]) && $location.path() != '/logout') {
          e.preventDefault();
          console.log(permissions.hasOwnProperty(page.toLowerCase()));
          $state.go('forbiddenPage');
        }
      });
      $rootScope.$on('$locationChangeStart', function (e, toState, toParams, fromState, fromParams) {
        var whence = $location.path();
        // redirect to login page if not logged in
        $rootScope.globals.currentUser = AuthService.UserInfo();
        if (!$rootScope.globals.hasOwnProperty('userInfo') || !$rootScope.globals.userInfo.hasOwnProperty('profile')) {
          var url = $location.url().split("/");

        // $location.path("/hospitalbeds/covidhelpdesk/");
          if ($location.path() == "/forgot-password") {
            $location.path("/forgot-password");
          } else if (url[1] == "reset-password") {
            $location.path($location.url());
          } else if (url[1] == "beds") {
            $location.path("/beds/covid/machadalo");
          } 
         
          else if (url && url[1] && url[1].indexOf("hospitalbeds") != -1) {
            $location.path("/hospitalbeds");
          } else if (url && url[1] && url[1].indexOf("cylinders") != -1) {
            $location.path("/cylinders");
          } else if (url && url[1] && url[1].indexOf("refills") != -1) {
            $location.path("/refills");
          } else if (url && url[1] && url[1].indexOf("concentrators") != -1) {
            $location.path("/concentrators");
          } else if (url && url[1] && url[1].indexOf("medicines") != -1) {
            $location.path("/medicines");
          } else if (url && url[1] && url[1].indexOf("covidcases") != -1) {
            $location.path("/covidcases");
          } else if (url && url[1] && url[1].indexOf("ambulance") != -1) {
            $location.path("/ambulance");
          } else if (url && url[1] && url[1].indexOf("plasma") != -1) {
            $location.path("/plasma");
          } else if (url && url[1] && url[1].indexOf("doctors") != -1) {
            $location.path("/doctors");
          }  else if (url && url[1] && url[1].indexOf("mea") != -1) {
            $location.path("/mea");
          }  else if (url && url[1] && url[1].indexOf("mca") != -1) {
             $location.path("/mca");
          }   else if (url && url[1] && url[1].indexOf("templateDashboard") != -1) {
            $location.path("/templateDashboard");
          }  else if (url && url[1] && url[1].indexOf("templateDashboardMea") != -1) {
            $location.path("/templateDashboardMea");
          }
          //  else if (url && url[1] && url[1].indexOf("aisensy") != -1) {
          //   $location.path("/aisensy");
          // } 
          
          // else if (url[1] == "hospitalbeds") {
          //   $location.path("/hospitalbeds/");
          // } else if (url[1] == "cylinders") {
          //   $location.path("/cylinders/");
          // } else if (url[1] == "refills") {
          //   $location.path("/refills/");
          // } else if (url[1] == "concentrators") {
          //   $location.path("/concentrators/");
          // } else if (url[1] == "medicines") {
          //   $location.path("/medicines/");
          // } else if (url[1] == "covidcases") {
          //   $location.path("/covidcases/");
          // } else if (url[1] == "ambulance") {
          //   $location.path("/ambulance/");
          // } else if (url[1] == "plasma") {
          //   $location.path("/plasma/");
         // } else if (url[1] == "doctors") {
          //   $location.path("/doctors/");
          // }
          
          //  else if (url[1] == "mea") {
          //   $location.path("/mea");
          // } 
           else if (url[1] == "vaccinecenters") {
            $location.path("/vaccinecenters/");
          } else {
            $location.path("/login");
          }
        }
        var category = ""
        if($rootScope.globals && $rootScope.globals.userInfo && $rootScope.globals.userInfo.profile && $rootScope.globals.userInfo.profile.organisation && $rootScope.globals.userInfo.profile.organisation.category){
           category = $rootScope.globals.userInfo.profile.organisation.category;
        }
        var url = $location.url().split("/");
        // $location.path("/hospitalbeds/covidhelpdesk/");
        if (!$rootScope.globals.currentUser) {
          if ($location.path() == "/forgot-password") {
            $location.path("/forgot-password");
          } else if (url[1] == "reset-password") {
            $location.path($location.url());
          } else if (url[1] == "beds") {
            $location.path("/beds/covid/machadalo");
          } 
        
          else if (url && url[1] && url[1].indexOf("hospitalbeds") != -1) {
            $location.path("/hospitalbeds");
          } else if (url && url[1] && url[1].indexOf("cylinders") != -1) {
            $location.path("/cylinders");
          } else if (url && url[1] && url[1].indexOf("refills") != -1) {
            $location.path("/refills");
          } else if (url && url[1] && url[1].indexOf("concentrators") != -1) {
            $location.path("/concentrators");
          } else if (url && url[1] && url[1].indexOf("medicines") != -1) {
            $location.path("/medicines");
          } else if (url && url[1] && url[1].indexOf("covidcases") != -1) {
            $location.path("/covidcases");
          } else if (url && url[1] && url[1].indexOf("ambulance") != -1) {
            $location.path("/ambulance");
          } else if (url && url[1] && url[1].indexOf("plasma") != -1) {
            $location.path("/plasma");
          } else if (url && url[1] && url[1].indexOf("doctors") != -1) {
            $location.path("/doctors");
          } else if (url && url[1] && url[1].indexOf("mea") != -1) {
            $location.path("/mea");
          }  else if (url && url[1] && url[1].indexOf("mca") != -1) {
            $location.path("/mca");
          }  else if (url && url[1] && url[1].indexOf("templateDashboard") != -1) {
            $location.path("/templateDashboard");
          } 
          else if (url && url[1] && url[1].indexOf("templateDashboardMea") != -1) {
            $location.path("/templateDashboardMea");
          }
          //  else if (url && url[1] && url[1].indexOf("aisensy") != -1) {
          //   $location.path("/aisensy");
          // } 

          //  else if (url[1] == "hospitalbeds") {
          //   $location.path("/hospitalbeds/");
          // } else if (url[1] == "cylinders") {
          //   $location.path("/cylinders/");
          // } else if (url[1] == "refills") {
          //   $location.path("/refills/");
          // } else if (url[1] == "concentrators") {
          //   $location.path("/concentrators/");
          // } else if (url[1] == "medicines") {
          //   $location.path("/medicines/");
          // } else if (url[1] == "covidcases") {
          //   $location.path("/covidcases/");
          // } else if (url[1] == "ambulance") {
          //   $location.path("/ambulance/");
          // } else if (url[1] == "plasma") {
          //   $location.path("/plasma/");
          // }  else if (url[1] == "doctors") {
          //   $location.path("/doctors/");
          // } 

          
           else if (url[1] == "mea") {
            $location.path("/mea/");
          } else if (url[1] == "vaccinecenters") {
            $location.path("/vaccinecenters/");
          } else {
            $location.path("/login");
          }
        } else if ($rootScope.globals.currentUser && $location.path() == '/guestHomePage' && category != 'BUSINESS') {
          $location.path("/guestHomePage");
        } else if ($rootScope.globals.currentUser && $location.path() == '/logout') {
          AuthService.Logout();
          $location.path("/login");
        }else if ($rootScope.globals.currentUser && $location.path() == '/changePassword') {
          $location.path("/changePassword");
        } else if ($rootScope.globals.currentUser && $location.path() == '/b2b/dashboard') {
          $location.path("/b2b/dashboard");
        } else if ($rootScope.globals.currentUser && typeof $cookieStore.get('returnUrl') != 'undefined' && $cookieStore.get('returnUrl') && category != 'BUSINESS') {
          $location.path($cookieStore.get('returnUrl'));
          $cookieStore.remove('returnUrl');
        } else if ($rootScope.globals.currentUser && ($location.path() == '/login' || $location.path() == '/') && ($window.localStorage.user_code != 'guestUser') && category != 'BUSINESS') {
          // e.preventDefault();
          $location.path("/manageCampaign/create");
        } else if (category == 'BUSINESS') {
          $location.path("/b2b/dashboard");
        } else if (category != 'BUSINESS') {
          $location.path(whence);
        }
      });

    }]);
