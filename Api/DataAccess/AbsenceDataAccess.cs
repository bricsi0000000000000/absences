using DataModel;
using DataModel.Responses;

namespace DataAccess
{
    public class AbsenceDataAccess
    {
        private static readonly List<Absence> absences = new()
        {
            new()
            {
                Id = 1,
                EmployeeId = 1,
                EmployeeName = "John Doe",
                StartDate = new DateTime(2024, 2, 1),
                EndDate = new DateTime(2024, 2, 3),
                Reason = AbsenceReason.Holiday,
                Comment = "Taking a short break",
                IsApproved = true
            },

            new()
            {
                Id = 2,
                EmployeeId = 2,
                EmployeeName = "Alice Smith",
                StartDate = new DateTime(2024, 3, 10),
                EndDate = new DateTime(2024, 3, 15),
                Reason = AbsenceReason.PaidLeave,
                Comment = "Vacation time",
                IsApproved = true
            },
            new()
            {
                Id = 3,
                EmployeeId = 3,
                EmployeeName = "Bob Johnson",
                StartDate = new DateTime(2024, 4, 20),
                EndDate = new DateTime(2024, 4, 21),
                Reason = AbsenceReason.NonPaidLeave,
                Comment = "Personal reasons",
                IsApproved = false
            },
            new()
            {
                Id = 4,
                EmployeeId = 4,
                EmployeeName = "Emily Brown",
                StartDate = new DateTime(2024, 5, 5),
                EndDate = new DateTime(2024, 5, 8),
                Reason = AbsenceReason.BusinessTravel,
                Comment = "Attending conference",
                IsApproved = true
            },
            new()
            {
                Id = 5,
                EmployeeId = 5,
                EmployeeName = "Michael Wilson",
                StartDate = new DateTime(2024, 6, 15),
                EndDate = new DateTime(2024, 6, 17),
                Reason = AbsenceReason.HomeOffice,
                Comment = "Working remotely",
                IsApproved = true
            },
            new()
            {
                Id = 6,
                EmployeeId = 6,
                EmployeeName = "Emma Davis",
                StartDate = new DateTime(2024, 7, 25),
                EndDate = new DateTime(2024, 7, 30),
                Reason = AbsenceReason.Holiday,
                Comment = "Family vacation",
                IsApproved = true
            },
            new()
            {
                Id = 7,
                EmployeeId = 7,
                EmployeeName = "Dave",
                StartDate = new DateTime(2024,2,6),
                EndDate = new DateTime(2024,2,14),
                Reason = AbsenceReason.BusinessTravel,
                Comment = string.Empty,
                IsApproved = true
            },
            new()
            {
                Id = 8,
                EmployeeId = 8,
                EmployeeName = "Alex",
                StartDate = new DateTime(2024,2,14),
                EndDate = new DateTime(2024,3,3),
                Reason = AbsenceReason.NonPaidLeave,
                Comment = "Így lett megbeszélve",
                IsApproved = false
            },
        };

        public async Task<Response<GetAbsenceListResponse>> GetAllAbsencesAsync(GetAbsenceListRequest request)
        {
            List<Absence> filteredList = absences.Where(x =>
            x.StartDate.Year >= request.StartDate.Year && x.StartDate.Month >= request.StartDate.Month
            && x.EndDate.Year <= request.EndDate.Year && x.EndDate.Month <= request.EndDate.Month).ToList();

            if (request.OrderByColumnName.Equals(nameof(Absence.EmployeeName)))
            {
                filteredList = filteredList.OrderBy(x => x.EmployeeName).ToList();
            }
            else if (request.OrderByColumnName.Equals(nameof(Absence.StartDate)))
            {
                filteredList = filteredList.OrderBy(x => x.StartDate).ToList();
            }
            else if (request.OrderByColumnName.Equals(nameof(Absence.EndDate)))
            {
                filteredList = filteredList.OrderBy(x => x.EndDate).ToList();
            }
            else if (request.OrderByColumnName.Equals(nameof(Absence.Reason)))
            {
                filteredList = filteredList.OrderBy(x => x.Reason).ToList();
            }
            else if (request.OrderByColumnName.Equals(nameof(Absence.Comment)))
            {
                filteredList = filteredList.OrderBy(x => x.Comment).ToList();
            }
            else
            {
                return new ErrorResponse<GetAbsenceListResponse>("Invalid column name");
            }

            if (request.OrderByDesc)
            {
                filteredList.Reverse();
            }

            int maxRowsCount = filteredList.Count;

            filteredList = filteredList.Skip((request.PageNumber - 1) * request.RowsOfPage).Take(request.RowsOfPage).ToList();

            return new SuccessResponse<GetAbsenceListResponse>()
            {
                ReturnValue = new()
                {
                    MaxRowsCount = maxRowsCount,
                    Absences = filteredList
                }
            };
        }


        public async Task<Response<object>> CreateAbsence(Absence absence)
        {
            if (absences.Find(x => x.EmployeeName.Equals(absence.EmployeeName)
                && x.StartDate.Year >= absence.StartDate.Year
                && x.StartDate.Month >= absence.StartDate.Month
                && x.EndDate.Year <= absence.EndDate.Year
                && x.EndDate.Month <= absence.EndDate.Month) is null)
            {
                if (absences.Any())
                {
                    absence.Id = absences.Last().Id + 1;
                }
                else
                {
                    absence.Id = 1;
                }

                absences.Add(absence);

                return new SuccessResponse<object>();
            }
            else
            {
                return new ErrorResponse<object>("Absence already exists in this time frame");
            }
        }

        public async Task<Response<object>> UpdateAbsence(Absence newAbsence)
        {
            Absence? savedAbsence = GetAbsence(newAbsence.Id);
            if (savedAbsence is null)
            {
                return new ErrorResponse<object>("Absence doesn't exists");
            }
            else
            {
                absences[absences.IndexOf(savedAbsence)] = newAbsence;
                return new SuccessResponse<object>();
            }

        }
        public async Task<Response<object>> DeleteAbsence(int absenceId)
        {
            Absence? savedAbsence = GetAbsence(absenceId);

            if (savedAbsence is null)
            {
                return new ErrorResponse<object>("Absence doesn't exists");
            }
            else
            {
                absences.Remove(savedAbsence);
                return new SuccessResponse<object>();
            }
        }

        private static Absence? GetAbsence(int absenceId)
        {
            return absences.Find(x => x.Id == absenceId);
        }
    }
}
