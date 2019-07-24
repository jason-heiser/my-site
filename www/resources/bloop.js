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

  function goTo(index) {
    savedIndex = index > items.length - 1 ? 0 : index;
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
      interval = setInterval(() => goTo(savedIndex + 1), 6000);
    }
  }

  var interval = 0;
  var savedIndex = 0;
  var portfolio = document.querySelector('section.portfolio');
  var vessel = portfolio.querySelector('ul.examples');
  var items = vessel.querySelectorAll('li');
  var gear = document.querySelector('section.portfolio img');
  var directory = makeDirectory(portfolio, items);
  vessel.style.overflow = 'hidden';

  [directory, vessel].forEach(element => {
    ['mouseover'].forEach(event => element.addEventListener(event, () => runCarousel(false)));
    ['mouseout'].forEach(event => element.addEventListener(event, () => runCarousel(true)));
  });

  runCarousel(true);
  goTo(0);

})();
