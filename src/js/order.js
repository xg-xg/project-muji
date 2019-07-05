require(['require.config'],()=>{
    require(['jquery','url','template','header'],($,url,template)=>{
        class Order{
            constructor(){
                this.container = $('#show');
                this.getData();
            }
            getData(){
                let cart = JSON.parse(localStorage.getItem('cart'));
                let car = $.grep(cart,function(shop,i){
                    return shop.check=true;
                },false)
                console.log(car)
                let str = template('order-template',{data:cart});
                this.container.html(str);
            }
        }
        new Order();
    })
})

