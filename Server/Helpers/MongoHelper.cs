using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

using MongoDB.Driver;
using MongoDB.Bson;
using Newtonsoft.Json;

namespace ThreeEarth.Server
{
    /// <summary>
    /// MongoDB帮助类
    /// </summary>
    /// <see cref="http://mongodb.github.io/mongo-csharp-driver/2.5/"/>
    /// <seealso cref="http://mongodb.github.io/mongo-csharp-driver/2.5/apidocs"/>
    public class MongoHelper
    {
        private string connectionString;
        private string dbName;

        private MongoClient client;
        private IMongoDatabase db;

        public MongoHelper()
        {
            connectionString = ConfigurationManager.AppSettings["mongo_connection"];
            dbName = ConfigurationManager.AppSettings["mongo_dbName"];
            client = new MongoClient(connectionString);
            db = client.GetDatabase(dbName);
        }

        public MongoHelper(string connectionString, string dbName)
        {
            this.connectionString = connectionString;
            this.dbName = dbName;
            client = new MongoClient(connectionString);
            db = client.GetDatabase(dbName);
        }

        public MongoHelper(string dbName)
        {
            connectionString = ConfigurationManager.AppSettings["mongo_connection"];
            this.dbName = dbName;
            client = new MongoClient(connectionString);
            db = client.GetDatabase(dbName);
        }

        public IAsyncCursor<BsonDocument> ListCollections()
        {
            return db.ListCollections();
        }

        public IMongoCollection<BsonDocument> GetCollection(string name)
        {
            return db.GetCollection<BsonDocument>(name);
        }

        public void DropCollection(string name)
        {
            db.DropCollection(name);
        }

        public void InsertOne(string collectionName, BsonDocument document)
        {
            GetCollection(collectionName).InsertOne(document);
        }

        public void InsertMany(string collectionName, IEnumerable<BsonDocument> documents)
        {
            GetCollection(collectionName).InsertMany(documents);
        }

        public long Count(string collectionName)
        {
            return GetCollection(collectionName).Count(new BsonDocument());
        }

        public long Count(string collectionName, FilterDefinition<BsonDocument> filter)
        {
            return GetCollection(collectionName).Count(filter);
        }

        public BsonDocument FindOne(string collectionName, FilterDefinition<BsonDocument> filter)
        {
            return GetCollection(collectionName).Find(filter).FirstOrDefault();
        }

        public List<BsonDocument> FindMany(string collectionName, FilterDefinition<BsonDocument> filter)
        {
            return GetCollection(collectionName).Find(filter).ToList();
        }

        public List<BsonDocument> FindAll(string collectionName)
        {
            return GetCollection(collectionName).Find(new BsonDocument()).ToList();
        }

        public UpdateResult UpdateOne(string collectionName, FilterDefinition<BsonDocument> filter, UpdateDefinition<BsonDocument> update)
        {
            return GetCollection(collectionName).UpdateOne(filter, update);
        }

        public UpdateResult UpdateMany(string collectionName, FilterDefinition<BsonDocument> filter, UpdateDefinition<BsonDocument> update)
        {
            return GetCollection(collectionName).UpdateMany(filter, update);
        }

        public UpdateResult UpdateAll(string collectionName, UpdateDefinition<BsonDocument> update)
        {
            return GetCollection(collectionName).UpdateMany(new BsonDocument(), update);
        }

        public DeleteResult DeleteOne(string collectionName, FilterDefinition<BsonDocument> filter)
        {
            return GetCollection(collectionName).DeleteOne(filter);
        }

        public DeleteResult DeleteMany(string collectionName, FilterDefinition<BsonDocument> filter)
        {
            return GetCollection(collectionName).DeleteMany(filter);
        }

        public DeleteResult DeleteAll(string collectionName)
        {
            return GetCollection(collectionName).DeleteMany(new BsonDocument());
        }
    }
}