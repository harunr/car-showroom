
(function($){
	$(function(){

        setTimeout(function(){
            $('body').addClass('page-loaded');
        },2000);
            

        




        $(window).scroll(function() {
            var scrollDistance = $(window).scrollTop();

            // Show/hide menu on scroll
            //if (scrollDistance >= 850) {
            //		$('nav').fadeIn("fast");
            //} else {
            //		$('nav').fadeOut("fast");
            //}

            // Assign active class to nav links while scolling
            $('.page-section').each(function(i) {
                if ($(this).position().top <= scrollDistance + 1) {
                    $('.fixed-tab-scroll-wrap a.active').removeClass('active');
                    $('.fixed-tab-scroll-wrap a').eq(i).addClass('active');
                }
            });
        }).scroll();





       /* $(document).ready(function() {
            $('a[href*=#]').bind('click', function(e) {
                e.preventDefault(); // prevent hard jump, the default behavior

                var target = $(this).attr("href"); // Set the target as variable

                // perform animated scrolling by getting top-position of target-element and set it as scroll target
                $('html, body').stop().animate({
                    scrollTop: $(target).offset().top
                }, 600, function() {
                    location.hash = target; //attach the hash (#jumptarget) to the pageurl
                });

                return false;
            });
        });*/
        
        
        

        // ANIMATION CHECK IF IN VIEW
        var $animation_elements = $('.anim-el');
        var $window = $(window);
        var $fadeOnScroll = $('.fade-on-scroll');
        function check_if_in_view() {
            var window_height = $window.height();
            var half_window = window_height / 2 // half window height

            var insetAmount = window_height / 5 // fifth of the screen
            var window_top_position = $window.scrollTop();
            var window_bottom_position = (window_top_position + window_height) - insetAmount;

            if(window_top_position > window_height) {
                $('body').addClass('fixed-top-nav');
            } else {
                $('body').removeClass('fixed-top-nav');
            }

            $.each($fadeOnScroll, function(){
                var $element = $(this);
                var element_top_position = $element.offset().top;
                var trigger_point = element_top_position - half_window;
                var trigger_endpoint = element_top_position + 100; 
                var scrolled = window_top_position - trigger_point;
                var toScroll = half_window - scrolled;
                var opacity = toScroll/half_window;
                if(opacity > 1 ) {
                    $element.css('opacity',1);
                } else if (opacity < 0){
                     $element.css('opacity',0);
                } else {
                    $element.css('opacity',opacity); 
                }
               

            });

            $.each($animation_elements, function() {
                var $element = $(this);
                var element_height = $element.outerHeight();
                var element_top_position = $element.offset().top;
                var element_bottom_position = (element_top_position + element_height);

                //check to see if this current container is within viewport
                if (element_top_position <= window_bottom_position) {
                    $element.addClass('in-view');
                } else {
                    if(!$element.hasClass('anim-once')) {
                        $element.removeClass('in-view');
                    }
                    
                }
            });
        }
        $window.on('scroll orientationchange resize', check_if_in_view);
        $window.trigger('scroll');



var area = $('.awards-item-wrap');
var canvas = $('.canvas');

$('.award-hover-img').each(function(i){

    $(this).mouseleave(function(){
        $('.canvas-item').eq(i).css('opacity',0);
    })
    $(this).mouseenter(function(){
        $('.canvas-item').eq(i).css('opacity',1);
    })
    if($('.canvas-item').eq(i).length){

        var image = $('.canvas-item').eq(i).find('img'),
        image_src = image.attr('src'),
        image_width = image.width(),
        image_height = image.height(),
        aspect_ratio = image_width / image_height;
        $(this).mousemove(function(e) {
            var half_height = (260/aspect_ratio)/2;
            canvas.css('height',image_height+'px');
            //canvas.find('img').attr('src',image_src);
            canvas.offset({
                left: e.pageX - 130,
                top: e.pageY - half_height
            });
        });
     }
});





        // Phone nav click function
        $('.menu-icon-wrap').click(function () {
            $("body").toggleClass("navShown");
            $(".nav-wrap").fadeIn()
        });

        $(".main-nav ul > li").find("ul").parent("li").addClass("show");
        $(".main-nav ul > li").find("ul").parent("li").addClass("has-sub-nav");
        $(".main-nav ul > li.has-sub-nav > a").bind('click', 'touchend', function (e) {
            e.preventDefault();
            $(".main-nav ul > li").find("> ul:visible").slideUp()
            $(".main-nav ul > li").removeClass("active")
            if ($(this).parent().find("> ul:visible").length) {
                $(this).removeClass("active")
                $(this).parent().find("> ul").slideUp()
            } else {
                $(this).addClass("active")
                $(this).parent().find("> ul").slideDown()
            }
        })

         var lastScrollTopPos = 0;

        $('#phone-nav').on('click',function () {


            $('#nav-main').fadeToggle("fast", function() {
                $( "#nav-main" ).toggleClass('animate');
            });
        });

        /*  modal */


        $('.phone-nav').on('click',function (e) {
            e.preventDefault();
            lastScrollTopPos = $(window).scrollTop();
            $(".nav-modal-wrap").fadeIn();
            $("body").addClass("navExpanded");
            setTimeout(function(){
                $( ".nav-modal-wrap" ).addClass('animate');
            },800);
        })
        $(".back-btn").click(function (e) {
            e.preventDefault();
            $(".nav-modal-wrap").fadeOut();
            $("body").removeClass("navExpanded");
            setTimeout(function(){
                $( ".nav-modal-wrap" ).removeClass('animate');
            },800);
        })

        $(".nav-modal-wrap").on('click',function(e){
            e.stopPropagation();
        })


        var cartList = $('.cart-onorder-item-wrap'),
        cartWrap = $('.cart-main'),
        cartOnorderContent = $('.cart-onorder-content'),
        cartItemWrap = $('.cart-onorder-item-wrap');
        function cartModalOpen(e){
            e.preventDefault();
            $('.cart-wrap').fadeIn(500);
            $("body").addClass("cart-expand");
            cartHeightSet();
            var window_height = $(window).outerHeight();

        }
        function cartHeightSet(){
            var scrollTop = $(window).scrollTop(),
            cartListTop = cartList.offset().top,
            cartTop = cartListTop - scrollTop,
            window_height = $(window).outerHeight(),
            checkoutHeight = $('.order-checkout-wrap').outerHeight(),
            maxHeight = window_height - cartTop,
            cartMaxHeight = maxHeight - checkoutHeight;
            cartOnorderContent.css('height',maxHeight+'px');
            cartItemWrap.css({'max-height':cartMaxHeight});
            cartWrap.css('height',window_height+'px');
        }
        $(window).on('resize load orientationchange', cartHeightSet);
        $('.cart-content').on('click', cartModalOpen);
        $(".cross-btn, .cart-bg").on('click','',function (e) {
            e.preventDefault();
            $('.cart-wrap').fadeOut(500);
            $("body").removeClass("cart-expand");
        })

        $(".cart-wrap").on('click',function(e){
            e.stopPropagation();

        })
       
        // End venue-carousel function 

        if ($("select.stylled-select").length) {
            $("select.stylled-select").selectric();
        }

        
        
        $('.hover').mouseenter(function(){
            $(this).addClass('hoverd');
        });

        $('.hover').mouseleave(function(){
            $(this).removeClass('hoverd');
        })
        
        // CART BUTTON ANIMATION
        
        
        /*tab1*/
        var mdquery = window.matchMedia("(max-width: 767px)");
        if (mdquery.matches) {
            if ($("select.mobiselect").length) {
                $("select.mobiselect").selectric();
            }
            var tslitem = $( "#" + $("select.mobiselect option:selected").val());
            tslitem.addClass("active");
            $("select.mobiselect").on("change", function() {
                var tchitem = $("#" + $("select.mobiselect option:selected").val());
                var tchheight = tchitem.height() + 100;
                $(".tab-item-wrap").css({ height: tchitem + "px" });
                $(".tab-item-wrap > div").removeClass("item-active");
                tchitem.addClass("item-active");
            });
        }

        var mdquery = window.matchMedia("(min-width: 767px)");
        if (mdquery.matches) {
            $('#tab-item-wrap .tab-slider-wrap').slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                fade: false,
                swipe: true,
                swipeToSlide: true,
                dots: true,
                lazyLoad: 'progressive',
            });

            $("#tab-triger-inner ul > li").removeClass("tab-active")
            $("#tab-triger-inner ul > li").eq(0).addClass("tab-active")
            $(".tab-item-wrap > div.tab-item").eq(0).addClass("item-active")


            $("#tab-triger-inner ul > li").each(function (i) {
                $(this).click(function (e) {

                    if ($(this).hasClass("tab-active")) return false
                    else {
                        $("#tab-triger-inner ul > li").removeClass("tab-active")
                        $(this).addClass("tab-active")
                        $(".tab-item-wrap > div.tab-item").removeClass("item-active")
                        $(".tab-item-wrap > div.tab-item").eq(i).addClass("item-active")
                    }
                })

            });


        }


        var mdquery = window.matchMedia("(max-width: 767px)");
        if (mdquery.matches) {

            $(".tab-triger-inner > ul > li > a").removeClass("active")
            $(".tab-triger-inner > ul > li > a").eq(0).addClass("active")
            $(".tab-item-wrap > div.tab-item").eq(0).addClass("item-active")

            $(".tab-triger-inner > ul > li > a").each(function (i) {
                $(this).click(function () {
                    if ($(this).hasClass("active")) return false
                    else {
                        $(".tab-triger-inner > ul > li > a").removeClass("active")
                        $(this).addClass("active")
                        $(".tab-item-wrap > div.tab-item").removeClass("item-active")
                        $(".tab-item-wrap > div.tab-item").eq(i).addClass("item-active")

                    }
                })
            });


            $('#tab-item-wrap .tab-slider-wrap').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: false,
                dots: true,
                draggable: true,
                swipeToSlide: true,
                lazyLoad: 'progressive',
                responsive: [


                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            autoplay: false,
                            speed: 700,
                            controlNav: false,
                            directionNav: false,
                            arrows: false,
                            loop: false,
                            dots: true,
                            centerMode: true,
                            centerPadding: "45px",
                        }
                    },


                ]
                
            });

        }

        /*tab2*/
        
            $('#tab-item-wrap-2 .tab-slider-wrap').slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                fade: false,
                dots: true,
                swipeToSlide: true,
                lazyLoad: 'progressive',
                responsive: [


                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            autoplay: false,
                            speed: 700,
                            controlNav: false,
                            directionNav: false,
                            arrows: false,
                            loop: false,
                            dots: true,
                            centerMode: true,
                            centerPadding: "45px",
                        }
                    },

                    
                ]
            });

            $("#tab-triger-inner-2 ul > li").removeClass("tab-actived")
            $("#tab-triger-inner-2 ul > li").eq(0).addClass("tab-actived")
            $("#tab-item-wrap-2 > div.tab-item").eq(0).addClass("item-actived")


            $("#tab-triger-inner-2 ul > li").each(function (i) {
                $(this).click(function (e) {

                    if ($(this).hasClass("tab-actived")) return false
                    else {
                        $("#tab-triger-inner-2 ul > li").removeClass("tab-actived")
                        $(this).addClass("tab-actived")
                        $("#tab-item-wrap-2 > div.tab-item").removeClass("item-actived")
                        $("#tab-item-wrap-2 > div.tab-item").eq(i).addClass("item-actived")
                    }
                })

            });
        
        
        /* Product Page */
        
        if ($(".product-content").length) {
            $("body").addClass("product-page")
        }

        /* Product Page */
        if ($(".shop-main-content").length) {
            $("body").addClass("shop-main-page")
        }


    if ($(window).width() < 767) {
        $('#product-gallery-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: false,
            dots: true,
            centerMode: true,
            centerPadding: '65px',
        })
    };

    if ($(window).width() < 767) {
        $('.product-gallery-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: false,
            dots: true,
            centerMode: true,
            centerPadding: '65px',
        });
        $(window).on('resize', function () {
            $('.product-gallery-slider').slick('resize');

        });
    };

        // Accordion Function
        
        
        $(".product-accordion-item").each(function(){
            var $this = $(this);
            $this.find(" > span").on("click touch", function(){
                $(".product-accordion-item").removeClass("product-accordion-active")
                $(".product-accordion-content").slideUp();
                if($this.find(".product-accordion-content:visible").length){
                    $(".product-accordion-item").removeClass("product-accordion-active")
                    $(".product-accordion-content").slideUp();
                }
                else{
                    $this.addClass("product-accordion-active")
                    $(".product-accordion-content").slideUp();
                    $this.find(" > .product-accordion-content").slideDown();
                }
            })
        })





        /* Product Page */
        
        

