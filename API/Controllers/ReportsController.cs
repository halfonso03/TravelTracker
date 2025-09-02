using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NhacTravelReimbursement.Helpers;
using NhacTravelReimbursement.Services;

namespace NhacTravelReimbursement.Controllers
{

    public class ReportsController(IEmailSender emailSender, IReportService reportService) : BaseApiController
    {

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummaryReport()
        {
            byte[] data = System.IO.File.ReadAllBytes("nhac pmp.xlsx");
            string base64String = Convert.ToBase64String(data);

            await Task.Delay(800);
            return Ok(new { ByteArray = base64String });
        }

        [HttpGet("emailReport")]
        public async Task<IActionResult> EmailReport(string email, string reportPath)
        {
            var report = await reportService.GetReportAsBase64(reportPath);
            byte[] byteArray = Convert.FromBase64String(report);

            await emailSender.SendEmail(
                "Report",
                "",
                email,
                attachments:
                [
                    new Attachment($"Reimbursements.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", byteArray)
                ]);


            return Ok();
        }
    }
}
