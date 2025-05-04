import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.math.BigDecimal;

public class PersonalPayrollHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (Server.handleCors(exchange, "GET, OPTIONS")) return;
        
        if ("GET".equals(exchange.getRequestMethod())) {
            String path = exchange.getRequestURI().getPath();
            int empId = Integer.parseInt(path.split("/")[3]);
            
            // Get payroll data
            SqlCon sqlCon = SqlCon.getConnection();
            String sql = "SELECT * FROM payroll WHERE empid = ? ORDER BY pay_date DESC";
            int[] params = {empId};
            List<Map<String, Object>> result = sqlCon.executeQuery(sql, params);
            
            // Convert to response format
            List<Map<String, Object>> responseData = new ArrayList<>();
            for (Map<String, Object> row : result) {
                Map<String, Object> payrollEntry = new HashMap<>();
                payrollEntry.put("pay_date", row.get("pay_date").toString());
                payrollEntry.put("earnings", ((BigDecimal) row.get("earnings")).doubleValue());
                payrollEntry.put("fed_tax", ((BigDecimal) row.get("fed_tax")).doubleValue());
                payrollEntry.put("fed_med", ((BigDecimal) row.get("fed_med")).doubleValue());
                payrollEntry.put("fed_SS", ((BigDecimal) row.get("fed_ss")).doubleValue());
                payrollEntry.put("state_tax", ((BigDecimal) row.get("state_tax")).doubleValue());
                payrollEntry.put("retire_401k", ((BigDecimal) row.get("retire_401k")).doubleValue());
                payrollEntry.put("health_care", ((BigDecimal) row.get("health_care")).doubleValue());
                
                responseData.add(payrollEntry);
            }
            
            Server.sendJsonResponse(exchange, responseData);
        } else {
            Server.sendErrorResponse(exchange, 405, "Method not allowed");
        }
    }
}