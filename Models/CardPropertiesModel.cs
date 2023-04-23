﻿using System.ComponentModel.DataAnnotations;

namespace BuyMeFood.Models
{
    public class CardPropertiesModel
    {
        [Key]
        public int CardID { get; set; }
        [Required]
        public int OwnerID { get; set; }
        [Required]
        public string? loactionName { get; set; }
        [Required]
        public string? StoreName { get; set; }

        [Required]
        public string? ExprTime { get; set; }

        public string? Image { get; set; }

        public string? MaxOrder { get; set; } // default = 3

        public string? description { get; set; }

        public bool isExpired { get; set; }

        public CardPropertiesModel(CreateCardModels CreateModel) 
        {

        }
    }
}