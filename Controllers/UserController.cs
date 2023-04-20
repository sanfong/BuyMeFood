using BuyMeFood.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BuyMeFood.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDBContext _context;

        public UserController(AppDBContext context)
        {
            _context = context;
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
    }
}
