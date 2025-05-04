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
            String path = exchange.getRequestURI().getPath();
            int empId = Integer.parseInt(path.split("/")[3]);
            
            // Get the employee data
            EmpSearch search = new EmpSearch();
            search.searchId(empId);
            Employee emp = search.getResult().get(0);
            
            // Convert to map for JSON
            Map<String, Object> employeeData = new HashMap<>();
            employeeData.put("empid", emp.getEmp_id());
            employeeData.put("fname", emp.getFname());
            employeeData.put("lname", emp.getLname());
            employeeData.put("email", emp.getEmail());
            employeeData.put("hire_date", emp.getHire_date());
            employeeData.put("salary", emp.getSalary());
            
            Server.sendJsonResponse(exchange, employeeData);
        } else {
            Server.sendErrorResponse(exchange, 405, "Method not allowed");
        }
    }
}