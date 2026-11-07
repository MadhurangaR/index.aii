# 🍗 Ranjani Farm Shop — Modern Poultry & Chicken Shop Website

A complete, high-converting, modern, and responsive website built for **Ranjani Farm Shop** using pure **HTML5, CSS3, and modern JavaScript (ES6+)**.

---

## 🌟 Key Features

1. **Brand Identity & Farm Aesthetic**
   - Clean, fresh farm theme with warm organic poultry tones (poultry crimson, roast amber, and pasture green).
   - Fully responsive for mobile phones, tablets, laptops, and ultra-wide desktop monitors.
   - Smooth animations, sticky blur navigation header, and back-to-top floating control.

2. **Today's Live Fresh Price Board**
   - Displays real-time daily rates for popular chicken cuts (Curry Cut, Boneless Breast, Drumsticks, Country Chicken, Farm Eggs, Wings).
   - Automatically timestamps with today's date and "Market Fresh / Cut to Order" status.

3. **Interactive Product Catalog & Categorization**
   - **Filter Tabs**:
     - *All Cuts*
     - *Curry & Biryani*
     - *Boneless & Breast*
     - *Legs & Wings*
     - *Country Chicken (Naatu Kozhi / Desi)*
     - *Farm Fresh Eggs*
     - *Marinated Ready-To-Fry*
   - **Instant Live Search**: Search cuts by name or description with real-time feedback.
   - **Sorting**: Sort by Most Popular, Price Low-to-High, Price High-to-Low, or Highest Customer Rating.
   - **Weight Selector**: Choose between 500g, 1kg, or custom packs on each card with automatic price calculation.

4. **Dynamic Slide-Over Shopping Basket**
   - Slide-in drawer with cart item management.
   - Quantity counter (`+` and `-`) with instant price recalculations.
   - **Free Delivery Progress Meter**: Visual bar showing how close the customer is to unlocking free delivery (threshold set to Rs. 3,500).
   - **Coupon System**: Try code `FRESH10` for 10% off or `FARM100` for a flat Rs. 100 discount.
   - Persists in `localStorage` so the basket is preserved even when refreshing the page.

5. **Direct WhatsApp Ordering System**
   - Generates an itemized order message with emojis, Order ID, customer details, fulfillment method, custom cutting preferences (e.g. biryani cuts, skinless), subtotal, delivery fee, and grand total.
   - Directly triggers `wa.me/` to send the complete order to the shop's WhatsApp with one click!

6. **Quick View & Recipe Suggestions**
   - Modal popup showing detailed butcher specifications, chef cooking tips, and high-res imagery.
   - Dedicated "Cook Like a Master Chef" recipe section pairing cuts with dishes (Roast Drumsticks, Butter Chicken, Village Curry).

7. **Interactive Customer Testimonials & Reviews**
   - Pre-populated authentic reviews with star ratings and verified purchase badges.
   - Includes a "Leave a Review" modal where customers can submit their own ratings and comments stored locally.

8. **Contact, Shop Outlet & FAQ Section**
   - Outlet location, daily opening hours, telephone hotline, and WhatsApp links.
   - Direct inquiry / bulk hotel catering order form.
   - Interactive FAQ accordion addressing freshness, customization, and delivery zones.

---

## 📁 File Structure

```
Index/
│
├── index.html        # Main semantic HTML5 webpage with all sections and modals
├── style.css         # Complete CSS3 design system, responsive styles, animations
├── app.js            # JavaScript engine (Catalog, Cart, WhatsApp order, Modals)
└── README.md         # Documentation and customization guide
```

---

## 🚀 How to Run the Website

### Option 1: Direct in Browser
Simply double-click `index.html` or open it with any web browser (Google Chrome, Edge, Safari, Firefox).

### Option 2: Using VS Code Live Server
1. Open the folder in VS Code / Antigravity IDE.
2. Right-click on `index.html` and click **"Open with Live Server"**.

---

## ⚙️ How to Customize for Your Shop

All configuration settings are grouped at the top of `app.js` under `SHOP_CONFIG`:

```javascript
const SHOP_CONFIG = {
  name: 'Ranjani Farm Shop',
  phone: '075 772 8547',
  whatsappNumber: '94757728547', // WhatsApp number (0757728547)
  address: '167/1, Meewala, Nittambuwa',
  currencySymbol: 'Rs.',          // Change to '₹', '$', 'LKR' or your currency
  freeDeliveryThreshold: 3500,    // Amount for free delivery
  standardDeliveryFee: 250,       // Default delivery fee
};
```

### Changing Products or Prices
In `app.js`, look for the `PRODUCTS_DATA` array. You can easily:
- Adjust prices and original discounted prices.
- Add new cuts or chicken sausages, liver, gizzard, etc.
- Replace image URLs with your shop's own fresh chicken photos.

---

## 📱 Mobile Friendly
Designed mobile-first. Includes a slide-out hamburger navigation drawer on mobile screens and accessible buttons for quick phone calls and WhatsApp orders.
