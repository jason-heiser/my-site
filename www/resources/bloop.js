if (window.location.hostname === 'jason.heiser.org') {
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-2723051-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
}

(function() {
  var examples = document.querySelector('section.examples ul');
  var gear = document.querySelector('section.examples img');
  var items = examples.querySelectorAll('li');
  var interval = 0;
  var index = 0;

  interval = setInterval(function() {
    index = index === items.length - 1 ? 0 : index + 1;
    items.forEach(function(e, i) {
      e.style.transform = 'translateX(-' + index * 100 + '%)';
      gear.style.transform = 'rotate(' + index * 180 + 'deg)';
    });
  }, 7500);
  
})();