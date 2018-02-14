$(document).ready(function() {
	var Rempty=0;
	var Sempty=0;
	var RdateFlag=0;
	var RskuFlag=0;
	var RquanFlag=0;
	var SdateFlag=0;
	var SskuFlag=0;
	var SquanFlag=0;
	/*if (RdateFlag==0 && RquanFlag==0 && RskuFlag==0)
	{
		$( "#Rsubmit_button" ).button({disabled:false});
	}
	if (RdateFlag==0 && RquanFlag==0 && RskuFlag==0)
	{
		$( "#Ssubmit_button" ).button({disabled:false});
	}
	$( "#Rsubmit_button" ).button({disabled:true});
	$( "#Ssubmit_button" ).button({disabled:true});*/
	//check Date format 
    $("#Rdate").on('blur',function(e) { 
	   checkDate();
     }); 
	 $("#Sdate").on('blur',function(e) { 
	   checkSDate();
     });
	//check qunatity
	$("#Rquantity").on('blur',function(e) { 
	   checkQuan(1);
     });
	$("#Squantity").on('blur',function(e) { 
	   checkQuan(2);
     });
	
	/* populate values with SKU  in Received Inventory*/
$("#Rsku").on('blur',function(e) { 
		fetch_ReceivedInventoryData();
 });
 /*populate values with SKU in Sent Out Inventory */
$("#Ssku").on('blur',function(e) { 
		fetch_SentInventoryData();
 }); 
/*update tables on clicking submit in Received Inventory */
$('#Rsubmit_button').bind('click', function() {
	/*if ($("#Rsku").val()==""||$("#Rquantity").val()==""||$("#Rdate").val()=="")
	{
		Rempty=1;
	}*/
	if (RdateFlag==0 && RquanFlag==0 && RskuFlag==0 && Rempty==0)
	{
            processReceivedInventoryInsert();
			clearAll(); 
	}
	
			//send_info();
            });
 /*update tables on clicking submit in Sent Inventory */
$('#Ssubmit_button').bind('click', function() {
	/*if ($("#Ssku").val()==""||$("#Squantity").val()==""||$("#Sdate").val()=="")
	{
		Sempty=1;
	}*/
	if (SdateFlag==0 && SquanFlag==0 && SskuFlag==0 && Sempty==0)
	{
            processSentInventoryInsert();
			clearAll(); 
	}
	

	
			// send_info();
            });
			
 //CLEAR Function
 $('#Rclear').bind('click', function() {
	clearAll(); 
  });
 $('#Sclear').bind('click', function() {
	clearAll(); 
  });
 
});

//fetching Received Inventory details
function fetch_ReceivedInventoryData() {
	 var url = '/jadrn043/servlet/fetch_inventoryData?Rsku=';
	 url += $("#Rsku").val();
	 $.get(url,handle_ReceivedInventoryData); 
     
    }	
	
function handle_ReceivedInventoryData(response) { 
    var answer=[];
    var obj_data = eval("("+response+")");    
    if(response==-1)
	{
		 $('#rsku_error').html("Not a valid SKU  ");
		 $('#rsku_error').show();
		 $('#Rpic').hide();
		 RskuFlag=1;
	}
	else{
	$('#rsku_error').hide();
	$('#Rpic').show();
	RskuFlag=0;
	for(i=0; i < obj_data.length; i++) {
		 for(j=0; j < obj_data[i].length; j++)
		 {
			answer.push(obj_data[i][j]);
		 }
	}
	 
	$("#Rsku").val(answer[0]);
	$("#Rcategory").val(answer[1]);
	$("#Rvendor").val(answer[2]);
	$("#Rmid").val(answer[3]);
	/*************/
	$("#Rdesc").val(answer[4]);
	$("#Rfeatures").val(answer[5]);
	$("#Rcost").val(answer[6]);
	$("#Rretail").val(answer[7]);
	
	/***************/
	var RPicName=answer[8];
	var toDisplayPicName = "<img src=\"/~jadrn043/proj1/_uploadDIR_/" + RPicName + "\" />"; 
	$('#Rpic').html(toDisplayPicName);
	}//else sku part
}

