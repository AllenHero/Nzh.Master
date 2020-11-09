using Nzh.Master.IRepository;
using Nzh.Master.Model;
using Nzh.Master.Model.Base;
using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Service.Base
{
    public class BaseService
    {
        /// <summary>
        /// 获取系统当前用户Id
        /// </summary>
        /// <returns></returns>
        public Guid GetSystemCurrentUserId()
        {
            return Guid.Parse("4ca60473-373f-11e9-a104-8c164533fc3b");
        }

        /// <summary>
        /// 获取系统当前用户名
        /// </summary>
        /// <returns></returns>
        public string GetSystemCurrentUserName()
        {
            return "admin";
        }

        /// <summary>
        /// 获取系统当前时间
        /// </summary>
        /// <returns></returns>
        public DateTime GetSystemCurrentTime()
        {
            return DateTime.Now;
        }

        /// <summary>
        /// 获取当前IP
        /// </summary>
        /// <returns></returns>
        public string GetSystemCurrentIP()
        {
            return "127.0.0.1";
        }
    }
}
