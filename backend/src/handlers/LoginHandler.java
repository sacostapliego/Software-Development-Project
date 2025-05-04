import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class LoginHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (Server.handleCors(exchange, "POST, OPTIONS")) return;
        
        if ("POST".equals(exchange.getRequestMethod())) {
            try {
                // Parse the JSON request body
                /*
                 * Example request body:
                 * {"email":"PigPin@example.com","password":"p"}
                 */
                JsonNode requestBody = Server.parseRequestBody(exchange);
                String email = requestBody.get("email").asText();
                String password = requestBody.get("password").asText();
                
                Session session = new Session();
                boolean success = session.login(email, password);
                
                // Prepare response as a Map that Jackson will convert to JSON
                Map<String, Object> responseMap = new HashMap<>();
                
                // Check if login was successful
                if (success) {
                    responseMap.put("success", true);
                    responseMap.put("isAdmin", session.isAdmin());
                    responseMap.put("empid", session.getEmpid());
                    responseMap.put("email", email);
                } else {
                    responseMap.put("success", false);
                    responseMap.put("message", "Invalid credentials");
                }
                
                Server.sendJsonResponse(exchange, responseMap);
            } catch (Exception e) {
                Server.sendErrorResponse(exchange, 400, "Invalid request: " + e.getMessage());
            }
        } else {
            Server.sendErrorResponse(exchange, 405, "Method not allowed");
        }
    }
}