using DataAccess;
using DataModel;
using DataModel.Responses;

namespace BusinessLogic
{
    public class AbsenceBusinessLogic
    {
        private readonly AbsenceDataAccess absenceDataAccess;

        public AbsenceBusinessLogic()
        {
            absenceDataAccess = new();
        }

        public async Task<Response<GetAbsenceListResponse>> GetAllAbsencesAsync(GetAbsenceListRequest request)
        {
            return await absenceDataAccess.GetAllAbsencesAsync(request);
        }

        public async Task<Response<object>> CreateAbsence(Absence absence)
        {
            return await absenceDataAccess.CreateAbsence(absence);
        }

        public async Task<Response<object>> UpdateAbsence(Absence absence)
        {
            return await absenceDataAccess.UpdateAbsence(absence);

        }
        public async Task<Response<object>> DeleteAbsence(int absenceId)
        {
            return await absenceDataAccess.DeleteAbsence(absenceId);
        }
    }
}
