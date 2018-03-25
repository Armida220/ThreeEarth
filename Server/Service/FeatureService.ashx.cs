using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ThreeEarth.Server.Service
{
    /// <summary>
    /// 地理要素数据服务
    /// </summary>
    public class FeatureService : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            EnableCrossDomain(ref context);
            context.Response.ContentType = "text/plain";

            var collectionName = context.Request["Collection"];
            if (string.IsNullOrEmpty(collectionName))
            {
                context.Response.Write("缺少Collection参数！");
                return;
            }

            var mongo = new MongoHelper();
            var docs = mongo.FindAll(collectionName);

            var list = new JArray();
            foreach (var i in docs)
            {
                var obj = new JObject();
                obj["id"] = i["DataId"].AsString;
                obj["geometry"] = JsonConvert.DeserializeObject<JObject>(i["geometry"].ToJson());
                obj["properties"] = JsonConvert.DeserializeObject<JObject>(i["properties"].ToJson());
                list.Add(obj);
            }
            context.Response.Write(JsonConvert.SerializeObject(list));
        }

        public void EnableCrossDomain(ref HttpContext context)
        {
            if (!context.Response.Headers.AllKeys.Contains("Access-Control-Allow-Origin"))
            {
                context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
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