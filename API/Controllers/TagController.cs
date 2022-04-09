using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using API.Core.DTO;
using API.Core.Entities;
using API.Data;
using Duende.IdentityServer.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagController : ControllerBase
    {
        private readonly AppIdentityDbContext _context;
        public TagController(AppIdentityDbContext context)
        {
            _context = context;
        }

        [HttpGet("list")]
        public async Task<IActionResult> TagList()
        {
            return Ok(await _context.Tag!.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> TagDetail(int? id)
        {
            if (id == null){
                return NotFound();
            }

            var tag = await _context.Tag!.FirstOrDefaultAsync(t => t.Id == id);

            if(tag == null){
                return NotFound();
            }

            return Ok(tag);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddTag(Tag tag)
        {
            _context.Add(tag);
            await _context.SaveChangesAsync();
            return Ok(tag);
        }

        [HttpPost("edit/{id}")]
        public async Task<IActionResult> EditTag(int id, Tag tag)
        {
            if (tag.Name.IsNullOrEmpty())
            {
                ModelState.AddModelError("Errors", "Tag name is invalid");
                return BadRequest(ModelState);
            }

            var findTag = await _context.Tag!.FirstOrDefaultAsync(t => t.Id == id);
            if (findTag == null)
            {
                ModelState.AddModelError("Errors", $"This tag {id} does not exist");
                return BadRequest(ModelState);
            }

            try
            {
                findTag.Name = tag.Name;
                findTag.Position = tag.Position;
                _context.Update(findTag);
                await _context.SaveChangesAsync();
                return Ok(tag);
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound("Exception");
            }
        }


        [HttpGet("Delete/{id}")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tag = await _context.Tag!.FirstOrDefaultAsync(t => t.Id == id);
            if (tag == null)
            {
                return NotFound();
            }

            _context.Tag!.Remove(tag);
            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}