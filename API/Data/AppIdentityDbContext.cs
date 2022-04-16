using API.Core.Entities;
using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Data
{
    public class AppIdentityDbContext : IdentityDbContext<AppUser, AppRole, string, IdentityUserClaim<string>,
    AppUserRole, IdentityUserLogin<string>,
    IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options) : base(options)
        {
        }

        public DbSet<Page>? Page { get; set; }
        public DbSet<Tag>? Tag { get; set; }
        public DbSet<Feedback>? Feedback { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            SeedUsers(builder);
            SeedRoles(builder);
            SeedUserRoles(builder);
        }

        private static void SeedUsers(ModelBuilder builder)
        {
            var user = new AppUser()
            {
                Id = "41aabb4f-7629-4e07-a70c-6ad65f10d990",
                UserName = "admin",
                Email = "admin@seedadmin.com"
            };

            var passwordHasher = new PasswordHasher<AppUser>();
            passwordHasher.HashPassword(user, "123456");

            builder.Entity<AppUser>().HasData(user);

        }

        private static void SeedRoles(ModelBuilder builder)
        {
            var role = new AppRole()
            {
                Id = "4bc5e834-b107-4abd-8fa9-3fa758b0d3aa",
                Name = "Admin"
            };
            builder.Entity<AppRole>().HasData(role);
        }

        private static void SeedUserRoles(ModelBuilder builder){
            var userRole = new AppUserRole(){
                UserId = "41aabb4f-7629-4e07-a70c-6ad65f10d990",
                RoleId = "4bc5e834-b107-4abd-8fa9-3fa758b0d3aa"
            };
            builder.Entity<AppUserRole>().HasData(userRole);
        }

    }
}
