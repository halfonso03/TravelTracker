using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NhacTravelReimbursement.Helpers;
using NhacTravelReimbursement.Services;
using SQLitePCL;

namespace NhacTravelReimbursement.Controllers
{

    public class ReportsController(IEmailSender emailSender, IReportService reportService, IConfiguration config) : BaseApiController
    {

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummaryReport()
        {

            var base64String = "";

            try
            {
                base64String = await reportService.GetReportAsBase64("/TravelTrackerReports/Reimbursements");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(new { base64String });
        }

        [HttpGet("emailReport")]
        public async Task<IActionResult> EmailReport(string email, string reportPath)
        {
            var base64String = "";

            try
            {
                try
                {
                    base64String = await reportService.GetReportAsBase64(reportPath);
                }
                catch (Exception ex)
                {
                    return BadRequest("Exception message: " + ex.Message);
                }


                byte[] byteArray = Convert.FromBase64String(base64String);

                await emailSender.SendEmail(
                    subject: $"Reimbursements report as of {DateTime.Today: M/d/yy}",
                    body: "",
                    to: email,
                    attachments:
                    [
                        new Attachment($"Reimbursements.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", byteArray)
                    ],
                    ccs: [config.GetValue<string>("CCDefaultEmail")!.ToString()]);
            }
            catch (Exception ex)
            {
                return BadRequest("Exception message: " + ex.Message);
            }

            return Ok();
        }
    }
}
