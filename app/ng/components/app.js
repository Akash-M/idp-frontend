'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp',
        ['ui.router', 'ui.bootstrap', 'myApp.dashboard','myApp.carouseldetail', 'templates','highcharts-ng','ngTable',
        'ncy-angular-breadcrumb', 'ngMaterial', 'ngResource', 'ngMessages'])

    .config(function ($stateProvider, $urlRouterProvider, $mdIconProvider, $resourceProvider, $httpProvider, $breadcrumbProvider) {

        // For any unmatched url, redirect to /movies
        $urlRouterProvider.otherwise("/dashboard");


        $stateProvider
            .state('root', {
                abstract: true,
                templateUrl: "views/root/root.html"
            });

        $mdIconProvider
            .iconSet('content', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg')
            .iconSet('action', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg')
            .iconSet('editor', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-editor.svg')
            .iconSet('navigation', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg');


        //this overrides the defaults actions for all $resources
        angular.extend($resourceProvider.defaults.actions, {

            update: {
                method: "PUT"
            }

        });


    });