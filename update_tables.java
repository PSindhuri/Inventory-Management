/*
 Punyamurthula, Sindhuri    Account:  jadrn043
                     CS645, Spring 2017                 
					 Project #2
*/

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
//import sdsu.*;



public class update_tables extends HttpServlet { 
    public void doGet(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  { 
						//from here
	String RSsku = (String) request.getParameter("RSsku");
    String RSdate =(String) request.getParameter("RSdate");
	String RSquantity = (String) request.getParameter("RSquantity");
	String RSaction =(String) request.getParameter("action");
	//checking if valid sku
	String onhand_toDoSKU = "select sku from product where sku='"+RSsku +"'";
	String resSKU = DBHelper.doQuery(onhand_toDoSKU);
	//checking if valid date
     String errDate="correct";
	 int RS1=0;
	 if(RSquantity!=""){
	 RS1=Integer.valueOf(RSquantity);
	 }
	///
	if(RSdate.length()==10)
	{
		String y=RSdate.substring(0,4); 
		int yi=Integer.valueOf(y); 
		String m=RSdate.substring(5,7);
		int mi=Integer.valueOf(m);  
		String d=RSdate.substring(8,10); 
		int di=Integer.valueOf(d);
		if(y!="0000" && m!="00" && d!="00" && mi>0 && mi<13 && di>0 && di<32)
		{
			errDate="correct";
		}
		else{
			errDate="wrong";
		}
	}
	else
	{
		errDate="wrong";
	}
	
	
	//
	if(RSsku==""||RSdate==""||RSquantity==""||RSaction=="")
	{
		PrintWriter out = response.getWriter();
		out.println("5");
		
	}
	else if(resSKU.isEmpty())
	{
		PrintWriter out = response.getWriter();
		out.println("6");
		
	}
	
	else if(errDate=="wrong")
	{
		PrintWriter out = response.getWriter();
		out.println("-1");
		
	}
	else if(RS1<=0)
	{
		PrintWriter out = response.getWriter();
		out.println("-1");
		
	}
	else if(RSsku!=""&&RSdate!=""&&RSquantity!=""&&RSaction!="") 
	{
	if(RSaction.equals("Received"))
	{ //start of received action
	 
	String onhand_toDo = "select sku from on_hand where sku='"+RSsku +"'";
	String res = DBHelper.doQuery(onhand_toDo);
	//PrintWriter out = response.getWriter();
	if(res.isEmpty()) //if empty insert into on_hand table
	{
		String insOn_toDo = "INSERT into on_hand values('"+RSsku+"','"+RSdate+"','"+RSquantity+"');";
		int count = DBHelper.executeCommand(insOn_toDo);
		PrintWriter out = response.getWriter();
		//out.println(count);
		
	}
	else //update existing record in on_hand
	{
        //String upOn_toDo = "UPDATE on_hand SET sku='"+RSsku+"',last_date_modified='"+RSdate+"',on_hand_quantity=on_hand_quantity+'"+RSquantity+"'"; 
		 String upOn_RtoDo = "UPDATE on_hand SET last_date_modified='"+RSdate+"',on_hand_quantity=on_hand_quantity + '"+RSquantity+"' where sku='"+RSsku+"';"; 
		int count = DBHelper.executeCommand(upOn_RtoDo);
		PrintWriter out = response.getWriter();
		//out.println(count);
    } 
	
  //adding new record to merchandise_in table
  
  String in_RtoDo = "INSERT into merchandise_in values('"+RSsku+"','"+RSdate+"','"+RSquantity+"');";
		int count = DBHelper.executeCommand(in_RtoDo);
		PrintWriter out = response.getWriter();
		out.println(count);
}//end of received action


else if(RSaction.equals("Sent"))
{ //start of sent action
	 
	String onhand_StoDo = "select on_hand_quantity from on_hand where sku='"+RSsku +"'";
	String res = DBHelper.doQuery(onhand_StoDo);
	//PrintWriter out = response.getWriter();
	
	
	if(res.isEmpty()) //if less quantity give error
	{
		/*String insOn_StoDo = "INSERT into on_hand values('"+RSsku+"','"+RSdate+"','"+RSquantity+"');";
		int count = DBHelper.executeCommand(insOn_StoDo);*/
		PrintWriter out = response.getWriter();
		out.println("6");
		
	}
	else {
	String res1=res.substring(0,res.length()-3);
	int resInt=Integer.valueOf(res1);
	int RS=Integer.valueOf(RSquantity);
	
      if(resInt < RS)
	{
		PrintWriter out = response.getWriter();
		out.println("-2");
	}
	
	else //update existing record in on_hand
	{
        //String upOn_StoDo = "UPDATE on_hand SET sku='"+RSsku+"',last_date_modified='"+RSdate+"',on_hand_quantity=on_hand_quantity-'"+RSquantity+"'"; 
		
		 String upOn_StoDo = "UPDATE on_hand SET last_date_modified='"+RSdate+"',on_hand_quantity=on_hand_quantity - '"+RSquantity+"' where sku='"+RSsku+"';"; 
		int upcount = DBHelper.executeCommand(upOn_StoDo);
		PrintWriter out = response.getWriter();
		//out.println(count);
		//adding new record to merchandise_in table
	
  if (upcount==0)
  {
	  out.println(upcount);
  } 
  else
  {
  String in_StoDo = "INSERT into merchandise_out values('"+RSsku+"','"+RSdate+"','"+RSquantity+"');";
		int count = DBHelper.executeCommand(in_StoDo);
		//PrintWriter out = response.getWriter();
		out.println(count);
  }
 }//else part
}
}//end of sent action	
}


//till here
	   }      
}



