var cheapTrips = angular.module('cheap-trips', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page
    $http.get('/paths')
        .success(function() {
            console.log('success');
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.createTodo = function() {
        $http.post('/paths', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}