/* 
// Session.java
// This class is used to manage the session of the application, including user login and logout.
*/

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;


public class Session {
    private String email;
    private boolean loggedIn = false;
    private int empid;
    private boolean isadmin = false;
    private SqlCon sqlCon = SqlCon.getConnection(); // Assuming SqlCon is a class that manages database connections

    public Session() {
        // Constructor
    }

    public boolean isLoggedIn() {
        return loggedIn;
    }

    public int getEmpid() {
        return empid;
    }
    public boolean isAdmin() {
        return isadmin;
    }
    public String getEmail() {
        return email;
    }

    public void logout() {
        this.loggedIn = false;
        this.isadmin = false;
        this.email = null;
        this.empid = 0;
        System.out.println("User logged out, all state reset");
    }

    public boolean login(String email, String password) {
        // Logic to check credentials against the database
        if (checkCredentials(email, password)) {
            this.email = email;
            loggedIn = true;
            System.out.println("Login successful for user: " + email);

            // Check if the user is an admin
            int ADMIN_DIVID = 3;
            String sql = "SELECT div_ID from employee_division WHERE empid = ?";
            String[] params = {String.valueOf(empid)};
            List<Map<String, Object>> result = sqlCon.executeQuery(sql, params);
            
            if (result != null && !result.isEmpty()) {
                Map<String, Object> row = result.get(0);
                int divID = (Integer.parseInt(row.get("div_id").toString()));
                System.out.println("User division ID: " + divID);
                if (divID == ADMIN_DIVID) {
                    isadmin = true;
                    System.out.println("User is an admin.");
                } else {
                    isadmin = false;
                    System.out.println("User is not an admin.");
                }
            }

            return true;
        } else {
            System.out.println("Login failed for user: " + email);
            return false;
        }
    }
    
    public void createPassword(String email, String password) {
        // Logic to create a new user in the database
        String sql = "UPDATE employees set password = ? WHERE email = ?";
        
        // Hash password using SHA-256
        String hashedPassword = hashPassword(password); 
        if (hashedPassword == null) {
            System.out.println("Error hashing password.");
            return;
        }

        // Prepare the SQL statement with parameters
        String[] params = {hashedPassword, email};
        sqlCon.executeUpdate(sql, params);
    }

    public boolean resetPassword(String email, String password, String newPassword) {
        // Logic to reset the password in the database
        String sql = "UPDATE employees set password = ? WHERE email = ?";
        
        // Hash password using SHA-256
        String hashedPassword = hashPassword(password); 
        if (hashedPassword == null) {
            System.out.println("Error hashing password.");
            return false;
        }
        String hashedNewPassword = hashPassword(newPassword);
        if (hashedNewPassword == null) {
            System.out.println("Error hashing new password.");
            return false;
        }

        if (!checkCredentials(email, password)) {
            System.out.println("Current password is incorrect.");
            return false; // Current password is incorrect
        }

        // Prepare the SQL statement with parameters
        String[] params = {hashedNewPassword, email};
        sqlCon.executeUpdate(sql, params);
        return true; // Password reset successful
    }

    public boolean checkCredentials(String email, String password) {
        // Logic to check credentials against the database
        String sql = "SELECT empid, password FROM employees WHERE email = ?";

        // Hash password using SHA-256
        String hashedPassword = hashPassword(password); 
        if (hashedPassword == null) {
            System.out.println("Error hashing password.");
            return false;
        }

        // Prepare the SQL statement with parameters
        String[] params = {email};
        List<Map<String, Object>> result = sqlCon.executeQuery(sql, params);

        System.out.println("Checking credentials for user: " + email);
        
        if (result != null && !result.isEmpty()) {
            Map<String, Object> row = result.get(0);
            System.out.println("User found in database: " + email);
            // Check if the hashed password matches the one in the database
            String dbPassword = (String) row.get("password");
            if (dbPassword == null) {
                System.out.println("Password not found in database. Setting entered password to new password");
                // Create a new password in the database
                createPassword(email, password);
            }
            else if (!dbPassword.equals(hashedPassword)) {
                return false; // Password does not match
            }
            empid = (Integer.parseInt(row.get("empid").toString()));
            return true;
        }
        
        System.out.println("No user found with the provided email.");
        return false;
    }

    //method to hash password using SHA-256
    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            System.out.println("Error hashing password: " + e.getMessage());
            System.exit(1);
        }
        return null;
    }
}