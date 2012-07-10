using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace TwitterListManager.Controllers
{
    public class ListController : Controller
    {
        //
        // GET: /List/

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [OutputCache(VaryByParam="*", Duration=10)]
        public ActionResult Index(string TwitterName)
        {
            var twitter = new Twitter.List();
            ViewBag.Lists = twitter.GetLists(TwitterName);
            return PartialView("_Results", ViewBag.Lists);
        }

        [HttpPost]
        public ActionResult Copy(string listId)
        {
            ViewBag.Confirmation = "Yay!";
            ViewBag.ListId = listId;
            return PartialView("_ListCopyConfirmation", ViewBag);
        }
    }
}
