using Microsoft.Extensions.Configuration.UserSecrets;
using NuGet.Packaging.Signing;
using System.ComponentModel.DataAnnotations;

namespace BuyMeFood.Models
{
    public class OrderProperties
    {
        [Key]
        public int OrderID { get; set; }

        public int CardID { get; set; }

        public int OwnerID { get; set; }

        public string? OwnerName { get; set; }

        public string? StoreName { get; set; }

        public string? Description { get; set; }

        public bool IsComplete { get; set; }

        public OrderProperties(int cardID,int userID, string storeID, string description,string ownerName)
        {
            this.CardID = cardID;
            this.OwnerID = userID;
            this.StoreName = storeID;
            this.Description = description;
            this.IsComplete = false;
            this.OwnerName = ownerName;
        }
        public OrderProperties(){}
    }
}
