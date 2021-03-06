using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Core.Models
{
    public class AuthUser
    {
        public AuthUser()
        {
        }

        public AuthUser(string userName, string email, string token, bool isAuthenticated)
        {
            UserName = userName;
            Email = email;
            Token = token;
            IsAuthenticated = isAuthenticated;
        }

        public AuthUser(string userName, string email, string token, bool isAuthenticated, IList<string> roles)
        {
            UserName = userName;
            Email = email;
            Token = token;
            IsAuthenticated = isAuthenticated;
            Roles = roles;
        }

        public bool IsAuthenticated { get; set; } = false;
        public string UserName { get; set; } = "";
        public string? Email { get; set; }
        public string? Token { get; set; }
        public IList<string>? Roles { get; set; }
    }
}
