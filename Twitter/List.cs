using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TweetSharp;

namespace Twitter
{
    public class List
    {
        public List()
        {
            
        }

        public IEnumerable<string> GetLists(string twitterName)
        {
            var service = new TwitterService("284g20afBzaWJBII7kQtQ", "FmAzBbfQGallAhvOxfHMnxZIkThcAYBY1GPerqFEI");
            var lists = service.ListListsFor(twitterName, -1).Select(p => p.FullName);
            return lists;
        }
    }
}
