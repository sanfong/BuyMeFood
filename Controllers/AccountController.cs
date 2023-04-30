using BuyMeFood.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BuyMeFood.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private readonly AppDBContext _context;

        public AccountController(ILogger<AccountController> logger, AppDBContext context)
        {
            _logger = logger;
            _context = context;
        }

        [Authorize]
        [HttpGet] // "/account"
        public IActionResult Get()
        {
            var user = _context.Users.Find(int.Parse(HttpContext.User.Claims.First(c => c.Type == "Id").Value));
            if (user == null)
            {
                return Unauthorized("Authorized user not found.");
            }
            return Ok((UserDTO)user);
        }

        [HttpGet]
        [Route("select")] // "/account/select?id=1&id=2"
        public IEnumerable<UserDTO> Get([FromQuery] int[] id)
        {
            return _context.Users.Where(u => id.Contains(u.Id)).Cast<UserDTO>();
        }

        [HttpPost]
        [Route("register")] // "/account/register"
        public IActionResult Register(RegisterModel model)
        {
            var newUser = new User(model);
            _context.Users.Add(newUser);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), new { id = newUser.Id }, null);
        }
        
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginAsync(LoginModel model)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == model.Username && u.Password == model.Password);
            if (user == null)
            {
                ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                return BadRequest(ModelState);
            }

            CookieSignInAsync(user);

            _logger.LogInformation("{User} logged in at {Time}.", user.Username, DateTimeOffset.Now);

            return Ok((UserDTO)user);
        }

        [HttpGet]
        [Authorize]
        [Route("logout")] // "/account/logout"
        public async Task<IActionResult> LogoutAsync()
        {
            // Clear the existing external cookie
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            string username = HttpContext.User.Claims.First(c => c.Type == "Username").Value;
            _logger.LogInformation("{User} logged out at {Time}.", username, DateTimeOffset.Now);
            return Ok();
        }

        [HttpPut]
        [Authorize]
        [Route("edit")] // Edit everything except password
        public IActionResult EditProfile(EditModel editUser)
        {
            int userId = int.Parse(HttpContext.User.Claims.First(c => c.Type == "Id").Value);
            var user = _context.Users.Find(userId);
            if (user == null)
            {
                return Unauthorized();
            }
            user.Update(editUser);
            _context.Users.Update(user);
            _context.SaveChanges();
            CookieSignInAsync(user);
            _logger.LogInformation("{User} edited info at {Time}.", editUser.Username, DateTimeOffset.Now);
            return Ok(user);
        }

        [HttpPut]
        [Authorize]
        [Route("edit/password")]
        public IActionResult EditPassword(EditPasswordModel model)
        {
            int userId = int.Parse(HttpContext.User.Claims.First(c => c.Type == "Id").Value);
            var user = _context.Users.Find(userId);
            if (user == null)
            {
                return Unauthorized("Authorized user not found.");
            }
            if (user.Password != model.OldPassword)
            {
                return BadRequest("Incorrect password.");
            }
            user.Password = model.NewPassword;
            _context.Users.Update(user);
            _context.SaveChanges();
            return Ok();
        }

        private async void CookieSignInAsync(User user)
        {
            var claims = new List<Claim> {
                new Claim("Id", user.Id.ToString()),
                new Claim("Username", user.Username!)
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                AllowRefresh = true,
                IsPersistent = true,
                IssuedUtc = DateTimeOffset.UtcNow
            };

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity), authProperties);
        }
    }
}
