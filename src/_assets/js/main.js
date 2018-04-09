import 'fastclick';
import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.alert';
import 'foundation-sites/js/foundation/foundation.accordion';
import 'foundation-sites/js/foundation/foundation.dropdown';
import 'foundation-sites/js/foundation/foundation.topbar';
import 'lazysizes';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/respimg/ls.respimg';

import '../styles/styles_feeling_responsive.scss';

// Polyfill for Foundation 5 to work with jQuery 3
// https://stackoverflow.com/a/41262100
$.fn.load=function(callback){$(window).trigger("load", callback)};

$(document).foundation({
  reveal : {
    animation: 'fade',
    animation_speed: 250
  }
});
