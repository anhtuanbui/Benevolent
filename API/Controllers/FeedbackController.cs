#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Core.Entities;
using API.Data;

namespace API.Controllers
{
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
        public async Task<ActionResult<IEnumerable<Feedback>>> FeedbackList()
        {
            return await _context.Feedback.ToListAsync();
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

        // POST: api/Feedback
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Add")]
        public async Task<ActionResult<Feedback>> AddFeedback(Feedback feedback)
        {
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
