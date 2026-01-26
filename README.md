# Snyder Mechanical Website

Modern, responsive website for Snyder Mechanical - Northeastern Nevada's Premier Mechanical Contractor since 1981.

## Tech Stack

- **Framework**: React 18 with Vite 5
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
├── data/                # JSON data files for content
├── hooks/               # Custom React hooks
└── utils/               # Utility functions
```

## Features

- 📱 Fully responsive design
- 🎨 Modern, clean UI with Tailwind CSS
- 🎭 Smooth animations with Framer Motion
- 🏠 11 complete pages with all content sections
- 📞 Service request CTAs throughout
- 💬 AI Chatbot placeholder (ready for future integration)
- 🔍 SEO-friendly structure
- ⚡ Fast performance with Vite

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

## Deployment

This project is configured for deployment on Vercel:

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push to main

## Content Management

Content is managed through JSON files in the `src/data/` directory:

- `company.json` - Company information, contact details, hours
- `services.json` - Service offerings and descriptions
- `about.json` - About pages content
- `portfolio.json` - Portfolio projects

## Future Enhancements

- [ ] Sanity CMS integration for easier content management
- [ ] AI chatbot integration
- [ ] Schedule service form with email integration
- [ ] Request estimate form with file uploads
- [ ] Customer portal
- [ ] Blog section

## License

© 2026 Snyder Mechanical. All rights reserved.
