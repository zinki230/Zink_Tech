# Zink Tech E-Commerce Platform

A premium, modern, conversion-focused multi-brand technology e-commerce website for Zink Tech Cameroun.

## 🚀 Features

- **Multi-Brand Retailer Platform**: Sell products from HP, Dell, Lenovo, Apple, Samsung, Xiaomi, and more
- **WhatsApp Ordering**: Primary conversion through WhatsApp (no online payment)
- **Product Categories**: Laptops, Desktops, Smartphones, Tablets, Monitors, Printers, Gaming, and more
- **Business Solutions**: Dedicated section for enterprise customers
- **Mobile-First Design**: Fully responsive and optimized for mobile devices
- **SEO Optimized**: Built with Next.js 15 for optimal search engine performance
- **Type-Safe**: Full TypeScript implementation
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Database**: PostgreSQL with Prisma ORM
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- PostgreSQL database
- WhatsApp Business number (237657413164)

## 🔧 Installation

1. **Install dependencies**:
```bash
cd zink-tech-ecommerce
npm install
```

2. **Configure environment variables**:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/zinktech"
NEXT_PUBLIC_WHATSAPP_NUMBER="237657413164"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
ADMIN_SESSION_SECRET="generate-a-random-secret-with-at-least-32-characters"
```

3. **Set up the database**:
```bash
npx prisma generate
npx prisma db push
```

4. **Run the development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
zink-tech-ecommerce/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                 # Homepage
│   ├── ordinateurs-portables/   # Laptops category
│   ├── smartphones/             # Smartphones category
│   ├── produits/[slug]/         # Product detail pages
│   ├── panier/                  # Shopping cart
│   ├── commande-whatsapp/       # WhatsApp order flow
│   ├── entreprises/             # Business solutions
│   ├── marques/                 # Brands listing
│   └── layout.tsx               # Root layout
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── header.tsx               # Site header
│   ├── footer.tsx               # Site footer
│   ├── product-card.tsx         # Product card component
│   └── whatsapp-button.tsx      # WhatsApp CTA button
├── lib/                         # Utility functions
│   ├── utils.ts                 # Helper functions
│   └── prisma.ts                # Prisma client
├── prisma/                      # Database schema
│   └── schema.prisma            # Prisma schema
└── public/                      # Static assets
```

## 🔑 Key Features Explained

### Administration

The private administration space is available at `/admin`. Configure `ADMIN_SESSION_SECRET` (at least 32 characters) in `.env.local`. On the first visit to `/admin/connexion` from `localhost`, choose your permanent password (at least 12 characters) and confirm it. The salted scrypt hash is saved in the ignored local file `data/admin-credentials.json`; the setup form is locked after that file is created, and there is no password reset in the interface. Keep this file on persistent storage when deploying the application.

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

Restart the development server after changing environment variables. The admin session uses an HTTP-only, same-site cookie and expires after eight hours. Product, order, brand and category data is read from PostgreSQL through Prisma; configure a real `DATABASE_URL` before using write actions.


### WhatsApp Integration

The website does NOT process online payments. Instead, customers:
1. Browse products and add to cart
2. Review their cart
3. Click "Commander sur WhatsApp"
4. Are redirected to WhatsApp with a pre-filled order message
5. Complete the transaction through WhatsApp conversation with Zink Tech

This is implemented in:
- `lib/utils.ts` - `generateOrderWhatsAppMessage()` function
- `components/whatsapp-button.tsx` - WhatsApp CTA component
- `app/commande-whatsapp/page.tsx` - Order preparation page

### Product Structure

Products are organized by:
- **Categories**: Laptops, Desktops, Smartphones, Tablets, etc.
- **Brands**: HP, Dell, Lenovo, Apple, Samsung, Xiaomi, etc.
- **Use Cases**: Student, Professional, Gaming, Business, etc.

### Business Solutions

Dedicated `/entreprises` page for:
- B2B customers
- Volume pricing
- Custom quotes via WhatsApp
- IT solutions and services

## 🎨 Design System

### Colors
- **Primary Blue**: `#1E40AF` (Zink Tech Blue)
- **Accent Green**: `#059669` (Zink Tech Green)
- **WhatsApp Green**: `#25D366`

### Typography
- **Font**: Inter (sans-serif)
- **Scale**: Tailwind default scale

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All layouts are mobile-first and fully responsive.

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Official WhatsApp number | Yes |
| `NEXT_PUBLIC_WHATSAPP_URL` | WhatsApp URL | No |
| `NEXT_PUBLIC_APP_URL` | Application URL | No |
| `NEXT_PUBLIC_CURRENCY` | Currency (default: FCFA) | No |

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Set up PostgreSQL database (Vercel Postgres or external)
5. Deploy

```bash
npm run build
```

### Database Setup

For production, use:
- Vercel Postgres
- Supabase
- Railway
- Or any PostgreSQL provider

Run migrations:
```bash
npx prisma migrate deploy
```

## 📊 Database Schema

The schema includes:
- **Products**: With variants, images, specifications
- **Categories**: Hierarchical categories
- **Brands**: Manufacturer brands
- **Cart**: Shopping cart and items
- **Orders**: Order requests (WhatsApp-based)
- **Customers**: Customer information
- **Reviews**: Product reviews

See `prisma/schema.prisma` for full schema.

## 🎯 Next Steps

1. **Add Product Data**: Populate database with actual products
2. **Configure WhatsApp**: Set up business WhatsApp number
3. **Add Images**: Upload product and brand images
4. **SEO**: Add meta tags, sitemap, robots.txt
5. **Analytics**: Integrate Google Analytics or Plausible
6. **Testing**: Test all flows, especially WhatsApp ordering

## 📞 Support

For questions or issues:
- WhatsApp: +237 657 413 164
- Email: contact@zinktech.cm

## 📄 License

Proprietary - © 2024 Zink Tech Cameroun

---

Built with ❤️ for Zink Tech by Kiro AI
