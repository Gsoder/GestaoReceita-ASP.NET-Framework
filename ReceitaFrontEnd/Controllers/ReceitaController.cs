using ReceitaFrontEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ReceitaFrontEnd.Controllers
{
    public class ReceitaController : Controller
    {
        // GET: Receita
        public ActionResult Index()
        {
            List<ReceitaViewModel> list = new List<ReceitaViewModel>();
            Random random = new Random();

            for (int i = 1; i <= 20; i++)
            {
                string nomeReceita = $"Receita {i}";
                int numeroAleatorio = random.Next(100, 401);
                ReceitaViewModel receita = new ReceitaViewModel { Id = i, Receita = nomeReceita, preco = numeroAleatorio }; ;
                list.Add(receita);
            }

            return View(list);
        }

        public ActionResult Cadastro()
        {




            return View();
        }
    }
}