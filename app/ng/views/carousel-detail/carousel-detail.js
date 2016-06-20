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
    .controller('CarouselDetailCtrl', function($scope, CarouselDetail, $http, BASEURL, $interval,NgTableParams) {

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
                                var total=0;
                                for(var ctr=0;ctr<flightBags.length;ctr++){
                                    total += flightBags[ctr];
                                }
                                total += timeEvents[index].y;
                                flightBags.push(total);
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

                    console.log("total bags");
                    console.log(totalBags);
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
                            text: 'LOAD ON CAROUSEL(Stacked Bar representation)',
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
                                text: 'time',
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
                            data: lineChartData
                        }],
                        xAxis: {
                            title: {
                                text: 'Time',
                                style : {
                                    fontWeight:'bold',
                                    color:'black',
                                    fontSize: '24'
                                }
                            }
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
                                return '<b>'+ this.x +'</b><br/>'+
                                    this.series.name +': '+ this.y +'<br/>';
                            }
                        },
                        title: {
                            text: 'LOAD ON CAROUSEL(Line chart representation)',
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


    });
