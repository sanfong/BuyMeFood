using Microsoft.AspNetCore.Mvc;
using BuyMeFood.Models;
using Microsoft.EntityFrameworkCore;

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
        [HttpPost]
        [Route("create")]
        public IActionResult Create(CreateCardModels model)
        {
            CardPropertiesModel newCard = new CardPropertiesModel(model);
            _context.CardProperties.Add(newCard);
            //_context.SaveChanges();
            return CreatedAtAction(null,null);
        }
    }
}
