using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballLeague.Models
{
    [Table("klub")]
    public class Club
    {
        [Key]
        [Column("sifra")]
        public int Id { get; set; }

        [Required]
        [Column("naziv")]
        public string Name { get; set; }

        [Required]
        [Column("stadion")]
        public string Stadium { get; set; }

        [Required]
        [Column("osnovan")]
        public DateTime Established_At { get; set; }
    }
}
