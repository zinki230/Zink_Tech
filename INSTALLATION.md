# Installation Guide - Zink Tech E-Commerce

This guide will help you set up the Zink Tech e-commerce platform on your local machine or production server.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **pnpm** (comes with Node.js)
- **PostgreSQL** 14.x or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/downloads))

## Step 1: Clone or Extract the Project

If you have the project as a ZIP file, extract it to your desired location.

If you're using Git:
```bash
git clone <repository-url>
cd zink-tech-ecommerce
```

## Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install:
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Prisma ORM
- shadcn/ui components
- And all other dependencies

## Step 3: Set Up PostgreSQL Database

### Option A: Local PostgreSQL

1. **Create a new database**:
```sql
CREATE DATABASE zinktech;
```

2. **Create a database user** (optional but recommended):
```sql
CREATE USER zinktech_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE zinktech TO zinktech_user;
```

### Option B: Cloud PostgreSQL

You can use cloud-hosted PostgreSQL services:
- **Vercel Postgres**: [vercel.com/storage/postgres](https://vercel.com/storage/postgres)
- **Supabase**: [supabase.com](https://supabase.com)
- **Railway**: [railway.app](https://railway.app)
- **Neon**: [neon.tech](https://neon.tech)

Follow their setup instructions to get a connection string.

## Step 4: Configure Environment Variables

1. **Copy the example environment file**:
```bash
cp .env.example .env
```

2. **Edit the `.env` file** with your configuration:

```env
# Database - Replace with your actual database URL
DATABASE_URL="postgresql://zinktech_user:your_password@localhost:5432/zinktech?schema=public"

# WhatsApp - Official Zink Tech WhatsApp number
NEXT_PUBLIC_WHATSAPP_NUMBER="237657413164"
NEXT_PUBLIC_WHATSAPP_URL="https://wa.me/237657413164"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_CURRENCY="FCFA"
```

### Database URL Format:
```
postgresql://[user]:[password]@[host]:[port]/[database]?schema=public
```

Example for local PostgreSQL:
```
postgresql://zinktech_user:mypassword@localhost:5432/zinktech?schema=public
```

## Step 5: Initialize the Database

Run Prisma commands to set up your database schema:

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database (for development)
npx prisma db push

# OR create and run migrations (for production)
npx prisma migrate dev --name init
```

### Verify Database Setup

Open Prisma Studio to view your database:
```bash
npx prisma studio
```

This will open a browser window at `http://localhost:5555` where you can view and edit your database tables.

## Step 6: Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at:
**http://localhost:3000**

You should see:
- ✓ Ready message in the terminal
- The homepage when you open http://localhost:3000

## Step 7: Seed Sample Data (Optional)

To test the application, you'll need some sample data. You can either:

### Option A: Manual Entry via Prisma Studio
```bash
npx prisma studio
```
Then manually add brands, categories, and products.

### Option B: Create a Seed Script

Create `prisma/seed.ts`:
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create brands
  const hp = await prisma.brand.create({
    data: { name: 'HP', slug: 'hp', featured: true },
  });

  const dell = await prisma.brand.create({
    data: { name: 'Dell', slug: 'dell', featured: true },
  });

  // Create categories
  const laptops = await prisma.category.create({
    data: {
      name: 'Ordinateurs Portables',
      slug: 'ordinateurs-portables',
      featured: true,
    },
  });

  // Add products...
  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Then run:
```bash
npx ts-node prisma/seed.ts
```

## Troubleshooting

### Database Connection Issues

**Error**: "Can't reach database server"
- Check PostgreSQL is running: `pg_isready`
- Verify connection string in `.env`
- Check firewall settings

### Port Already in Use

**Error**: "Port 3000 is already in use"
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or run on different port
npm run dev -- -p 3001
```

### Module Not Found Errors

**Solution**: Reinstall dependencies
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Prisma Client Issues

**Solution**: Regenerate Prisma Client
```bash
npx prisma generate
```

## Production Deployment

### Vercel Deployment

1. **Push code to GitHub**

2. **Import project in Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables** in Vercel dashboard:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_APP_URL` (your production URL)

4. **Add PostgreSQL Database**:
   - Use Vercel Postgres, or
   - Connect external PostgreSQL provider

5. **Deploy**:
   ```bash
   # Or push to main branch
   git push origin main
   ```

### Database Migrations for Production

```bash
# Run migrations in production
npx prisma migrate deploy
```

## Next Steps

After successful installation:

1. **Add Products**: Use Prisma Studio or create an admin panel
2. **Upload Images**: Add product images to `/public/products/`
3. **Configure WhatsApp**: Test WhatsApp integration
4. **Customize Branding**: Update colors, logos, and content
5. **Set Up Analytics**: Add Google Analytics or Plausible
6. **Test Ordering Flow**: Complete end-to-end test order

## Support

For installation issues:
- Check the [README.md](./README.md)
- Review Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Review Prisma documentation: [prisma.io/docs](https://prisma.io/docs)

---

**Developed by Kiro AI for Zink Tech Cameroun**
