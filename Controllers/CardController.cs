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
        [Authorize]
        [HttpPost]
        [Route("closeCard")]
        public IActionResult CloseCard(int cardID)
        {
            int ownerid = int.Parse(HttpContext.User.Claims.First(c => c.Type == "Id").Value);
            CardPropertiesModel card = _context.CardProperties.FirstOrDefault(card => card.CardID == cardID);
            if (card == null) { return BadRequest(); }
            if (card.OwnerID != ownerid) { return BadRequest(); }
            card.IsExpired = true;
            _context.CardProperties.Update(card);
            _context.SaveChanges();
            //_context.CardProperties.Remove(card);
            return Ok();
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
        [Authorize]
        [HttpGet]
        [Route("GetOwnerCard")]
        public IEnumerable<CardPropertiesModel> GetOwnerCard()
        {
            int ownerid = int.Parse(HttpContext.User.Claims.First(c => c.Type == "Id").Value);
            List<CardPropertiesModel> cardList = _context.CardProperties.Where(card => card.OwnerID == ownerid).ToList<CardPropertiesModel>();
            for (int i=0;i < cardList.Count(); i++) 
            {
                if (DateTime.Compare(cardList[i].ExpiredTime, DateTime.Now) < 0)
                {
                    cardList[i].IsExpired = true;
                    _context.CardProperties.Update(cardList[i]);
                    _context.SaveChanges();
                }
                cardList[i].CompleteOrder = CheckCompleteOrder(cardList[i].CardID);
                if ((cardList[i].IsExpired && cardList[i].OrderCount <= cardList[i].CompleteOrder) || cardList[i].MaxOrder <= cardList[i].CompleteOrder) 
                {
                    cardList[i].IsComplete = true;
                    _context.CardProperties.Update(cardList[i]);
                    _context.SaveChanges();
                }
            }
            return _context.CardProperties.Where(card => card.OwnerID == ownerid && !card.IsComplete);
        }

        [HttpGet]
        [Route("GetNotExpired")]
        public IEnumerable<CardPropertiesModel> GetNotExpired()
        {
            List<CardPropertiesModel> cardList = _context.CardProperties.Where(card => (card.IsExpired == false && card.IsComplete == false)).ToList<CardPropertiesModel>();
            for (int i = 0; i < cardList.Count(); i++) 
            {
                if (DateTime.Compare(cardList[i].ExpiredTime,DateTime.Now) < 0) 
                {
                    cardList[i].IsExpired = true;
                    _context.CardProperties.Update(cardList[i]);
                    _context.SaveChanges();
                }
                cardList[i].CompleteOrder = CheckCompleteOrder(cardList[i].CardID);
                if ((cardList[i].IsExpired && cardList[i].OrderCount <= cardList[i].CompleteOrder) || cardList[i].MaxOrder <= cardList[i].CompleteOrder)
                {
                    cardList[i].IsComplete = true;
                    _context.CardProperties.Update(cardList[i]);
                    _context.SaveChanges();
                }
            }
            //_context.CardProperties.Where(card => card.IsExpired == false).ToList().Count();
            return _context.CardProperties.Where(card => card.IsExpired == false && card.IsComplete == false);
        }
        [HttpGet]
        [Route("GetAllcard")]
        public IEnumerable<CardPropertiesModel> GetAllcard()
        {
            List<CardPropertiesModel> cardList = _context.CardProperties.Where(card => (card.IsExpired == false && card.IsComplete == false)).ToList<CardPropertiesModel>();
            for (int i = 0; i < cardList.Count(); i++)
            {
                if (DateTime.Compare(cardList[i].ExpiredTime, DateTime.Now) < 0)
                {
                    cardList[i].IsExpired = true;
                    _context.CardProperties.Update(cardList[i]);
                    _context.SaveChanges();
                }
                cardList[i].CompleteOrder = CheckCompleteOrder(cardList[i].CardID);
                if ((cardList[i].IsExpired && cardList[i].OrderCount <= cardList[i].CompleteOrder) || cardList[i].MaxOrder <= cardList[i].CompleteOrder)
                {
                    cardList[i].IsComplete = true;
                    _context.CardProperties.Update(cardList[i]);
                    _context.SaveChanges();
                }
            }
            //_context.CardProperties.Where(card => card.IsExpired == false).ToList().Count();
            return _context.CardProperties.Where(card => card.IsComplete == false);
        }

        [Authorize]
        [HttpPost]
        [Route("createOrder")]
        public IActionResult CreateOrder(  string  storeName,string description, int cardID)
        {
            CardPropertiesModel cardProperties = _context.CardProperties.FirstOrDefault(card => card.CardID == cardID);
            if (cardProperties == null) { return BadRequest("Card properties is null"); }
            if (cardProperties.OrderCount >= cardProperties.MaxOrder || cardProperties.IsExpired) { return BadRequest("Order is max or card is expired"); };
            if (DateTime.Compare(cardProperties.ExpiredTime, DateTime.Now) < 0)
            {
                cardProperties.IsExpired = true;
                _context.CardProperties.Update(cardProperties);
                _context.SaveChanges();
                return BadRequest("card is expired");
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

        [Authorize]
        [HttpPost]
        [Route("submitOrder")]
        public IActionResult submitOrder(int orderID)
        {

            OrderProperties order = _context.OrderProp.FirstOrDefault(order => order.OrderID == orderID);
            int ownerid = int.Parse(HttpContext.User.Claims.First(c => c.Type == "Id").Value);
            if (order.OwnerID != ownerid) { return BadRequest(); }
            order.IsComplete = true;
            _context.OrderProp.Update(order);
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("GetCardOrder")]
        public IEnumerable<OrderProperties> GetCardOrder(int cardID)
        {
            return _context.OrderProp.Where(order => order.CardID == cardID);
        }

        [HttpGet]
        [Route("GetOwnerOrder")]
        public IEnumerable<OrderProperties> GetOwnerOrder()
        {
            int ownerid = int.Parse(HttpContext.User.Claims.First(c => c.Type == "Id").Value);
            return _context.OrderProp.Where(order => order.OwnerID == ownerid);
        }

        private int CheckCompleteOrder(int cardID) 
        {
            CardPropertiesModel cardProperties = _context.CardProperties.FirstOrDefault(card => card.CardID == cardID);
            if (cardProperties == null) { return -1; }
            List<OrderProperties> OrderList = _context.OrderProp.Where(order => order.CardID == cardID).ToList<OrderProperties>();
            int NiceNum = 0;
            for(int i = 0; i < OrderList.Count(); i++) 
            {
                if (OrderList[i].IsComplete) { NiceNum++; }
            }
            return NiceNum;
        }

    }
}
