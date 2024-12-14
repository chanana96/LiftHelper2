namespace api.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string? Email { get; set; }
        public string? HashedPassword { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool AllowEmails { get; set; }
    }
}