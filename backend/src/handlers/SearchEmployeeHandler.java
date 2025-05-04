import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SearchEmployeeHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (Server.handleCors(exchange, "POST, OPTIONS")) return;
        
        if ("POST".equals(exchange.getRequestMethod())) {
            try {
                // Parse the JSON request body
                JsonNode requestBody = Server.parseRequestBody(exchange);
                String searchType = requestBody.get("searchType").asText();
                
                EmpSearch empSearch = new EmpSearch();
                
                switch (searchType) {
                    case "id":
                        int empId = requestBody.get("value").asInt();
                        empSearch.searchId(empId);
                        break;
                    case "name":
                        String firstName = requestBody.get("firstName").asText();
                        String lastName = requestBody.get("lastName").asText();
                        empSearch.searchName(firstName, lastName);
                        break;
                    case "ssn":
                        String ssn = requestBody.get("value").asText();
                        empSearch.searchSsn(ssn);
                        break;
                    case "dob":
                        String dob = requestBody.get("value").asText();
                        empSearch.searchDob(dob);
                        break;
                    default:
                        Server.sendErrorResponse(exchange, 400, "Invalid search type");
                        return;
                }
                
                ArrayList<Employee> result = empSearch.getResult();
                List<Map<String, Object>> responseList = new ArrayList<>();
                
                for (Employee emp : result) {
                    Map<String, Object> empData = new HashMap<>();
                    empData.put("id", emp.getEmp_id());
                    empData.put("firstName", emp.getFname());
                    empData.put("lastName", emp.getLname());
                    empData.put("email", emp.getEmail());
                    empData.put("hireDate", emp.getHire_date());
                    empData.put("salary", emp.getSalary());
                    empData.put("ssn", emp.getSsn());
                    responseList.add(empData);
                }
                
                Server.sendJsonResponse(exchange, responseList);
            } catch (Exception e) {
                Server.sendErrorResponse(exchange, 400, "Error: " + e.getMessage());
            }
        } else {
            Server.sendErrorResponse(exchange, 405, "Method not allowed");
        }
    }
}