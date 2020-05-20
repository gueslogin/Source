using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CustomMVCIdentity.Models;
using System.Configuration;
using IdentityManagement.DAL;
using IdentityManagement.Entities;
using System.Drawing;
using System.IO;
using System.Configuration;

namespace CustomMVCIdentity.Controllers
{
    [Authorize(Roles = "Administrator")]
    public class ExportPdfController : Controller
    {
        // GET: ExportPdf
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ExportViewToPdf()
        {
            UserInfo oUser = new UserInfo();
            oUser = UserController.GetUserInfo(User.Identity.Name);

            Params list = (Params)Session["ListParams"];
            if (oUser.ImageContent1 == null)
            {
                return RedirectToAction("Index", "Login");
            } else
            {
                list.Image2 = oUser.ImageContent2;
                list.Image3 = oUser.ImageContent3;
                list.AttractionName = oUser.AttractionName;
            }


            ActionResult ActionResult = new ViewAsPdf("Index", list)
            {
                FileName = "Attraction Contribution to Society.pdf",
                PageOrientation = Orientation.Portrait,
                PageWidth = 210,
                PageHeight = 300,
                PageMargins = { Left = 0, Right = 0, Top = 0, Bottom = 0 },
                CustomSwitches = "--disable-external-links --disable-internal-links --disable-smart-shrinking --viewport-size 1600x900 --load-error-handling ignore"
            };

            return ActionResult;
        }

        [HttpPost]
        public ActionResult SetParams(Params getParams)
        {
            Session["ListParams"] = getParams;
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

    }
}