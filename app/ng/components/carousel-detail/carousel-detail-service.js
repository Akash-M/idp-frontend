/**
 * Created by Akash on 6/12/2016.
 */
'use strict';

angular.module('myApp.carouseldetail')

    .factory('CarouselDetail', function($resource,BASEURL) {
        return $resource(BASEURL+'/api/v1/getAllCarouselsId');
    });