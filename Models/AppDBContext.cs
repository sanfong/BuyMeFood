using Microsoft.EntityFrameworkCore;

namespace BuyMeFood.Models
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {

        }
    }
}

// add-migration <migration name>
// update-database