/*var cheapTrips = angular.module('cheapTrips', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page
    $http.get('/paths')
        .success(function() {
            console.log('success');
            comb.getFirstMinPaths();
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    //$http directive is used to communicate ot the server
    $scope.response = {}

    $scope.calculate = function () {
        //executed when submit is clicked
        console.log("inside click");
        console.log($scope.formData);

        $http.get('/paths', $scope.formData)
            .success(function (response) {
            //executed when server responds back
            console.log(response);
            $scope.response.data = response;
        });
    }
}*/
var addCity = function(event, input){
    if (event.keyCode && event.keyCode === 13 && input.value){
        window.location.href = "/add-city?name="+input.value;
    }
}

var removeCity = function(city){
    console.log('closing');
    window.location.href = "/remove-city?name="+city;
}
