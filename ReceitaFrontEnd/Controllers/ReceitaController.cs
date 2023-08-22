using ReceitaFrontEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ReceitaFrontEnd.Controllers
{
    public class ReceitaController : Controller
    { 
        private List<ReceitaViewModel> list = new List<ReceitaViewModel>();
        private bool sla = true;
        // GET: Receita
        public ActionResult Index()
        {

            Session["listaItems"] = new List<ReceitaViewModel>();

            if (sla)
            {

                Random random = new Random();

                for (int i = 1; i <= 20; i++)
                {
                    string nomeReceita = $"Receita {i}";
                    int numeroAleatorio = random.Next(100, 401);
                    ReceitaViewModel receita = new ReceitaViewModel { Id = i, Receita = nomeReceita, preco = numeroAleatorio }; ;
                    list.Add(receita);
                }
                sla = false;

                Session["listaItems"] = list;
            }
            

            return View(list);
        }

        public bool Excluir()
        {
            var lista = Session["listaItems"] as List<ReceitaViewModel>;
            if (lista.Count == 0)
            {

                return false;

            }
            else
            {
                lista.Clear();

                Session["listaItems"] = lista;

                return true;
            }

            
        }

        [HttpPost]
        public string submeterCodigo(string codigo, string digitado)
        {
            if (!String.IsNullOrEmpty(codigo) && !String.IsNullOrEmpty(digitado))
            {
                if(codigo == digitado)
                {
                    return "Codigo correto";

                }
                else
                {
                    return "Codigo não bate";

                }
                
            }
            return "Codigo vazio";

        }

        public ActionResult Cadastro()
        {

            

            return View();
        }
    }
}