using System.ComponentModel.DataAnnotations;

namespace BuyMeFood.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Username { get; set; }
        [Required]
        [MinLength(6)]
        public string? Password { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? FullName { get; set; }
        [Required]
        [Phone]
        public string? PhoneNumber { get; set; }
        public int BuyerCredit { get; set; } = 0;
        public int CustomerCredit { get; set; } = 0;

        public User() { }

        public User(RegisterModel register)
        {
            Username = register.Username;
            Password = register.Password;
            Name = register.Name;
            FullName = register.FullName;
            PhoneNumber = register.PhoneNumber;
        }
    }
}
