namespace API.Core.Entities
{
    public class Tag : BaseEntity
    {
        public string? Name { get; set; }
        public ICollection<Page>? Pages { get; set; }
    }
}
