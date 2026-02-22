// src/integrations/localClient.ts
// LocalStorage-based replacement for Supabase
// Fully static, works on GitHub Pages

const STORAGE_KEY = 'smart_resume_data';

export const localClient = {
  insert: (table: string, data: any) => {
    const allData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    allData[table] = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
    return { data, error: null };
  },

  select: (table: string) => {
    const allData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return { data: allData[table] || null, error: null };
  },

  clear: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
};

export const supabase = {
  functions: {
    invoke: async (fnName: string, { body }: { body: any }) => {
      // Simulate AI summary generation
      return {
        data: {
          summary: `Generated summary for job title "${body.jobTitle}" with skills: ${body.skills.join(
            ", "
          )}`,
        },
      };
    },
  },
};