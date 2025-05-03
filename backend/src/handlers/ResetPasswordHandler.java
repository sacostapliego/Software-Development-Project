import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class ResetPasswordHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (Server.handleCors(exchange, "POST, OPTIONS")) return;
        
        if ("POST".equals(exchange.getRequestMethod())) {
            try {
                // Parse the JSON request body
                JsonNode requestBody = Server.parseRequestBody(exchange);
                JsonNode empIdNode = requestBody.get("empid");
                
                if (empIdNode == null) {
                    Server.sendErrorResponse(exchange, 400, "Missing employee ID");
                    return;
                }
                
                int empId = empIdNode.asInt();
                SetData.resetPassword(empId);
                
                Map<String, Object> responseMap = new HashMap<>();
                responseMap.put("success", true);
                responseMap.put("message", "Password reset successfully");
                
                Server.sendJsonResponse(exchange, responseMap);
            } catch (Exception e) {
                Server.sendErrorResponse(exchange, 400, "Invalid request: " + e.getMessage());
            }
        } else {
            Server.sendErrorResponse(exchange, 405, "Method not allowed");
        }
    }
}