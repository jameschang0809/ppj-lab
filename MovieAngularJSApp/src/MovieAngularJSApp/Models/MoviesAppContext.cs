using Microsoft.Data.Entity;

namespace MovieAngularJSApp.Models
{
    public class MoviesAppContext : DbContext
    {
        public DbSet<Movie> Movies { get; set; }
    }
}
