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
                    Description = "A trip Bob went on"
                },

                new()
                {
                    FromDate = DateTime.Today.AddDays(-15),
                    ToDate = DateTime.Today.AddDays(-10),
                    StatusId = 2,
                    TravellerName = "Tom",
                    Description = "A trip Tom went on"
                }
            };

            context.Trips.AddRange(trips);
        }

        await context.SaveChangesAsync();

    }
}
