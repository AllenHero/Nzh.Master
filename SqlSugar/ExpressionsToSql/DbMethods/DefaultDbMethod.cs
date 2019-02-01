using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SqlSugar
{
    public partial class DefaultDbMethod : IDbMethods
    {
        #region   IIF
        public virtual string IIF(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            var parameter2 = model.Args[1];
            var parameter3 = model.Args[2];
            return string.Format("( CASE  WHEN {0} THEN {1}  ELSE {2} END )", parameter.MemberName, parameter2.MemberName, parameter3.MemberName);
        }
        #endregion

        #region  IsNullOrEmpty

        public virtual string IsNullOrEmpty(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format("( {0}='' OR {0} IS NULL )", parameter.MemberName);
        }

        #endregion

        #region  HasValue

        public virtual string HasValue(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format("( {0}<>'' AND {0} IS NOT NULL )", parameter.MemberName);
        }
        #endregion

        #region  HasNumber

        public virtual string HasNumber(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format("( {0}>0 AND {0} IS NOT NULL )", parameter.MemberName);
        }
        #endregion

        #region    ToUpper

        public virtual string ToUpper(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format(" (UPPER({0})) ", parameter.MemberName);
        }
        #endregion

        #region  ToLower

        public virtual string ToLower(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format(" (LOWER({0})) ", parameter.MemberName);
        }
        #endregion

        #region Trim

        public virtual string Trim(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format(" (rtrim(ltrim({0}))) ", parameter.MemberName);
        }

        #endregion

        #region  Contains

        public virtual string Contains(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            var parameter2 = model.Args[1];
            return string.Format(" ({0} like '%'+{1}+'%') ", parameter.MemberName, parameter2.MemberName);
        }
        #endregion

        #region   ContainsArray
        public virtual string ContainsArray(MethodCallExpressionModel model)
        {
            var inValueIEnumerable = (IEnumerable)model.Args[0].MemberValue;
            List<object> inValues = new List<object>();
            if (inValueIEnumerable != null)
            {
                foreach (var item in inValueIEnumerable)
                {
                    if (item != null && item.GetType().IsEnum())
                    {
                        inValues.Add(Convert.ToInt64(item));
                    }
                    else
                    {
                        inValues.Add(item);
                    }
                }
            }
            var value = model.Args[1].MemberName;
            string inValueString = null;
            if (inValues != null && inValues.Count > 0)
            {
                inValueString = inValues.ToArray().ToJoinSqlInVals();
            }
            if (inValueString.IsNullOrEmpty())
            {
                return " (1=2) ";
            }
            else
            {
                return string.Format(" ({0} IN ({1})) ", value, inValueString);
            }
        }
        #endregion

        #region Equals

        public virtual string Equals(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            var parameter2 = model.Args[1];
            return string.Format(" ({0} = {1}) ", parameter.MemberName, parameter2.MemberName); ;
        }
        #endregion

        #region  DateIsSameDay

        public virtual string DateIsSameDay(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            var parameter2 = model.Args[1];
            return string.Format(" (DATEDIFF(day,{0},{1})=0) ", parameter.MemberName, parameter2.MemberName); ;
        }
        #endregion

        #region DateIsSameByType

        public virtual string DateIsSameByType(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            var parameter2 = model.Args[1];
            var parameter3 = model.Args[2];
            return string.Format(" (DATEDIFF({2},{0},{1})=0) ", parameter.MemberName, parameter2.MemberName, parameter3.MemberValue);
        }

        #endregion

        #region  DateAddByType

        public virtual string DateAddByType(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            var parameter2 = model.Args[1];
            var parameter3 = model.Args[2];
            return string.Format(" (DATEADD({2},{1},{0})) ", parameter.MemberName, parameter2.MemberName, parameter3.MemberValue);
        }
        #endregion

        #region   DateAddDay

        public virtual string DateAddDay(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            var parameter2 = model.Args[1];
            return string.Format(" (DATEADD(day,{1},{0})) ", parameter.MemberName, parameter2.MemberName);
        }
        #endregion

        #region  Between

        public virtual string Between(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            var parameter1 = model.Args[1];
            var parameter2 = model.Args[2];
            return string.Format(" ({0} BETWEEN {1} AND {2}) ", parameter.MemberName, parameter1.MemberName, parameter2.MemberName);
        }
        #endregion

        #region   StartsWith

        public virtual string StartsWith(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            var parameter2 = model.Args[1];
            return string.Format(" ({0} like {1}+'%') ", parameter.MemberName, parameter2.MemberName);
        }

        #endregion

        #region  EndsWith

        public virtual string EndsWith(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            var parameter2 = model.Args[1];
            return string.Format(" ({0} like '%'+{1}) ", parameter.MemberName, parameter2.MemberName);
        }
        #endregion

        #region DateValue

        public virtual string DateValue(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            var parameter2 = model.Args[1];
            return string.Format(" DateName({0},{1}) ", parameter2.MemberValue, parameter.MemberName);
        }
        #endregion

        #region ToInt32

        public virtual string ToInt32(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format(" CAST({0} AS INT)", parameter.MemberName);
        }
        #endregion

        #region  ToInt64


        public virtual string ToInt64(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format(" CAST({0} AS BIGINT)", parameter.MemberName);
        }
        #endregion

        #region ToString

        public virtual string ToString(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format(" CAST({0} AS NVARCHAR(MAX))", parameter.MemberName);
        }
        #endregion

        #region  ToGuid
        public virtual string ToGuid(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format(" CAST({0} AS UNIQUEIDENTIFIER)", parameter.MemberName);
        }
        #endregion

        #region   ToDouble
        public virtual string ToDouble(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format(" CAST({0} AS FLOAT)", parameter.MemberName);
        }
        #endregion

        #region  ToBool
        public virtual string ToBool(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format(" CAST({0} AS BIT)", parameter.MemberName);
        }
        #endregion

        #region   ToDate

        public virtual string ToDate(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format(" CAST({0} AS DATETIME)", parameter.MemberName);
        }
        #endregion

        #region ToTime

        public virtual string ToTime(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format(" CAST({0} AS TIME)", parameter.MemberName);
        }
        #region

        public virtual string ToDecimal(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format(" CAST({0} AS MONEY)", parameter.MemberName);
        }
        #endregion

        #region
        public virtual string Substring(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            var parameter2 = model.Args[1];
            var parameter3 = model.Args[2];
            return string.Format("SUBSTRING({0},1 + {1},{2})", parameter.MemberName, parameter2.MemberName, parameter3.MemberName);
        }
        #endregion

        public virtual string Length(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format("LEN({0})", parameter.MemberName);
        }
        #endregion

        #region  Replace

        public virtual string Replace(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            var parameter2 = model.Args[1];
            var parameter3 = model.Args[2];
            return string.Format("REPLACE({0},{1},{2})", parameter.MemberName, parameter2.MemberName, parameter3.MemberName);
        }
        #endregion

        #region AggregateSum

        public virtual string AggregateSum(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format("SUM({0})", parameter.MemberName);
        }

        #endregion

        #region  AggregateAvg

        public virtual string AggregateAvg(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format("AVG({0})", parameter.MemberName);
        }
        #endregion

        #region  AggregateMin
        public virtual string AggregateMin(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format("MIN({0})", parameter.MemberName);
        }
        #endregion

        #region  AggregateMax

        public virtual string AggregateMax(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format("MAX({0})", parameter.MemberName);
        }
        #endregion

        #region  AggregateCount
        public virtual string AggregateCount(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            return string.Format("COUNT({0})", parameter.MemberName);
        }
        #endregion

        #region  MappingColumn

        public virtual string MappingColumn(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            var parameter1 = model.Args[1];
            return string.Format("{0}", parameter1.MemberValue);
        }
        #endregion

        #region   IsNull
        public virtual string IsNull(MethodCallExpressionModel model)
        {
            var parameter = model.Args[0];
            var parameter1 = model.Args[1];
            return string.Format("ISNULL({0},{1})", parameter.MemberName, parameter1.MemberName);
        }
        #endregion

        public virtual string True()
        {
            return "( 1 = 1 ) ";
        }

        public virtual string False()
        {
            return "( 1 = 2 ) ";
        }

        public string GuidNew()
        {
            return "'" + Guid.NewGuid() + "' ";
        }

        public string GetSelfAndAutoFill(string shortName, bool isSingle)
        {
            if (isSingle) return "*";
            else
                return string.Format("{0}.*", shortName);
        }

        public virtual string MergeString(params string[] strings)
        {
            return string.Join("+", strings);
        }

        public virtual string Pack(string sql)
        {
            return "(" + sql + ")";
        }

        public virtual string EqualTrue(string fieldName)
        {
            return "( " + fieldName + "=1 )";
        }

        public virtual string Null()
        {
            return "NULL";
        }

        public virtual string GetDate()
        {
            return "GETDATE()";
        }

        #region  CaseWhen

        public virtual string CaseWhen(List<KeyValuePair<string, string>> sqls)
        {
            StringBuilder reslut = new StringBuilder();
            foreach (var item in sqls)
            {
                if (item.Key == "IF")
                {
                    reslut.AppendFormat(" ( CASE  WHEN {0} ", item.Value);
                }
                else if (item.Key == "End")
                {
                    reslut.AppendFormat("ELSE {0} END )", item.Value);
                }
                else if (item.Key == "Return")
                {
                    reslut.AppendFormat(" THEN {0} ", item.Value);
                }
                else {
                    reslut.AppendFormat(" WHEN {0} ", item.Value);
                }
            }
            return reslut.ToString();
        }
        #endregion
    }
}
