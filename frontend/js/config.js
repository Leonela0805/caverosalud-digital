// Configuración de la aplicación
const CONFIG = {
    // La URL del backend se actualizará después de desplegar en Render
    API_URL: 'https://tu-app-en-render.onrender.com/api',
    // Configuración de Supabase
    SUPABASE: {
        URL: 'https://tu-proyecto-supabase.supabase.co',
        KEY: 'tu-api-key-supabase'
    }
};

// Detectar ambiente y ajustar configuración
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    CONFIG.API_URL = 'http://localhost:3000/api';
}