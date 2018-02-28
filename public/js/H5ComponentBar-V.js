// 水平柱图的脚本文件

var H5ComponentBar_v = function (name,cfg) {
        // 对水平柱状图进行实例，添加垂直柱状图的属性和样式
    var component = new H5ComponentBar(name,cfg);
        // 对每个柱状图的宽度进行计算
    var width = parseInt((100/cfg.data.length));
        // 给每个数据项的设置宽度
        component.find('.line').width(width+'%');
        // 迭代整个数据项，并设置相应的高度
        $.each(component.find('.rate'),function(){
            var w = $(this).css('width');
        // 重设进度区的高度，并把原来的宽度清空
            $(this).height(w).width('');
        })
    return component
}