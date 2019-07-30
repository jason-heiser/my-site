/*
       $$$$$\ $$\   $$\ 
       \__$$ |$$ |  $$ |
          $$ |$$ |  $$ |
          $$ |$$$$$$$$ |
    $$\   $$ |$$  __$$ |
    $$ |  $$ |$$ |  $$ |
    \$$$$$$  |$$ |  $$ |
     \______/ \__|  \__|
     Jason Heiser - 2019
 */

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

window.addEventListener('load', () => document.body.classList.add('ready-freddy'));
document.querySelector('.theme a').addEventListener('click', () => document.body.classList.toggle('light-switch'));

var portfolio = (function() {

  function makeDirectory() {
    var directory = document.createElement('ul');
    directory.classList.add('directory');
    portfolio.appendChild(directory);
    items.forEach((e, i) => {
      var entry = document.createElement('li');
      directory.appendChild(entry);
      entry.addEventListener('click', () => goTo(i));
      entry.setAttribute('role', 'button');
    });
    return directory;
  }

  function swipeHandler(event) {
    runCarousel(false);
    if (event.type === 'touchstart') {
      startX = event.touches[0].clientX;
    } else {
      var endX = event.changedTouches[0].clientX;
      var newIndex = savedIndex + (startX !== endX ? startX < endX ? -1 : 1 : 0);
      goTo(0 > newIndex ? 0 : newIndex > items.length - 1 ? items.length - 1 : newIndex);
    }
  }

  function goTo(index) {
    savedIndex = index;
    items.forEach((element, itemIndex) => {
      var directory = Array.from(document.querySelectorAll('ul.directory li'));
      directory[itemIndex].setAttribute('class', savedIndex === itemIndex ? 'active' : '');
      element.style.opacity = savedIndex === itemIndex  ? 1 : 0.15;
      element.style.transform = 'translateX(-' + savedIndex * 100 + '%)';
      gear.style.transform = 'rotate(' + savedIndex * 180 + 'deg)';
    });
  }

  function runCarousel(yes) {
    clearInterval(interval);
    if (yes) {
      interval = setInterval(() => goTo(savedIndex + 1 > items.length - 1 ? 0 : savedIndex + 1), 6000);
    }
  }

  var interval = 0;
  var savedIndex = 0;
  var portfolio = document.querySelector('section.portfolio');
  var vessel = portfolio.querySelector('ul.examples');
  var items = vessel.querySelectorAll('li');
  var gear = document.querySelector('section.portfolio img');
  var directory = makeDirectory(portfolio, items);
  var startX = 0;
  vessel.style.overflow = 'hidden';

  [directory, vessel].forEach(element => {
    ['mouseover'].forEach(event => element.addEventListener(event, () => runCarousel(false)));
    ['mouseout'].forEach(event => element.addEventListener(event, () => runCarousel(true)));
  });

  vessel.addEventListener('touchstart', swipeHandler, { passive: true });
  vessel.addEventListener('touchend', swipeHandler, { passive: true });

  setTimeout(() => runCarousel(true), 5000); // Delayed until the happy cloud stops fidgeting.
  goTo(0); // Tee up directory highlight for first item.

})();
