using API.Core.DTO;
using API.Core.Entities;
using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PageController : ControllerBase
    {
        private readonly AppIdentityDbContext _context;
        public PageController(AppIdentityDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> PageList()
        {
            return Ok(await _context.Page!.ToListAsync());
        }

        [HttpGet("Detail/{id}")]
        public async Task<IActionResult> PageDetail(int? id)
        {
            if (id == null)
            {
                ModelState.AddModelError("Errors", "Id is missing");
                return BadRequest(ModelState);
            }

            var page = await _context.Page!.FirstOrDefaultAsync(p => p.Id == id);

            if (page == null)
            {
                return NotFound();
            }
            return Ok(page);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddPage(PageDto pageDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity!.Name);

            if (user == null)
            {
                ModelState.AddModelError("Errors", "User is not logged in");
                return BadRequest(ModelState);
            }
            var page = new Page
            {
                Title = pageDto.Title,
                TagId = pageDto.TagId,
                ImageUrl = pageDto.ImageUrl,
                Content = pageDto.Content,
                IsPublic = true,
                AppUserId = user!.Id
            };

            _context.Add(page);
            await _context.SaveChangesAsync();
            return Ok(page);
        }

        [HttpPost("edit/{id}")]
        public async Task<IActionResult> EditPage(int id, PageDto pageDto)
        {
            var page = await _context.Page!.FirstOrDefaultAsync(p => p.Id == id);
            if (page == null)
            {
                return NotFound();
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity!.Name);

            if (user == null)
            {
                ModelState.AddModelError("Errors", "User is not logged in");
                return BadRequest(ModelState);
            }

            page.Title = pageDto.Title;
            page.TagId = pageDto.TagId;
            page.ImageUrl = pageDto.ImageUrl;
            page.Content = pageDto.Content;
            page.IsPublic = true;
            page.AppUserId = user!.Id;

            _context.Update(page);
            await _context.SaveChangesAsync();
            return Ok(page);
        }

        [HttpPost("Delete/{id}")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var page = await _context.Page!.FirstOrDefaultAsync(t => t.Id == id);
            if (page == null)
            {
                return NotFound();
            }

            _context.Page!.Remove(page);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}