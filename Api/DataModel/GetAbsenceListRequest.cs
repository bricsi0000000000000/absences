namespace DataModel
{
    public class GetAbsenceListRequest
    {
        public int PageNumber { get; set; }
        public int RowsOfPage { get; set; }
        public bool OrderByDesc { get; set; }
        public string OrderByColumnName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
