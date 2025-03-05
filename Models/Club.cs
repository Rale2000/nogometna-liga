using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballLeague.Models
{
    [Table("Clubs")]
    public class Club
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Stadium { get; set; }

        [Required]
        public DateTime Established_At { get; set; }
    }
}
