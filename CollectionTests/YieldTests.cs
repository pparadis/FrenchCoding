using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CollectionTests
{
    public class YieldTest
    {
        public static IEnumerable<dynamic> GetUsersUnder18(List<dynamic> userList)
        {
            for (var i = 0; i < userList.Count; i += 5)
            {
                yield return userList[i];
            }
        }

        public static IEnumerable<int> Fibonacci(int x)
        {
            int prev = -1;
            int next = 1;
            for (int i = 0; i < x; i++)
            {
                int sum = prev + next;
                prev = next;
                next = sum;
                yield return sum;
            }
        }
    }
}
