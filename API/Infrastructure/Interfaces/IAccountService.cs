using API.Core.Entities;
using API.Core.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Infrastructure.Interfaces
{
    public interface IAccountService
    {
        Task<AuthUser> GenerateAuthUserAsync(AppUser user);
        Task<AuthUser> ValidateJwtTokenAsync(string token);
    }
}
