self.addEventListener('install',function(event){
  debugger;
    console.log('install');
     event.waitUntil(
    caches.open('cache2').then(function(cache) {

      return cache.addAll([
        '/',
                  '/img/1.jpg',
                  '/img/2.jpg',
                  '/img/3.jpg',
                  '/img/4.jpg',
                  '/img/5.jpg',
                  '/img/6.jpg',
                  '/img/7.jpg',
                  '/img/8.jpg', 
                  '/img/9.jpg', 
                  '/img/10.jpg', 
                  '/css/media.css',
                  '/css/styles.css',
                  '/data/restaurants.json'
                  //'main.js',
                  //'dbhelper.js',
                  //'restaurant_info.js',
      ]);
    })
  );   
})

self.addEventListener('fetch',function(event){
  // debugger;
  console.log("fetch");
  // event.respondWith(
  //   caches.match(event.request).then(function(response){
  //     if(response) return response;
  //     return fetch(event.request);
  //   })
  //   )
})





/*self.addEventListener('fetch',function(event){
	debugger;
	Console.log('hi');
	Console.log(event.request);
})*/

self.addEventListener('fetch',function(event){
  
  console.log("fetch");
  event.respondWith(
    caches.match(event.request).then(function(response){
      if(response) return response;
self.addEventListener('install',function(event){
    console.log('install');
     event.waitUntil(
    caches.open('cache1').then(function(cache) {
      return cache.addAll([
        '/',
                  'js/main.js',
                  'js/dbhelper.js',
                  'js/restaurant_info.js',
                  '/img/1.jpg',
                  '/img/2.jpg',
                  '/img/3.jpg',
                  '/img/4.jpg',
                  '/img/5.jpg',
                  '/img/6.jpg',
                  '/img/7.jpg',
                  '/img/8.jpg',
      ]);
    })
  );   
})

document.addEventListener('fetch',function(event){
  debugger;
  console.log("fetch");
  event.respondWith(
    caches.match(event.request).then(function(response){
      if(response) return response;
      return fetch(event.request);
    })
    )
})
      return fetch(event.request);
    })
    )
})



