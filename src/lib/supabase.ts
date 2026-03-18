import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pxjgrwowocnzwodfxtcb.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4amdyd293b2NuendvZGZ4dGNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MDgxMTksImV4cCI6MjA4OTM4NDExOX0.1D-Yeopan_hGam5LlfHreQ2OA-QrbkJQoR42ydngPE4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
