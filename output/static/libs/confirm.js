require('bootstrap');
var modalTplFn = "<div class=\"modal fade\">\n    <div class=\"modal-table\">\n        <div class=\"modal-table-cell\">\n            <div class=\"modal-dialog modal-danger\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\n                        <h4 class=\"modal-title\"><%= title %></h4>\n                    </div>\n                    <div class=\"modal-body\">\n                        <p><%= content %></p>\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-danger btn-confirm\"><%= confirmTxt %></button>\n                        <button type=\"button\" class=\"btn btn-success btn-cancel\" data-dismiss=\"modal\"><%= cancelTxt %></button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
var noop = function() {};
var defaultOptions = {
    title: '',
    confirmed: noop,
    canceled: noop,
    confirmTxt: '确认',
    cancelTxt: '取消'
}

var confirm = module.exports = function(content, opt) {
    if (typeof opt === 'function') {
        opt = {
            confirmed: opt
        };
    }

    opt = $.extend({}, defaultOptions, opt);

    var dom = $(modalTplFn({
        content: content,
        title: opt.title || '提示信息',
        confirmTxt: opt.confirmTxt,
        cancelTxt: opt.cancelTxt
    }));

    dom
        .appendTo('body')
        .on('click', '.btn-confirm', function() {
            opt.confirmed.apply(this, arguments);
            dom.modal('hide');
        })
        .on('click', '.btn-cancel', opt.canceled)
        .modal({
            backdrop: 'static'
        })
        .on('hide.bs.modal', function() {
            dom.remove();
        });
};