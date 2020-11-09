using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Common.Extension
{
    public static partial class Extensions
    {
        public static Exception GetOriginalException(this Exception ex)
        {
            if (ex.InnerException == null) return ex;

            return ex.InnerException.GetOriginalException();
        }
    }
}