//fetching Sent Out Inventory Details

function fetch_SentInventoryData() {
	 var url = '/jadrn043/servlet/fetch_inventoryData?Rsku=';
	 url += $("#Ssku").val();
	 $.get(url,handle_SentInventoryData);   
    }	
	
function handle_SentInventoryData(response) { 
    var answer=[];
    var obj_data = eval("("+response+")");    
    if(response==-1)
	{
		 $('#ssku_error').html("Not a valid SKU ");
		 $('#ssku_error').show();
		 $('#Spic').hide();
		 SskuFlag=1;
	}
	else {
		 $('#ssku_error').hide();
		 $('#Spic').show();
		 SskuFlag=0;
	for(i=0; i < obj_data.length; i++) {
		 for(j=0; j < obj_data[i].length; j++)
		 {
			answer.push(obj_data[i][j]);
		 }
	}
	 
	$("#Ssku").val(answer[0]);
	$("#Scategory").val(answer[1]);
	$("#Svendor").val(answer[2]);
	$("#Smid").val(answer[3]);
	/*************/
	$("#Sdesc").val(answer[4]);
	$("#Sfeatures").val(answer[5]);
	$("#Scost").val(answer[6]);
	$("#Sretail").val(answer[7]);
	
	/***************/
	
	
	var RPicName=answer[8];
	var toDisplayPicName = "<img src=\"/~jadrn043/proj1/_uploadDIR_/" + RPicName + "\" />"; 
	$('#Spic').html(toDisplayPicName);
	}//else Sent part
}	 
	 
//updating merchandise_in aand on_hand tables
 function processReceivedInventoryInsert() {
         
        insert_Receivedform_data();
        }
	
 function insert_Receivedform_data() {
    var sku = $('#Rsku').val();
	var date =  $('#Rdate').val();
	var quantity =  $('#Rquantity').val();
	
	var url = '/jadrn043/servlet/update_tables?action=Received&RSsku=';
	 url += sku + "&RSdate=" + date + "&RSquantity=" + quantity;
	   
        var req = new HttpRequest(url, handleReceivedInsertData);
        req.send();
        }
		
function handleReceivedInsertData(response) {
       if (response==1)
	   {       
      $('#fetch_Rdata').html("Inventory Received.Updated successfully"); 
	   }
	   else if (response==6)
	   {       
      $('#fetch_Rdata').html("Product not available"); 
	   }
       else
       {
		  $('#fetch_Rdata').html("There was an error.Please try again");   
	   }		   
        			   
               }
			   
// updating on_hand and merchandise_out


 function processSentInventoryInsert() {
         
        insert_Sentform_data();
        }
	
 function insert_Sentform_data() {
    var sku = $('#Ssku').val();
	var date =  $('#Sdate').val();
	var quantity =  $('#Squantity').val();
	

	 var url = '/jadrn043/servlet/update_tables?action=Sent&RSsku=';
	 url += sku + "&RSdate=" + date + "&RSquantity=" + quantity;
	   
        var req = new HttpRequest(url, handleSentInsertData);
        req.send();
        }
		
function handleSentInsertData(response) {
       if (response==1)
	   {       
      $('#fetch_Sdata').html("Inventory removed successfully"); 
	   }
	   else if(response == -2)
	   {
		 $('#fetch_Sdata').html("Exceeding available quantity"); 
         		 
	   }
	   else if(response == 6)
	   {
		 $('#fetch_Sdata').html("Product Not available");   
	   }
       else
       {
		  $('#fetch_Sdata').html("Error:Please try again");   
	   }		   
        			   
               }



// trying serialize 
/*
function send_info() {    
        
		var SformData = $('#mySform').serialize();
        SformData.append("action",'Sent');
        $.ajax( {
            url: "/jadrn043/servlet/update_tables?action=Sent&",
            type: "post",
            data: SformData,
            processData: false,
            contentType: false,
            success: function(response) {
				if (response==1)
	   {       
      $('#fetch_Rdata').html("Updated Mer_out successfully"); 
	   }
	   else
       {
		  $('#fetch_Rdata').html("There was an error for mer_out.Please click here to try again");   
	   }	
    },
	error: function(response) {
            $('#fetch_Rdata').html("Serialize error");
	}			
  });
        } */




