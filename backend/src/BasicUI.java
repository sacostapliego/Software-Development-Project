import java.util.Scanner;


public class BasicUI {

    private static Scanner scanner = new Scanner(System.in);
    private static Session session = Session.getInstance();
    public static void main(String[] args) {

        System.out.println("Welcome to the Employee Management System!");
        
        if (!session.isLoggedIn()) {
            System.out.println("Please enter your email:");
            String username = scanner.nextLine();
            System.out.println("Please enter your password:");
            String password = scanner.nextLine();

            if (session.login(username, password)) {
            } else {
                System.out.println("Login failed. Please check your credentials.");
                scanner.close();
                return;
            }
        }

        if (session.isAdmin()) {
            adminUI();
        } else {
            userUI();
        }
    }

    public static void adminUI() {
        // Admin UI logic here
        System.out.println("Welcome to the Admin UI!");
        // Add admin functionalities here
        System.out.println("1. View Reports");
        System.out.println("2. Search Employees");
        System.out.println("3. Update Employees");
        System.out.println("4. Batch raise");
        System.out.println("5. reset password");
        System.out.println("6. add new employee");
        System.out.println("7. Exit");
        System.out.print("Please select an option: ");
        int choice = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        switch (choice) {
            case 1:
                // View Reports logic
                generateReport();
                break;
            case 2:
                // Search Employees logic
                searchEmployee();
                break;
            case 3:
                // Update Employees logic
                updateEmployee();
                break;
            case 4:
                // Batch raise logic
                batchRaise();
                break;
            case 5:
                resetPassword();
                break;
            case 6:
                addNewEmployee();
                break;
            case 7:
                exit();
                break;
            default:
                System.out.println("Invalid choice. Please try again.");
        }

        System.out.println("Thank you for using the Employee Management System!");
        restart();
    }

    public static void userUI() {
        // User UI logic here
        System.out.println("Welcome to the User UI!");
        // Add user functionalities here
        System.out.println("1. View Profile");
        System.out.println("2. View pay history report");
        System.out.println("3. change password");
        System.out.println("4. EXIT");
        System.out.print("Please select an option: ");
        int choice = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        switch (choice) {
            case 1:
                // View Profile logic
                viewProfile();
                break;
            case 2:
                // View pay history report logic
                viewPayHistoryReport();
                break;
            case 3:
                changePassword();
                break;
            case 4:
                exit();
                break;
            default:
                System.out.println("Invalid choice. Please try again.");
        }
        System.out.println("Thank you for using the Employee Management System!");
        restart();
    }

    public static void generateReport() {
        System.out.println("Which report should be generated?");
        System.out.println("1. Full Time Employee Report");
        System.out.println("2. Division Payroll Report");
        System.out.println("3. Job Title Payroll Report");
        System.out.println("4. Exit");
        System.out.print("Please select an option: ");
        int choice = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        switch (choice) {
            case 1:
                // Generate Full Time Employee Report logic
                System.out.println("Generating Full Time Employee Report...");
                FullTimeEmpReport report = new FullTimeEmpReport();
                report.generateReport();
                System.out.println(report.getReport());
                break;
            case 2:
                // Generate Division Payroll Report logic
                System.out.println("Generating Division Payroll Report...");
                System.out.println("Please enter the month (YYYY-MM):");
                String month = scanner.nextLine();
                PayByDivision divisionReport = new PayByDivision(month);
                divisionReport.generateReport();
                System.out.println(divisionReport.getReport());
                break;
            case 3:
                // Generate Job Title Payroll Report logic
                System.out.println("Generating Job Title Payroll Report...");
                System.out.println("Please enter the month (YYYY-MM):");
                String monthJob = scanner.nextLine();
                PayByJob jobReport = new PayByJob(monthJob);
                jobReport.generateReport();
                System.out.println(jobReport.getReport());
                break;
            case 4:
                exit();
                break;
            default:
                System.out.println("Invalid choice. Please try again.");
        }
    }

    public static void searchEmployee() {
        //search by empid, name, ssn, dob
        System.out.println("Please enter the search criteria:");
        System.out.println("1. Employee ID");
        System.out.println("2. Name");
        System.out.println("3. SSN");
        System.out.println("4. Date of Birth");
        System.out.println("5. Exit");
        System.out.print("Please select an option: ");
        int choice = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        EmpSearch empSearch = new EmpSearch();

        switch (choice) {
            case 1:
                // Search by Employee ID logic
                System.out.println("Enter Employee ID:");
                int empId = scanner.nextInt();
                scanner.nextLine(); // Consume newline
                empSearch.searchId(empId);
                //print output using empSearch.toString()
                System.out.println(empSearch.toString());
                break;
            case 2:
                // Search by Name logic
                System.out.println("Enter First Name:");
                String firstName = scanner.nextLine();
                System.out.println("Enter Last Name:");
                String lastName = scanner.nextLine();
                empSearch.searchName(firstName, lastName);
                //print output using empSearch.toString()
                System.out.println(empSearch.toString());
                break;
            case 3:
                // Search by SSN logic
                System.out.println("Enter SSN:");
                String ssn = scanner.nextLine();
                // Call search method with ssn
                empSearch.searchSsn(ssn);
                //print output using empSearch.toString()
                System.out.println(empSearch.toString());
                break;
            case 4:
                // Search by Date of Birth logic
                System.out.println("Enter Date of Birth (YYYY-MM-DD):");
                String dob = scanner.nextLine();
                // Call search method with dob
                empSearch.searchDob(dob);
                //print output using empSearch.toString()
                System.out.println(empSearch.toString());
                break;
            case 5:
                exit();
                break;
            default:
                System.out.println("Invalid choice. Please try again.");
        }
    }

