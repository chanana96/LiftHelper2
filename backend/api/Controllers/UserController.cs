using Microsoft.AspNetCore.Mvc;
using System;
using api.Models;
using api.Data;

namespace api.Controllers
{
    public class RequestBody
    {
        public string? Text { get; set; }
    }

    [ApiController]
    [Route("auth")]
    public class UserController : ControllerBase
    {

        [HttpPost("signup")]
        public IActionResult Post([FromBody] RequestBody body)
        {
            Console.WriteLine(body.Text);
            return Ok();

        }
    }
}
