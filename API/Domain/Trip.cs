using System;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Net.Http.Headers;

namespace NhacTravelReimbursement.Domain;

public class Trip
{
    public int Id { get; set; }
    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }
    public required int StatusId { get; set; }
    public Status? Status { get; set; }
    public required string Description { get; set; }
    public required string Location { get; set; }
    public required string Fiduciary { get; set; }
    public DateTime? ApprovedDate { get; set; }
    public DateTime? SubmittedDate { get; set; }
    public DateTime? ReimbursementSentDate { get; set; }
    public DateTime? ReimbursementPaidDate { get; set; }
    public required int TravellerId { get; set; }
    public Traveller? Traveller { get; set; }

}
