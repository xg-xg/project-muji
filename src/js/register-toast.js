require(['./require.config'],()=>{
    require(['jquery','header'],($)=>{
        class RegToast{
            constructor(){
                this.back();
                this.time();
                this.timer='';
            }
            //点击返回上一级
            back(){
                $('#break').on('click',()=>{
                    window.history.go(-1);
                    console
                })
            }
            //倒计时
            time(){
                let num = $('#num').html();
               this.timer = setInterval(function(){
                num-=1;
               
                if(num<1){
                    num = 1;
                    clearInterval(this.timer);
                    $('#num').html(num);
                    $('#all').hide();
                    $('#agree').css('background',"#7f0019");
                    $('#agree').css('cursor','pointer');
                    $('#agree').on('click',()=>{
                        window.location.href = '/html/register.html'
                        
                    })
                }
                $('#num').html(num);
               },1000)
              
            }
            //按钮添加点击事件，跳转到注册界面
            
               
            
        }
        new RegToast();
    })
})