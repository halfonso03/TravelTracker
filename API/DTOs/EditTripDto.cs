using System;

namespace NhacTravelReimbursement.DTOs;

public class EditTripDto : CreateTripDto
{
    public DateTime? ApprovedDate { get; set; }
}
