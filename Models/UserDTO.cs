namespace BuyMeFood.Models
{
    // User Data Transfer Object
    public class UserDTO
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Name { get; set; }
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public int BuyerCredit { get; set; } = 0;
        public int CustomerCredit { get; set; } = 0;

        public UserDTO(User user)
        {
            Id = user.Id;
            Username = user.Username;
            Name = user.Name;
            FullName = user.FullName;
            PhoneNumber = user.PhoneNumber;
            BuyerCredit = user.BuyerCredit;
            CustomerCredit = user.CustomerCredit;
        }

        public static explicit operator UserDTO(User user)
        {
            return new UserDTO(user);
        }
    }
}
