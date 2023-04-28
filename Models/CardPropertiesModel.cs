using Microsoft.Extensions.Configuration.UserSecrets;
using NuGet.Packaging.Signing;
using System.ComponentModel.DataAnnotations;

namespace BuyMeFood.Models
{
    public class CardPropertiesModel
    {
        [Key]
        public int CardID { get; set; }
        [Required]
        public int OwnerID { get; set; }
        [Required]
        public string? LoactionStoreName { get; set; }
        [Required]
        public string? LoactionPickupName { get; set; }

        public string? Image { get; set; }

        public int MaxOrder { get; set; } // default = 3

        public int OrderCount { get; set; }

        public int CompleteOrder { get; set; }

        public string? Description { get; set; }

        public bool IsExpired { get; set; }

        public bool IsComplete { get; set; }

        public DateTime ExpiredTime { get; set; }

        public DateTime Timestamp { get; set; }

        public CardPropertiesModel(CreateCardModels CreateModel,int Owner) 
        {
            OwnerID = Owner;
            LoactionStoreName = CreateModel.LoactionStoreName;
            LoactionPickupName = CreateModel.LocationPickupName;
            Image = CreateModel.Image;
            MaxOrder = (CreateModel.MaxOrder <= 0) ? 3 : CreateModel.MaxOrder;
            Description = CreateModel.Description ?? "None";
            IsExpired = false;
            IsComplete = false;
            DateTime now = DateTime.Now;
            ExpiredTime = new DateTime(now.Year, now.Month, now.Day, CreateModel.ExprTimeHour, CreateModel.ExprTimeMinute, 0);
            Timestamp = DateTime.Now;
            OrderCount = 0;
        }

        public void testfunction() 
        {

        }
        public CardPropertiesModel() { }
    }
}