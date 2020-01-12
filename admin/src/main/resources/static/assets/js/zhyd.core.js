/**
 *
 * 项目核心Js类，负责项目前端模板方面的初始化等操作
 *
 * @author yadong.zhang (yadong.zhang0415(a)gmail.com)
 * @website https://www.zhyd.me
 * @version 1.0
 * @date 2018-04-25
 * @since 1.0
 */
var editor = null, simplemde = null;

var zhyd = window.zhyd || {
    combox: {
        init: function () {
            $('select[target=combox]').each(function (e) {
                var $this = $(this);
                var url = $this.data("url");
                if (!url) {
                    return false;
                }
                var method = $this.data("method") || "get";
                $.ajax({
                    url: url,
                    type: method,
                    success: function (json) {
                        if (json && json.status == 200) {
                            var optionTpl = '<option value="">请选择</option>{{#data}}<option value="{{id}}">{{name}}</option>{{#nodes}}<option value="{{id}}">  > {{name}}</option>{{/nodes}}{{/data}}';
                            var html = Mustache.render(optionTpl, json);
                            $this.html(html);
                        }
                    }
                });
            });
            $('ul[target=combox], ol[target=combox]').each(function (e) {
                var $this = $(this);
                var url = $this.data("url");
                if (!url) {
                    return false;
                }
                var method = $this.data("method") || "get";
                $.ajax({
                    url: url,
                    type: method,
                    success: function (json) {
                        if (json && json.status == 200) {
                            var liTpl = '{{#data}}<li data-value="{{id}}">{{name}}</li>{{/data}}';
                            var html = Mustache.render(liTpl, json);
                            $this.html(html);
                        }
                    }
                });
            })
        }
    },
    tagsInput: {
        init: function () {
            setTimeout(function () {
                $('select[target="tagsinput"], input[target="tagsinput"]').each(function () {
                    var $this = $(this);
                    var $bindBox = $this.data("bind-box");

                    if(!$bindBox || $bindBox.length <= 0) {
                        return ;
                    }

                    $this.tagsinput({
                        itemValue: 'id',
                        itemText: 'name',
                        maxTags: 3,
                        maxChars: 20,
                        trimValue: true,
                        focusClass: 'focus'
                    });

                    function add(){
                        var thisId = $(this).data("value");
                        var thisText = $(this).text().trim();
                        $this.tagsinput('add', {"id": thisId, "name": thisText}, {add: false});
                    }
                    $($bindBox).find("li").each(function () {
                        var $li = $(this);
                        $li.bind('click', add);
                    });
                    $(".bootstrap-tagsinput input").bind('keydown',function(event){
                        var thisVal = $(this).val();
                        if(event.key == 'Enter' || event.keyCode == '13') {
                            $.post('/tag/add', {name: thisVal, description: thisVal}, function (response) {
                                if (response.status !== 200) {
                                    $.alert.error(response.message);
                                } else {
                                    var data = response.data;
                                    $this.tagsinput('add', {"id": data.id, "name": data.name}, {addNew: true});
                                }
                            });
                        }
                    });
                    $this.on('itemAdded', function (event) {
                        var tag = event.item;
                        if (event.options && event.options.addNew) {
                            $(".bootstrap-tagsinput input").val('');
                            $('<li data-value="' + tag.id + '">' + tag.name + '</li>').bind('click', add).appendTo($($bindBox));
                        }
                    });
                })
            }, 500);
        }
    },
    initCommentNotify: function () {
        $.ajax({
            cache: false,
            type: "post",
            url: "/comment/listVerifying",
            success: function (json) {
                $.alert.ajaxSuccess(json);
                var $box = $(".msg_list > li:last-child");
                $box.prevAll().remove();
                if (!json.data) {
                    html = '<li><a><span class="image"><img src="/assets/images/loading.gif" alt="user avatar"></span> <span><span>系统管理员</span> <span class="time">3 mins ago</span></span> <span class="message">暂无消息</span></a></li>';
                    $box.before(html);
                    $(".noticeNum").text(0);
                    return;
                }
                var tpl = '{{#data}}<li><a href="/comments"><span class="image"><img src="{{#avatar}}{{avatar}}{{/avatar}}{{^avatar}}/assets/images/user.png{{/avatar}}" alt="user avatar"></span> <span><span>{{nickname}}</span> <span class="time">{{createTimeString}}</span></span> <span class="message">点击查看&审核</span></a></li>{{/data}}';
                html = Mustache.render(tpl, json);
                $box.before(html);
                $(".noticeNum").text(json.data.length);
                // $.tool.currentPath() === "/" && $.notify.info('共有' + json.data.length + '条评论待处理，<a href="/comments"><strong>立即处理</strong></a>');
            },
            error: $.alert.ajaxError
        });
    },
    initTextSlider: function () {
        $.fn.textSlider = function (settings) {
            settings = jQuery.extend({
                speed: "normal",
                line: 2,
                timer: 3000
            }, settings);
            return this.each(function () {
                $.fn.textSlider.scllor($(this), settings);
            });
        };
        $.fn.textSlider.scllor = function ($this, settings) {
            var ul = $("ul:eq(0)", $this);
            var timerID;
            var li = ul.children();
            var liHight = $(li[0]).height();
            var upHeight = 0 - settings.line * liHight;//滚动的高度；
            var scrollUp = function () {
                ul.animate({marginTop: upHeight}, settings.speed, function () {
                    for (i = 0; i < settings.line; i++) {
                        ul.find("li:first", $this).appendTo(ul);
                    }
                    ul.css({marginTop: 0});
                });
            };
            var autoPlay = function () {
                timerID = window.setInterval(scrollUp, settings.timer);
            };
            var autoStop = function () {
                window.clearInterval(timerID);
            };
            //事件绑定
            ul.hover(autoStop, autoPlay).mouseout();
        };

        if ($("#scrolldiv")) {
            $("#scrolldiv").textSlider({line: 1, speed: 300, timer: 10000});
        }
    },
    wangEditor: {
        _instance: window.wangEditor,
        defaultConfig: {
            container: "#editor",
            textareaName: "content",
            uploadUrl: "",
            uploadFileName: "file",
            uploadType: "",
            customCss: {}

        },
        init: function (options) {
            var config = $.extend(zhyd.wangEditor.defaultConfig, options);
            var E = window.wangEditor;
            editor = new E(config.container);
            // 配置编辑器 start
            // 关闭粘贴样式的过滤
            editor.customConfig.pasteFilterStyle = false;
            editor.customConfig.zIndex = 100;
            if (config.textareaName) {
                $('<textarea class="wangeditor-textarea" id="' + config.textareaName + '" name="' + config.textareaName + '" style="display: none" required="required"></textarea>').insertAfter($(config.container));
            }
            var $contentBox = $('textarea[name=' + config.textareaName + ']');
            editor.customConfig.onchange = function (html) {
                // 监控变化，同步更新到 textarea
                $contentBox.val(html);
            };
            // 注册上传文件插件
            zhyd.wangEditor.plugins.registerUpload(editor, config.uploadUrl, config.uploadFileName, config.uploadType, function (result, curEditor) {
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
                if (result.status == 200) {
                    var imgFullPath = appConfig.qiniuPath + result.data + appConfig.qiniuImgStyle;
                    curEditor.txt.append('<img src="' + imgFullPath + '" alt="" style="width: 95%;max-width: 100%;height: auto;border-radius: 6px;"/>');
                    // 解决上传完图片如果未进行其他操作，则不会触发编辑器的“change”事件，导致实际文章内容中缺少最后上传的图片文件 2018-07-13
                    $contentBox.val(editor.txt.html());
                } else {
                    $.alert.error(result.message);
                }
            });
            // 配置编辑器 end
            editor.create();
            // 注册全屏插件
            zhyd.wangEditor.plugins.registerFullscreen(config.container);

            if (config.customCss) {
                // 自定义编辑器的样式
                for (var key in config.customCss) {
                    var value = config.customCss[key];
                    editor.$textContainerElem.css(key, value);
                }
            }
        },
        plugins: {
            registerFullscreen: function () {
                var E = zhyd.wangEditor._instance;
                // 全屏插件
                E.fullscreen = {
                    init: function (editorBox) {
                        $(editorBox + " .w-e-toolbar").append('<div class="w-e-menu"><a class="_wangEditor_btn_fullscreen" href="###" onclick="window.wangEditor.fullscreen.toggleFullscreen(\'' + editorBox + '\')" data-toggle="tooltip" data-placement="bottom" title data-original-title="全屏编辑"><i class="fa fa-expand"></i></a></div>')
                    },
                    toggleFullscreen: function (editorSelector) {
                        $(editorSelector).toggleClass('fullscreen-editor');
                        var $a = $(editorSelector + ' ._wangEditor_btn_fullscreen');
                        var $i = $a.find("i:first-child");
                        if ($i.hasClass("fa-expand")) {
                            $a.attr("data-original-title", "退出全屏");
                            $i.removeClass("fa-expand").addClass("fa-compress")
                        } else {
                            $a.attr("data-original-title", "全屏编辑");
                            $i.removeClass("fa-compress").addClass("fa-expand")
                        }
                    }
                };

                // 初始化全屏插件
                var n = arguments.length;
                for (var i = 0; i < n; i++) {
                    E.fullscreen.init(arguments[i]);
                }
            },
            registerUpload: function (editor, uploadUrl, uploadFileName, uploadType, callback) {
                if (uploadUrl) {
                    // 上传图片到服务器
                    editor.customConfig.uploadImgServer = uploadUrl;
                    editor.customConfig.uploadFileName = uploadFileName;
                    // 将图片大小限制为 50M
                    editor.customConfig.uploadImgMaxSize = 50 * 1024 * 1024;
                    // 超时时间
                    editor.customConfig.uploadImgTimeout = 10000;
                    // 自定义上传参数
                    editor.customConfig.uploadImgParams = {
                        // 如果版本 <=v3.1.0 ，属性值会自动进行 encode ，此处无需 encode
                        // 如果版本 >=v3.1.1 ，属性值不会自动 encode ，如有需要自己手动 encode
                        uploadType: uploadType
                    };
                    editor.customConfig.customAlert = function (msg) {
                        $.alert.error(msg);
                    };
                    editor.customConfig.uploadImgHooks = {
                        error: function (xhr, editor) {
                            $.alert.error("图片上传出错");
                        },
                        timeout: function (xhr, editor) {
                            $.alert.error("请求超时");
                        },
                        customInsert: function (insertImg, result, editor) {
                            if (callback) {
                                callback(result, editor);
                            } else {
                                console.log('upload callback：' + insertImg, result, editor);
                            }
                        }
                    };
                }
            }
        }
    },
    simpleMDE: {
        defaultConfig: {
            id: "mdEditor",
            uploadUrl: "",
            uploadType: "",
            uniqueId: "mdEditor_1"
        },
        init: function (options) {
            var $op = $.extend(zhyd.wangEditor.defaultConfig, options);
            zhyd.simpleMDE.plugins.registerAutosave();
            // Powered by https://github.com/sparksuite/simplemde-markdown-editor
            simplemde = new SimpleMDE({
                // textarea的DOM对象
                element: document.getElementById($op.id),
                // 自动下载FontAwesome，设为false为不下载(如果设为false则必须手动引入)
                autoDownloadFontAwesome: false,
                // 自动聚焦输入框
                autofocus: true,
                // 是否自动保存正在编写的文本
                autosave: {
                    // 启用自动保存功能
                    enabled: true,
                    // 自动保存的间隔，以毫秒为单位。默认为15000（15s）
                    delay: 15000,
                    // 唯一的字符串标识符(保证每个SimpleMDE编辑器的uniqueId唯一)
                    uniqueId: $op.uniqueId,
                    msg: "自动保存成功了"
                },
                placeholder: "请输入文本内容",
                // 如果设置为true，则会出现JS警报窗口，询问链接或图像URL(插入图片或链接弹窗)。默认为false
                promptURLs: true,
                renderingConfig: {
                    // 如果设置为true，将使用highlight.js高亮显示。默认为false
                    codeSyntaxHighlighting: true
                },
                showIcons: ["code", "table", "clean-block", "horizontal-rule"],
                tabSize: 4,
                // 编辑器底部的状态栏
                status: true,
                status: ["autosave", "lines", "words", "cursor"], // Optional usage
                status: ["autosave", "lines", "words", "cursor", {
                    className: "keystrokes",
                    defaultValue: function (el) {
                        this.keystrokes = 0;
                        el.innerHTML = "0 Keystrokes";
                    },
                    onUpdate: function (el) {
                        el.innerHTML = ++this.keystrokes + " Keystrokes";
                    }
                }]

            });

            zhyd.simpleMDE.plugins.registerFullscreen();
            zhyd.simpleMDE.plugins.registerUpload($op.uploadUrl, simplemde);

            $(".editor-preview-side").addClass("markdown-body");
        },
        plugins: {
            registerAutosave: function () {
                // js实现aop切面编程，实时保存文章内容
                Function.prototype.after = function (afterfn) {
                    var __self = this;
                    //保存原函数的引用
                    return function () {
                        //返回包含了原函数和新函数的"代理"函数
                        afterfn.apply(this, arguments);//(1)
                        //执行新函数,且保证this不被劫持,新函数接受的参数
                        //也会被原封不动地传入原函数,新函数在原函数之前执行
                        return __self.apply(this, arguments);//(2)
                        //执行原函数并返回原函数的执行结果
                        //并且保证this不被劫持
                    }
                };
                var showMsg = function () {
                    var $div = $('<div></div>');
                    $div.css({
                        'position': 'absolute',
                        'right': '10px',
                        'top': 0,
                        'padding': '5px',
                        'font-size': '12px',
                        'color': '#ccc',
                        'opacity': 0
                    });
                    $div.html("自动保存完成");
                    $div.appendTo($(".CodeMirror"));
                    $div.animate({opacity: 1}, 1000, function () {
                        $div.animate({opacity: 0}, 1000, function () {
                            $(this).remove();
                        })
                    })
                };
                SimpleMDE.prototype.autosave = SimpleMDE.prototype.autosave.after(showMsg);
            },
            registerFullscreen: function () {
                var $fullscreen = $(".editor-toolbar a.fa-arrows-alt, .editor-toolbar a.fa-columns");
                $fullscreen.click(function () {
                    var $this = $(this);
                    if ($fullscreen.hasClass("active")) {
                        $(".CodeMirror, .CodeMirror-scroll").css('max-height', 'none');
                    } else {
                        $(".CodeMirror, .CodeMirror-scroll").css('max-height', '200px');
                    }
                });
            },
            registerUpload: function (uploadUrl, simplemde) {
                if (uploadUrl) {
                    inlineAttachment.editors.codemirror4.attach(simplemde.codemirror, {
                        uploadUrl: uploadUrl
                    });
                }
            }
        }
    }
};

