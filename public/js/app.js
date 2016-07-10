'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp',
        ['ui.router', 'ui.bootstrap', 'myApp.dashboard','myApp.carouseldetail', 'templates','highcharts-ng','ngTable',
        'ncy-angular-breadcrumb', 'ngMaterial', 'ngResource', 'ngMessages'])

    .config(["$stateProvider", "$urlRouterProvider", "$mdIconProvider", "$resourceProvider", "$httpProvider", "$breadcrumbProvider", function ($stateProvider, $urlRouterProvider, $mdIconProvider, $resourceProvider, $httpProvider, $breadcrumbProvider) {

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


    }]);
/**
 * Created by Akash on 6/20/2016.
 */

/**
 * Created by Akash on 6/12/2016.
 */
angular.module('myApp.carouseldetail', ['ngResource', 'ui.router','ui.select','ngMaterial',
        'ngResource','highcharts-ng'])

    .config(["$stateProvider", "$urlRouterProvider", "carouseldetailState", function ($stateProvider, $urlRouterProvider, carouseldetailState) {
        $stateProvider

            .state('carouseldetail', {

                // With abstract set to true, that means this state can not be explicitly activated.
                // It can only be implicitly activated by activating one of its children.
                abstract: true,
                parent: 'root',

                // This abstract state will prepend '/movies' onto the urls of all its children.
                url: '/carouseldetail',

                // since we have views we do not need to define a template here
                //template: '<div ui-view></div>',
            })

            // Using a '.' within a state name declares a child within a parent.
            // So you have a new state 'list' within the parent 'movies' state.
            .state(carouseldetailState.name, carouseldetailState.options);

    }]);

/**
 * Created by Akash on 6/12/2016.
 */
'use strict';

angular.module('myApp.carouseldetail')

    .factory('CarouselDetail', ["$resource", "BASEURL", function($resource,BASEURL) {
        return $resource(BASEURL+'/api/v1/getAllCarouselsId');
    }]);
/**
 * Created by Akash on 6/12/2016.
 */

/*
'use strict';

angular.module('myApp.dashboard')
    .directive('mvCarouselList', function() {
        return {
            restrict: 'A',
            templateUrl: 'components/carousel-list/carousel-list.html'
        };
    });
*/

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
angular.module('myApp')
    .constant("BASEURL", "http://localhost:9000");
/**
 * Created by Akash on 6/2/2016.
 */
angular.module('myApp.dashboard', ['ngResource', 'ui.router','ngMaterial',
    'ngResource','ngTable'])

    .config(["$stateProvider", "$urlRouterProvider", "dashboardState", function ($stateProvider, $urlRouterProvider, dashboardState) {
        $stateProvider

            .state('dashboard', {

                // With abstract set to true, that means this state can not be explicitly activated.
                // It can only be implicitly activated by activating one of its children.
                abstract: true,
                parent: 'root',

                // This abstract state will prepend '/movies' onto the urls of all its children.
                url: '/dashboard',

                // since we have views we do not need to define a template here
                //template: '<div ui-view></div>',
            })

            // Using a '.' within a state name declares a child within a parent.
            // So you have a new state 'list' within the parent 'movies' state.
            .state(dashboardState.name, dashboardState.options);

            //.state(movieDetailsState.name, movieDetailsState.options);

    }]);






/**
 * Created by Akash on 6/2/2016.
 */
'use strict';

angular.module('myApp.dashboard')

    .factory('Dashboard', ["$resource", "BASEURL", function($resource,BASEURL) {
        return $resource(BASEURL+'/api/v1/getCarouselsList');
    }]);
'use strict';

angular.module('myApp.dashboard')

    .directive('mvCFooter', function() {
        return {
            restrict: 'A',
            templateUrl: 'components/footer/footer.html'
        };
    });
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
angular.module('myApp')
    .directive('mvToolbar', function() {
        return {
            restrict: "A",
            templateUrl: "components/toolbar/toolbar.html",
            controller: ["$scope", "$mdDialog", "$mdMedia", "$mdToast", "$location", "$window", function($scope, $mdDialog, $mdMedia, $mdToast, $location, $window) {

                /////////////////////


            }]
        }
    });
