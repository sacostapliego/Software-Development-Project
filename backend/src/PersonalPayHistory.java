import java.util.List;
import java.util.Map;
import java.math.BigDecimal; // Import BigDecimal class

public class PersonalPayHistory implements IReport {
    private StringBuilder report;
    private int empid;
    private SqlCon sqlCon = SqlCon.getConnection();

    public PersonalPayHistory(int empid){
        this.report = new StringBuilder();
        this.empid = empid;
    }

    public void generateReport() {
        String sql = "SELECT * FROM payroll WHERE empid = ?";
        int[] params = {empid};
        List<Map<String, Object>> result = sqlCon.executeQuery(sql, params);

        if (result.isEmpty()) {
            report.append("No payroll history found for employee ID: ").append(empid).append("\n");
            return;
        }

        report.append("Payroll History for Employee ID: ").append(empid).append("\n");
        report.append("-------------------------------------------------\n");

        for (Map<String, Object> row : result) {
            String payDate = row.get("pay_date").toString();
            double earnings = ((BigDecimal) row.get("earnings")).doubleValue();
            report.append("Pay Date: ").append(payDate).append(", Earnings: ").append(earnings).append("\n");
        }
    }

    public String getReport() {
        return report.toString();
    }
}