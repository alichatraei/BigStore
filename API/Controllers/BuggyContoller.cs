using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyContoller : BaseAPIController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }
        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest("شما سرویس را بد صدا زده اید");
        }
        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorised()
        {
            return GetUnauthorised();
        }
        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("مشکل اول", "مشکل اول رخ داده است");
            return ValidationProblem();
        }
        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("این خطای سمت سرور است");
        }
    }
}