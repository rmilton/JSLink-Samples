(function () {
    var overrideCtx = {};
    overrideCtx.Templates = {};

    //Tempate overrides
    overrideCtx.Templates.Header = function (ctx) {

        var html = '<div class="linksBox-wrapper">';
        html += '<div class="linksBox-header linksBox-yellow">';
        html += ctx.ListTitle;
        html += '<a href="' + ctx.listUrlDir + '">view all</a>';
        html += '</div>';
        html += '<div class="linksBox-items">';

        return html;

    }

    overrideCtx.Templates.Item = function (ctx) {

        return '<a class="linksBox-item" href="' + ctx.CurrentItem.URL + '">' + ctx.CurrentItem["URL.desc"] + '</a>';

    }


    overrideCtx.Templates.Footer = function (ctx) {

        return '</div></div>';

    }


    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();