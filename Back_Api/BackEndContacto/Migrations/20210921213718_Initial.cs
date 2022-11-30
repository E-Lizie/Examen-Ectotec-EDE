using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BackEndContacto.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Concacto",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(nullable: false),
                    Email = table.Column<string>(nullable: false),
                    Telefono = table.Column<int>(nullable: false),
                    Fehca = table.Column<DateTime>(nullable: false),
                    CiudadEst = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Concacto", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Concacto");
        }
    }
}
