package models;

public class Department {
    private String dept_id, dept_name, location;

	public Department() {
		//no initialized values in default constructor
		//create the setters and getters for the three variables
		//use these in the SMS.java file
	}
	
	public String getDept_id() {
		return dept_id;
	}

	public void setDept_id(String dept_id) {
		this.dept_id = dept_id;
	}

	public String getDept_name() {
		return dept_name;
	}

	public void setDept_name(String dept_name) {
		this.dept_name = dept_name;
	}

	public String getLocation() {
		return location;
	}
	
	public void setLocation(String location) {
		this.location = location;
	}
}