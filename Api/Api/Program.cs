namespace Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            const string COLRS_POLICY_NAME = "corspolicyname";

            WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(COLRS_POLICY_NAME,
                                      policy =>
                                      {
                                          policy.AllowAnyOrigin()
                                                .AllowAnyHeader()
                                                .AllowAnyMethod();
                                      });
            });

            WebApplication app = builder.Build();

            app.UseHttpsRedirection();

            app.UseCors(COLRS_POLICY_NAME);

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
