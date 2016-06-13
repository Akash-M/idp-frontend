'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp',
    ['ui.router', 'myApp.dashboard','myApp.carouseldetail', 'templates',
        'ncy-angular-breadcrumb', 'ngMaterial', 'ngResource', 'ngMessages', 'ngMdIcons', 'md.data.table'])

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
angular.module('myApp.carouseldetail', ['ngResource', 'ui.router','ngMaterial',
    'ngResource','angularUtils.directives.dirPagination','angularjs-dropdown-multiselect','nvd3'])

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

        //.state(movieDetailsState.name, movieDetailsState.options);

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
angular.module('myApp.dashboard', ['ngResource', 'ui.router','ngMaterial','ngResource','angularUtils.directives.dirPagination'])

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
            controller: ["$scope", "currUser", "$mdDialog", "$mdMedia", "$mdToast", "$location", "$window", function($scope, currUser, $mdDialog, $mdMedia, $mdToast, $location, $window) {

                $scope.user = null;


                $scope.showLoginDialog = showLoginDialog;
                $scope.showSignupDialog = showSignupDialog;
                $scope.logout = logout;

                $scope.go = function ( path ) {
                    $location.path( path );
                };

                $scope.$watch(function(){
                    return currUser.loggedIn();
                }, function(loggedIn){
                    $scope.loggedIn = loggedIn;
                    if (loggedIn && !$scope.user){

                        console.log("JWT Token");
                        console.log( $window.localStorage.getItem('jwtToken'));
                        $scope.user = currUser.getUser();
                        console.log($scope.user);
                    }
                });

                /////////////////////

                function showLoginDialog(){
                    var useFullScreen = $mdMedia('xs');
                    $mdDialog.show({
                        controller: 'login', 
                        templateUrl: 'components/login-dialog/login-dialog.html',
                        clickOutsideToClose:true,
                        fullscreen: useFullScreen
                    });
                };
                function showSignupDialog(){
                    var useFullScreen = $mdMedia('xs');
                    $mdDialog.show({
                        controller: 'register',
                        templateUrl: 'components/register-dialog/register-dialog.html',
                        clickOutsideToClose:true,
                        fullscreen: useFullScreen
                    });
                };

                function logout(){
                    currUser.logout();
                }

                function showSimpleToast(txt){
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(txt)
                            .position('bottom right')
                            .hideDelay(3000)

                    );
                }
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
    .controller('CarouselDetailCtrl', ["$scope", "CarouselDetail", "$http", "BASEURL", "$element", function($scope, CarouselDetail, $http, BASEURL, $element) {

        $scope.showCarousel = false;

        $http({
            method: 'GET',
            url: BASEURL + '/api/v1/getAllCarouselsId'
        }).then(function successCallback(response) {
            var carouselIDList = response.data.Carousel_ids;
            $scope.carouselIDList = carouselIDList;
        }, function errorCallback(response) {
            alert("error retrieving carousel list");
        });

        $scope.displayCarouselDetails = function () {
            if ($scope.selectedItem !== undefined) {
                $scope.showCarousel = true;
                $http({
                    method: 'GET',
                    url: BASEURL + '/api/v1/getAllCarouselEvents/' + $scope.selectedItem
                }).then(function successCallback(response) {
                    var carouselEvents = response.data;
                    var carouselID = carouselEvents.carousel_id;
                    var listOfFlights = carouselEvents.Flights;
                    $scope.carouselID = carouselID;
                    $scope.listOfFlights = listOfFlights;
                    var flightNumbers = [];
                    var data = [];
                    for (var octr = 0; octr < listOfFlights.length; octr++) {
                        flightNumbers.push("Flight #" + listOfFlights[octr].flight_id);
                        var flightID = listOfFlights[octr].flight_id;
                        var events = listOfFlights[octr].Events;
                        var eventsArray = [];
                        for (var ictr = 0; ictr < events.length; ictr++) {
                            var xaxis = events[ictr].time;
                            var yaxis = events[ictr].bags;
                            if (!yaxis)
                                yaxis = 0;
                            var event = {};
                            event["x"] = xaxis;
                            event["y"] = yaxis;
                            eventsArray.push(event);
                        }
                        var colorCode = '#' + (function co(lor) {
                                return (lor +=
                                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)])
                                && (lor.length == 6) ? lor : co(lor);
                            })('');
                        var dataEntry = {};
                        dataEntry["values"] = eventsArray;
                        dataEntry["key"] = "flight #" + flightID;
                        dataEntry["color"] = colorCode;
                        data.push(dataEntry);
                    }
                    $scope.data = data;
                    $scope.series = flightNumbers;

                }, function errorCallback(response) {
                    alert("error retrieving carousel details");
                });


                $scope.options = {
                    chart: {
                        type: 'lineChart',
                        margin: {
                            top: 20,
                            right: 20,
                            bottom: 40,
                            left: 55
                        },
                        x: function (d) {
                            return d.x;
                        },
                        y: function (d) {
                            return d.y;
                        },
                        useInteractiveGuideline: true,
                        dispatch: {
                            stateChange: function (e) {
                                console.log("stateChange");
                            },
                            changeState: function (e) {
                                console.log("changeState");
                            },
                            tooltipShow: function (e) {
                                console.log("tooltipShow");
                            },
                            tooltipHide: function (e) {
                                console.log("tooltipHide");
                            }
                        },
                        xAxis: {
                            axisLabel: 'Time'
                        },
                        yAxis: {
                            axisLabel: 'Number of Bags',
                            axisLabelDistance: -10,
                            css: {
                                'font-size':'18px'
                            }
                        }
                    }
                };

                return "You have selected: Carousel " + $scope.selectedItem;
            } else {
                return "Please select a Carousel";
            }
        }
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
    .controller('DashboardCtrl', ["$scope", "Dashboard", function($scope, Dashboard) {

        var dashboardDetailsPromise =  Dashboard.query(function(){

            var dashboardDetails = [];

            for(var ctr=0;ctr<dashboardDetailsPromise.length;ctr++){
                dashboardDetails.push(dashboardDetailsPromise[ctr]);
            }

            $scope.dashboardTable = dashboardDetails;

            $scope.pieChartLabels = ["1 Star","2 Star","3 Star","4 Star","5 Star"];
            $scope.pieChartData = [one,two,three,four,five ];

        });

    }]);
