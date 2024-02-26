using DataAccess;
using DataModel;
using DataModel.Responses;

namespace BusinessLogic
{
    public class EmployeeBusinessLogic
    {
        private readonly EmployeeDataAccess employeeDataAccess;

        public EmployeeBusinessLogic()
        {
            employeeDataAccess = new();
        }

        public async Task<Employee> GetEmployee(Employee employee)
        {
            return await employeeDataAccess.GetEmployee(employee);
        }
    }
}
