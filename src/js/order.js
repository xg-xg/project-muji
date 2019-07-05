require(['require.config'],()=>{
    require(['jquery','url','template','header'],($,url,template)=>{
        class Order{
            constructor(){
                this.container = $('#show');
                this.wrap = $('#bottom')
                this.getData();
                this.history();
                this.render();
            }
            //从lcoalstorage中获取数据，获取用户选中的数据
            getData(){
                let cart = JSON.parse(localStorage.getItem('cart'));
                let car = $.grep(cart,function(shop,i){
                    return shop.check===true;
                },false)
                let str = template('order-template',{data:car});
                this.container.html(str);
                
            }
            //点击 返回上一个页面
            history(){
                $('#break').on('click',()=>{
                    window.history.go(-1);
                    
                })
            }
            //渲染底部数据
            render(){
                
                let cart = JSON.parse(localStorage.getItem('cart'));
                let allNum = cart.reduce((num,shop)=>{
                    if(shop.check===true){
                        num += shop.num;
                       
                    }
                    return num;
                },0)
                let allPrice = cart.reduce((price,shop)=>{
                    if(shop.check==true){
                        price+=shop.num*shop.price;
                       
                    }
                    return price;
                },0)
                // let totalprice = allPrice.toFixed(2)
                $('#shop-num').html(allNum);
                $('#shop-price').html(allPrice.toFixed(2));
            }
        }
        new Order();
    })
})

