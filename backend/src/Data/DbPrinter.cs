using System.Text;
using Microsoft.EntityFrameworkCore;

namespace src
{
    public class DbPrinter
    {
        public static void PrintData()
        {
            using (var context = new UploadContext())
            {
                var codeSnippets = context.CodeSnippet?.Include(p => p.Snippet) ?? throw new InvalidOperationException("CodeSnippet DbSet is null");

                foreach (var codeSnippet in codeSnippets)
                {
                    var data = new StringBuilder();

                }
            }
        }
    }
}