require(['require.config'],()=>{
    require(['jquery','url','cookie','header'],($,url)=>{
       
        class Login{
            constructor(){
               
                this.username = $('#username');
                this.password = $('#password');
                this.btn = $('#btn');
                this.checkbox = $('#checkbox');
                this.bindEvents();
                this.back();
            }
            //添加返回事件
            back(){
                $('#break').on('click',()=>{
                    window.history.go(-1);
                })
            }
            bindEvents(){
                this.btn.on('click',()=>{
                    let usernameInput = this.username.val();
                    let passwordInput = this.password.val();
                    $.ajax({
                        url : url.phpBaseUrl+'user/login.php',
                        type :"post",
                        data :{usernameInput,passwordInput},
                        success :data=>{
                            if(data.res_code===1){
                               this.loginSuccess(usernameInput)
                            } 
                            else{
                                alert('用户名或密码输入错误')
                            }
                        },
                        dataType :'json'
                    })
                })
            }
            loginSuccess(username){
                let expires = this.checkbox.prop('checked') ? {expires:7} :{};
                
                //将username存入cookie
                 expires=Object.assign({path:"/"},expires);
                
                $.cookie('username',username,expires);
                alert("登录成功，即将跳转至首页");
                location.href='/';
            }
        }
        new Login();
    })  
})