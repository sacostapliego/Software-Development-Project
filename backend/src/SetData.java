import java.util.List;
import java.util.Map;

public class SetData {
    private static SqlCon sqlCon = SqlCon.getConnection();

    public SetData() {
        // Default constructor
    }
    /*
     * This method is used to set the employee data in the database.
     * It takes an Employee object as a parameter and updates the employee's information in the database.
     * Set the employee information using getters and setters, then call this method to update the database.
     */
    public static void updateEmployee(Employee emp) {
        String sql = "UPDATE employees SET fname = ?, lname = ?, email = ?, hiredate = ?, salary = ?, ssn = ? WHERE empid = ?";
        String[] params = {emp.getFname(), emp.getLname(), emp.getEmail(), emp.getHire_date(), String.valueOf(emp.getSalary()), emp.getSsn(), String.valueOf(emp.getEmp_id())};
        
        sqlCon.executeUpdate(sql, params);
        
    }

    public static void batch_raise(int min_salary, int max_salary, float raise) {
        String sql = "UPDATE employees SET salary = salary * ? WHERE salary BETWEEN ? AND ?";
        int[] params = {min_salary, max_salary};
        
        sqlCon.executeUpdate(sql, raise, params);
    }

    public static void resetPassword(int empid) {
        String sql = "UPDATE employees SET password = NULL WHERE empid = ?";
        String[] params = {String.valueOf(empid)};
        
        sqlCon.executeUpdate(sql, params);
    }

    public static int addEmployee(String fname, String lname, String email, double salary) {
        //generate a new employee ID
        String sql = "SELECT MAX(empid) FROM employees";
        List<Map<String, Object>> result = sqlCon.executeQuery(sql);
        int empid = 0;
        if (result != null && !result.isEmpty()) {
            Map<String, Object> row = result.get(0);
            empid = (Integer) row.get("max(empid)") + 1;
        } else {
            empid = 1; // If no employees exist, start with ID 1
        }

        String sql2 = "INSERT INTO employees (empid, fname, lname, email, hiredate, salary, ssn, password) VALUES (?, ?, ?, ?, NULL, ?, NULL, NULL)";
        String[] params = {
            String.valueOf(empid),
            fname,
            lname,
            email,
            String.valueOf(salary),
        };
        
        sqlCon.executeUpdate(sql2, params);

        
        return empid;
    }
}