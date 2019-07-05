require(['require.config'],()=>{
    require(['jquery','url','header'],($,url)=>{
        class Register{
            constructor(){
                this.username = $("#username");
                this.password = $("#password");
                this.btn = $("#btn");
                this.bindEvents();
                this.back();
                this.send();
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
            //添加返回事件
            back(){
                $('#break').on('click',()=>{
                    window.history.go(-1);
                })
            }
            //发送验证码事件
            send(){
                //生成随机的验证码（4位）
                let num = parseInt(Math.ceil(Math.random()*(10000-1000+1)+1000));
                $('#code').on('click',()=>{
                    //获取用户输入的手机号
                    let mobile = this.username.val();
                    $.post('https://voice.yunpian.com/v2/voice/send.json',{
                        'apikey' :'553fc430fc15b5c67412e269ef26ec86',
                        'mobile' :mobile,
                        'code' : num
                    },function(resp){
                        console.log(resp.count);
                    })
                    
                })
            }
        }
        new Register();
    })
})