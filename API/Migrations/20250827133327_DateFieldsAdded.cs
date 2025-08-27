using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NhacTravelReimbursement.Migrations
{
    /// <inheritdoc />
    public partial class DateFieldsAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Trips",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "ReimbursementPaidDate",
                table: "Trips",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReimbursementSentDate",
                table: "Trips",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "SubmittedDate",
                table: "Trips",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "ReimbursementPaidDate",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "ReimbursementSentDate",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "SubmittedDate",
                table: "Trips");
        }
    }
}
