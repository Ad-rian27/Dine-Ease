var app = angular.module('RestaurantApp', []);

app.controller('MainController', function($scope, $timeout) {
    $scope.currentView = 'dashboard';
    $scope.paymentSuccess = false;
    $scope.isProcessingPayment = false;

    $scope.menuItems = [
        {
            id: 1,
            name: 'Margherita Pizza',
            category: 'Main Course',
            price: 299,
            type: 'Veg',
            available: true,
            quantity: 1,
            image: 'images/pizza.jpg'
        },
        {
            id: 2,
            name: 'Chicken Burger',
            category: 'Main Course',
            price: 249,
            type: 'Non-Veg',
            available: true,
            quantity: 1,
            image: 'images/burger.jpg'
        },
        {
            id: 3,
            name: 'Pasta Alfredo',
            category: 'Main Course',
            price: 329,
            type: 'Veg',
            available: true,
            quantity: 1,
            image: 'images/pasta.jpg'
        },
        {
            id: 4,
            name: 'French Fries',
            category: 'Starter',
            price: 149,
            type: 'Veg',
            available: true,
            quantity: 1,
            image: 'images/fries.jpg'
        },
        {
            id: 5,
            name: 'Garlic Bread',
            category: 'Starter',
            price: 129,
            type: 'Veg',
            available: true,
            quantity: 1,
            image: 'images/garlic-bread.jpg'
        },
        {
            id: 6,
            name: 'Brownie',
            category: 'Dessert',
            price: 179,
            type: 'Veg',
            available: true,
            quantity: 1,
            image: 'images/brownie.jpg'
        },
        {
            id: 7,
            name: 'Ice Cream',
            category: 'Dessert',
            price: 149,
            type: 'Veg',
            available: true,
            quantity: 1,
            image: 'images/ice-cream.jpg'
        },
        {
            id: 8,
            name: 'Mojito',
            category: 'Beverage',
            price: 99,
            type: 'Veg',
            available: true,
            quantity: 1,
            image: 'images/mojito.jpg'
        },
        {
            id: 9,
            name: 'Cold Coffee',
            category: 'Beverage',
            price: 129,
            type: 'Veg',
            available: true,
            quantity: 1,
            image: 'images/cold-coffee.jpg'
        },
        {
            id: 10,
            name: 'Fresh Lime Soda',
            category: 'Beverage',
            price: 89,
            type: 'Veg',
            available: false,
            quantity: 1,
            image: 'images/lime-soda.jpg'
        }
    ];

    $scope.cart = [];

    $scope.addToCart = function(item) {
        if (!item.available) return;

        var existingItem = $scope.cart.find(function(cartItem) {
            return cartItem.id === item.id;
        });

        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            var itemToAdd = angular.copy(item);
            $scope.cart.push(itemToAdd);
        }
        
        item.quantity = 1;
    };

    $scope.goToPayment = function(price, context) {
        $scope.amountToPay = price;
        $scope.paymentContext = context;
        $scope.paymentSuccess = false;
        $scope.currentView = 'payment';
    };

    $scope.completePayment = function() {
        $scope.isProcessingPayment = true;
        
        $timeout(function() {
            $scope.isProcessingPayment = false;
            $scope.paymentSuccess = true;
            $scope.dummyPaymentDetails = ''; // Clear the form input
        }, 2000);
    };
    
    $scope.backToDashboard = function() {
        $scope.currentView = 'dashboard';
        $scope.paymentSuccess = false;
    };
});
