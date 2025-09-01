using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NhacTravelReimbursement.Controllers
{

    public class ReportsController : BaseApiController
    {

        [HttpGet("summary")]
        public async Task<IActionResult> GetByteArray()
        {
            byte[] data = System.IO.File.ReadAllBytes("nhac pmp.xlsx");
            string base64String = Convert.ToBase64String(data);

            await Task.Delay(800);
            return Ok(new { ByteArray = base64String });
        }
    }
}
