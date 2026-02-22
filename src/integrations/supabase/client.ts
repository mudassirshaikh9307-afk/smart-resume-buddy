// LocalStorage-based replacement for Supabase
// Fully static, works on GitHub Pages

import type { Database } from './types';

// const STORAGE_KEY = 'smart_resume_data';

// export const localClient = {
//   // Insert or update a table
//   insert: (table: keyof Database, data: any) => {
//     const allData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
//     allData[table] = data;
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
//     return { data, error: null };
//   },

//   // Select data from a table
//   select: (table: keyof Database) => {
//     const allData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
//     return { data: allData[table] || null, error: null };
//   },

//   // Clear all stored data
//   clear: () => {
//     localStorage.removeItem(STORAGE_KEY);
//   }
// };