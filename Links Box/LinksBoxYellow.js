(function () {
    var overrideCtx = {};
    overrideCtx.Templates = {};

    // Header override
    overrideCtx.Templates.Header = function (ctx) {

        var html = '<div class="linksBox-wrapper">';
        html += '<div class="linksBox-header linksBox-yellow">';
        html += ctx.ListTitle;
        html += '<a href="' + ctx.listUrlDir + '">view all</a>';
        html += '</div>';
        html += '<div class="linksBox-items">';

        return html;

    }

	// Item override
    overrideCtx.Templates.Item = function (ctx) {

        return '<a class="linksBox-item" href="' + ctx.CurrentItem.URL + '">' + ctx.CurrentItem["URL.desc"] + '</a>';

    }

	// Footer override
    overrideCtx.Templates.Footer = function (ctx) {

        return '</div></div>';

    }

	// Register template override
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();