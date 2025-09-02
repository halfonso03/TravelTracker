using System;
using System.ComponentModel.DataAnnotations;

namespace NhacTravelReimbursement.DTOs;

public class CreateTravellerDto : TravellerDto
{
    [Compare(nameof(Email), ErrorMessage = "Email and confirm email do not match")]
    public required string ConfirmEmail { get; set; }
}
