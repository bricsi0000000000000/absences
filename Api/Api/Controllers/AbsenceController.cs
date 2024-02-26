using Microsoft.AspNetCore.Mvc;
using BusinessLogic;
using DataModel;
using DataModel.Responses;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AbsenceController : ControllerBase
    {
        private readonly ILogger<AbsenceController> logger;
        private readonly AbsenceBusinessLogic absenceBusinessLogic;

        public AbsenceController(ILogger<AbsenceController> logger)
        {
            this.logger = logger;
            absenceBusinessLogic = new();
        }

        [HttpGet("getAllAbsence")]
        public async Task<IActionResult> GetAllAbsences([FromQuery] GetAbsenceListRequest request)
        {
            Response<GetAbsenceListResponse> response = await absenceBusinessLogic.GetAllAbsencesAsync(request);

            return Ok(response);
        }

        [HttpPost("createAbsence")]
        public async Task<IActionResult> CreateAbsence([FromBody] Absence absence)
        {
            Response<object> response = await absenceBusinessLogic.CreateAbsence(absence);

            return Ok(response);
        }

        [HttpPut("updateAbsence")]
        public async Task<IActionResult> UpdateAbsence([FromBody] Absence absence)
        {
            Response<object> response = await absenceBusinessLogic.UpdateAbsence(absence);

            return Ok(response);
        }

        [HttpDelete("deleteAbsence")]
        public async Task<IActionResult> DeleteAbsence([FromQuery] int absenceId)
        {
            Response<object> response = await absenceBusinessLogic.DeleteAbsence(absenceId);

            return Ok(response);
        }
    }
}