    public static void updateEmployee() {
        // Update employee logic here
        System.out.println("Please enter the Employee ID to update:");
        int empId = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        Employee emp = new Employee(empId);
        emp.populate(); // Populate employee data from database

        System.out.println("Current Employee Data:");
        System.out.println("First Name: " + emp.getFname());
        System.out.println("Last Name: " + emp.getLname());
        System.out.println("Email: " + emp.getEmail());
        System.out.println("Hire Date: " + emp.getHire_date());
        System.out.println("Salary: " + emp.getSalary());
        System.out.println("SSN: " + emp.getSsn());

        System.out.println("Enter new First Name (or press Enter to keep current): ");
        String newFname = scanner.nextLine();
        if (!newFname.isEmpty()) {
            emp.setFname(newFname);
        }
        System.out.println("Enter new Last Name (or press Enter to keep current): ");
        String newLname = scanner.nextLine();
        if (!newLname.isEmpty()) {
            emp.setLname(newLname);
        }
        System.out.println("Enter new Email (or press Enter to keep current): ");
        String newEmail = scanner.nextLine();
        if (!newEmail.isEmpty()) {
            emp.setEmail(newEmail);
        }
        System.out.println("Enter new Hire Date (or press Enter to keep current): ");
        String newHireDate = scanner.nextLine();
        if (!newHireDate.isEmpty()) {
            emp.setHire_date(newHireDate);
        }
        System.out.println("Enter new Salary (or press Enter to keep current): ");
        String newSalaryStr = scanner.nextLine();
        if (!newSalaryStr.isEmpty()) {
            int newSalary = Integer.parseInt(newSalaryStr);
            emp.setSalary(newSalary);
        }
        System.out.println("Enter new SSN (or press Enter to keep current): ");
        String newSsn = scanner.nextLine();
        if (!newSsn.isEmpty()) {
            emp.setSsn(newSsn);
        }

        System.out.println("Updating employee...");
        // Add update functionalities here
        SetData.updateEmployee(emp);
        System.out.println("Employee updated successfully!");
        restart();
    }
    public static void batchRaise() {
        // Batch raise logic here
        System.out.println("Please enter the minimum salary:");
        int minSalary = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        System.out.println("Please enter the maximum salary:");
        int maxSalary = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        System.out.println("Please enter the raise multiplier (e.g., 1.05 for 5%):");
        float raise = scanner.nextFloat();
        scanner.nextLine(); // Consume newline

        System.out.println("Processing batch raise...");
        SetData.batch_raise(minSalary, maxSalary, raise);
        System.out.println("Batch raise processed successfully!");
        restart();

    }

    public static void resetPassword() {
        // Reset password logic here
        System.out.println("Please enter the Employee ID to reset password:");
        int empId = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        SetData.resetPassword(empId);
        System.out.println("Password reset successfully for Employee ID: " + empId);
        restart();
    }

    public static void addNewEmployee() {
        // Add new employee logic here
        System.out.println("Please enter the First Name:");
        String firstName = scanner.nextLine();
        System.out.println("Please enter the Last Name:");
        String lastName = scanner.nextLine();

        System.out.println("Please enter the Email:");
        String email = scanner.nextLine();
        System.out.println("Please enter the Salary:");
        double salary = scanner.nextDouble();

        int empId = SetData.addEmployee(firstName, lastName, email, salary);
        System.out.println("New employee added successfully with Employee ID: " + empId);
        restart();
    }

    public static void viewProfile() {
        // View profile logic here
        System.out.println("Viewing profile...");
        int empid = session.getEmpid();
        EmpSearch search = new EmpSearch();
        search.searchId(empid);
        System.out.println("Employee information: ");
        System.out.println(search);
    }
    public static void viewPayHistoryReport() {
        // View pay history report logic here
        System.out.println("Generating pay history report...");
        int empid = session.getEmpid();
        PersonalPayHistory report = new PersonalPayHistory(empid);
        report.generateReport();
        System.out.println(report.getReport());
    }

    public static void changePassword() {
        // Change password logic here
        String email = session.getEmail();
        System.out.println("Please enter your current password:");
        String currentPassword = scanner.nextLine();
        System.out.println("Please enter your new password:");
        String newPassword = scanner.nextLine();

        session.resetPassword(email, currentPassword, newPassword);
        System.out.println("Password changed successfully!");
        restart();
    }

    public static void restart() {
        
        System.out.println("Do you want to restart the application? (yes/no)");
        String choice = scanner.nextLine();
        if (choice.equalsIgnoreCase("yes")) {
            System.out.println("Restarting application...");
            main(new String[0]);
        } else {
            exit();
        }
    }

    public static void exit() {
        System.out.println("Exiting...");
        scanner.close();
        System.exit(0);
    }
}