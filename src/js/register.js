require(['require.config'],()=>{
    require(['jquery','url'],($,url)=>{
        class Register{
            constructor(){
                this.username = $("#username");
                this.password = $("#password");
                this.btn = $("#btn");
                this.bindEvents();
            }
            //给注册按钮绑定事件
            bindEvents(){
                
                this.btn.on('click',()=>{
                    let usernameInput = this.username.val();
                    let passwordInput = this.password.val();
                    console.log(passwordInput+'555wde');
                    $.ajax({
                        url :url.phpBaseUrl+'user/register.php',
                        type :"post",
                        //需要传递的参数
                        data :{usernameInput,passwordInput},
                        //成功进行的操作
                        success :data=>{
                          if(data.res_code===1){
                              alert(data.res_message+'，即将跳转到登录页面');
                              location.href="login.html";
                          }
                        },
                        dataType :"json"

                    })
                })
            }
        }
        new Register();
    })
})