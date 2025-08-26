using System;

namespace NhacTravelReimbursement.DTOs;

public class TripDto
{
    public int Id { get; set; }

    [FromDateBeforeToDateValidator(nameof(ToDate), ErrorMessage = "From date must be less than to date")]
    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }
    public required string TravellerName { get; set; }
    public required int StatusId { get; set; }
    public DateTime? ApprovedDate { get; set; }
    public required string Status { get; set; }
    public required string Description { get; set; }

}
