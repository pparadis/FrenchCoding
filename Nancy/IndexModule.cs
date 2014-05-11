using System.Linq.Expressions;

namespace Nancy
{
    using Nancy;

    public class IndexModule : NancyModule
    {
        public IndexModule()
        {
            Get["/"] = parameters =>
            {
                return View["index"];
            };
        }
    }


    public class Rootobject
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public int age { get; set; }
        public Address address { get; set; }
        public Phonenumber[] phoneNumbers { get; set; }
    }

    public class Address
    {
        public string streetAddress { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public int postalCode { get; set; }
    }

    public class Phonenumber
    {
        public string type { get; set; }
        public string number { get; set; }
    }



}