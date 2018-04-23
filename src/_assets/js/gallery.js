import 'lightgallery';
import 'lg-zoom';
import 'justifiedGallery';

import '../styles/gallery.scss';

$(document).ready(function () {
  $("article").lightGallery({
    selector: 'a[href*="/images/"]'
  });
  $("#gallery").justifiedGallery({
    captions: false
  });
});
