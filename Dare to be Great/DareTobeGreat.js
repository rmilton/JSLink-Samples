if (typeof (WMPJSLink) == 'undefined') {
    var WMPJSLink = {};
}
WMPJSLink.DareToBeGreat = function () {

    return {
        CopyDetailsToLargeView: function (id) {
            var $nameTarget = $(".dtbg_largeview .name");
            var $roleTarget = $(".dtbg_largeview .role");
            var $locTarget = $(".dtbg_largeview .location");
            var $contentTarget = $(".dtbg_largeview .content");
            var $imgTarget = $(".dtbg_largeview_image img");

            var $sourceElement = $(".dtbg_item[data-id='" + id + "']");
            var $nameSource = $sourceElement.find('.name');
            var $roleSource = $sourceElement.find('.role');
            var $locSource = $sourceElement.find('.position');
            var $contentSource = $sourceElement.find('.longdescription');
            var $imgSource = $sourceElement.find('.image');
            $nameTarget.text($nameSource.text());
            $roleTarget.text($roleSource.text());
            $locTarget.text($locSource.text());
            $contentTarget.text($contentSource.text());
            $imgTarget.attr('src', $imgSource.attr('src'));

            $('.dtbg_item').click(function () {
                $('#s4-workspace').animate({ scrollTop: 1400 }, { duration: 200 });
            });
        }

    };

}();


//CSR-override for MDS disabled site (because we need to call the entry point function in this case whereas it is not needed for anonymous functions)
submissionsTest();

