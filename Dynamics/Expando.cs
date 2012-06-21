using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;

namespace Dynamics
{
    class Expando
    {
        public Expando()
        {
            dynamic expando = new ExpandoObject();
            expando.Title = "Ceci est un titre";
            expando.Nom = "Paradis";
            expando.Prenom = "Pascal";
        }

        public void ExpandoManipulation()
        {
            
        }
    }
}
