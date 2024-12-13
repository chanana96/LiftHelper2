using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System;
using api.Models;
using api.Data;
using api.Services;
using System.ComponentModel.DataAnnotations;

namespace api.Controllers
{
    public class RequestBody
    {
        [Required]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }

        [Required]
        public string? ConfirmPassword { get; set; }

        public bool? AllowEmails { get; set; }
    }

    [ApiController]
    [Route("auth")]
    public class UserController(IUserService userService) : ControllerBase
    {
        private readonly IUserService _userService = userService;

        [HttpPost("signup")]
        public async Task<IActionResult> Post([FromBody] RequestBody body)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Console.WriteLine(body);
            await _userService.SignupAsync(body);
            return Ok();

        }
    }
}
