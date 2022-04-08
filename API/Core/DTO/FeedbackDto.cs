using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Core.DTO
{
    public class FeedbackDto
    {
         public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Surburb { get; set; }
        public string? TimeToCall { get; set; }
        public string? Message { get; set; }
        public DateTime ReceivedTime { get; set; }
        public string? AppUserId { get; set; }
    }
}