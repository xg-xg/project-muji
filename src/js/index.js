require(['require.config'],()=>{
    require(['jquery','url','template','swiper','header','option',],($,url,template,Swiper)=>{
       class Index{
           constructor(){
            this.getData();
            this.banner();
            this.newProductsControl();
           }
           //
           banner () {
            // 首页轮播图
            var mySwiper = new Swiper ('.swiper-container', {
              autoplay: true,
              
              loop: true, // 循环模式选项
              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
                clickable: true
              },
              
              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                
              }
    
            }) 
          }
            //新商品轮播
            newProductsControl() {  
              let dis = 0;
              let newProducts = $('#index_new_item');
              // 向前滑动
              $('#goNewNext').on('click', function () {  
                  dis -= 60;
                  if(dis < -160){
                      dis = -160;
                  }
                  newProducts.stop().animate({left: dis});
              })
  
              // 向后滑动
              $('#goNewPrev').on('click', function () {  
                  dis += 50;
                  if(dis > 0){
                      dis = 0;
                  }
                  newProducts.stop().animate({left: dis});
              })
          }
           //推荐商品模块请求数据
           getData(){
                //ajax请求数据
                $.get(url.rapBaseUrl+"recommend",data=>{
                    if(data.res_code==1){
                        this.render(data.res_body.list);
                    }
                })
           }
           //渲染数据
           render(list){
                let html= template('index-recommend',{list});
                $("#index-recommend-list").html(html);
           }
       } 
       new Index();
    })
})