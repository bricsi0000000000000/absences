namespace DataModel.Responses
{
    public abstract class Response<T>
    {
        public bool IsSuccess { get; set; }
        public T ReturnValue { get; set; }
    }
}
