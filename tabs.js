/*
 Punyamurthula, Sindhuri    Account:  jadrn043
                     CS645, Spring 2017                 
					 Project #2
*/


$(document).ready(function() {
	
	var curTabId=0;
	
	 $.post("/jadrn043/servlet/Login",function(response){});
	var displayed_content = $('#body').html();
	if (displayed_content=="You have logged out.")
	{
		processLogout();
	}
	$("#tabs").tabs(); 
	$('#ui-id-1').click(function(){
		
		curTabId = 0;
		setSkuFocus(curTabId);
	});
	$('#ui-id-2').click(function(){
		curTabId = 1;
		setSkuFocus(curTabId);
	});
	
	
	
	$("[name='Rsku']").focus();
	$("[name='Ssku']").focus();
	document.getElementById("Rsku").placeholder = "SMY-XXX";
	document.getElementById("Ssku").placeholder = "SMY-XXX";
	$(".ui-tabs-active input[type='text']:first").focus();
	//settingFocusSentTab();
	//settingFocusReceivedTab();
	populateDate();
	$.get("/jadrn043/servlet/fetch_vendors",fix_vendor);
    $.get("/jadrn043/servlet/fetch_categories",fix_category);
	
	$('#LogoutButton').bind('click', function() {
            processLogout();
            });
	
   
	disableElements();
	
	
	});
	
	
 //code to fetch vendors list
	function fix_vendor(response) {
   var toWrite = "<option value=\"-1\">Select Vendor</option>";
    var tmpStr = response.split("||");
    for(i=0; i<tmpStr.length-1; i++) {
        tmp = tmpStr[i].split("=");
        toWrite += "<option value=" + tmp[0] + ">"+tmp[1]+"</option>\n";
        }
	$('#Rvendor').append(toWrite);
    $('#Svendor').append(toWrite);

    }        
	
	//code to fetch categories list
    function fix_category(response) {
   var toWrite = "<option value=\"-1\">Select Category</option>";
    var tmpStr = response.split("||");
    for(i=0; i<tmpStr.length-1; i++) {
        tmp = tmpStr[i].split("=");
        toWrite += "<option value=" + tmp[0] + ">"+tmp[1]+"</option>\n";
        }
	$('#Rcategory').append(toWrite);
    $('#Scategory').append(toWrite);
	
    }      
	
 
 //function to populate Date field with todays date
 function populateDate()
 {
	 //code to give hint about format YYYY/MM/DD
	 document.getElementById("Rdate").placeholder = "YYYY-MM-DD";
	 document.getElementById("Sdate").placeholder = "YYYY-MM-DD";
	 //code to set todays date
	    var today_date = new Date();
        var today_year=today_date.getFullYear();
        var today_month = today_date.getMonth() + 1;

        var today_day = today_date.getDate();
		if (today_day<10)
		{
			today_day="0"+today_day;
		}
		if (today_month<10)
		{
			today_month="0"+today_month;
		}
        var today_formattedDate=today_year+"-"+today_month+"-"+today_day;

        document.getElementById("Rdate").value = today_formattedDate;
		document.getElementById("Sdate").value = today_formattedDate;
 }
 
 //function to set focus
 function settingFocusReceivedTab()
 {
 if (document.getElementById("Rsku").value == "") 
 {
	  document.getElementById("Rsku").focus();
 }
 }
 function settingFocusSentTab(){
 if (document.getElementById("Ssku").value == "") 
 {
	  document.getElementById("Ssku").focus();
 }
 }
 
 //Logout code
 function processLogout()
 {
	 var url="/jadrn043/servlet/Logout";
	 $.post(url,function(response){});
	 $('body').html("You have logged out");
	 window.setTimeout(function(){location.replace("http://jadran.sdsu.edu/jadrn043/login.html")}, 1000);
	 
	 //setTimeout(RedirectToLogin, 1000);
	 
 }
 



 /*function RedirectToLogin() {
               window.location.replace="http://jadran.sdsu.edu/jadrn043/login.html";
			   return true;
            }*/
			
function disableElements()
{
	$("#Rcategory").attr("disabled", true);
	$("#Rvendor").attr("disabled", true);
	$("#Rmid").attr("disabled", true);
	$("#Rdesc").attr("disabled", true);
	$("#Rfeatures").attr("disabled", true);
	$("#Rcost").attr("disabled", true);
	$("#Rretail").attr("disabled", true);
	//sent
	$("#Scategory").attr("disabled", true);
	$("#Svendor").attr("disabled", true);
	$("#Smid").attr("disabled", true);
	$("#Sdesc").attr("disabled", true);
	$("#Sfeatures").attr("disabled", true);
	$("#Scost").attr("disabled", true);
	$("#Sretail").attr("disabled", true);
	
	
}

//setting focus on SKU
function setSkuFocus(curTabId)
{
	if (curTabId==0)
	{
		$("[name='Rsku']").focus();
	}
	else if(curTabId==1)
	{
		$("[name='Ssku']").focus();
	}
}