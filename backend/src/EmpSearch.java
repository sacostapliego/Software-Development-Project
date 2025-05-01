import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class EmpSearch {
    private ArrayList<Employee> out;
    private SqlCon sqlCon = SqlCon.getConnection(); 

    public EmpSearch() {
        out = new ArrayList<>();
    }
    public ArrayList<Employee> getResult() {
        return out;
    }
    public void clearResult() {
        out.clear();
    }

    public void searchId(int emp_id) {
        String sql = "SELECT empid FROM employees WHERE empid = ?";
        int[] params = {emp_id};
        List<Map<String, Object>> result = sqlCon.executeQuery(sql, params);
        if (result.isEmpty()) {
            System.out.println("No employee found with ID: " + emp_id);
            return;
        }
        while (result.size() > 0) {
            Map<String, Object> row = result.get(0);
            Employee temp = new Employee((Integer.parseInt(row.get("empid").toString())));
            temp.populate();
            out.add(temp);
            //remove the first row from the result set
            result.remove(0);
        }
        
    }
    public void searchName(String fname, String lname) {
        String sql = "SELECT empid FROM employees WHERE fname = ? AND lname = ?";
        String[] params = {fname, lname};
        List<Map<String, Object>> result = sqlCon.executeQuery(sql, params);
        if (result.isEmpty()) {
            return;
        }
        
        while (result.size() > 0) {
            Map<String, Object> row = result.get(0);
            Employee temp = new Employee(Integer.parseInt(row.get("empid").toString()));
            temp.populate();
            out.add(temp);
            //remove the first row from the result set
            result.remove(0);
        }
        
    }
    public void searchSsn(String ssn) {
        String sql = "SELECT empid FROM employees WHERE ssn = ?";
        String[] params = {ssn};
        List<Map<String, Object>> result = sqlCon.executeQuery(sql, params);
        if (result.isEmpty()) {
            return;
        }
        while (result.size() > 0) {
            Map<String, Object> row = result.get(0);
            Employee temp = new Employee(Integer.parseInt(row.get("empid").toString()));
            temp.populate();
            out.add(temp);
            //remove the first row from the result set
            result.remove(0);
        }
        
    }

    public void searchDob(String DOB) {
        String sql = "SELECT empid FROM address WHERE DOB = ?";
        String[] params = {DOB};
        List<Map<String, Object>> result = sqlCon.executeQuery(sql, params);
        if (result.isEmpty()) {
            return;
        }
        while (result.size() > 0) {
            Map<String, Object> row = result.get(0);
            Employee temp = new Employee(Integer.parseInt(row.get("empid").toString()));
            temp.populate();
            out.add(temp);
            //remove the first row from the result set
            result.remove(0);
        }
        
    }

    public String toString() {
        StringBuilder sb = new StringBuilder();
        for (Employee emp : out) {
            sb.append(emp.toString()).append("\n");
        }
        return sb.toString();
    }
    
}