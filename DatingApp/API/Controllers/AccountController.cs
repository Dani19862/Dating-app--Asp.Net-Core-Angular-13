using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



namespace API.Controllers
{
    
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController( DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService ;
            _context = context;
            
        }
        [HttpPost("register")] //api//acount /register
        public async Task<ActionResult<UserDto>> Register (RegisterDto registerDto)
        {
            using var hmac = new HMACSHA512();

            if(await UserExist(registerDto.Username)) return BadRequest("User Name Already Exist");
            var user = new AppUser
            {
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user); 
            await _context.SaveChangesAsync();
            return  new UserDto {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };

        }

        [HttpPost("login")] //api//account/login

        public async Task<ActionResult<UserDto>> Login (LoginDto loginDto)
        {
            var user = await this._context.Users.SingleOrDefaultAsync(x=>x.UserName ==loginDto.Username.ToLower());
            if (user ==null) return Unauthorized("Invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash =hmac.ComputeHash( System.Text.Encoding.UTF8.GetBytes(loginDto.Password));

            for (var i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized ("invalid password");
                
            }
            return new UserDto {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }
        private async Task<bool> UserExist(string username)
        {
            return await _context.Users.AnyAsync(x=>x.UserName == username.ToLower());
        }


        
    }

    
}