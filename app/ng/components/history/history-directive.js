/**
 * Created by Akash on 6/5/2016.
 */
'use strict';

angular.module('myApp.dashboard')
    .directive('mvHistory', function() {
        return {
            restrict: 'A',
            templateUrl: 'components/history/history.html'
        };
    });