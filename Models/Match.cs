using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballLeague.Models
{
    [Table("Matches")]
    public class Match
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public int Home_Team { get; set; }

        [Required]
        public int Away_Team { get; set; }

        [Required]
        public int Home_Pts { get; set; }

        [Required]
        public int Away_Pts { get; set; }
    }
}
