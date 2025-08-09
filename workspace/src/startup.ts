import { loadRodbTranslator } from './loadRodbTranslator';

window.addEventListener('DOMContentLoaded', () => {
    console.log('📦 Webpack is ready and DOM is fully loaded.');
});

window.addEventListener('load', () => {
    console.log('✅ All resources finished loading.');
    // RODB Translatorからのデータロード
    loadRodbTranslator(window.location.hash);
});
