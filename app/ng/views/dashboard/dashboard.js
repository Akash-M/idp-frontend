/**
 * Created by Akash on 5/31/2016.
 */
'use strict';

angular.module('myApp.dashboard')
    .constant('dashboardState', {
        name: 'dashboard.detail',
        options: {
            url: '',
            views: {
                "content@root": {
                    templateUrl: 'views/dashboard/dashboard.html',
                    controller: 'DashboardCtrl'
                }
            },
            ncyBreadcrumb: {
                // a bit ugly (and not stable), but ncybreadcrumbs doesn't support direct access
                // to a view controller yet if there are multiple views
                label: "Dashboard"
            }
        }
    })
    .controller('DashboardCtrl', function($scope, Dashboard) {

        var dashboardDetailsPromise =  Dashboard.query(function(){

            var dashboardDetails = [];

            for(var ctr=0;ctr<dashboardDetailsPromise.length;ctr++){
                dashboardDetails.push(dashboardDetailsPromise[ctr]);
            }

            $scope.dashboardTable = dashboardDetails;

            $scope.pieChartLabels = ["1 Star","2 Star","3 Star","4 Star","5 Star"];
            $scope.pieChartData = [one,two,three,four,five ];

        });

    });
