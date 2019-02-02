using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;
using System.Text;

namespace Nzh.Master.Common.Helper
{
    /// <summary>
    /// Model辅助类
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ModelConvertHelper<T> where T : new()
    {
        /// <summary>
        /// 填充对象列表
        /// </summary>
        /// <param name="ds"></param>
        /// <returns></returns>
        public static List<T> FillModel(DataSet ds)
        {
            if (ds == null || ds.Tables[0] == null || ds.Tables[0].Rows.Count == 0)
            {
                return null;
            }
            else
            {
                return FillModel(ds.Tables[0]);
            }
        }

        /// <summary>
        /// 填充对象列表
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static List<T> FillModel(DataTable dt)
        {
            List<T> modelList = new List<T>();
            if (dt == null || dt.Rows.Count == 0)
            {
                return modelList;
            }
            foreach (DataRow dr in dt.Rows)
            {
                T model = FillModeldr(dr);
                modelList.Add(model);
            }
            return modelList;
        }

        /// <summary>
        /// 填充对象
        /// </summary>
        /// <param name="dr"></param>
        /// <returns></returns>
        public static T FillModeldr(DataRow dr)
        {
            if (dr == null)
            {
                return default(T);
            } 
            T model = new T();
            for (int i = 0; i < dr.Table.Columns.Count; i++)
            {
                PropertyInfo propertyInfo = model.GetType().GetProperty(dr.Table.Columns[i].ColumnName);
                if (propertyInfo != null && dr[i] != DBNull.Value)
                {
                    Type genericTypeDefinition = propertyInfo.PropertyType;
                    Type nulltype = typeof(Nullable<>);
                    if (genericTypeDefinition.Name == nulltype.Name)
                    {
                        propertyInfo.SetValue(model, Convert.ChangeType(dr[i], Nullable.GetUnderlyingType(genericTypeDefinition)), null); ;
                    }
                    else
                    {
                        try
                        {
                            propertyInfo.SetValue(model, Convert.ChangeType(dr[i], genericTypeDefinition), null);
                        }
                        catch (Exception)
                        {
                            propertyInfo.SetValue(model, dr[i].ToString(), null);
                        }
                    }
                }
            }
            return model;
        }
    }
}
