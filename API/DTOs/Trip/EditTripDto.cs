using System;

namespace NhacTravelReimbursement.DTOs;

public class EditTripDto : CreateTripDto
{

    public int Id { get; set; }
    public DateTime? ApprovedDate { get; set; }
    public DateTime? SubmittedDate { get; set; }
    public DateTime? ReimbursementSentDate { get; set; }
    public DateTime? ReimbursementPaidDate { get; set; }
}
