using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace api
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);
            var Origins = "_Origins";

            builder.Services.AddControllers();
            builder.Services.AddOpenApi();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("DefaultConnection")
                );
            });
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(
                    name: Origins,
                    policy =>
                    {
                        policy.WithOrigins("https://localhost:3000");
                    }
                );
            });

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseCors(Origins);

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
