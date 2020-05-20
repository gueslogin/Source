using CustomMVCIdentity.App_Start;
using IdentityManagement.DAL;
using IdentityManagement.Entities;
using IdentityManagement.Utilities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using CustomMVCIdentity.Models;
using System.IO;
using System.Configuration;
using System.Drawing;

namespace CustomMVCIdentity.Controllers
{
    public class LoginController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        // GET: Login
        [AllowAnonymous]
        public ActionResult ChangePassword(string returnUrl)
        {
            UserInfo oUser = new UserInfo();
            oUser = UserController.GetUserInfo(User.Identity.Name);

            if (oUser.ImageContent1 == null)
            {
                return RedirectToAction("Index", "Login");
            }

            ViewBag.ImageContent1 = oUser.ImageContent1;
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ChangePassword(ChangePasswordViewModel objLogin, string returnUrl)
        {
            UserInfo UserInfo = new UserInfo();
            UserInfo = UserController.GetUserInfo(User.Identity.Name);

            if (UserInfo.ImageContent1 == null)
            {
                return RedirectToAction("Index", "Login");
                //return null;
            }

            ViewBag.ImageContent1 = UserInfo.ImageContent1;

            if (ModelState.IsValid)
            {
                ApplicationUser oUser = await SignInManager.UserManager.FindByNameAsync(UserInfo.UserName);

                if (oUser != null && oUser.Password.Equals(objLogin.OldPassword))
                {
                    switch (oUser.Status)
                    {
                        case EnumUserStatus.Pending:
                            ModelState.AddModelError("", "Error: User account has not been verified.");
                            break;
                        case EnumUserStatus.Active:
                            SignInManager.SignIn(oUser, false, false);
                            IList<string> roleList = UserRoleController.GetUserRoles(oUser.Id);
                            foreach (string role in roleList)
                            {
                                UserManager.AddToRole(oUser.Id, role);
                            }

                            //if no return url provided then redirect page based on role
                            if (string.IsNullOrEmpty(returnUrl))
                            {
                                if (roleList.IndexOf("Administrator") >= 0)
                                {
                                    string newPassword = objLogin.NewPassword;
                                    string confirmPassword = objLogin.ConfirmPassword;
                                    if (newPassword.Equals(confirmPassword))
                                    {
                                        // create object user
                                        var user = new ApplicationUser { Id = oUser.Id, UserName = UserInfo.UserName, Password = newPassword };
                                        //update password
                                        var result = await UserManager.UpdateAsync(user);
                                    } else
                                    {
                                        ModelState.AddModelError("", "Error: New password and confirm password don't match.");
                                        break;
                                    }

                                    ModelState.AddModelError("Success", "Success! Your Password has been changed!");
                                    break;
                                    //return RedirectToAction("Index", "ChangePassword");
                                }
                                else
                                {
                                    return RedirectToAction("Index", "Member");
                                }
                            }
                            //return RedirectToLocal(returnUrl);
                            return null;

                        case EnumUserStatus.Banned:
                            ModelState.AddModelError("", "Error: User account has been banned.");
                            break;
                        case EnumUserStatus.LockedOut:
                            ModelState.AddModelError("", "Error: User account has been locked out due to multiple login tries.");
                            break;
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Vi kunne ikke finde en bruger med det angivne brugernavn og adgangskode. Prøv venligst igen.");
                }
            }
            return View(objLogin);
        }

        public ActionResult Logout()
        {
            SignInManager.AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return RedirectToAction("Index", "Login");
        }

        // GET: Login
        [AllowAnonymous]
        public ActionResult Index(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Index(LoginViewModel objLogin, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser oUser = await SignInManager.UserManager.FindByNameAsync(objLogin.UserName);

                if (oUser != null && oUser.Password == objLogin.Password)
                {
                    switch (oUser.Status)
                    {
                        case EnumUserStatus.Pending:
                            ModelState.AddModelError("", "Error: User account has not been verified.");
                            break;
                        case EnumUserStatus.Active:
                            SignInManager.SignIn(oUser, false, false);
                            IList<string> roleList = UserRoleController.GetUserRoles(oUser.Id);
                            foreach(string role in roleList)
                            {
                                UserManager.AddToRole(oUser.Id, role);
                            }

                            //if no return url provided then redirect page based on role
                            if (string.IsNullOrEmpty(returnUrl))
                            {
                                if(roleList.IndexOf("Administrator") >= 0)
                                {
                                    return RedirectToAction("Index", "Admin");
                                }
                                else
                                {
                                    return RedirectToAction("Index", "Member");
                                }
                            }
                            return RedirectToLocal(returnUrl);

                        case EnumUserStatus.Banned:
                            ModelState.AddModelError("", "Error: User account has been banned.");
                            break;
                        case EnumUserStatus.LockedOut:
                            ModelState.AddModelError("", "Error: User account has been locked out due to multiple login tries.");
                            break;
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Vi kunne ikke finde en bruger med det angivne brugernavn og adgangskode. Prøv venligst igen.");
                }
            }
            return View(objLogin);
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Login");
        }

        // GET: /Account/Register
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser checkUser = await SignInManager.UserManager.FindByNameAsync(model.UserName);

                if (checkUser != null)
                {
                    ModelState.AddModelError("", "Error: User name exits.");
                }
                else
                {
                    // check file is image or not
                    if (IsImage(model.ImageFile))
                    {
                        // get ImageContent
                        Image sourceimage1 = Image.FromStream(model.ImageFile.InputStream);
                        var base64_1 = Convert.ToBase64String(imageToByteArray(sourceimage1));
                        var imgSrc1 = String.Format("data:image/gif;base64,{0}", base64_1);
                        string strImageContent = imgSrc1.ToString();

                        var user = new ApplicationUser { UserName = model.UserName, Email = model.Email, Password = model.Password, ImageContent1 = strImageContent};
                        var result = await UserManager.CreateAsync(user);
                        if (result.Succeeded)
                        {
                            ////Use Namespace called :  System.IO
                            //string FileName = Path.GetFileNameWithoutExtension(model.ImageFile.FileName);
                            ////To Get File Extension
                            //string FileExtension = Path.GetExtension(model.ImageFile.FileName);
                            ////Add Current Date To Attached File Name
                            //FileName = model.UserName.Trim() + FileExtension;
                            ////Get Upload path from Web.Config file AppSettings.
                            //string UploadPath = ConfigurationManager.AppSettings["UserImagePath"].ToString();
                            ////Its Create complete path to store in server.
                            //model.ImagePath = UploadPath + FileName;
                            ////To copy and save file into server.
                            //model.ImageFile.SaveAs(model.ImagePath);

                            return RedirectToAction("Index", "Admin");
                        }
                    } else
                    {
                        ModelState.AddModelError("", "Error: Please upload an image.");
                    }
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        public byte[] imageToByteArray(System.Drawing.Image imageIn)
        {
            MemoryStream ms = new MemoryStream();
            imageIn.Save(ms, System.Drawing.Imaging.ImageFormat.Gif);
            return ms.ToArray();
        }

        public bool IsImage(HttpPostedFileBase file)
        {
            if (file.ContentType.Contains("image"))
            {
                return true;
            }

            string[] formats = new string[] { ".jpg", ".png", ".gif", ".jpeg" }; // add more if u like...

            // linq from Henrik Stenbæk
            return formats.Any(item => file.FileName.EndsWith(item, StringComparison.OrdinalIgnoreCase));
        }

    }
}