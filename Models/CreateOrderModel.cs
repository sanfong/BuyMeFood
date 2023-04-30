using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace BuyMeFood.Models
{
    public class CreateOrderModel
    {
        [Required]
        public int cardID;
        [Required]
        public string? storeName { get; set; }
        [Required]
        public string? description { get; set; }
    }
}
