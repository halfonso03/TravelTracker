using System;
using NhacTravelReimbursement.Domain;

namespace NhacTravelReimbursement.Persistence;

public class DbInitializer
{
    internal static async Task SeedData(AppDbContext context)
    {

        if (!context.Statuses.Any())
        {
            var statuses = new List<Status>
            {
                new() { Description = "Open"},
                new() { Description = "Closed"},
                new() { Description = "Cancelled"},
            };

            context.Statuses.AddRange(statuses);
        }

        var bob = new Traveller() { FirstName = "Bob", LastName = "Smith", Email = "bsmith@test.com" };
        var jane = new Traveller() { FirstName = "Jane", LastName = "Smith", Email = "jsmith@test.com" };
        var tim = new Traveller() { FirstName = "Tim", LastName = "Smith", Email = "tsmith@test.com" };

        if (!context.Travellers.Any())
        {
            context.Travellers.Add(bob);
            context.Travellers.Add(jane);
            context.Travellers.Add(tim);
            await context.SaveChangesAsync();
        }

        if (!context.Trips.Any())
        {
            var trips = new List<Trip>
            {
                new()
                {
                    FromDate = DateTime.Today.AddDays(10),
                    ToDate = DateTime.Today.AddDays(15),
                    StatusId = 1,
                    Description = "A trip Bob went on",
                    Location = "Washington, D.C.",
                    ApprovedDate = DateTime.Today.AddDays(-10),
                    SubmittedDate = DateTime.Today.AddDays(-2),
                    Fiduciary = "MCSO",
                    TravellerId = 1
                },
                new()
                {
                    FromDate = DateTime.Today.AddDays(-15),
                    ToDate = DateTime.Today.AddDays(-10),
                    StatusId = 1,
                    Description = "Police Officers Convention",
                    Location = "Miami, FL",
                    ApprovedDate = DateTime.Today.AddDays(-10),
                    SubmittedDate = DateTime.Today.AddDays(-2),
                    Fiduciary = "MCSO",
                    TravellerId = 2
                },
                new()
                {
                    FromDate = DateTime.Today.AddDays(-25),
                    ToDate = DateTime.Today.AddDays(-20),
                    StatusId = 2,
                    Description = "DHE Meeting",
                    Location = "Denver, CO",
                    ApprovedDate = DateTime.Today.AddDays(-30),
                    SubmittedDate =  DateTime.Today.AddDays(-5),
                    ReimbursementSentDate = DateTime.Today.AddDays(-3),
                    ReimbursementPaidDate= DateTime.Today.AddDays(-2),
                    Fiduciary = "MCSO",
                    TravellerId = 3
                },
                new()
                {
                    FromDate = DateTime.Today.AddDays(-30),
                    ToDate = DateTime.Today.AddDays(-25),
                    StatusId = 2,
                    Description = "Annual CNAO Conference",
                    Location = "Boston, MA",
                    ApprovedDate = DateTime.Today.AddDays(-40),
                    SubmittedDate =  DateTime.Today.AddDays(-18),
                    ReimbursementSentDate = DateTime.Today.AddDays(-17),
                    ReimbursementPaidDate= DateTime.Today.AddDays(-10),
                    Fiduciary = "MCSO",
                    TravellerId = 3
                },
                new()
                {
                    FromDate = DateTime.Today.AddDays(-30),
                    ToDate = DateTime.Today.AddDays(-25),
                    StatusId = 3,
                    Description = "Annual CNAO Conference",
                    Location = "Boston, MA",
                    ApprovedDate = DateTime.Today.AddDays(-40),
                    SubmittedDate =  DateTime.Today.AddDays(-18),
                    ReimbursementSentDate = DateTime.Today.AddDays(-17),
                    ReimbursementPaidDate= DateTime.Today.AddDays(-10),
                    Fiduciary = "MCSO",
                    TravellerId = 3
                }
            };

            context.Trips.AddRange(trips);
        }

        await context.SaveChangesAsync();

    }
}
