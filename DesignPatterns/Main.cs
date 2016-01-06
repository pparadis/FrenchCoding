

namespace DesignPatterns
{
    using System.Console;
    public class Start
    {
        public static void Main(string[] args)
        {
            WriteLine(new LinkGenerator().GetLink("http://www.frenchcoding.com", "French Coding"));
            WriteLine(new BoldLinkGenerator().GetLink("http://www.frenchcoding.com", "French Coding"));
            ReadKey();
        }
    }
}
