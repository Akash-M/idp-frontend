'use strict';

angular.module('myApp.dashboard')

    .directive('mvCFooter', function() {
        return {
            restrict: 'A',
            templateUrl: 'components/footer/footer.html'
        };
    });