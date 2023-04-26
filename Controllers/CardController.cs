using Microsoft.AspNetCore.Mvc;
using BuyMeFood.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace BuyMeFood.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CardController : ControllerBase
    {
        private readonly ILogger<CardController> _logger;
        private readonly AppDBContext _context;

        public CardController(ILogger<CardController> logger, AppDBContext context)
        {
            _logger = logger;
            _context = context;
        }
        [Authorize]
        [HttpPost]
        [Route("create")]
        public IActionResult Create(CreateCardModels model)
        {
            CardPropertiesModel newCard = new CardPropertiesModel(model, int.Parse(HttpContext.User.Claims.First(c => c.Type == "Id").Value));
            //_context.CardProperties.Where(card=>card.isExpired == false).ToList();
            _context.CardProperties.Add(newCard);
            _context.SaveChanges();
            return CreatedAtAction(null,null);
        }
        [HttpGet]
        [Route("select")]
        public IEnumerable<CardPropertiesModel> Get([FromQuery] int[] id)
        {
            return _context.CardProperties.Where(card => id.Contains(card.CardID));
        }

        [HttpGet]
        [Route("selectFromUser")]
        public IEnumerable<CardPropertiesModel> GetFormUser([FromQuery] int[] id)
        {
            return _context.CardProperties.Where(card => id.Contains(card.OwnerID));
        }

        [HttpGet]
        [Route("GetNotExpired")]
        public IEnumerable<CardPropertiesModel> GetNotExpired([FromQuery] int[] id)
        {
            return _context.CardProperties.Where(card => card.IsExpired == false);
        }
    }
}
