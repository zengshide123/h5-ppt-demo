// 折线图组件脚本文件
var H5ComponentPloyline = function (name,cfg){
    var component = new H5ComponentBase(name,cfg);
    // 绘制背景网格线
    var w = cfg.width;
    var h = cfg.height;
    // 新建一个画布,用于生成网格线背景
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    // 设置画布的宽高
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    // 水平网格线
    var step = 10;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#aaa';
    window.ctx = ctx;
    for(var i = 0;i<step+1;i++){
        var y = (h/step)*i;
            ctx.moveTo(0,y);
            ctx.lineTo(w,y);
    }
    // 绘制垂直网格线
      step = cfg.data.length+1;
    var text_w = w/step >> 0;
    for(var i =0;i<step+1;i++){
        var x = (w/step)*i;
            ctx.moveTo(x,0);
            ctx.lineTo(x,h);
            if(i>step-2){
                continue;
            }
        var text = $('<div class="text"></div>');
            text.text(cfg.data[i][0]);
        text.css('width', text_w/2).css('left',(x/2-text_w/4)+text_w/2);
        // 测试文本动画效果
        text.css('transition', 'all 1s '+(1.5+i*.3)+'s');
        component.append(text);
    }
        ctx.stroke();
    // 将新建的canvas元素加载到html结构中去
    component.append(cns);
    // 加入画布，数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    // 封装绘制图表图线的函数
    var draw = function(per){
        // 每次重构画布前，先清空画布
        ctx.clearRect(0,0,w,h);
        //  绘制折线数据
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#ff8878";
        var x = 0;
        var y = 0;
        var row_w = (w / (cfg.data.length + 1));
        for (i in cfg.data) {
            var item = cfg.data[i];
            x = row_w * (~~i + 1);
            y = h-(item[1]*h*per);
            ctx.moveTo(x, y);
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
        }
        // 连线
        ctx.moveTo(row_w,h-(cfg.data[0][1]*h*per));
        for (i in cfg.data) {
            var item = cfg.data[i];
            x = row_w * (~~i + 1);
            y = h - (item[1] * h * per);
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255,136,120,0)';
        // 绘制阴影
        ctx.lineTo(x, h);
        ctx.lineTo(row_w, h);
        ctx.fillStyle = 'rgba(255,136,120,0.2)';
        ctx.fill();
        // 写数据
        for (i in cfg.data) {
            var item = cfg.data[i];
            x = row_w * (~~i + 1);
            y = h - (item[1] * h * per);
            ctx.fillStyle = item[2] ? item[2] : '#595959';
            ctx.fillText((item[1] * 100 >> 0) + '%', x - 10, y - 10)
        }

        ctx.stroke();
        // 将这个画布插入到html的结构中去
        component.append(cns);
    }
    // draw(.3);
    // 绑定折线图组件的事件监听函数
    component.on('onLoad',function(){
        // 实现折线图的生长动画
       var s = 0;
        for(var i=0;i<100;i++){
            setTimeout(function(){
                s +=.01;
                draw(s);
            },i*10+500);
        }
    })
    component.on('onLeave',function(){
        // 实现折线图的退场动画
        var s = 1;
         for(var i=0;i<100;i++){
             setTimeout(function(){
                 s -=.01;
                 draw(s)
             },i*10);
         }
    })
    return component
}