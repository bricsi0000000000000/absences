using Microsoft.AspNetCore.Mvc;
using BusinessLogic;
using DataModel;
using DataModel.Responses;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly ILogger<EmployeeController> logger;
        private readonly EmployeeBusinessLogic employeeBusinessLogic;

        public EmployeeController(ILogger<EmployeeController> logger)
        {
            this.logger = logger;
            employeeBusinessLogic = new();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Employee employee)
        {
            Employee response = await employeeBusinessLogic.GetEmployee(employee);

            return Ok(response);
        }
    }
}
