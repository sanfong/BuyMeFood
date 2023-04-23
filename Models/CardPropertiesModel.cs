using System.ComponentModel.DataAnnotations;

namespace BuyMeFood.Models
{
    public class CardPropertiesModel
    {
        [Key]
        public int CardID { get; set; }
        [Required]
        public string? PictureID { get; set; }
        [Required]
        public string? StoreLocationName { get; set; }
    }
}