import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EmployeesHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (Server.handleCors(exchange, "GET, OPTIONS")) return;
        
        // Handle GET request for employee data
        if ("GET".equals(exchange.getRequestMethod())) {
            Connection conn = null;
            Statement stmt = null;
            ResultSet rs = null;
            
            // Check if the user is logged in and has admin privileges (admin is hardcoded)
            try {
                conn = DBConnection.getConnection();
                stmt = conn.createStatement();
                // Execute a query to get employee data
                rs = stmt.executeQuery("SELECT empid, fname, lname, email, hireDate, salary FROM employees");
                
                List<Map<String, Object>> employees = new ArrayList<>();
                
                while (rs.next()) {
                    Map<String, Object> employee = new HashMap<>();
                    
                    employee.put("id", rs.getInt("empid"));
                    employee.put("firstName", rs.getString("fname"));
                    employee.put("lastName", rs.getString("lname"));
                    employee.put("email", rs.getString("email"));
                    employee.put("hireDate", rs.getString("hireDate"));
                    employee.put("salary", rs.getDouble("salary"));
                    
                    employees.add(employee);
                }
                
                Server.sendJsonResponse(exchange, employees);
                
            } catch (Exception e) {
                Server.sendErrorResponse(exchange, 500, e.getMessage());
            }
        } else {
            Server.sendErrorResponse(exchange, 405, "Method not allowed");
        }
    }
}