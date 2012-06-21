using System;
using System.Collections.Generic;
using System.Drawing;
using System.Dynamic;
using System.Linq;
using System.Text;

namespace Dynamics
{
    class TupleExemple
    {
        public TupleExemple()
        {
            var userRepository = new UserRepository();
            foreach (var user in userRepository.GetRegisteredUserList())
            {
                dynamic userInfos = ParseUserInformations(user);
                Console.WriteLine("Prénom : " + userInfos.FirstName);
                Console.WriteLine("Nom de famille : " + userInfos.LastName);
                Console.WriteLine("Courriel : " + userInfos.Email);
                Console.WriteLine("Âge : " + userInfos.Age);
                Console.WriteLine("Avatar : " + userInfos.Avatar.PhysicalDimension);

                Console.WriteLine("-------------------------------------------------------------");
            }

        }

        private ExpandoObject ParseUserInformations(Tuple<string, string, string, int, Image> user)
        {
            dynamic userExpando = new ExpandoObject();
            userExpando.FirstName = user.Item1;
            userExpando.LastName = user.Item2;
            userExpando.Email = user.Item3;
            userExpando.Age = user.Item4;
            userExpando.Avatar = user.Item5;

            return userExpando;
        }
    }


    public class UserRepository
    {
        public IEnumerable<Tuple<string, string, string, int, Image>> GetRegisteredUserList()
        {
            var tupleList = new List<Tuple<string, string, string, int, Image>>
                                {
                                    Tuple.Create("Pascal", "Paradis", "pascal.paradis@gmail.com", 26, Image.FromFile("pparadis_avatar.png")),
                                    Tuple.Create("Bill", "Gates", "bill@microsoft.com", 56, Image.FromFile("bgates_avatar.png")),
                                    Tuple.Create("Homme", "Poux", "hpoux@gmail.com", 42, Image.FromFile("homme_poux_avatar.png")),

                                };
            return tupleList;
        }
    }
}
