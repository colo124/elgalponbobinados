import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hwzzwokozpyvixyzltcp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3enp3b2tvenB5dml4eXpsdGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzI0MDYsImV4cCI6MjA4ODIwODQwNn0._H7vfJJdapZdR6nl8BvbIph82YwORieSEEZAEm12K-M';

// Implement robust client with retry logic
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
  },
  global: {
    headers: { 'x-application-name': 'taller-bobinado-pro' },
  },
});

// Helper for API calls with exponential backoff
export const safeFetch = async (operation: () => Promise<any>, retries = 3, delay = 1000): Promise<any> => {
  try {
    return await operation();
  } catch (error: any) {
    if (retries > 0 && (error.status >= 500 || error.status === 429)) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return safeFetch(operation, retries - 1, delay * 2);
    }
    throw error;
  }
};