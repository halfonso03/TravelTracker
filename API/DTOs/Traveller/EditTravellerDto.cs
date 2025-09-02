using System;
using System.ComponentModel.DataAnnotations;

namespace NhacTravelReimbursement.DTOs;

public class EditTravellerDto
{


    [Required]
    public required string FirstName { get; set; }

    [Required]
    public required string LastName { get; set; }

    [Required]
    public required string Email { get; set; }

    [Compare(nameof(Email), ErrorMessage = "Email and confirm email do not match")]
    public string? ConfirmEmail { get; set; }

}
