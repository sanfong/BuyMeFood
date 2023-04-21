using BuyMeFood.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BuyMeFood.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly AppDBContext _context;

        public UserController(AppDBContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpGet]
        public IEnumerable<UserDTO> Get([FromQuery] int[] ids)
        {
            return _context.Users.Where(u => ids.Contains(u.Id)).Cast<UserDTO>();
        }

        [HttpPost] // Register
        public IActionResult Post(RegisterModel model)
        {
            var newUser = new User(model);
            _context.Users.Add(newUser);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), new { ids = newUser.Id }, null);
        }

        
        [HttpPost] // Login
        [Route("login")]
        public async Task<IActionResult> PostAsync(LoginModel model)
        {
            var claims = new List<Claim> {
                new Claim(ClaimTypes.Name, model.Username!)
            };
            var identity = new ClaimsIdentity(claims);
            var principal = new ClaimsPrincipal(identity);
            await HttpContext.SignInAsync(principal);
            return Ok(model);
        }
    }
}
