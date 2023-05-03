using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactWithSql.Data
{
    public class PeopleRepository
    {
        private string _connectionString;

        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.ToList();
        }

        public void AddPerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }
        public void DeletePerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Remove(person);
            context.SaveChanges();
        }
        public void UpdatePerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Attach(person);
            context.Entry(person).State = EntityState.Modified;
            context.SaveChanges();
        }
    }
}
