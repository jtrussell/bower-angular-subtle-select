angular.module('sbtl', []);

/*global angular */

angular.module('sbtl').directive('sbtlSelect', [function() {
  'use strict';
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      ngModel: '=',
      sbtlOptions: '=',
      sbtlListIsVisible: '@'
    },
    template: [
      '<span class="sbtl-select" ng-click="showSbtlList()" ng-mouseenter="showSbtlList()">',
        '{{getValueText(ngModel)}}',
        '<span sbtl-select-option-list ',
            'sbtl-list-is-visible="sbtlListIsVisible" ',
            'sbtl-options="sbtlOptions" ',
            'sbtl-callback="sbtlSelectCallback">',
        '</span>',
      '</span>'
    ].join(''),
    link: function(scope, element, attrs) {
      var selectOpt, hideSbtlList, makeOptFirst;

      scope.getValueText = function(value) {
        var text = '';
        angular.forEach(scope.sbtlOptions, function(opt) {
          if(opt.value === value) {
            text = opt.text;
            return false;
          }
        });
        return text;
      };

      scope.showSbtlList = function() {
        scope.sbtlListIsVisible = true;
      };

      scope.sbtlSelectCallback = function(opt) {
        selectOpt(opt);
        makeOptFirst(opt);
        hideSbtlList();
      };

      selectOpt = function(opt) {
        scope.ngModel = opt.value;
      };

      hideSbtlList = function() {
        scope.sbtlListIsVisible = false;
      };

      makeOptFirst = function(opt) {
        var ix, optIx;
        for(ix = scope.sbtlOptions.length; ix--;) {
          if(opt.value === scope.sbtlOptions[ix].value) {
            optIx = ix;
            ix = 0;
          }
        }

        if(!angular.isUndefined(optIx)) {
          scope.sbtlOptions.splice(optIx,1);
          scope.sbtlOptions.unshift(opt);
        }
        
      };
    }
  };
}]);

/*global angular */

angular.module('sbtl').directive('sbtlSelectOption', [function() {
  'use strict';
  return {
    restrict: 'AE',
    replace: true,
    scope: {sbtlOption: '=', sbtlCallback: '='},
    template: [
      '<span class="sbtl-option">',
        '<a ng-click="onSbtlOptionClick()">{{sbtlOption.text}}</a>',
        '<br />',
      '</span>'
    ].join(''),
    link: function(scope, element, attrs) {
      scope.onSbtlOptionClick = function() {
        scope.sbtlCallback(scope.sbtlOption);
      };
    }
  };
}]);


/*global angular, jQuery */

angular.module('sbtl').directive('sbtlSelectOptionList', [function() {
  'use strict';
  return {
    restrict: 'AE',
    replace: true,
    scope: {sbtlOptions: '=', sbtlListIsVisible: '=', sbtlCallback: '='},
    template: [
      '<span ng-show="sbtlListIsVisible" class="sbtl-option-list" ng-mouseleave="hideSbtlList()">',
        '<span sbtl-select-option ng-repeat="opt in sbtlOptions" sbtl-option="opt" sbtl-callback="sbtlCallback">',
        '</span>',
      '</span>'
    ].join(''),
    link: function(scope, element, attrs) {
      scope.hideSbtlList = function() {
        scope.sbtlListIsVisible = false;
      };
    }
  };
}]);

