using ReceitaFrontEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ReceitaFrontEnd.Controllers
{
    public class ReceitaController : Controller
    { 
        private List<ReceitaViewModel> list = new List<ReceitaViewModel>();
        private bool sla = true;
        private Random random = new Random();
        // GET: Receita
        public ActionResult Index()
        {

            Session["listaItems"] = new List<ReceitaViewModel>();

            if (sla)
            {
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

        /*public ActionResult Index()
        {
            Session["listaItems"] = new List<ReceitaViewModel>();

            if (Session["listaItems"] == null)
            {
                for (int i = 1; i <= 20; i++)
                {
                    string nomeReceita = $"Receita {i}";
                    int numeroAleatorio = random.Next(100, 401);
                    ReceitaViewModel receita = new ReceitaViewModel { Id = i, Receita = nomeReceita, preco = numeroAleatorio };
                    list.Add(receita);
                }

                Session["listaItems"] = list;
            }
            else
            {
                list = (List<ReceitaViewModel>)Session["listaItems"];
            }

            return View(list);
        }*/

        public bool excluirTudo()
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
        public string submeterCodigo(string digitado)
        {
            var token = Session["token"] as string;

            if (!String.IsNullOrEmpty(digitado))
            {
                if (token == digitado)
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


        public string GenerateToken()
        {
            Session["token"] = new StringBuilder();

            int length = 10;

            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            StringBuilder tokenBuilder = new StringBuilder();

            for (int i = 0; i < length; i++)
            {
                int index = random.Next(chars.Length);
                char randomChar = chars[index];
                tokenBuilder.Append(randomChar);
            }

            Session["token"] = tokenBuilder.ToString();

            return tokenBuilder.ToString();
        }

        public ActionResult Cadastro()
        {

            

            return View();
        }
    }
}