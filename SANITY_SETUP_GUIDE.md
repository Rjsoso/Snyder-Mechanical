# Sanity CMS Integration Setup Guide

## Step 1: Configure Environment Variables

1. Open `.env.local` in the root of your project
2. Replace the placeholder values with your actual Sanity project details:

```env
VITE_SANITY_PROJECT_ID=abc123xyz  # Your actual project ID
VITE_SANITY_DATASET=production    # Usually "production"
VITE_SANITY_API_VERSION=2024-01-01
```

**Where to find your Project ID:**
- In your Sanity dashboard at manage.sanity.io
- Or in your Sanity Studio's `sanity.config.js` file

## Step 2: Set Up Sanity Studio Schemas

1. **Navigate to your Sanity Studio project folder** (the folder where you ran `sanity init`)

2. **Copy the schema files:**
   - Copy ALL `.js` files from the `sanity-schemas` folder in this project
   - Paste them into your Sanity Studio's `schemas` folder (usually `sanity/schemas/`)

3. **Update your sanity.config.js:**

   ```javascript
   import { defineConfig } from 'sanity'
   import { deskTool } from 'sanity/desk'
   import { schemaTypes } from './schemas'
   
   export default defineConfig({
     name: 'default',
     title: 'Snyder Mechanical CMS',
     projectId: 'your-project-id',
     dataset: 'production',
     plugins: [deskTool()],
     schema: {
       types: schemaTypes,
     },
   })
   ```

4. **Start Sanity Studio:**
   ```bash
   cd /path/to/your/sanity/project
   sanity start
   ```

## Step 3: Add Content to Sanity Studio

Once Studio is running (usually at http://localhost:3333), create these documents:

### Required Documents (Create These First):

1. **Company Information** (Create 1 document)
   - Copy data from `src/data/company.json`
   - Fill in all fields: name, tagline, phone, email, etc.

2. **Review Statistics** (Create 1 document)
   - averageRating: 4.9
   - totalReviews: 487
   - fiveStarPercentage: 94

3. **Service Categories** (Create 3 documents):
   - Residential (slug: residential)
   - Commercial (slug: commercial)  
   - Pumps & Equipment (slug: pumps-equipment)
   - Copy data from `src/data/services.json` for each

4. **Detailed Services** (Create 4 documents):
   - Heating (slug: heating)
   - Cooling (slug: cooling)
   - Plumbing (slug: plumbing)
   - Emergency (slug: emergency)
   - Copy data from `src/data/detailed-services.json` for each

5. **Reviews** (Create 4+ documents):
   - Copy from `src/data/reviews.json`
   - Mark appropriate ones as "featured"

6. **Portfolio Projects** (Create 6+ documents):
   - Copy from `src/data/portfolio.json`

7. **Certifications** (Create 4 documents):
   - Copy from `src/data/certifications.json`
   - Set type as "badge" for trust badges

## Step 4: Test the Connection

1. **Make sure your environment variables are set correctly**
2. **Start your dev server:**
   ```bash
   npm run dev
   ```

3. **Check the browser console** for any Sanity connection errors

4. **If you see "Loading..." that never resolves:**
   - Check your Project ID in `.env.local`
   - Verify CORS origins are set in Sanity dashboard
   - Check browser console for specific errors

## Step 5: Deploy Sanity Studio

Once everything is working locally:

```bash
cd /path/to/your/sanity/project
sanity deploy
```

This will give you a hosted studio at: `https://your-project.sanity.studio`

## Troubleshooting

### "Error fetching data" in components:
- Check `.env.local` has correct project ID
- Verify CORS origins include your domain
- Check Sanity Studio has published content

### Content not appearing:
- Make sure documents are published (not just drafts) in Sanity Studio
- Check the document type names match the schemas
- Verify slug fields are populated correctly

### Local development not loading:
- Restart your dev server after adding `.env.local`
- Environment variables require a server restart to load

## Next Steps After Setup

Once Sanity is working:
1. You can safely delete the JSON files in `src/data/`
2. All content will be managed through Sanity Studio
3. Team members can access Studio to update content without code changes

## Need Help?

If you encounter issues:
1. Check browser console for error messages
2. Verify all required documents exist in Sanity Studio
3. Ensure documents are published (not drafts)
4. Check that CORS origins are configured correctly
