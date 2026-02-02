# Sanity Schemas for Snyder Mechanical

## How to Use These Schemas

1. **Copy these schema files to your Sanity Studio project:**
   - Copy all `.js` files from this `sanity-schemas` folder
   - Paste them into your Sanity Studio's `schemas` directory (usually `sanity/schemas/`)

2. **Update your Sanity config:**
   
   In your `sanity.config.js` or `sanity.config.ts`, import and use these schemas:
   
   ```javascript
   import { defineConfig } from 'sanity'
   import { deskTool } from 'sanity/desk'
   import { schemaTypes } from './schemas'
   
   export default defineConfig({
     name: 'default',
     title: 'Snyder Mechanical',
     projectId: 'your-project-id',
     dataset: 'production',
     plugins: [deskTool()],
     schema: {
       types: schemaTypes,
     },
   })
   ```

3. **Start your Sanity Studio:**
   ```bash
   cd sanity
   sanity start
   ```

4. **Add your content:**
   - Create one "Company Information" document
   - Add Service Categories (residential, commercial, pumps-equipment)
   - Add Reviews and set some as "featured"
   - Add one "Review Statistics" document
   - Add Portfolio Projects
   - Add Detailed Services (heating, cooling, plumbing, emergency)
   - Add Certifications (both "badge" and "certification" types)

## Schema Types Overview

1. **company** - Single document with all company info
2. **serviceCategory** - Multiple documents (residential, commercial, pumps)
3. **review** - Multiple customer reviews
4. **reviewStats** - Single document with review statistics
5. **portfolioProject** - Multiple portfolio projects
6. **detailedService** - Detailed service pages (heating, cooling, plumbing, emergency)
7. **certification** - Trust badges and certifications

## Important Notes

- Make sure your `.env.local` file has the correct Project ID and Dataset name
- The frontend is already configured to fetch from these schema types
- Images: Currently using string URLs. You can upgrade to Sanity's image type later for CDN benefits
