using System;
using Microsoft.EntityFrameworkCore;
using NhacTravelReimbursement.Domain;

namespace NhacTravelReimbursement.Persistence;

public class AppDbContext : DbContext
{
    public DbSet<Trip> Trips { get; set; }
    public DbSet<Status> Statuses { get; set; }

    public AppDbContext(DbContextOptions options): base(options)
    {
        
    }
}
