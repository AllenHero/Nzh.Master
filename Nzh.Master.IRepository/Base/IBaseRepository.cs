using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using SqlSugar;

namespace Nzh.Master.IRepository.Base
{
    public interface IBaseRepository<T> where T : class
    {
        void BeginTran();

        void CommitTran();

        void RollbackTran();

        List<T> GetListBySql(string Sql);

        List<T> GetListBySql(string Sql, Expression<Func<T, bool>> whereExpression);

        List<T> GetPageListBySql(string Sql, Expression<Func<T, bool>> whereExpression, PageModel page);

        List<T> GetPageListBySql(string Sql, Expression<Func<T, bool>> whereExpression, PageModel page, Expression<Func<T, object>> orderByExpression = null, OrderByType orderByType = OrderByType.Asc);

        List<T> GetPageListBySql(string Sql, List<IConditionalModel> conditionalList, PageModel page);

        List<T> GetPageListBySql(string Sql, List<IConditionalModel> conditionalList, PageModel page, Expression<Func<T, object>> orderByExpression = null, OrderByType orderByType = OrderByType.Asc);

        DataTable GetDataTableBySql(string Sql, object parameters);

        DataTable GetDataTableBySql(string Sql, params SugarParameter[] parameters);

        DataTable GetDataTableBySql(string Sql, List<SugarParameter> parameters);

        DataSet GetDataSetBySql(string Sql, object parameters);

        DataSet GetDataSetBySql(string Sql, params SugarParameter[] parameters);

        DataSet GetDataSetBySql(string Sql, List<SugarParameter> parameters);

        bool ExecuteSql(string Sql, object parameters = null);

        bool ExecuteSql(string Sql, params SugarParameter[] parameters);

        bool ExecuteSql(string Sql, List<SugarParameter> parameters);

        List<T> GetList(string Sql, object parameters = null);

        List<T> GetList(string Sql, params SugarParameter[] parameters);

        List<T> GetList(string Sql, List<SugarParameter> parameters);

        T Get(string Sql, object parameters = null);

        T Get(string Sql, params SugarParameter[] parameters);

        T Get(string Sql, List<SugarParameter> parameters);

        dynamic GetDynamic(string Sql, object parameters = null);

        dynamic GetDynamic(string Sql, params SugarParameter[] parameters);

        dynamic GetDynamic(string Sql, List<SugarParameter> parameters);

        DataTable QueryProcedure(string procedureName, List<SugarParameter> parameters);

        List<T> Take(Expression<Func<T, bool>> whereLambda, int num);

        T First(Expression<Func<T, bool>> whereLambda);

        int Sum(string field);

        object Max(string field);

        object Min(string field);

        int Avg(string field);

        int Count(Expression<Func<T, bool>> whereExpression);

        bool IsAny(Expression<Func<T, bool>> whereExpression);

        T GetById(dynamic id);

        List<T> GetList();

        List<T> GetList(Expression<Func<T, bool>> whereExpression);

        T GetSingle(Expression<Func<T, bool>> whereExpression);

        List<T> GetPageList(Expression<Func<T, bool>> whereExpression, PageModel page);

        List<T> GetPageList(Expression<Func<T, bool>> whereExpression, PageModel page, Expression<Func<T, object>> orderByExpression = null, OrderByType orderByType = OrderByType.Asc);

        List<T> GetPageList(List<IConditionalModel> conditionalList, PageModel page);

        List<T> GetPageList(List<IConditionalModel> conditionalList, PageModel page, Expression<Func<T, object>> orderByExpression = null, OrderByType orderByType = OrderByType.Asc);

        bool Insert(T insertObj);

        int InsertReturnIdentity(T insertObj);

        bool InsertRange(T[] insertObjs);

        bool InsertRange(List<T>[] insertObjs);

        bool Update(T updateObj);

        bool UpdateRange(T[] updateObjs);

        bool Update(Expression<Func<T, T>> columns, Expression<Func<T, bool>> whereExpression);

        bool Delete(T deleteObj);

        bool Delete(Expression<Func<T, bool>> whereExpression);

        bool DeleteById(dynamic id);

        bool DeleteByIds(dynamic[] ids);

    }
}
