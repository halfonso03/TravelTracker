using System;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Net.Http.Headers;

namespace NhacTravelReimbursement.Domain;

public class Trip
{
    public int Id { get; set; }
    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }
    public string TravellerName { get; set; } = null!;
    public required int StatusId { get; set; }
    public DateTime? ApprovedDate { get; set; }
    public Status? Status { get; set; }
    public required string Description { get; set; }
}
