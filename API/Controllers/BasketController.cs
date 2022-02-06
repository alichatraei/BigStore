using System;
using API.Data;
using API.Controllers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Entity;
using Microsoft.EntityFrameworkCore;
using API.DTOs;

namespace API.Controllers
{
    public class BasketController : BaseAPIController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.ProductName,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureURL,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }

        [HttpPost]//api/basket?productId=3&quantity=2

        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            //get Basket || create Basket
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreateBasket();
            var product = await _context.Product.FindAsync(productId);
            if (product == null) return NotFound();
            basket.addItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return StatusCode(201);

            return BadRequest(new ProblemDetails { Title = "ارور ذخیره آیتم ها در سبد خرید" });

        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            //Get basket
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            //remove item or reduce quantity
            basket.removeItem(productId, quantity);
            //save changes
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "هنگام حذف تعداد یک محصول از سبد خرید خطا رخ داده است" });

        }
        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Basket
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30)
            };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            _context.Basket.Add(basket);
            return basket;
        }
    }
}