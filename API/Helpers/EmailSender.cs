using MailKit.Net.Smtp;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Net;
using MailKit.Security;
using NhacTravelReimbursement.Configuration;

namespace NhacTravelReimbursement.Helpers
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailConfiguration _emailConfig;
        private readonly IConfiguration _configuration;
        private bool sendToDefaultEmail = false;
        private bool emailNotificationsEnabled = false;
        private string defaultEmail = "";


        public EmailSender(EmailConfiguration emailConfig, IConfiguration configuration)
        {
            _emailConfig = emailConfig;

            sendToDefaultEmail = int.Parse(configuration.GetValue<string>("SendToDefaultEmail")!) == 1;
            emailNotificationsEnabled = int.Parse(configuration.GetValue<string>("EmailNotificationsEnabled")!) == 1;
            defaultEmail = configuration.GetValue<string>("DefaultEmail")!;
            _configuration = configuration;
        }


        public async Task SendEmail(string subject, string body, string to = "", Attachment[]? attachments = null, IEnumerable<string>? ccs = null)
        {
            if (!emailNotificationsEnabled) return;


            try
            {
                body = _configuration.GetValue<string>("EmailHeader") + body;
                body += $"<br /><br />To: {to}";

                if (sendToDefaultEmail || to == "")
                {
                    to = defaultEmail;
                }


                var from = _emailConfig.From;

                var message = new Message(to, subject, body, from, ccs);


                if (attachments != null)
                {
                    foreach (var att in attachments)
                    {
                        message.Attachments.Add(att);
                    }
                }


                var emailMessage = CreateEmailMessage(message);


                if (ccs is not null)
                {
                    emailMessage.Cc.Add(new MailboxAddress(ccs.First(), ccs.First()));
                }

                emailMessage.Bcc.Add(new MailboxAddress(
                    _configuration.GetValue<string>("DefaultEmail"),
                     _configuration.GetValue<string>("DefaultEmail")));

                await Send(emailMessage);
            }
            catch (Exception)
            {
                throw;
            }

        }

        private MimeMessage CreateEmailMessage(Message message)
        {
            var emailMessage = new MimeMessage();

            if (string.IsNullOrEmpty(message.From))
            {
                emailMessage.From.Add(new MailboxAddress(_emailConfig.From, _emailConfig.From));
            }
            else
            {
                emailMessage.From.Add(new MailboxAddress(message.From, message.From));
            }



            message.To.ForEach(m => emailMessage.To.Add(m));
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = message.Content };
            emailMessage.Importance = MessageImportance.High;

            var builder = new BodyBuilder { HtmlBody = message.Content };


            if (message.Attachments != null)
            {
                foreach (var attachment in message.Attachments)
                {
                    builder.Attachments.Add(attachment.FileName, attachment.Content);
                }
            }

            emailMessage.Body = builder.ToMessageBody();

            if (message.CCs != null)
            {
                emailMessage.Cc.AddRange(message.CCs);
            }


            return emailMessage;
        }

        private async Task Send(MimeMessage mailMessage)
        {
            using (SmtpClient client = new SmtpClient())
            {


                /*
                await client.ConnectAsync(
                  _emailConfig.SmtpServer,
                  _emailConfig.Port,
                  MailKit.Security.SecureSocketOptions.StartTls);

                var creds = new NetworkCredential();
                creds.UserName = _emailConfig.UserName;
                creds.Password = _emailConfig.Password;
                creds.Domain = _emailConfig.Domain;

                client.Authenticate(creds);

                await client.SendAsync(mailMessage);
                */

                try
                {

                    // MailKit.Security.SecureSocketOptions.StartTls)


                    client.Timeout = 10000;

                    client.Connect(
                        _emailConfig.SmtpServer,
                        _emailConfig.Port,
                        SecureSocketOptions.StartTls);

                    var creds = new NetworkCredential();
                    creds.UserName = _emailConfig.UserName;
                    creds.Password = _emailConfig.Password;
                    creds.Domain = _emailConfig.Domain;

                    client.Authenticate(creds);


                    await client.SendAsync(mailMessage);
                }
                catch (Exception ex)
                {

                    var m = ex.Message;

                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }


    }
}
