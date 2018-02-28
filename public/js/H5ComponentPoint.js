// 散点图表组件对象

var H5ComponentPoint = function(name,cfg){
    //  图表组件在基本组件上进行再次开发
    var component = new H5ComponentBase(name,cfg);
        // component.text('test111111')
        // 默认将第一个数据的，来作为整个图表组件的大小和位置基准
    var base = cfg.data[0][1];
        // 输出每个point
        $.each(cfg.data,function (index,item) {
             var point  = $('<div class="point point_'+index+'"></div>')       
            //  point.text(item[0])
             var name = $('<div class="name">'+item[0]+'</div>')
             var rate = $('<div class="per">'+item[1]*100+'%</div>')
            //  确定散点大小
             var per = item[1]/base*100+'%';
             point.width(per).height(per);
             if(item[2]){
                 point.css('backgroundColor',item[2])
             }
             if(item[3]!=undefined&&item[4]!=undefined){
                //  point.css('left',item[3]).css('top',item[4])
                // 将位置参数先缓存起来
                point.data('left',item[3]).data('top',item[4]);
             }
            //  由于浮动，为避免后出现的元素会覆盖前面的元素，修改各个元素的zIndex值
                point.css('zIndex',100-index);
                point.css('left',0).css('top',0);
                // 给各个point设定动画时间
                point.css('transition','all 1s '+index*.5+'s');
            //  将每个生成的散点添加到基本组件中去
            point.append(name);
            name.append(rate);
            component.append(point);
        });
            // 绑定监听事件
        component.on('onLoad', function () {
            component.find('.point').each(function (index,item) {
                $(item).css('left',$(item).data('left')).css('top',$(item).data('top'))
            });
        })
        component.on('onLeave',function () {
            component.find('.point').each(function (index,item) {
                $(item).css('left',0).css('top',0)
            })
        })
        // 给每个散点绑定点击获得焦点事件
        component.find('.point').on('click',function () {
            component.find('.point').removeClass('point_focus');
            $(this).addClass('point_focus');
            return false
        }).eq(0).addClass('point_focus')
    return component
}