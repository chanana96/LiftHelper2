using Microsoft.EntityFrameworkCore;
using MySql.EntityFrameworkCore.Extensions;

namespace src
{

    public class UploadContext : DbContext
    {
        private readonly IConfiguration? _configuration;

        public UploadContext()
        {
        }

        public UploadContext(IConfiguration configuration)
        {

            _configuration = configuration;
        }
        public DbSet<CodeSnippet>? CodeSnippet { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (_configuration == null)
                throw new InvalidOperationException("Configuration is not initialized");
            var connectionString = string.Format("server={0};database={1};user={2};password={3}",
                _configuration.GetValue<string>("ConnectionStrings:server"),
                _configuration.GetValue<string>("ConnectionStrings:database"),
                _configuration.GetValue<string>("ConnectionStrings:user"),
                _configuration.GetValue<string>("ConnectionStrings:password")
            );
            optionsBuilder.UseMySQL(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<CodeSnippet>(entity =>
            {
                entity.HasKey(e => e.ID);
                entity.Property(e => e.Snippet).IsRequired();
            });
        }


    }
}