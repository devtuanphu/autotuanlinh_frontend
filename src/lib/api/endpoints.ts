/**
 * Strapi API Endpoints Configuration
 * 
 * Centralized endpoint definitions for all Strapi collections
 */

export const STRAPI_ENDPOINTS = {
  // Single Types
  home: '/home',
  
  // Collection Types (add more as needed)
  // products: '/products',
  // articles: '/articles',
  // categories: '/categories',
} as const;

export type StrapiEndpoint = keyof typeof STRAPI_ENDPOINTS;

