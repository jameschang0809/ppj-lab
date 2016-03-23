using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace MovieAngularJSApp.Migrations
{
    public partial class movieProps : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Movie",
                nullable: false);
            migrationBuilder.AlterColumn<string>(
                name: "Director",
                table: "Movie",
                nullable: false);
            migrationBuilder.AddColumn<DateTime>(
                name: "ReleaseDate",
                table: "Movie",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
            migrationBuilder.AddColumn<decimal>(
                name: "TicketPrice",
                table: "Movie",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "ReleaseDate", table: "Movie");
            migrationBuilder.DropColumn(name: "TicketPrice", table: "Movie");
            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Movie",
                nullable: true);
            migrationBuilder.AlterColumn<string>(
                name: "Director",
                table: "Movie",
                nullable: true);
        }
    }
}
