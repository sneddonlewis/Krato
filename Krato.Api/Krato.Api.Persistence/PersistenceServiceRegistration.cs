using Microsoft.Extensions.DependencyInjection;

namespace Krato.Api.Persistence;

public static class PersistenceServiceRegistration
{
    public static IServiceCollection AddPersistenceServices(this IServiceCollection services)
    {
        return services;
    }
}