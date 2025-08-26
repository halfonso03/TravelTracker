using System;
using AutoMapper;
using NhacTravelReimbursement.Domain;
using NhacTravelReimbursement.DTOs;

namespace NhacTravelReimbursement.Core;

public class MappingProfiles : Profile
{

    public MappingProfiles()
    {
        CreateMap<Trip, Trip>();

        CreateMap<Trip, TripDto>()
            .ForMember(x => x.Status, o => o.MapFrom(s => (s.Status == null) ? "" : s.Status.Description));

        CreateMap<CreateTripDto, Trip>();

        CreateMap<EditTripDto, Trip>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());
    }

}
