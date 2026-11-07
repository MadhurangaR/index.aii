/**
 * ============================================================================
 * Ranjani Farm Shop - Core Application Logic
 * Interactive Product Catalog, Shopping Cart, WhatsApp Generator & UI Engine
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Shop Configuration
  // --------------------------------------------------------------------------
  const SHOP_CONFIG = {
    name: 'Ranjani Farm Shop',
    phone: '075 772 8547',
    whatsappNumber: '94757728547', // WhatsApp format with Sri Lanka country code (0757728547)
    address: '167/1, Meewala, Nittambuwa',
    openingHour: 7,   // 07:00 (7:00 AM)
    closingHour: 21,  // 21:00 (09:00 PM)
    openingMinute: 0,
    closingMinute: 0,
    openTimeStr: '07:00 AM',
    closeTimeStr: '09:00 PM',
    currencySymbol: 'Rs.',
    freeDeliveryThreshold: 3500,
    standardDeliveryFee: 250,
    storageKeys: {
      cart: 'ranjani_cart_v1',
      reviews: 'ranjani_reviews_v1'
    }
  };

  // --------------------------------------------------------------------------
  // Product Catalog Database
  // --------------------------------------------------------------------------
  const PRODUCTS_DATA = [
    {
      id: 'cut-01',
      name: 'Ranjani Signature Curry Cut',
      category: 'curry',
      badge: 'Best Seller',
      badgeClass: 'bestseller',
      rating: 4.9,
      reviewCount: 382,
      description: 'Equal mix of bone-in white and dark meat. Cleaned with RO water, excess fat removed. Perfect for rich family curries.',
      cookingTip: 'Ideal for village curry, korma, and spicy chicken pepper gravy.',
      image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=800&q=80',
      specs: ['100% Skinless & Trimmed', '16-18 Pieces per kg', 'Chilled at 2°C (Never Frozen)'],
      options: [
        { label: '500g', weight: '500g', price: 650, originalPrice: 720 },
        { label: '1 kg', weight: '1kg', price: 1250, originalPrice: 1390 }
      ],
      selectedOptionIndex: 1
    },
    {
      id: 'cut-02',
      name: 'Farm Fresh Boneless Breast Fillet',
      category: 'boneless',
      badge: 'Lean Protein',
      badgeClass: 'fresh',
      rating: 5.0,
      reviewCount: 245,
      description: 'Super lean, skinless and boneless pure chicken breast fillets. High protein, zero skin, ultra-tender texture.',
      cookingTip: 'Best for gym meal prep, grilled fillets, butter chicken, wraps, and stir-fry.',
      image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80',
      specs: ['99% Fat Free Meat', '30g Protein per 100g', 'Vacuum Sealed for Maximum Freshness'],
      options: [
        { label: '500g', weight: '500g', price: 890, originalPrice: 980 },
        { label: '1 kg', weight: '1kg', price: 1690, originalPrice: 1850 }
      ],
      selectedOptionIndex: 1
    },
    {
      id: 'cut-03',
      name: 'Fresh Chicken Drumsticks (Legs)',
      category: 'legs-wings',
      badge: 'Juicy & Tender',
      badgeClass: 'bestseller',
      rating: 4.8,
      reviewCount: 198,
      description: 'Prime cut drumsticks with intact bone marrow for intense rich taste. Juicy and tender in every single bite.',
      cookingTip: 'Ideal for crispy fried chicken, barbecue skewers, tandoori roast, and slow braising.',
      image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=800&q=80',
      specs: ['Skinless / Skin-on available', '5-6 pieces per 500g', 'Juicy dark meat with rich marrow'],
      options: [
        { label: '500g (5-6 pcs)', weight: '500g', price: 790, originalPrice: 870 },
        { label: '1 kg (10-12 pcs)', weight: '1kg', price: 1490, originalPrice: 1650 }
      ],
      selectedOptionIndex: 1
    },
    {
      id: 'cut-04',
      name: 'Free-Range Country Chicken (Naatu Kozhi)',
      category: 'country',
      badge: '100% Organic Desi',
      badgeClass: 'fresh',
      rating: 4.9,
      reviewCount: 164,
      description: 'Authentic village country chicken raised freely on pasture and organic grains. Rich herbal flavor and therapeutic broth qualities.',
      cookingTip: 'Best for traditional naatu kozhi kulambu, medicinal chicken soup, and slow cooked village roast.',
      image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
      specs: ['Pasture Raised Free Range', 'No Artificial Growth Feed', 'Lean & Firm Traditional Texture'],
      options: [
        { label: '1 kg Whole Cut', weight: '1kg', price: 1850, originalPrice: 2000 },
        { label: '1.5 kg Full Bird', weight: '1.5kg', price: 2750, originalPrice: 2950 }
      ],
      selectedOptionIndex: 0
    },
    {
      id: 'cut-05',
      name: 'Royal Chicken Biryani Cut (Large)',
      category: 'curry',
      badge: 'Chef Special',
      badgeClass: '',
      rating: 4.9,
      reviewCount: 172,
      description: 'Large sized juicy chicken pieces cut specifically so they retain moisture and don’t shrink inside slow dum biryani pots.',
      cookingTip: 'Ideal for Hyderabadi Dum Biryani, Thalassery Biryani, and Pulao.',
      image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80',
      specs: ['8-10 Large Chunky Pieces per kg', 'Mix of breast, thigh & drumstick', 'Maintains tenderness in slow dum'],
      options: [
        { label: '1 kg (Large Cuts)', weight: '1kg', price: 1320, originalPrice: 1450 }
      ],
      selectedOptionIndex: 0
    },
    {
      id: 'cut-06',
      name: 'Crispy Chicken Wings (Flats & Drumettes)',
      category: 'legs-wings',
      badge: 'Party Favorite',
      badgeClass: '',
      rating: 4.7,
      reviewCount: 112,
      description: 'Tender chicken wings with tips trimmed off. Skin left intact to ensure superior crispiness during deep frying or baking.',
      cookingTip: 'Great for hot buffalo wings, Korean sticky sweet chili wings, and honey garlic glaze.',
      image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
      specs: ['Tips removed, drumettes separated', 'Skin-on for maximum crunch', '8-10 pieces per 500g'],
      options: [
        { label: '500g', weight: '500g', price: 690, originalPrice: 770 },
        { label: '1 kg', weight: '1kg', price: 1320, originalPrice: 1450 }
      ],
      selectedOptionIndex: 0
    },
    {
      id: 'cut-07',
      name: 'Pasture Brown Farm Eggs (Omega-3)',
      category: 'eggs',
      badge: 'Farm Morning Harvest',
      badgeClass: 'fresh',
      rating: 5.0,
      reviewCount: 310,
      description: 'Freshly gathered brown shell eggs with deep natural orange yolks. High in Omega-3, choline, and protein.',
      cookingTip: 'Perfect for sunny-side up, soft-boiled eggs, souffles, and everyday baking.',
      image: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=800&q=80',
      specs: ['Collected daily at 5:00 AM', 'Natural deep orange yolk', 'Grade-A cleaned and inspected'],
      options: [
        { label: 'Pack of 10 Eggs', weight: '10 Eggs', price: 580, originalPrice: 650 },
        { label: 'Crate of 30 Eggs', weight: '30 Eggs', price: 1680, originalPrice: 1850 }
      ],
      selectedOptionIndex: 0
    },
    {
      id: 'cut-08',
      name: 'Fresh Chicken Keema (Fine Minced)',
      category: 'boneless',
      badge: 'Fat Free Mince',
      badgeClass: '',
      rating: 4.8,
      reviewCount: 88,
      description: '100% pure chicken breast and thigh meat freshly grounded with hygienic stainless steel mincers. No organs or filler fat added.',
      cookingTip: 'Excellent for chicken burgers, samosas, koftas, meatballs, and spaghetti bolognese.',
      image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80',
      specs: ['Zero cartilage or skin', 'Double ground for fine smooth texture', 'Ready to season and cook'],
      options: [
        { label: '500g', weight: '500g', price: 820, originalPrice: 900 },
        { label: '1 kg', weight: '1kg', price: 1580, originalPrice: 1720 }
      ],
      selectedOptionIndex: 0
    },
    {
      id: 'cut-09',
      name: 'Tandoori Spiced Drumsticks (Marinated)',
      category: 'marinated',
      badge: 'Ready To Fry',
      badgeClass: 'bestseller',
      rating: 4.9,
      reviewCount: 142,
      description: 'Tender fresh drumsticks marinated for 8 hours in thick curd, Kashmiri red chili, ginger-garlic paste, and secret farm garam masala.',
      cookingTip: 'Air fry at 180°C for 20 mins, pan fry on medium heat, or bake in oven.',
      image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
      specs: ['Pre-marinated, zero prep work needed', 'No chemical colorants used', 'Cook straight from the tray'],
      options: [
        { label: '500g (Ready to Cook)', weight: '500g', price: 920, originalPrice: 1050 }
      ],
      selectedOptionIndex: 0
    },
    {
      id: 'cut-10',
      name: 'Whole Cleaned Farm Roaster Chicken',
      category: 'curry',
      badge: 'Full Bird',
      badgeClass: '',
      rating: 4.8,
      reviewCount: 96,
      description: 'Whole young broiler chicken thoroughly gutted, cleaned, with neck and giblets separated. Ready for Sunday whole roast.',
      cookingTip: 'Season with garlic butter, rosemary, and roast at 200°C for 50-60 minutes.',
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
      specs: ['Weight approx 1.2kg - 1.4kg', 'Fully gutted, washed and dried', 'Skin-on for golden crispy roast'],
      options: [
        { label: 'Whole Bird (approx 1.3kg)', weight: '1.3kg', price: 1550, originalPrice: 1700 }
      ],
      selectedOptionIndex: 0
    }
  ];

  // --------------------------------------------------------------------------
  // Default Customer Reviews
  // --------------------------------------------------------------------------
  const DEFAULT_REVIEWS = [
    {
      id: 'rev-1',
      name: 'Kamal Jayawardena',
      location: 'Regular Home Chef',
      cut: 'Ranjani Signature Curry Cut',
      rating: 5,
      date: '2 days ago',
      comment: 'The freshness is simply unmatched. You don’t get that sour market smell at all! The meat is super pink, completely clean, and cooked up so tender in our Sunday chicken curry.'
    },
    {
      id: 'rev-2',
      name: 'Dr. Nilmini Perera',
      location: 'Fitness & Health Coach',
      cut: 'Boneless Breast Fillet',
      rating: 5,
      date: '1 week ago',
      comment: 'I order 5kg of boneless breast fillets every week for my family meal prep. Pure clean meat without water weight scam. Highly recommend Ranjani Farm for clean protein.'
    },
    {
      id: 'rev-3',
      name: 'Mohamed Farook',
      location: 'Biryani Specialist',
      cut: 'Royal Biryani Cut',
      rating: 5,
      date: '3 days ago',
      comment: 'Ordered via WhatsApp and received the package in 45 minutes! The biryani cut pieces are large and did not shred in the handi. Excellent packaging in cold leakproof box.'
    }
  ];

  // --------------------------------------------------------------------------
  // Application State
  // --------------------------------------------------------------------------
  const state = {
    products: JSON.parse(JSON.stringify(PRODUCTS_DATA)),
    filteredCategory: 'all',
    searchQuery: '',
    sortBy: 'popular',
    cart: [],
    coupon: null, // { code: 'FRESH10', discountPercent: 10 }
    reviews: []
  };

  // --------------------------------------------------------------------------
  // UI Initialization
  // --------------------------------------------------------------------------
  function init() {
    loadSavedState();
    setupHeaderScroll();
    setupEventListeners();
    setupAIThemeToggle();
    initAICanvas();
    renderDailyPriceBoard();
    renderProducts();
    renderReviews();
    updateCartUI();
    setCurrentYear();
    setLivePriceDate();
    initLiveShopHours();
  }

  // --------------------------------------------------------------------------
  // Storage & State Helpers
  // --------------------------------------------------------------------------
  function loadSavedState() {
    try {
      const savedCart = localStorage.getItem(SHOP_CONFIG.storageKeys.cart);
      if (savedCart) {
        state.cart = JSON.parse(savedCart);
      }
    } catch (e) {
      console.warn('Could not load cart from storage', e);
      state.cart = [];
    }

    try {
      const savedReviews = localStorage.getItem(SHOP_CONFIG.storageKeys.reviews);
      if (savedReviews) {
        state.reviews = JSON.parse(savedReviews);
      } else {
        state.reviews = [...DEFAULT_REVIEWS];
      }
    } catch (e) {
      state.reviews = [...DEFAULT_REVIEWS];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(SHOP_CONFIG.storageKeys.cart, JSON.stringify(state.cart));
    } catch (e) {
      console.warn('Could not save cart', e);
    }
  }

  function saveReviews() {
    try {
      localStorage.setItem(SHOP_CONFIG.storageKeys.reviews, JSON.stringify(state.reviews));
    } catch (e) {
      console.warn('Could not save reviews', e);
    }
  }

  function setCurrentYear() {
    const el = document.getElementById('currentYear');
    if (el) el.textContent = new Date().getFullYear();
  }

  function setLivePriceDate() {
    const el = document.getElementById('livePriceDate');
    if (el) {
      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      el.textContent = new Date().toLocaleDateString('en-US', options);
    }
  }

  // --------------------------------------------------------------------------
  // Real-Time Live Shop Operating Hours Tracker (07:00 - 21:00)
  // --------------------------------------------------------------------------
  function initLiveShopHours() {
    updateShopLiveStatus();
    // Re-check every 10 seconds for real-time live accuracy
    setInterval(updateShopLiveStatus, 10000);
  }

  function getShopStatus() {
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();
    const openMins = SHOP_CONFIG.openingHour * 60 + (SHOP_CONFIG.openingMinute || 0); // 07:00 -> 420 mins
    const closeMins = SHOP_CONFIG.closingHour * 60 + (SHOP_CONFIG.closingMinute || 0); // 21:00 (09:00 PM) -> 1260 mins

    const isOpen = currentMins >= openMins && currentMins < closeMins;
    const isClosingSoon = isOpen && (closeMins - currentMins <= 30); // within 30 minutes of closing (after 8:30 PM)

    // Format local time e.g. "07:46 PM"
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHour12 = hours % 12 || 12;
    const formatted12 = `${String(displayHour12).padStart(2, '0')}:${minutes} ${ampm}`;

    return {
      isOpen,
      isClosingSoon,
      formattedTime: formatted12,
      openTimeStr: SHOP_CONFIG.openTimeStr,
      closeTimeStr: SHOP_CONFIG.closeTimeStr
    };
  }

  function updateShopLiveStatus() {
    const status = getShopStatus();

    // 1. Top bar indicator
    const topStatus = document.getElementById('topShopStatus');
    if (topStatus) {
      if (status.isOpen) {
        if (status.isClosingSoon) {
          topStatus.className = 'shop-live-status-pill status-closing-soon';
          topStatus.innerHTML = `<span class="status-live-dot"></span> <span class="status-live-text">Closing Soon (at ${status.closeTimeStr})</span>`;
        } else {
          topStatus.className = 'shop-live-status-pill status-open';
          topStatus.innerHTML = `<span class="status-live-dot"></span> <span class="status-live-text"><strong>OPEN NOW</strong> &bull; Closes ${status.closeTimeStr}</span>`;
        }
      } else {
        topStatus.className = 'shop-live-status-pill status-closed';
        topStatus.innerHTML = `<span class="status-live-dot"></span> <span class="status-live-text"><strong>CLOSED NOW</strong> &bull; Opens ${status.openTimeStr}</span>`;
      }
    }

    // 2. Header live badge
    const headerStatus = document.getElementById('headerShopStatus');
    if (headerStatus) {
      if (status.isOpen) {
        if (status.isClosingSoon) {
          headerStatus.className = 'header-live-badge status-closing-soon';
          headerStatus.innerHTML = `<span class="status-live-dot"></span> <span class="live-label">Closing Soon</span> <span class="live-sub">at ${status.closeTimeStr}</span>`;
        } else {
          headerStatus.className = 'header-live-badge status-open';
          headerStatus.innerHTML = `<span class="status-live-dot"></span> <span class="live-label">OPEN NOW</span> <span class="live-sub">07:00–09:00 PM</span>`;
        }
      } else {
        headerStatus.className = 'header-live-badge status-closed';
        headerStatus.innerHTML = `<span class="status-live-dot"></span> <span class="live-label">CLOSED NOW</span> <span class="live-sub">Opens 07:00 AM</span>`;
      }
    }

    // 3. Contact / Location Section live badge & live outlet clock
    const contactStatus = document.getElementById('contactShopStatus');
    if (contactStatus) {
      if (status.isOpen) {
        if (status.isClosingSoon) {
          contactStatus.className = 'shop-hours-live-tag status-closing-soon';
          contactStatus.innerHTML = `<span class="status-live-dot"></span> <span class="status-live-text">Closing Soon &bull; Closes ${status.closeTimeStr}</span>`;
        } else {
          contactStatus.className = 'shop-hours-live-tag status-open';
          contactStatus.innerHTML = `<span class="status-live-dot"></span> <span class="status-live-text">OPEN NOW &bull; Closes ${status.closeTimeStr}</span>`;
        }
      } else {
        contactStatus.className = 'shop-hours-live-tag status-closed';
        contactStatus.innerHTML = `<span class="status-live-dot"></span> <span class="status-live-text">CLOSED NOW &bull; Opens Tomorrow at ${status.openTimeStr}</span>`;
      }
    }

    const currentLocalClock = document.getElementById('currentLocalClock');
    if (currentLocalClock) {
      currentLocalClock.textContent = status.formattedTime;
    }

    // 4. Mobile Drawer Status
    const drawerStatus = document.getElementById('drawerShopStatus');
    if (drawerStatus) {
      if (status.isOpen) {
        drawerStatus.className = 'drawer-status-box status-open';
        drawerStatus.innerHTML = `
          <div class="drawer-status-pill"><span class="status-live-dot"></span> Shop is OPEN NOW</div>
          <small>Working hours: 07:00 AM – 09:00 PM</small>
        `;
      } else {
        drawerStatus.className = 'drawer-status-box status-closed';
        drawerStatus.innerHTML = `
          <div class="drawer-status-pill"><span class="status-live-dot"></span> Shop is CLOSED NOW</div>
          <small>Dispatches start tomorrow at 07:00 AM</small>
        `;
      }
    }

    // 5. Checkout Modal Note
    const checkoutNote = document.getElementById('checkoutStoreStatusNote');
    if (checkoutNote) {
      if (!status.isOpen) {
        checkoutNote.style.display = 'flex';
        checkoutNote.className = 'store-status-checkout-note status-closed-note';
        checkoutNote.innerHTML = `
          <i class="fa-solid fa-moon note-icon"></i>
          <div>
            <strong>We are currently closed for the night (07:00 AM – 09:00 PM).</strong>
            <p>You can still place your order now! Our farm butchery will prepare and dispatch it fresh at <strong>07:00 AM</strong> tomorrow morning.</p>
          </div>
        `;
      } else if (status.isClosingSoon) {
        checkoutNote.style.display = 'flex';
        checkoutNote.className = 'store-status-checkout-note status-closing-note';
        checkoutNote.innerHTML = `
          <i class="fa-solid fa-clock-rotate-left note-icon"></i>
          <div>
            <strong>Shop closes soon at 09:00 PM!</strong>
            <p>Orders placed now are processed for immediate express evening delivery.</p>
          </div>
        `;
      } else {
        checkoutNote.style.display = 'flex';
        checkoutNote.className = 'store-status-checkout-note status-open-note';
        checkoutNote.innerHTML = `
          <i class="fa-solid fa-circle-check note-icon"></i>
          <div>
            <strong>Shop is LIVE & OPEN! (07:00 AM – 09:00 PM)</strong>
            <p>Fresh batch available right now. Estimated express delivery in 45-60 mins.</p>
          </div>
        `;
      }
    }
  }

  // --------------------------------------------------------------------------
  // AI Futuristic Neural Particle Background Canvas Engine
  // --------------------------------------------------------------------------
  let aiCanvasAnimId = null;

  function initAICanvas() {
    const canvas = document.getElementById('aiNeuralCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createNodes();
    });

    const colors = ['#00E5FF', '#A855F7', '#FF3366', '#38BDF8'];
    let nodes = [];

    function createNodes() {
      nodes = [];
      const count = Math.min(85, Math.max(38, Math.floor((width * height) / 22000)));

      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: Math.random() * 2 + 1.2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    }

    createNodes();

    function animate() {
      // If AI theme is deactivated, loop with low overhead
      if (!document.body.classList.contains('ai-theme')) {
        aiCanvasAnimId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Connect nearby nodes
      const maxDistance = 120;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.28;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 229, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Connect nodes to mouse position
      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < nodes.length; i++) {
          const dx = nodes[i].x - mouse.x;
          const dy = nodes[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const lineAlpha = (1 - dist / mouse.radius) * 0.45;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 1.1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Gentle reactive pull towards cursor
            nodes[i].x -= dx * 0.015;
            nodes[i].y -= dy * 0.015;
          }
        }
      }

      // Update and draw each node
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      aiCanvasAnimId = requestAnimationFrame(animate);
    }

    animate();
  }

  // --------------------------------------------------------------------------
  // AI Theme Switcher Engine
  // --------------------------------------------------------------------------
  function setupAIThemeToggle() {
    const toggleBtn = document.getElementById('aiThemeToggleBtn');
    const drawerToggleBtn = document.getElementById('drawerAiToggleBtn');

    // Default to true (AI theme active on first load)
    let isAiTheme = localStorage.getItem('ranjani_ai_theme') !== 'false';

    function applyTheme(active, notify = false) {
      if (active) {
        document.body.classList.add('ai-theme');
        if (toggleBtn) {
          toggleBtn.classList.add('active');
          toggleBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> <span class="ai-toggle-text">AI Mode ON</span>';
        }
        if (drawerToggleBtn) {
          drawerToggleBtn.classList.add('active');
        }
        localStorage.setItem('ranjani_ai_theme', 'true');
        if (notify) showToast('AI Futuristic Cyber Theme activated! ⚡', 'success');
      } else {
        document.body.classList.remove('ai-theme');
        if (toggleBtn) {
          toggleBtn.classList.remove('active');
          toggleBtn.innerHTML = '<i class="fa-solid fa-sparkles"></i> <span class="ai-toggle-text">Classic Theme</span>';
        }
        if (drawerToggleBtn) {
          drawerToggleBtn.classList.remove('active');
        }
        localStorage.setItem('ranjani_ai_theme', 'false');
        if (notify) showToast('Switched to Classic Daylight Farm Theme', 'info');
      }
    }

    // Apply initial state
    applyTheme(isAiTheme, false);

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        isAiTheme = !document.body.classList.contains('ai-theme');
        applyTheme(isAiTheme, true);
      });
    }

    if (drawerToggleBtn) {
      drawerToggleBtn.addEventListener('click', () => {
        isAiTheme = !document.body.classList.contains('ai-theme');
        applyTheme(isAiTheme, true);
      });
    }
  }

  // --------------------------------------------------------------------------
  // Header & Navigation Listeners
  // --------------------------------------------------------------------------
  function setupHeaderScroll() {
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      if (currentScroll > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  function setupEventListeners() {
    // Mobile Drawer
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');

    function openDrawer() {
      mobileDrawer.classList.add('open');
      drawerOverlay.classList.add('open');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      mobileDrawer.classList.remove('open');
      drawerOverlay.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    document.querySelectorAll('.drawer-link').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Cart Drawer Toggle
    const cartOpenBtn = document.getElementById('cartOpenBtn');
    const cartCloseBtn = document.getElementById('cartCloseBtn');
    const cartOverlay = document.getElementById('cartOverlay');

    if (cartOpenBtn) cartOpenBtn.addEventListener('click', openCart);
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // Search Bar Dropdown Toggle
    const searchToggleBtn = document.getElementById('searchToggleBtn');
    const headerSearchBar = document.getElementById('headerSearchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClearBtn = document.getElementById('searchClearBtn');

    if (searchToggleBtn && headerSearchBar) {
      searchToggleBtn.addEventListener('click', () => {
        headerSearchBar.classList.toggle('active');
        if (headerSearchBar.classList.contains('active')) {
          searchInput.focus();
        }
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim().toLowerCase();
        const catInput = document.getElementById('catalogSearchInput');
        if (catInput) catInput.value = state.searchQuery;
        renderProducts();
        
        // Scroll slightly toward products if user is searching
        if (state.searchQuery.length > 2 && window.pageYOffset < 300) {
          const prodSection = document.getElementById('products');
          if (prodSection) prodSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        state.searchQuery = '';
        const catInput = document.getElementById('catalogSearchInput');
        if (catInput) catInput.value = '';
        renderProducts();
      });
    }

    // Catalog controls
    const catalogSearchInput = document.getElementById('catalogSearchInput');
    if (catalogSearchInput) {
      catalogSearchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim().toLowerCase();
        if (searchInput) searchInput.value = state.searchQuery;
        renderProducts();
      });
    }

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderProducts();
      });
    }

    // Category Tabs
    const catTabs = document.querySelectorAll('.cat-tab');
    catTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        catTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        state.filteredCategory = tab.dataset.category;
        renderProducts();
      });
    });

    // Accordion
    const accHeaders = document.querySelectorAll('.accordion-header');
    accHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close others
        document.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('active');
          i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
          i.querySelector('.accordion-content').style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
          const content = item.querySelector('.accordion-content');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });

    // Open Review Modal Button
    const openReviewModalBtn = document.getElementById('openReviewModalBtn');
    if (openReviewModalBtn) {
      openReviewModalBtn.addEventListener('click', () => {
        const modal = document.getElementById('reviewModal');
        if (modal) {
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    }

    // Star rating select in Review modal
    const starSelect = document.getElementById('starRatingSelect');
    if (starSelect) {
      const stars = starSelect.querySelectorAll('i');
      stars.forEach(star => {
        star.addEventListener('click', () => {
          const val = parseInt(star.dataset.rating, 10);
          document.getElementById('revRating').value = val;
          stars.forEach(s => {
            const sVal = parseInt(s.dataset.rating, 10);
            if (sVal <= val) {
              s.classList.add('active');
            } else {
              s.classList.remove('active');
            }
          });
        });
      });
    }
  }

  // --------------------------------------------------------------------------
  // Daily Price Board Rendering
  // --------------------------------------------------------------------------
  function renderDailyPriceBoard() {
    const grid = document.getElementById('dailyRatesGrid');
    if (!grid) return;

    // Pick top cuts to showcase on the live board
    const showcaseCuts = state.products.slice(0, 6);

    grid.innerHTML = showcaseCuts.map(prod => {
      const activeOption = prod.options[prod.selectedOptionIndex || 0];
      return `
        <div class="rate-item">
          <div class="rate-info">
            <h4>${escapeHtml(prod.name)}</h4>
            <span>${escapeHtml(prod.specs[0] || 'Cleaned & Chilled')}</span>
          </div>
          <div class="rate-cost">
            <span class="price">${SHOP_CONFIG.currencySymbol} ${activeOption.price.toLocaleString()}</span>
            <span class="unit">per ${activeOption.weight}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // --------------------------------------------------------------------------
  // Product Catalog Rendering & Filtering
  // --------------------------------------------------------------------------
  function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyProducts');
    if (!grid) return;

    let list = state.products.filter(item => {
      const matchCat = state.filteredCategory === 'all' || item.category === state.filteredCategory;
      const matchQuery = !state.searchQuery ||
        item.name.toLowerCase().includes(state.searchQuery) ||
        item.description.toLowerCase().includes(state.searchQuery) ||
        item.category.toLowerCase().includes(state.searchQuery);
      return matchCat && matchQuery;
    });

    // Sorting
    if (state.sortBy === 'price-low') {
      list.sort((a, b) => a.options[0].price - b.options[0].price);
    } else if (state.sortBy === 'price-high') {
      list.sort((a, b) => b.options[0].price - a.options[0].price);
    } else if (state.sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // popular
      list.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    if (list.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    grid.innerHTML = list.map(item => {
      const activeOpt = item.options[item.selectedOptionIndex || 0];
      const cartItem = state.cart.find(c => c.id === item.id && c.weight === activeOpt.weight);
      const cartQty = cartItem ? cartItem.quantity : 0;

      // Weight options buttons
      const weightButtons = item.options.map((opt, idx) => `
        <button class="weight-option ${idx === (item.selectedOptionIndex || 0) ? 'active' : ''}" 
                onclick="app.selectProductWeight('${item.id}', ${idx})">
          ${opt.label}
        </button>
      `).join('');

      return `
        <article class="product-card" id="card-${item.id}">
          <div class="product-img-wrap">
            <img src="${item.image}" alt="${escapeHtml(item.name)}" class="product-img" loading="lazy">
            ${item.badge ? `<span class="product-badge ${item.badgeClass}">${escapeHtml(item.badge)}</span>` : ''}
            <button class="product-quick-btn" onclick="app.openQuickView('${item.id}')" title="Quick View">
              <i class="fa-regular fa-eye"></i>
            </button>
          </div>
          
          <div class="product-body">
            <div class="product-meta-row">
              <span class="product-rating">
                <i class="fa-solid fa-star"></i> ${item.rating.toFixed(1)} (${item.reviewCount})
              </span>
              <span class="product-freshness"><i class="fa-solid fa-shield-check"></i> Antibiotic Free</span>
            </div>

            <h3 class="product-title">${escapeHtml(item.name)}</h3>
            <p class="product-desc">${escapeHtml(item.description)}</p>

            <div class="product-weight-selector">
              ${weightButtons}
            </div>

            <div class="product-footer">
              <div class="product-price-wrap">
                <span class="product-price">${SHOP_CONFIG.currencySymbol} ${activeOpt.price.toLocaleString()}</span>
                ${activeOpt.originalPrice ? `<span class="product-original-price">${SHOP_CONFIG.currencySymbol} ${activeOpt.originalPrice.toLocaleString()}</span>` : ''}
              </div>

              ${cartQty > 0 ? `
                <div class="qty-stepper">
                  <button class="qty-step-btn" onclick="app.updateItemQty('${item.id}', '${activeOpt.weight}', -1)" aria-label="Decrease quantity">&minus;</button>
                  <span class="qty-display">${cartQty}</span>
                  <button class="qty-step-btn" onclick="app.updateItemQty('${item.id}', '${activeOpt.weight}', 1)" aria-label="Increase quantity">&plus;</button>
                </div>
              ` : `
                <button class="btn-add-cart" onclick="app.addToCart('${item.id}')">
                  <i class="fa-solid fa-plus"></i> Add
                </button>
              `}
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function selectProductWeight(productId, optionIndex) {
    const prod = state.products.find(p => p.id === productId);
    if (!prod) return;
    prod.selectedOptionIndex = optionIndex;
    renderProducts();
  }

  function filterByCut(categoryName) {
    state.filteredCategory = categoryName;
    const catTabs = document.querySelectorAll('.cat-tab');
    catTabs.forEach(t => {
      if (t.dataset.category === categoryName) {
        t.classList.add('active');
        t.setAttribute('aria-selected', 'true');
      } else {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      }
    });

    renderProducts();
    const productsEl = document.getElementById('products');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function resetFilters() {
    state.filteredCategory = 'all';
    state.searchQuery = '';
    const catSearch = document.getElementById('catalogSearchInput');
    const headSearch = document.getElementById('searchInput');
    if (catSearch) catSearch.value = '';
    if (headSearch) headSearch.value = '';

    const catTabs = document.querySelectorAll('.cat-tab');
    catTabs.forEach(t => {
      t.classList.toggle('active', t.dataset.category === 'all');
      t.setAttribute('aria-selected', t.dataset.category === 'all' ? 'true' : 'false');
    });

    renderProducts();
  }

  // --------------------------------------------------------------------------
  // Shopping Cart Engine
  // --------------------------------------------------------------------------
  function addToCart(productId, specificWeight, specificQty) {
    const prod = state.products.find(p => p.id === productId);
    if (!prod) return;

    const optIndex = prod.selectedOptionIndex || 0;
    const selectedOption = prod.options[optIndex];
    const weight = specificWeight || selectedOption.weight;
    const optObj = prod.options.find(o => o.weight === weight) || selectedOption;
    const qty = specificQty || 1;

    const existingCartItem = state.cart.find(c => c.id === prod.id && c.weight === weight);

    if (existingCartItem) {
      existingCartItem.quantity += qty;
    } else {
      state.cart.push({
        id: prod.id,
        name: prod.name,
        image: prod.image,
        weight: weight,
        unitPrice: optObj.price,
        quantity: qty
      });
    }

    saveCart();
    updateCartUI();
    renderProducts();
    showToast(`Added ${prod.name} (${weight}) to your basket!`, 'success');
  }

  function updateItemQty(productId, weight, change) {
    const itemIndex = state.cart.findIndex(c => c.id === productId && c.weight === weight);
    if (itemIndex === -1) return;

    state.cart[itemIndex].quantity += change;

    if (state.cart[itemIndex].quantity <= 0) {
      state.cart.splice(itemIndex, 1);
      showToast('Item removed from basket', 'info');
    }

    saveCart();
    updateCartUI();
    renderProducts();
  }

  function removeCartItem(productId, weight) {
    state.cart = state.cart.filter(c => !(c.id === productId && c.weight === weight));
    saveCart();
    updateCartUI();
    renderProducts();
    showToast('Item removed from basket', 'info');
  }

  function quickAddFeaturedProduct() {
    // Add Signature Curry cut (1kg)
    addToCart('cut-01', '1kg', 1);
    openCart();
  }

  function updateCartUI() {
    const cartCountBadge = document.getElementById('cartCountBadge');
    const drawerCartCount = document.getElementById('drawerCartCount');
    const cartItemsList = document.getElementById('cartItemsList');
    const emptyCartState = document.getElementById('emptyCartState');
    const cartFooter = document.getElementById('cartFooter');
    const cartDeliveryMeter = document.getElementById('cartDeliveryMeter');

    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

    // Badges
    if (cartCountBadge) cartCountBadge.textContent = totalCount;
    if (drawerCartCount) drawerCartCount.textContent = `(${totalCount} ${totalCount === 1 ? 'item' : 'items'})`;

    // Empty vs items view
    if (state.cart.length === 0) {
      if (emptyCartState) emptyCartState.classList.add('active');
      if (cartItemsList) cartItemsList.style.display = 'none';
      if (cartFooter) cartFooter.style.display = 'none';
      if (cartDeliveryMeter) cartDeliveryMeter.style.display = 'none';
      return;
    }

    if (emptyCartState) emptyCartState.classList.remove('active');
    if (cartItemsList) cartItemsList.style.display = 'flex';
    if (cartFooter) cartFooter.style.display = 'block';
    if (cartDeliveryMeter) cartDeliveryMeter.style.display = 'block';

    // Render Items
    if (cartItemsList) {
      cartItemsList.innerHTML = state.cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${escapeHtml(item.name)}" class="cart-item-img">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${escapeHtml(item.name)}</h4>
            <span class="cart-item-weight">Cut Weight: ${escapeHtml(item.weight)}</span>
            <div class="cart-item-price">${SHOP_CONFIG.currencySymbol} ${(item.unitPrice * item.quantity).toLocaleString()}</div>
          </div>
          <div class="cart-item-actions">
            <button class="cart-item-del-btn" onclick="app.removeCartItem('${item.id}', '${item.weight}')" title="Remove item">
              <i class="fa-regular fa-trash-can"></i>
            </button>
            <div class="qty-stepper">
              <button class="qty-step-btn" onclick="app.updateItemQty('${item.id}', '${item.weight}', -1)">&minus;</button>
              <span class="qty-display">${item.quantity}</span>
              <button class="qty-step-btn" onclick="app.updateItemQty('${item.id}', '${item.weight}', 1)">&plus;</button>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Calculations
    let discount = 0;
    if (state.coupon) {
      if (state.coupon.percent) {
        discount = Math.round(subtotal * (state.coupon.percent / 100));
      } else if (state.coupon.flat) {
        discount = state.coupon.flat;
      }
    }

    const deliveryFee = subtotal >= SHOP_CONFIG.freeDeliveryThreshold ? 0 : SHOP_CONFIG.standardDeliveryFee;
    const finalTotal = Math.max(0, subtotal - discount + deliveryFee);

    // Free delivery meter
    const meterFill = document.getElementById('meterFill');
    const meterText = document.getElementById('meterText');

    if (subtotal >= SHOP_CONFIG.freeDeliveryThreshold) {
      if (meterFill) meterFill.style.width = '100%';
      if (meterText) meterText.innerHTML = '<strong class="text-success"><i class="fa-solid fa-gift"></i> Congratulations! You qualified for FREE Delivery!</strong>';
    } else {
      const remaining = SHOP_CONFIG.freeDeliveryThreshold - subtotal;
      const percentage = Math.min(100, Math.round((subtotal / SHOP_CONFIG.freeDeliveryThreshold) * 100));
      if (meterFill) meterFill.style.width = percentage + '%';
      if (meterText) meterText.innerHTML = `Add <strong>${SHOP_CONFIG.currencySymbol} ${remaining.toLocaleString()}</strong> more for <strong>FREE Delivery</strong>!`;
    }

    // Summary lines
    const subtotalEl = document.getElementById('cartSubtotal');
    const deliveryFeeEl = document.getElementById('cartDeliveryFee');
    const totalEl = document.getElementById('cartTotal');
    const discountLine = document.getElementById('discountLine');
    const discountPercent = document.getElementById('discountPercent');
    const cartDiscount = document.getElementById('cartDiscount');

    if (subtotalEl) subtotalEl.textContent = `${SHOP_CONFIG.currencySymbol} ${subtotal.toLocaleString()}`;
    if (deliveryFeeEl) deliveryFeeEl.textContent = deliveryFee === 0 ? 'FREE' : `${SHOP_CONFIG.currencySymbol} ${deliveryFee.toLocaleString()}`;
    if (totalEl) totalEl.textContent = `${SHOP_CONFIG.currencySymbol} ${finalTotal.toLocaleString()}`;

    if (discount > 0 && discountLine) {
      discountLine.style.display = 'flex';
      if (discountPercent) discountPercent.textContent = state.coupon.percent ? `${state.coupon.percent}%` : 'FLAT';
      if (cartDiscount) cartDiscount.textContent = `- ${SHOP_CONFIG.currencySymbol} ${discount.toLocaleString()}`;
    } else if (discountLine) {
      discountLine.style.display = 'none';
    }
  }

  function applyCoupon() {
    const input = document.getElementById('couponCodeInput');
    const msg = document.getElementById('couponMessage');
    if (!input || !msg) return;

    const code = input.value.trim().toUpperCase();

    if (code === 'FRESH10') {
      state.coupon = { code: 'FRESH10', percent: 10 };
      msg.className = 'coupon-msg success';
      msg.textContent = 'Awesome! 10% Farm discount applied!';
      showToast('10% Discount Applied!', 'success');
    } else if (code === 'FARM100') {
      state.coupon = { code: 'FARM100', flat: 100 };
      msg.className = 'coupon-msg success';
      msg.textContent = 'Awesome! Rs. 100 flat discount applied!';
      showToast('Rs. 100 Discount Applied!', 'success');
    } else {
      state.coupon = null;
      msg.className = 'coupon-msg error';
      msg.textContent = 'Invalid promo code. Try: FRESH10';
      showToast('Invalid coupon code', 'error');
    }

    updateCartUI();
  }

  function openCart() {
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartDrawer) cartDrawer.classList.add('open');
    if (cartOverlay) cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartDrawer) cartDrawer.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // --------------------------------------------------------------------------
  // Quick View Modal
  // --------------------------------------------------------------------------
  function openQuickView(productId) {
    const prod = state.products.find(p => p.id === productId);
    if (!prod) return;

    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');
    if (!modal || !content) return;

    const activeOpt = prod.options[prod.selectedOptionIndex || 0];

    content.innerHTML = `
      <div class="quick-view-grid">
        <div>
          <img src="${prod.image}" alt="${escapeHtml(prod.name)}" class="quick-view-img">
        </div>
        <div class="quick-view-details">
          <span class="badge-tag"><i class="fa-solid fa-leaf"></i> 100% Farm Fresh</span>
          <h2>${escapeHtml(prod.name)}</h2>
          <div class="quick-view-price">${SHOP_CONFIG.currencySymbol} ${activeOpt.price.toLocaleString()} <small style="font-size: 0.8rem; color: #666;">/ ${activeOpt.weight}</small></div>
          <p class="quick-view-desc">${escapeHtml(prod.description)}</p>

          <ul class="quick-view-specs">
            ${prod.specs.map(s => `<li><i class="fa-solid fa-circle-check"></i> ${escapeHtml(s)}</li>`).join('')}
            <li><i class="fa-solid fa-fire-burner"></i> <strong>Chef Tip:</strong> ${escapeHtml(prod.cookingTip)}</li>
          </ul>

          <div style="display: flex; gap: 10px; margin-top: 15px;">
            <button class="btn btn-primary btn-block" onclick="app.addToCart('${prod.id}'); app.closeQuickView();">
              <i class="fa-solid fa-bag-shopping"></i> Add to Basket &bull; ${SHOP_CONFIG.currencySymbol} ${activeOpt.price.toLocaleString()}
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // --------------------------------------------------------------------------
  // Checkout & WhatsApp Integration Engine
  // --------------------------------------------------------------------------
  let checkoutMode = 'whatsapp'; // 'whatsapp' or 'cod'

  function openCheckoutModal(mode) {
    if (state.cart.length === 0) {
      showToast('Your basket is empty. Please add chicken items first.', 'info');
      return;
    }

    checkoutMode = mode || 'whatsapp';
    closeCart();

    const modal = document.getElementById('checkoutModal');
    const title = document.getElementById('checkoutModalTitle');
    const submitBtn = document.getElementById('checkoutSubmitBtn');
    const summaryMini = document.getElementById('checkoutMiniSummary');

    if (title) {
      title.textContent = checkoutMode === 'whatsapp' ? 'Order Directly on WhatsApp' : 'Direct Home Delivery Checkout';
    }

    if (submitBtn) {
      if (checkoutMode === 'whatsapp') {
        submitBtn.className = 'btn btn-whatsapp-full btn-lg';
        submitBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Confirm & Send Order to WhatsApp';
      } else {
        submitBtn.className = 'btn btn-primary btn-block btn-lg';
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Confirm Order (Cash / Card on Delivery)';
      }
    }

    // Mini summary
    const subtotal = state.cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    let discount = 0;
    if (state.coupon) {
      discount = state.coupon.percent ? Math.round(subtotal * (state.coupon.percent / 100)) : (state.coupon.flat || 0);
    }
    const deliveryFee = subtotal >= SHOP_CONFIG.freeDeliveryThreshold ? 0 : SHOP_CONFIG.standardDeliveryFee;
    const finalTotal = Math.max(0, subtotal - discount + deliveryFee);

    if (summaryMini) {
      summaryMini.innerHTML = `
        <div style="font-weight: 700; margin-bottom: 8px;">Order Summary (${state.cart.length} unique items):</div>
        <ul style="margin-bottom: 8px; padding-left: 18px; color: #555;">
          ${state.cart.map(c => `<li>${escapeHtml(c.name)} (${c.weight}) &times; ${c.quantity} = ${SHOP_CONFIG.currencySymbol} ${(c.unitPrice * c.quantity).toLocaleString()}</li>`).join('')}
        </ul>
        <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 1rem; border-top: 1px dashed #ccc; padding-top: 8px;">
          <span>Payable Amount:</span>
          <span style="color: var(--primary);">${SHOP_CONFIG.currencySymbol} ${finalTotal.toLocaleString()}</span>
        </div>
      `;
    }

    if (modal) {
      updateShopLiveStatus();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function handleDeliveryTypeChange() {
    const typeSelect = document.getElementById('orderDeliveryType');
    const addressGroup = document.getElementById('addressGroup');
    const addressInput = document.getElementById('orderCustomerAddress');
    
    if (typeSelect && addressGroup) {
      if (typeSelect.value === 'pickup') {
        addressGroup.style.display = 'none';
        if (addressInput) addressInput.required = false;
      } else {
        addressGroup.style.display = 'block';
        if (addressInput) addressInput.required = true;
      }
    }
  }

  function processCheckout(e) {
    e.preventDefault();

    const name = document.getElementById('orderCustomerName').value.trim();
    const phone = document.getElementById('orderCustomerPhone').value.trim();
    const deliveryType = document.getElementById('orderDeliveryType').value;
    const address = document.getElementById('orderCustomerAddress') ? document.getElementById('orderCustomerAddress').value.trim() : '';
    const cutInstructions = document.getElementById('orderCutInstructions').value.trim();
    const payment = document.getElementById('orderPaymentMethod').value;

    if (!name || !phone) {
      showToast('Please provide your name and contact phone number', 'error');
      return;
    }

    if (deliveryType === 'delivery' && !address) {
      showToast('Please provide your delivery address', 'error');
      return;
    }

    const orderId = 'RFS-' + Math.floor(100000 + Math.random() * 900000);
    const subtotal = state.cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    let discount = 0;
    if (state.coupon) {
      discount = state.coupon.percent ? Math.round(subtotal * (state.coupon.percent / 100)) : (state.coupon.flat || 0);
    }
    const deliveryFee = deliveryType === 'pickup' ? 0 : (subtotal >= SHOP_CONFIG.freeDeliveryThreshold ? 0 : SHOP_CONFIG.standardDeliveryFee);
    const totalAmount = Math.max(0, subtotal - discount + deliveryFee);

    if (checkoutMode === 'whatsapp') {
      // Build WhatsApp pre-filled text
      let text = `*New Order - Ranjani Farm Shop*\n`;
      text += `*Order ID:* ${orderId}\n`;
      text += `*Customer:* ${name}\n`;
      text += `*Phone:* ${phone}\n`;
      text += `*Fulfillment:* ${deliveryType === 'pickup' ? 'Self-Pickup at Shop Counter' : 'Express Home Delivery'}\n`;
      if (deliveryType === 'delivery') {
        text += `*Address:* ${address}\n`;
      }
      if (cutInstructions) {
        text += `*Cutting Instructions:* ${cutInstructions}\n`;
      }
      text += `*Payment:* ${payment}\n\n`;

      text += `*Items Ordered:*\n`;
      state.cart.forEach((item, idx) => {
        text += `${idx + 1}. ${item.name} (${item.weight}) x ${item.quantity} = ${SHOP_CONFIG.currencySymbol} ${(item.unitPrice * item.quantity).toLocaleString()}\n`;
      });

      text += `\n*Subtotal:* ${SHOP_CONFIG.currencySymbol} ${subtotal.toLocaleString()}\n`;
      if (discount > 0) {
        text += `*Discount (${state.coupon.code}):* -${SHOP_CONFIG.currencySymbol} ${discount.toLocaleString()}\n`;
      }
      text += `*Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : `${SHOP_CONFIG.currencySymbol} ${deliveryFee.toLocaleString()}`}\n`;
      text += `*Grand Total:* *${SHOP_CONFIG.currencySymbol} ${totalAmount.toLocaleString()}*\n\n`;
      text += `Please confirm my order and approximate delivery time! Thank you! 🍗`;

      const encodedUrl = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(encodedUrl, '_blank');

      showToast('Order generated! Opening WhatsApp...', 'success');
    } else {
      // Direct Web Checkout Simulation
      showToast(`Order #${orderId} placed successfully! We will call you at ${phone} to confirm.`, 'success');
    }

    // Reset Cart & Close Modal
    state.cart = [];
    state.coupon = null;
    saveCart();
    updateCartUI();
    renderProducts();
    closeCheckoutModal();
  }

  // --------------------------------------------------------------------------
  // Reviews & Testimonials Engine
  // --------------------------------------------------------------------------
  function renderReviews() {
    const grid = document.getElementById('reviewsGrid');
    if (!grid) return;

    grid.innerHTML = state.reviews.map(rev => `
      <div class="review-card">
        <div class="review-header">
          <div class="review-stars">
            ${Array(rev.rating).fill('<i class="fa-solid fa-star"></i>').join('')}
          </div>
          <span class="verified-badge"><i class="fa-solid fa-circle-check"></i> Verified Purchase</span>
        </div>
        <p>"${escapeHtml(rev.comment)}"</p>
        <div class="review-author">
          <div class="review-avatar">${rev.name.charAt(0).toUpperCase()}</div>
          <div class="author-info">
            <strong>${escapeHtml(rev.name)}</strong>
            <span>${escapeHtml(rev.location || 'Verified Customer')} &bull; Bought: ${escapeHtml(rev.cut || 'Curry Cut')}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  function handleReviewSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('revName').value.trim();
    const cut = document.getElementById('revCut').value;
    const rating = parseInt(document.getElementById('revRating').value, 10) || 5;
    const comment = document.getElementById('revComment').value.trim();

    if (!name || !comment) {
      showToast('Please fill all review fields', 'error');
      return;
    }

    const newReview = {
      id: 'rev-' + Date.now(),
      name: name,
      location: 'Valued Customer',
      cut: cut,
      rating: rating,
      date: 'Just now',
      comment: comment
    };

    state.reviews.unshift(newReview);
    saveReviews();
    renderReviews();
    closeReviewModal();
    showToast('Thank you! Your review has been published.', 'success');
    e.target.reset();
  }

  function closeReviewModal() {
    const modal = document.getElementById('reviewModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // --------------------------------------------------------------------------
  // Contact & Newsletter Forms
  // --------------------------------------------------------------------------
  function handleContactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const type = document.getElementById('contactType').value;
    const msg = document.getElementById('contactMessage').value.trim();

    // Prepare WhatsApp link as option
    const query = `Hi Ranjani Farm Shop, my name is ${name} (${phone}). Inquiry Type: ${type}. Message: ${msg}`;
    const waUrl = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(query)}`;

    showToast(`Thank you, ${name}! Your inquiry has been sent to our shop team.`, 'success');
    e.target.reset();

    // Open WhatsApp after a brief delay
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1200);
  }

  function handleNewsletter(e) {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value.trim();
    if (email) {
      showToast('Subscribed! You will receive our freshest deals & price drops.', 'success');
      e.target.reset();
    }
  }

  // --------------------------------------------------------------------------
  // Toast Notifications
  // --------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-circle-check';
    if (type === 'error') icon = 'fa-circle-exclamation';

    toast.innerHTML = `
      <i class="fa-solid ${icon}"></i>
      <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s forwards';
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 300);
    }, 3500);
  }

  // --------------------------------------------------------------------------
  // Security & String Escaping
  // --------------------------------------------------------------------------
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --------------------------------------------------------------------------
  // Global API Exposure
  // --------------------------------------------------------------------------
  window.app = {
    addToCart,
    updateItemQty,
    removeCartItem,
    quickAddFeaturedProduct,
    selectProductWeight,
    filterByCut,
    resetFilters,
    openCart,
    closeCart,
    applyCoupon,
    openQuickView,
    closeQuickView,
    openCheckoutModal,
    closeCheckoutModal,
    handleDeliveryTypeChange,
    processCheckout,
    closeReviewModal,
    handleReviewSubmit,
    handleContactSubmit,
    handleNewsletter,
    setupAIThemeToggle,
    showToast
  };

  // Launch when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
