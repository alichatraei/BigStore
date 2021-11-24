using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext context;
        public ProductsController(StoreContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductEntity>>> getProducts()
        {
            return await context.Product.ToListAsync();

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ProductEntity>> getProduct(int id)
        {
            return await context.Product.FindAsync(id);
        }
    }
}