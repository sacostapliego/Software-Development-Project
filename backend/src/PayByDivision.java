import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.math.BigDecimal; // Import BigDecimal class

public class PayByDivision implements IReport {
    private StringBuilder report;
    private SqlCon sqlCon = SqlCon.getConnection();
    private String month;
    public PayByDivision(String month) {
        this.month = month;
        report = new StringBuilder();
    }

    public void generateReport() { //where month is "YYYY-MM"
        String sql1 = "Select * from employee_division";
        String sql2 = "Select earnings, empid from payroll where pay_date like ?";
        String sql3 = "Select ID, name from division";

        List<Map<String, Object>> result = sqlCon.executeQuery(sql1);
        if (result.isEmpty()) {
            report.append("No employees found.\n");
            return;
        }
        List<Map<String, Object>> payrollResult = sqlCon.executeQuery(sql2, new String[]{month + "%"});
        if (payrollResult.isEmpty()) {
            report.append("No payroll history found.\n");
            return;
        }
        List<Map<String, Object>> divisionResult = sqlCon.executeQuery(sql3);
        if (divisionResult.isEmpty()) {
            report.append("No divisions found.\n");
            return;
        }

        // Create a map to store the total earnings for each division
        Map<Integer, Double> divisionEarnings = new HashMap<>();

        while (result.size() > 0) {
            Map<String, Object> row = result.get(0);
            int empid = (Integer) row.get("empid");
            int div_id = (Integer) row.get("div_id");

            // Remove the first row from the result set
            result.remove(0);

            // Find the corresponding payroll record for this employee
            for (Map<String, Object> payrollRow : payrollResult) {
                if ((Integer) payrollRow.get("empid") == empid) {
                    double earnings = ((BigDecimal) payrollRow.get("earnings")).doubleValue();
                    divisionEarnings.put(div_id, divisionEarnings.getOrDefault(div_id, 0.0) + earnings);
                }
            }
        }

        for (Map<String, Object> divisionRow : divisionResult) {
            int div_id = (Integer) divisionRow.get("id");
            String div_name = (String) divisionRow.get("name");

            // Get the total earnings for this division
            double totalEarnings = divisionEarnings.getOrDefault(div_id, 0.0);

            // Append to the report
            report.append("Division: ").append(div_name).append("\tTotal Earnings: ").append(totalEarnings).append("\n");
        }
        
    }

    public String getReport() {
        return report.toString();
    }

}