/**
 * Created by Akash on 6/12/2016.
 */
'use strict';

angular.module('myApp.carouseldetail')
    .constant('carouseldetailState', {
        name: 'carouseldetail.detail',
        options: {
            url: '',
            views: {
                "content@root": {
                    templateUrl: 'views/carousel-detail/carousel-detail.html',
                    controller: 'CarouselDetailCtrl'
                }
            }
        }
    })
    .controller('CarouselDetailCtrl', ["$scope", "CarouselDetail", "$http", "BASEURL", "$interval", "NgTableParams", function($scope, CarouselDetail, $http, BASEURL, $interval,NgTableParams) {

        $http({
            method: 'GET',
            url: BASEURL + '/api/v1/getAllCarouselsId'
        }).then(function successCallback(response) {
            var carouselIDList = response.data.Carousel_ids;
            $scope.carouselIDList = carouselIDList;
            $scope.showCarousel = false;

        }, function errorCallback(response) {
            alert("error retrieving carousel list");
        });

        $scope.displayCarouselDetails = function(){
            $scope.showCarousel = true;
            getCarouselDetails();
        }

        function getCarouselDetails(){

            if ($scope.selectedItem !== false) {
                $http({
                    method: 'GET',
                    url: BASEURL + '/api/v1/getAllCarouselEvents/' + $scope.selectedItem
                }).then(function successCallback(response) {
                    $scope.response = response.data;
                    var carouselEvents = response.data;
                    var carouselID = carouselEvents.carousel_id;
                    var listOfFlights = carouselEvents.Flights;
                    $scope.carouselID = carouselID;
                    $scope.listOfFlights = listOfFlights;

                    $scope.tableParams = createUsingFullOptions();

                    function createUsingFullOptions() {
                        var initialParams = {
                            count: 10 // initial page size
                        };
                        var initialSettings = {
                            // page size buttons (right set of buttons in demo)
                            counts: [],
                            // determines the pager buttons (left set of buttons in demo)
                            paginationMaxBlocks: 10,
                            paginationMinBlocks: 2,
                            dataset: listOfFlights
                        };
                        return new NgTableParams(initialParams, initialSettings);
                    }

                    var flightNumbers = [];
                    var flightData = [];
                    var timeStamps = [];
                    for (var octr = 0; octr < listOfFlights.length; octr++) {
                        flightNumbers.push("Flight #" + listOfFlights[octr].flight_id);
                        var flightID = listOfFlights[octr].flight_id;
                        var events = listOfFlights[octr].Events;
                        var eventsArray = [];

                        for (var ictr = 0; ictr < events.length; ictr++) {
                            var xaxis = events[ictr].time;

                            if(!(timeStamps.indexOf(xaxis)>=0))
                                timeStamps.push(xaxis);

                            var yaxis = events[ictr].bags;
                            if (!yaxis)
                                yaxis = 0;
                            var event = {};
                            event["x"] = xaxis;
                            event["y"] = yaxis;
                            eventsArray.push(event);
                        }

                        var dataEntry = {};
                        dataEntry["name"] = "flight #" + flightID;
                        dataEntry["data"] = eventsArray;
                        flightData.push(dataEntry);

                    }

                    timeStamps = timeStamps.sort();
                    flightNumbers = flightNumbers.sort();
                    var chartData = [];
                    var totalBags = [];
                    var lineChartData = [];
                    for(var octr=0;octr<flightData.length;octr++){
                        var flightEvents = {};
                        flightEvents["name"] = flightData[octr].name;
                        var flightBags = [];

                        var timeEvents = flightData[octr].data;
                        var existingTimeStamps = [];

                        for(var ictr=0;ictr<timeEvents.length;ictr++){
                            existingTimeStamps.push(timeEvents[ictr].x)
                        }

                        for(var ictr=0;ictr<timeStamps.length;ictr++){
                            var index = existingTimeStamps.indexOf(timeStamps[ictr]);
                            if(index>=0){
                                /*var total=0;
                                for(var ctr=0;ctr<flightBags.length;ctr++){
                                    total += flightBags[ctr];
                                }
                                total += timeEvents[index].y;*/
                                if(flightBags[flightBags.length-1]+timeEvents[index].y)
                                    flightBags.push(flightBags[flightBags.length-1]+timeEvents[index].y);
                                else 
                                    flightBags.push(0);
                            }
                            else{ // timestamp does not exist
                                if(flightBags[flightBags.length-1])
                                    flightBags.push(flightBags[flightBags.length-1]);
                                else
                                    flightBags.push(0);
                            }
                        }
                        flightEvents["data"] = flightBags;
                        chartData.push(flightEvents);
                        totalBags.push(flightEvents.data);
                    }

                    //console.log(totalBags);    

                    var lineChartData = [];
                    for (var col = 0; col < totalBags[0].length; col++)
                    {
                        var total = 0;
                        for (var row = 0; row < totalBags.length; row++)
                            total += totalBags[row][col];
                        lineChartData.push(total);
                    }

                    var barChartConfig = {
                        chart: {
                            type: 'column',
                            options3d: {
                                enabled: true,
                                alpha: 15,
                                beta: 15,
                                viewDistance: 25,
                                depth: 40
                            }
                        },

                        title: {
                            text: 'No of Bags on Carousel vs Time (per Flight)',
                            style : {
                                fontWeight:'bold',
                                fontStyle:'italic',
                                fontFamily:'Calibri',
                                color:'black',
                                fontSize: '24'
                            }
                        },
                        xAxis: {
                            title: {
                                text: 'Time',
                                style : {
                                    fontWeight:'bold',
                                    color:'black',
                                    fontSize: '24'
                                }
                            },
                            categories: timeStamps
                        },
                        yAxis: {
                            title: {
                                text: 'No.of bags',
                                style : {
                                    fontWeight:'bold',
                                    color:'black',
                                    fontSize: '24'
                                }
                            },
                            min: 0,
                            max:40,
                            stackLabels: {
                                enabled: true,
                                style: {
                                    fontWeight: 'bolder',
                                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray',
                                    fontSize: '24'
                                }
                            }
                        },
                        options: {
                            chart: {
                                type: 'column'
                            },
                            legend: {
                                align: 'right',
                                x: -70,
                                verticalAlign: 'top',
                                y: 20,
                                floating: true,
                                backgroundColor:(Highcharts.theme && Highcharts.theme.textColor) || 'white',
                                borderColor: '#CCC',
                                borderWidth: 1,
                                shadow: false
                            },
                            tooltip: {
                                formatter: function() {
                                    return '<b>'+ this.x +'</b><br/>'+
                                        this.series.name +': '+ this.y +'<br/>'+
                                        'Total: '+ this.point.stackTotal;
                                }
                            },
                            plotOptions: {
                                column: {
                                    stacking: 'normal',
                                    dataLabels: {
                                        enabled: true,
                                        color:  'white',
                                        style: {
                                            textShadow: '0 0 3px black, 0 0 3px black'
                                        }
                                    }
                                }
                            }},
                        series: chartData
                    };

                    $scope.barChartConfig = barChartConfig;

                    var lineChartConfig = {
                        options: {
                            chart: {
                                type: 'line'
                            }
                        },
                        series: [{
                            data: lineChartData,
                            name: 'TOTAL NO OF BAGS'
                        }],
                        xAxis: {
                            title: {
                                text: 'Time',
                                style : {
                                    fontWeight:'bold',
                                    color:'black',
                                    fontSize: '24'
                                }
                            },
                            categories: timeStamps
                        },
                        yAxis: {
                            title: {
                                text: 'Total no. of bags',
                                style : {
                                    fontWeight:'bold',
                                    color:'black',
                                    fontSize: '24'
                                }
                            }
                        },
                        tooltip: {
                            formatter: function() {
                                return 'TIME: '+ this.x +'<br/>'+
                                    this.series.name +': '+ this.y +'<br/>';
                            }
                        },
                        title: {
                            text: 'Total No of Bags on Carousel vs Time',
                            style : {
                                fontWeight:'bold',
                                fontStyle:'italic',
                                fontFamily:'Calibri',
                                color:'black',
                                fontSize: '24'
                            }
                        },
                        loading: false
                    };
                    //console.log(lineChartData);    
                    $scope.lineChartConfig = lineChartConfig;

                }, function errorCallback(response) {
                    alert("error retrieving carousel details");
                });


                return "You have selected: Carousel " + $scope.selectedItem;
            } else {
                return "Please select a Carousel";
            }
        }

        $interval(function(){
            if($scope.showCarousel==true) {
                console.log("reloading..");
                getCarouselDetails();
            }
        },10000);


    }]);

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
    .controller('DashboardCtrl', ["$scope", "Dashboard", "$interval", "NgTableParams", function($scope, Dashboard, $interval, NgTableParams) {

        var dashboardDetailsPromise =  Dashboard.query(getDashboardDetails);

        function getDashboardDetails() {

            var dashboardDetails = [];

            for(var ctr=0;ctr<dashboardDetailsPromise.length;ctr++){
                dashboardDetails.push(dashboardDetailsPromise[ctr]);
            }

            $scope.tableParams = createUsingFullOptions();

            function createUsingFullOptions() {
                var initialParams = {
                    count: 10 // initial page size
                };
                var initialSettings = {
                    // page size buttons (right set of buttons in demo)
                    counts: [],
                    // determines the pager buttons (left set of buttons in demo)
                    paginationMaxBlocks: 10,
                    paginationMinBlocks: 2,
                    dataset: dashboardDetails
                };
                return new NgTableParams(initialParams, initialSettings);
            }

            var red=0;
            var green=0;
            var orange=0;
            for(var ctr=0;ctr<dashboardDetails.length;ctr++){
                if(dashboardDetails[ctr].carouselStatus==='OK')
                    green++;
                else if(dashboardDetails[ctr].carouselStatus==='WARNING')
                    orange++;
                else if(dashboardDetails[ctr].carouselStatus==='DANGER')
                    red++;
            }

            var pieChartConfig = {
                chart: {
                    renderTo: 'container',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Carousel Status',
                    style : {
                        fontWeight:'bold',
                        fontStyle:'italic',
                        fontFamily:'Calibri',
                        color:'black',
                        fontSize: '24'
                    }

                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                    percentageDecimals: 1,
                    style : {
                        fontWeight:'bold',
                        fontStyle:'italic',
                        fontFamily:'Calibri',
                        color:'black',
                        fontSize: '18'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000',
                            formatter: function () {
                                return '<b>' + this.point.name + '</b>: ' + this.percentage + ' %';
                            }
                        },
                        showInLegend: true,
                        style : {
                            fontWeight:'bold',
                            fontStyle:'italic',
                            fontFamily:'Calibri',
                            color:'black',
                            fontSize: '18'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Carousel Status',
                    data: [{
                        name: 'Danger',
                        color: 'lightcoral',
                        y:red,
                        sliced: true
                    }, {
                        name: 'Ok',
                        color: 'lightgreen',
                        y:green,
                        sliced: true
                    }, {
                        name: 'Warning',
                        color: 'lightsalmon',
                        y:orange,
                        sliced: true
                    }]
                }]
            };

            $scope.pieChartConfig = pieChartConfig;

        };

        $interval(function(){
            console.log("Reloading data ...");
            dashboardDetailsPromise =  Dashboard.query(getDashboardDetails);
            getDashboardDetails();
        },10000);

    }]);
