using System;

namespace NhacTravelReimbursement.Services;

public interface IReportService
{
    Task<string> GetReportAsBase64(string path);
}

public class ReportService : IReportService
{
    public async Task<string> GetReportAsBase64(string path)
    {
        // make http get to another app to send report, maybe HOTT
        // have it return the report bytes

        byte[] data = await System.IO.File.ReadAllBytesAsync("nhac pmp.xlsx");
        string base64String = Convert.ToBase64String(data);

        return base64String;


    }
}