// MAGENETIC PLAY BUTTON
class HoverButton {
  constructor(el) {
    this.el = el;
    this.hover = false;
    this.calculatePosition();
    this.attachEventsListener();
  }

  attachEventsListener() {
    window.addEventListener('mousemove', e => this.onMouseMove(e));
    window.addEventListener('resize', e => this.calculatePosition(e));
    window.addEventListener('scroll', e => this.calculatePosition(e));
  }

  calculatePosition() {
    TweenMax.set(this.el, {
      x: 0,
      y: 0,
      scale: 1 });

    const box = this.el.getBoundingClientRect();
    this.x = box.left + box.width * 0.5;
    this.y = box.top + box.height * 0.5;
    this.width = box.width;
    this.height = box.height;
  }

  onMouseMove(e) {
    let hover = false;
    let hoverArea = this.hover ? 0.7 : 0.5;
    let x = e.clientX - this.x;
    let y = e.clientY - this.y;
    let distance = Math.sqrt(x * x + y * y);
    if (distance < this.width * hoverArea) {
      hover = true;
      if (!this.hover) {
        this.hover = true;
      }
      this.onHover(e.clientX, e.clientY);
    }

    if (!hover && this.hover) {
      this.onLeave();
      this.hover = false;
    }
  }

  onHover(x, y) {
    TweenMax.to(this.el, 0.4, {
      x: (x - this.x) * 0.4,
      y: (y - this.y) * 0.4,
      scale: 1.15,
      ease: Power2.easeOut });

    this.el.style.zIndex = 10;
  }
  onLeave() {
    TweenMax.to(this.el, 0.7, {
      x: 0,
      y: 0,
      scale: 1,
      ease: Elastic.easeOut.config(1.2, 0.4) });

    this.el.style.zIndex = 1;
  }
}

