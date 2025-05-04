import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class AddEmployeeHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (Server.handleCors(exchange, "POST, OPTIONS")) return;
        
        if ("POST".equals(exchange.getRequestMethod())) {
            try {
                // Parse the JSON request body
                JsonNode requestBody = Server.parseRequestBody(exchange);
                
                String firstName = requestBody.get("firstName").asText();
                String lastName = requestBody.get("lastName").asText();
                String email = requestBody.get("email").asText();
                double salary = requestBody.get("salary").asDouble();
                
                int empId = SetData.addEmployee(firstName, lastName, email, salary);
                
                Map<String, Object> responseMap = new HashMap<>();
                responseMap.put("success", true);
                responseMap.put("message", "Employee added successfully");
                responseMap.put("empId", empId);
                
                Server.sendJsonResponse(exchange, responseMap);
            } catch (Exception e) {
                Server.sendErrorResponse(exchange, 400, "Error: " + e.getMessage());
            }
        } else {
            Server.sendErrorResponse(exchange, 405, "Method not allowed");
        }
    }
}