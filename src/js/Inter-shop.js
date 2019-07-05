require(['require.config'],()=>{
    require(['jquery'],($)=>{
        class interShop {
            constructor(){
                
                 this.BindEvent();
            }
            BindEvent(){
                $('#header-search').on('click',function(e){
                   e.stopPropagation();
                   $('#header-right').animate({width:170})
                   $('input').animate({width:148})
                   $(this).hide();
                })
                $('input').on('click',function(e){
                    e.stopPropagation();
                    $(this).animate({width:148});
                    // $('input').animate({width:0})
                })
                $(document.body).on('click',function(e){
                    e.stopPropagation();
                    $('#header-right').animate({width:0})
                    $('input').animate({width:0})
                    $('#header-search').show();
                })
            }
        }
        new interShop();
    })
})