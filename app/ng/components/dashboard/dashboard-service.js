/**
 * Created by Akash on 6/2/2016.
 */
'use strict';

angular.module('myApp.dashboard')

    .factory('Dashboard', function($resource,BASEURL) {
        return $resource(BASEURL+'/api/v1/getCarouselsList');
    });