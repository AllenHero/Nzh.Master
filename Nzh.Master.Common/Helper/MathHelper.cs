using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Common.Helper
{
    /// <summary>
    ///  Math辅助类
    /// </summary>
    public class MathHelper
    {
        /// <summary>
        /// 生成N位随机数 
        /// </summary>
        /// <param name="N">N位随机数</param>
        /// <param name="needChar">字符串</param>
        /// <returns>生成的N位随机数</returns>
        public static string RandValidateCode(int N, int needChar)
        {
            needChar = 0;
            StringBuilder num = new StringBuilder();
            string Vchar = "0,1,2,3,4,5,6,7,8,9";
            if (needChar == 1)
                Vchar = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
            String[] VcArray = Vchar.Split(new char[] { ',' });
            Random rnd = new Random(Guid.NewGuid().GetHashCode());
            for (int i = 0; i < N; i++)
            {
                num.Append(VcArray[rnd.Next(0, VcArray.Length)].ToString());
            }
            return num.ToString();
        }
    }
}
