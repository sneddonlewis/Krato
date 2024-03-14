using Krato.Api.Application.Contracts.Infrastructure;
using Krato.Api.Application.Models.Mail;

namespace Krato.Api.Infrastructure.Mail;

public class EmailService : IEmailService
{
    public Task<bool> SendEmail(Email email)
    {
        throw new NotImplementedException();
    }
}