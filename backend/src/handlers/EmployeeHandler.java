import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class EmployeeHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (Server.handleCors(exchange, "GET, OPTIONS")) return;
        
        if ("GET".equals(exchange.getRequestMethod())) {
            try {
                // Extract employee ID from URL path
                String path = exchange.getRequestURI().getPath();
                String[] pathParts = path.split("/");
                
                if (pathParts.length < 4) {
                    Server.sendErrorResponse(exchange, 400, "Missing employee ID");
                    return;
                }
                
                int empId;
                try {
                    empId = Integer.parseInt(pathParts[3]); // /api/employee/123 -> 123
                } catch (NumberFormatException e) {
                    Server.sendErrorResponse(exchange, 400, "Invalid employee ID format");
                    return;
                }
                
                // Use EmpSearch to find the employee
                EmpSearch search = new EmpSearch();
                search.searchId(empId);
                
                if (search.getResult().isEmpty()) {
                    Server.sendErrorResponse(exchange, 404, "Employee not found");
                    return;
                }
                
                // Convert Employee object to a map for JSON serialization
                Employee emp = search.getResult().get(0);
                Map<String, Object> employeeData = new HashMap<>();
                employeeData.put("empid", emp.getEmp_id());
                employeeData.put("fname", emp.getFname());
                employeeData.put("lname", emp.getLname());
                employeeData.put("email", emp.getEmail());
                employeeData.put("hire_date", emp.getHire_date());
                employeeData.put("salary", emp.getSalary());
                
                Server.sendJsonResponse(exchange, employeeData);
                
            } catch (Exception e) {
                e.printStackTrace();
                Server.sendErrorResponse(exchange, 500, "Server error: " + e.getMessage());
            }
        } else {
            Server.sendErrorResponse(exchange, 405, "Method not allowed");
        }
    }
}