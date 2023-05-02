using BuyMeFood.Middleware;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace BuyMeFood.Models
{
    public class RegisterModel
    {
        [Required]
        [UniqueUsername]
        public string? Username { get; set; }
        [Required]
        [MinLength(6)]
        public string? Password { get; set; }
        [Required]
        [Compare(nameof(Password))]
        public string? ConfirmPassword { get; set; }
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
