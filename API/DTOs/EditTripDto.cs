using System;

namespace NhacTravelReimbursement.DTOs;

public class EditTripDto : CreateTripDto
{
    public DateTime? ApprovedDate { get; set; }
    public DateTime? SubmittedDate { get; set; }
    public DateTime? ReimbursementSentDate { get; set; }
    public DateTime? ReimbursementPaidDate { get; set; }
}
