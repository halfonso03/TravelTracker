using System;

namespace NhacTravelReimbursement.Helpers;

public interface IEmailSender
{
    //Task SendEmail(Message message);
    Task SendEmail(string subject, string body, string to = "", string from = "", Attachment[]? attachments = null, IEnumerable<string>? ccs = null);

}