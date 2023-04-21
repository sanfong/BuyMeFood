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
        public string? Image { get; set; }

        public UserDTO(User user)
        {
            Id = user.Id;
            Username = user.Username;
            Name = user.Name;
            FullName = user.FullName;
            PhoneNumber = user.PhoneNumber;
            Image = user.Image;
        }

        public UserDTO()
        {
        }

        public static explicit operator UserDTO(User user)
        {
            return new UserDTO(user);
        }
    }
}
