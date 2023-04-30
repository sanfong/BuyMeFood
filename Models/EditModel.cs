using System.ComponentModel.DataAnnotations;

namespace BuyMeFood.Models
{
    public class EditModel
    {
        [Required]
        public string? Username { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? FullName { get; set; }
        [Required]
        [Phone]
        public string? PhoneNumber { get; set; }

        public string? Image { get; set; }
    }
}
