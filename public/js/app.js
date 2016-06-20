'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp',
        ['ui.router', 'ui.bootstrap', 'myApp.dashboard','myApp.carouseldetail', 'templates','highcharts-ng','ngTable',
        'ncy-angular-breadcrumb', 'ngMaterial', 'ngResource', 'ngMessages', 'md.data.table'])

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
 * Created by Akash on 6/12/2016.
 */
angular.module('myApp.carouseldetail', ['ngResource', 'ui.router','ui.select','ngMaterial',
        'ngResource','angularUtils.directives.dirPagination','nvd3','highcharts-ng'])

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
 * Sand-Signika theme for Highcharts JS
 * @author Torstein Honsi
 */

// Load the fonts
/*
Highcharts.createElement('link', {
    href: 'https://fonts.googleapis.com/css?family=Signika:400,700',
    rel: 'stylesheet',
    type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

// Add the background image to the container
Highcharts.wrap(Highcharts.Chart.prototype, 'getContainer', function (proceed) {
    proceed.call(this);
    this.container.style.background = 'url(http://www.highcharts.com/samples/graphics/sand.png)';
});


Highcharts.theme = {
    colors: ["#f45b5b", "#8085e9", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
        "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
    chart: {
        backgroundColor: null,
        style: {
            fontFamily: "Signika, serif"
        }
    },
    title: {
        style: {
            color: 'black',
            fontSize: '16px',
            fontWeight: 'bold'
        }
    },
    subtitle: {
        style: {
            color: 'black'
        }
    },
    tooltip: {
        borderWidth: 0
    },
    legend: {
        itemStyle: {
            fontWeight: 'bold',
            fontSize: '13px'
        }
    },
    xAxis: {
        labels: {
            style: {
                color: '#6e6e70'
            }
        }
    },
    yAxis: {
        labels: {
            style: {
                color: '#6e6e70'
            }
        }
    },
    plotOptions: {
        series: {
            shadow: true
        },
        candlestick: {
            lineColor: '#404048'
        },
        map: {
            shadow: false
        }
    },

    // Highstock specific
    navigator: {
        xAxis: {
            gridLineColor: '#D0D0D8'
        }
    },
    rangeSelector: {
        buttonTheme: {
            fill: 'white',
            stroke: '#C0C0C8',
            'stroke-width': 1,
            states: {
                select: {
                    fill: '#D0D0D8'
                }
            }
        }
    },
    scrollbar: {
        trackBorderColor: '#C0C0C8'
    },

    // General
    background2: '#E0E0E8'

};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);*/

/**
 * Created by Akash on 6/19/2016.
 */
'use strict';

