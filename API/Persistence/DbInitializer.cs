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
            };

            context.Statuses.AddRange(statuses);

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
                    TravellerName = "Bob",
                    Description = "A trip Bob went on",
                    Location = "Washington, D.C.",
                    ApprovedDate = DateTime.Today.AddDays(-10),
                    SubmittedDate = DateTime.Today.AddDays(-2),
                    Fiduciary = "MCSO"
                },
                new()
                {
                    FromDate = DateTime.Today.AddDays(-15),
                    ToDate = DateTime.Today.AddDays(-10),
                    StatusId = 1,
                    TravellerName = "Tom",
                    Description = "Police Officers Convention",
                    Location = "Miami, FL",
                    ApprovedDate = DateTime.Today.AddDays(-10),
                    SubmittedDate = DateTime.Today.AddDays(-2),
                    Fiduciary = "MCSO"
                },
                new()
                {
                    FromDate = DateTime.Today.AddDays(-25),
                    ToDate = DateTime.Today.AddDays(-20),
                    StatusId = 2,
                    TravellerName = "Jane",
                    Description = "DHE Meeting",
                    Location = "Denver, CO",
                    ApprovedDate = DateTime.Today.AddDays(-30),
                    SubmittedDate =  DateTime.Today.AddDays(-5),
                    ReimbursementSentDate = DateTime.Today.AddDays(-3),
                    ReimbursementPaidDate= DateTime.Today.AddDays(-2),
                    Fiduciary = "MCSO"
                },
                new()
                {
                    FromDate = DateTime.Today.AddDays(-30),
                    ToDate = DateTime.Today.AddDays(-25),
                    StatusId = 2,
                    TravellerName = "Rebecca",
                    Description = "Annual CNAO Conference",
                    Location = "Boston, MA",
                    ApprovedDate = DateTime.Today.AddDays(-40),
                    SubmittedDate =  DateTime.Today.AddDays(-18),
                    ReimbursementSentDate = DateTime.Today.AddDays(-17),
                    ReimbursementPaidDate= DateTime.Today.AddDays(-10),
                    Fiduciary = "MCSO"
                }
            };

            context.Trips.AddRange(trips);
        }

        await context.SaveChangesAsync();

    }
}
