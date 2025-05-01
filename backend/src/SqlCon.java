import java.sql.*;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.List;

import db.DBConnection;

public class SqlCon {
    private static SqlCon instance = null;

    // No need for these variables anymore - they'll come from DBConnection
    // private String url;
    // private String user;
    // private String password;
    
    public SqlCon() {
        // Empty constructor - no need to set credentials here
    }

    private Connection getDBConnection() {
        // Use the DBConnection class to get the connection
        return DBConnection.getConnection();
    }

    // This was a singleton class at one point, but there isn't a need for it anymore.
    // The getConnection method is used to get the instance of the SqlCon class.
    public static SqlCon getConnection() {
        if (instance == null) {
            instance = new SqlCon();
        } 
        // Return the connection object
        return instance;
    }

    public List<Map<String, Object>> executeQuery(String sql) {
        // Prepare the SQL statement
        Connection myConn = getDBConnection();
        try (Statement stmt = myConn.createStatement()) {
            // Execute the query
            ResultSet rs = stmt.executeQuery(sql);
            
            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCount = rsmd.getColumnCount();
            List<Map<String, Object>> result = new ArrayList<>();
            while (rs.next()) {
                Map<String, Object> row = new HashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    String columnName = rsmd.getColumnName(i).toLowerCase();
                    Object value = rs.getObject(i);
                    row.put(columnName, value);
                }
                result.add(row);
            }
            rs.close(); // Close the ResultSet
            return result;

        } catch (SQLException e) {
            System.out.println("Error executing query: " + e.getMessage());
            // Don't exit the application, just return null
            return null;
        }
        // We don't close the connection here - DBConnection manages it
    }

    public List<Map<String, Object>> executeQuery(String sql, String[] params) {
        // Prepare the SQL statement with parameters if any
        Connection myConn = getDBConnection();
        try (PreparedStatement pstmt = myConn.prepareStatement(sql)) {
            // Set parameters if provided
            if (params != null) {
                for (int i = 0; i < params.length; i++) {
                    pstmt.setString(i + 1, params[i]);
                }
            }
            // Execute the query
            ResultSet rs = pstmt.executeQuery();
            
            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCount = rsmd.getColumnCount();
            List<Map<String, Object>> result = new ArrayList<>();
            while (rs.next()) {
                Map<String, Object> row = new HashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    String columnName = rsmd.getColumnName(i).toLowerCase();
                    Object value = rs.getObject(i);
                    row.put(columnName, value);
                }
                result.add(row);
            }
            rs.close(); // Close the ResultSet
            return result;
        } catch (SQLException e) {
            System.out.println("Error executing query: " + e.getMessage());
            return null;
        }
        // We don't close the connection here - DBConnection manages it
    }
    
    public List<Map<String, Object>> executeQuery(String sql, int[] params){
        Connection myConn = getDBConnection();
        try (PreparedStatement pstmt = myConn.prepareStatement(sql)) {
            // Set parameters if provided
            if (params != null) {
                for (int i = 0; i < params.length; i++) {
                    pstmt.setInt(i + 1, params[i]);
                }
            }
            // Execute the query
            ResultSet rs = pstmt.executeQuery();
            
            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCount = rsmd.getColumnCount();
            List<Map<String, Object>> result = new ArrayList<>();
            while (rs.next()) {
                Map<String, Object> row = new HashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    String columnName = rsmd.getColumnName(i).toLowerCase();
                    Object value = rs.getObject(i);
                    row.put(columnName, value);
                }
                result.add(row);
            }
            rs.close(); // Close the ResultSet
            return result;
        } catch (SQLException e) {
            System.out.println("Error executing query: " + e.getMessage());
            return null;
        }
        // We don't close the connection here - DBConnection manages it
    }

    public void executeUpdate(String sql, String[] params) {
        // Prepare the SQL statement with parameters if any
        Connection myConn = getDBConnection();
        try (PreparedStatement pstmt = myConn.prepareStatement(sql)) {
            // Set parameters if provided
            if (params != null) {
                for (int i = 0; i < params.length; i++) {
                    pstmt.setString(i + 1, params[i]);
                }
            }
            // Execute the update
            pstmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error executing update: " + e.getMessage());
        }
        // We don't close the connection here - DBConnection manages it
    }
    
    public void executeUpdate(String sql, int[] params) {
        // Prepare the SQL statement with parameters if any
        Connection myConn = getDBConnection();
        try (PreparedStatement pstmt = myConn.prepareStatement(sql)) {
            // Set parameters if provided
            if (params != null) {
                for (int i = 0; i < params.length; i++) {
                    pstmt.setInt(i + 1, params[i]);
                }
            }
            // Execute the update
            pstmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error executing update: " + e.getMessage());
        }
        // We don't close the connection here - DBConnection manages it
    }

    public void executeUpdate(String sql, float param, int params[]) {
        // Prepare the SQL statement with parameters if any
        Connection myConn = getDBConnection();
        try (PreparedStatement pstmt = myConn.prepareStatement(sql)) {
            // Set parameters if provided
            pstmt.setFloat(1, param);
            if (params != null) {
                for (int i = 0; i < params.length; i++) {
                    pstmt.setInt(i + 2, params[i]);
                }
            }
            // Execute the update
            pstmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error executing update: " + e.getMessage());
        }
        // We don't close the connection here - DBConnection manages it
    }
}