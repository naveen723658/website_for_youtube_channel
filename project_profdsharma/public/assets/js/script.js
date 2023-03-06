// $( document ).ready(function() {
//     var w = window.innerWidth;
   
//     if(w > 767){
//         $('#menu-jk').scrollToFixed();
//     }else{
//         $('#menu-jk').scrollToFixed();
//     }
    
// })

  
  document.querySelector('.menu-toggle').addEventListener("click", function() {
    document.querySelector(".nav").classList.toggle("mobile-nav");
    this.classList.toggle("is-active");
  });
  
  var feild = document.querySelector('textarea');
  var backUp = feild.getAttribute('placeholder');
  var btn = document.querySelector('.btn');
  var clear = document.getElementById('clear')

  feild.onfocus = function(){
      this.setAttribute('placeholder', '');
      this.style.borderColor = '#333';
      btn.style.display = 'block'
  }

  feild.onblur = function(){
      this.setAttribute('placeholder',backUp);
      this.style.borderColor = '#aaa'
  }

  clear.onclick = function(){
      btn.style.display = 'none';
      feild.value = '';
  }


  document.addEventListener("DOMContentLoaded", function() {
    var slider = document.querySelector("#testimonial-slider");
    var owl = new OwlCarousel(slider, {
      items: 1,
      itemsDesktop: [1000, 1],
      itemsDesktopSmall: [979, 1],
      itemsTablet: [768, 1],
      pagination: false,
      navigation: true,
      navigationText: ["", ""],
      autoPlay: true
    });
  });
  

