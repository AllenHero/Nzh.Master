using Nzh.Master.Model.Base;
using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.IService.Base
{
    public interface IBaseService
    {
        /// <summary>
        /// 获取系统当前用户ID
        /// </summary>
        /// <returns></returns>
        Guid GetSystemCurrentUserID();

        /// <summary>
        /// 获取系统当前用户名
        /// </summary>
        /// <returns></returns>
        string GetSystemCurrentUserName();

        /// <summary>
        /// 获取系统当前时间
        /// </summary>
        /// <returns></returns>
        DateTime GetSystemCurrentTime();

        /// <summary>
        /// 获取当前IP
        /// </summary>
        /// <returns></returns>
        string GetSystemCurrentIP();

        
    }
}
