using System.Drawing;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NhacTravelReimbursement.Domain;
using NhacTravelReimbursement.DTOs;
using NhacTravelReimbursement.Persistence;
using SQLitePCL;

namespace NhacTravelReimbursement.Controllers
{
    public class TravellersController(AppDbContext context, IMapper mapper) : BaseApiController
    {
        [HttpGet("list")]
        public async Task<IActionResult> GetTravellers()
        {
            var travellers = await context.Travellers
                                    .OrderBy(x => x.LastName)
                                    .ThenBy(x => x.FirstName)
                                    .ToListAsync();

            var dtos = mapper.Map<List<TravellerDto>>(travellers);

            return Ok(dtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTraveller(int id)
        {
            var traveller = await context.Travellers.FirstOrDefaultAsync(x => x.Id == id);

            if (traveller is null) return NotFound();

            var dto = mapper.Map<TravellerDto>(traveller);

            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateTravellerDto travellerDto)
        {
            var traveller = mapper.Map<Traveller>(travellerDto);

            try
            {

                context.Travellers.Add(traveller);

                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(traveller.Id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, EditTravellerDto travellerDto)
        {
            var travellerFromDb = await context.Travellers.FirstOrDefaultAsync(x => x.Id == id);

            if (travellerFromDb is null) return NotFound();


            mapper.Map(travellerDto, travellerFromDb);

            try
            {

                context.Travellers.Update(travellerFromDb);

                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }
    }
}
