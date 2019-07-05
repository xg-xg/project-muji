define(['jquery'], () => {
    class Header{
        constructor(){
            this.container = $('#header-container')
            this.init().then(() => { 
                
            });
        }
        init(){
            // 加载header.html
            return new Promise(resolve=> {
               this.container.load('/html/module/header.html', () => {
                    resolve();
                })
            });
        }
    }
    return new Header();
});