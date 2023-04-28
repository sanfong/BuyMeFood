using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace BuyMeFood.Models
{
    public class CreateCardModels
    {
        [Required]
        public string? LoactionStoreName { get; set; }
        [Required]
        public string? LocationPickupName { get; set; }
        [Required]
        public int ExprTimeHour { get; set; }
        public int ExprTimeMinute { get; set; }
        public string? Image { get; set; }

        public int MaxOrder { get; set; } // default = 3

        public string? Description { get; set; }


    }
}