$(window).on('load resize scroll',function(){
    if($(window).width() > 767) {
        const btn1 = document.querySelector('.play-video-btn-wrap');
        new HoverButton(btn1);
    }
}) 

// END MAGENETIC PLAY BUTTON


// Cart Item remove 
  
        $(".cart-counter > dfn, .order-title > span > dfn").text(($(".cart-onorder-item-wrap").children().length));

        $(".tab-slider .slider-add-to-cart").click(function () {
            var $$this = $(this).parent('.tab-slider-thumb').parent('.tab-slider');
            //add items to basket
            $$this.each(function () {
                
                var name = "<span class='product-name'>" + $(this).children(".tab-slider-content").children("h4").text() + "</span>";
                var imgFullURL = $(this).children(".tab-slider-thumb").children("figure").children("img").attr('src');
                var pThumb = "<figure class='cart-thumb'>" + "<img " + "src=" + imgFullURL + " " + ">" + "</figure>";
                var remove = "<button class='remove'> remove </button>";
                var calc = "<span class='eachPrice-wrap'>" + "<span class='dollar'>" + "$" + "</span>" + "<span class='eachPrice'>" + (parseFloat($(this).children(".prices").children(".price").text()))  + "</span>" + "</span>";
                var cartContent = "<div class='onorder-item-content'>" + name + calc + remove + "</div>"
                $(".cart-onorder-item-wrap").append("<div class='cart-onorder-item'>" + pThumb + cartContent + "</div>");
                "<img class='cart-thumb'"

                //number of items in basket
                $(".cart-counter > dfn, .order-title > span > dfn").text(($(".cart-onorder-item-wrap").children().length));
                $(".cart-counter > dfn, .order-title > span > dfn").text();

                //calculate total price
                var totalPrice = 0;
                $(".eachPrice").each(function (){ 
                    var cenaEach = parseFloat($(this).text());
                    totalPrice+=cenaEach;
                });
                $("#total-price").text("$" + totalPrice);
            });

            //remove items from basket
            
            $(".remove").on("click", function () {
                $(this).parents('.cart-onorder-item').remove();

                var totalPrice = 0;
                $(".eachPrice").each(function (){ 
                    var cenaEach = parseFloat($(this).text());
                    totalPrice+=cenaEach;
                });
                
                $("#total-price").text("$" + totalPrice);
                $(".cart-counter > dfn, .order-title > span > dfn").text(($(".cart-onorder-item-wrap").children().length));
            });
        });
        
        
        $('.tab-slider .slider-add-to-cart').on('click', function(e){
            var $this = $(this);
            $this.addClass('loading');
            setTimeout(function(){
                $this.removeClass('loading');
                cartModalOpen(e);
            }, 2000);
        })
        
	})// End ready function.
   
})(jQuery)

