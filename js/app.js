var app = angular.module('RestaurantApp', []);

app.controller('MainController', ['$scope', '$timeout', '$interval', function ($scope, $timeout, $interval) {
    // ==== GLOBAL STATE & NAVIGATION ====
    $scope.currentView = 'dashboard'; // Default landing page
    $scope.pendingTablePayment = false;
    $scope.selectedCategory = 'All';
    $scope.searchQuery = '';

    // ==== DYNAMIC DEAL OF THE DAY COUNTDOWN TIMER ====
    function calculateSecondsUntilMidnight() {
        var now = new Date();
        var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        var diff = Math.floor((midnight.getTime() - now.getTime()) / 1000);
        return diff > 0 ? diff : 86400;
    }

    $scope.dealSecondsRemaining = calculateSecondsUntilMidnight();

    $scope.getFormattedDealTimer = function () {
        var sec = $scope.dealSecondsRemaining;
        if (sec <= 0) return '00 : 00 : 00';
        var hours = Math.floor(sec / 3600);
        var minutes = Math.floor((sec % 3600) / 60);
        var seconds = sec % 60;

        var pad = function (n) { return n < 10 ? '0' + n : '' + n; };
        return pad(hours) + ' : ' + pad(minutes) + ' : ' + pad(seconds);
    };

    var dealTimerPromise = $interval(function () {
        if ($scope.dealSecondsRemaining > 0) {
            $scope.dealSecondsRemaining--;
        } else {
            $scope.dealSecondsRemaining = calculateSecondsUntilMidnight();
        }
    }, 1000);

    $scope.$on('$destroy', function () {
        if (dealTimerPromise) {
            $interval.cancel(dealTimerPromise);
        }
    });

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

    $scope.isViewActive = function (viewName) {
        if (!viewName || !$scope.currentView) return false;
        if (viewName === 'dashboard') {
            return $scope.currentView === 'dashboard';
        }
        if (viewName === 'reservation') {
            return $scope.currentView === 'reservation' || $scope.currentView === 'summary';
        }
        if (viewName === 'menu') {
            return $scope.currentView === 'menu' || $scope.currentView === 'cart';
        }
        if (viewName === 'orders') {
            return $scope.currentView === 'orders';
        }
        return false;
    };

    $scope.selectCategory = function (cat) {
        $scope.selectedCategory = cat;
    };

    $scope.startPreOrder = function () {
        $scope.pendingTablePayment = true;
        $scope.switchView('menu');
    };

    // ==== MULTI-RESTAURANT DATASET ====
    $scope.searchState = {
        restaurantQuery: '',
        cuisineFilter: 'All'
    };
    $scope.restaurantSearchQuery = '';
    $scope.selectedCuisineFilter = 'All';
    $scope.cuisinesList = ['All', 'Global Contemporary', 'French Haute Cuisine', 'Omakase & Teppanyaki', 'Modern Indian & Awadhi', 'Authentic Italian & Woodfired', 'Prime Aged Steaks & Wine Bar'];

    $scope.restaurants = [
        {
            id: 'dine_ease',
            name: "Dine Ease Fine Dining & Lounge",
            shortName: "Dine Ease",
            cuisine: "Global Contemporary",
            rating: 4.9,
            priceRange: "₹₹₹₹",
            avgCost: "₹2,200 for two",
            distance: "0.8 km",
            totalTables: 20,
            reservedTablesCount: 5,
            address: "142 Culinary Avenue, Fine Dining District",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
            tagline: "Experience Global Culinary Excellence",
            features: ['Rooftop VIP', 'Live Music', 'Valet Parking', 'Cocktail Bar'],
            tableTypes: [
                { label: 'Indoor Dining (A/C)', value: 'Indoor', price: 200, icon: 'hgi-smart-ac', features: 'Air Conditioned • Cozy Ambience' },
                { label: 'Outdoor Garden Terrace', value: 'Outdoor', price: 300, icon: 'hgi-beach', features: 'Scenic Garden View • Open Air' },
                { label: 'Rooftop VIP Lounge', value: 'Rooftop', price: 500, icon: 'hgi-ferris-wheel', features: 'Skyline View • Live Music & Cocktail Bar' },
                { label: 'Private Family Suite', value: 'Private Suite', price: 800, icon: 'hgi-building-03', features: 'Soundproof • Personal Butler Service' }
            ]
        },
        {
            id: 'letoile',
            name: "L'Étoile French Bistro",
            shortName: "L'Étoile",
            cuisine: "French Haute Cuisine",
            rating: 4.8,
            priceRange: "₹₹₹",
            avgCost: "₹2,500 for two",
            distance: "1.4 km",
            totalTables: 16,
            reservedTablesCount: 4,
            address: "88 Rue de Paris, Fine Dining District",
            image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
            tagline: "Authentic Parisian Gastronomy & Fine Wine",
            features: ['Wine Cellar', 'Patio Seating', 'Sommelier', 'Pastry Chef'],
            tableTypes: [
                { label: 'Bistro Main Hall', value: 'Indoor', price: 250, icon: 'hgi-smart-ac', features: 'Classic Parisian Décor • Chandeliers' },
                { label: 'Champs Terrace', value: 'Outdoor', price: 350, icon: 'hgi-beach', features: 'Sidewalk Patio • Street Ambiance' },
                { label: 'Cellar VIP Room', value: 'Private Suite', price: 750, icon: 'hgi-building-03', features: 'Vintage Wine Cellar • Sommelier Service' }
            ]
        },
        {
            id: 'sakura',
            name: "Sakura Japanese Lounge",
            shortName: "Sakura",
            cuisine: "Omakase & Teppanyaki",
            rating: 4.9,
            priceRange: "₹₹₹₹",
            avgCost: "₹3,000 for two",
            distance: "2.1 km",
            totalTables: 18,
            reservedTablesCount: 6,
            address: "204 Sakura Lane, Asian Culinary District",
            image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80",
            tagline: "Master Omakase & Premium Sake Bar",
            features: ['Omakase Bar', 'Zen Garden', 'Sake Sommelier', 'Teppanyaki Live'],
            tableTypes: [
                { label: 'Sushi Counter', value: 'Indoor', price: 300, icon: 'hgi-smart-ac', features: 'Chef Interaction • Fresh Sashimi Cut' },
                { label: 'Zen Garden Booth', value: 'Outdoor', price: 400, icon: 'hgi-beach', features: 'Bonsai Garden • Water Fountain' },
                { label: 'Teppanyaki VIP Grill Room', value: 'Private Suite', price: 900, icon: 'hgi-building-03', features: 'Private Live Chef • Sake Pairing' }
            ]
        },
        {
            id: 'aroma_spice',
            name: "Aroma Spice Royal Dining",
            shortName: "Aroma Spice",
            cuisine: "Modern Indian & Awadhi",
            rating: 4.7,
            priceRange: "₹₹₹",
            avgCost: "₹1,800 for two",
            distance: "1.8 km",
            totalTables: 15,
            reservedTablesCount: 3,
            address: "55 Spice Garden Way, Culinary Hub",
            image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
            tagline: "Heritage Royal Recipes & Smoked Tandoor",
            features: ['Awadhi Thali', 'Live Sitar', 'Courtyard Firepit', 'Royal Decor'],
            tableTypes: [
                { label: 'Royal Darbar Hall', value: 'Indoor', price: 200, icon: 'hgi-smart-ac', features: 'Royal Palace Ambience • Live Sitar' },
                { label: 'Courtyard Lawn', value: 'Outdoor', price: 300, icon: 'hgi-beach', features: 'Open Air Firepits • Lantern Light' },
                { label: 'Nawab Maharajah Suite', value: 'Private Suite', price: 700, icon: 'hgi-building-03', features: 'Personal Butler • Awadhi Thali Service' }
            ]
        },
        {
            id: 'bella_italia',
            name: "Trattoria Bella Italia",
            shortName: "Bella Italia",
            cuisine: "Authentic Italian & Woodfired",
            rating: 4.8,
            priceRange: "₹₹₹",
            avgCost: "₹1,900 for two",
            distance: "3.0 km",
            totalTables: 16,
            reservedTablesCount: 4,
            address: "12 Via Napoli, Gourmet Arcade",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
            tagline: "Handmade Pasta & Woodfired Neapolitan Pizza",
            features: ['Woodfired Oven', 'Al Fresco Terrace', 'Handmade Pasta', 'Gelato Bar'],
            tableTypes: [
                { label: 'Main Trattoria Room', value: 'Indoor', price: 200, icon: 'hgi-smart-ac', features: 'Rustic Brick Décor • Open Kitchen' },
                { label: 'Tuscan Piazza Terrace', value: 'Outdoor', price: 300, icon: 'hgi-beach', features: 'String Light Patio • Olive Trees' },
                { label: 'Private Vineyard Room', value: 'Private Suite', price: 650, icon: 'hgi-building-03', features: 'Private Wine Cabinet • Chianti Tasting' }
            ]
        },
        {
            id: 'el_fuego',
            name: "El Fuego Steakhouse & Grill",
            shortName: "El Fuego",
            cuisine: "Prime Aged Steaks & Wine Bar",
            rating: 4.9,
            priceRange: "₹₹₹₹",
            avgCost: "₹3,500 for two",
            distance: "2.5 km",
            totalTables: 14,
            reservedTablesCount: 14,
            address: "77 Flame Boulevard, Uptown Towers",
            image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
            tagline: "Oak-Smoked Aged Steaks & Bourbon Cocktails",
            features: ['Dry-Aged Steaks', 'Whiskey Lounge', 'Sommelier Pairing', 'Chef Table'],
            tableTypes: [
                { label: 'Prime Grill Dining', value: 'Indoor', price: 300, icon: 'hgi-smart-ac', features: 'Leather Booths • Open Charcoal Grill' },
                { label: 'Skyline Terrace', value: 'Outdoor', price: 450, icon: 'hgi-beach', features: 'Panoramic City Views • Firepit Lounge' },
                { label: 'Executive Bourbon Room', value: 'Private Suite', price: 850, icon: 'hgi-building-03', features: 'Private Bar • Master Butcher Tasting' }
            ]
        }
    ];

    $scope.getCuisinesList = function () {
        if (!$scope.restaurants) return ['All'];
        var set = ['All'];
        angular.forEach($scope.restaurants, function (res) {
            if (res.cuisine && set.indexOf(res.cuisine) === -1) {
                set.push(res.cuisine);
            }
        });
        return set;
    };

    $scope.selectCuisineFilter = function (cuisine) {
        $scope.searchState.cuisineFilter = cuisine;
        $scope.selectedCuisineFilter = cuisine;
    };

    $scope.clearRestaurantSearch = function () {
        $scope.searchState.restaurantQuery = '';
        $scope.searchState.cuisineFilter = 'All';
        $scope.restaurantSearchQuery = '';
        $scope.selectedCuisineFilter = 'All';
    };

    $scope.getFilteredRestaurants = function () {
        if (!$scope.restaurants) return [];
        var rawQ = ($scope.searchState && $scope.searchState.restaurantQuery) || $scope.restaurantSearchQuery || '';
        var q = rawQ.trim().toLowerCase();
        var selCuisine = ($scope.searchState && $scope.searchState.cuisineFilter) || $scope.selectedCuisineFilter || 'All';

        return $scope.restaurants.filter(function (res) {
            var matchesCuisine = (selCuisine === 'All') || (res.cuisine === selCuisine);
            if (!matchesCuisine) return false;

            if (!q) return true;

            var inName = res.name && res.name.toLowerCase().indexOf(q) !== -1;
            var inShort = res.shortName && res.shortName.toLowerCase().indexOf(q) !== -1;
            var inCuisine = res.cuisine && res.cuisine.toLowerCase().indexOf(q) !== -1;
            var inTagline = res.tagline && res.tagline.toLowerCase().indexOf(q) !== -1;
            var inAddress = res.address && res.address.toLowerCase().indexOf(q) !== -1;

            var inFeatures = false;
            if (res.features && res.features.length) {
                inFeatures = res.features.some(function (f) { return f.toLowerCase().indexOf(q) !== -1; });
            }

            var inMenuItems = false;
            if ($scope.menuItems) {
                inMenuItems = $scope.menuItems.some(function (item) {
                    return item.restaurantId === res.id && item.name.toLowerCase().indexOf(q) !== -1;
                });
            }

            return inName || inShort || inCuisine || inTagline || inAddress || inFeatures || inMenuItems;
        });
    };

    $scope.selectedRestaurant = $scope.restaurants[0];
    $scope.reservationStep = 'select_restaurant'; // 'select_restaurant' | 'form'

    $scope.selectRestaurantForBooking = function (res) {
        $scope.selectedRestaurant = res;
        $scope.reservationStep = 'form';
        window.scrollTo(0, 0);
    };

    $scope.goBackToRestaurantList = function () {
        $scope.reservationStep = 'select_restaurant';
    };

    $scope.setMenuRestaurant = function (res) {
        $scope.selectedRestaurant = res;
    };

    // ==== FOOD MENU DATA ====
    $scope.menuItems = [
        // Dine Ease Dishes (dine_ease)
        { id: 101, restaurantId: 'dine_ease', name: 'Truffle & Wild Mushroom Risotto', category: 'Main Course', price: 850, originalPrice: 1000, discount: '15% OFF', type: 'Veg', available: true, availableCount: 12, quantity: 1, image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 30 },
        { id: 102, restaurantId: 'dine_ease', name: 'A5 Wagyu Ribeye Steak', category: 'Main Course', price: 2800, originalPrice: 3290, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 8, quantity: 1, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 45 },
        { id: 103, restaurantId: 'dine_ease', name: 'Lobster Thermidor', category: 'Main Course', price: 1950, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1707995548170-94dbb21e3cbd?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', isSpecial: false, prepTime: 40 },
        { id: 104, restaurantId: 'dine_ease', name: 'Beluga Caviar with Blinis', category: 'Starter', price: 2400, originalPrice: 2820, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 10, quantity: 1, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 15 },
        { id: 105, restaurantId: 'dine_ease', name: 'Pan-Seared Hokkaido Scallops', category: 'Starter', price: 950, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 20 },
        { id: 106, restaurantId: 'dine_ease', name: 'Artisan Burrata Salad with Figs', category: 'Starter', price: 650, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 16, quantity: 1, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 12 },
        { id: 107, restaurantId: 'dine_ease', name: 'Saffron & Gold Leaf Panna Cotta', category: 'Dessert', price: 480, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 18, quantity: 1, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 10 },
        { id: 108, restaurantId: 'dine_ease', name: 'Belgian Chocolate Lava Sphere', category: 'Dessert', price: 550, originalPrice: 650, discount: '15% OFF', type: 'Veg', available: true, availableCount: 12, quantity: 1, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 15 },
        { id: 109, restaurantId: 'dine_ease', name: 'Dom Pérignon Vintage Cuvée', category: 'Beverage', price: 3500, originalPrice: 4100, discount: '15% OFF', type: 'Veg', available: true, availableCount: 4, quantity: 1, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 5 },
        { id: 110, restaurantId: 'dine_ease', name: 'Signature Smoked Rosemary Mocktail', category: 'Beverage', price: 380, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 20, quantity: 1, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 8 },
        { id: 111, restaurantId: 'dine_ease', name: 'Truffle Wild Mushroom Cream Soup', category: 'Starter', price: 520, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 12 },
        { id: 112, restaurantId: 'dine_ease', name: 'Crispy Calamari Fritti & Garlic Aioli', category: 'Starter', price: 680, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 15 },
        { id: 113, restaurantId: 'dine_ease', name: 'Pan-Seared Atlantic Salmon & Asparagus', category: 'Main Course', price: 1450, originalPrice: 1700, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 10, quantity: 1, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 25 },
        { id: 114, restaurantId: 'dine_ease', name: 'Chilean Sea Bass in Saffron Broth', category: 'Main Course', price: 1850, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 8, quantity: 1, image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 30 },
        { id: 115, restaurantId: 'dine_ease', name: 'Prime Grilled Tenderloin Steak', category: 'Main Course', price: 1950, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 9, quantity: 1, image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 35 },
        { id: 116, restaurantId: 'dine_ease', name: 'Artisan Cheese Platter & Fig Jam', category: 'Starter', price: 850, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 12, quantity: 1, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 10 },
        { id: 117, restaurantId: 'dine_ease', name: 'Raspberry Pistachio Tart', category: 'Dessert', price: 420, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 16, quantity: 1, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 10 },
        { id: 118, restaurantId: 'dine_ease', name: 'Classic Opera Cake with Gold Dust', category: 'Dessert', price: 480, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 10 },
        { id: 119, restaurantId: 'dine_ease', name: 'Espresso Martini Signature Cocktail', category: 'Beverage', price: 550, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 18, quantity: 1, image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 5 },
        { id: 120, restaurantId: 'dine_ease', name: 'Sparkling Hibiscus Berry Iced Tea', category: 'Beverage', price: 290, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 22, quantity: 1, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 5 },

        // L'Étoile French Bistro Dishes (letoile)
        { id: 201, restaurantId: 'letoile', name: 'Pan-Seared Foie Gras with Brioche', category: 'Starter', price: 1100, originalPrice: 1290, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 7, quantity: 1, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 20 },
        { id: 202, restaurantId: 'letoile', name: 'Classic Coq au Vin French Stew', category: 'Main Course', price: 950, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 10, quantity: 1, image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 30 },
        { id: 203, restaurantId: 'letoile', name: 'Burgundy Garlic Butter Escargots', category: 'Starter', price: 750, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 15 },
        { id: 204, restaurantId: 'letoile', name: 'Duck Confit with Cherry Reduction', category: 'Main Course', price: 1450, originalPrice: 1700, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 9, quantity: 1, image: 'https://images.unsplash.com/photo-1514944288352-fffac99f0bdf?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 35 },
        { id: 205, restaurantId: 'letoile', name: 'French Onion Soup au Gratin', category: 'Starter', price: 520, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1588566565463-180a5b2090d2?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 15 },
        { id: 206, restaurantId: 'letoile', name: 'Classic Vanilla Bean Crème Brûlée', category: 'Dessert', price: 450, originalPrice: 530, discount: '15% OFF', type: 'Veg', available: true, availableCount: 16, quantity: 1, image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 12 },
        { id: 207, restaurantId: 'letoile', name: 'Parisian Macaron Selection (6 pcs)', category: 'Dessert', price: 580, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 18, quantity: 1, image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 10 },
        { id: 208, restaurantId: 'letoile', name: 'Vintage Bordeaux Red Wine Glass', category: 'Beverage', price: 980, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 12, quantity: 1, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 5 },
        { id: 209, restaurantId: 'letoile', name: 'French Elderflower & Lavender Spritz', category: 'Beverage', price: 420, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 8 },
        { id: 210, restaurantId: 'letoile', name: 'Soufflé au Fromage (Gruyère)', category: 'Starter', price: 620, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 12, quantity: 1, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 20 },
        { id: 211, restaurantId: 'letoile', name: 'Beef Bourguignon with Pearl Onions', category: 'Main Course', price: 1250, originalPrice: 1470, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 10, quantity: 1, image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 35 },
        { id: 212, restaurantId: 'letoile', name: 'Bouillabaisse Provençale Seafood Stew', category: 'Main Course', price: 1650, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 8, quantity: 1, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 30 },
        { id: 213, restaurantId: 'letoile', name: 'Ratatouille Niçoise Vegetables', category: 'Main Course', price: 720, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 25 },
        { id: 214, restaurantId: 'letoile', name: 'Salade Niçoise with Seared Ahi Tuna', category: 'Starter', price: 850, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 11, quantity: 1, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 15 },
        { id: 215, restaurantId: 'letoile', name: 'Tartare de Saumon with Avocado', category: 'Starter', price: 780, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 12 },
        { id: 216, restaurantId: 'letoile', name: 'Tarte Tatin (Caramelized Apple)', category: 'Dessert', price: 420, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 16, quantity: 1, image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 12 },
        { id: 217, restaurantId: 'letoile', name: 'Profiteroles with Warm Chocolate Sauce', category: 'Dessert', price: 460, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 10 },
        { id: 218, restaurantId: 'letoile', name: 'Kir Royale Champagne Cocktail', category: 'Beverage', price: 750, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 18, quantity: 1, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 5 },
        { id: 219, restaurantId: 'letoile', name: 'French Sparkling Water (Perrier 750ml)', category: 'Beverage', price: 240, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 25, quantity: 1, image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 2 },

        // Sakura Japanese Lounge Dishes (sakura)
        { id: 301, restaurantId: 'sakura', name: 'Chef Omakase Sashimi Deluxe Platter', category: 'Starter', price: 1850, originalPrice: 2180, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 9, quantity: 1, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 20 },
        { id: 302, restaurantId: 'sakura', name: 'Crispy Rock Shrimp Tempura', category: 'Starter', price: 780, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 12, quantity: 1, image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 18 },
        { id: 303, restaurantId: 'sakura', name: 'Seared Wagyu Tataki & Ponzu', category: 'Main Course', price: 1650, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 11, quantity: 1, image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 25 },
        { id: 304, restaurantId: 'sakura', name: 'Chilean Sea Bass with Saikyo Miso', category: 'Main Course', price: 1550, originalPrice: 1820, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 8, quantity: 1, image: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 30 },
        { id: 305, restaurantId: 'sakura', name: 'Dragon Unagi & Avocado Roll', category: 'Main Course', price: 890, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 18 },
        { id: 306, restaurantId: 'sakura', name: 'Pork Belly Tonkotsu Ramen', category: 'Main Course', price: 750, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 20 },
        { id: 307, restaurantId: 'sakura', name: 'Uji Matcha Green Tea Parfait', category: 'Dessert', price: 480, originalPrice: 560, discount: '15% OFF', type: 'Veg', available: true, availableCount: 12, quantity: 1, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 10 },
        { id: 308, restaurantId: 'sakura', name: 'Japanese Mochi Ice Cream Trio', category: 'Dessert', price: 420, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 16, quantity: 1, image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 8 },
        { id: 309, restaurantId: 'sakura', name: 'Junmai Daiginjo Premium Sake', category: 'Beverage', price: 1450, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 8, quantity: 1, image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 5 },
        { id: 310, restaurantId: 'sakura', name: 'Iced Yuzu & Jasmine Green Tea', category: 'Beverage', price: 320, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 20, quantity: 1, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 5 },
        { id: 311, restaurantId: 'sakura', name: 'Pan-Seared Wagyu Beef Gyoza (6 pcs)', category: 'Starter', price: 680, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 15 },
        { id: 312, restaurantId: 'sakura', name: 'Steamed Edamame with Truffle Salt', category: 'Starter', price: 380, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 20, quantity: 1, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 8 },
        { id: 313, restaurantId: 'sakura', name: 'Hamachi Yellowtail Jalapeño Sashimi', category: 'Starter', price: 950, originalPrice: 1115, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 10, quantity: 1, image: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 12 },
        { id: 314, restaurantId: 'sakura', name: 'Spicy Salmon Crunchy Roll (8 pcs)', category: 'Main Course', price: 780, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 16, quantity: 1, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 15 },
        { id: 315, restaurantId: 'sakura', name: 'Lobster Tempura Roll with Tobiko', category: 'Main Course', price: 1250, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 9, quantity: 1, image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 18 },
        { id: 316, restaurantId: 'sakura', name: 'Chicken Teriyaki Donburi Bowl', category: 'Main Course', price: 680, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 18, quantity: 1, image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 15 },
        { id: 317, restaurantId: 'sakura', name: 'Avocado & Cucumber Futomaki Roll', category: 'Main Course', price: 580, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 12 },
        { id: 318, restaurantId: 'sakura', name: 'Dorayaki Pancakes with Red Bean', category: 'Dessert', price: 380, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 10 },
        { id: 319, restaurantId: 'sakura', name: 'Japanese Sweet Umeshu Plum Wine', category: 'Beverage', price: 650, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 12, quantity: 1, image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 5 },
        { id: 320, restaurantId: 'sakura', name: 'Ceremonial Grade Hot Matcha Tea', category: 'Beverage', price: 280, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 25, quantity: 1, image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 5 },

        // Aroma Spice Royal Dining Dishes (aroma_spice)
        { id: 401, restaurantId: 'aroma_spice', name: 'Maharajah Dal Makhani & Truffle Naan', category: 'Main Course', price: 680, originalPrice: 800, discount: '15% OFF', type: 'Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 25 },
        { id: 402, restaurantId: 'aroma_spice', name: 'Smoked Awadhi Galouti Kebab', category: 'Starter', price: 750, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 10, quantity: 1, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 20 },
        { id: 403, restaurantId: 'aroma_spice', name: 'Tandoori Smoked Lamb Chops', category: 'Starter', price: 1250, originalPrice: 1470, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 8, quantity: 1, image: 'https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 30 },
        { id: 404, restaurantId: 'aroma_spice', name: 'Awadhi Dum Pukht Mutton Biryani', category: 'Main Course', price: 980, originalPrice: 1150, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 12, quantity: 1, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 35 },
        { id: 405, restaurantId: 'aroma_spice', name: 'Paneer Tikka Angara', category: 'Starter', price: 580, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 20 },
        { id: 406, restaurantId: 'aroma_spice', name: 'Royal Butter Chicken Murgh Makhani', category: 'Main Course', price: 850, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 16, quantity: 1, image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 25 },
        { id: 407, restaurantId: 'aroma_spice', name: 'Gold Leaf Shahi Phirni & Kesar Kheer', category: 'Dessert', price: 380, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 10 },
        { id: 408, restaurantId: 'aroma_spice', name: 'Gulab Jamun with Saffron Rabri', category: 'Dessert', price: 320, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 18, quantity: 1, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 8 },
        { id: 409, restaurantId: 'aroma_spice', name: 'Saffron & Pistachio Royal Thandai', category: 'Beverage', price: 350, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 16, quantity: 1, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 8 },
        { id: 410, restaurantId: 'aroma_spice', name: 'Mango Mango Lassi Royale', category: 'Beverage', price: 280, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 20, quantity: 1, image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 5 },
        { id: 411, restaurantId: 'aroma_spice', name: 'Dahi Ke Kebab with Mint Chutney', category: 'Starter', price: 480, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 16, quantity: 1, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 15 },
        { id: 412, restaurantId: 'aroma_spice', name: 'Amritsari Fish Tikka Fry', category: 'Starter', price: 720, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 12, quantity: 1, image: 'https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 18 },
        { id: 413, restaurantId: 'aroma_spice', name: 'Smoked Melt-in-Mouth Kakori Kebab', category: 'Starter', price: 850, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 10, quantity: 1, image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 20 },
        { id: 414, restaurantId: 'aroma_spice', name: 'Paneer Lababdar & Butter Naan', category: 'Main Course', price: 650, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 18, quantity: 1, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 20 },
        { id: 415, restaurantId: 'aroma_spice', name: 'Kashmiri Mutton Rogan Josh', category: 'Main Course', price: 890, originalPrice: 1040, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 30 },
        { id: 416, restaurantId: 'aroma_spice', name: 'Hyderabadi Dum Chicken Biryani', category: 'Main Course', price: 750, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 20, quantity: 1, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 25 },
        { id: 417, restaurantId: 'aroma_spice', name: 'Rich Malai Kofta Curry', category: 'Main Course', price: 620, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 20 },
        { id: 418, restaurantId: 'aroma_spice', name: 'Rasmalai with Pistachio Milk', category: 'Dessert', price: 350, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 20, quantity: 1, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 8 },
        { id: 419, restaurantId: 'aroma_spice', name: 'Zafrani Matka Kulfi', category: 'Dessert', price: 320, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 22, quantity: 1, image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 5 },
        { id: 420, restaurantId: 'aroma_spice', name: 'Masala Chai Spice Infusion', category: 'Beverage', price: 180, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 30, quantity: 1, image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 5 },

        // Trattoria Bella Italia Dishes (bella_italia)
        { id: 501, restaurantId: 'bella_italia', name: 'Woodfired Truffle Margherita Pizza', category: 'Main Course', price: 780, originalPrice: 920, discount: '15% OFF', type: 'Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 20 },
        { id: 502, restaurantId: 'bella_italia', name: 'Burrata Caprese with Truffle Oil', category: 'Starter', price: 650, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 12 },
        { id: 503, restaurantId: 'bella_italia', name: 'Handcrafted Fettuccine Carbonara', category: 'Main Course', price: 750, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 10, quantity: 1, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 22 },
        { id: 504, restaurantId: 'bella_italia', name: 'Wild Mushroom & Truffle Ravioli', category: 'Main Course', price: 890, originalPrice: 1050, discount: '15% OFF', type: 'Veg', available: true, availableCount: 11, quantity: 1, image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281286?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 25 },
        { id: 505, restaurantId: 'bella_italia', name: 'Arancini di Riso (Sicilian Rice Balls)', category: 'Starter', price: 480, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 16, quantity: 1, image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 15 },
        { id: 506, restaurantId: 'bella_italia', name: 'Classic Tiramisu Tradizionale', category: 'Dessert', price: 420, originalPrice: 490, discount: '15% OFF', type: 'Veg', available: true, availableCount: 18, quantity: 1, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 10 },
        { id: 507, restaurantId: 'bella_italia', name: 'Panna Cotta al Limoncello', category: 'Dessert', price: 380, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 10 },
        { id: 508, restaurantId: 'bella_italia', name: 'Vintage Chianti Classico Wine Glass', category: 'Beverage', price: 850, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 6, quantity: 1, image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 5 },
        { id: 509, restaurantId: 'bella_italia', name: 'Italian Aperol Spritz Cocktail', category: 'Beverage', price: 480, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 8 },
        { id: 510, restaurantId: 'bella_italia', name: 'Bruschetta al Pomodoro e Basilico', category: 'Starter', price: 420, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 18, quantity: 1, image: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 10 },
        { id: 511, restaurantId: 'bella_italia', name: 'Prosciutto e Melone Appetizer', category: 'Starter', price: 680, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 12, quantity: 1, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 10 },
        { id: 512, restaurantId: 'bella_italia', name: 'Minestrone Alla Genovese Soup', category: 'Starter', price: 380, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 16, quantity: 1, image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 12 },
        { id: 513, restaurantId: 'bella_italia', name: 'Lasagna Bolognese al Forno', category: 'Main Course', price: 850, originalPrice: 1000, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 25 },
        { id: 514, restaurantId: 'bella_italia', name: 'Quattro Formaggi Woodfired Pizza', category: 'Main Course', price: 720, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 18 },
        { id: 515, restaurantId: 'bella_italia', name: 'Spaghetti Alla Pescatora (Seafood)', category: 'Main Course', price: 980, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 10, quantity: 1, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 22 },
        { id: 516, restaurantId: 'bella_italia', name: 'Gnocchi Al Gorgonzola e Noci', category: 'Main Course', price: 750, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 12, quantity: 1, image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 18 },
        { id: 517, restaurantId: 'bella_italia', name: 'Cannoli Siciliani with Sweet Ricotta', category: 'Dessert', price: 380, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 16, quantity: 1, image: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 10 },
        { id: 518, restaurantId: 'bella_italia', name: 'Affogato al Caffè (Gelato & Espresso)', category: 'Dessert', price: 320, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 20, quantity: 1, image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 5 },
        { id: 519, restaurantId: 'bella_italia', name: 'Limoncello Di Capri Liqueur Shot', category: 'Beverage', price: 350, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 18, quantity: 1, image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 3 },

        // El Fuego Steakhouse Dishes (el_fuego)
        { id: 601, restaurantId: 'el_fuego', name: 'Dry-Aged Tomahawk Ribeye (400g)', category: 'Main Course', price: 2650, originalPrice: 3100, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 6, quantity: 1, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 40 },
        { id: 602, restaurantId: 'el_fuego', name: 'Charred Spanish Octopus & Paprika', category: 'Starter', price: 980, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 9, quantity: 1, image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 20 },
        { id: 603, restaurantId: 'el_fuego', name: 'Oak-Charred Asparagus & Truffle Butter', category: 'Starter', price: 520, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 12, quantity: 1, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 15 },
        { id: 604, restaurantId: 'el_fuego', name: 'Grilled Filet Mignon with Chimichurri', category: 'Main Course', price: 1850, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 10, quantity: 1, image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 30 },
        { id: 605, restaurantId: 'el_fuego', name: 'Smoked Salted Caramel Cheesecake', category: 'Dessert', price: 480, originalPrice: 560, discount: '15% OFF', type: 'Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 12 },
        { id: 606, restaurantId: 'el_fuego', name: 'Smoked Oak Bourbon Old Fashioned', category: 'Beverage', price: 680, originalPrice: 800, discount: '15% OFF', type: 'Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 10 },
        { id: 607, restaurantId: 'el_fuego', name: 'Smoked BBQ Pork Ribs (Full Rack)', category: 'Main Course', price: 1650, originalPrice: 1940, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 10, quantity: 1, image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 35 },
        { id: 608, restaurantId: 'el_fuego', name: 'Prime NY Strip Cut Steak (300g)', category: 'Main Course', price: 1950, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 8, quantity: 1, image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 30 },
        { id: 609, restaurantId: 'el_fuego', name: 'Charred Bone Marrow with Sourdough', category: 'Starter', price: 850, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 7, quantity: 1, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 18 },
        { id: 610, restaurantId: 'el_fuego', name: 'Grilled Jumbo Garlic Butter Shrimp', category: 'Starter', price: 920, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 12, quantity: 1, image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 15 },
        { id: 611, restaurantId: 'el_fuego', name: 'Classic Wedge Salad & Blue Cheese', category: 'Starter', price: 480, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 10 },
        { id: 612, restaurantId: 'el_fuego', name: 'Truffle Parmesan Hand-Cut Fries', category: 'Starter', price: 380, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 20, quantity: 1, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 12 },
        { id: 613, restaurantId: 'el_fuego', name: 'Braised Beef Short Ribs & Polenta', category: 'Main Course', price: 1450, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 9, quantity: 1, image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 35 },
        { id: 614, restaurantId: 'el_fuego', name: 'Chocolate Bourbon Pecan Pie', category: 'Dessert', price: 420, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 10 },
        { id: 615, restaurantId: 'el_fuego', name: 'Warm Churros & Dark Chocolate Dip', category: 'Dessert', price: 380, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 18, quantity: 1, image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 10 },
        { id: 616, restaurantId: 'el_fuego', name: 'Smoked Maple Bacon Old Fashioned', category: 'Beverage', price: 720, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 8 }
    ];

    // Filter items based on selected restaurant, category pill & search query
    $scope.getFilteredMenuItems = function () {
        if (!$scope.menuItems) return [];
        return $scope.menuItems.filter(function (item) {
            var matchesRestaurant = !$scope.selectedRestaurant || (item.restaurantId === $scope.selectedRestaurant.id);

            var matchesCategory = ($scope.selectedCategory === 'All') ||
                ($scope.selectedCategory === 'Specials' && item.isSpecial) ||
                (item.category === $scope.selectedCategory);

            var matchesSearch = !$scope.searchQuery ||
                item.name.toLowerCase().indexOf($scope.searchQuery.toLowerCase()) !== -1 ||
                item.category.toLowerCase().indexOf($scope.searchQuery.toLowerCase()) !== -1;

            return matchesRestaurant && matchesCategory && matchesSearch;
        });
    };

    $scope.getSpecialOffers = function () {
        if (!$scope.menuItems) return [];
        return $scope.menuItems.filter(function (item) {
            var matchesRestaurant = !$scope.selectedRestaurant || (item.restaurantId === $scope.selectedRestaurant.id);
            return matchesRestaurant && item.isSpecial && item.available;
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
        name: ''
    };

    $scope.upiData = {
        vpa: ''
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

    // ==== ORDER HISTORY & RE-ORDER MODAL LOGIC ====
    $scope.orderFilter = 'all';
    $scope.showReorderModal = false;
    $scope.selectedOrderForReorder = null;

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

    $scope.openReorderModal = function (order) {
        if (!order || !order.items) return;
        $scope.selectedOrderForReorder = order;
        $scope.showReorderModal = true;
    };

    $scope.closeReorderModal = function () {
        $scope.showReorderModal = false;
        $scope.selectedOrderForReorder = null;
    };

    $scope.confirmReorder = function () {
        if (!$scope.selectedOrderForReorder || !$scope.selectedOrderForReorder.items) return;
        angular.forEach($scope.selectedOrderForReorder.items, function (ordItem) {
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
        $scope.closeReorderModal();
        $scope.switchView('menu');
    };

    $scope.completePayment = function () {
        $scope.isProcessingPayment = true;

        $timeout(function () {
            $scope.isProcessingPayment = false;
            $scope.paymentSuccess = true;

            // Push to Order History with exact user-entered details
            var newOrderId = 'DE-' + Math.floor(100000 + Math.random() * 900000);
            var newOrderItems = angular.copy($scope.cart);
            var custName = ($scope.submittedData && $scope.submittedData.customerName) ? $scope.submittedData.customerName : ($scope.cardData.name || 'Guest Customer');
            var tableSection = ($scope.submittedData && $scope.submittedData.tableType) ? ($scope.submittedData.tableType + ' Section (' + ($scope.submittedData.guests || 2) + ' Guests)') : 'Indoor Dining';
            var venueName = $scope.selectedRestaurant ? $scope.selectedRestaurant.name : ($scope.restaurant ? $scope.restaurant.name : 'Dine Ease');

            $scope.orderHistory.unshift({
                id: newOrderId,
                customerName: custName,
                restaurantName: venueName,
                date: 'Just Now',
                table: tableSection,
                status: 'In Kitchen',
                statusCode: 'active',
                prepTime: '20-25 mins remaining',
                paymentMethod: $scope.paymentMethod.toUpperCase(),
                items: newOrderItems.length > 0 ? newOrderItems : [{ name: 'Table Reservation Fee (' + venueName + ')', quantity: 1, price: $scope.getTablePrice(), image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80' }],
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

        $scope.getTableTypes = function () {
            if ($scope.selectedRestaurant && $scope.selectedRestaurant.tableTypes) {
                return $scope.selectedRestaurant.tableTypes;
            }
            return $scope.tableTypes;
        };

        $scope.getTablePrice = function () {
            var data = $scope.submittedData || $scope.reservation;
            if (!data || !data.tableType) return 0;
            var types = $scope.getTableTypes();
            var selected = types.find(function (t) {
                return t.value === data.tableType;
            });
            var basePrice = selected ? selected.price : 200;
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
            customerName: '',
            email: '',
            phone: '',
            date: new Date(),
            time: new Date(1970, 0, 1, 19, 30, 0),
            guests: 1,
            tableType: 'Indoor',
            occasion: 'Regular Dining',
            specialRequests: ''
        };

        $scope.reservedTablesCount = 5;
    };

    $scope.reserveTable = function (form) {
        if (form) {
            form.$setSubmitted();
        }

        if ($scope.isFullyBooked($scope.selectedRestaurant)) {
            alert('Booking Unavailable: ' + ($scope.selectedRestaurant ? $scope.selectedRestaurant.name : 'Selected restaurant') + ' is fully booked! No tables available.');
            return;
        }

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var phoneRegex = /^[6-9]\d{9}$/;

        if (form && form.$invalid) {
            alert('Please fix the validation errors highlighted in red before submitting your reservation.');
            return;
        }

        if (!$scope.reservation.customerName || $scope.reservation.customerName.trim().length < 2) {
            alert('Please enter a valid Customer Name (minimum 2 characters).');
            return;
        }

        if (!$scope.reservation.email || !emailRegex.test($scope.reservation.email)) {
            alert('Please enter a valid Email Address format (e.g. name@domain.com).');
            return;
        }

        if (!$scope.reservation.phone || !phoneRegex.test($scope.reservation.phone)) {
            alert('Please enter a valid 10-digit mobile number (e.g. 9876543210).');
            return;
        }

        if (!$scope.reservation.guests || $scope.reservation.guests < 1 || $scope.reservation.guests > 20) {
            alert('Number of Guests must be between 1 and 20.');
            return;
        }

        if (!$scope.reservation.date || !$scope.reservation.time) {
            alert('Please select a valid Reservation Date and Time.');
            return;
        }

        $scope.submittedData = angular.copy($scope.reservation);
        if ($scope.submittedData.phone && $scope.submittedData.phone.indexOf('+91') !== 0) {
            $scope.submittedData.phone = '+91 ' + $scope.submittedData.phone;
        }

        // Sync user input to payment defaults
        if ($scope.submittedData.customerName) {
            $scope.cardData.name = $scope.submittedData.customerName;
        }
        if ($scope.submittedData.email) {
            $scope.upiData.vpa = $scope.submittedData.email.split('@')[0] + '@okaxis';
        }

        // Increment reserved tables count for this restaurant upon booking
        if ($scope.selectedRestaurant && $scope.selectedRestaurant.reservedTablesCount < $scope.selectedRestaurant.totalTables) {
            $scope.selectedRestaurant.reservedTablesCount++;
        }

        $scope.isSubmitted = true;
        $scope.isBooked = true;
        $scope.pendingTablePayment = true;

        $scope.switchView('summary');
    };

    $scope.getAvailableTables = function (res) {
        var target = res || $scope.selectedRestaurant || $scope.restaurant;
        if (!target) return 0;
        var total = target.totalTables || 20;
        var reserved = target.reservedTablesCount || 0;
        return Math.max(0, total - reserved);
    };

    $scope.isFullyBooked = function (res) {
        return $scope.getAvailableTables(res) <= 0;
    };

    $scope.manualReserveTable = function (res) {
        var target = res || $scope.selectedRestaurant;
        if (!target) return;
        if (target.reservedTablesCount < target.totalTables) {
            target.reservedTablesCount++;
        } else {
            alert(target.name + ' is already fully booked (' + target.totalTables + '/' + target.totalTables + ')!');
        }
    };

    $scope.manualReleaseTable = function (res) {
        var target = res || $scope.selectedRestaurant;
        if (!target) return;
        if (target.reservedTablesCount > 0) {
            target.reservedTablesCount--;
        }
    };

    $scope.getTodaysSpecialCount = function () {
        if (!$scope.menuItems) return 0;
        return $scope.menuItems.filter(function (item) {
            var matchesRes = !$scope.selectedRestaurant || (item.restaurantId === $scope.selectedRestaurant.id);
            return matchesRes && item.isSpecial;
        }).length;
    };

    $scope.cachedDashboardCards = [];
    $scope.getDashboardCards = function () {
        var activeRes = $scope.selectedRestaurant || $scope.restaurant || {};
        var availTables = $scope.getAvailableTables();
        var specialCount = $scope.getTodaysSpecialCount();
        var menuCount = $scope.menuItems ? $scope.menuItems.length : 0;

        if ($scope.cachedDashboardCards.length === 4 &&
            $scope.cachedDashboardCards[0].value === availTables &&
            $scope.cachedDashboardCards[1].value === (specialCount + ' Dishes') &&
            $scope.cachedDashboardCards[2].value === ((activeRes.rating || '4.9') + ' / 5.0') &&
            $scope.cachedDashboardCards[3].value === menuCount) {
            return $scope.cachedDashboardCards;
        }

        $scope.cachedDashboardCards = [
            {
                title: 'Available Tables',
                value: availTables,
                subtitle: 'Out of ' + (activeRes.totalTables || 20) + ' total tables',
                accentColor: '#ef4444',
                hugeicon: 'hgi-home-01'
            },
            {
                title: "Chef's Specials",
                value: specialCount + ' Dishes',
                subtitle: 'Special 15% discount today',
                accentColor: '#eab308',
                hugeicon: 'hgi-star-01'
            },
            {
                title: 'Customer Rating',
                value: (activeRes.rating || '4.9') + ' / 5.0',
                subtitle: 'Based on 450+ verified reviews',
                accentColor: '#10b981',
                hugeicon: 'hgi-favourite'
            },
            {
                title: 'Total Menu Items',
                value: menuCount,
                subtitle: 'Starters, Mains & Beverages',
                accentColor: '#3b82f6',
                hugeicon: 'hgi-restaurant-01'
            }
        ];
        return $scope.cachedDashboardCards;
    };

    $scope.initApp();

}]);
