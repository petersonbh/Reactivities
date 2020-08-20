using Domain;
using Microsoft.EntityFrameworkCore;
using System;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Value>().HasData(
                new Domain.Value { Id = 1, Name = "value 1" },
                new Domain.Value { Id = 2, Name = "value 2" },
                new Domain.Value { Id = 3, Name = "value 3" });
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Value> Value { get; set; }
    }
}