$(document).ready(function () {
    zhyd.initCommentNotify();
    zhyd.initTextSlider();

    $("img.lazy-img").lazyload({
        placeholder: appConfig.staticPath + "/img/loading.gif",
        effect: "fadeIn",
        threshold: 100
    });
    $(window).bind("load", function () {
        var timeout = setTimeout(function () {
            $("img.lazy-img").trigger("sporty");
        }, 3000);
    });

    /**
     * 图片预览
     * 必须指定预览图片的容器，格式：data-preview-container = "#containerID"
     */
    $(".uploadPreview").each(function () {
        var $this = $(this);
        $this.uploadPreview({imgContainer: $this.data("preview-container")});
    });

    $("#updPassBtn").click(function () {
        var $form = $("#updPassForm");
        if (validator.checkAll($form)) {
            $form.ajaxSubmit({
                type: "POST",
                url: '/passport/updatePwd',
                success: function (json) {
                    $.alert.ajaxSuccess(json);
                    if (json.status == 200) {
                        setTimeout(function () {
                            window.location.reload();
                        }, 2000);
                    }

                },
                error: $.alert.ajaxError
            });
        }
    });
    zhyd.combox.init();
    zhyd.tagsInput.init();

    /**
     * 针对shiro框架中， ajax请求时session过期后的页面跳转
     */
    $.ajaxSetup({
        complete: function (XMLHttpRequest, textStatus) {
            if (textStatus === "parsererror") {
                $.alert.error("会话已失效！请重新登录！", function () {
                    window.location.reload();
                });
            } else if (textStatus === "error") {
                $.alert.error("请求超时,请稍后再试！");
            }
        }
    });

    var notice = [
        '<strong>Hi Body!</strong> 前台首页的 “轮播”只会显示“推荐文章”哦',
        '要想百度搜索引擎快速收录文章，可以试试“推送”功能哦',
        '批量推送文章到百度可以一次提交多篇文章哦',
        '碰到页面显示和数据库内容不一致的情况，可以先考虑清下redis缓存哦',
        '不可以随便用“文章搬运工”去爬取别人未授权的文章哈',
        '使用过程中如果有不能解决的问题，请去提issue哈，在群里消息太多，有时候会看不到消息记录',
    ];
    var $noticeBox = $("#notice-box");
    var tpl = '{{#data}}<li class="scrolltext-title">'
        + '<a href="javascript:void(0)" rel="bookmark">{{&.}}</a>'
        + '</li>{{/data}}';
    var html = Mustache.render(tpl, {"data": $.tool.shuffle(notice)});
    $noticeBox.html(html);
});