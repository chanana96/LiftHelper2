namespace api.Models
{
	using System.ComponentModel.DataAnnotations;

	public class SignupRequest : IValidatableObject
	{
		[Required]
		[EmailAddress]
		public string Email { get; set; } = string.Empty;

		[Required]
		[MinLength(8)]
		public string Password { get; set; } = string.Empty;

		[Compare(nameof(Password))]
		public string ConfirmPassword { get; set; } = string.Empty;
		public bool AllowEmails { get; set; } = false;

		public IEnumerable<ValidationResult> Validate(ValidationContext context)
		{
			if (Password != ConfirmPassword)
			{
				yield return new ValidationResult(
					"Passwords do not match",
					[nameof(Password), nameof(ConfirmPassword)]
				);
			}
		}
	}
}