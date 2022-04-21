using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Core.Entities;
using API.Core.Models;
using API.Data;
using API.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Infrastructure.Services
{
    public class AccountService : IAccountService
    {
        private readonly IConfiguration _config;
        private readonly AppIdentityDbContext _dbContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;

        public AccountService(IConfiguration config, AppIdentityDbContext dbContext, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _config = config;
            _dbContext = dbContext;
        }

        public async Task<AuthUser> GenerateAuthUserAsync(AppUser user)
        {
            var secret = _config["JwtSettings:SecretKey"];
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));

            var issuer = _config["ClaimSettings:Issuer"];
            var audience = _config["ClaimSettings:Audience"];

            var roles = await _userManager.GetRolesAsync(user);

            var claimEmail = new Claim(ClaimTypes.Email, user.Email);
            var claimUserName = new Claim(ClaimTypes.NameIdentifier, user.UserName);

            var claims = new List<Claim>{
                claimEmail,
                claimUserName
            };

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var claimsIdentity = new ClaimsIdentity(claims, "serverAuth");

            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claimsIdentity,
                Expires = DateTime.UtcNow.AddDays(7),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature)
            };

            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(securityToken);

            var isAuthenticated = true;

            return await Task.FromResult(new AuthUser(user.UserName, user.Email, token, isAuthenticated, roles));
        }

        public async Task<AuthUser> ValidateJwtTokenAsync(string token)
        {
            var secret = _config["JwtSettings:SecretKey"];
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));

            var issuer = _config["ClaimSettings:Issuer"];
            var audience = _config["ClaimSettings:Audience"];

            var tokenHandler = new JwtSecurityTokenHandler();

            var claimsPrincipal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidIssuer = issuer,
                ValidAudience = audience,
                IssuerSigningKey = securityKey
            }, out SecurityToken validatedToken);

            var jwtSecurityToken = (JwtSecurityToken)validatedToken;

            var userName = claimsPrincipal?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = _dbContext.Users.Where(u => u.UserName == userName).FirstOrDefault();

            if (user == null)
                return await Task.FromResult(new AuthUser());

            var isAuthenticated = true;
            var roles = await _userManager.GetRolesAsync(user);

            return await Task.FromResult(new AuthUser(user.UserName, user.Email, token, isAuthenticated, roles));

        }
    }
}
