namespace DataModel.Responses
{
    public class ErrorResponse<T> : Response<T>
    {
        public string ErrorMessage { get; set; }

        public ErrorResponse(string errorMessage)
        {
            IsSuccess = false;
            ErrorMessage = errorMessage;
        }
    }
}
