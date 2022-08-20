$('.carousel').on('slide.bs.carousel', function(e) {
  $(this).find('.carousel-inner').animate({
    height: $(e.relatedTarget).height()
  }, 500);
});