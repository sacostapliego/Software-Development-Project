import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class ChangePasswordHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (Server.handleCors(exchange, "POST, OPTIONS")) return;
        
        if ("POST".equals(exchange.getRequestMethod())) {
            try {
                // Parse the JSON request body
                JsonNode requestBody = Server.parseRequestBody(exchange);
                
                // Check if required fields exist
                if (!requestBody.has("email") || !requestBody.has("currentPassword") || !requestBody.has("newPassword")) {
                    Server.sendErrorResponse(exchange, 400, "Missing required fields: email, currentPassword, and newPassword are required");
                    return;
                }
                
                String email = requestBody.get("email").asText();
                String currentPassword = requestBody.get("currentPassword").asText();
                String newPassword = requestBody.get("newPassword").asText();

                // Use the Session class to handle the password change
                Session session = Session.getInstance();
                boolean success = session.resetPassword(email, currentPassword, newPassword);
                
                Map<String, Object> responseMap = new HashMap<>();
                if (success) {
                    responseMap.put("success", true);
                    responseMap.put("message", "Password changed successfully");
                } else {
                    responseMap.put("success", false);
                    responseMap.put("message", "Failed to change password. Please check your current password.");
                }
                
                Server.sendJsonResponse(exchange, responseMap);
            } catch (Exception e) {
                e.printStackTrace();
                Server.sendErrorResponse(exchange, 400, "Invalid request: " + e.getMessage());
            }
        } else {
            Server.sendErrorResponse(exchange, 405, "Method not allowed");
        }
    }
}