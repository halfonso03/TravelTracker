using System;
using System.ComponentModel.DataAnnotations;

namespace NhacTravelReimbursement.DTOs;

public class TravellerDto
{
    public int Id { get; set; }

    [Required]
    public required string FirstName { get; set; }

    [Required]
    public required string LastName { get; set; }

    [Required]
    public required string Email { get; set; }
}
