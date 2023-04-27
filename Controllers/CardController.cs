﻿using Microsoft.AspNetCore.Mvc;
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
        [Route("createCard")]
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
            return _context.CardProperties.Where(card => card.IsExpired == false);
        }

        [Authorize]
        [HttpPost]
        [Route("createOrder")]
        public IActionResult CreateOrder(string storeName,string description,int cardID)
        {
            if(_context.CardProperties.FirstOrDefault(card => card.CardID == cardID) == null ) { return BadRequest(); }
            _context.OrderProp.Add(new OrderProperties(cardID, int.Parse(HttpContext.User.Claims.First(c => c.Type == "Id").Value), storeName, description));
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
