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
        /// 主键
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// 创建人Id
        /// </summary>
        public long CreateUserId { get; set; }

        /// <summary>
        /// 修改时间
        /// </summary>
        public DateTime ModifyTime { get; set; }

        /// <summary>
        /// 修改人Id
        /// </summary>
        public long ModifyUserId { get; set; }

        /// <summary>
        ///  是否删除
        /// </summary>
        public IsDeleted IsDeleted { get; set; }
    }
}
