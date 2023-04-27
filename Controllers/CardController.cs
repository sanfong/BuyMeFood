using Microsoft.AspNetCore.Mvc;
using BuyMeFood.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System;

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
        [Route("createCard")]
        public IActionResult Create(CreateCardModels model)
        {
            if(model.ExprTimeHour < 0 || model.ExprTimeHour >= 24 || model.ExprTimeMinute < 0 || model.ExprTimeHour >= 60) { return BadRequest(); }
            CardPropertiesModel newCard = new CardPropertiesModel(model, int.Parse(HttpContext.User.Claims.First(c => c.Type == "Id").Value));
            //_context.CardProperties.Where(card=>card.isExpired == false).ToList();
            _context.CardProperties.Add(newCard);
            _context.SaveChanges();
            return CreatedAtAction(null,null);
        }
        [HttpGet]
        [Route("select")]
        public IEnumerable<CardPropertiesModel> Get([FromQuery] int id)
        {
            return _context.CardProperties.Where(card => card.CardID == id);
        }

        [HttpGet]
        [Route("selectFromUser")]
        public IEnumerable<CardPropertiesModel> GetFormUser([FromQuery] int id)
        {
            return _context.CardProperties.Where(card => card.OwnerID == id);
        }
        [HttpGet]
        [Route("GetOwnerCard")]
        public IEnumerable<CardPropertiesModel> GetOwnerCard()
        {
            return _context.CardProperties.Where(card => card.OwnerID == int.Parse(HttpContext.User.Claims.First(c => c.Type == "Id").Value));
        }

        [HttpGet]
        [Route("GetNotExpired")]
        public IEnumerable<CardPropertiesModel> GetNotExpired()
        {
            List<CardPropertiesModel> cardList = _context.CardProperties.Where(card => card.IsExpired == false).ToList<CardPropertiesModel>();
            for (int i = 0; i < cardList.Count(); i++) 
            {
                if (DateTime.Compare(cardList[i].ExpiredTime,DateTime.Now) < 0) 
                {
                    cardList[i].IsExpired = true;
                    _context.CardProperties.Update(cardList[i]);
                    _context.SaveChanges();
                }
            }
            //_context.CardProperties.Where(card => card.IsExpired == false).ToList().Count();
            return _context.CardProperties.Where(card => card.IsExpired == false);
        }

        [Authorize]
        [HttpPost]
        [Route("createOrder")]
        public IActionResult CreateOrder(string storeName,string description,int cardID)
        {
            CardPropertiesModel cardProperties = _context.CardProperties.FirstOrDefault(card => card.CardID == cardID);
            if (cardProperties == null) { return BadRequest(); }
            if (cardProperties.OrderCount >= cardProperties.MaxOrder || cardProperties.IsExpired) { return BadRequest(); };
            if (DateTime.Compare(cardProperties.ExpiredTime, DateTime.Now) < 0)
            {
                cardProperties.IsExpired = true;
                _context.CardProperties.Update(cardProperties);
                _context.SaveChanges();
                return BadRequest();
            }
            _context.OrderProp.Add(new OrderProperties(cardID, int.Parse(HttpContext.User.Claims.First(c => c.Type == "Id").Value), storeName, description));
            cardProperties.OrderCount++;
            _context.CardProperties.Update(cardProperties);
            _context.SaveChanges();
            return Ok();
            //OrderModel order = new OrderModel(int.Parse(HttpContext.User.Claims.First(c => c.Type == "Id").Value), storeName, description);
            //CardPropertiesModel.Order orderTemp = new CardPropertiesModel.Order(int.Parse(HttpContext.User.Claims.First(c => c.Type == "Id").Value), storeName, description);
            //CardPropertiesModel cardProperties = _context.CardProperties.FirstOrDefault(card => card.CardID == cardID);
            //cardProperties.OrderList.Add(orderTemp);
            //_context.CardProperties.Update(cardProperties);
            //_context.SaveChanges();
        }

        [HttpGet]
        [Route("GetOrder")]
        public IEnumerable<OrderProperties> GetOrder(int cardID)
        {
            return _context.OrderProp.Where(order => order.CardID == cardID);
        }

    }
}
