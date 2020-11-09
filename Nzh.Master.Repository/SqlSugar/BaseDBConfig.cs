using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Repository.SqlSugar
{
    /// <summary>
    /// 连接字符串
    /// </summary>
    public class BaseDBConfig
    {
        //public static string ConnectionString = "server=.;uid=sa;pwd=123456;database=STD_DB";//SqlServer
        //public static string ConnectionString = "server=localhost;uid=root;pwd=123456;database=std_db";//MySql

        public static string ConnectionString { get; set; }
    }
}
