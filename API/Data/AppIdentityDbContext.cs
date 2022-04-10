using API.Core.Entities;
using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Data
{
    public class AppIdentityDbContext : ApiAuthorizationDbContext<AppUser>
    {
        public AppIdentityDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
        
        public DbSet<Page>? Page { get; set; }
        public DbSet<Tag>? Tag { get; set; }
        public DbSet<Feedback>? Feedback { get; set; }

    }
}
