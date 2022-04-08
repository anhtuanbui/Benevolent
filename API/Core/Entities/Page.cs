using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Core.Entities
{
    public class Page : BaseEntity
    {
        public string? Title { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime CreatedTime { get; set; } = DateTime.Now;
        public string? Content { get; set; }
        public bool IsPublic { get; set; }
        public string? AppUserId { get; set; }
        public AppUser? AppUser { get; set; }
        public int TagId { get; set; }
        public Tag? Tag { get; set; }
    }
}