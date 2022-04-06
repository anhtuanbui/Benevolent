using API.Core.Entities;
using API.Core.Models;
using API.Data;
using API.Infrastructure.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Infrastructure.Services
{
    public class AccountService : IAccountService
    {
        private readonly IConfiguration _config;
        private readonly AppIdentityDbContext _dbContext;

        public AccountService(IConfiguration config, AppIdentityDbContext dbContext)
        {
            _config = config;
            _dbContext = dbContext;
        }

        public async Task<AuthUser> GenerateAuthUserAsync(AppUser user)
        {
            var secret = _config["JwtSettings:SecretKey"];
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));

            var issuer = _config["ClaimSettings:Issuer"];
            var audience = _config["ClaimSettings:Issuer"];

            var claimEmail = new Claim(ClaimTypes.Email, user.Email);
            var claimUserName = new Claim(ClaimTypes.NameIdentifier, user.UserName);
            var claimsIdentity = new ClaimsIdentity(new[] { claimUserName, claimEmail }, "serverAuth");

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
            return await Task.FromResult(new AuthUser(user.UserName, user.Email, token, true));
        }

        public async Task<AuthUser> ValidateJwtTokenAsync(string token)
        {
            var secret = _config["JwtSettings:SecretKey"];
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));

            var issuer = _config["ClaimSettings:Issuer"];
            var audience = _config["ClaimSettings:Issuer"];

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

            return await Task.FromResult(new AuthUser(user.UserName, user.Email, token, false));

        }

        Task<AuthUser> IAccountService.ValidateJwtTokenAsync(string token)
        {
            throw new NotImplementedException();
        }
    }
}
