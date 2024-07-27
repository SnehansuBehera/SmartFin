import { createClient } from "@supabase/supabase-js";

// const PUBLIC_SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL;
// const PUBLIC_SUPABASE_ANON_KEY = process.env.PUBLIC_SUPABASE_ANON_KEY;


export const supabase = createClient("https://vanpjobbtvaczauvarai.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhbnBqb2JidHZhY3phdXZhcmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2MTUwODQsImV4cCI6MjAzNjE5MTA4NH0.EFi9HYThWoyJacbtupWUJB7MugccBXsKu9Ni9Qcac8k");