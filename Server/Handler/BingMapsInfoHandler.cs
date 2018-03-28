using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.IO;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ThreeEarth.Server.Handler
{
    public class BingMapsInfoHandler : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            var host = "dev.virtualearth.net";

            var request = WebRequest.Create("http://" + host + context.Request.Url.PathAndQuery) as HttpWebRequest;
            request.Accept = context.Request.Headers.Get("Accept");
            request.Headers.Set(HttpRequestHeader.AcceptEncoding, context.Request.Headers.Get("Accept-Encoding"));
            request.Headers.Set(HttpRequestHeader.AcceptLanguage, context.Request.Headers.Get("Accept-Language"));
            request.Referer = context.Request.Headers.Get("Referer");
            request.UserAgent = context.Request.Headers.Get("User-Agent");
            request.Method = context.Request.HttpMethod;

            var response = request.GetResponse() as HttpWebResponse;
            var stream = response.GetResponseStream();
            var reader = new StreamReader(stream, Encoding.Default);
            var result = reader.ReadToEnd();
            reader.Close();
            stream.Close();

            result = result.Replace("http:\\/\\/ecn.{subdomain}.tiles.virtualearth.net\\/tiles\\/a{quadkey}.jpeg?g=6349",
                "http:\\/\\/127.0.0.1:8099\\/Service\\/BingTileService.ashx?subdomain={subdomain}&quadkey={quadkey}");

            context.Response.ContentType = response.ContentType;
            context.Response.Write(result);
        }

        public bool IsReusable
        {
            get
            {
                return true;
            }
        }
    }
}