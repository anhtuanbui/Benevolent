using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Core.Entities;
using API.Core.Models;
using API.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MemberController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly AppIdentityDbContext _context;
        public MemberController(UserManager<AppUser> userManager, AppIdentityDbContext context)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("UserRole/{id}")]
        public async Task<IActionResult> UserRole(string? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var userRoles = await _context.UserRoles.Where(u => u.UserId == id).ToListAsync();
            var list = new List<string>();
            foreach (var userRole in userRoles)
            {
                var role = await _context.Roles.FindAsync(userRole.RoleId);
                if (role != null)
                {
                    list.Add(role.Name);
                }
            }
            return Ok(list);
        }


        [HttpGet]
        public async Task<IActionResult> ToList()
        {
            return Ok(await _context.Users!.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMember(string? id)
        {
            if (id == null)
            {
                ModelState.AddModelError("Errors", "Can find this role");
                return NotFound(ModelState);
            }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                ModelState.AddModelError("Errors", "Can find this role");
                return BadRequest(ModelState);
            }
            return Ok(user);
        }

        [HttpPost("AssignRole")]
        public async Task<IActionResult> AssignRole(AssignRole assignRole)
        {
            if (assignRole.MemberId == null || assignRole.RoleId == null)
            {
                return BadRequest("Null member id or role id");
            }

            var user = await _context.Users.FindAsync(assignRole.MemberId);
            var role = await _context.Roles.FindAsync(assignRole.RoleId);

            if (user == null || role == null)
            {
                return BadRequest("Can not find user or role");
            }

            return Ok(await _userManager.AddToRoleAsync(user, role.Name));
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteRole(string? id)
        {
            if (id == null)
            {
                ModelState.AddModelError("Errors", "Can find this role");
                return NotFound(ModelState);
            }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                ModelState.AddModelError("Errors", "Can find this role");
                return BadRequest(ModelState);
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}