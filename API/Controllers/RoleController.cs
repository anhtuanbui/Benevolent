using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Core.Entities;
using API.Core.Models;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly AppIdentityDbContext _context;
        private readonly RoleManager<AppRole> _roleManager;

        public RoleController(AppIdentityDbContext context, RoleManager<AppRole> roleManager)
        {
            _context = context;
            _roleManager = roleManager;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddRole(Role role)
        {
            var roleExist = await _roleManager.RoleExistsAsync(role.Name);
            
            if (roleExist)
            {
                return BadRequest("This role existed");
            }

            var appRole = new AppRole { Name = role.Name!.Trim() };
            await _roleManager.CreateAsync(appRole);
            return Ok(appRole);
        }

        [HttpPost("edit/{id}")]
        public async Task<IActionResult> EditRole(string? id , Role role)
        {
            if (id == null){
                return NotFound("Can find this role");
            }
            var appRole = await _context.Roles.FindAsync(id);

            if (appRole == null) {
                return NotFound("Can find this role");
            }

            appRole.Name = role.Name;
            await _roleManager.UpdateAsync(appRole);
            return Ok(appRole);
        }

        [HttpGet]
        public async Task<IActionResult> GetRoles()
        {
            return Ok(await _context.Roles.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRole(string? id)
        {
            if (id == null){
                return NotFound("Can find this role");
            }
            var role = await _context.Roles.FindAsync(id);

            if (role == null) {
                return BadRequest("Can find this role");
            }
            return Ok(role);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteRole(string? id)
        {
            if (id == null){
                return NotFound("Can find this role");
            }
            var role = await _context.Roles.FindAsync(id);

            if (role == null) {
                return BadRequest("Can find this role");
            }
            _context.Roles.Remove(role);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // [HttpPost("AssignRole")]
        // public async Task<IActionResult> AsignRole(string? userId, string? roleId)
        // {
            
        // }
    }
}