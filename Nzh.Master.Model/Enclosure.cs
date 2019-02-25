using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model
{
    /// <summary>
    /// 附件
    /// </summary>
    public class Enclosure
    {
        /// <summary>
        /// 主键ID 
        /// </summary>
        public Guid ID { get; set; }

        /// <summary>
        /// 附件地址
        /// </summary>
        public string FilePath { get; set; }
    }
}
