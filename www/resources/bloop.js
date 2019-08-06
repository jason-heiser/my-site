
/*     $$$$$\ $$\   $$\   */
/*     \__$$ |$$ |  $$ |  */
/*        $$ |$$ |  $$ |  */
/*        $$ |$$$$$$$$ |  */
/*  $$\   $$ |$$  __$$ |  */
/*  $$ |  $$ |$$ |  $$ |  */
/*  \$$$$$$  |$$ |  $$ |  */
/*   \______/ \__|  \__|  */
/*                        */
/*   Jason Heiser, 2019   */

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

var plaudits = (() => {
  var plaudit = 'plaudit-toggle';
  if (document.cookie.indexOf(plaudit) === -1) {
    document.cookie = plaudit + '=yes';
  } else {
    document.body.classList.add(plaudit);
    document.cookie = plaudit + '=  ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
  }
})();

var portfolio = (() => {

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
      var newIndex = fenceIndex(savedIndex + (startX !== endX ? startX < endX ? -1 : 1 : 0));
      goTo(newIndex);
    }
  }

  function keyHandler(event) {
    runCarousel(false);
    if (event.key === 'ArrowLeft') {
      goTo(fenceIndex(savedIndex - 1));
     } else if (event.key === 'ArrowRight') {
      goTo(fenceIndex(savedIndex + 1));
    }
  }

  function fenceIndex(newIndex) {
    return 0 > newIndex ? 0 : newIndex > items.length - 1 ? items.length - 1 : newIndex;
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

  [directory, vessel].forEach(element => {
    ['mouseover'].forEach(event => element.addEventListener(event, () => runCarousel(false)));
    ['mouseout'].forEach(event => element.addEventListener(event, () => runCarousel(true)));
  });

  window.addEventListener('keyup', keyHandler);
  vessel.addEventListener('touchstart', swipeHandler, { passive: true });
  vessel.addEventListener('touchend', swipeHandler, { passive: true });
  vessel.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
  vessel.style.overflow = 'hidden';

  setTimeout(() => runCarousel(true), 5000); // Delayed until the happy cloud stops fidgeting.
  goTo(0); // Tee up directory highlight for first item.

})();
