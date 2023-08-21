using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReceitaFrontEnd.Models
{
    public class ReceitaViewModel
    {
        public int Id { get; set; }
        public string Receita { get; set; }
        public int preco { get; set; }
    }
}