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
        public string? LoactionName { get; set; }
        [Required]
        public string? StoreName { get; set; }
        public string? Image { get; set; }

        public int MaxOrder { get; set; } // default = 3

        public int OrderCount { get; set; }

        public string? Description { get; set; }

        public bool IsExpired { get; set; }

        public DateTime ExpiredTime { get; set; }

        public DateTime Timestamp { get; set; }

        //public List<OrderModel> OrderList { get; set; } = new List<OrderModel>();

        public class Order 
        {
            [Key]
            public int OrderID { get; set; }
            public int UserID { get; set; }

            public string? StoreName { get; set; }

            public string? Description { get; set; }

            public Order() { }
            public Order(int userID,string storeID,string description) 
            {
                this.UserID = userID;
                this.StoreName = storeID;
                this.Description = description;
            }
        }

        public List<Order> OrderList { get; set; } = new List<Order>();

        public CardPropertiesModel(CreateCardModels CreateModel,int Owner) 
        {
            OwnerID = Owner;
            LoactionName = CreateModel.LoactionName;
            StoreName = CreateModel.StoreName;
            Image = CreateModel.Image;
            MaxOrder = (CreateModel.MaxOrder <= 0) ? 3 : CreateModel.MaxOrder;
            Description = CreateModel.Description ?? "None";
            IsExpired = false;
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