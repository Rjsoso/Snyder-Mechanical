# Snyder Mechanical Website

Modern, responsive website for Snyder Mechanical - Northeastern Nevada's Premier Mechanical Contractor since 1981.

## Tech Stack

- **Framework**: React 18 with Vite 5
- **CMS**: Sanity.io (Headless CMS)
- **Routing**: React Router DOM 6
- **Styling**: Tailwind CSS 3 with @tailwindcss/postcss
- **Animations**: Framer Motion & GSAP
- **Icons**: Lucide React & React Icons
- **Deployment**: Vercel

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Layout, ChatbotPlaceholder
│   ├── home/            # Homepage components (Hero, Services Grid, etc.)
│   ├── services/        # Service-related components
│   ├── portfolio/       # Portfolio components
│   ├── about/           # About section components
│   ├── forms/           # Contact and service request forms
│   └── shared/          # Reusable components (Button, Card, etc.)
├── pages/               # Page components (Home, About, Services, etc.)
├── data/                # JSON data files (fallback content)
├── hooks/               # Custom React hooks (including Sanity data hooks)
├── lib/                 # Sanity client configuration
└── utils/               # Utility functions

snyder-mechanicalllc/    # Sanity Studio
├── schemaTypes/         # Content schemas
└── sanity.config.ts     # Sanity configuration
```

## Features

- 📱 Fully responsive design
- 🎨 Modern, clean UI with Tailwind CSS
- 🎭 Smooth animations with Framer Motion
- 🏠 11 complete pages with all content sections
- 📝 **Full CMS integration with Sanity** - Edit all content without code
- 📞 Service request CTAs throughout
- 💬 AI Chatbot placeholder (ready for future integration)
- 🔍 SEO-friendly structure
- ⚡ Fast performance with Vite
- 🔄 Automatic fallback to JSON if Sanity content not yet migrated

## Pages

1. **Home** - Hero, Services Grid, Stats, Safety Section
2. **About**
   - Company Background
   - Safety
   - Service Recognitions
   - Careers
3. **Services**
   - Residential
   - Commercial
   - Pumps & Equipment
4. **Portfolio** - Filterable project gallery
5. **Contact** - Contact form and information

## Development

### Frontend (React App)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Sanity Studio (CMS)

```bash
# Navigate to Sanity directory
cd snyder-mechanicalllc

# Install dependencies
npm install

# Start Sanity Studio
npm run dev

# Deploy Sanity Studio
npm run deploy
```

### Environment Variables

Copy `.env.example` to `.env` or `.env.local` and fill in values. Required for CMS and payments:

- **Sanity:** `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET` (frontend); `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN` (API routes).
- **Stripe:** `VITE_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` for invoice payments.
- **Admin/Sync:** `DASHBOARD_PASSWORD` for the invoice sync dashboard; `CRON_SECRET` (Vercel) and/or `SYNC_API_KEY` for sync endpoints.
- **Chatbot (optional):** `VITE_N8N_CHATBOT_WEBHOOK` – full n8n webhook URL (e.g. `https://your-n8n.com/webhook/.../chat`). If unset, the site shows "Chatbot Coming Soon" and does not call n8n.

See `.env.example` for the full list and optional vars (ComputerEase, `APP_URL`).

## Deployment

This project is configured for deployment on Vercel:

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel (Project → Settings → Environment Variables). Use the same names as in `.env.example`. For **Production** (and optionally Preview), set `VITE_N8N_CHATBOT_WEBHOOK` to your n8n webhook URL so the chatbot works on the deployed site.
4. Deploy: automatic on push to main, or trigger a redeploy after adding/changing env vars (needed for `VITE_*` vars, which are baked in at build time).

**Chatbot on the live site:** If the live site still shows "Chatbot Coming Soon", ensure `VITE_N8N_CHATBOT_WEBHOOK` is set in Vercel for the Production environment and redeploy once. Then open the chat, send a message, and confirm the n8n workflow runs (e.g. check n8n execution history).

## Content Management

**The website is now fully content-managed through Sanity CMS!** 

### Editing Content

1. Navigate to `snyder-mechanicalllc` directory
2. Run `npm run dev` to start Sanity Studio
3. Access the Studio at http://localhost:3333
4. Edit any content and click "Publish"
5. Changes appear on the website immediately

### Content Types Available

- **Company Information** - Business details, contact info, hours
- **Home Page** - Hero, sections, CTAs
- **Site Settings** - Navigation menus, footer configuration
- **About Pages** - Company, safety, recognitions, careers
- **Commercial Page** - Commercial landing page content
- **Contact Page** - Contact form labels and text
- **Services** - Service categories and detailed service pages
- **Portfolio** - Project showcase
- **Reviews** - Customer testimonials
- **Certifications** - Trust badges and certifications

### Fallback Content

JSON files in `src/data/` serve as fallback content during migration. Once all content is in Sanity, these can be removed.

## Recent Updates

- ✅ **Sanity CMS Integration** - Full content management system implemented
- ✅ All pages now editable through Sanity Studio
- ✅ Automatic fallback to JSON during content migration
- ✅ Comprehensive content editor documentation

## Future Enhancements

- [ ] AI chatbot integration
- [ ] Schedule service form with email integration
- [ ] Request estimate form with file uploads
- [ ] Customer portal
- [ ] Blog section with Sanity
- [ ] Image optimization with Sanity CDN

## License

© 2026 Snyder Mechanical. All rights reserved.
