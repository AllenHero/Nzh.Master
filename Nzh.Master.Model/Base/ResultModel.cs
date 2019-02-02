using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model.Base
{
    /// <summary>
    /// 表格数据，支持分页
    /// </summary>
    public class ResultModel<T>
    {
        /// <summary>
        /// 状态码
        /// </summary>
        public int Code { get; set; }

        /// <summary>
        /// 消息
        /// </summary>
        public string Msg { get; set; }

        /// <summary>
        /// 数量
        /// </summary>
        public int Count { get; set; }

        /// <summary>
        /// 数据
        /// </summary>
        public List<T> Data { get; set; }
    }
}
