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
  

