require('bootstrap');
var modalTplFn = "<div class=\"modal fade\">\n    <div class=\"modal-table\">\n        <div class=\"modal-table-cell\">\n            <div class=\"modal-dialog modal-<%= errorLevel %>\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\n                        <h4 class=\"modal-title\"><%= title %></h4>\n                    </div>\n\n                    <div class=\"modal-body\">\n                        <p><%= content %></p>\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">确定</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";

// errorLevel 至少支持 danger、info、sucess、warning
var alert = module.exports = function(content, errorLevel, title) {
    var dom = $(modalTplFn({
        title: title || '提示信息',
        content: content,
        errorLevel: errorLevel || 'info'
    }));

    dom
        .appendTo('body')
        .modal({
            backdrop: 'static'
        })
        .on('hide.bs.modal', function() {
            dom.remove();
        });
};