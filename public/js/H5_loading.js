// loading脚本文件
var H5_loading = function(imgs){
    var id = this.id;
    // 第一次进入
    if(this._imgs === undefined){
        this._imgs = (imgs||[]).length;
        this._load = 0;
        // 将当前对象存储在全局对象window中
        // 用于图片加载完成之后的回调
        window[id] = this; 
        for(s in imgs){
            var item = imgs[s];
            var img = new Image();
            // 绑定图片加载完成时的监听事件
            img.onload = function() {
                window[id].loader();
            }
            img.src = item;
        }
        $('#rate').text('0%')
        return this
    }else{
        this._load++;
        $('#rate').text(this._load/this._imgs*100>>0+'%');
        if(this._load<this._imgs){
            return this;
        }else{
            window[id] = null;
        }
    }
    this.el.fullpage({
        onLeave: function (index, nextIndex, direction) {
            $(this).find('.h5_component').trigger('onLeave')
        },
        afterLoad: function (anchorLink, index) {
            $(this).find('.h5_component').trigger('onLoad')
        }
    });
    this.page[0].find('.h5_component').trigger('onLoad')
    this.el.show();
   
        $.fn.fullpage.moveTo(1)
  
}