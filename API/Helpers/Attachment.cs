using System;

namespace NhacTravelReimbursement.Helpers;

public class Attachment
{
    public Attachment(string fileName, string contentType, byte[] content)
    {
        FileName = fileName;
        Content = content;
        ContentType = contentType;
    }

    public string FileName { get; set; }
    public byte[] Content { get; set; }
    public string ContentType { get; set; }
}