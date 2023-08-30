using Newtonsoft.Json;
using ReceitaFrontEnd.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Drawing.Printing;
using System.EnterpriseServices;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using System.Xml.Linq;

namespace ReceitaFrontEnd.Controllers
{
    public class ReceitaController : Controller
    { 
        private List<ReceitaViewModel> list = new List<ReceitaViewModel>();
        private Random random = new Random();
        // GET: Receita
        public ActionResult Index()
        {

            /*Session["listaItems"] = new List<ReceitaViewModel>();

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
            }*/

            var receitas = receitasBuscar();

            
            return View(receitas);
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



        public bool excluirTudo(List<int> listaId)
        {
            bool check = true;

            using (var client = new HttpClient())
            {

                foreach (var id in listaId)
                {
                    if(check == true) { 

                        var response = client.DeleteAsync("http://gestaoreceitaapi.somee.com/api/Receita/" + id);

                        response.Wait();

                        if (response.Result.IsSuccessStatusCode)
                        {
                            check = true;

                        }
                        else
                        {

                            var content = response.Result.Content.ReadAsStringAsync();

                            var ret = JsonConvert.DeserializeObject<List<ValidationResult>>(content.Result);

                            check = false;
                        }
                    }
                    
                }
                return check;
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

        public List<DadosReceitaViewModel> receitasBuscar()
        {
            var listaReceita = new List<DadosReceitaViewModel>();

            using (var client = new HttpClient())
            {
                

                var response = client.GetAsync("http://gestaoreceitaapi.somee.com/api/Receita");

                response.Wait();

                if (response.Result.IsSuccessStatusCode)
                {
                    var stringResult = response.Result.Content.ReadAsStringAsync();


                    var objectJson = JsonConvert.DeserializeObject<List<ReceitaViewModel>>(stringResult.Result);


                    foreach (var item in objectJson)
                    {
                        listaReceita.Add(new DadosReceitaViewModel()
                        {
                            Id = item.Id,
                            valorTotalReceita = item.valorTotalReceita,
                            nomeReceita = item.nomeReceita,
                        });

                        
                    }

                }
                else
                {
                    
                    var content = response.Result.Content.ReadAsStringAsync();

                    var ret = JsonConvert.DeserializeObject<List<ValidationResult>>(content.Result);

              
                
                }
                return listaReceita;
            }
            

        }

        public bool Excluir(List<int> listaId)
        {
            bool check = true;

            using (var client = new HttpClient())
            {

                foreach (var id in listaId)
                {
                    if (check == true)
                    {

                        var response = client.DeleteAsync("http://gestaoreceitaapi.somee.com/api/Receita/" + id);

                        response.Wait();

                        if (response.Result.IsSuccessStatusCode)
                        {
                            check = true;

                        }
                        else
                        {

                            var content = response.Result.Content.ReadAsStringAsync();

                            var ret = JsonConvert.DeserializeObject<List<ValidationResult>>(content.Result);

                            check = false;
                        }
                    }

                }
                return check;
            }


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