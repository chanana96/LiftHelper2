using Microsoft.EntityFrameworkCore;
namespace src
{
    public class DbSeeder
    {
        private readonly UploadContext _context;

        public DbSeeder(UploadContext context)
        {
            _context = context;
        }

        public void InsertData()
        {

            _context.Database.EnsureCreated();





        }
    }
}