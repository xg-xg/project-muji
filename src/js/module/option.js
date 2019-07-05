define(['jquery','cookie'], ($) => {
    class Option{
        constructor(){
            this.container = $('#option-container');
            this.init().then(() => {
                this.isLogin();
                this.calcCartNum();
            });
        }
        isLogin(){
            this.beforeBtn = $('#login-register');
            this.afterLogin = $('#login-success');
            this.name = $('#name');
            this.exit = $('#exit');
            let username = $.cookie("username");
         
            
            if(username){
                this.beforeBtn.hide();
                this.afterLogin.show();
               this.name.html(username);
            }
            this.exit.on('click',()=>{
                var _this =this
                if(confirm("确定退出吗")){
                    $. removeCookie("username",{path:'/'});
                    _this.beforeBtn.show();
                    _this.afterLogin.hide();
                }
            })
        }
       
        init(){
            // 加载header.html
            return new Promise(resolve=> {
                this.container.load('/html/module/option.html', () => {
                    
                    resolve();
                })
            });
        }
        //计算购物车的数量
        calcCartNum(){
            
            let cart = JSON.parse(localStorage.getItem('cart'));
                // cart = JSON.parse(cart);
            if(cart){
                
                let num = cart.reduce((n,shop)=>{
                    n += shop.num;
                    return n
                },0);
                $('#cart-num').html(num);
            }
            
        }
    }
    return new Option();
});