$(document).ready(function () {
  $("article").lightGallery({
    selector: 'a[href*="/assets/img/"]'
  });
  $("#gallery").justifiedGallery({
    captions: false
  });
});
