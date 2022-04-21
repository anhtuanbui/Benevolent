using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text.RegularExpressions;
using API.Core.Entities;
using API.Core.Models;
using API.Data;
using API.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly AppIdentityDbContext _context;
        private readonly IAccountService _accountService;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, AppIdentityDbContext context, IAccountService accountService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
            _accountService = accountService;
        }

        [HttpGet("IsAdmin")]
        public ActionResult<bool> CheckAdmin()
        {
            return User.IsInRole("Admin");
        }

        [HttpGet("IsModOrAdmin")]
        public ActionResult<bool> CheckModOrAdmin()
        {
            return User.IsInRole("Mod") || User.IsInRole("Admin");
        }

        [HttpGet("CurrentUser")]
        public async Task<ActionResult<AuthUser>> CurrentUser()
        {
            if (User?.Identity?.IsAuthenticated == false)
            {
                return Unauthorized("No current user logged in.");
            }

            var email = User.FindFirstValue(ClaimTypes.Email);

            var currentUser = await _userManager.FindByEmailAsync(email);

            if (currentUser == null)
            {
                return Unauthorized("Can't find this email");
            }

            return await _accountService.GenerateAuthUserAsync(currentUser);
        }

        [HttpPost("LoginWithToken")]
        public async Task<ActionResult<AuthUser>> LoginWithToken(Token token)
        {
            var authUser = await _accountService.ValidateJwtTokenAsync(token.MyToken);

            if (authUser == null)
                return new AuthUser();

            return Ok(authUser);
        }

        [HttpPost("Login")]
        public async Task<ActionResult<AuthUser>> Login(Login login)
        {
            if (login.Username == null || login.Password == null)
            {
                var message = "Username and password fields are required to login";
                ModelState.AddModelError("Errors", message);
                return BadRequest(ModelState);
            }

            string regex = "^(?![_.0-9])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$";
            Match match = Regex.Match(login.Username, regex);

            var user = new AppUser();

            if (match.Success)
            {
                user = await _userManager.FindByNameAsync(login.Username);
            }
            else if (!match.Success)
            {
                user = await _userManager.FindByEmailAsync(login.Username);
            }

            if (user == null)
            {
                var message = "Invalid username or email";
                ModelState.AddModelError("Errors", message);
                return BadRequest(ModelState);
            }

            var loginResult = await _signInManager.CheckPasswordSignInAsync(user, login.Password, false);

            if (!loginResult.Succeeded)
            {
                var message = "Invalid password";
                ModelState.AddModelError("Errors", message);
                return BadRequest(ModelState);
            }

            await _signInManager.SignInAsync(user, true);

            var authUser = await _accountService.GenerateAuthUserAsync(user);

            return Ok(authUser);
        }

        [HttpPost("Register")]
        public async Task<ActionResult<AuthUser>> Register(Register register)
        {
            string message = "";

            if (_context.Users.Any(u => u.UserName == register.UserName))
            {
                message = $"The name {register.UserName} has been used.";
                ModelState.AddModelError("Errors", message);
                return BadRequest(ModelState);
            }

            if (_context.Users.Any(u => u.Email == register.Email))
            {
                message = $"Email {register.Email} has been used.";
                ModelState.AddModelError("Errors", message);
                return BadRequest(ModelState);
            }

            var user = new AppUser
            {
                UserName = register.UserName,
                Email = register.Email
            };

            var result = await _userManager.CreateAsync(user, register.Password);

            if (!result.Succeeded)
            {
                message = "Register failed";
                ModelState.AddModelError("Errors", message);
                return BadRequest(ModelState);
            }

            return await Login(new Login
            {
                Username = register.UserName,
                Password = register.Password
            });
        }

        [HttpGet("Logout")]
        public async Task<ActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }
    }
}