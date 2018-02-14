/*
 Punyamurthula, Sindhuri    Account:  jadrn043
                     CS645, Spring 2017                 
					 Project #2
*/

import java.io.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class fetch_vendors extends HttpServlet 
{ 
    public void doGet(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException
    	{ 
	String toDo = "select id,name from vendor";
	String res = DBHelper.doQuery(toDo);
	PrintWriter out = response.getWriter();
	if(res.isEmpty()) out.print("-1");
	else{
          out.print(res);
        }
	
 }      
}


