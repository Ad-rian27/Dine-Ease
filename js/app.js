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
            image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
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
            reservedTablesCount: 3,
            address: "77 Flame Boulevard, Uptown Towers",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
            tagline: "Oak-Smoked Aged Steaks & Bourbon Cocktails",
            features: ['Dry-Aged Steaks', 'Whiskey Lounge', 'Sommelier Pairing', 'Chef Table'],
            tableTypes: [
                { label: 'Prime Grill Dining', value: 'Indoor', price: 300, icon: 'hgi-smart-ac', features: 'Leather Booths • Open Charcoal Grill' },
                { label: 'Skyline Terrace', value: 'Outdoor', price: 450, icon: 'hgi-beach', features: 'Panoramic City Views • Firepit Lounge' },
                { label: 'Executive Bourbon Room', value: 'Private Suite', price: 850, icon: 'hgi-building-03', features: 'Private Bar • Master Butcher Tasting' }
            ]
        }
    ];

    $scope.getFilteredRestaurants = function () {
        if (!$scope.restaurants) return [];
        return $scope.restaurants.filter(function (res) {
            var matchesCuisine = ($scope.selectedCuisineFilter === 'All') || (res.cuisine === $scope.selectedCuisineFilter);
            var matchesSearch = !$scope.restaurantSearchQuery ||
                res.name.toLowerCase().indexOf($scope.restaurantSearchQuery.toLowerCase()) !== -1 ||
                res.cuisine.toLowerCase().indexOf($scope.restaurantSearchQuery.toLowerCase()) !== -1 ||
                res.shortName.toLowerCase().indexOf($scope.restaurantSearchQuery.toLowerCase()) !== -1;
            return matchesCuisine && matchesSearch;
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

    // ==== GOUTHAM: FOOD MENU DATA ====
    $scope.menuItems = [
        // Dine Ease Dishes (dine_ease)
        { id: 101, restaurantId: 'dine_ease', name: 'Truffle & Wild Mushroom Risotto', category: 'Main Course', price: 2800, originalPrice: 3290, discount: '15% OFF', type: 'Veg', available: true, availableCount: 12, quantity: 1, image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 35 },
        { id: 102, restaurantId: 'dine_ease', name: 'A5 Wagyu Beef Steak', category: 'Main Course', price: 8500, originalPrice: 10000, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 8, quantity: 1, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 45 },
        { id: 103, restaurantId: 'dine_ease', name: 'Lobster Thermidor', category: 'Main Course', price: 5200, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1553240799-36bbf332a5c3?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 40 },
        { id: 104, restaurantId: 'dine_ease', name: 'Beluga Caviar with Blinis', category: 'Starter', price: 9500, originalPrice: 11175, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 10, quantity: 1, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 15 },
        { id: 106, restaurantId: 'dine_ease', name: 'Saffron Panna Cotta', category: 'Dessert', price: 1500, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 18, quantity: 1, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 10 },
        { id: 108, restaurantId: 'dine_ease', name: 'Vintage Dom Pérignon Champagne', category: 'Beverage', price: 18000, originalPrice: 21175, discount: '15% OFF', type: 'Veg', available: true, availableCount: 4, quantity: 1, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 5 },

        // L'Étoile French Bistro Dishes (letoile)
        { id: 201, restaurantId: 'letoile', name: 'Pan-Seared Foie Gras with Brioche', category: 'Starter', price: 3200, originalPrice: 3760, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 7, quantity: 1, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 20 },
        { id: 202, restaurantId: 'letoile', name: 'Classic Coq au Vin French Stew', category: 'Main Course', price: 3800, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 10, quantity: 1, image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 30 },
        { id: 203, restaurantId: 'letoile', name: 'Burgundy Garlic Butter Escargots', category: 'Starter', price: 2400, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 15 },
        { id: 204, restaurantId: 'letoile', name: 'Classic Vanilla Bean Crème Brûlée', category: 'Dessert', price: 1600, originalPrice: 1880, discount: '15% OFF', type: 'Veg', available: true, availableCount: 16, quantity: 1, image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 12 },
        { id: 205, restaurantId: 'letoile', name: 'Vintage French Bordeaux Red Wine', category: 'Beverage', price: 12000, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 6, quantity: 1, image: 'https://images.unsplash.com/photo-1558001373-7b9fbd4830e1?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 5 },

        // Sakura Japanese Lounge Dishes (sakura)
        { id: 301, restaurantId: 'sakura', name: 'Chef Omakase Sashimi Deluxe Platter', category: 'Starter', price: 5800, originalPrice: 6800, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 9, quantity: 1, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 20 },
        { id: 302, restaurantId: 'sakura', name: 'Seared Wagyu Tataki & Ponzu', category: 'Main Course', price: 6500, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 11, quantity: 1, image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 25 },
        { id: 303, restaurantId: 'sakura', name: 'Dragon Unagi & Avocado Roll', category: 'Main Course', price: 3400, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 18 },
        { id: 304, restaurantId: 'sakura', name: 'Uji Matcha Green Tea Parfait', category: 'Dessert', price: 1800, originalPrice: 2100, discount: '15% OFF', type: 'Veg', available: true, availableCount: 12, quantity: 1, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 10 },
        { id: 305, restaurantId: 'sakura', name: 'Junmai Daiginjo Premium Sake', category: 'Beverage', price: 9500, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 8, quantity: 1, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 5 },

        // Aroma Spice Royal Dining Dishes (aroma_spice)
        { id: 401, restaurantId: 'aroma_spice', name: 'Maharajah Royal Dal Makhani & Truffle Naan', category: 'Main Course', price: 2100, originalPrice: 2470, discount: '15% OFF', type: 'Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 25 },
        { id: 402, restaurantId: 'aroma_spice', name: 'Smoked Awadhi Galouti Kebab', category: 'Starter', price: 2800, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 10, quantity: 1, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 20 },
        { id: 403, restaurantId: 'aroma_spice', name: 'Tandoori Smoked Lamb Chops', category: 'Starter', price: 4200, originalPrice: 4940, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 8, quantity: 1, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 30 },
        { id: 404, restaurantId: 'aroma_spice', name: 'Gold Leaf Shahi Phirni & Kesar Kheer', category: 'Dessert', price: 1400, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 10 },
        { id: 405, restaurantId: 'aroma_spice', name: 'Artisan Smoked Old Fashioned', category: 'Beverage', price: 1800, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 10 },

        // Trattoria Bella Italia Dishes (bella_italia)
        { id: 501, restaurantId: 'bella_italia', name: 'Woodfired Truffle Margherita Pizza', category: 'Main Course', price: 1950, originalPrice: 2290, discount: '15% OFF', type: 'Veg', available: true, availableCount: 14, quantity: 1, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 20 },
        { id: 502, restaurantId: 'bella_italia', name: 'Handcrafted Fettuccine Carbonara', category: 'Main Course', price: 2200, originalPrice: null, discount: null, type: 'Non-Veg', available: true, availableCount: 10, quantity: 1, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 22 },
        { id: 503, restaurantId: 'bella_italia', name: 'Classic Tiramisu Tradizionale', category: 'Dessert', price: 1200, originalPrice: 1410, discount: '15% OFF', type: 'Veg', available: true, availableCount: 18, quantity: 1, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 10 },
        { id: 504, restaurantId: 'bella_italia', name: 'Vintage Chianti Classico Wine', category: 'Beverage', price: 8500, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 6, quantity: 1, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 5 },

        // El Fuego Steakhouse Dishes (el_fuego)
        { id: 601, restaurantId: 'el_fuego', name: 'Dry-Aged Tomahawk Ribeye Steak (400g)', category: 'Main Course', price: 9200, originalPrice: 10800, discount: '15% OFF', type: 'Non-Veg', available: true, availableCount: 6, quantity: 1, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 40 },
        { id: 602, restaurantId: 'el_fuego', name: 'Oak-Charred Asparagus & Truffle Butter', category: 'Starter', price: 1800, originalPrice: null, discount: null, type: 'Veg', available: true, availableCount: 12, quantity: 1, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80', isSpecial: false, prepTime: 15 },
        { id: 603, restaurantId: 'el_fuego', name: 'Smoked Oak Bourbon Old Fashioned', category: 'Beverage', price: 2100, originalPrice: 2470, discount: '15% OFF', type: 'Veg', available: true, availableCount: 15, quantity: 1, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=500&q=80', isSpecial: true, prepTime: 10 }
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
        if ($scope.selectedRestaurant) {
            return $scope.selectedRestaurant.totalTables - $scope.selectedRestaurant.reservedTablesCount;
        }
        return $scope.restaurant ? ($scope.restaurant.totalTables - $scope.reservedTablesCount) : 15;
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
