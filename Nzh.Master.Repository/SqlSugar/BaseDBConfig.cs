﻿using Microsoft.Extensions.Configuration;
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
        //public static string ConnectionString = "server=.;uid=sa;pwd=123;database=STD_DB";
        public static string ConnectionString = "server=localhost;uid=root;pwd=123456;database=std_db";

        //public IConfiguration configuration { set; get; }

        //public System.Data.IDbConnection ConnectionString()
        //{
        //    string connectionString = configuration.GetValue<string>("Db:ConnectionString");
        //    var connection = new MySqlConnection(connectionString);
        //    connection.Open();
        //    return connection;
        //}
    }
}