angular.module('highcharts-ng', [])
    .directive('highchart', function () {

        function prependMethod(obj, method, func) {
            var original = obj[method];
            obj[method] = function () {
                var args = Array.prototype.slice.call(arguments);
                func.apply(this, args);
                if(original) {
                    return original.apply(this, args);
                }  else {
                    return;
                }

            };
        }

        function deepExtend(destination, source) {
            for (var property in source) {
                if (source[property] && source[property].constructor &&
                    source[property].constructor === Object) {
                    destination[property] = destination[property] || {};
                    deepExtend(destination[property], source[property]);
                } else {
                    destination[property] = source[property];
                }
            }
            return destination;
        }

        var seriesId = 0;
        var ensureIds = function (series) {
            series.forEach(function (s) {
                if (!angular.isDefined(s.id)) {
                    s.id = "series-" + seriesId++;
                }
            });
        }

        var defaultOptions = {
            chart: {
                events: {}
            },
            title: {},
            series: [],
            navigator: {enabled: false}
        }

        var getMergedOptions = function (scope, element, config) {
            var mergedOptions = {}
            if (config.options) {
                mergedOptions = deepExtend(defaultOptions, config.options);
            } else {
                mergedOptions = defaultOptions;
            }
            mergedOptions.chart.renderTo = element[0];
            if(config.xAxis) {
                prependMethod(mergedOptions.chart.events, 'selection', function(e){
                    var thisChart = this;
                    if(e.xAxis) {
                        scope.$apply(function () {
                            scope.config.xAxis.currentMin = e.xAxis[0].min;
                            scope.config.xAxis.currentMax = e.xAxis[0].max;
                        });
                    } else {
                        //handle reset button - zoom out to all
                        scope.$apply(function () {
                            scope.config.xAxis.currentMin = thisChart.xAxis[0].dataMin;
                            scope.config.xAxis.currentMax = thisChart.xAxis[0].dataMax;
                        });
                    }
                });

                prependMethod(mergedOptions.chart.events, 'addSeries', function(e){
                    scope.config.xAxis.currentMin = this.xAxis[0].min || scope.config.xAxis.currentMin;
                    scope.config.xAxis.currentMax = this.xAxis[0].max || scope.config.xAxis.currentMax;
                });
            }

            if(config.xAxis) {
                mergedOptions.xAxis = angular.copy(config.xAxis)
            }
            if(config.title) {
                mergedOptions.title = config.title
            }
            return mergedOptions
        }

        var updateZoom = function (axis, modelAxis) {
            var extremes = axis.getExtremes();
            if(modelAxis.currentMin !== extremes.dataMin || modelAxis.currentMax !== extremes.dataMax) {
                axis.setExtremes(modelAxis.currentMin, modelAxis.currentMax, false);
            }
        }

        var processExtremes = function(chart, axis) {
            if(axis.currentMin || axis.currentMax) {
                chart.xAxis[0].setExtremes(axis.currentMin, axis.currentMax, true);
            }
        }

        var processSeries = function(chart, series) {
            var ids = []
            if(series) {
                ensureIds(series);

                //Find series to add or update
                series.forEach(function (s) {
                    ids.push(s.id)
                    var chartSeries = chart.get(s.id);
                    if (chartSeries) {
                        chartSeries.update(angular.copy(s), false);
                    } else {
                        chart.addSeries(angular.copy(s), false)
                    }
                });
            }

            //Now remove any missing series
            for(var i = chart.series.length - 1; i >= 0; i--) {
                var s = chart.series[i];
                if (ids.indexOf(s.options.id) < 0) {
                    s.remove(false);
                }
            };

        }

        var initialiseChart = function(scope, element, config) {
            config || (config = {});
            var mergedOptions = getMergedOptions(scope, element, config);
            var chart = config.useHighStocks ? new Highcharts.StockChart(mergedOptions) : new Highcharts.Chart(mergedOptions);
            if(config.xAxis) {
                processExtremes(chart, config.xAxis);
            }
            processSeries(chart, config.series);
            if(config.loading) {
                chart.showLoading()
            }
            chart.redraw();
            return chart;
        }


        return {
            restrict: 'EAC',
            replace: true,
            template: '<div></div>',
            scope: {
                config: '='
            },
            link: function (scope, element, attrs) {

                var chart = initialiseChart(scope, element, scope.config);

                scope.$watch("config.series", function (newSeries, oldSeries) {
                    //do nothing when called on registration
                    if (newSeries === oldSeries) return;
                    processSeries(chart, newSeries);
                    chart.redraw();
                }, true);

                scope.$watch("config.title", function (newTitle) {
                    chart.setTitle(newTitle, true);
                }, true);

                scope.$watch("config.loading", function (loading) {
                    if(loading) {
                        chart.showLoading()
                    } else {
                        chart.hideLoading()
                    }
                });

                scope.$watch("config.useHighStocks", function (useHighStocks) {
                    chart.destroy();
                    chart = initialiseChart(scope, element, scope.config);
                });

                scope.$watch("config.xAxis", function (newAxes, oldAxes) {
                    if (newAxes === oldAxes) return;
                    if(newAxes) {
                        chart.xAxis[0].update(newAxes);
                        updateZoom(chart.xAxis[0], angular.copy(newAxes));
                        chart.redraw();
                    }
                }, true);
                scope.$watch("config.options", function (newOptions, oldOptions, scope) {
                    //do nothing when called on registration
                    if (newOptions === oldOptions) return;
                    chart.destroy();
                    chart = initialiseChart(scope, element, scope.config);

                }, true);
            }
        }
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
    .controller('CarouselDetailCtrl', ["$scope", "CarouselDetail", "$http", "BASEURL", "$interval", function($scope, CarouselDetail, $http, BASEURL, $interval) {

        $http({
            method: 'GET',
            url: BASEURL + '/api/v1/getAllCarouselsId'
        }).then(function successCallback(response) {
            var carouselIDList = response.data.Carousel_ids;
            $scope.carouselIDList = carouselIDList;
            $scope.showCarousel = false;
            console.log("getting all carousel list");
            console.log($scope.showCarousel);
        }, function errorCallback(response) {
            alert("error retrieving carousel list");
        });

        $scope.displayCarouselDetails = function(){
            $scope.showCarousel = true;
            getCarouselDetails();
        }

        function getCarouselDetails(){

            if ($scope.selectedItem !== false) {
                //$scope.showCarousel = true;
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
                    console.log("CONSTRUCTING CHART DATA");
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
                                console.log(timeEvents[index].y);
                                flightBags.push(timeEvents[index].y);
                            }
                            else{ // timestamp does not exist
                                flightBags.push(0);
                            }
                        }
                        flightEvents["data"] = flightBags;
                        chartData.push(flightEvents);
                    }

                    var chartConfig = {
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
                            text: 'LOAD ON CAROUSEL',
                            style : {
                                fontWeight:'bold',
                                fontStyle:'italic',
                                fontFamily:'Calibri',
                                color:'black'
                            }
                        },
                        xAxis: {
                            title: {
                                text: 'time',
                                style : {
                                    fontWeight:'bold',
                                    color:'black'
                                }
                            },
                            categories: timeStamps
                        },
                        yAxis: {
                            title: {
                                text: 'time',
                                style : {
                                    fontWeight:'bold',
                                    color:'black'
                                }
                            },
                            min: 0,
                            max:40,
                            stackLabels: {
                                enabled: true,
                                style: {
                                    fontWeight: 'bold',
                                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
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

                    $scope.chartConfig = chartConfig;

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
        },5000);


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


            console.log(dashboardDetails);

            //$scope.dashboardTable = dashboardDetails;
            //$scope.tableParams = new NgTableParams({}, { dataset: $scope.dashboardTable});
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
                /*chart: {
                 type: 'bar'
                 },
                 title: {
                 text: 'Stacked bar chart'
                 },
                 xAxis: {
                 categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
                 },
                 yAxis: {
                 min: 0,
                 title: {
                 text: 'Total fruit consumption'
                 }
                 },
                 legend: {
                 reversed: true
                 },
                 plotOptions: {
                 series: {
                 stacking: 'normal'
                 }
                 },
                 series: [{
                 name: 'John',
                 data: [5, 3, 4, 7, 2]
                 }, {
                 name: 'Jane',
                 data: [2, 2, 3, 2, 1]
                 }, {
                 name: 'Joe',
                 data: [3, 4, 4, 2, 5]
                 }]*/
                chart: {
                    renderTo: 'container',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Carousel Status'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                    percentageDecimals: 1
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
                        showInLegend: true
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
            console.log("Reloading data ...")
            getDashboardDetails();
        },50000);

    }]);
