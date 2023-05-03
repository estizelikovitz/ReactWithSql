﻿using Microsoft.EntityFrameworkCore;
using Microsoft.SqlServer;
using System;

namespace ReactWithSql.Data
{
    public class PeopleDataContext : DbContext
    {
        private readonly string _connectionString;
        public PeopleDataContext(string connectionString)
        {
            _connectionString = connectionString;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
        public DbSet<Person> People { get; set; }
    }
}
