using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Nzh.Master.Common.Helper
{
    /// <summary>
    /// File辅助类
    /// </summary>
    public class FileHelper
    {
        /// <summary>
        /// 将字符串写入到文件中
        /// </summary>
        /// <param name="filePath">文件的实际路径</param>
        /// <param name="content">内容</param>
        /// <param name="isCover">是否覆盖，true就是重新写一遍，false就是往里面添加内容</param>
        public static void WriteToFile(string filePath, string content, bool isCover)
        {
            FileStream fs = null;
            try
            {
                //判断
                if (!isCover && System.IO.File.Exists(filePath))
                {
                    fs = new FileStream(filePath, FileMode.Append, FileAccess.Write);
                    StreamWriter sw = new StreamWriter(fs, Encoding.UTF8);
                    //写入
                    sw.WriteLine(content);
                    //清除
                    sw.Flush();
                    //关闭
                    sw.Close();
                }
                else
                {
                    System.IO.File.WriteAllText(filePath, content, Encoding.UTF8);
                }
            }
            finally
            {
                if (fs != null)
                {
                    fs.Close();
                }
            }
        }
    }
}
