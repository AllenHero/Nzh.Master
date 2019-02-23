using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Service.Base
{
    public class BaseService
    {
        /// <summary>
        /// 获取系统当前用户
        /// </summary>
        /// <returns></returns>
        public Guid GetSystemCurrentUser()
        {
            return Guid.Parse("4ca60473-373f-11e9-a104-8c164533fc3b");
        }

        /// <summary>
        /// 获取系统当前时间
        /// </summary>
        /// <returns></returns>
        public DateTime GetSystemCurrentTime()
        {
            return DateTime.Now;
        }
    }
}
