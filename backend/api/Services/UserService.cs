using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using api.Models;
using api.Controllers;

namespace api.Services
{
    public interface IUserService
    {
        Task<User> SignupAsync(RequestBody request);
    }

    public class UserService : IUserService
    {
        private readonly PasswordHasher<User> _passwordHasher;

        public UserService()
        {
            _passwordHasher = new PasswordHasher<User>();
        }

        public async Task<User> SignupAsync(RequestBody request)
        {
            var user = new User();
            string hashedPassword = _passwordHasher.HashPassword(user, request.Password!);
            await Task.CompletedTask;
            return user;
        }
    }
}