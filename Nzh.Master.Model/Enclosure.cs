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
        /// 主键Id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// 附件地址
        /// </summary>
        public string FilePath { get; set; }
    }
}
