namespace DataModel
{
    public class GetAbsenceListResponse
    {
        public int MaxRowsCount { get; set; }
        public List<Absence> Absences { get; set; }
    }
}
