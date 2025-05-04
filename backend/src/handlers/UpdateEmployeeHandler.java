import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class UpdateEmployeeHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (Server.handleCors(exchange, "POST, OPTIONS")) return;
        
        if ("POST".equals(exchange.getRequestMethod())) {
            try {
                JsonNode requestBody = Server.parseRequestBody(exchange);
                
                int empId = requestBody.get("empId").asInt();
                
                Employee emp = new Employee(empId);
                
                if (requestBody.has("fname")) emp.setFname(requestBody.get("fname").asText());
                if (requestBody.has("lname")) emp.setLname(requestBody.get("lname").asText());
                if (requestBody.has("email")) emp.setEmail(requestBody.get("email").asText());
                if (requestBody.has("hireDate")) emp.setHire_date(requestBody.get("hireDate").asText());
                if (requestBody.has("salary")) emp.setSalary(requestBody.get("salary").asInt());
                if (requestBody.has("ssn")) emp.setSsn(requestBody.get("ssn").asText());
                
                SetData.updateEmployee(emp);
                
                Map<String, Object> responseMap = new HashMap<>();
                responseMap.put("success", true);
                responseMap.put("message", "Employee updated successfully");
                
                Server.sendJsonResponse(exchange, responseMap);
            } catch (Exception e) {
                Server.sendErrorResponse(exchange, 400, "Error: " + e.getMessage());
            }
        } else if ("GET".equals(exchange.getRequestMethod())) {
            // Handle GET request to fetch employee details
            String query = exchange.getRequestURI().getQuery();
            if (query == null || !query.startsWith("empid=")) {
                Server.sendErrorResponse(exchange, 400, "Missing empid parameter");
                return;
            }
            
            try {
                int empId = Integer.parseInt(query.substring(6));
                Employee emp = new Employee(empId);
                emp.populate();
                
                Map<String, Object> employeeData = new HashMap<>();
                employeeData.put("empId", emp.getEmp_id());
                employeeData.put("fname", emp.getFname());
                employeeData.put("lname", emp.getLname());
                employeeData.put("email", emp.getEmail());
                employeeData.put("hireDate", emp.getHire_date());
                employeeData.put("salary", emp.getSalary());
                employeeData.put("ssn", emp.getSsn());
                
                Server.sendJsonResponse(exchange, employeeData);
            } catch (Exception e) {
                Server.sendErrorResponse(exchange, 400, "Error: " + e.getMessage());
            }
        } else {
            Server.sendErrorResponse(exchange, 405, "Method not allowed");
        }
    }
}