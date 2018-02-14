/*
 Punyamurthula, Sindhuri    Account:  jadrn043
                     CS645, Spring 2017                 
					 Project #2
*/

import java.io.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class fetch_inventoryData extends HttpServlet 
{ 
    public void doGet(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException
    	{ 
	String Rsku = (String) request.getParameter("Rsku");
	String toDo = "select * from product where sku ='" + Rsku + "'";
	Vector<String[]> res = DBHelper.runQuery(toDo);
	PrintWriter out = response.getWriter();
	if(res.isEmpty()) out.print("-1");
	else{

            String output = "[[";
            for(String[] x:res){
                for (String s:x){
                    output += "\"" + s + "\",";
                }
                output = output.substring(0, output.length()-1);
                output += "],";
            }
            output = output.substring(0, output.length()-1);
            output += "]";
            out.print(output);
        }
	
	
	
  
        }      
}


