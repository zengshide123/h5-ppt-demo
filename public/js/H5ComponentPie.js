// 饼图组件的脚本

var H5ComponentPie = function(name,cfg){
    var component  = H5ComponentBase(name,cfg);
        // 加入一个画布
        var cns = document.createElement('canvas');
        var ctx = cns.getContext('2d');
        var w = cfg.width;
        var h = cfg.height;
        var r = w/2;
        cns.width = ctx.width = w;
        cns.height = ctx.height = h;
        $(cns).css('zIndex', 1);
        component.append(cns);
    // 加入一个底图层
        ctx.beginPath();
        ctx.fillStyle = '#eee';
        ctx.strokeStyle = '#eee';
        ctx.lineWidth = 1;
        ctx.arc(r,r,r,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();
    // 绘制一个数据层
        var cns = document.createElement('canvas');
        var ctx = cns.getContext('2d');
        cns.width = ctx.width = w;
        cns.height = ctx.height = h;
        $(cns).css('zIndex', 2);
        component.append(cns);
        // 设置一些默认的颜色数据
    var colors = ['red', 'green', 'blue', 'orange', '#BBFFFF',"#6495ED"];
        // 设置弧线的起始角度
        var sAngel = 1.5*Math.PI;
        // 设置弧线的结束角度
        var eAngel = 0;
        // 缓存圆100%结束角度
        var aAngel = Math.PI*2;
        // 画点/ */
        var step = cfg.data.length;
        for(var i =0;i<step;i++){
            var item = cfg.data[i];
            var color = item[2]||(item[2]=colors.pop());
            // 预设画笔颜色
            eAngel = sAngel + aAngel*item[1];
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.lineWidth = .1;
            // 设置画笔路径
            ctx.moveTo(r,r);
            ctx.arc(r,r,r,sAngel,eAngel);
            ctx.fill();
            ctx.stroke();
            sAngel = eAngel;
            // 加入所有的项目文本以及百分比
            var text = $('<div class="text"></div>');
                text.text(item[0]);
            var per = $('<div class="per"></div>');
                per.text(item[1]*100+'%');
                // 计算文本加入的位置
            var x = r +Math.sin(.5*Math.PI-sAngel)*r;
            var y = r + Math.cos(.5*Math.PI-sAngel)*r;
                if(x>r){
                    text.css('left',x/2)
                }else{
                    text.css('right',(w-x)/2)
                }
                if(y>r){
                    text.css('top',y/2);
                }else{
                    text.css('bottom',(h-y)/2);
                }
                text.css('color',color).css('opacity',0);
                text.append(per);
                component.append(text);
        }
        // 加入一个蒙板层
        var cns = document.createElement('canvas');
        var ctx = cns.getContext('2d');
            cns.width = ctx.width = w;
            cns.height = ctx.height = h;
            $(cns).css('zIndex',3);
            component.append(cns);
        ctx.fillStyle = '#eee';
        ctx.strokeStyle = '#eee';
        ctx.lineWidth = 1;


    // 封装绘制画布的动画函数
    var draw = function(per){
        if(per>=1){
            component.find('.text').css('opacity',1);
        }else{
            component.find('.text').css('opacity',0);
        }
        // 每次动画重构前，先清空对应的画布
        ctx.clearRect(0,0,w,h);
        ctx.beginPath();
        ctx.moveTo(r,r);
        if(per<=0){
            ctx.arc(r, r, r,0, 2 * Math.PI);
        }else{
            ctx.arc(r, r, r, sAngel, 2 * Math.PI * per + sAngel,true);
        }     
        ctx.fill();
        ctx.stroke();
        if(per>=1){
            ctx.clearRect(0,0,w,h)
        }
    }
    draw(0)
    // 绑定事件监听
    component.on('onLoad',function(){
        var s = 0;
        for(var i=0;i<100;i++){
            setTimeout(() => {
                s +=.01;
                draw(s);
            }, 10*i+500);        
        }
    })
    component.on('onLeave',function(){
        var s=1;
        for(var i=0;i<100;i++){
            setTimeout(() => {
                s -=.01;
                draw(s)
            }, i*10);
        }
    })
    // 返回新建的饼图对象
    return component;
}