using System.ComponentModel.DataAnnotations;

namespace BuyMeFood.Models
{
    public class UniqueUsernameAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null)
                return new ValidationResult("Value is null.");

            if (validationContext.GetService(typeof(AppDBContext)) is AppDBContext _context)
            {
                var entity = _context.Users.SingleOrDefault(u => u.Username == value.ToString());
                if (entity != null)
                {
                    return new ValidationResult("Username already exists.");
                }
            }

            return ValidationResult.Success!;
        }
    }
}
