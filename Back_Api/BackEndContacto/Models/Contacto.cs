using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackEndContacto.Models
{
    public class Contacto
    {
        public int Id { get; set; }
        [Required]
        public string Nombre { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Telefono { get; set; }
        [Required]
        public DateTime Fecha { get; set; }
        [Required]
        public string CiudadEst { get; set; }
    }
}
