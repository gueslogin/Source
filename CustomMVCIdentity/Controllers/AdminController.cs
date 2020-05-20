using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Drawing;
using CustomMVCIdentity.Models;
using System.Configuration;
using IdentityManagement.DAL;
using IdentityManagement.Entities;

namespace CustomMVCIdentity.Controllers
{
    [Authorize(Roles = "Administrator")]
    public class AdminController : Controller
    {
        static Random _random = new Random();
        // GET: Admin
        public ActionResult Index()
        {
            //string[] array = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"};
            int[] array = { 0,1,2,3,4,5};
            string[] smallText = {"Nordjyllands Historiske Museum (The Historical Museum of Northern Jutland)","VisitDanmark","Aalborg Municipality","WonderfulCopenhagen","Innovasjon Norge","TopAttraktioner"};
            string[] largeText = {"Insights into the possible target groups for a new ‘Fjordmuseum’ in Hobro","How is Denmark's image and potential as a holiday destination perceived in an international context?","What significance and value does culture have for Aalborg?","How can cultural attractions work to fulfil their commercial potential?","How is tourism developing in Norway?","How can attractions create good and recommendable guest experiences that attract visitors?"};
            string[] linktext = {"https://epinionglobal.com/en/cases/nordjyllands-historiske-museum-the-historical-museum-of-northern-jutland/","https://epinionglobal.com/en/cases/visitdanmark/","https://epinionglobal.com/en/cases/aalborg-municipality/","https://epinionglobal.com/en/cases/wonderfulcopenhagen/","https://epinionglobal.com/en/cases/innovasjon-norge/","https://epinionglobal.com/en/cases/topattraktioner/"};
            Shuffle(array);

            UserInfo oUser = new UserInfo();
            oUser = UserController.GetUserInfo(User.Identity.Name);

            if (oUser.ImageContent1 == null)
            {
                return RedirectToAction("Index", "Login");
            }

            ViewBag.ImageContent1 = oUser.ImageContent1;
            ViewBag.ImageContent2 = oUser.ImageContent2;
            ViewBag.ImageContent3= oUser.ImageContent3;
            ViewBag.AttractionName = oUser.AttractionName;
            ViewBag.ArrayNumber1 = "/Content/random/randomPic"+ array[0] + ".jpg";
            ViewBag.ArrayNumber2 = "/Content/random/randomPic" + array[1] + ".jpg";
            ViewBag.smallText1 = smallText[array[0]];
            ViewBag.largeText1 = largeText[array[0]];
            ViewBag.linktext1 = linktext[array[0]];
            ViewBag.smallText2 = smallText[array[1]];
            ViewBag.largeText2 = largeText[array[1]];
            ViewBag.linktext2 = linktext[array[1]];
            return View();
        }

        static void Shuffle<T>(T[] array)
        {
            int n = array.Length;
            for (int i = 0; i < (n - 1); i++)
            {
                // Use Next on random instance with an argument.
                // ... The argument is an exclusive bound.
                //     So we will not go past the end of the array.
                int r = i + _random.Next(n - i);
                T t = array[r];
                array[r] = array[i];
                array[i] = t;
            }
        }

        [HttpPost]
        public ActionResult LoadParams(string id)
        {
            UserInfo oUser = new UserInfo();
            oUser = UserController.GetUserInfo(User.Identity.Name);
            AdminDB AdminDB = new AdminDB();

            if (id.Equals("2"))
            {
                List<Page2Objs> Page2ObjsList = new List<Page2Objs>();
                Page2ObjsList = AdminDB.GetPage2Objs(oUser.Id);
                return Json(Page2ObjsList, JsonRequestBehavior.AllowGet);
            } else if (id.Equals("3"))
            {
                List<Page3Objs> Page3ObjsList = new List<Page3Objs>();
                Page3ObjsList = AdminDB.GetPage3Objs(oUser.Id);
                return Json(Page3ObjsList, JsonRequestBehavior.AllowGet);
            } else
            {
                return null;
            }
        }

        [HttpPost]
        public ActionResult SaveParams2(Page2Objs getParams)
        {
            UserInfo oUser = new UserInfo();
            oUser = UserController.GetUserInfo(User.Identity.Name);
            AdminDB AdminDB = new AdminDB();

            //check userid
            bool insertUserId = false;
            bool checkUSerId = AdminDB.CheckUserId(oUser.Id);
            if (!checkUSerId)
            {
                //insert userid
                insertUserId = AdminDB.InertUserId(oUser.Id);
            }
            //save
            bool isSave = AdminDB.SavePage2(oUser.Id, getParams);
            if (isSave)
            {
                return Json("", JsonRequestBehavior.AllowGet);
            } else
            {
                return Json("", JsonRequestBehavior.DenyGet);
            }
        }

        [HttpPost]
        public ActionResult SaveParams3(Page3Objs getParams)
        {
            UserInfo oUser = new UserInfo();
            oUser = UserController.GetUserInfo(User.Identity.Name);
            AdminDB AdminDB = new AdminDB();

            //check userid
            bool insertUserId = false;
            bool checkUSerId = AdminDB.CheckUserId(oUser.Id);
            if (!checkUSerId)
            {
                //insert userid
                insertUserId = AdminDB.InertUserId(oUser.Id);
            }
            //save
            bool isSave = AdminDB.SavePage3(oUser.Id, getParams);
            if (isSave)
            {
                return Json("", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("", JsonRequestBehavior.DenyGet);
            }
        }

    }
}