import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jrlageoscdghhkcbppjg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpybGFnZW9zY2RnaGhrY2JwcGpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NzMzNTMsImV4cCI6MjEwODM0OTM1M30.3KUL9qBceOqrcG1B1wGhUPBg1v-4DIyPObDnaveY4dQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
