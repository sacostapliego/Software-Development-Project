import models.*;
import db.DBConnection;
import java.sql.*;
import java.util.ArrayList;

public class SMS {
    public static void main(String[] args) {
        //Reports("enrollment");
        Reports("department");
    }
    
    public static void Reports(String reportName) {
        ArrayList<Student> students = new ArrayList<>();
        Connection myConn = null;
        Statement myStmt = null;
        ResultSet myRS = null;
     
        String sqlcommand = "SELECT student_id, firstname, lastname, classify, major "+ 
                           "FROM students ORDER BY student_id; ";
        
        try {
            myConn = DBConnection.getConnection();
            myStmt = myConn.createStatement();
            myRS = myStmt.executeQuery(sqlcommand);

            while (myRS.next()) {
                Student temp = new Student();
                temp.setStudent_id(myRS.getInt(1));
                temp.setFname(myRS.getString(2));
                temp.setLname(myRS.getString(3));
                temp.setClassify(myRS.getString(4));
                temp.setMajor(myRS.getString(5));
                temp.setEnrolled_courses();
                students.add(temp);
            }
        } catch (Exception e) {
            System.out.println("ERROR " + e.getLocalizedMessage());
        } finally {
            try {
                if (myRS != null) myRS.close();
                if (myStmt != null) myStmt.close();
            } catch (SQLException e) {
                System.out.println("ERROR closing resources: " + e.getLocalizedMessage());
            }
        }

        if(reportName.toLowerCase().equals("enrollment")) {
            PrintEnrollments(students);
        } else if(reportName.toLowerCase().equals("department")) {
            ArrayList<Department> departments = new ArrayList<>(); 
            
            String sqlcmd = "SELECT dept_id, dept_name, building "+ 
                            "FROM department ORDER BY dept_id; ";
            
            Connection deptConn = null;
            Statement deptStmt = null;
            ResultSet deptRS = null;

            try {
                deptConn = DBConnection.getConnection();
                deptStmt = deptConn.createStatement();
                deptRS = deptStmt.executeQuery(sqlcmd);

                while (deptRS.next()) {
                    Department temp = new Department();
                    temp.setDept_id(deptRS.getString("dept_id"));
                    temp.setDept_name(deptRS.getString("dept_name"));
                    temp.setLocation(deptRS.getString("building"));
                    departments.add(temp);
                }
            } catch (Exception e) {
                System.out.println("ERROR " + e.getLocalizedMessage());
            } finally {
                try {
                    if (deptRS != null) deptRS.close();
                    if (deptStmt != null) deptStmt.close();
                } catch (SQLException e) {
                    System.out.println("ERROR closing resources: " + e.getLocalizedMessage());
                }
            }
            
            PrintDepartments(students, departments);
        } else {
            System.out.println("\n\n****ERROR**** Invalid report requested\n\n");
        }
    }
    
    public static void PrintEnrollments(ArrayList<Student> myStudents) {
        System.out.println("\n\n\nStudent Enrollment Report by Steven\n");
        System.out.println("ID   CLASS\t MAJOR\t NAME\t\t\tEnrollments");
        for(Student s:myStudents) {
            System.out.println(s.getStudent_id()+"   "+s.getClassify()+"\t "+s.getMajor()+"\t "+s.getFname()+
                    " "+s.getLname());
           
            ArrayList<Enrollments> e1 = new ArrayList<>();
            e1.addAll(s.getEnrolled_courses());
            for(Enrollments eStudent:e1) {
                System.out.println("\t\t\t\t\t\t"+
                        (e1.indexOf(eStudent)+1)+") "+ eStudent.getDeptID()+"-"+eStudent.getCourseID()
                        +", HRS:"+eStudent.getCourseHours()
                        +", "+eStudent.getCourseName());
            }
            System.out.println("\t\t\t\t\t\t-----------------------------------------");
        }
    }
    
    public static void PrintDepartments(ArrayList<Student> myStudents, ArrayList<Department> myDepts) {
        System.out.println("\n\n\nDepartment with Student Majors Report\n");
        System.out.printf("%-8s %-12s %-36s %-10s\n","Major","Location","Department","Students");
        System.out.printf("%-8s %-12s %-36s %-32s\n","-----","--------","----------","-----------------------------------------");
        
        for(Department d:myDepts) {
            System.out.printf("%-8s %-12s %-37s",d.getDept_id(),d.getLocation(),d.getDept_name());
            
            boolean bNotFirst = false;
            for(Student s:myStudents) {
                if (d.getDept_id().equals(s.getMajor())) {
                    if (!bNotFirst) {
                        System.out.println(s.getFname() + " " + s.getLname() + "   \t" + s.getClassify());
                        bNotFirst = true;
                    } else {
                        System.out.printf("%-58s %s %s\n", " ", s.getFname(), s.getLname() +"   \t" + s.getClassify());
                    }
                }
            }
            System.out.printf("%-58s %32s\n"," ","-----------------------------------------");
        }
    }
}