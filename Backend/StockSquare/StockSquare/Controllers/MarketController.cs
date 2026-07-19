using Microsoft.AspNetCore.Mvc;
using StockSquare.Data;

namespace StockSquare.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MarketController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(MarketData.Snapshot);
}
