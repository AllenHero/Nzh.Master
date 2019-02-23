using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.IService.Base
{
    public interface IBaseService
    {
        /// <summary>
        /// 获取系统当前用户
        /// </summary>
        /// <returns></returns>
        Guid GetSystemCurrentUser();

        /// <summary>
        /// 获取系统当前时间
        /// </summary>
        /// <returns></returns>
        DateTime GetSystemCurrentTime();
    }
}
