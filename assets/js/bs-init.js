if (window.innerWidth < 768) {
	$('[data-bss-disabled-mobile]').removeClass('animated').removeAttr('data-aos data-bss-hover-animate');
}

$(document).ready(function(){
	AOS.init();

	$('[data-bss-hover-animate]')
		.mouseenter( function(){ var elem = $(this); elem.addClass('animated ' + elem.attr('data-bss-hover-animate')) })
		.mouseleave( function(){ var elem = $(this); elem.removeClass('animated ' + elem.attr('data-bss-hover-animate')) });

(function(){

	if(!('requestAnimationFrame' in window)) return;
	if(/Mobile|Android/.test(navigator.userAgent)) return;

	var backgrounds = [];

	$('[data-bss-parallax-bg]').each(function(){
		var el = $(this);
		var bg = $('<div>');

		bg.css({
			backgroundImage: el.css('background-image'),
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			position: 'absolute',
			height:'200%',
			width:'100%',
			top:0, left:0,
			zIndex: -100
		});

		bg.appendTo(el);
		backgrounds.push(bg[0]);

		el.css({
			position:'relative',
			background:'transparent',
			overflow: 'hidden',
		});
	});

	if(!backgrounds.length) return;

	var visible = [];
	var scheduled;

	$(window).on('scroll resize', scroll);

	scroll();

	function scroll(){

		visible.length = 0;

		for(var i = 0; i < backgrounds.length; i++){
			var rect = backgrounds[i].parentNode.getBoundingClientRect();

			if(rect.bottom > 0 && rect.top < window.innerHeight){
				visible.push({
					rect: rect,
					node: backgrounds[i]
				});
			}

		}

		cancelAnimationFrame(scheduled);

		if(visible.length){
			scheduled = requestAnimationFrame(update);
		}

	}

	function update(){

		for(var i = 0; i < visible.length; i++){
			var rect = visible[i].rect;
			var node = visible[i].node;

			var quot = Math.max(rect.bottom, 0) / (window.innerHeight + rect.height);

			node.style.transform = 'translate3d(0, '+(-50*quot)+'%, 0)';
		}

	}

})();

(function(){

	if(!('requestAnimationFrame' in window)) return;
	if(/Mobile|Android/.test(navigator.userAgent)) return;

	var backgrounds = [];
	var backgroundToSpeed = new WeakMap;

	$('[data-bss-scroll-zoom]').each(function(){
		var el = $(this);
		var bg = $('<div>');

		bg.css({
			backgroundImage: el.css('background-image'),
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			position: 'absolute',
			height:'100%',
			width:'100%',
			top:0, left:0,
			zIndex: -100
		});

		bg.appendTo(el);
		backgrounds.push(bg[0]);
		backgroundToSpeed.set(bg[0], el.data('bss-scroll-zoom-speed') || 1);

		el.css({
			position:'relative',
			background:'transparent',
			overflow: 'hidden',
		});
	});

	if(!backgrounds.length) return;

	var visible = [];
	var scheduled;

	$(window).on('scroll resize', scroll);

	scroll();

	function scroll(){

		visible.length = 0;

		for(var i = 0; i < backgrounds.length; i++){
			var rect = backgrounds[i].parentNode.getBoundingClientRect();

			if(rect.bottom > 0 && rect.top < window.innerHeight){
				visible.push({
					rect: rect,
					node: backgrounds[i],
					speed: backgroundToSpeed.get(backgrounds[i])
				});
			}

		}

		cancelAnimationFrame(scheduled);

		if(visible.length){
			scheduled = requestAnimationFrame(update);
		}

	}

	function update(){

		for(var i = 0; i < visible.length; i++){
			var rect = visible[i].rect;
			var node = visible[i].node;
			var speed = visible[i].speed;

			var quot = rect.top < 0 ? Math.abs(rect.top) / rect.height : 0;

			node.style.transform = 'scale3d('+ (1 + quot * speed) + ', ' + (1 + quot * speed) + ', 1)';
		}

	}

})();
});