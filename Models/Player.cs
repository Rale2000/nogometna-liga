using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballLeague.Models
{
    [Table("Players")]
    public class Player
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public string OIB { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public PositionEnum Position { get; set; }  // Uses enum

        [Required]
        public decimal Value { get; set; }

        [Required]
        public int Club_Id { get; set; }
    }
}
