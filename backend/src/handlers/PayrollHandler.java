import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PayrollHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (Server.handleCors(exchange, "GET, OPTIONS")) return;
        
        if ("GET".equals(exchange.getRequestMethod())) {
            String query = exchange.getRequestURI().getQuery();
            String empId = null;
            if (query != null) {
                String[] params = query.split("&");
                for (String param : params) {
                    String[] keyValue = param.split("=");
                    if (keyValue.length == 2 && keyValue[0].equals("empid")) {
                        empId = keyValue[1];
                        break;
                    }
                }
            }
            
            Connection conn = null;
            Statement stmt = null;
            ResultSet rs = null;
            
            try {
                conn = DBConnection.getConnection();
                stmt = conn.createStatement();
                String sql = "SELECT * FROM payroll";
                if (empId != null) {
                    sql += " WHERE empid = " + empId;
                }
                rs = stmt.executeQuery(sql);
                
                // Use Jackson for JSON serialization
                List<Map<String, Object>> payrollRecords = new ArrayList<>();
                
                while (rs.next()) {
                    Map<String, Object> payroll = new HashMap<>();
                    
                    payroll.put("payId", rs.getInt("payID"));
                    payroll.put("date", rs.getString("pay_date"));
                    payroll.put("empId", rs.getInt("empid"));
                    payroll.put("earnings", rs.getDouble("earnings"));
                    payroll.put("fedTax", rs.getDouble("fed_tax"));
                    payroll.put("fedMed", rs.getDouble("fed_med"));
                    payroll.put("stateTax", rs.getDouble("state_tax"));
                    
                    payrollRecords.add(payroll);
                }
                
                Server.sendJsonResponse(exchange, payrollRecords);
                
            } catch (Exception e) {
                Server.sendErrorResponse(exchange, 500, e.getMessage());
            } finally {
                try {
                    if (rs != null) rs.close();
                    if (stmt != null) stmt.close();
                } catch (SQLException e) {
                    System.err.println("Error closing resources: " + e.getMessage());
                }
            }
        } else {
            Server.sendErrorResponse(exchange, 405, "Method not allowed");
        }
    }
}
