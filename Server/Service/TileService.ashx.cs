using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ThreeEarth.Server.Tile
{
    /// <summary>
    /// 地图瓦片服务
    /// </summary>
    public class TileService : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write("Hello World");
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