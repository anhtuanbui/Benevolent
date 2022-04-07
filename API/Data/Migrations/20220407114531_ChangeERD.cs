using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class ChangeERD : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TagAsign");

            migrationBuilder.AddColumn<int>(
                name: "TagId",
                table: "Page",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Page_TagId",
                table: "Page",
                column: "TagId");

            migrationBuilder.AddForeignKey(
                name: "FK_Page_Tag_TagId",
                table: "Page",
                column: "TagId",
                principalTable: "Tag",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Page_Tag_TagId",
                table: "Page");

            migrationBuilder.DropIndex(
                name: "IX_Page_TagId",
                table: "Page");

            migrationBuilder.DropColumn(
                name: "TagId",
                table: "Page");

            migrationBuilder.CreateTable(
                name: "TagAsign",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PageId = table.Column<int>(type: "int", nullable: false),
                    TagId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagAsign", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TagAsign_Page_PageId",
                        column: x => x.PageId,
                        principalTable: "Page",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TagAsign_Tag_TagId",
                        column: x => x.TagId,
                        principalTable: "Tag",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TagAsign_PageId",
                table: "TagAsign",
                column: "PageId");

            migrationBuilder.CreateIndex(
                name: "IX_TagAsign_TagId",
                table: "TagAsign",
                column: "TagId");
        }
    }
}
