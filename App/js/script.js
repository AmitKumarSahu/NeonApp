window.onload = () => {
    var emblaNode = document.querySelector(".embla");
    var emblaFontSelectorNode = document.querySelector(".embla_font_selector");
    var options = { dragFree: true ,loop:true };
    var embla = EmblaCarousel(emblaNode, options);
    var emblaFontSelector = EmblaCarousel(emblaFontSelectorNode , options)
    let slideInView = embla.slidesInView();
    let fontSelectorSlidesInView = emblaFontSelector.slideNodes();
    let currentIndex = 0;
  
    // on loading the screen apply default fonts and color to the text
    $("#fDisplay").css("font-family" , $(".fontCenter svg").attr("data-font-style"));
    $("#fDisplay").css("color" , $(".center button").css('color'));
  
    embla.on('scroll',() => {
      slideInView = embla.slidesInView();
      reformSlidesInViewArray(slideInView , embla);
      console.log(slideInView);
      let height = 25,opacity = 0.2 ;
      for(let i=0;i<slideInView.length;i++){
        $(".embla__slide:eq("+slideInView[i]+")").css({"transform" : "translate(0px,"+height+"px)" , "opacity" : opacity});
        if(opacity==1){
          $(".embla__slide:eq("+slideInView[i]+")").addClass("center");
          let textColor = $(".center button").css('color');
          let color = "drop-shadow(0 0 2.75rem "+$(".center button").css('color')+")";
          let textShadow = "0px 1px 10px "+textColor;
          $(".fontCenter .st0").css({"fill":textColor, "filter":color});
          $("#fDisplay").css("font-family" , $(".fontCenter svg").attr("data-font-style"));
          $("#fDisplay").css("color" , $(".center button").css('color'));
          $("#fDisplay").css("text-shadow" , textShadow);
  
        }
        else{
          $(".embla__slide:eq("+slideInView[i]+")").removeClass("center");
        }
        if(i==4){
          $(".embla__slide:eq("+slideInView[i]+") .color-title").removeClass("hide");
        }
        else{
          $(".embla__slide:eq("+slideInView[i]+") .color-title").addClass("hide");
        }
        if(i<=3){
          height = height-25;
          if(i==3){
            opacity = 1;
          }
          else{
            opacity = 0.2;
          }
        }
        else{
          height = height+25;
          opacity = 0.2;
        }
      }
    });
  
    emblaFontSelector.on('scroll',() => {
      fontSelectorSlidesInView = emblaFontSelector.slidesInView();
      let mid =2 , labelPoint = 3;
      if(fontSelectorSlidesInView[0]==0){
        reformSlidesInViewArrayForTexts(fontSelectorSlidesInView , emblaFontSelector);
        mid = 3;
        labelPoint =4;
      }
      let height = 50,opacity = 0.2,top=0,color='',textColor="#ffffff" , textShadow="#ffffff";
      for(let i=0;i<fontSelectorSlidesInView.length;i++){
        $(".embla_font-slider:eq("+fontSelectorSlidesInView[i]+")").css({"transform" : "translate(0px,"+height+"px)" , "opacity" : opacity , "top":top+"px"});
        $(".embla_font-slider:eq("+fontSelectorSlidesInView[i]+") .st0").css({"fill":textColor, "filter":color});
        if(i==labelPoint){
          $(".embla_font-slider:eq("+fontSelectorSlidesInView[i]+") div").removeClass("font-hide");
        }
        else{
          $(".embla_font-slider:eq("+fontSelectorSlidesInView[i]+") div").addClass("font-hide");
        }
        if(opacity==1){
          $("#fDisplay").css("font-family" , $(".fontCenter svg").attr("data-font-style"));
          $("#fDisplay").css("color" , textColor);
          $("#fDisplay").css("text-shadow" , textShadow);
          $(".embla_font-slider:eq("+fontSelectorSlidesInView[i]+")").addClass("fontCenter");
        }
        else{
          $(".embla_font-slider:eq("+fontSelectorSlidesInView[i]+")").removeClass("fontCenter");
        }
        if(i<=mid){
          height = height-50;
          if(i==mid){
            opacity = 1;
            top = -30;
            color = "drop-shadow(0 0 2.75rem "+$(".center button").css('color')+")";
            textColor = $(".center button").css('color');
            textShadow = "0px 1px 10px "+textColor;
          }
          else{
            opacity = 0.2;
            top = 0;
            color = "none"
            textColor = "#ffffff";
          }
        }
        else{
          height = height+50;
          opacity = 0.2;
          top = 0;
          color = "none"
          textColor = "#ffffff";
        }
      }
    });
  
  // function control scroll using arrow keys
  document.onkeydown = function(e) {
    switch(e.which) {
        case 37: // left
        embla.scrollPrev();
        break;
  
        case 39: // right
        embla.scrollNext();
        break;
  
        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  };
  
  var selector = ".section";
  
    var $slides = $(selector);
  
    var currentSlide = 0;
    var isAnimating = false;
  
    var stopAnimation = function() {
      setTimeout(function() {
        isAnimating = false;
      }, 300);
    };
  
    var bottomIsReached = function($elem) {
      var rect = $elem[0].getBoundingClientRect();
      return rect.bottom <= $(window).height();
    };
  
    var topIsReached = function($elem) {
      var rect = $elem[0].getBoundingClientRect();
      return rect.top >= 0;
    };
  
    document.addEventListener(
      "wheel",
      function(event) {
        var $currentSlide = $($slides[currentSlide]);
  
        if (isAnimating) {
          event.preventDefault();
          return;
        }
  
        var direction = -event.deltaY;
  
        if (direction < 0) {
          // next
          if (currentSlide + 1 >= $slides.length) return;
          if (!bottomIsReached($currentSlide)) return;
          event.preventDefault();
          currentSlide++;
          var $slide = $($slides[currentSlide]);
          var offsetTop = $slide.offset().top;
          isAnimating = true;
          $("html, body").animate(
            {
              scrollTop: offsetTop
            },
            1000,
            stopAnimation
          );
        } else {
          // back
          if (currentSlide - 1 < 0) return;
          if (!topIsReached($currentSlide)) return;
          event.preventDefault();
          currentSlide--;
          var $slide = $($slides[currentSlide]);
          var offsetTop = $slide.offset().top;
          isAnimating = true;
          $("html, body").animate(
            {
              scrollTop: offsetTop
            },
            1000,
            stopAnimation
          );
        }
      },
      { passive: false }
    );
  
  
    // font resizer js logic //
    const range = document.getElementById('range');
  
    range.addEventListener('input', (e) => {
      // Get the label (which is the nextElementSibling)
      const label = e.target.nextElementSibling;
        console.log(label)
      // Get value of the input
      const value = +e.target.value;
        console.log(value)
      // Get the width value of the input
      const range_width = getComputedStyle(e.target).getPropertyValue('width');
        console.log(range_width)
      // Get the width value of the label
      const label_width = getComputedStyle(label).getPropertyValue('width');
        console.log(label_width)
      // Remove 'px' and conver to number
      const num_width = +range_width.substring(0, range_width.length - 2);
        console.log(num_width);
      const num_label_width = +label_width.substring(0, label_width.length - 2);
        console.log(num_label_width);
      // Get min and max values
      const max = +e.target.max;
      const min = +e.target.min;
      // Calculate the left value
      const left = value * (num_width / max) - num_label_width / 2 + scale(value, min, max, 10, -10);
      
      label.style.left = `${left+30}px`;
      label.innerHTML = value+" px";
        $("#fDisplay").css("font-size" , value);
    });
    
    const scale = (num, in_min, in_max, out_min, out_max) => {
      return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    // end //
  }
  
  
  function reformSlidesInViewArray(slideInView , emblaSlider){
    let start = emblaSlider.slidesNotInView();
    start = start[0]+2;
    for(let i=0;i<slideInView.length;i++){
      if(start>slideInView.length){
        slideInView[i] = (start-slideInView.length)-1;
        start = slideInView[i];
      }
      if(start==slideInView.length){
        slideInView[i] = slideInView.length;
        start=-1;
      }
      else{
        slideInView[i]=start;
      }
      start++;
    }
  }
  
  function reformSlidesInViewArrayForTexts(slideInView , emblaSlider){
    let totalLength = emblaSlider.slideNodes().length;
    let start = emblaSlider.slidesNotInView();
    start = start[start.length-1];
    for(let i=0;i<slideInView.length;i++){
      if(start>=totalLength){
        slideInView[i] = start-totalLength;
        start = slideInView[i];
      }
      else{
        slideInView[i]=start;
      }
      start++;
    }
  }