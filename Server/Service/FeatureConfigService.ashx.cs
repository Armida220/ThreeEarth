using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ThreeEarth.Server.FeatureConfig
{
    /// <summary>
    /// 地图要素配置服务
    /// </summary>
    public class FeatureConfigService : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write("Hello World");
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