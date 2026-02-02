import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';

/**
 * Hook to fetch company information from Sanity
 * Replaces: src/data/company.json
 */
export function useCompanyData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "company"][0]{
        name,
        tagline,
        established,
        phone,
        email,
        address,
        serviceArea,
        hours,
        values,
        description,
        stats
      }`)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching company data:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}

/**
 * Hook to fetch service categories (residential, commercial, pumps-equipment)
 * Replaces: src/data/services.json
 */
export function useServiceCategories() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "serviceCategory"]{
        id,
        title,
        slug,
        hero,
        description,
        services
      }`)
      .then((categories) => {
        // Format data to match original JSON structure
        const formatted = {};
        categories.forEach(cat => {
          const key = cat.slug?.current || cat.id;
          formatted[key] = cat;
        });
        setData(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching service categories:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}

/**
 * Hook to fetch reviews and review statistics
 * Replaces: src/data/reviews.json
 */
export function useReviews() {
  const [data, setData] = useState({ featured: [], stats: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "review" && featured == true] | order(date desc){
        id,
        name,
        location,
        rating,
        date,
        service,
        text,
        avatar
      }`),
      client.fetch(`*[_type == "reviewStats"][0]{
        averageRating,
        totalReviews,
        fiveStarPercentage
      }`)
    ])
      .then(([featured, stats]) => {
        setData({ featured, stats: stats || {} });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching reviews:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}

/**
 * Hook to fetch portfolio projects
 * Replaces: src/data/portfolio.json
 */
export function usePortfolioProjects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "portfolioProject"] | order(year desc, order asc){
        id,
        title,
        category,
        image,
        description,
        details,
        year
      }`)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching portfolio projects:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}

/**
 * Hook to fetch a specific detailed service page (heating, cooling, plumbing, emergency)
 * Replaces: src/data/detailed-services.json
 */
export function useDetailedService(slug) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    client
      .fetch(
        `*[_type == "detailedService" && slug.current == $slug][0]{
          id,
          title,
          slug,
          hero,
          description,
          services,
          commonProblems,
          faqs,
          responseTime,
          emergencies,
          whenToCall,
          emergencyTips
        }`,
        { slug }
      )
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching detailed service:', err);
        setError(err);
        setLoading(false);
      });
  }, [slug]);

  return { data, loading, error };
}

/**
 * Hook to fetch resources (articles, guides, FAQs)
 * Replaces: src/data/resources.json
 */
export function useResources() {
  const [data, setData] = useState({ hero: {}, categories: [], faqs: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "resourcesPage"][0]{
        hero
      }`),
      client.fetch(`*[_type == "resourceCategory"] | order(order asc){
        id,
        title,
        icon,
        resources
      }`),
      client.fetch(`*[_type == "resourceFaq"] | order(order asc){
        question,
        answer
      }`)
    ])
      .then(([page, categories, faqs]) => {
        setData({
          hero: page?.hero || {},
          categories: categories || [],
          faqs: faqs || []
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching resources:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}

/**
 * Hook to fetch certifications and trust badges
 * Replaces: src/data/certifications.json
 */
export function useCertifications() {
  const [data, setData] = useState({ badges: [], certifications: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "certification" && type == "badge"]{
        id,
        title,
        description,
        icon
      }`),
      client.fetch(`*[_type == "certification" && type == "certification"]{
        title
      }`)
    ])
      .then(([badges, certifications]) => {
        setData({
          badges: badges || [],
          certifications: certifications.map(c => c.title) || []
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching certifications:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}

/**
 * Hook to fetch about page content
 * Replaces: src/data/about.json
 */
export function useAboutData() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "aboutPage"][0]`)
      .then((data) => {
        setData(data || {});
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching about data:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}

/**
 * Hook to fetch maintenance plans
 * Replaces: src/data/maintenance-plans.json
 */
export function useMaintenancePlans() {
  const [data, setData] = useState({ hero: {}, plans: [], benefits: [], faqs: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "maintenancePlansPage"][0]{
        hero,
        plans,
        benefits,
        faqs
      }`)
      .then((data) => {
        setData(data || { hero: {}, plans: [], benefits: [], faqs: [] });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching maintenance plans:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
