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
        public string? LoactionName { get; set; }
        [Required]
        public string? StoreName { get; set; }

        [Required]
        public string? ExprTime { get; set; }

        public string? Image { get; set; }

        public int MaxOrder { get; set; } // default = 3

        public string? Description { get; set; }

        public bool IsExpired { get; set; }

        public CardPropertiesModel(CreateCardModels CreateModel,int Owner) 
        {
            OwnerID = Owner;
            LoactionName = CreateModel.LoactionName;
            StoreName = CreateModel.StoreName;
            ExprTime = CreateModel.ExprTime;
            Image = CreateModel.Image;
            MaxOrder = (CreateModel.MaxOrder <= 0) ? 3 : CreateModel.MaxOrder;
            Description = CreateModel.Description ?? "None";
            IsExpired = false;
        }

        public CardPropertiesModel() { }
    }
}