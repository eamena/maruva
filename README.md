# Maruva - Sustainable Beauty & Wellness Website

A modern, responsive website for Maruva, showcasing sustainable beauty and personal care products with an elegant Spanish-language design and smooth user experience.

## 🌟 Features

- **Fully Responsive Design** - Works on desktop, tablet, and mobile devices
- **Product Catalog** - Dedicated category pages with product grid
- **Interactive Product Modals** - Click any product card to open a detailed modal with image, price, description, usage, and ingredients
- **Product Type Badges** - Visual chips indicating if a product is Facial, Corporal, or both
- **Dropdown Navigation** - Multi-level nav with submenus per product category
- **Contact Form** - Functional contact form with validation
- **Font Awesome Icons** - Icons throughout the UI
- **Mobile-First Approach** - Optimized for mobile devices
- **SEO Friendly** - Semantic HTML structure

## 📁 Project Structure

```
maruva/
├── index.html              # Homepage (Inicio)
├── jabones.html            # Jabones Corporales y Faciales
├── cuidado-facial.html     # Cuidado Facial (bálsamos, sueros, mascarillas)
├── cuidado-corporal.html   # Cuidado Corporal (exfoliantes, desodorantes, cremas)
├── cuidado-capilar.html    # Cuidado Capilar (mascarillas, acondicionadores, shampoos)
├── hogar.html              # Limpieza del Hogar
├── mascotas.html           # Productos para Mascotas
├── kits.html               # Kits
├── filosofia.html          # Philosophy page (Filosofía)
├── about-us.html           # About Us (Acerca de Nosotros)
├── styles.css              # Global CSS styling and responsive design
├── script.js               # Navigation and general JS functionality
├── productos.js            # Product modal logic
├── icons.js                # Custom inline SVG icons
├── images/                 # Image assets
└── README.md               # This file
```

## 🛍️ Product Pages

Each product page shares a consistent structure:

- **Category hero** - Page title and description
- **Product grid** - Cards with image, name, badge, and price
- **Product modal** - Full detail overlay with: image, product type badge, price, presentation, multi-paragraph description, usage instructions, and ingredient list
- **Footer** - Social links and navigation

### Product data attributes (on `.product-catalog-card`)

| Attribute           | Description                                      |
| ------------------- | ------------------------------------------------ |
| `data-name`         | Product name                                     |
| `data-price`        | Price string                                     |
| `data-presentation` | Size / format                                    |
| `data-description`  | Description — use `\|\|` as paragraph delimiter  |
| `data-ingredients`  | Ingredient list string                           |
| `data-usage`        | Usage instructions                               |
| `data-image`        | Path to product image                            |
| `data-badge-class`  | `badge-facial`, `badge-facial-corporal`, or omit |

### Product type badges

Defined in `styles.css`:

- `.badge-facial-corporal` — teal chip ("Facial y Corporal")
- `.badge-facial` — purple chip ("Facial")

Badge label mapping lives in `productos.js` (`badgeLabelMap`).

## 🚀 Getting Started

1. Clone or download the project
2. Open any `.html` file in a browser — no build step required
3. Product images go in the `images/` folder

## 🎨 Customization

### Colors

Key CSS variables / values in `styles.css`:

- Primary green: `#2a7a5a`
- Accent teal (badge): `#017a5f` / `#e0faf4`
- Accent purple (badge): `#5b3fa0` / `#ede8f5`
- Dark text: `#2c3e50`
- Light background: `#f8f9fa`

### Adding a product

1. Add a `.product-catalog-card` div with all required `data-*` attributes
2. Include a `.product-catalog-image` and `.product-catalog-info` inside
3. If the product has a type, add `data-badge-class` and a `<span class="product-type-badge ...">` in `.product-catalog-info`

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px – 1199px
- **Mobile**: Below 768px

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, custom badges, modal overlay
- **JavaScript (ES6+)** - Modal system, navigation toggle
- **Font Awesome 6** - Icons
- **Inline SVG** - Custom leaf icon via `icons.js`

## 🌱 Brand Focus

Maruva specializes in:

- **Jabones artesanales** - Natural, handcrafted soaps (facial and body)
- **Cuidado facial** - Lip balms, serums, face masks
- **Cuidado corporal** - Exfoliants, solid deodorants, body creams, sunscreen
- **Cuidado capilar** - Hair masks, conditioners, shampoos
- **Hogar** - Eco-friendly dishwashing blocks and multipurpose cleaner
- **Mascotas** - Pet soap and protective wax
- **Kits** - Bundled product sets

## 🔧 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

---

**Built with ❤️ for sustainable living and conscious beauty**
