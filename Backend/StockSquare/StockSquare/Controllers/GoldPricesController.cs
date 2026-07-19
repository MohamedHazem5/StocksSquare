using Microsoft.AspNetCore.Mvc;
using StockSquare.Data;

namespace StockSquare.Controllers;

[ApiController]
[Route("api/gold-prices")]
public class GoldPricesController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(MarketData.GoldPrices);
}
