using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEndContacto.Data;
using BackEndContacto.Models;
using EmailService;

namespace BackEndContacto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IEmailSender _emailSender;
        public ContactoController(AppDbContext context, IEmailSender emailSender)
        {
            _context = context;
            _emailSender = emailSender;
        }

        // GET: Obtiene el contacto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contacto>>> GetContacto()
        {

            return await _context.Contacto.ToListAsync();
        }
        //POST: Envió de correo de confirmación
        [HttpPost("[action]")]
        public async Task<ActionResult> SendMail([FromBody] EmailData data)
        {
            List<string> list = new List<string>();
            list.Add(data.Name);
            list.Add(data.Mail);
            list.Add(data.Place);
            list.Add(data.Date);

            string[] strData = list.ToArray();

            var message = new Message(new string[] { data.To  }, "Green Leaves", strData, null);
            await _emailSender.SendEmailAsync(message);
            return Ok();
        }
        //POST: Envió de correo de confirmación
        [HttpPost("[action]")]
        public async Task<ActionResult> SendMailDefault([FromBody] EmailData data)
        {
            List<string> list = new List<string>();
            list.Add(data.Name);
            list.Add(data.Mail);
            list.Add(data.Place);
            list.Add(data.Date);

            string[] strData = list.ToArray();

            var message = new Message(new string[] { data.To }, "Green Leaves", strData, null);
            await _emailSender.SendEmailAsync(message);
            return Ok();
        }

        // GET: Validación de contacto null
        [HttpGet("{id}")]
        public async Task<ActionResult<Contacto>> GetContacto(int id)
        {
            var contacto = await _context.Contacto.FindAsync(id);

            if (contacto == null)
            {
                return NotFound();
            }

            return contacto;
        }

        // PUT: Modificación de estado para el contacto
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContacto(int id, Contacto contacto)
        {
            if (id != contacto.Id)
            {
                return BadRequest();
            }

            _context.Entry(contacto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: Guarda contacto
        [HttpPost("[action]")]
        public async Task<ActionResult<Contacto>> PostContacto([FromBody] Contacto contacto)
        {
            Contacto oContacto = new Contacto();

            oContacto.Nombre = contacto.Nombre;
            oContacto.Email = contacto.Email;
            oContacto.Telefono = contacto.Telefono;
            oContacto.Fecha = contacto.Fecha;
            oContacto.CiudadEst = contacto.CiudadEst;

            _context.Contacto.Add(oContacto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Obtiene Contacto", new { id = contacto.Id }, contacto);
        }

        // DELETE: Borra contacto
        [HttpDelete("{id}")]
        public async Task<ActionResult<Contacto>> DeleteContacto(int id)
        {
            var contacto = await _context.Contacto.FindAsync(id);
            if (contacto == null)
            {
                return NotFound();
            }

            _context.Contacto.Remove(contacto);
            await _context.SaveChangesAsync();

            return contacto;
        }

        private bool ContactoExists(int id)
        {
            return _context.Contacto.Any(e => e.Id == id);
        }
    }
}
