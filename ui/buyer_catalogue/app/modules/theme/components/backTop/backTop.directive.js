/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('machadaloCommon')
      .directive('backTop', backTop);

  /** @ngInject */
  function backTop() {
    return {
      restrict: 'E',
      templateUrl: 'modules/theme/components/backTop/backTop.html',
      controller: function () {
        $('#backTop').backTop({
          'position': 200,
          'speed': 100
        });
      }
    };
  }

})();
