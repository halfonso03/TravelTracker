using System;
using NhacTravelReimbursement.Helpers;

namespace NhacTravelReimbursement.Services;

public interface IReportService
{
    Task<string> GetReportAsBase64(string path);
}

public class ReportService(IConfiguration configuration) : IReportService
{
    public async Task<string?> GetReportAsBase64(string path)
    {
        ReportOutputResponse? reportOutput = default(ReportOutputResponse);

        try
        {
            using (HttpClient client = new HttpClient())
            {
                var response = await client.GetAsync(configuration.GetValue<string>("ReportUrl"));
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
