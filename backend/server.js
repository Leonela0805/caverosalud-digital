// Agregar al inicio
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase (usa tus valores reales)
const supabaseUrl = 'https://hxosnhieeqlhdmjbjoku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4b3NuaGllZXFsaGRtamJqb2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyNTIxNDksImV4cCI6MjA3ODgyODE0OX0.EkGSPyVDhMi2FEEIGsc90_P7yQWYk409lgPOUNmG-pc';
const supabase = createClient(supabaseUrl, supabaseKey);

// Ejemplo de función para obtener usuarios
async function getUsers() {
    const { data, error } = await supabase
        .from('usuarios')
        .select('*');
    
    if (error) {
        console.error('Error:', error);
        return [];
    }
    
    return data;
}