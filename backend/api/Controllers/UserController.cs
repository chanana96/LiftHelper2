using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System;
using api.Models;
using api.Data;
using api.Services;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;
namespace api.Controllers
{

    [ApiController]
    [Route("auth")]
    public class UserController(IUserService userService) : ControllerBase
    {
        private readonly IUserService _userService = userService;

        [HttpPost("signup")]
        public async Task<IActionResult> Post([FromBody] SignupRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = await _userService.SignupAsync(request);
                return Ok(user);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
