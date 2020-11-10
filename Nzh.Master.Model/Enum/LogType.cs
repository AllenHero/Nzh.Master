using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model.Enum
{
    /// <summary>
    /// 日志类型
    /// </summary>
    public enum LogType 
    {
        /// <summary>
        /// 登录成功
        /// </summary>
        LoginSucess,

        /// <summary>
        /// 登录失败
        /// </summary>
        LoginFail,

        /// <summary>
        /// 添加
        /// </summary>
        Add,

        /// <summary>
        /// 修改
        /// </summary>
        Edit,

        /// <summary>
        /// 删除
        /// </summary>
        Delete,

        /// <summary>
        /// 查看
        /// </summary>
        Search,

        /// <summary>
        /// 其他
        /// </summary>
        Other,
    }
}
