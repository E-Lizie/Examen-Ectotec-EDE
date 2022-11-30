using BackEndContacto.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEndContacto.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext( DbContextOptions options) : base(options)
        {
        }

        public DbSet<Contacto> Contacto { get; set; }
        public DbSet<CiudadEstado> CiudadEstados{ get; set; }
    }
}
