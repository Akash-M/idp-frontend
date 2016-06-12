angular.module('myApp')
    .directive('mvToolbar', function() {
        return {
            restrict: "A",
            templateUrl: "components/toolbar/toolbar.html",
            controller: function($scope, currUser, $mdDialog, $mdMedia, $mdToast, $location, $window) {

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
            }
        }
    });