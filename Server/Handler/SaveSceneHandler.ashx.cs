using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ThreeEarth.Server.Handler
{
    /// <summary>
    /// 保存场景
    /// </summary>
    public class SaveSceneHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var name = context.Request.Params.Get("name");
            var layerName = context.Request.Params.Get("layerName");
            var data = context.Request.Params.Get("data");

            var geoJsons = JsonConvert.DeserializeObject<JArray>(data);

            foreach (JObject i in geoJsons)
            {
                var doc = new BsonDocument();
                ParseBsonDocument(i, ref doc);
            }

            var mongo = new MongoHelper();

            context.Response.ContentType = "text/plain";
            context.Response.Write("Hello World");
        }

        private void ParseBsonDocument(JObject obj, ref BsonDocument doc)
        {
            doc["type"] = "Feature";
            doc["id"] = obj["id"].ToString();
            doc["geometry"] = new BsonDocument();
            var geoType = obj["geometry"]["type"].ToString();
            if (geoType == "Polygon")
            {
                var coordinates = new BsonArray();
                var coordinates1 = new BsonArray();
            }
            else if (geoType == "LineString")
            {

            }
            else
            {

            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}