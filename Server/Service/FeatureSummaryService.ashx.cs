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
    /// FeatureSummaryService 的摘要说明
    /// </summary>
    public class FeatureSummaryService : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            EnableCrossDomain(ref context);
            var mongo = new MongoHelper();
            var docs = mongo.FindAll("ThreeEarth_FeatureSummary");

            var result = new JObject();
            result["total"] = 1; // 总页数
            result["page"] = 1; // 当前页
            result["records"] = docs.Count; // 查询出的记录数

            var rows = new JArray();
            foreach (var i in docs)
            {
                var obj = new JObject();
                obj["_id"] = i["_id"].AsObjectId.ToString();
                obj["CreateTime"] = i["CreateTime"].ToUniversalTime().ToString("yyyy-MM-dd");
                obj["CollectionName"] = i["CollectionName"].AsString;
                obj["NickName"] = i["NickName"].AsString;
                obj["CenterLongitude"] = i["CenterLongitude"].AsDouble;
                obj["CenterLatitude"] = i["CenterLatitude"].AsDouble;
                obj["PointNum"] = i["PointNum"].AsInt32;
                obj["LineStringNum"] = i["LineStringNum"].AsInt32;
                obj["PolygonNum"] = i["PolygonNum"].AsInt32;
                obj["UnknownNum"] = i["UnknownNum"].AsInt32;
                obj["TotalNum"] = i["TotalNum"].AsInt32;
                rows.Add(obj);
            }
            result["rows"] = rows;

            context.Response.ContentType = "text/plain";
            context.Response.Write(JsonConvert.SerializeObject(result));
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