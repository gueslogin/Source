using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CustomMVCIdentity.Models
{
    public class AdminObj
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Status { get; set; }
        public string CreatedOnDate { get; set; }
        public string ImageContent { get; set; }
    }
}