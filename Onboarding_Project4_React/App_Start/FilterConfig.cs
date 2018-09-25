using System.Web;
using System.Web.Mvc;

namespace Onboarding_Project4_React
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
