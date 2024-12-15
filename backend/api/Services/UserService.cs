using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.Controllers;
using api.Data;
namespace api.Services
{
    public interface IUserService
    {
        Task<User> SignupAsync(SignupRequest request);
    }

    public class UserService(ApplicationDbContext context) : IUserService
    {
        private readonly ApplicationDbContext _context = context;
        private readonly PasswordHasher<User> _passwordHasher = new PasswordHasher<User>();

        public async Task<User> SignupAsync(SignupRequest request)
        {
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                throw new InvalidOperationException("Email already exists");
            }

            var user = new User();
            string hashedPassword = _passwordHasher.HashPassword(user, request.Password!);
            user.Email = request.Email;
            user.HashedPassword = hashedPassword;
            user.CreatedAt = DateTime.UtcNow;
            user.AllowEmails = request.AllowEmails;
            // _context.Users.Add(user);
            // await _context.SaveChangesAsync();
            return user;
        }
    }
}