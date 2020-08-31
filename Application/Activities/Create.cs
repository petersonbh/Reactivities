using Domain;
using MediatR;
using Persistence;
using SQLitePCL;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }


        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext dataContext;

            public Handler(DataContext dataContext)
            {
                this.dataContext = dataContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var actitvity = new Activity
                {
                    Id = request.Id,
                    Title = request.Title,
                    Category = request.Category,
                    Description = request.Description,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue
                };
                dataContext.Activities.Add(actitvity);
                var success = await dataContext.SaveChangesAsync() > 0;

                if (success ) return Unit.Value;

                throw new Exception("Problem saving.");
            }
        }
    }
}
