import java.util.List;
import java.util.Map;


public class FullTimeEmpReport implements IReport {
    private StringBuilder report;
    private SqlCon sqlCon = SqlCon.getConnection(); 

    public FullTimeEmpReport() {
        report = new StringBuilder();
    }

    public void generateReport() {
        String sql = "SELECT empid, fname, lname FROM employees ORDER BY empid";
        List<Map<String, Object>> result = sqlCon.executeQuery(sql);
        if (result.isEmpty()) {
            report.append("No employees found.\n");
            return;
        }

        while (result.size() > 0) {
            Map<String, Object> row = result.get(0);
            int empid = (Integer) row.get("empid");
            //add employee ID then name to report
            report.append("Employee ID: ").append(empid).append("\t");
            report.append("Name: ").append(row.get("fname")).append(" ").append(row.get("fname")).append("\n");
            //get employee payroll history
            String sql2 = "SELECT empid, pay_date, earnings FROM payroll WHERE empid = ? ORDER BY pay_date";
            int[] params = {empid};

            //remove the first row from the result set
            result.remove(0);

            //execute query to get payroll history
            List<Map<String, Object>> payrollResult = sqlCon.executeQuery(sql2, params);
            if (payrollResult.isEmpty()) {
                report.append("\tNo payroll history found.\n");
                continue;
            }
            
            while (payrollResult.size() > 0) {
                Map<String, Object> row2 = payrollResult.get(0);
                report.append("\t");
                //add pay date and amount to report
                report.append("Pay Date: ").append( row2.get("pay_date") ).append("\t");
                report.append("Amount: ").append(row2.get("earnings")).append("\n");

                //remove the first row from the payroll result set
                payrollResult.remove(0);
            }
            
        }
        
    }

    public String getReport() {
        return report.toString();
    }
}