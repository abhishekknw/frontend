/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('catalogueApp')
      .directive('trafficChart', trafficChart);

  /** @ngInject */
  function trafficChart() {
    return {
      restrict: 'E',
      controller: 'TrafficChartCtrl',
      templateUrl: 'modules/pages/dashboard/trafficChart/trafficChart.html'
    };
  }
})();
