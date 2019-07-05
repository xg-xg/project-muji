require(['require.config'], () => {
  require(['jquery','template', 'url', 'option','zoom', 'header','footer','cookie','fly'], ($,template, url,option) => {
    class Details {

      constructor() {
        
        this.getData();
       
      }
      //获取数据
      getData() {
        
        //从地址中获取id（这个id是从列表页传过来的）
        let id = location.search.slice(4);
        //把这个id挂给全局，因为后面的购物车还会使用
        // this.id = id;
        $.get(url.rapBaseUrl + "detail/list", { id }, res => {
          if (res.res_code == 1) {
            //解构赋值，将res_body里面的字段取出来放在data对象里面
            let { data } = res.res_body;
            //给data对象添加一个“id”属性
            data = { ...data, id };
            this.data = data;
            this.render(data);
            
          }
        })
       
      }
      // 渲染页面
      render(data) {
        let info = template('detail-template', { data });
        let bh = template('bh',{data});
        let cs = template('info-template',{data});
        let shop = template('shop-template',{data});
        $('#number').html(bh);
        $('#detail-container').html(info);
        $('.shop-info-data').html(cs);
        $('.shop-add').html(shop);
        this.zoom();
        this.cartBuy();
        this.sure();
       
      }
      //放大镜
      zoom () {
      // 放大镜插件
      $(".zoom-img").elevateZoom({
      gallery:'small-image-container',
      cursor: 'pointer',
      galleryActiveClass: 'active',
      borderSize:'1', 
      borderColor:'#888'
      });
      }
      
    
      //点击添加购物车和立即购买操作
      cartBuy(){
        let flag = true;
        //添加购物车
        $('#add-into-cart').on('click',function(e){
          e.stopPropagation();
          if(flag){
            $('.shop-add').animate({bottom:0});
            $('.shop-show').css('opacity',0.7)
           $('.shop-show').css('background','rgba(0,0,0)');
          
            $('#middle-image-container').css('opacity',0.3);
            $('#small-image-container').css('opacity',0.3);
            flag = false;
            
          }
          else{
            $('.shop-add').animate({bottom:-360});
            flag = true;
            
          
          } 
        })
         //立即购买
        $('#buy-now').on('click',function(e){
          e.stopPropagation();
          if(flag){
            $('.shop-add').animate({bottom:0});
            $('.shop-add-bottom').on('click',function(){
              if($.cookie('username')){
                location.href = '/html/cart.html'
              }else{
                alert('请先登录');
                location.href = '/html/login.html';
              }
            })
          }
        })
        //点击其他部分，让添加模块消失
        $('.shop-add-bottom').on('click',function(e){
          $('#toast').show();
          setTimeout(function(){
            $('#toast').hide();
          },2500)
          flag = true;
          $('.shop-add').animate({bottom:-360});
          $('.shop-show').css('opacity',1)
          $('.shop-show').css('background','rgba(255,255,255)');
          $('#middle-image-container').css('opacity',1);
          $('#small-image-container').css('opacity',1);
        })
        $('.shop-show').on('click',function(e){
          flag = true;
          $('.shop-add').animate({bottom:-360});
          $('.shop-show').css('opacity',1)
          $('.shop-show').css('background','rgba(255,255,255)');
          $('#middle-image-container').css('opacity',1);
          $('#small-image-container').css('opacity',1);
        })
        this.operation();
      }
      //数量添加事件
      //增加数量
      operation(){

        this.shopAdd = $('.shop-add-number');
        this.num = Number(this.shopAdd.html());
        // console.log(this.num);
        $('.shop-add-add').on('click',()=>{
          console.log(1)
          this.num++;
          this.shopAdd.html(this.num);
          return false;
        })
        //减少数量
        $('.shop-sub').on('click',()=>{
          console.log(1)
            this.num--;
            this.shopAdd.html(this.num);
            if(this.num <= 1){
              this.num = 1;
            this.shopAdd.html(this.num);
          }
          return false;
        })
      }
      //点击确定按钮，添加到购物车
      sure(){
        $('.shop-add-bottom').on('click',e=>{
          $(`<img src='${this.data.image[0]}' style='width:20px;height:20px'>`).fly({
            start: {
              left: e.clientX,
              top: e.clientY
            },
            end: {
              left: $("#cart-num").offset().left,
              top: $("#cart-num").offset().top
              // left: 1300,
              // top: 300
            },
            onEnd: function () {
              this.destroy(); //销毁抛物体
              option.calcCartNum(); // 调用一次计算购物车数量的方法
            }
          });



          let Num = Number(this.shopAdd.html());
          //取出cookie
          let cart = localStorage.getItem('cart');
          //如果购物车不空
          // if($.cookie('username')){
            if(cart){
              cart = JSON.parse(cart);
              let index = -1;
              
              if(cart.some((shop, i) => {
                index = i;
                return shop.id === this.data.id;
              })){
                //当前数据存在
                cart[index].num = cart[index].num+Num;
                //不存在当前数据
              }else{
                cart.push({...this.data,num:Num,check:true})
              }
            }
            //购物车为空
            else{
              cart = [{...this.data,num:Num,check:true}];
            }
            //在重新存入localstorage
             localStorage.setItem('cart',JSON.stringify(cart));
          // // }else{
          //   alert('请先登录')
          //   location.href= './login.html'
          // }
          
           
      
        })
      }
      
      
    }
    new Details();
    

  });
});

