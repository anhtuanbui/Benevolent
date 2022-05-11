﻿using Microsoft.AspNetCore.Identity;

namespace API.Core.Entities
{
    public class AppUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Address { get; set; }
        public DateTimeOffset DateOfBirth { get; set; }
    }
}
