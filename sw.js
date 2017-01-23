// window.addEventListener('load', function() {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js');
//   }
// });

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    // 登録成功
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function(err) {
    // 登録失敗 :(
    console.log('ServiceWorker registration failed: ', err);
  });
}



window.addEventListener('load', function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // 登録成功
        return registration.pushManager.getSubscription().then(function(subscription) {
          if (subscription) {
            return subscription
          }
          return registration.pushManager.subscribe({
            userVisibleOnly: true
          })
        })
      }).then(function(subscription) {
        var endpoint = subscription.endpoint
        console.log("pushManager endpoint:", endpoint) // https://android.googleapis.com/gcm/send/******:******......
      }).catch(function(error) {
        // 登録失敗 :(
        console.warn("serviceWorker error:", error)
      })
  }
})
