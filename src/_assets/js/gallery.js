import 'picturefill';
import 'lightgallery';
import 'lg-zoom';
import 'justifiedGallery';

import '../styles/gallery.scss';

$(document).ready(function () {
  // Copy data-srcset from image to parent link
  $('article a[href*="/images/"]').each(function (i) {
    var srcset = $(this).find('img').attr('data-srcset');
    $(this).attr('data-srcset', srcset);
  });
  $("article").lightGallery({
    selector: 'a[href*="/images/"]'
  });
  $("#gallery").justifiedGallery({
    captions: false
  });
});
