$(document).ready(function () {
  // Copy data-srcset from image to parent link
  $('article a[href*="/assets/img/"]').each(function(i) {
    var srcset = $(this).find('img').attr('data-srcset');
    $(this).attr('data-srcset', srcset);
  });
  $("article").lightGallery({
    selector: 'a[href*="/assets/img/"]'
  });
  $("#gallery").justifiedGallery({
    captions: false
  });
});
