var app = angular.module('RestaurantApp', []);

app.controller('MainController', ['$scope', '$timeout', function ($scope, $timeout) {
    // ==== GLOBAL STATE & NAVIGATION ====
    $scope.currentView = 'dashboard'; // Default landing page
    $scope.pendingTablePayment = false;
    $scope.selectedCategory = 'All';
    $scope.searchQuery = '';

    $scope.categories = ['All', 'Main Course', 'Starter', 'Dessert', 'Beverage', 'Specials'];

    // Dashboard Testimonials Data
    $scope.testimonials = [
        { author: 'Sophia R.', rating: 5, comment: 'The Truffle & Wild Mushroom Risotto was pure perfection!', dish: 'Truffle Risotto' },
        { author: 'Marcus K.', rating: 5, comment: 'Pre-ordering meant our food was served 2 mins after sitting down.', dish: 'A5 Wagyu Beef' },
        { author: 'Elena P.', rating: 5, comment: 'Rooftop VIP lounge view is spectacular. Great service!', dish: 'Rooftop Lounge' }
    ];

    $scope.restaurantHours = {
        lunch: '11:30 AM - 03:30 PM',
        dinner: '06:30 PM - 11:00 PM',
        status: 'Open Now',
        address: '142 Culinary Avenue, Fine Dining District'
    };

    $scope.switchView = function (view) {
        $scope.currentView = view;
        window.scrollTo(0, 0);
    };

    $scope.selectCategory = function (cat) {
        $scope.selectedCategory = cat;
    };

    $scope.startPreOrder = function () {
        $scope.pendingTablePayment = true;
        $scope.switchView('menu');
    };

    // ==== GOUTHAM: FOOD MENU DATA ====
    $scope.menuItems = [
        { id: 101, name: 'Truffle & Wild Mushroom Risotto', category: 'Main Course', price: 2800, originalPrice: 3290, discount: '15% OFF', type: 'Veg', available: true, availableCount: 12, quantity: 1, image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 35 },
        { id: 102, name: 'A5 Wagyu Beef Steak', category: 'Main Course', price: 8500, originalPrice: 10000, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 8, quantity: 1, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 45 },
        { id: 103, name: 'Lobster Thermidor', category: 'Main Course', price: 5200, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1553240799-36bbf332a5c3?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 40 },
        { id: 104, name: 'Beluga Caviar with Blinis', category: 'Starter', price: 9500, originalPrice: 11175, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 10, quantity: 1, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 15 },
        { id: 105, name: 'Pan-Seared Foie Gras', category: 'Starter', price: 3200, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 5, quantity: 1, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 20 },
        { id: 106, name: 'Saffron Panna Cotta', category: 'Dessert', price: 1500, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 18, quantity: 1, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 10 },
        { id: 107, name: 'Gold Leaf Chocolate Ganache', category: 'Dessert', price: 2100, originalPrice: 2470, discount: '15% OFF', type: 'Veg', available: true, availableCount: 7, quantity: 1, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 15 },
        { id: 108, name: 'Vintage Dom Pérignon Champagne', category: 'Beverage', price: 18000, originalPrice: 21175, discount: '15% OFF', type: 'Veg', available: true, availableCount: 4, quantity: 1, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 5 },
        { id: 109, name: 'Artisan Smoked Old Fashioned', category: 'Beverage', price: 1800, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 10 },
        { id: 110, name: 'White Truffle Infused Martini', category: 'Beverage', price: 2200, originalPrice: null, discount: null, type: 'Veg', available: false, availableCount: 0, quantity: 1, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 5 }
    ];

    // Filter items based on category pill & search query
    $scope.getFilteredMenuItems = function () {
        return $scope.menuItems.filter(function (item) {
            var matchesCategory = ($scope.selectedCategory === 'All') ||
                ($scope.selectedCategory === 'Specials' && item.isSpecial) ||
                (item.category === $scope.selectedCategory);

            var matchesSearch = !$scope.searchQuery ||
                item.name.toLowerCase().indexOf($scope.searchQuery.toLowerCase()) !== -1 ||
                item.category.toLowerCase().indexOf($scope.searchQuery.toLowerCase()) !== -1;

            return matchesCategory && matchesSearch;
        });
    };

    $scope.getSpecialOffers = function () {
        return $scope.menuItems.filter(function (item) {
            return item.isSpecial && item.available;
        });
    };

    // ==== ANANTHU: CART / PRE-ORDER LOGIC ====
    $scope.cart = [];

    $scope.getItemInCart = function (itemId) {
        return $scope.cart.find(function (cItem) { return cItem.id === itemId; });
    };

    $scope.addToCart = function (item) {
        if (!item.available) return;
        var existingItem = $scope.cart.find(function (cartItem) { return cartItem.id === item.id; });
        if (existingItem) {
            existingItem.quantity += (item.quantity || 1);
        } else {
            var itemCopy = angular.copy(item);
            itemCopy.quantity = item.quantity || 1;
            $scope.cart.push(itemCopy);
        }
        item.quantity = 1; // Reset input field
    };

    $scope.increaseQty = function (item) {
        item.quantity += 1;
    };

    $scope.decreaseQty = function (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            $scope.removeItem(item);
        }
    };

    $scope.increaseCardQty = function (item) {
        var existingInCart = $scope.getItemInCart(item.id);
        if (existingInCart) {
            existingInCart.quantity += 1;
        } else {
            $scope.addToCart(item);
        }
    };

    $scope.decreaseCardQty = function (item) {
        var existingInCart = $scope.getItemInCart(item.id);
        if (existingInCart) {
            if (existingInCart.quantity > 1) {
                existingInCart.quantity -= 1;
            } else {
                $scope.removeItem(existingInCart);
            }
        }
    };

    $scope.removeItem = function (item) {
        var index = $scope.cart.indexOf(item);
        if (index > -1) $scope.cart.splice(index, 1);
    };

    $scope.getItemTotal = function (item) { return item.price * item.quantity; };

    $scope.getGrandTotal = function () {
        return $scope.cart.reduce(function (sum, item) { return sum + item.price * item.quantity; }, 0);
    };

    $scope.getTaxAmount = function () {
        return Math.round($scope.getGrandTotal() * 0.05); // 5% GST/Tax
    };

    $scope.getFinalPayableTotal = function () {
        var total = $scope.getGrandTotal() + $scope.getTaxAmount();
        if ($scope.pendingTablePayment) {
            total += $scope.getTablePrice();
        }
        return total;
    };

    $scope.getMaxPrepTime = function () {
        if ($scope.cart.length === 0) return 0;
        return Math.max.apply(Math, $scope.cart.map(function (item) { return item.prepTime; }));
    };

    $scope.getWaitTimeMessage = function () {
        var maxPrep = $scope.getMaxPrepTime();
        if (maxPrep === 0) return "";

        if (!$scope.pendingTablePayment || !$scope.submittedData || !$scope.submittedData.date || !$scope.submittedData.time) {
            return "Est. Prep Time: " + maxPrep + " mins";
        }

        try {
            var arrivalDate = new Date($scope.submittedData.date);
            var timeObj = new Date($scope.submittedData.time);

            if (!isNaN(timeObj.getTime())) {
                arrivalDate.setHours(timeObj.getHours(), timeObj.getMinutes(), 0, 0);
            } else if (typeof $scope.submittedData.time === 'string') {
                var parts = $scope.submittedData.time.split(':');
                if (parts.length >= 2) {
                    arrivalDate.setHours(parseInt(parts[0], 10), parseInt(parts[1], 10), 0, 0);
                }
            }

            var now = new Date();
            var diffMs = arrivalDate.getTime() - now.getTime();
            if (isNaN(diffMs)) {
                return "Est. Prep Time: " + maxPrep + " mins";
            }

            var minutesUntilArrival = Math.floor(diffMs / 60000);
            if (isNaN(minutesUntilArrival) || minutesUntilArrival < 0) {
                return "Est. Prep Time: " + maxPrep + " mins.";
            }

            if (maxPrep > minutesUntilArrival) {
                var waitTime = maxPrep - minutesUntilArrival;
                return "Prep Time: " + maxPrep + "m. Arrival in " + minutesUntilArrival + "m. Wait time: ~" + waitTime + " mins.";
            } else {
                return "Prep Time: " + maxPrep + "m. Ready exactly upon arrival!";
            }
        } catch (e) {
            return "Est. Prep Time: " + maxPrep + " mins";
        }
    };

    // Format Date/Time helper to avoid Angular filter exceptions
    $scope.formatTime = function (timeVal) {
        if (!timeVal) return '';
        if (timeVal instanceof Date && !isNaN(timeVal.getTime())) {
            var hours = timeVal.getHours();
            var minutes = timeVal.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // 0 becomes 12
            minutes = minutes < 10 ? '0' + minutes : minutes;
            return hours + ':' + minutes + ' ' + ampm;
        }
        return timeVal.toString();
    };

    // ==== GOUTHAM: PAYMENT MODULE LOGIC ====
    $scope.paymentSuccess = false;
    $scope.isProcessingPayment = false;
    $scope.paymentMethod = 'upi'; // Default: 'card', 'upi', 'netbanking', 'cash'
    $scope.selectedUpiApp = 'gpay';
    $scope.upiMode = 'vpa'; // 'vpa' or 'qr'
    $scope.promoCode = '';
    $scope.appliedDiscount = 0;
    $scope.promoApplied = false;

    $scope.cardData = {
        number: '4532 8921 3410 8821',
        expiry: '08/28',
        cvv: '842',
        name: 'Emir Abiyyu'
    };

    $scope.upiData = {
        vpa: 'emir@okaxis'
    };

    $scope.upiApps = [
        { id: 'gpay', name: 'Google Pay', iconPath: 'assets/icons/google-pay.svg' },
        { id: 'applepay', name: 'Apple Pay', iconPath: 'assets/icons/apple-pay.svg' },
        { id: 'amazonpay', name: 'Amazon Pay', iconPath: 'assets/icons/amazon-pay.svg' },
        { id: 'paypal', name: 'PayPal', iconPath: 'assets/icons/paypal.svg' }
    ];

    $scope.selectedBank = 'hdfc';
    $scope.banks = [
        { code: 'hdfc', name: 'HDFC Bank', icon: 'hgi-bank', badgeText: 'HDFC' },
        { code: 'icici', name: 'ICICI Bank', icon: 'hgi-bank', badgeText: 'ICICI' },
        { code: 'sbi', name: 'State Bank of India', icon: 'hgi-bank', badgeText: 'SBI' },
        { code: 'axis', name: 'Axis Bank', icon: 'hgi-bank', badgeText: 'AXIS' },
        { code: 'kotak', name: 'Kotak Mahindra', icon: 'hgi-bank', badgeText: 'KOTAK' },
        { code: 'other', name: 'Other 50+ Banks', icon: 'hgi-bank', badgeText: 'MORE' }
    ];

    $scope.applyPromoCode = function () {
        if (!$scope.promoCode) return;
        var code = $scope.promoCode.trim().toUpperCase();
        if (code === 'DINEEASE15' || code === 'WELCOME15' || code === 'OFFER15') {
            $scope.appliedDiscount = Math.round($scope.getGrandTotal() * 0.15);
            $scope.promoApplied = true;
            alert('🎉 Promo Code Applied Successfully! You saved ₹' + $scope.appliedDiscount);
        } else {
            alert('Invalid Promo Code! Try using DINEEASE15 for 15% OFF.');
        }
    };

    $scope.removePromoCode = function () {
        $scope.promoCode = '';
        $scope.appliedDiscount = 0;
        $scope.promoApplied = false;
    };

    $scope.getFinalPayableTotal = function () {
        var total = $scope.getGrandTotal() + $scope.getTaxAmount() - $scope.appliedDiscount;
        if (total < 0) total = 0;
        if ($scope.pendingTablePayment) {
            total += $scope.getTablePrice();
        }
        return total;
    };

    $scope.goToPayment = function (price, context) {
        var computedPrice = (typeof price === 'number') ? price : $scope.getFinalPayableTotal();
        $scope.amountToPay = computedPrice;
        $scope.paymentContext = context || ($scope.pendingTablePayment ? 'combined_order' : 'food_order');
        $scope.paymentSuccess = false;
        $scope.switchView('payment');
    };

    // ==== ORDER HISTORY LOGIC ====
    $scope.orderFilter = 'all';
    $scope.orderHistory = [
        {
            id: 'DE-984210',
            date: 'Today, 08:15 PM',
            table: 'Indoor A/C (Table #4)',
            status: 'In Kitchen',
            statusCode: 'active',
            prepTime: '12 mins remaining',
            paymentMethod: 'UPI (GPay)',
            items: [
                { name: 'Beluga Caviar with Blinis', quantity: 1, price: 9500, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80' }
            ],
            totalAmount: 9975
        },
        {
            id: 'DE-841920',
            date: 'Yesterday, 01:30 PM',
            table: 'Rooftop VIP Lounge',
            status: 'Delivered & Served',
            statusCode: 'completed',
            prepTime: 'Served',
            paymentMethod: 'Credit Card',
            items: [
                { name: 'Truffle & Wild Mushroom Risotto', quantity: 1, price: 2800, image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=500&q=80' },
                { name: 'Gold Leaf Chocolate Ganache', quantity: 1, price: 2100, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80' }
            ],
            totalAmount: 5145
        },
        {
            id: 'DE-720194',
            date: 'July 20, 2026',
            table: 'Outdoor Garden Terrace',
            status: 'Delivered & Served',
            statusCode: 'completed',
            prepTime: 'Served',
            paymentMethod: 'NetBanking (HDFC)',
            items: [
                { name: 'A5 Wagyu Beef Steak', quantity: 1, price: 8500, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80' },
                { name: 'Vintage Dom Pérignon Champagne', quantity: 1, price: 18000, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=500&q=80' }
            ],
            totalAmount: 27825
        }
    ];

    $scope.reorderItems = function (order) {
        if (!order || !order.items) return;
        angular.forEach(order.items, function (ordItem) {
            var existing = $scope.cart.find(function (i) { return i.name === ordItem.name; });
            if (existing) {
                existing.quantity += ordItem.quantity;
            } else {
                $scope.cart.push({
                    name: ordItem.name,
                    price: ordItem.price,
                    quantity: ordItem.quantity,
                    image: ordItem.image
                });
            }
        });
        alert('🛒 Items re-added to your cart successfully!');
        $scope.switchView('menu');
    };

    $scope.completePayment = function () {
        $scope.isProcessingPayment = true;

        $timeout(function () {
            $scope.isProcessingPayment = false;
            $scope.paymentSuccess = true;

            // Push to Order History
            var newOrderId = 'DE-' + Math.floor(100000 + Math.random() * 900000);
            var newOrderItems = angular.copy($scope.cart);
            $scope.orderHistory.unshift({
                id: newOrderId,
                date: 'Just Now',
                table: $scope.reservation.section || 'Indoor Dining',
                status: 'In Kitchen',
                statusCode: 'active',
                prepTime: '25 mins remaining',
                paymentMethod: $scope.paymentMethod.toUpperCase(),
                items: newOrderItems.length > 0 ? newOrderItems : [{ name: 'Table Reservation Fee', quantity: 1, price: $scope.getTablePrice(), image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80' }],
                totalAmount: $scope.amountToPay || $scope.getFinalPayableTotal()
            });

            if ($scope.paymentContext === 'food_order' || $scope.paymentContext === 'combined_order') {
                $scope.cart = [];
            }

            if ($scope.paymentContext === 'table_reservation' || $scope.paymentContext === 'combined_order') {
                $scope.pendingTablePayment = false;
            }
        }, 2000);
    };

    // ==== ADRIAN: DASHBOARD, RESERVATION & SUMMARY LOGIC ====
    $scope.occasions = ['Regular Dining', 'Birthday Celebration', 'Anniversary', 'Business Meeting', 'Romantic Date'];

    $scope.initApp = function () {
        $scope.restaurant = {
            name: "Dine Ease",
            fullName: "Dine Ease Fine Dining & Lounge",
            tagline: "Experience Culinary Excellence",
            rating: "4.9",
            totalTables: 20,
            logo: "assets/images/logo.png"
        };

        $scope.tableTypes = [
            { label: 'Indoor Dining (A/C)', value: 'Indoor', price: 200, icon: 'hgi-smart-ac', features: 'Air Conditioned • Cozy Ambience' },
            { label: 'Outdoor Garden Terrace', value: 'Outdoor', price: 300, icon: 'hgi-beach', features: 'Scenic Garden View • Open Air' },
            { label: 'Rooftop VIP Lounge', value: 'Rooftop', price: 500, icon: 'hgi-ferris-wheel', features: 'Skyline View • Live Music & Cocktail Bar' },
            { label: 'Private Family Suite', value: 'Private Suite', price: 800, icon: 'hgi-building-03', features: 'Soundproof • Personal Butler Service' }
        ];

        $scope.getTablePrice = function () {
            var data = $scope.submittedData || $scope.reservation;
            if (!data || !data.tableType) return 0;
            var selected = $scope.tableTypes.find(function (t) {
                return t.value === data.tableType;
            });
            var basePrice = selected ? selected.price : 0;
            return basePrice * (data.guests || 1);
        };

        $scope.resetForm();
    };

    $scope.resetForm = function () {
        $scope.isSubmitted = false;
        $scope.submittedData = null;
        $scope.isBooked = false;
        $scope.pendingTablePayment = false;

        $scope.reservation = {
            customerName: 'Emir Abiyyu', email: 'emir@example.com', phone: '+91 98765 43210',
            date: new Date(), time: new Date(1970, 0, 1, 19, 30, 0),
            guests: 4, tableType: 'Indoor', occasion: 'Regular Dining', specialRequests: ''
        };

        $scope.reservedTablesCount = 5;
    };

    $scope.reserveTable = function (form) {
        if (form && form.$invalid) {
            alert('Please complete all required fields correctly before submitting!');
            return;
        }

        $scope.submittedData = angular.copy($scope.reservation);
        $scope.isSubmitted = true;
        $scope.isBooked = true;

        $scope.switchView('summary');
    };

    $scope.getAvailableTables = function () {
        return $scope.restaurant.totalTables - $scope.reservedTablesCount;
    };

    $scope.getTodaysSpecialCount = function () {
        if (!$scope.menuItems) return 0;
        return $scope.menuItems.filter(function (item) { return item.isSpecial; }).length;
    };

    $scope.getDashboardCards = function () {
        return [
            {
                title: 'Available Tables',
                value: $scope.getAvailableTables(),
                subtitle: 'Out of ' + $scope.restaurant.totalTables + ' total tables',
                accentColor: '#ef4444',
                hugeicon: 'hgi-home-01'
            },
            {
                title: "Chef's Specials",
                value: $scope.getTodaysSpecialCount() + ' Dishes',
                subtitle: 'Special 15% discount today',
                accentColor: '#eab308',
                hugeicon: 'hgi-star-01'
            },
            {
                title: 'Customer Rating',
                value: $scope.restaurant.rating + ' / 5.0',
                subtitle: 'Based on 450+ verified reviews',
                accentColor: '#10b981',
                hugeicon: 'hgi-favourite'
            },
            {
                title: 'Total Menu Items',
                value: $scope.menuItems ? $scope.menuItems.length : 0,
                subtitle: 'Starters, Mains & Beverages',
                accentColor: '#3b82f6',
                hugeicon: 'hgi-restaurant-01'
            }
        ];
    };

    $scope.initApp();

}]);
