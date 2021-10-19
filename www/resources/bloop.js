
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

window.addEventListener('load', () => {
  document.body.classList.add('ready-freddy');
  document.querySelector('header img').setAttribute('src', 'resources/self-portrait.png');
});

(() => {

  var lightClass = 'light-switch';

  document.querySelector('.theme a').addEventListener('click', () => {
    lightSwitch();
    saveSwitch();
  });

  function lightSwitch() {
    document.body.classList.toggle(lightClass);
  }

  function saveSwitch() {
    if (localStorage.getItem(lightClass) === 'yes') {
      localStorage.setItem(lightClass, 'no');
    } else {
      localStorage.setItem(lightClass, 'yes');
    }
  }

  localStorage.getItem(lightClass) === 'yes' && lightSwitch();
  
})();

(() => {

  var plauditClass = 'plaudit-toggle-off';

  if (localStorage.getItem(plauditClass) === 'yes') {
    localStorage.setItem(plauditClass, 'no');
    document.body.classList.add(plauditClass);
  } else {
    localStorage.setItem(plauditClass, 'yes');
  }

})();

(() => {

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
    degrees = degrees + (index > savedIndex ? 120 : index < savedIndex ? -120 : 0)
    savedIndex = index;
    items.forEach((element, itemIndex) => {
      var direction = itemIndex > savedIndex ? 1 : itemIndex < savedIndex ? -1 : 0;
      var directory = Array.from(document.querySelectorAll('ul.directory li'));
      directory[itemIndex].setAttribute('class', savedIndex === itemIndex ? 'active' : '');
      element.style.opacity = savedIndex === itemIndex  ? 1 : 0;
      element.style.transform = 'translateX(' + (direction * 33) + '%)';
      gear.style.transform = 'rotate(' + degrees + 'deg)';
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
  var degrees = 0;
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

  goTo(0); // Tee up directory highlight for first item.
  runCarousel(true);

})();
