require(['require.config'],()=>{
    require(['jquery','url','template','header','option'],($,url,template)=>{
        class Foot{
            constructor(){
                this.getData();
            }
            //从接口获取数据
            getData(){
                $.get(url.rapBaseUrl+"food/list",data=>{
                    if(data.res_code==1){
                        this.render(data.res_body.list);
                    }
                })
            }
            render(list){
                let food = template('food-list-item',{list})
                $('#food-list').html(food);
            }
            //事件委托，点击进行挑跳转到详情页面
            

        }
        new Foot();
    })
})