package models;

public class Enrollments {
    private int course_id, course_hours;
	private String dept_id, course_name;
	
	public Enrollments() {
	}
	
	public void addCourse(String dept_id, int course_id, String course_name, int course_hours) {
		this.dept_id = dept_id;
		this.course_id = course_id;
		this.course_name = course_name;
		this.course_hours = course_hours;
	}
	public int getCourseID() {
		return  course_id;
	}
	public int getCourseHours() {
		return course_hours;
	}
	public String getDeptID() {
		return dept_id;
	}
	public String getCourseName() {
		return course_name;
	}
	
}