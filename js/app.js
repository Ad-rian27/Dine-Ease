var app = angular.module('restaurantApp', []);

app.controller('CartController', ['$scope', function($scope) {
    // Shared cart array for selected food items
    $scope.cart = [];

    // Add a food item to the cart or increase quantity if already present
    $scope.addToCart = function(food) {
        var existingItem = $scope.cart.find(function(item) {
            return item.name === food.name;
        });

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            $scope.cart.push({
                name: food.name,
                price: food.price,
                quantity: 1
            });
        }
    };

    // Increase the quantity of a cart item
    $scope.increaseQty = function(item) {
        item.quantity += 1;
    };

    // Decrease the quantity, or remove the item if quantity reaches zero
    $scope.decreaseQty = function(item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            $scope.removeItem(item);
        }
    };

    // Remove an item from the cart entirely
    $scope.removeItem = function(item) {
        var index = $scope.cart.indexOf(item);
        if (index > -1) {
            $scope.cart.splice(index, 1);
        }
    };

    // Calculate total for a single cart item
    $scope.getItemTotal = function(item) {
        return item.price * item.quantity;
    };

    // Calculate the running grand total for the whole cart
    $scope.getGrandTotal = function() {
        return $scope.cart.reduce(function(sum, item) {
            return sum + item.price * item.quantity;
        }, 0);
    };
}]);
