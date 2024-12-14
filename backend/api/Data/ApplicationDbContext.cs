using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Data
{

    public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; } = null!;
    }
}