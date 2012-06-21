using System.Collections.Generic;
using System.Dynamic;

namespace Dynamics
{
    public class UrlDictionnary : DynamicObject
    {
        Dictionary<string, string> dictionary = new Dictionary<string, string>();

        public int Count
        {
            get
            {
                return dictionary.Count;
            }
        }

        public override bool TryGetMember(GetMemberBinder binder, out object result)
        {
            var keyName = binder.Name.ToLower();
            if(dictionary.ContainsKey(keyName))
            {
                result = dictionary[keyName];
                return true;
            }
            result = null;
            return false;
        }

        public override bool TrySetMember(SetMemberBinder binder, object value)
        {
            dictionary[binder.Name.ToLower()] = (string) value;
            return true;
        }
    }
}
