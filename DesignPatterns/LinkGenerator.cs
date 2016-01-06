namespace DesignPatterns
{
    public class LinkGenerator
    {
        public string GetLink(string url, string title)
        {
            return string.Format(GetLinkFormatPattern(), url, title);
        }

        public virtual string GetLinkFormatPattern()
        {
            return "<a href=\"{0}\">{1}</a>";
        }
    }

    public class BoldLinkGenerator : LinkGenerator
    {
        public override string GetLinkFormatPattern()
        {
            return "<strong><a href=\"{0}\">{1}</a></strong>";
        }
    }
}
