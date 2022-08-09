    // rem 前端自适应代码 需要部分作出修改
    (function (win) {
        let doc = win.document, docEl = doc.documentElement, timer = null;
        function refreshRem() {
          //  ele.getBoundingClientRect()    返回元素的大小及其相对于视口的位置。
          
            let width = docEl.getBoundingClientRect().width;    
            if (width > 750) { // 最大宽度,  750为设计稿的宽度
                docEl.style.fontSize =  '100px';
            }else{
                var rem = width / 3.75;
                docEl.style.fontSize = rem + 'px';
            }
        }
        
        win.addEventListener('resize', function () {
            clearTimeout(timer);
            timer = setTimeout( refreshRem , 300);
        }, false);
        
        win.addEventListener('pageshow', function (e) {
          //  e.persisted  判断是否后退进入
          
            if (e.persisted) {
                clearTimeout(timer);
                timer = setTimeout(refreshRem, 300);
            }
        }, false);
        
        refreshRem();
        
    })(window);