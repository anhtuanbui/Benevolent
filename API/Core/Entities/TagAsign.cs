namespace API.Core.Entities
{
    public class TagAsign : BaseEntity
    {
        public int TagId { get; set; }
        public Tag? Tag { get; set; }
        public int PageId { get; set; }
        public Page? Page { get; set; }
    }
}
