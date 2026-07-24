/* 
 * App JS - Booking Summary Module (Adrian)
 * Dine-Ease Restaurant Booking System
 */

var app = angular.module('restaurantApp', []);

app.controller('MainController', ['$scope', function($scope) {
    
    // Initialize Booking Summary data
    $scope.initApp = function() {
        $scope.restaurant = {
            name: "Dine Ease",
            fullName: "Dine Ease Fine Dining & Lounge"
        };

        // Booking visibility state (controls ng-show)
        $scope.isBooked = true;

        // Booking details object
        $scope.bookingDetails = {
            customerName: "John",
            tableType: "Indoor",
            date: new Date('2026-07-25T19:30:00'),
            time: "7:30 PM",
            guests: 4,
            phone: "9876543210"
        };

        // Pre-ordered food items array
        $scope.orderedItems = [
            { name: "Pizza", qty: 2, price: 299 },
            { name: "Burger", qty: 1, price: 249 },
            { name: "Mojito", qty: 2, price: 99 }
        ];

        // Grand total
        $scope.grandTotal = 1450;
    };

    // Helper method to toggle summary view
    $scope.toggleSummary = function() {
        $scope.isBooked = !$scope.isBooked;
    };

}]);
