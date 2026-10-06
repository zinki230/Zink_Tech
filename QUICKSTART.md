# Quick Start Guide - Zink Tech E-Commerce

Get the website running in **5 minutes**!

## Prerequisites

- ✅ Node.js 18+ installed
- ✅ PostgreSQL installed and running
- ✅ Basic terminal/command line knowledge

## Installation Steps

### 1️⃣ Install Dependencies (2 minutes)

```bash
cd zink-tech-ecommerce
npm install
```

### 2️⃣ Set Up Database (1 minute)

Create a PostgreSQL database:
```bash
# Using PostgreSQL CLI
createdb zinktech

# Or using SQL
psql -U postgres
CREATE DATABASE zinktech;
\q
```

### 3️⃣ Configure Environment (1 minute)

Copy and edit the environment file:
```bash
cp .env.example .env
```

Edit `.env` with your database URL:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/zinktech"
NEXT_PUBLIC_WHATSAPP_NUMBER="237657413164"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4️⃣ Initialize Database (30 seconds)

```bash
npx prisma generate
npx prisma db push
```

### 5️⃣ Run the Application (10 seconds)

```bash
npm run dev
```

**🎉 Done! Open http://localhost:3000 in your browser**

---

## What You'll See

### Homepage (/)
- Hero section with CTAs
- Featured products (placeholder data)
- Categories
- Brands
- Trust badges

### Product Pages
- **/ordinateurs-portables** - Laptops category
- **/smartphones** - Smartphones category
- **/produits/[slug]** - Individual product details

### Shopping Flow
- **/panier** - Shopping cart
- **/commande-whatsapp** - Order confirmation → WhatsApp

### Business
- **/entreprises** - B2B solutions page
- **/marques** - All brands listing

---

## Next Steps

### Add Sample Products

Option 1: **Via Prisma Studio** (Easiest)
```bash
npx prisma studio
```
- Opens at http://localhost:5555
- Click on tables to add data manually
- Start with: Brands → Categories → Products

Option 2: **Via Seed Script** (Coming soon)

### Customize Content

1. **Colors**: Edit `tailwind.config.ts`
2. **WhatsApp Number**: Update `.env`
3. **Site Title**: Edit `app/layout.tsx` metadata
4. **Homepage Text**: Edit `app/page.tsx`
5. **Footer Links**: Edit `components/footer.tsx`

### Deploy to Production

**Vercel (Recommended)**:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Follow prompts and add environment variables in Vercel dashboard.

---

## Common Issues

### "Can't connect to database"
- ✅ Check PostgreSQL is running: `pg_isready`
- ✅ Verify DATABASE_URL in `.env`
- ✅ Try: `postgresql://postgres:postgres@localhost:5432/zinktech`

### "Port 3000 already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill

# Or run on different port
npm run dev -- -p 3001
```

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## File Structure Overview

```
zink-tech-ecommerce/
├── app/                    # Pages (Next.js App Router)
│   ├── page.tsx           # Homepage
│   ├── ordinateurs-portables/  # Laptops
│   ├── smartphones/       # Smartphones
│   ├── produits/[slug]/   # Product details
│   ├── panier/            # Cart
│   ├── commande-whatsapp/ # Order flow
│   └── entreprises/       # Business page
├── components/            # React components
│   ├── header.tsx
│   ├── footer.tsx
│   ├── product-card.tsx
│   └── whatsapp-button.tsx
├── lib/                   # Utilities
│   ├── utils.ts          # Helper functions
│   └── prisma.ts         # Database client
├── prisma/               # Database
│   └── schema.prisma     # Schema definition
└── public/               # Static files
    └── products/         # Product images (add here)
```

---

## Testing Checklist

After installation, test these flows:

- [ ] Homepage loads correctly
- [ ] Navigate to Ordinateurs Portables page
- [ ] Click on a product → Product detail page
- [ ] Click "Ajouter au panier" → Cart updates
- [ ] Go to Panier → Cart shows items
- [ ] Click "Commander sur WhatsApp" → Form appears
- [ ] Fill form → WhatsApp opens with message
- [ ] Floating WhatsApp button works
- [ ] Mobile responsive (resize browser)

---

## Resources

- **Full Documentation**: See [README.md](./README.md)
- **Installation Guide**: See [INSTALLATION.md](./INSTALLATION.md)
- **Features List**: See [FEATURES.md](./FEATURES.md)
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Prisma Docs**: https://www.prisma.io/docs

---

## Support

Questions or issues?
- 📧 Email: contact@zinktech.cm
- 💬 WhatsApp: +237 657 413 164

---

**You're all set! Happy building! 🚀**

Built with ❤️ by Kiro AI for Zink Tech Cameroun
