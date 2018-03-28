using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace ThreeEarth.Server.Service
{
    /// <summary>
    /// 必应地图瓦片服务
    /// </summary>
    public class BingTileService : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            EnableCrossDomain(ref context);
            context.Response.ContentType = "text/plain";
            context.Response.Write("Hello, world!");
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