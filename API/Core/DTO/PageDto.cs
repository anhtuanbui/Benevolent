using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Core.DTO
{
    public class PageDto
    {
        public string? Title { get; set; }
        public int TagId { get; set; }
        public string? ImageUrl { get; set; }
        public string? Content { get; set; }
    }
}