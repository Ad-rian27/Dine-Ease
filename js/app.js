/* 
 * App JS - Dashboard Module (Adrian)
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
    // Initialize Reservation Form default values
    // Initialize Dashboard datasets and properties
    $scope.initApp = function() {
        $scope.restaurant = {
            name: "Dine Ease",
            fullName: "Dine Ease Fine Dining & Lounge",
            tagline: "Reserve Your Exclusive Dining Experience",
            tagline: "Experience Culinary Excellence",
            rating: "4.9",
            totalTables: 20,
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
        $scope.reservedTablesCount = 5;

        // Dynamic style for Today's Special card (ng-style)
        $scope.todaysSpecialStyle = {
            'border-top': '4px solid #F4C430',
            'background': 'linear-gradient(135deg, #ffffff 0%, #fffdf0 100%)'
        };

        // Menu items array for calculating total items & Today's Special count
        $scope.menuItems = [
            { id: 101, name: 'Margherita Pizza', isSpecial: true },
            { id: 102, name: 'Chicken Burger', isSpecial: false },
            { id: 103, name: 'Pasta Alfredo', isSpecial: true },
            { id: 104, name: 'French Fries', isSpecial: false },
            { id: 105, name: 'Garlic Bread', isSpecial: false },
            { id: 106, name: 'Brownie', isSpecial: true },
            { id: 107, name: 'Ice Cream', isSpecial: false },
            { id: 108, name: 'Mojito', isSpecial: false },
            { id: 109, name: 'Cold Coffee', isSpecial: false },
            { id: 110, name: 'Fresh Lime Soda', isSpecial: false }
        ];
    };

    // Calculate Available Tables dynamically for Dashboard (Adrian)
    $scope.getAvailableTables = function() {
        return $scope.restaurant.totalTables - $scope.reservedTablesCount;
    };

    // Calculate Today's Special Items count
    $scope.getTodaysSpecialCount = function() {
        if (!$scope.menuItems) return 0;
        return $scope.menuItems.filter(function(item) { return item.isSpecial; }).length;
    };

    // Dashboard Cards Array for ng-repeat with images (Adrian)
    $scope.getDashboardCards = function() {
        return [
            {
                title: 'Available Tables',
                value: $scope.getAvailableTables(),
                subtitle: 'Out of ' + $scope.restaurant.totalTables + ' total tables',
                icon: 'fa-chair',
                badge: 'Live',
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
                cardStyle: { 'border-top': '4px solid #C62828' }
            },
            {
                title: "Today's Special",
                value: $scope.getTodaysSpecialCount() + ' Dishes',
                subtitle: 'Chef Recommended Items',
                icon: 'fa-star',
                badge: 'Featured',
                image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
                cardStyle: $scope.todaysSpecialStyle
            },
            {
                title: 'Customer Rating',
                value: $scope.restaurant.rating + ' / 5.0',
                subtitle: 'Based on 450+ reviews',
                icon: 'fa-heart',
                badge: 'Top Rated',
                image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
                cardStyle: { 'border-top': '4px solid #4CAF50' }
            },
            {
                title: 'Total Menu Items',
                value: $scope.menuItems ? $scope.menuItems.length : 0,
                subtitle: 'Starters, Mains & Drinks',
                icon: 'fa-utensils',
                badge: 'Fresh',
                image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
                cardStyle: { 'border-top': '4px solid #2196F3' }
            }
        ];
    };

}]);
