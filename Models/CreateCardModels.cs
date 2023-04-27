using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace BuyMeFood.Models
{
    public class CreateCardModels
    {
        [Required]
        public string? LoactionName { get; set; }
        [Required]
        public string? StoreName { get; set; }

        [Required]
        public string? ExprTime { get; set; }

        public string? Image { get; set; }

        public int MaxOrder { get; set; } // default = 3

        public string? Description { get; set; }

        public DateTime ExpiredTime { get; set; }

    }
}
