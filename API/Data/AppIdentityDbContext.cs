using API.Core.Entities;
using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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
            SeedTags(builder);
            SeedPages(builder);
        }

        private static void SeedUsers(ModelBuilder builder)
        {
            var user = new AppUser()
            {
                Id = "41aabb4f-7629-4e07-a70c-6ad65f10d990",
                UserName = "admin",
                NormalizedUserName = "ADMIN",
                Email = "admin@seedadmin.com",
                NormalizedEmail = "ADMIN@SEEDADMIN.COM"
            };

            var passwordHasher = new PasswordHasher<AppUser>();
            user.PasswordHash = passwordHasher.HashPassword(user, "123456");

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

        private static void SeedUserRoles(ModelBuilder builder)
        {
            var userRole = new AppUserRole()
            {
                UserId = "41aabb4f-7629-4e07-a70c-6ad65f10d990",
                RoleId = "4bc5e834-b107-4abd-8fa9-3fa758b0d3aa"
            };
            builder.Entity<AppUserRole>().HasData(userRole);
        }

        private static void SeedTags(ModelBuilder builder)
        {
            using var reader = new StreamReader("Data/SeedData/tags.json");
            string json = reader.ReadToEnd();
            List<Tag> tags = JsonConvert.DeserializeObject<List<Tag>>(json) ?? throw new ArgumentException("Can't get tags");
            tags?.ForEach(tag =>
            {
                builder.Entity<Tag>().HasData(tag);
            });


        }

        private static void SeedPages(ModelBuilder builder)
        {
            using var reader = new StreamReader("Data/SeedData/pages.json");
            string json = reader.ReadToEnd();
            List<Page> pages = JsonConvert.DeserializeObject<List<Page>>(json) ?? throw new ArgumentException("Can't get pages");
            pages?.ForEach(page =>
            {
                builder.Entity<Page>().HasData(page);
            });

        }

    }

}

