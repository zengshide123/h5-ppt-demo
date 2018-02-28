// 基本图文组件脚本
 var H5ComponentBase = function(name,cfg){
    //  设定默认参数
    var cfg = cfg || {};
    var id = ('h5_c_'+Math.random()).replace('.','_');
    // 把当前的组件类型添加到样式中进行标记
    var cls = ' h5_component_name_' + name + ' h5_component_' + cfg.type;
    // 新建一个DOM元素
    var component  = $('<div class="h5_component'+cls+' " id="'+id+'"></div>');

    cfg.text && component.text(cfg.text);
    cfg.width && component.width(cfg.width/2);
    cfg.height && component.height(cfg.height/2);
    cfg.css && component.css(cfg.css);
    cfg.bg && component.css('backgroundImage','url('+cfg.bg+')');
    if(cfg.center===true){
        component.css({
            marginLeft:(cfg.width/4*-1),
            left:'50%'
        })
    }
    // 设定点击事件
    if(typeof cfg.onclick == 'function'){
        component.on('click',cfg.onclick)
    }
    // 给元素设定自定义监听事件
    component.on('onLoad',function(){
        setTimeout(() => {
            component.removeClass(cls + '_leave').addClass(cls + '_load');
            cfg.animateIn && component.animate(cfg.animateIn);
        }, cfg.delay||0);
        return false
    })
    component.on('onLeave',function(){
        setTimeout(() => {
            component.removeClass(cls + '_load').addClass(cls + '_leave');
            cfg.animateOut && component.animate(cfg.animateOut);
        }, cfg.delay||0);
        return false
    })
    // 将新建的DOM对象暴露出去
    return component
 }