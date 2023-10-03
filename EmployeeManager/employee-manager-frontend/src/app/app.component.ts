import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private baseUrl = 'http://localhost:8080/employee'; // Replace with your backend URL

  title = "Employee Management";
  employeeForm: FormGroup;
  employeeEditForm: FormGroup;
  employees: any[] | undefined;
  employee: any;

  selectedEmployeeId: number | null = null;
  filteredEmployees: any[] | undefined; // Filtered list of employees
  searchTerm: string = ''; // Variable to store the search query

  constructor(private employeeService: EmployeeService, private http: HttpClient, private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobTitle: ['', Validators.required],
      phone: ['', Validators.required],
      imageUrl: ['', Validators.required],
      employeeCode: ['', Validators.required]
    });

    this.employeeEditForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobTitle: ['', Validators.required],
      phone: ['', Validators.required],
      imageUrl: ['', Validators.required],
      employeeCode: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getEmployees();
  }

  selectEmployee(id: number) {
    this.selectedEmployeeId = id;
  }

  getEmployees() {
    this.http.get(`${this.baseUrl}/all`).subscribe((data: any) => {
      this.employees = data;
      this.filteredEmployees = data; // Initially, display all employees
    });
  }

  addEmployee() {
    if (this.employeeForm && this.employeeForm.valid) {
      const formData: Employee = this.employeeForm.value;
      return this.http.post<Employee>(`${this.baseUrl}/add`, formData).subscribe(() => {
        this.getEmployees();
        this.employeeForm.reset(); // Reset the form
      });
    } else {
      return "Error";
    }
  }

  updateEmployee() {
    if (this.employeeEditForm && this.employeeEditForm.valid) {
      const formData: Employee = this.employeeEditForm.value;
      if (this.selectedEmployeeId) {
        formData.id = this.selectedEmployeeId;
      }
      return this.http.put<Employee>(`${this.baseUrl}/update`, formData).subscribe(() => {
        this.getEmployees();
        this.employeeEditForm.reset(); // Reset the form
        this.selectedEmployeeId = null; // Clear the selected employee ID
      });
    } else {
      return "Error";
    }
  }

  deleteEmployee(id: number) {
    this.http.delete(`${this.baseUrl}/delete/${id}`).subscribe(() => {
      this.getEmployees();
    });
  }

  searchEmployees() {
    console.log('searchEmployees() called');
    if (this.searchTerm.trim() === '') {
      // If the search term is empty, show all employees
      this.filteredEmployees = this.employees;
    } else {
      // Filter employees based on the search term (case-insensitive)
      if (this.employees) {
        this.filteredEmployees = this.employees.filter((employee: any) => {
          // Convert both the search term and data to lowercase for case-insensitive comparison
          const searchTermLower = this.searchTerm.toLowerCase();
          const employeeNameLower = employee.name.toLowerCase();
          const jobTitleLower = employee.jobTitle.toLowerCase();
          const emailLower = employee.email.toLowerCase();
          
          return (
            employeeNameLower.includes(searchTermLower) ||
            jobTitleLower.includes(searchTermLower) ||
            emailLower.includes(searchTermLower)
          );
        });
      }
    }
  }
}
