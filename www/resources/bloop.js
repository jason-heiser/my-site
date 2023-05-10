
/*     $$$$$\ $$\   $$\   */
/*     \__$$ |$$ |  $$ |  */
/*        $$ |$$ |  $$ |  */
/*        $$ |$$$$$$$$ |  */
/*  $$\   $$ |$$  __$$ |  */
/*  $$ |  $$ |$$ |  $$ |  */
/*  \$$$$$$  |$$ |  $$ |  */
/*   \______/ \__|  \__|  */
/*                        */
/*   Jason Heiser, 2022   */

if (window.location.hostname === 'jason.heiser.org') {
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-2723051-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script');
    ga.async = true;
    ga.type = 'text/javascript';
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-NPRMCJHYBS';
    var script = document.getElementsByTagName('script')[0];
    script.parentNode.insertBefore(ga, script);
    window.dataLayer = window.dataLayer || [];
    function gtag(){
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-NPRMCJHYBS');
  })();
}

window.addEventListener('load', () => {
  document.body.classList.add('ready-freddy');

  var objects = Array.from(document.querySelectorAll('object'));
  var cluster = (selector) => objects.map(object => Array.from(object.contentDocument?.querySelectorAll(selector) || [])).flat();
  
  var twinkleInterval = 0;
  var sparkleInterval = 0;

  var doTwinkle = (speed) => {
    var stars = cluster('.circular-star');
    if (stars.length) {
      clearInterval(twinkleInterval);
      twinkleInterval = setInterval(() => {
        var random = Math.floor(Math.random() * stars.length);
        var star = stars[random];
        star.style.transition = 'opacity 200ms';
        star.style.opacity = 0;
        setTimeout(() => star.style.opacity = 1, 500);
      }, speed);
    }
  }

  var march = (cadence) => {
    var letters = cluster('g.web-development path');
    letters.forEach((letter, index) => {
      var rise = -5;
      var even = index % 2 === 0;
      var start = even ? 0 : rise;
      var finish = even ? rise : 0;
      var transform = (amount) => letter.style.transform = 'translateY(' + amount + 'px)';
      letter.style.transition = 'transform 500ms';
      transform(start);
      setTimeout(() => transform(finish), cadence);
    });
  }

  var doMarch = (cadence) => {
    march(cadence);
    setInterval(() => march(cadence), cadence * 2);
  }

  var sparkle = (element, total, i) => { 
    var scale = 1 - (i > (total / 2) ? (total - 1) - i : i) * 0.1;
    var rotation = element.style.transform.match(/rotate\(([0-9]+)deg\)/);
    var offset = element.classList.contains('.crooked-star') ? 90 : 45;
    var degrees = ((rotation !== null ? parseInt(rotation[1], 10) : 0) + offset) % 360;
    var transform = 'rotate(' + degrees + 'deg) scale(' + scale + ')';
    element.style.transformOrigin = 'center';
    element.style.transformBox = 'fill-box';
    element.style.transform = transform;
  }

  var doSparkle = (speed) => {
    var randomizer = () => Math.ceil(Math.random() * 10) > 5 ? 1 : -1;
    var stars = cluster('.straight-star, .crooked-star').sort(randomizer);
    if (stars.length) {
      let counter = 0;
      clearInterval(sparkleInterval);
      sparkleInterval = setInterval(() => {
        var index = counter++ % stars.length;
        var rotations = 10;
        var star = stars[index];
        for (i = 0; rotations > i; i++) {
          var closure = (c) => () => sparkle(star, rotations, c);
          setTimeout(closure(i), i * 100);
        }
      }, speed);
    }
  }
  doTwinkle(150);
  doSparkle(1000);
  doMarch(2000);

});

