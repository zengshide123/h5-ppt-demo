// 雷达图组件的脚本
var H5ComponentRadar = function(name,cfg){
    var component  = H5ComponentBase(name,cfg);
        // 新建一个画布
        // 绘制网格线（背景图）、
        var w  = cfg.width;
        var h =  cfg.height;
        var cns = document.createElement('canvas');
        var ctx = cns.getContext('2d');
        cns.width = ctx.width = w;
        cns.height = ctx.height = h;
        // 将新建的画布元素添加到html中去
        component.append(cns);
        // 绘制参照圆
        var r = w/2;
        var step = cfg.data.length;
        // 计算在圆周上，多边形的顶点坐标
        // 绘制网格背景
          var isBlue = false;
        for(var s=10;s>0;s--){
          ctx.beginPath();
          for(var i=0;i<step;i++){
              var rad = (2*Math.PI/360)*(360/step)*i;
              var x = r+Math.sin(rad)*r*(s/10);
              var y = r+Math.cos(rad)*r*(s/10);
              ctx.lineTo(x,y);
          } 
          ctx.closePath();
          ctx.fillStyle = (isBlue=!isBlue)?'#99c0ff':'#f1f9ff';
          ctx.fill(); 
        }
        // 绘制伞骨图
        for(var i=0;i<step;i++){
            var rad = (2*Math.PI/360)*(360/step)*i;
            var x = r +Math.sin(rad)*r;
            var y = r +Math.cos(rad)*r;
                ctx.moveTo(r,r);
                ctx.lineTo(x,y);
            var text = $('<div class="text"></div>');
                text.text(cfg.data[i][0]);
                if(x>w/2){
                    text.css('left', x / 2+5);
                }else{
                    text.css('right', (w-x) / 2);
                }
                if(y>h/2){
                    text.css('top',y/2+5)
                }else{
                    text.css('bottom',(h-y)/2)
                }
                if(cfg.data[i][2]){
                    text.css('color',cfg.data[i][2])
                }
                    text.css('opacity',0).css('transition','all .5s '+(i*.3)+'s');
                text.appendTo(component);
        }
        ctx.strokeStyle = '#e0e0e0';
        ctx.stroke();
        // 数据层的开发
        // 新建一个画布
        var cns = document.createElement('canvas');
        var ctx = cns.getContext('2d');
            cns.width = ctx.width = w;
            cns.height = ctx.height = h;
        // 将新建的画布元素添加到html结构中
        component.append(cns);       
    // 封装生长动画函数
        ctx.strokeStyle = '#f00';
 var draw  = function(per){ 
            // 当画布的动画完成了的时候，将text元素显示出来
            if(per>=1){
                component.find('.text').css('opacity',1)
            }else{
                component.find('.text').css('opacity',0)
            }
            // 在每次重构画布之前，清空前面的画布
            ctx.clearRect(0,0,w,h);
            // 输出数据折线
            for(var i=0;i<step;i++){
                var rad = (2*Math.PI/360)*(360/step)*i;
                var rate = cfg.data[i][1]*per;
                var x = r + Math.sin(rad)*r*rate;
                var y = r + Math.cos(rad)*r*rate;
                ctx.lineTo(x,y);
            }
            ctx.closePath();
            ctx.stroke();
            // 绘制点
            for(var i = 0;i<step;i++){
                ctx.beginPath();
                var rad = (2 * Math.PI / 360) * (360 / step) * i;
                var rate = cfg.data[i][1]*per;
                var x = r + Math.sin(rad) * r * rate;
                var y = r + Math.cos(rad) * r * rate;
                ctx.arc(x,y,5,0,2*Math.PI);
                ctx.fillStyle = '#ff7676';
                ctx.fill();
                ctx.closePath();
                ctx.stroke();
            }
       }   
    // 绑定事件监听
    component.on('onLoad',function(){
        var s = 0;
        for(var i =0;i<100;i++){
            setTimeout(() => {
                s +=.01;
                draw(s);    
            }, i*10+500);
        }
    })  
    component.on('onLeave',function(){
        var s = 1;
        for(var i =0;i<100;i++){
            setTimeout(() => {
                s -=.01;
                draw(s);
            }, i*10);
        }
    })     


    return component;
}