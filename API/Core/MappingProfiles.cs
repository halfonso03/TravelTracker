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
            .ForMember(x => x.Status, o => o.MapFrom(s => (s.Status == null) ? "" : s.Status.Description))
            .ForMember(x => x.TravellerName, o => o.MapFrom(s => s.Traveller != null ? s.Traveller.FirstName + " " + s.Traveller.LastName : "" ));

        CreateMap<CreateTripDto, Trip>();

        CreateMap<EditTripDto, Trip>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());


        CreateMap<TravellerDto, Traveller>();
        CreateMap<CreateTravellerDto, Traveller>();            
        CreateMap<EditTravellerDto, Traveller>();

        CreateMap<Traveller, TravellerDto>();            
        CreateMap<Traveller, CreateTravellerDto>();
        CreateMap<Traveller, EditTravellerDto>();
    }
}
