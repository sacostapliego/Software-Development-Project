import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.Headers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.util.Map;

public class Server {
    // Single reusable ObjectMapper
    public static final ObjectMapper mapper = new ObjectMapper();
    
    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        
        // Regular handlers
        server.createContext("/api/login", new LoginHandler());

        // Admin Handlers
        server.createContext("/api/employees", new EmployeesHandler());
        server.createContext("/api/resetPassword", new ResetPasswordHandler());

        // Employee Handlers
        server.createContext("/api/employee", new EmployeeHandler());
        server.createContext("/api/changePassword", new ChangePasswordHandler()); 
        server.createContext("/api/personalPayroll", new PersonalPayrollHandler());


        
        System.out.println("Server started at http://localhost:8080");
        server.start();
    }
    
    /* Sets CORS headers and handles preflight */
    public static boolean handleCors(HttpExchange exchange, String methods) throws IOException {
        Headers headers = exchange.getResponseHeaders();
        headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Access-Control-Allow-Methods", methods);
        headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization");
        headers.add("Content-Type", "application/json");
        
        if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            exchange.sendResponseHeaders(204, -1);
            return true;
        }
        return false;
    }
    
    /* Parse request body directly to JsonNode */
    public static JsonNode parseRequestBody(HttpExchange exchange) throws IOException {
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(exchange.getRequestBody(), "utf-8"))) {
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }
            return mapper.readTree(sb.toString());
        }
    }
    
    /* Send JSON response from any object */
    public static void sendJsonResponse(HttpExchange exchange, Object object) throws IOException {
        try {
            String jsonResponse = mapper.writeValueAsString(object);
            byte[] responseBytes = jsonResponse.getBytes();
            exchange.sendResponseHeaders(200, responseBytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(responseBytes);
            }
        } catch (Exception e) {
            sendErrorResponse(exchange, 500, "Error: " + e.getMessage());
        }
    }
    
    /* Send error response */
    public static void sendErrorResponse(HttpExchange exchange, int code, String message) throws IOException {
        try {
            String errorResponse = mapper.writeValueAsString(Map.of("error", message));
            exchange.sendResponseHeaders(code, errorResponse.getBytes().length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(errorResponse.getBytes());
            }
        } catch (Exception e) {
            // Fallback for critical errors
            exchange.sendResponseHeaders(500, 0);
            exchange.getResponseBody().close();
        }
    }
}