/* 
 * App JS - Reservation Form Module (Adrian)
 * Dine-Ease Restaurant Booking System
 */

var app = angular.module('restaurantApp', []);

app.controller('MainController', ['$scope', function($scope) {
    
    // Initialize Reservation Form default values
    $scope.initApp = function() {
        $scope.restaurant = {
            name: "Dine Ease",
            fullName: "Dine Ease Fine Dining & Lounge",
            tagline: "Reserve Your Exclusive Dining Experience",
            logo: "assets/images/logo.png",
            banner: "assets/images/banner.jpg"
        };

        // Dropdown options for ng-options
        $scope.tableTypes = [
            { label: 'Indoor Dining (Air Conditioned)', value: 'Indoor' },
            { label: 'Outdoor Garden Terrace', value: 'Outdoor' },
            { label: 'Rooftop VIP Lounge', value: 'Rooftop' },
            { label: 'Private Family Suite', value: 'Private Suite' }
        ];

        // Reservation Form ng-model object
        $scope.reservation = {
            customerName: '',
            email: '',
            phone: '',
            date: new Date(),
            time: '19:30',
            guests: 4,
            tableType: 'Indoor'
        };

        $scope.isSubmitted = false;
        $scope.submittedData = null;
    };

    // Form submission handler using ng-submit
    $scope.reserveTable = function(form) {
        if (form && form.$invalid) {
            alert('Please complete all required fields correctly before submitting!');
            return;
        }

        // Save submitted reservation data
        $scope.submittedData = angular.copy($scope.reservation);
        $scope.isSubmitted = true;
    };

    // Reset form for a new reservation
    $scope.resetForm = function() {
        $scope.isSubmitted = false;
        $scope.submittedData = null;
        $scope.reservation = {
            customerName: '',
            email: '',
            phone: '',
            date: new Date(),
            time: '19:30',
            guests: 4,
            tableType: 'Indoor'
        };
    };

}]);
