#nullable disable
using System.Security.Claims;
using API.Core.Entities;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize(Roles = "Admin, Mod")]
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly AppIdentityDbContext _context;

        public FeedbackController(AppIdentityDbContext context)
        {
            _context = context;
        }

        // GET: api/Feedback
        [HttpGet]
        public async Task<IActionResult> FeedbackList()
        {
            return Ok(await _context.Feedback.Include(f => f.AppUser).OrderBy(o=> o.AppUserId).ToListAsync());
        }

        // GET: api/Feedback/5
        [HttpGet("Detail/{id}")]
        public async Task<ActionResult<Feedback>> GetFeedback(int id)
        {
            var feedback = await _context.Feedback.FindAsync(id);

            if (feedback == null)
            {
                return NotFound();
            }

            return feedback;
        }

        [HttpGet("Check/{id}")]
        public async Task<ActionResult<Feedback>> CheckFeedback(int id)
        {
            var feedback = await _context.Feedback.FindAsync(id);
            Console.WriteLine("Debug this: " + feedback.FullName);

            var email = User.FindFirstValue(ClaimTypes.Email);
            Console.WriteLine("Debug this: " + email);

            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            
            Console.WriteLine("Debug this: " + user.UserName);

            if(user == null){
                return Unauthorized("User is not logged in");
            }

            if (feedback == null)
            {
                return NotFound();
            }

            feedback.AppUserId = user.Id;

            _context.Update(feedback);
            await _context.SaveChangesAsync();

            return Ok(feedback);
        }

        // POST: api/Feedback
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Add")]
        [AllowAnonymous]
        public async Task<ActionResult<Feedback>> AddFeedback(Feedback feedback)
        {
            Console.WriteLine("Debug this: " + feedback.ReceivedTime);
            _context.Feedback.Add(feedback);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFeedback", new { id = feedback.Id }, feedback);
        }

        // DELETE: api/Feedback/5
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteFeedback(int id)
        {
            var feedback = await _context.Feedback.FindAsync(id);
            if (feedback == null)
            {
                return NotFound();
            }

            _context.Feedback.Remove(feedback);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
