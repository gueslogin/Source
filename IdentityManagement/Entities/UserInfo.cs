using IdentityManagement.Utilities;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IdentityManagement.Entities
{
    public class UserInfo : IUser<string>
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public EnumUserStatus Status { get; set; }
        public string ImageContent1 { get; set; }
        public string ImageContent2 { get; set; }
        public string ImageContent3 { get; set; }
        public string AttractionName { get; set; }
    }
}
