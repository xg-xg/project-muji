require.config({
    baseUrl : "/",
    paths :{
        "jquery" : "libs/jquery/jquery-1.11.3.min",
        "footer" : "js/module/footer", 
        "header" : "js/module/header",
        "option" : "js/module/option",
        "url"    : "js/module/url",
        "template" : "libs/art-template/template-web",
        "cookie" :"libs/jquery/jquery-plugins/jquery.cookie",
        "zoom"   :"libs/jquery/jquery-plugins/jquery.elevateZoom-3.0.8.min",
        "fly"    :"libs/jquery/jquery-plugins/jquery.fly",
        "swiper" :"libs/swiper/js/swiper"
    },
    //垫片，cookie不满足AMD规范，但是要基于jquery模块
    shim :{
        "cookie" :{
            deps:["jquery"]
        },
        "zoom" : {
            deps: ['jquery']
          }, 
          "fly" : {
            deps: ['jquery']
          }
    }
})