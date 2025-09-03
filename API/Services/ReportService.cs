using System;
using NhacTravelReimbursement.Helpers;

namespace NhacTravelReimbursement.Services;

public interface IReportService
{
    Task<string> GetReportAsBase64(string path);
}

public class ReportService : IReportService
{
    public async Task<string?> GetReportAsBase64(string path)
    {
        ReportOutputResponse? reportOutput = default(ReportOutputResponse);

        try
        {
            using (HttpClient client = new HttpClient())
            {
                var response = await client.GetAsync("http://localhost/HOTT/api/traveltracker");
                reportOutput = await response.Content.ReadFromJsonAsync<ReportOutputResponse>();
            }

        }
        catch (Exception ex)
        {
            //var m = ex.Message;

            throw;
        }

        return reportOutput != null ? reportOutput.Data : "";
    }
}