// checking date format	for Received Merchandise		
function CheckDateFormat(dateEntered)
{
//var regExFormat = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
var regExFormat = new RegExp(/^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/);
return regExFormat.test(dateEntered);
}

function checkDate()
{
	var dateEntered1=$('#Rdate').val();
    if(CheckDateFormat(dateEntered1))
   {
     $('#rdate_error').hide();
	 $('#rdate_error').html(" ");
	 RdateFlag=0;
   }
 else
  {
   $('#rdate_error').show();
   $('#rdate_error').html(" Required Format:YYYY-MM-DD ");
   RdateFlag=1;
   }

}	
//checking Sent Date Format		
function checkSDate()
{
	var dateEntered1=$('#Sdate').val();
    if(CheckDateFormat(dateEntered1))
   {
     $('#sdate_error').hide();
	 $('#sdate_error').html(" ");
	 SdateFlag=0;
   }
 else
  {
   $('#sdate_error').show();
   $('#sdate_error').html("Required Format:YYYY-MM-DD ");
   SdateFlag=1;
   }

}	
//check valid quantity
function checkQuan(RS)
{
	if (RS==1)
	{
		var Rquan=$('#Rquantity').val();
		if (Rquan>0 && Rquan%1==0)
		{
			$('#rquantity_error').hide();
           $('#rquantity_error').html(" ");
           RquanFlag=0;
		}
		else{
			$('#rquantity_error').show();
           $('#rquantity_error').html(" Quantity must be a positive whole number ");
           RquanFlag=1;
			
		}
		
		
	}
	else if (RS==2)
	{
		var Squan=$('#Squantity').val();
		if (Squan>0 && Squan%1==0)
		{
			$('#squantity_error').hide();
           $('#squantity_error').html(" ");
           SquanFlag=0;
		}
		else{
			$('#squantity_error').show();
           $('#squantity_error').html(" Quantity must be a positive whole number ");
           SquanFlag=1;
			
		}
		
		
	}
}



function clearAll()
{
	// setTimeout(function() { $("#fetch_Rdata").fadeOut(2000);},4000);
	// setTimeout(function() { $("#fetch_Sdata").fadeOut(2000);},4000);
	 //clear all error messages of sent inventory
	 $('#squantity_error').hide();
     $('#squantity_error').html(" ");
	 $('#sdate_error').hide();
     $('#sdate_error').html(" ");
     $('#ssku_error').hide();
     $('#ssku_error').html(" ");
	 //clear all error messages of receive inventory
	 
	 $('#rquantity_error').hide();
     $('#rquantity_error').html(" ");
	 $('#rdate_error').hide();
     $('#rdate_error').html(" ");
     $('#rsku_error').hide();
     $('#rsku_error').html(" ");
	 //clear all fields of receive inventory
	 
	  $( "#Rsku" ).val("");
	 // $( "#Rdate" ).val("");
	  $( "#Rquantity" ).val("");
	  $("#Rcategory").val("");
	$("#Rvendor").val("");
	$("#Rmid").val("");
	$("#Rdesc").val("");
	$("#Rfeatures").val("");
	$("#Rcost").val("");
	$("#Rretail").val("");
	$("#Rpic").html("");
	 $("#Rpic").hide();
	 
	 //clear all fields of sent out inventory
	 $( "#Ssku" ).val("");
	 // $( "#Sdate" ).val("");
	  $( "#Squantity" ).val("");
	  $("#Scategory").val("");
	$("#Svendor").val("");
	$("#Smid").val("");
	$("#Sdesc").val("");
	$("#Sfeatures").val("");
	$("#Scost").val("");
	$("#Sretail").val("");
	$("#Spic").html("");
	 $("#Spic").hide();
	 populateDate();
	 var Rempty=0;
	var Sempty=0;
	var RdateFlag=0;
	var RskuFlag=0;
	var RquanFlag=0;
	var SdateFlag=0;
	var SskuFlag=0;
	var SquanFlag=0;

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
