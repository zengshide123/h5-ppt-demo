// 水平柱图的脚本文件

var H5ComponentBar = function (name,cfg) {
    var component = new H5ComponentBase(name,cfg);
        $.each(cfg.data,function(index,item){
            // 新建每一个数据项对应的DOM结构
            var line = $('<div class="line"></div>');
            var name = $('<div class="name"></div>');
            var rate = $('<div class="rate"></div>');
            var per = $('<div class="per"></div>');
            var width = item[1]*100+"%";
            var bgStyle = '';
            if(item[2]){
                bgStyle = 'style="background-color:'+item[2]+'"';
            }
                rate.css('width',width);
                rate.html('<div class="bg"'+bgStyle+'></div>');
                name.text(item[0]);
                per.text(width);               

            // 添加好新建的dom对象
            line.append(rate)
            rate.append(name).append(per);
            component.append(line);
        })

    return component
}