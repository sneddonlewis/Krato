using Krato.Api.Domain.Common;

namespace Krato.Api.Domain.Entities;

public class Workout : AuditableEntity
{
    public Guid WorkoutId { get; set; }
}