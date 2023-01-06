// HackTimer.js https://github.com/turuslan/HackTimer
const hackTimer = (function(s){var w,f={},o=window,l=console,m=Math,z='postMessage',x='[sdarot_vanced] HackTimer.js by turuslan: ',v='Initialisation failed',p=0,r='hasOwnProperty',y=[].slice,b=o.Worker;function d(){do{p=0x7FFFFFFF>p?p+1:0}while(f[r](p));return p}if(!/MSIE 10/i.test(navigator.userAgent)){try{s=o.URL.createObjectURL(new Blob(["var f={},p=postMessage,r='hasOwnProperty';onmessage=function(e){var d=e.data,i=d.i,t=d[r]('t')?d.t:0;switch(d.n){case'a':f[i]=setInterval(function(){p(i)},t);break;case'b':if(f[r](i)){clearInterval(f[i]);delete f[i]}break;case'c':f[i]=setTimeout(function(){p(i);if(f[r](i))delete f[i]},t);break;case'd':if(f[r](i)){clearTimeout(f[i]);delete f[i]}break}}"]))}catch(e){}}if(typeof(b)!=='undefined'){try{w=new b(s);o.setInterval=function(c,t){var i=d();f[i]={c:c,p:y.call(arguments,2)};w[z]({n:'a',i:i,t:t});return i};o.clearInterval=function(i){if(f[r](i))delete f[i],w[z]({n:'b',i:i})};o.setTimeout=function(c,t){var i=d();f[i]={c:c,p:y.call(arguments,2),t:!0};w[z]({n:'c',i:i,t:t});return i};o.clearTimeout=function(i){if(f[r](i))delete f[i],w[z]({n:'d',i:i})};w.onmessage=function(e){var i=e.data,c,n;if(f[r](i)){n=f[i];c=n.c;if(n[r]('t'))delete f[i]}if(typeof(c)=='string')try{c=new Function(c)}catch(k){l.log(x+'Error parsing callback code string: ',k)}if(typeof(c)=='function')c.apply(o,n.p)};w.onerror=function(e){l.log(e)};l.log(x+'Initialisation succeeded')}catch(e){l.log(x+v);l.error(e)}}else l.log(x+v+' - HTML5 Web Worker is not supported')})

function waitForElement(selector, timeout) {
    // Get the element
    var element = document.querySelector(selector);
  
    // Check if the element is visible
    if (element.offsetParent !== null) {
      // The element is visible, so we can return it
      return element;
    } else {
      // The element is not visible, so we'll use requestAnimationFrame() to check again before the next repaint
      return new Promise((resolve, reject) => {
        var startTime = performance.now();
  
        function checkVisibility() {
          // Get the element again
          var element = document.querySelector(selector);
  
          // Check if the element is visible
          if (element.offsetParent !== null) {
            // The element is visible, so we can resolve the promise
            resolve(element);
          } else {
            // The element is not visible, so we'll check again after the next repaint
            var currentTime = performance.now();
            if (currentTime - startTime > timeout) {
              // The element didn't become visible within the timeout, so we'll reject the promise
              reject(new Error(`Element with selector "${selector}" did not become visible within ${timeout} milliseconds`));
            } else {
              requestAnimationFrame(checkVisibility);
            }
          }
        }
  
        // Start checking the visibility of the element
        checkVisibility();
      });
    }
  }

  
function bypassDownload() {
    // Get the src attribute of the element with ID "videojs_html5_api" and remove "amp;" from it
    var src = document.querySelector('#videojs_html5_api').src.replaceAll("amp;", "");

    // Select the elements with the class "btn download" and the ID "fakeDL"
    var elements = ['.btn.download', '#fakeDL'];

    // Loop through the elements
    elements.forEach((selector) => {
      var element = document.querySelector(selector);

      // Remove the class "disabled" from the element
      element.classList.remove('disabled');

      // Set the element's href attribute to the src value
      element.href = src;

      // Set the element's target attribute to "_blank"
      element.target = '_blank';

      // Toggle the "download" attribute of the element
      element.toggleAttribute('download');
    });
}
  
async function waitAndbypassVideoDownload() {
    await waitForElement('#fakeDL', 1000 * 60 * 5)
    await new Promise(resolve => setTimeout(resolve, 300))
    try {
        bypassDownload()
    } catch {
        console.error('[sdarot_vanced] Can\'t bypass download button')
    }
}



async function extension() {
    console.log('[sdarot_vanced] Sdarot.tv premium running...')
    console.log('[sdarot_vanced] Sdarot.tv bypassing timer...')
    waitAndbypassVideoDownload()
    hackTimer()
}

extension()