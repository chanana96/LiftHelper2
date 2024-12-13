using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Data
{

    public class ApplicationDbContext(DbContextOptions dbContextOptions) : DbContext(dbContextOptions)
    {
        public DbSet<User>? User { get; set; }
    }
}