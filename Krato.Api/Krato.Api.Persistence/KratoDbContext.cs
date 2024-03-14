using Microsoft.EntityFrameworkCore;

namespace Krato.Api.Persistence;

public class KratoDbContext(DbContextOptions<KratoDbContext> options) : DbContext(options);