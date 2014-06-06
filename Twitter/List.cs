using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using TweetSharp;

namespace Twitter
{
    public class List
    {
        private const string CONSUMER_KEY = "284g20afBzaWJBII7kQtQ";
        private const string CONSUMER_SECRET = "FmAzBbfQGallAhvOxfHMnxZIkThcAYBY1GPerqFEI";

        public IEnumerable<dynamic> GetLists(string twitterName)
        {
            var service = new TwitterService(CONSUMER_KEY, CONSUMER_SECRET);
            var expandoList = new List<dynamic>();
            var options = new ListListsForOptions();
            options.ScreenName = "pparadis";
            expandoList = service
                .ListListsFor(options)
                .Select(p => ToExpando(p))
                .OrderBy(p => p.FullName)
                .ToList();
            return expandoList;
        }

        private dynamic ToExpando(TwitterList list)
        {
            dynamic x = new ExpandoObject();
            x.Description = list.Description;
            x.FullName = list.FullName;
            x.Id = list.Id;
            x.MemberCount = list.MemberCount;
            x.Mode = list.Mode;
            x.Rawsource = list.RawSource;
            x.Slug = list.Slug;
            x.SubscriberCount = list.SubscriberCount;
            x.Uri = list.Uri;

            return x;
        }
    }
}