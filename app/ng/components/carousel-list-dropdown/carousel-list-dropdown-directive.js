/**
 * Created by Akash on 6/12/2016.
 */
'use strict';

angular.module('myApp.carouseldetail')
    .directive('mvCarouselListDropDown', function() {
        return {
            restrict: 'A',
            templateUrl: 'components/carousel-list-dropdown/carousel-list-dropdown.html',
            controller: 'CarouselDetailCtrl'
        };
    });