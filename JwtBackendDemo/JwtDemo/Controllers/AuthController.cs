using JwtDemo.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JwtDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {


        [HttpPost]
        [Route("[action]")]
        public IActionResult Login([FromBody]LoginModel user)
        {
            Console.WriteLine($"{user.UserName }{ user.Password}");
            if( user is null)
            {
                return BadRequest("Invalid client request");
            }
            if( user.UserName == "admin" && user.Password == "Secret123$")
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(issuer: "https://localhost:5001",
                    audience: "https://localhost:5001",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signingCredentials);

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new AuthenticationResponse { Token = tokenString });
            }
            return Unauthorized();
        }
    }
}
