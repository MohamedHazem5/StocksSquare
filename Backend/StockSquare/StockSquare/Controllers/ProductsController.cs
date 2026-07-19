using Microsoft.AspNetCore.Mvc;
using StockSquare.Data;

namespace StockSquare.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public IActionResult Get([FromQuery] string? category)
    {
        var products = MarketData.Products.AsEnumerable();

        if (!string.IsNullOrWhiteSpace(category))
        {
            products = products.Where(p =>
                p.CategorySlug.Equals(category, StringComparison.OrdinalIgnoreCase));
        }

        return Ok(products.ToList());
    }

    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        var product = MarketData.Products.FirstOrDefault(p => p.Id == id);
        return product is null ? NotFound() : Ok(product);
    }
}
