using Microsoft.Extensions.DependencyInjection;

namespace Krato.Api.Application;

public static class ApplicationServiceRegistration
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // register Automapper and MediatR
        return services;
    }
}