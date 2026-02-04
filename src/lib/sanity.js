import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

if (!projectId && import.meta.env.DEV) {
  console.warn(
    'Sanity: VITE_SANITY_PROJECT_ID is not set. Set it in .env for CMS content; requests will fail until then.'
  );
}

export const client = createClient({
  projectId: projectId || '',
  dataset: dataset || 'production',
  useCdn: true,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
});

// Helper function for generating image URLs
const builder = createImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
