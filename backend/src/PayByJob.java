import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.math.BigDecimal; // Import BigDecimal class

public class PayByJob implements IReport {
    private StringBuilder report;
    private SqlCon sqlCon = SqlCon.getConnection();
    private String month;
    
    public PayByJob(String month) {
        this.month = month;
        report = new StringBuilder();
    }

    public void generateReport() { //where month is "YYYY-MM"
        String sql1 = "Select empid, job_title_id from employee_job_titles";
        String sql2 = "Select earnings, empid from payroll where pay_date like ?";
        String sql3 = "Select job_title_id, job_title from job_titles";

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
        List<Map<String, Object>> jobResult = sqlCon.executeQuery(sql3);
        if (jobResult.isEmpty()) {
            report.append("No jobs found.\n");
            return;
        }

        // Create a map to store the total earnings for each job
        Map<Integer, Double> jobEarnings = new HashMap<>();
        while(result.size() > 0) {
            Map<String, Object> row = result.get(0);
            int empid = (Integer) row.get("empid");
            int job_id = (Integer) row.get("job_title_id");

            // Remove the first row from the result set
            result.remove(0);

            // Find the corresponding payroll record for this employee
            for (Map<String, Object> payrollRow : payrollResult) {
                if ((Integer) payrollRow.get("empid") == empid) {
                    double earnings = ((BigDecimal) payrollRow.get("earnings")).doubleValue();
                    jobEarnings.put(job_id, jobEarnings.getOrDefault(job_id, 0.0) + earnings);
                }
            }
        }

        for(Map<String, Object> jobRow : jobResult) {
            int job_id = (Integer) jobRow.get("job_title_id");
            String job_title = (String) jobRow.get("job_title");

            // Get the total earnings for this job
            double totalEarnings = jobEarnings.getOrDefault(job_id, 0.0);

            // Add to report
            report.append("Job Title: ").append(job_title).append("\t");
            report.append("Total Earnings: ").append(totalEarnings).append("\n");
        }
    }

    public String getReport() {
        return report.toString();
    }
}
