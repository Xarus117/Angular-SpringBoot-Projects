package com.gebczyk.employeemanager.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gebczyk.employeemanager.model.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    
}
