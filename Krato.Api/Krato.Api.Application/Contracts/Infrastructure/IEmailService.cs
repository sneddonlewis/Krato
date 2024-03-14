using Krato.Api.Application.Models.Mail;

namespace Krato.Api.Application.Contracts.Infrastructure;

public interface IEmailService
{
    Task<bool> SendEmail(Email email);
}