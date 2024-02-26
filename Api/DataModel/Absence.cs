namespace DataModel
{
    public class Absence
    {
        public int Id { get; set; }
        public string EmployeeName { get; set; }
        public int EmployeeId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public AbsenceReason Reason { get; set; }
        public string Comment { get; set; }
        public bool IsApproved { get; set; }
    }
}
