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

        //
        // GET: /List/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        
        public ActionResult GetUserLists(string TwitterName)
        {


            return View("Index");
        }

        //
        // GET: /List/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /List/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /List/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /List/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /List/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /List/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
