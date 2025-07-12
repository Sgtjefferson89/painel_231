const CACHE_NAME = 'painel-cache-v1';
const urlsToCache = [
  './',
  './painel.html',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css' 
  // Adicione aqui os caminhos para os seus ícones se quiser que eles também fiquem em cache
  // './icon-192.png',
  // './icon-512.png'
];

// Evento de Instalação: Salva os arquivos essenciais em cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de Fetch: Intercepta as requisições
// Se o recurso estiver no cache, serve a partir do cache. Senão, busca na rede.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Retorna do cache
        }
        return fetch(event.request); // Tenta buscar na rede
      })
  );
});