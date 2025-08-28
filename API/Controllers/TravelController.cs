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
        var trip = await GetTrip(id);

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
        var tripFromDb = await GetTrip(id);

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

    [HttpPost("{id}/open")]
    public async Task<IActionResult> Open(int id)
    {
        var trip = await GetTrip(id);

        if (trip != null)
        {
            trip.StatusId = 1;
            await context.SaveChangesAsync();
        }

        return Ok();
    }


    [HttpPost("{id}/close")]
    public async Task<IActionResult> Close(int id)
    {
        var trip = await GetTrip(id);

        if (trip != null)
        {
            trip.StatusId = 2;
            await context.SaveChangesAsync();
        }

        return Ok();
    }

    private async Task<Trip?> GetTrip(int id)
    {
        return await context.Trips.FirstOrDefaultAsync(x => x.Id == id);
    }


}


