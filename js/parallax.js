$(function() {
  //Smooth Scroll
  $('a').smoothScroll();
  
  //Parallax jQ
	function multiParallax() {
		var $winHeight	= $( window ).height();
		
		if($(window).width() > 767) {
			$('[data-parallax]').each(function() {
				var $position	= $(this).offset().top - $(document).scrollTop();

				if ( $winHeight >= $position ) {
					var $depth, $i, $layer, $layers, $len, $movement, $translate3d;
					var $layers		= $('[data-type="parallax"]');

					$($layers).each(function() {
						$parent		= $(this).parent();
						$curPos		= $($parent).offset().top - $(document).scrollTop();

						$depth 		= $(this).attr('data-depth');
						$movement	= $curPos * $depth;
						$translate 	= 'translate3d(0, ' + $movement + 'px, 0)';

						$(this).css({
							"-webkit-transform"	: $translate,	
							"-moz-transform"	: $translate,
							"-ms-transform"		: $translate,
							"-o-transform"		: $translate,
							"transform"			: $translate
						});
					});
				}
			});
		}
		$('[data-sliderParallax]').each(function() {
			var $sposition	= $(this).offset().top - $(document).scrollTop();
			var $scrollAmount 	= 150;
			var $objH = $(this).outerHeight();
			var $spositionBot = ($(this).offset().top - $(document).scrollTop()) + $objH;
			if ( $winHeight >= $sposition && ($spositionBot >= 0)) {
				var $sdepth, $si, $slayer, $slayers, $slen, $smovement, $stranslate3d;
				var $slayers		= $('[data-type="sliderParallax"]');

				$($slayers).each(function() {
					$sparent		= $(this).parent();
					var $sparentH		= $sparent.outerHeight();
					var $sparentTopPos  = $(this).offset().top; 
					var $sparentBotPos 	= $sparentTopPos + $sparentH;
					var $totalScrollAmount = $sparentH + $winHeight;

					$(this).find('img').css("height",$sparentH + $scrollAmount);
					$scurPos		= ($(document).scrollTop() + $winHeight) - $(this).offset().top;
					$stranslate = (($scurPos / $totalScrollAmount)*$scrollAmount)*-1;
					$(this).find('img').css({"object-position" : "50% "+$stranslate+'px'} );

				});
			}
		});
	}

	$(window).on('load scroll', function() {
		multiParallax();
	});


});