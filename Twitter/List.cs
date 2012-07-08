using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TweetSharp;

namespace Twitter
{
    public class List
    {
        private const string CONSUMER_KEY = "284g20afBzaWJBII7kQtQ";
        private const string CONSUMER_SECRET = "FmAzBbfQGallAhvOxfHMnxZIkThcAYBY1GPerqFEI";
        public IEnumerable<string> GetLists(string twitterName)
        {
            var service = new TwitterService(CONSUMER_KEY, CONSUMER_SECRET);
            var lists = service
                .ListListsFor(twitterName, -1)
                .Select(p => p.FullName)
                .OrderBy(p=>p);
            return lists;
        }
    }
}
