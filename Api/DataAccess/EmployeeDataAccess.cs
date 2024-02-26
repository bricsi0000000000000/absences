using DataModel;
using DataModel.Responses;

namespace DataAccess
{
    public class EmployeeDataAccess
    {
        public static readonly List<Employee> Employees = new()
        {
            new()
            {
                Id = 1,
                Name = "John Doe",
            },
            new()
            {
                Id = 2,
                Name = "Alice Smith",
            },
            new()
            {
                Id = 3,
                Name = "Bob Johnson",
            },
            new()
            {
                Id = 4,
                Name = "Emily Brown",
            },
            new()
            {
                Id = 5,
                Name = "Michael Wilson",
            },
            new()
            {
                Id = 6,
                Name = "Emma Davis",
            },
            new()
            {
                Id = 7,
                Name = "Dave",
            },
            new()
            {
                Id = 8,
                Name = "Alex",
            },
            new()
            {
                Id = 9,
                Name = "Admin",
                IsAdmin = true,
            },
        };

        public async Task<Employee> GetEmployee(Employee employee)
        {
            return Employees.Find(x => x.Name.Equals(employee.Name));
        }
    }
}
