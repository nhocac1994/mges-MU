using Microsoft.AspNetCore.Mvc;
using MuOnlineAPI.Models;
using MuOnlineAPI.Services;

namespace MuOnlineAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CharacterController : ControllerBase
    {
        private readonly IDatabaseService _databaseService;
        private readonly ILoggingService _loggingService;
        private readonly ISecurityService _securityService;
        private readonly ILogger<CharacterController> _logger;

        public CharacterController(
            IDatabaseService databaseService,
            ILoggingService loggingService,
            ISecurityService securityService,
            ILogger<CharacterController> logger)
        {
            _databaseService = databaseService;
            _loggingService = loggingService;
            _securityService = securityService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<object>>> GetCharacters([FromQuery] string accountId)
        {
            var ipAddress = Request.HttpContext.Connection.RemoteIpAddress?.ToString() ?? "Unknown";
            
            accountId = accountId?.Trim();
            
            await _loggingService.LogAccessAsync(ipAddress, "GET", $"/api/character?accountId={accountId}", accountId);

            if (string.IsNullOrWhiteSpace(accountId) || !_securityService.ValidateAccountId(accountId))
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Account ID không hợp lệ"
                });
            }

            var characters = await _databaseService.GetCharactersAsync(accountId);
            await _loggingService.LogDataAccessAsync(accountId, "Character", "SELECT");

            return Ok(new ApiResponse<object>
            {
                Success = true,
                Data = new
                {
                    characters = characters,
                    totalCharacters = characters.Count
                },
                Message = $"Retrieved {characters.Count} characters"
            });
        }
    }
}

