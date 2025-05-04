import java.util.List;
import java.util.Map;


public class Employee {
    private int emp_id;
    private String fname;
    private String lname;
    private String email;
    private String hire_date;
    private int salary;
    private String ssn;
    //private String DOB; // Date of Birth

    private SqlCon sqlCon = SqlCon.getConnection(); 

    public Employee() {
        // Default constructor
    }

    public Employee(int emp_id) {
        this.emp_id = emp_id;
    }

    public Employee(int emp_id, String fname, String lname, String email, String hire_date, int salary, String ssn) {
        this.emp_id = emp_id;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.hire_date = hire_date;
        this.salary = salary;
        this.ssn = ssn;
    }
    public int getEmp_id() {
        return emp_id;
    }
    public void setEmp_id(int emp_id) {
        this.emp_id = emp_id;
    }
    public String getFname() {
        return fname;
    }
    public void setFname(String fname) {
        this.fname = fname;
    }
    public String getLname() {
        return lname;
    }
    public void setLname(String lname) {
        this.lname = lname;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getHire_date() {
        return hire_date;
    }
    public void setHire_date(String hire_date) {
        this.hire_date = hire_date;
    }
    public int getSalary() {
        return salary;
    }
    public void setSalary(int salary) {
        this.salary = salary;
    }
    public String getSsn() {
        return ssn;
    }
    public void setSsn(String ssn) {
        this.ssn = ssn;
    }
    /* 
    public String getDOB() {
        return DOB;
    }
    public void setDOB(String DOB) {
        this.DOB = DOB;
    }*/

    //assuming empid is set
    public void populate() {
        String sql = "SELECT empid, fname, lname, email, hireDate, salary, ssn FROM employees WHERE empid = ?";
        int[] params = {emp_id};
        List<Map<String, Object>> result = sqlCon.executeQuery(sql, params);
        if (result.isEmpty()) {
            System.out.println("No employee found with empid: " + emp_id);
            return;
        }

        if (result.size() > 0) {
            Map<String, Object> row = result.get(0);
            this.emp_id = (Integer.parseInt(row.get("empid").toString()));
            this.fname = row.get("fname").toString();
            this.lname = row.get("lname").toString();
            this.email = row.get("email").toString();
            if (row.get("hiredate") == null) {
                this.hire_date = "No hire date found";
            } else {
                this.hire_date = row.get("hirefate").toString();
            }
            this.salary = (int) Float.parseFloat(row.get("salary").toString());
            if (row.get("ssn") == null) {
                this.ssn = "No ssn found";
            } else {
                this.ssn = row.get("ssn").toString();
            }
        }
        
    }

    public String toString() {
        return "Employee [empid=" + emp_id + ", fname=" + fname + ", lname=" + lname + ", email=" + email
                + ", hire_date=" + hire_date + ", salary=" + salary + ", ssn=" + ssn + "]";
    }
    
}