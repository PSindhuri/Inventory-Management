<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<title>Main Menu</title>
	<meta http-equiv="content-type" 
		content="text/html;charset=utf-8" />
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<script src="/jquery/jquery.js"></script>
	<script src="/jquery/jQueryUI.js" type="text/javascript"></script>
	<script src="/~jadrn043/proj1/ajax/ajax_get_lib.js" type="text/javascript"></script>
	<script src="/jadrn043/logout.js"></script>
    <script src="/jadrn043/tabs.js" type="text/javascript"></script>
	<script src="/jadrn043/menuPage.js" type="text/javascript"></script>
	 <link rel="stylesheet" type="text/css" href="/jadrn043/tabs.css">   
      
</head>

<body>
<% if(session.getAttribute("username") == null)
	response.sendRedirect("/jadrn043/jsp/login_err.jsp");
%>
<div id="Rans"></div>
        <div id="status">
        </div>
<h4 align="left"> Welcome <%= session.getAttribute("username") %> </h4>
<h1 align="center"> SAMAY WATCHES </h1>   
<input align="left" type="button" value="Logout" id="LogoutButton" class="button"><br>
<div id="tabs">
<ul class="tabs">
  <li><a href="#ReceivedInventory" class="tabRef">Inventory Received</a></li>
  <li><a href="#SentOutInventory" class="tabRef">Inventory Sent Out</a></li>
</ul>

<div id="ReceivedInventory" class="tabPage">
  <h3>Merchandise Received</h3>
  <form method="post" enctype="multipart/form-data" name="myRform" id="myRform">


<table>
<tr>
    <td> <label><b>SKU</b></label> </td>
	<td > <input type="text" name="Rsku" id="Rsku"> </td>
	<td> <label><b>Date</b></label> </td>
    <td > <input type="text" name="Rdate" id="Rdate"> </td>
	<td> <label><b>Quantity</b></label> </td>
	<td> <input type="text" name="Rquantity" id="Rquantity"> </td>
	
</tr>
<tr>
	
	<td colspan="2"> <div id="rsku_error"></div> </td>
	<td colspan="2"> <div id="rdate_error"></div>  </td>
	<td colspan="2"> <div id="rquantity_error"></div>  </td>
</tr>
</table>

<p>
<table id="Rfetch">
<tr>
<td>
<table>
<tr>
    
	<td> <label><b>Category </b></label> </td>
	<td> <select id="Rcategory"></select></td>
	
</tr>
<tr>
	<td> <label><b>Vendor </b></label> </td>
	<td> <select id="Rvendor"></select> </td>
	
</tr>
<tr>
	<td> <label><b>Manufacturer's ID </b></label> </td>
	<td> <input type="text" name="Rmid" id="Rmid"> </td>
	
</tr>
<tr>
<td> <label><b>Features </b></label> </td>
<td> <input type="text" name="Rfeatures" id="Rfeatures"> </td>
</tr>
<tr>
<td> <label><b>Description </b></label> </td>
<td> <input type="text" name="Rdesc" id="Rdesc"> </td>
</tr>
<tr>
<td> <label><b>Cost </b></label> </td>
<td> <input type="text" name="Rcost" id="Rcost"> </td>
</tr>
<tr>
<td> <label><b>Retail </b></label> </td>
<td> <input type="text" name="Rretail" id="Rretail"> </td>
</tr>


</table>
</td>
<td><p><div id="Rpic"></div></p></td>
</tr>
</table>
</p>
<table width=35%>
<tr>
<td width=10% align="left"> <input type="reset" value="Clear" class="button" id="Rclear"></td>
<td width=20% align="right"><input type="button" value="Confirm Received Inventory " id="Rsubmit_button" class="button"></td>
</tr>
</table>
<div id="fetch_Rdata">
</div>

</form>

</div>


<div id="SentOutInventory" class="tabPage">
  <h3>Merchandise Sent Out</h3>
  <form method="post" enctype="multipart/form-data" name="mySform" id="mySform">


<table>
<tr>
    <td> <label><b>SKU </b></label> </td>
	<td > <input type="text" name="Ssku" id="Ssku"> </td>
	<td> <label><b>Date </b></label> </td>
	<td > <input type="text" name="Sdate" id="Sdate"> </td>
	<td> <label><b>Quantity </b></label> </td>
	<td> <input type="text" name="Squantity" id="Squantity"> </td>
	
	
</tr>
<tr>
    <td colspan="2"> <div id="ssku_error"></div> </td>
	<td colspan="2"> <div id="sdate_error"></div>  </td>
	<td colspan="2"> <div id="squantity_error"></div>  </td>
</tr>
</table>

<p>
<table id="Sfetch">
<tr>
<td>
<table>
<tr>
    
	<td> <label><b>Category </b></label> </td>
	<td> <select id="Scategory"></select></td>
	
</tr>
<tr>
	<td> <label><b>Vendor </b></label> </td>
	<td> <select id="Svendor"></select> </td>
	
</tr>
<tr>
	<td> <label><b>Manufacturer's ID </b></label> </td>
	<td> <input type="text" name="Smid" id="Smid"> </td>
	
</tr>
<tr>
	<td> <label><b>Description </b></label> </td>
	<td> <input type="text" name="Sdesc" id="Sdesc"> </td>
	
</tr>
<tr>
	<td> <label><b>Features </b></label> </td>
	<td> <input type="text" name="Sfeatures" id="Sfeatures"> </td>
	
</tr>
<tr>
	<td> <label><b>Cost </b></label> </td>
	<td> <input type="text" name="Scost" id="Scost"> </td>
	
</tr>
<tr>
	<td> <label><b>Retail </b></label> </td>
	<td> <input type="text" name="Sretail" id="Sretail"> </td>
	
</tr>
</table>
</td>
<td>
<p><div id="Spic"></div></p>
</td>
</tr>
</table>
</p>
<table width=35%>
<tr>
<td width=10% align="left"> <input type="reset" value="Clear" class="button" id="Sclear"></td>
<td width=20% align="right"><input type="button" value="Confirm Sent Out Inventory " id="Ssubmit_button" class="button"></td>
</tr>
</table>
<div id="fetch_Sdata">
</div>
</form>
</div>



</div>

</body>
</html>