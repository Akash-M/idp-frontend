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
    .controller('CarouselDetailCtrl', function($scope, CarouselDetail, $http, BASEURL, $interval) {

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


    });
