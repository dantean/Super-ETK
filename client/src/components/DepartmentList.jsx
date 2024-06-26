import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useQuery } from '@apollo/client';
import { GET_ALL_EMPLOYEES } from '../utils/queries';
import auth from '../utils/auth';

const DepartmentList = ({ departments, onReassign, onDelete }) => {
  const { loading, data } = useQuery(GET_ALL_EMPLOYEES);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (data) {
      setEmployees(data.getAllEmployees);
    }
  }, [data]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!auth.loggedIn()) {
    return <h2 className='text-center'>Please Log In.</h2>;
  }

  return (
    <div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Employee Name</th>
            <th>Employee Email</th>
            <th>Department</th>
            <th>Reassign</th>
            <th>Terminate Employee</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department.name}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle className='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    Reassign
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                    {departments.map(department => (
                      <Dropdown.Item key={department._id} className='dropdown-item' onClick={() => onReassign(employee._id, employee.department._id, department._id)}>
                        {department.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td><button onClick={() => onDelete(employee._id)}>Terminate Employee</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentList;
