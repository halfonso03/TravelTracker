using System;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NhacTravelReimbursement.Domain;
using NhacTravelReimbursement.DTOs;
using NhacTravelReimbursement.Persistence;
using SQLitePCL;

namespace NhacTravelReimbursement.Controllers;

[AllowAnonymous]
public class TravelController(AppDbContext context, IMapper mapper) : BaseApiController
{

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var trip = await context.Trips
                                .Include(x => x.Status)
                                .SingleOrDefaultAsync(x => x.Id == id);

        if (trip is null)
        {
            return NotFound();
        }

        return Ok(mapper.Map<TripDto>(trip));

    }

    [HttpGet("list")]
    public async Task<ActionResult<List<TripDto>>> List()
    {
        var tripsFromDb = await context.Trips
                                .Include(x => x.Status)
                                .OrderBy(x => x.FromDate)
                                .ToListAsync();

        var tripsList = new List<TripDto>();

        var tripDtos = mapper.Map<List<TripDto>>(tripsFromDb);

        tripsList.AddRange(tripDtos);

        return Ok(tripsList);
    }

    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateTripDto trip)
    {
        var newTrip = mapper.Map<Trip>(trip);

        try
        {
            context.Trips.Add(newTrip);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }

        return Ok(newTrip.Id);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(EditTripDto editedTrip, int id)
    {
        var tripFromDb = await context.Trips.SingleOrDefaultAsync(x => x.Id == id);

        if (tripFromDb is null)
        {
            return NotFound();
        }

        mapper.Map(editedTrip, tripFromDb);

        try
        {
            context.Trips.Update(tripFromDb);

            int result = await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }

        return Ok();
    }
}


