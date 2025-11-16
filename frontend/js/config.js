// Configuración de la aplicación
const CONFIG = {
    // La URL del backend se actualizará después de desplegar en Render
    API_URL: 'https://caverosalud-digital.onrender.com',
    // Configuración de Supabase
    SUPABASE: {
        URL: 'https://hxosnhieeqlhdmjbjoku.supabase.co',
        KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4b3NuaGllZXFsaGRtamJqb2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyNTIxNDksImV4cCI6MjA3ODgyODE0OX0.EkGSPyVDhMi2FEEIGsc90_P7yQWYk409lgPOUNmG-pc'
    }
};

// Detectar ambiente y ajustar configuración
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    CONFIG.API_URL = 'http://localhost:3000/api';
}
