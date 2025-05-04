import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class ReportsHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (Server.handleCors(exchange, "GET, OPTIONS")) return;
        
        if ("GET".equals(exchange.getRequestMethod())) {
            String path = exchange.getRequestURI().getPath();
            String reportType = path.split("/")[3]; // Get report type from URL
            String query = exchange.getRequestURI().getQuery();
            Map<String, String> queryParams = parseQuery(query);
            
            String reportContent = "";
            
            switch (reportType) {
                case "fulltime":
                    FullTimeEmpReport fulltimeReport = new FullTimeEmpReport();
                    fulltimeReport.generateReport();
                    reportContent = fulltimeReport.getReport();
                    break;
                    
                case "division":
                    String divMonth = queryParams.get("month");
                    if (divMonth == null || divMonth.isEmpty()) {
                        Server.sendErrorResponse(exchange, 400, "Month parameter is required");
                        return;
                    }
                    PayByDivision divisionReport = new PayByDivision(divMonth);
                    divisionReport.generateReport();
                    reportContent = divisionReport.getReport();
                    break;
                    
                case "job":
                    String jobMonth = queryParams.get("month");
                    if (jobMonth == null || jobMonth.isEmpty()) {
                        Server.sendErrorResponse(exchange, 400, "Month parameter is required");
                        return;
                    }
                    PayByJob jobReport = new PayByJob(jobMonth);
                    jobReport.generateReport();
                    reportContent = jobReport.getReport();
                    break;
                    
                default:
                    Server.sendErrorResponse(exchange, 400, "Invalid report type");
                    return;
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("report", reportContent);
            
            Server.sendJsonResponse(exchange, response);
            
        } else {
            Server.sendErrorResponse(exchange, 405, "Method not allowed");
        }
    }
    
    private Map<String, String> parseQuery(String query) {
        Map<String, String> params = new HashMap<>();
        if (query == null || query.isEmpty()) {
            return params;
        }
        
        String[] pairs = query.split("&");
        for (String pair : pairs) {
            String[] keyValue = pair.split("=");
            if (keyValue.length == 2) {
                params.put(keyValue[0], keyValue[1]);
            }
        }
        
        return params;
    }
}