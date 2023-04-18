using System.ComponentModel.DataAnnotations;

namespace BuyMeFood.Models
{
    public class RegisterModel
    {
        [Required]
        public string? Username { get; set; }
        [Required]
        [MinLength(6)]
        public string? Password { get; set; }
        [Required]
        [Compare("Password")]
        public string? ConfirmPassword { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? FullName { get; set; }
        [Required]
        [Phone]
        public string? PhoneNumber { get; set; }
    }
}
