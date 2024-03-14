using Microsoft.Extensions.DependencyInjection;

namespace Krato.Api.Persistence;

public static class PersistenceServiceRegistration
{
    public static IServiceCollection AddPersistenceServices(this IServiceCollection services)
    {
        // todo configure PostgreSQL and register db context & repos
        return services;
    }
}