function submissionsTest() {

    var i = 0;
    var rangeKeeper = new Array();

    evenPagingControl = function (ctx) {
        var footerHtml = '<div class="dtbgpaging-next"></div><table class="ms-bottompaging"><tr><td>';
        var prev = ctx.ListData.PrevHref;
        var next = ctx.ListData.NextHref;
        if (prev) {
            footerHtml += "<a class='ms-commandLink ms-promlink-button ms-promlink-button-enabled' href='javascript:void(0);' onclick=\"RefreshPageTo(event, &quot;" + prev + "&quot;);return false;\"><span class='ms-promlink-button-image'>" + '<img src="/_layouts/15/images/spcommon.png?rev=23" border="0" class="ms-promlink-button-left" alt="Prev"></span></a>';
        }
        if (next) {
            footerHtml += "<a class='ms-commandLink ms-promlink-button ms-promlink-button-enabled' href='javascript:void(0);' onclick=\"RefreshPageTo(event, &quot;" + next + "&quot;);return false;\"><span class='ms-promlink-button-image'>" + '<img src="/_layouts/15/images/spcommon.png?rev=23" border="0" class="ms-promlink-button-right" alt="Next"></span></a>';
        }
        footerHtml += "</td></tr></table></div>";
        return footerHtml;
    }

    var dtbgContext = {};
    dtbgContext.Templates = {};
    dtbgContext.Templates.Header = function (ctx) {
        i = 0;
        var hdrHtml = "<div class='dtbg_header' id='anchor'>";
        hdrHtml += "<span class='dtbg_dare'>Dare</span> <span class='dtbg_tbg'>To Be Great</span>";
        hdrHtml += "<a style='text-decoration:none;' href=\"javascript:openDG('Date To Be Great Nomination Form','/Lists/DareToBeGreat/NewForm.aspx')\">";
        hdrHtml += "<div class='dtbg_nominate_container' style='float:right;'>";
        hdrHtml += "<div class='dtbg_nominate'>+ Nominate</div></a>";
        hdrHtml += "</div></div>";
        hdrHtml += "<div class='dtbg_largeview row'>"
        hdrHtml += "<div class='col-md-5 dtbg_largeview_image'><img src=''/></div>";
        hdrHtml += "<div class='col-md-6 dtbg_largeview_content'>";
        hdrHtml += "<h1 class='name'>Name</h1>";
        hdrHtml += "<h2 class='role'>Role</h2>";
        hdrHtml += "<h3 class='location'>Location</h3>";
        hdrHtml += "<p class='content leading'>Content</p>";
        hdrHtml += "</div>";
        hdrHtml += "</div>";
        hdrHtml += "<div class='dtbg' align='center'>" + RenderTableHeader(ctx);// + "</table>";

        return hdrHtml;

    }  // end SubmissioinsTest

    var evenFooter = evenPagingControl;
    
    dtbgContext.Templates.Footer = evenFooter;

    dtbgContext.Templates.Item = function dtbgTemplate(ctx) {

        i++;
        var resultStr = "";
        var numberOfItems = ctx.ListData.LastRow;
        var range = Math.floor(Math.random() * 66) + 35; //limit description number of characters between 15 to 100.	

        rangeKeeper[0] = 100;
        var rng;

        rangeKeeper[i] = range;
        //console.log(rangeKeeper[i]+' - '+i);		

        if (i <= 6) {
            resultStr += "<td style='vertical-align:top;'>";

        }

        if (i > 6) {

            resultStr += "<td class='tditem" + i + "' style='display:block; float:left; position:relative;'>";

         }


        resultStr += "<div class='dtbg_item item" + i + "' data-id='" + ctx.CurrentItem.ID + '-' + i + "'>";
        var imgUrl = ctx.CurrentItem["ImageURL"];
        resultStr += "<img src='" + imgUrl + "' class='dtbg_img image'/>";
        var name = ctx.CurrentItem["Nominee"];
        if (typeof (name) != 'undefined' && name.length > 0) {

            name = (name[0].title);
        }
        else { name = "N/A"; }

        var role = ctx.CurrentItem["Role"];
        var position = ctx.CurrentItem["Location"];
        resultStr += "<div class='name'>" + name + "</div>";
        resultStr += "<div class='role'>" + role + "</div>";
        resultStr += "<div class='position'>" + position + "-" + range + " - " + rng + "</div>";
        var description = ctx.CurrentItem["Description"];
        var longdescription = ctx.CurrentItem["Description"];
        description = description.substring(0, range);
        resultStr += "<div class='description'>" + description + "</div>";
        resultStr += "<div class='longdescription' style='display:none; color:blue;'>" + longdescription + "</div>";
        resultStr += "</div>";

        if (i == numberOfItems) { resultStr += "</td></tr>"; }
        else { resultStr += "</td>"; }

        //console.log(resultStr);


        return resultStr;

    }
    //------------------------------ end dtbgTemplate	

    dtbgContext.OnPostRender = function (ctx) {
        i = 0;
        $(".dtbg").on('click', ".dtbg_item", function () {
            WMPJSLink.DareToBeGreat.CopyDetailsToLargeView($(this).attr('data-id'));
        });

        $(".dtbg_item").first().click();
        if ($(".dtbg").find(".ms-bottompaging").size() > 0) {
            $(".dtbg").find(".ms-bottompaging").remove();
        }
        //$(".dtbgpaging-next").next('table').detach().appendTo(".dtbg");
        $(".ms-bottompaging .ms-promlink-button-right").parent().append('&gt;');
        $(".ms-bottompaging .ms-promlink-button-left").parent().append('&lt;');

    }

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(dtbgContext);

};

//dialog window code.
function openDG(ttl, lnk) {
    var options = SP.UI.$create_DialogOptions();
    options.title = ttl;
    options.url = lnk;
    options.width = 600;
    
    options.dialogReturnValueCallback = Function.createDelegate(null, CloseCallback);
    SP.UI.ModalDialog.showModalDialog(options);
}
function CloseCallback(result, target) {
    if (result === SP.UI.DialogResult.OK) { location.reload(false); }
}

_spBodyOnLoadFunctionNames.push("adjustHeight");

function adjustHeight() {
    var tdHeights = new Array();
    tdHeights[0] = 0;
    //console.log("height - "+ $('.item1').height());
    for (var j = 1; j <= 7; j++) {
        tdHeights[j] = $('.item' + j).height();
        console.log("height - " + $('.item' + j).height());
        var addHeight = tdHeights[j] - 497;
        var currentItem = j + 6;
        $('.tditem' + currentItem).css("top", addHeight + "px");

    }
    
}
