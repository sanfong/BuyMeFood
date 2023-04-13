﻿using Microsoft.EntityFrameworkCore;

namespace BuyMeFood.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {

        }
    }
}
