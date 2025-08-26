using System;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace NhacTravelReimbursement.DTOs;

public class CreateTripDto
{
    [Required]
    [FromDateBeforeToDateValidator(nameof(ToDate), ErrorMessage = "From date must be less than to date")]
    public DateTime FromDate { get; set; }

    [Required]
    public DateTime ToDate { get; set; }

    [Required]
    public required string TravellerName { get; set; }

    [Required]
    public required int StatusId { get; set; }

    [Required]
    public required string Description { get; set; }
}

