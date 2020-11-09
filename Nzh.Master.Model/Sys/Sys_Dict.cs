using Nzh.Master.Model.BaseModel;
using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model.Sys
{
    /// <summary>
    /// 数据字典
    /// </summary>
    public class Sys_Dict : BaseEntity
    {
        /// <summary>
        /// 字典类型
        /// </summary>
        public string DictType { get; set; }

        /// <summary>
        /// 上级字典Id
        /// </summary>
        public string ParentId { get; set; }

        /// <summary>
        /// 字典键
        /// </summary>
        public string DictKey { get; set; }

        /// <summary>
        /// 字典值
        /// </summary>
        public string DictValue { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }

        /// <summary>
        /// 状态
        /// </summary>
        public Status DictStatus { get; set; }
    }
}
