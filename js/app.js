var app = angular.module('RestaurantApp', []);

app.controller('MainController', ['$scope', '$timeout', function($scope, $timeout) {
    // ==== GLOBAL STATE & NAVIGATION ====
    $scope.currentView = 'dashboard';
    $scope.pendingTablePayment = false;
    
    $scope.switchView = function(view) {
        $scope.currentView = view;
        window.scrollTo(0, 0);
    };

    $scope.startPreOrder = function() {
        $scope.pendingTablePayment = true;
        $scope.switchView('menu');
    };

    // ==== GOUTHAM: FOOD MENU DATA ====
    $scope.menuItems = [
        { id: 101, name: 'Truffle & Wild Mushroom Risotto', category: 'Main Course', price: 2800, type: 'Veg', available: true, quantity: 1, image: 'images/risotto.jpg', isSpecial: true, prepTime: 35 },
        { id: 102, name: 'A5 Wagyu Beef Steak', category: 'Main Course', price: 8500, type: 'Non-Veg', available: true, quantity: 1, image: 'images/wagyu.jpg', isSpecial: true, prepTime: 45 },
        { id: 103, name: 'Lobster Thermidor', category: 'Main Course', price: 5200, type: 'Non-Veg', available: true, quantity: 1, image: 'images/lobster.jpg', isSpecial: false, prepTime: 40 },
        { id: 104, name: 'Beluga Caviar with Blinis', category: 'Starter', price: 9500, type: 'Non-Veg', available: true, quantity: 1, image: 'images/caviar.jpg', isSpecial: true, prepTime: 15 },
        { id: 105, name: 'Pan-Seared Foie Gras', category: 'Starter', price: 3200, type: 'Non-Veg', available: true, quantity: 1, image: 'images/foie-gras.jpg', isSpecial: false, prepTime: 20 },
        { id: 106, name: 'Saffron Panna Cotta', category: 'Dessert', price: 1500, type: 'Veg', available: true, quantity: 1, image: 'images/panna-cotta.jpg', isSpecial: false, prepTime: 10 },
        { id: 107, name: 'Gold Leaf Chocolate Ganache', category: 'Dessert', price: 2100, type: 'Veg', available: true, quantity: 1, image: 'images/gold-chocolate.jpg', isSpecial: true, prepTime: 15 },
        { id: 108, name: 'Vintage Dom Pérignon Champagne', category: 'Beverage', price: 18000, type: 'Veg', available: true, quantity: 1, image: 'images/champagne.jpg', isSpecial: true, prepTime: 5 },
        { id: 109, name: 'Artisan Smoked Old Fashioned', category: 'Beverage', price: 1800, type: 'Veg', available: true, quantity: 1, image: 'images/old-fashioned.jpg', isSpecial: false, prepTime: 10 },
        { id: 110, name: 'White Truffle Infused Martini', category: 'Beverage', price: 2200, type: 'Veg', available: false, quantity: 1, image: 'images/martini.jpg', isSpecial: false, prepTime: 5 }
    ];

    // ==== ANANTHU: CART / PRE-ORDER LOGIC ====
    $scope.cart = [];
    
    $scope.addToCart = function(item) {
        if (!item.available) return;
        var existingItem = $scope.cart.find(function(cartItem) { return cartItem.id === item.id; });
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            $scope.cart.push(angular.copy(item));
        }
        item.quantity = 1; // Reset input field
        alert(item.name + " added to your cart!");
    };

    $scope.increaseQty = function(item) { item.quantity += 1; };
    $scope.decreaseQty = function(item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            $scope.removeItem(item);
        }
    };
    $scope.removeItem = function(item) {
        var index = $scope.cart.indexOf(item);
        if (index > -1) $scope.cart.splice(index, 1);
    };
    $scope.getItemTotal = function(item) { return item.price * item.quantity; };
    $scope.getGrandTotal = function() {
        return $scope.cart.reduce(function(sum, item) { return sum + item.price * item.quantity; }, 0);
    };

    $scope.getMaxPrepTime = function() {
        if ($scope.cart.length === 0) return 0;
        return Math.max.apply(Math, $scope.cart.map(function(item) { return item.prepTime; }));
    };

    $scope.getWaitTimeMessage = function() {
        var maxPrep = $scope.getMaxPrepTime();
        if (maxPrep === 0) return "";
        
        if (!$scope.pendingTablePayment || !$scope.submittedData || !$scope.submittedData.date || !$scope.submittedData.time) {
            return "Estimated Preparation Time: " + maxPrep + " mins";
        }
        
        try {
            var arrivalDate = new Date($scope.submittedData.date);
            var timeObj = new Date($scope.submittedData.time);
            
            if (!isNaN(timeObj.getTime())) {
                arrivalDate.setHours(timeObj.getHours(), timeObj.getMinutes(), 0, 0);
            } else {
                var parts = $scope.submittedData.time.toString().split(':');
                arrivalDate.setHours(parseInt(parts[0]), parseInt(parts[1]), 0, 0);
            }
            
            var now = new Date();
            var diffMs = arrivalDate - now;
            var minutesUntilArrival = Math.floor(diffMs / 60000);
            
            if (minutesUntilArrival < 0) {
                return "Estimated Prep Time: " + maxPrep + " mins."; 
            }
            
            if (maxPrep > minutesUntilArrival) {
                var waitTime = maxPrep - minutesUntilArrival;
                return "Prep Time: " + maxPrep + " mins. You arrive in " + minutesUntilArrival + " mins. You will need to wait approx " + waitTime + " mins at the table.";
            } else {
                return "Prep Time: " + maxPrep + " mins. Your food will be ready exactly when you arrive!";
            }
        } catch(e) {
            return "Estimated Preparation Time: " + maxPrep + " mins";
        }
    };

    // ==== GOUTHAM: PAYMENT MODULE LOGIC ====
    $scope.paymentSuccess = false;
    $scope.isProcessingPayment = false;
    
    $scope.goToPayment = function(price, context) {
        $scope.amountToPay = price;
        $scope.paymentContext = context;
        $scope.paymentSuccess = false;
        $scope.switchView('payment');
    };

    $scope.completePayment = function() {
        $scope.isProcessingPayment = true;
        
        $timeout(function() {
            $scope.isProcessingPayment = false;
            $scope.paymentSuccess = true;
            $scope.dummyPaymentDetails = ''; // Clear form
            
            // If paying for food, optionally clear the cart after success
            if ($scope.paymentContext === 'food_order' || $scope.paymentContext === 'combined_order') {
                $scope.cart = [];
            }
            
            if ($scope.paymentContext === 'table_reservation' || $scope.paymentContext === 'combined_order') {
                $scope.pendingTablePayment = false;
            }
        }, 2000);
    };

    // ==== ADRIAN: DASHBOARD, RESERVATION & SUMMARY LOGIC ====
    $scope.initApp = function() {
        $scope.restaurant = {
            name: "Dine Ease",
            fullName: "Dine Ease Fine Dining & Lounge",
            tagline: "Experience Culinary Excellence",
            rating: "4.9",
            totalTables: 20,
            logo: "assets/images/logo.png",
            banner: "assets/images/banner.jpg"
        };

        $scope.tableTypes = [
            { label: 'Indoor Dining (Air Conditioned) - ₹200/guest', value: 'Indoor', price: 200 },
            { label: 'Outdoor Garden Terrace - ₹300/guest', value: 'Outdoor', price: 300 },
            { label: 'Rooftop VIP Lounge - ₹500/guest', value: 'Rooftop', price: 500 },
            { label: 'Private Family Suite - ₹800/guest', value: 'Private Suite', price: 800 }
        ];

        $scope.getTablePrice = function() {
            if (!$scope.submittedData) return 0;
            var selected = $scope.tableTypes.find(function(t) {
                return t.value === $scope.submittedData.tableType;
            });
            var basePrice = selected ? selected.price : 0;
            return basePrice * $scope.submittedData.guests;
        };

        $scope.resetForm();
    };

    $scope.resetForm = function() {
        $scope.isSubmitted = false;
        $scope.submittedData = null;
        $scope.isBooked = false;
        $scope.pendingTablePayment = false;
        
        $scope.reservation = {
            customerName: '', email: '', phone: '',
            date: new Date(), time: new Date(1970, 0, 1, 19, 30, 0),
            guests: 4, tableType: 'Indoor'
        };
        
        $scope.reservedTablesCount = 5; // Dummy dynamic data
        
        $scope.todaysSpecialStyle = {
            'border-top': '4px solid #F4C430',
            'background': 'linear-gradient(135deg, #ffffff 0%, #fffdf0 100%)'
        };
    };

    // Handle Form Submission (Table Reservation)
    $scope.reserveTable = function(form) {
        if (form && form.$invalid) {
            alert('Please complete all required fields correctly before submitting!');
            return;
        }
        
        // Save submitted reservation data
        $scope.submittedData = angular.copy($scope.reservation);
        $scope.isSubmitted = true;
        $scope.isBooked = true;
        
        // Clear the form inputs for the next time
        $scope.reservation = {
            customerName: '', email: '', phone: '',
            date: new Date(), time: new Date(1970, 0, 1, 19, 30, 0),
            guests: 4, tableType: 'Indoor'
        };
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
        
        // Take them to the booking summary screen
        $scope.switchView('summary');
    };

    // Dashboard dynamic calculators
    $scope.getAvailableTables = function() { 
        return $scope.restaurant.totalTables - $scope.reservedTablesCount; 
    };
    
    $scope.getTodaysSpecialCount = function() {
        if (!$scope.menuItems) return 0;
        return $scope.menuItems.filter(function(item) { return item.isSpecial; }).length;
    };

    // Dashboard Cards setup
    $scope.getDashboardCards = function() {
        return [
            {
                title: 'Available Tables',
                value: $scope.getAvailableTables(),
                subtitle: 'Out of ' + $scope.restaurant.totalTables + ' total tables',
                cardStyle: { 'border-top': '4px solid #C62828' }
            },
            {
                title: "Today's Special",
                value: $scope.getTodaysSpecialCount() + ' Dishes',
                subtitle: 'Chef Recommended Items',
                cardStyle: $scope.todaysSpecialStyle
            },
            {
                title: 'Customer Rating',
                value: $scope.restaurant.rating + ' / 5.0',
                subtitle: 'Based on 450+ reviews',
                cardStyle: { 'border-top': '4px solid #4CAF50' }
            },
            {
                title: 'Total Menu Items',
                value: $scope.menuItems ? $scope.menuItems.length : 0,
                subtitle: 'Starters, Mains & Drinks',
                cardStyle: { 'border-top': '4px solid #2196F3' }
            }
        ];
    };

    // Initialize application on load
    $scope.initApp();

}]);