var runCarousel = (() => {

  var makeDirectory = () => {
    var directory = document.createElement('ul');
    directory.classList.add('directory');
    portfolio.appendChild(directory);
    items.forEach((e, i) => {
      var entry = document.createElement('li');
      directory.appendChild(entry);
      entry.addEventListener('click', () => goTo(i));
    });
    return directory;
  }

  var keyHandler = (event) => {
    if (event.key === 'ArrowLeft') {
      runCarousel(true);
      goTo(fenceIndex(savedIndex - 1));
     } else if (event.key === 'ArrowRight') {
      runCarousel(true);
      goTo(fenceIndex(savedIndex + 1));
    }
  }

  var fenceIndex = (newIndex) => {
    return 0 > newIndex ? 0 : newIndex > items.length - 1 ? items.length - 1 : newIndex;
  }

  var goTo = (index) => {
    degrees = degrees + (index > savedIndex ? 120 : index < savedIndex ? -120 : 0)
    savedIndex = index;
    items.forEach((element, itemIndex) => {
      var classNames = savedIndex > itemIndex ? 'inactive before' : savedIndex < itemIndex ? 'inactive after' : 'active';
      var directory = Array.from(document.querySelectorAll('ul.directory li'));
      directory[itemIndex].setAttribute('class', classNames);
      element.setAttribute('class', classNames);
      gear.style.transform = 'rotate(' + degrees + 'deg)';
    });
  }

  var runCarousel = (yes, event) => {
    if (event?.toElement?.localName === 'aside') {
      return;
    }
    clearInterval(carouselInterval);
    if (yes) {
      carouselInterval = setInterval(() => goTo(savedIndex + 1 > items.length - 1 ? 0 : savedIndex + 1), 5000);
    }
  }


  var carouselInterval = 0;
  var savedIndex = 0;
  var portfolio = document.querySelector('section.portfolio');
  var vessel = portfolio.querySelector('ul.examples');
  var items = vessel.querySelectorAll('li');
  var gear = document.querySelector('section.portfolio img');
  var degrees = 0;
  var directory = makeDirectory(portfolio, items);

  [directory, vessel].forEach(element => {
    ['mouseover'].forEach(event => element.addEventListener(event, event => runCarousel(false, event)));
    ['mouseout'].forEach(event => element.addEventListener(event,  event => runCarousel(true, event)));
  });
  window.addEventListener('blur', event => runCarousel(false, event));
  window.addEventListener('focus', event => runCarousel(true, event));
  window.addEventListener('keyup', keyHandler);

  goTo(0);
  runCarousel(true);

  return runCarousel;

})();

(() => {

  var initModal = (link, event) => {
    event?.preventDefault();
    var location = window.location.protocol + '//' + window.location.hostname + '/';
    var modalShowing = 'modal-showing';
    var modalLoading = 'modal-loading';
    var modalReadied = 'modal-readied';
    var modal = document.createElement('a');
    var instructions = document.createElement('span');
    instructions.innerText = 'Click anywhere to close';
    var caption = document.createTextNode(link.innerText);
    var [element, attribute, blending] = link.href.indexOf('.svg') === -1 ?
                                         ['img', 'src', 'normal'] :
                                         ['object', 'data', 'difference'];
    var image = document.createElement(element);
    var [filename, id] = link.href.match(/([^\/\.]+)\.[a-zA-Z]+$/);
    image.addEventListener('load', () => document.body.classList.add(modalShowing));
    image.setAttribute(attribute, link.href);
    image.setAttribute('id', id);
    image.style.mixBlendMode = blending;
    modal.classList.add('modal');
    modal.appendChild(image);
    modal.appendChild(caption);
    modal.appendChild(instructions);
    document.body.appendChild(modal);
    document.body.classList.add(modalReadied, modalLoading);
    history.replaceState(null, '', location + '#' + id);
    var kill = () => {
      history.replaceState(null, '', location);
      window.removeEventListener('keyup', kill);
      document.body.classList.remove(modalShowing, modalLoading);
      setTimeout(() => document.body.removeChild(modal), 1000);
      runCarousel(true);
    };
    modal.addEventListener('click', kill);
    window.addEventListener('keyup', kill);
  };

  var links = Array.from(document.querySelectorAll('a')).filter(link => link.href.match(/(gif|png|svg|jpg|jpeg)$/) !== null);
  links.forEach(link => link.addEventListener('click', event => initModal(link, event)));

  window.addEventListener('load', () => {
    var link = links.find(link => window.location.hash.length > 0 && link.href.indexOf(window.location.hash.substring(1)) !== -1);
    if (link) {
      setTimeout(() => initModal(link), 1000);
    }
  });

})();

