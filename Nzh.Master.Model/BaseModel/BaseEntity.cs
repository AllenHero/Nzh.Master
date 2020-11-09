using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model.BaseModel
{
    /// <summary>
    /// 基础实体类
    /// </summary>
    public class BaseEntity
    {
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// 创建人Id
        /// </summary>
        public long CreateUserId { get; set; }

        /// <summary>
        ///  是否删除
        /// </summary>
        public IsDelete IsDelete { get; set; }
    }
}
