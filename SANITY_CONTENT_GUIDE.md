# Sanity CMS Content Management Guide

## Overview

Your Snyder Mechanical website is now fully content-managed through Sanity CMS. This means you can edit all website content through the Sanity Studio interface without touching any code.

## Accessing Sanity Studio

1. Navigate to the `snyder-mechanicalllc` directory
2. Run `npm run dev` to start Sanity Studio
3. Open your browser to the local studio URL (typically http://localhost:3333)
4. Log in with your Sanity account

## Content Types

### 1. Company Information (`company`)
**Location:** Company Information  
**Purpose:** Core business details shown throughout the site

**Fields:**
- Company Name
- Tagline
- Year Established
- Phone Number
- Email
- Address (street, city, state, zip, display)
- Service Area
- Business Hours (weekdays, Saturday, Sunday)
- Company Values (array)
- Description
- Statistics (years in business, projects completed, certifications)

**Where it appears:** Header, Footer, Contact page, Hero sections

---

### 2. Home Page (`homePage`)
**Location:** Home Page  
**Purpose:** Content for the homepage sections

**Sections:**
- **Hero Section:** Main headline, subtitle, description, button text
- **Quick Service Selector:** Section heading and description
- **Services Grid:** Section heading and description
- **Safety Section:** Heading, description, button text

**Where it appears:** Homepage only

---

### 3. Site Settings (`siteSettings`)
**Location:** Site Settings  
**Purpose:** Navigation menus and footer configuration

**Navigation:**
- About dropdown items (label + path)
- Services dropdown (Homeowners and Business sections)
- Payments button label

**Footer:**
- About Us links
- Services links
- Business hours labels and text
- Licensed text

**Where it appears:** Header navigation and Footer on all pages

---

### 4. About Pages (`aboutPage`)
**Location:** About Pages  
**Purpose:** Content for all About section pages (create one document per section)

**Sections:** Choose from company, safety, recognitions, or careers

**Fields vary by section:**
- **Company:** Story paragraphs, timeline events
- **Safety:** Commitment statement, safety protocols (with icons)
- **Recognitions:** Awards list, certifications list, testimonials
- **Careers:** Why work with us text, benefits, job positions

**Where it appears:** /about/company, /about/safety, /about/recognitions, /about/careers

---

### 5. Commercial Landing Page (`commercialPage`)
**Location:** Commercial Landing Page  
**Purpose:** Content for the commercial services landing page

**Sections:**
- **Hero:** Title, description, button text
- **Capabilities:** Heading, description, list of capabilities (with icons)
- **Why Choose Us:** Heading, description, advantages list
- **CTA Section:** Heading, description, button text

**Where it appears:** /commercial

---

### 6. Contact Page (`contactPage`)
**Location:** Contact Page  
**Purpose:** Contact page content and form labels

**Sections:**
- **Hero:** Title and subtitle
- **Form Section:** All form labels and placeholder text
- **Contact Info:** Section heading and card subtexts

**Where it appears:** /contact

---

### 7. Service Categories (`serviceCategory`)
**Location:** Service Categories  
**Purpose:** Main service categories (residential, commercial, pumps-equipment)

**Fields:**
- ID (slug)
- Title
- Hero section
- Description
- Services array

**Where it appears:** Services grid on homepage, service pages

---

### 8. Detailed Services (`detailedService`)
**Location:** Detailed Services  
**Purpose:** Detailed service pages (heating, cooling, plumbing, emergency)

**Fields:**
- Title
- Slug
- Hero section
- Description
- Services offered
- Common problems
- FAQs
- Response time info

**Where it appears:** /services/heating, /services/cooling, /services/plumbing

---

### 9. Reviews (`review` & `reviewStats`)
**Location:** Reviews & Review Stats  
**Purpose:** Customer reviews and statistics

**Reviews:**
- Name, location, rating, date, service, text, avatar
- Featured checkbox (shows on homepage)

**Review Stats:**
- Average rating
- Total reviews
- Five-star percentage

**Where it appears:** Homepage reviews section

---

### 10. Portfolio Projects (`portfolioProject`)
**Location:** Portfolio Projects  
**Purpose:** Project showcase

**Fields:**
- Title, category, year
- Image
- Description
- Project details

**Where it appears:** /portfolio

---

### 11. Certifications (`certification`)
**Location:** Certifications  
**Purpose:** Trust badges and certifications

**Fields:**
- Title
- Type (badge or certification)
- Description
- Icon

**Where it appears:** Homepage trust badges, About pages

---

### 12. Resources (`resourcesPage`, `resourceCategory`, `resourceFaq`)
**Location:** Resources section  
**Purpose:** Resources/payments page content

**Resources Page:**
- Hero section

**Resource Category:**
- Title, icon, order
- Resources array (title, description, link)

**Resource FAQ:**
- Question, answer, display order

**Where it appears:** /resources

---

## Getting Started Workflow

### Step 1: Populate Core Content (Required)
1. **Company Information** - Add your business details first
2. **Home Page** - Fill in homepage content
3. **Site Settings** - Configure navigation and footer

### Step 2: Add Page Content
4. **About Pages** - Create 4 documents (company, safety, recognitions, careers)
5. **Commercial Landing Page** - Add commercial content
6. **Contact Page** - Set up contact page text

### Step 3: Add Dynamic Content
7. **Service Categories** - Define your service offerings
8. **Reviews** - Add customer testimonials
9. **Portfolio Projects** - Showcase your work
10. **Certifications** - Add trust badges

---

## Tips for Content Editors

### Icons
Many fields use icon names (e.g., "shield", "heart", "dollar-sign"). Use the dropdown options provided in Sanity Studio - these map to actual icons in the code.

### Slugs and IDs
- Slugs and IDs should be lowercase, no spaces (use hyphens)
- Don't change existing slugs/IDs as they're used in URLs
- Examples: `heating`, `commercial`, `safety`

### Order Fields
Fields with "order" or "display order" control the sequence items appear on the page. Use numbers like 1, 2, 3, etc.

### Required Fields
Fields marked with an asterisk (*) in Sanity Studio are required. The website may break if these are left empty.

### Fallback Content
The website has fallback content built-in. If you haven't added content to Sanity yet, the site will use default content to avoid errors.

---

## Testing Your Changes

1. Make changes in Sanity Studio
2. Click "Publish" to save
3. Refresh your website (changes appear immediately with CDN caching)
4. Check multiple pages to ensure content displays correctly

---

## Content Migration Checklist

Use this checklist when migrating content from JSON files to Sanity:

### Core Content
- [ ] Company Information populated
- [ ] Home Page hero section
- [ ] Home Page all sections
- [ ] Site Settings navigation configured
- [ ] Site Settings footer configured

### Pages
- [ ] About: Company
- [ ] About: Safety
- [ ] About: Recognitions
- [ ] About: Careers
- [ ] Commercial Landing Page
- [ ] Contact Page

### Dynamic Content
- [ ] All Service Categories
- [ ] Detailed Services (heating, cooling, plumbing)
- [ ] Reviews added
- [ ] Review Stats configured
- [ ] Portfolio Projects added
- [ ] Certifications/Trust Badges added

### Resources
- [ ] Resources Page hero
- [ ] Resource Categories
- [ ] Resource FAQs

---

## Support

If you need help:
1. Check this guide first
2. Review the Sanity Studio tooltips (hover over field labels)
3. Contact your developer for technical issues

---

## Important Notes

⚠️ **Backup:** Sanity automatically versions all content - you can always revert changes

⚠️ **Publishing:** Always click "Publish" after making changes - drafts aren't visible on the live site

⚠️ **URLs:** Be careful changing slugs/IDs as this affects page URLs and can break links

⚠️ **Images:** Upload images through Sanity Studio's image uploader for best performance

⚠️ **Phone/Email:** These appear across the site - update in "Company Information" to change everywhere
