using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Core.Entities
{
    public class AppUserRole : IdentityUserRole<string>
    {
    }
}