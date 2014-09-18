﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Markup;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

namespace MongoDb
{
    class Program
    {
        static void Main(string[] args)
        {
            var connectionString = "mongodb://localhost";
            var client = new MongoClient(connectionString);
            var server = client.GetServer();
            var database = server.GetDatabase("test");
            var collection = database.GetCollection<Entity>("entities");

            //var entity = new Entity { Name = "Tom" };
            //collection.Insert(entity);
            //var id = entity.Id;

            //var query = Query<Entity>.EQ(e => e.Id, id);
            //entity = collection.FindOne(query);

            //entity.Name = "Dick";
            //collection.Save(entity);

            var list = collection.FindAll();

            //var update = Update<Entity>.Set(e => e.Name, "Harry");
            //collection.Update(query, update);

            //collection.Remove(query);
        }
    }

    public class Entity
    {
        public ObjectId Id { get; set; }

        public string Name { get; set; }
    }
}
