using Microsoft.EntityFrameworkCore.Migrations;

namespace BackEndContacto.Migrations
{
    public partial class Tel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Telefono",
                table: "Concacto",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Telefono",
                table: "Concacto",
                type: "int",
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
