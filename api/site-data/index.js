/**
 * Site Knowledge Base API
 * Returns Snyder Mechanical website content for n8n chatbot context.
 * n8n can call GET https://your-domain.com/api/site-data to pull this data
 * when processing chatbot queries.
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const companyData = require('../../src/data/company.json');
const servicesData = require('../../src/data/services.json');
const aboutData = require('../../src/data/about.json');
const resourcesData = require('../../src/data/resources.json');
const detailedServicesData = require('../../src/data/detailed-services.json');
const portfolioData = require('../../src/data/portfolio.json');
const reviewsData = require('../../src/data/reviews.json');
const certificationsData = require('../../src/data/certifications.json');

/**
 * Build a text summary of the site for AI context (RAG/knowledge base).
 * This format works well with LLM nodes in n8n.
 */
function buildContextText() {
  const c = companyData;
  const parts = [];

  parts.push(`## Company: ${c.name}`);
  parts.push(`Tagline: ${c.tagline}`);
  parts.push(`Phone: ${c.phone}`);
  parts.push(`Email: ${c.email}`);
  parts.push(`Address: ${c.address?.display || 'Elko, Spring Creek, NV'}`);
  parts.push(`Service area: ${c.serviceArea}`);
  parts.push(`Hours: ${c.hours?.weekdays || ''}; ${c.hours?.saturday || ''}; ${c.hours?.sunday || ''}`);
  parts.push(`Description: ${c.description}`);

  if (c.stats) {
    parts.push(`Stats: ${c.stats.yearsInBusiness} years in business, ${c.stats.projectsCompleted} projects completed.`);
  }

  if (aboutData?.company) {
    const ac = aboutData.company;
    if (ac.story?.length) {
      parts.push(`\n## Company Story`);
      ac.story.forEach((para, i) => parts.push(para));
    }
    if (ac.licenses?.length) {
      parts.push(`\n## Licenses: ${ac.licenses.join('; ')}`);
    }
  }

  parts.push(`\n## Services`);

  if (servicesData?.residential) {
    const r = servicesData.residential;
    parts.push(`### Residential: ${r.description}`);
    r.services?.forEach(s => parts.push(`- ${s.title}: ${s.description}`));
  }
  if (servicesData?.commercial) {
    const com = servicesData.commercial;
    parts.push(`### Commercial: ${com.description}`);
    com.services?.forEach(s => parts.push(`- ${s.title}: ${s.description}`));
  }
  if (servicesData?.pumpsEquipment) {
    const p = servicesData.pumpsEquipment;
    parts.push(`### Pumps & Equipment: ${p.description}`);
    p.services?.forEach(s => parts.push(`- ${s.title}: ${s.description}`));
  }

  if (detailedServicesData) {
    parts.push(`\n## Detailed Service Info`);
    for (const [key, section] of Object.entries(detailedServicesData)) {
      if (section?.services) {
        section.services.forEach(s => {
          if (s.startingPrice) parts.push(`- ${s.title}: ${s.description} (starting ${s.startingPrice})`);
          else parts.push(`- ${s.title}: ${s.description}`);
        });
      }
      if (section?.faqs?.length) {
        section.faqs.forEach(f => parts.push(`Q: ${f.question} A: ${f.answer}`));
      }
    }
  }

  if (resourcesData?.categories?.length) {
    parts.push(`\n## Resources & Guides`);
    resourcesData.categories.forEach(cat => {
      cat.resources?.forEach(r => parts.push(`- ${r.title}: ${r.description}`));
    });
  }

  if (resourcesData?.faqs?.length) {
    parts.push(`\n## FAQs`);
    resourcesData.faqs.forEach(f => parts.push(`Q: ${f.question} A: ${f.answer}`));
  }

  if (reviewsData?.reviews?.length) {
    parts.push(`\n## Customer Reviews (sample)`);
    reviewsData.reviews.slice(0, 5).forEach(r => parts.push(`- ${r.text}`));
  }

  parts.push(`\n## Website Navigation`);
  parts.push(`The website has a navigation menu at the top of every page with the following items:`);
  parts.push(`- "Home" — click to go to the homepage: https://snyder-mechanical.vercel.app/`);
  parts.push(`- "About" (dropdown menu) — hover or click to expand:`);
  parts.push(`  - "Company Background" — company history and story: https://snyder-mechanical.vercel.app/about/company`);
  parts.push(`  - "Safety" — safety practices and policies: https://snyder-mechanical.vercel.app/about/safety`);
  parts.push(`  - "Service Recognitions" — awards and recognitions: https://snyder-mechanical.vercel.app/about/recognitions`);
  parts.push(`  - "Careers" — job openings: https://snyder-mechanical.vercel.app/about/careers`);
  parts.push(`- "Services" (dropdown menu) — hover or click to expand:`);
  parts.push(`  - For Homeowners:`);
  parts.push(`    - "Heating Services": https://snyder-mechanical.vercel.app/services/heating`);
  parts.push(`    - "Cooling Services": https://snyder-mechanical.vercel.app/services/cooling`);
  parts.push(`    - "Plumbing Services": https://snyder-mechanical.vercel.app/services/plumbing`);
  parts.push(`  - For Businesses:`);
  parts.push(`    - "Commercial Overview": https://snyder-mechanical.vercel.app/commercial`);
  parts.push(`    - "Commercial HVAC": https://snyder-mechanical.vercel.app/services/commercial`);
  parts.push(`    - "Design/Build Projects": https://snyder-mechanical.vercel.app/services/commercial#design-build`);
  parts.push(`    - "Pumps & Equipment": https://snyder-mechanical.vercel.app/services/pumps-equipment`);
  parts.push(`- "Portfolio" — view past projects and completed work: https://snyder-mechanical.vercel.app/portfolio`);
  parts.push(`- "Contact" — contact form, phone, email, and address: https://snyder-mechanical.vercel.app/contact`);
  parts.push(`- "Resources / Payments" — guides, tips, and invoice payments: https://snyder-mechanical.vercel.app/resources`);
  parts.push(`\nNavigation instructions for the AI: When a user asks where to find something on the website, always give step-by-step directions through the menu. For example: "In the top navigation bar, hover over Services, then under For Businesses click Pumps & Equipment. You can also go directly to https://snyder-mechanical.vercel.app/services/pumps-equipment". Never just give a link alone — always explain which menu item to click first, then which dropdown option to choose.`);

  return parts.join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const format = req.query.format || 'full';

    if (format === 'text') {
      // Plain text for direct use as AI context
      const text = buildContextText();
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.status(200).send(text);
    }

    // Full JSON: structured data + pre-built text context
    const payload = {
      text: buildContextText(),
      company: companyData,
      services: servicesData,
      about: aboutData,
      resources: resourcesData,
      detailedServices: detailedServicesData,
      portfolio: portfolioData,
      reviews: reviewsData,
      certifications: certificationsData,
    };

    return res.status(200).json(payload);
  } catch (err) {
    console.error('Site data API error:', err);
    return res.status(500).json({ error: 'Failed to load site data' });
  }
}
