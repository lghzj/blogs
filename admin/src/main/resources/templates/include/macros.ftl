<#-- 公共顶部 -->
<#macro header>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${config.siteName}后台管理系统</title>
    <link href="/assets/images/favicon.ico" rel="shortcut icon" type="image/x-icon">
    <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/jquery-confirm/2.5.1/jquery-confirm.min.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/fancybox/2.1.5/jquery.fancybox.min.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/toastr.js/2.0.3/css/toastr.min.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/iCheck/1.0.2/skins/square/green.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/bootstrap-table/1.11.1/bootstrap-table.min.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/bootstrap-daterangepicker/2.1.24/daterangepicker.min.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/zTree.v3/3.5.29/css/metroStyle/metroStyle.min.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/switchery/0.8.2/switchery.min.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput-typeahead.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput.css" rel="stylesheet">
<#--
    <link href="https://cdn.bootcss.com/pnotify/3.2.1/pnotify.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/pnotify/3.2.1/pnotify.buttons.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/pnotify/3.2.1/pnotify.nonblock.css" rel="stylesheet">-->

    <link href="/assets/css/zhyd.core.css" rel="stylesheet">
    <#nested>
</head>
<body class="nav-md">
<div class="container body">
    <div class="main_container">
        <div class="col-md-3 left_col">
            <div class="left_col scroll-view">
                <div class="navbar nav_title" style="border: 0;">
                    <a href="/" class="site_title"><i class="fa fa-coffee"></i> <span>${config.siteName}</span></a>
                </div>
                <div class="clearfix"></div>
                <@shiro.user>
                <div class="profile clearfix">
                    <div class="profile_pic">
                        <img src="/assets/images/user.png" alt="..." class="img-circle profile_img">
                    </div>
                    <div class="profile_info">
                        <span id="hello_msg">&nbsp;</span>
                        <h2>尊敬的管理员</h2>
                    </div>
                </div>
                </@shiro.user>
                <br />
            <#include "/layout/sidebar.ftl"/>
            </div>
        </div>
    <#include "/layout/setting.ftl"/>
        <div class="right_col" role="main">
</#macro>

<#-- 公共底部 -->
<#macro footer>
    <#include "/layout/footer.ftl"/>

    <#nested>

    </body>
</html>
</#macro>

<#-- 面包屑导航内容 + 系统通知 -->
<#macro breadcrumb>
    <div class="row">
        <div class="col col-md-9">
            <nav class="breadcrumb">
                <div class="notify"><i class="fa fa-bullhorn fa-fw"></i></div>
                <div id="scrolldiv">
                    <div class="scrolltext">
                        <ul class="list-unstyled" id="notice-box">
                            <li class="scrolltext-title">
                                <a href="javascript:void(0)" rel="bookmark">其实我们可以将所有的问题归结为两种：一种是没饭吃饿出来的；一种是吃饱了撑出来的。</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        <div class="col col-md-3 text-right">
            <#nested>
        </div>
    </div>
</#macro>

