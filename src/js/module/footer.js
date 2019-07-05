define(['jquery'], () => {
    class Footer{
        constructor(){
            this.container = $('#footer-container')
            this.init().then(() => {
            });
        }
        init(){
            // 加载header.html
            return new Promise(resolve=> {
                this.container.load('/html/module/footer.html', () => {
                    
                    resolve();
                })
            });
        }
    }
    return new Footer();
});