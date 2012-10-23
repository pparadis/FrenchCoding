using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DNTTrack.Controllers
{
    public class DNTController : Controller
    {
        //
        // GET: /DNT/

        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /DNT/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /DNT/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /DNT/Create

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
        // GET: /DNT/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /DNT/Edit/5

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
        // GET: /DNT/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /DNT/Delete/5

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
