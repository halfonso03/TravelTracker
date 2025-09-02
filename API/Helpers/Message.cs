using System;
using MimeKit;

namespace NhacTravelReimbursement.Helpers;

public class Message
{
    public List<MailboxAddress> To { get; set; }
    public List<MailboxAddress> CCs { get; set; }
    public string Subject { get; set; }
    public string Content { get; set; }
    public string From { get; set; }

    public List<Attachment> Attachments { get; set; } = new List<Attachment>();

    public Message(IEnumerable<string> to, string subject, string content, string from = "", IEnumerable<string>? ccs = null)
    {
        To = new List<MailboxAddress>();
        To.AddRange(to.Select(x => new MailboxAddress(x, x)));
        CCs = new List<MailboxAddress>();
        if (ccs != null)
        {
            CCs.AddRange(ccs.Select(x => new MailboxAddress(x, x)));
        }
        Subject = subject;
        Content = content;
        From = from;
    }

    public Message(string to, string subject, string content, string from = "", IEnumerable<string>? ccs = null)
    {
        To = new List<MailboxAddress> { new MailboxAddress(to, to) };
        CCs = new List<MailboxAddress>();
        if (ccs != null)
        {
            CCs.AddRange(ccs.Select(x => new MailboxAddress(x, x)));
        }

        Subject = subject;
        Content = content;
        From = from;
    }

}