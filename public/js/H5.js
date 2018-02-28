// H5的脚本文件
// 创建H5构造函数
    var H5 = function() {
            // 定义该h5对象的唯一标识
            this.id = ('h5_'+Math.random()).replace('.','_');
            // 新建页面h5容器
            this.el = $('<div class="h5" id="'+this.id+'">').hide();
            this.page = [];
            $('body').append(this.el);
            // 新增一个页
                // name 页的名称，会加入到className中
                // text 页面内的默认文本
                // return this 为返回一个H5对象，达到连续调用，链式调用的目的
            this.addPage = function(name,text){
                // 新建一个页面元素
                var page = $('<div class="h5_page section"></div>');
                
                if(name!=undefined){
                    page.addClass('h5_page_'+name)
                }
                if(text!=undefined){
                    page.text(text)
                }
                this.el.append(page);
                this.page.push(page);
                // 添加底部组件
                if (typeof this.whenAddPage == 'function') {
                    this.whenAddPage()
                }               
                return this
            }
            this.addComponent = function(name,cfg){
                  var cfg = cfg || {};
                //   $.extend方法，为对象合并的方法
                //   它有三个参数，第一个参数为布尔值，代表是否深度复制
                            //    第二个参数为目标值，即该参数对象为最终合并项，该项的具体数值会被改变
                            //    第三个参数为合并参照项，它为提供合并数值的项
                      cfg  = $.extend({
                          type:'base'
                      },cfg)
                      var component;
                      var page = this.page.slice(-1)[0]
                      switch (cfg.type) {
                          case 'base':
                              component = new H5ComponentBase(name,cfg)  
                              break;                     
                          case 'ployline':
                              component = new H5ComponentPloyline(name,cfg)  
                              break;                     
                          case 'pie':
                              component = new H5ComponentPie(name,cfg)  
                              break;                     
                          case 'bar_v':
                              component = new H5ComponentBar_v(name, cfg) 
                              break;                     
                          case 'bar':
                              component = new H5ComponentBar(name,cfg) 
                              break;                     
                          case 'radar':
                              component = new H5ComponentRadar(name,cfg) 
                              break;                     
                          case 'ring':
                              component = new H5ComponentRing(name,cfg) 
                              break;                     
                          case 'point':
                              component = new H5ComponentPoint(name,cfg) 
                              break;                     
                          default:
                              break;
                      }
                      page.append(component)
                   return this 
            }
            // H5对象初始化呈现
            this.loader = function(firstPage){
                this.el.fullpage({
                    onLeave:function(index,nextIndex,direction){
                        $(this).find('.h5_component').trigger('onLeave')
                    },
                    afterLoad:function(anchorLink,index){
                        $(this).find('.h5_component').trigger('onLoad')
                    }
                });
                this.page[0].find('.h5_component').trigger('onLoad')
                this.el.show();
                if(firstPage){
                    $.fn.fullpage.moveTo(firstPage)
                }
            }
            this.loader = typeof H5_loading =='function'?H5_loading:this.loader
            return this
    }