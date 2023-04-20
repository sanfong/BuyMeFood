﻿using Microsoft.EntityFrameworkCore;

namespace BuyMeFood.Models
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
    }
}

// add-migration <migration name>
// update-database