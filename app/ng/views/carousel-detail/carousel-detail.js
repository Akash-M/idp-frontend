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
    .controller('CarouselDetailCtrl', function($scope, CarouselDetail, $http, BASEURL, $element) {

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
    });