<#macro publishmodal>
    <div class="modal fade" id="publishModal" tabindex="-1" role="dialog" aria-labelledby="publishLabel" data-backdrop="static">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="" role="tabpanel" data-example-id="togglable-tabs">
                        <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                            <li role="presentation" class="active">
                                <a href="#article" id="article-tab" role="tab" data-toggle="tab" aria-expanded="true">文章属性</a>
                            </li>
                            <li role="presentation" class="">
                                <a href="#seo" role="tab" id="seo-tab" data-toggle="tab" aria-expanded="false">SEO</a>
                            </li>
                        </ul>
                        <div id="" class="tab-content">
                            <div role="tabpanel" class="tab-pane fade active in" id="article" aria-labelledby="article-tab">
                                <div class="row">
                                    <div class="col col-md-3">
                                        <div class="item form-group">
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                                <div class="choose-local-img" style="text-align: center;">
                                                    <input id="cover-img-file" type="file" name="file" style="display: none">
                                                    <input id="cover-img-input" type="hidden" name="coverImage">
                                                    <div class="preview fa-2x" style="width: 100%;height: 186.98px;background: #f8fafc;border-radius: 5px;text-align: center;">
                                                        <img class="coverImage" src="" alt="">
                                                    </div>

                                                    <button type="button" class="btn btn-round btn-info" id="file-upload-btn" style="margin-top: 10px;">上传封面图片</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col col-md-9">
                                        <div class="item form-group">
                                            <label class="control-label col-md-2 col-sm-2 col-xs-12" for="nickname">分类 <span class="required">*</span></label>
                                            <div class="col-md-8 col-sm-8 col-xs-12">
                                                <div class="input-group">
                                                    <select class="form-control" name="typeId" id="typeId"  target="combox" data-url="/type/listAll" data-method="post" required="required"></select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item form-group">
                                            <label class="control-label col-md-2 col-sm-2 col-xs-12" for="mobile">标签(*3) <span class="required">*</span></label>
                                            <div class="col-md-9 col-sm-9 col-xs-12">
                                                <input type="text" name="tags" target="tagsinput" data-bind-box="#tags-list">
                                                <ul class="list-unstyled list-inline tags-list" id="tags-list" target="combox" data-url="/tag/listAll" data-method="post" style="max-height: 150px;overflow-y: scroll;"></ul>
                                            </div>
                                        </div>
                                        <div class="item form-group">
                                            <label class="control-label col-md-2 col-sm-2 col-xs-12" for="mobile">状态 <span class="required">*</span></label>
                                            <div class="col-md-10 col-sm-10 col-xs-12 fixed-radio-checkbox">
                                                <ul class="list-unstyled list-inline">
                                                    <li><input type="radio" class="square" checked name="status" value="1"> 发布</li>
                                                    <li><input type="radio" class="square" name="status" value="0"> 草稿</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="item form-group">
                                            <label class="control-label col-md-2 col-sm-2 col-xs-12" for="comment">开启评论 </label>
                                            <div class="col-md-10 col-sm-10 col-xs-12 fixed-radio-checkbox">
                                                <input type="checkbox" class="square" name="comment" id="comment">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane fade" id="seo" aria-labelledby="seo-tab">
                                <div class="item form-group">
                                    <label class="control-label col-md-2 col-sm-2 col-xs-12" for="password">摘要 <span class="required">*</span></label>
                                    <div class="col-md-8 col-sm-8 col-xs-12">
                                        <textarea class="form-control col-md-7 col-xs-12" id="description" name="description" required="required"></textarea>
                                    </div>
                                </div>
                                <div class="item form-group">
                                    <label class="control-label col-md-2 col-sm-2 col-xs-12" for="password">关键词 <span class="required">*</span></label>
                                    <div class="col-md-8 col-sm-8 col-xs-12">
                                        <textarea class="form-control col-md-7 col-xs-12" id="keywords" name="keywords" required="required"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-angle-left"> 返回修改</i></button>
                    <button type="button" class="btn btn-success publishBtn"><i class="fa fa-paper-plane-o"> 确定发布</i></button>
                </div>
            </div>
        </div>
    </div>
</#macro>

<#macro chooseImgModal>
    <div class="modal fade" id="chooseImg" tabindex="-1" role="dialog" aria-labelledby="addroleLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="addroleLabel">选择图片</h4>
                </div>
                <div class="modal-body">
                    <div class="" role="tabpanel" data-example-id="togglable-tabs">
                        <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                            <li role="presentation" class="active">
                                <a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">素材库</a>
                            </li>
                            <li role="presentation" class="">
                                <a href="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false">本地图片</a>
                            </li>
                        </ul>
                        <div id="myTabContent" class="tab-content">
                            <div role="tabpanel" class="tab-pane fade active in material-box" id="tab_content1" aria-labelledby="home-tab">
                                <ul class="list-unstyled list-material">
                                </ul>
                            </div>
                            <div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="profile-tab">
                                <button type="button" class="btn btn-round btn-info" id="file-btn">选择图片</button>
                                <div class="preview" class="fa-2x">
                                    <img class="coverImage" src="" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-close"> 关闭</i></button>
                    <button type="button" class="btn btn-success" data-dismiss="modal"><i class="fa fa-hand-o-up"> 确定</i></button>
                </div>
            </div>
        </div>
    </div>
</#macro>