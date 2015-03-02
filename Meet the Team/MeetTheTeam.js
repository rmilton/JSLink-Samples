if (typeof (WMPJSLink) == 'undefined')
{
	var WMPJSLink = {};
	var count=0;
	
}
MeetTheTeam();

//-------------------------------------------------------------------------------------------------
function MeetTheTeam()
{
	var mttCtx = {};
	
	mttCtx.Templates = {};	
	
/* ================== Load List Name =====================*/
	mttCtx.Templates.Header = function (ctx)
	{
		 return '<div style="width:100%; text-align:center; font-size: 30px; color:#000066; padding-bottom:20px;">'+ ctx.ListTitle +'</div>';  //  list title.
	}
	
/* ================== Load list items =====================*/
	mttCtx.Templates.Item = function (ctx)
	{
		count++;
		//console.log(count);
		
		var html = '<div style="background-color:white; width:550px; display:inline-block; margin:30px; box-shadow: 3px 3px 10px #888888;">';
		html += '<img width=200px; height=200px; style="vertical-align:top;" src=' +ctx.CurrentItem.Picture+'>';
		html += '<div style="position:relative; display:inline-block; text-align:left">';
		html += '<div style="padding:5px 10px 0px; font-size:20px; margin:5px 0px 0px;">'+ctx.CurrentItem.Title+'</div>';
		html += '<div style="padding:10px 10px 5px; font-size:13px;">'+ctx.CurrentItem.Role+'</div>';
		html += '<div style="padding:20px 10px 5px;">Phone : '+ctx.CurrentItem.Phone+'</div>';
		html += '<div style="padding:0px 10px 5px;">Email : '+ctx.CurrentItem.Email+'</div>';
		html += '</div></div>';		
		
		return html;
	}
/* ================== Load Footer =====================*/
	mttCtx.Templates.Footer = function(ctx)
	{
		return '<div></div>';
	}
	
	SPClientTemplates.TemplateManager.RegisterTemplateOverrides(mttCtx);
	
}   // end of MeetTheTeam function
//-------------------------------------------------------------------------------------------------

