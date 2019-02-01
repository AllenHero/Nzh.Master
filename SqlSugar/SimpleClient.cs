using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace SqlSugar
{
    public partial class SimpleClient
    {
        protected SqlSugarClient Context { get; set; }
        public SqlSugarClient FullClient { get { return this.Context; } }

        public SimpleClient()
        {

        }

        public SimpleClient(SqlSugarClient context)
        {
            this.Context = context;
        }

        #region   Transaction

        /// <summary>
        /// 开始事务
        /// </summary>
        /// <param name="level"></param>
        public void BeginTran()
        {
            Context.Ado.BeginTran();
        }

        /// <summary>
        /// 提交事务
        /// </summary>
        public void CommitTran()
        {
            Context.Ado.CommitTran();
        }

        /// <summary>
        /// 回滚事务
        /// </summary>
        public void RollbackTran()
        {
            Context.Ado.RollbackTran();
        }

        #endregion

        #region   About Sql

        /// <summary>
        /// 执行sql获取List
        /// </summary>
        /// <param name="Sql"></param>
        /// <returns></returns>
        public List<T> GetListBySql<T>(string Sql) where T : class, new()
        {
            return Context.SqlQueryable<T>(Sql).ToList();
        }

        /// <summary>
        /// 执行sql根据条件获取List
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="whereExpression"></param>
        /// <returns></returns>
        public List<T> GetListBySql<T>(string Sql, Expression<Func<T, bool>> whereExpression) where T:class,new()
        {
            return Context.SqlQueryable<T>(Sql).Where(whereExpression).ToList();
        }

        /// <summary>
        /// 执行sql根据条件获取分页
        /// </summary>
        /// <param name="Sql"></param>
        /// <returns></returns>
        public List<T> GetPageListBySql<T>(string Sql, Expression<Func<T, bool>> whereExpression, PageModel page) where T : class, new()
        {
            int count = 0;
            var result = Context.SqlQueryable<T>(Sql).Where(whereExpression).ToPageList(page.PageIndex, page.PageSize, ref count);
            page.PageCount = count;
            return result;
        }

        /// <summary>
        ///  执行sql根据条件获取分页并且排序
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="whereExpression"></param>
        /// <param name="page"></param>
        /// <param name="orderByExpression"></param>
        /// <param name="orderByType"></param>
        /// <returns></returns>
        public List<T> GetPageListBySql<T>(string Sql, Expression<Func<T, bool>> whereExpression, PageModel page, Expression<Func<T, object>> orderByExpression = null, OrderByType orderByType = OrderByType.Asc) where T : class, new()
        {
            int count = 0;
            var result = Context.SqlQueryable<T>(Sql).OrderByIF(orderByExpression != null, orderByExpression, orderByType).Where(whereExpression).ToPageList(page.PageIndex, page.PageSize, ref count);
            page.PageCount = count;
            return result;
        }

        /// <summary>
        /// 执行sql根据多条件获取分页
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="conditionalList"></param>
        /// <param name="page"></param>
        /// <returns></returns>
        public List<T> GetPageListBySql<T>(string Sql, List<IConditionalModel> conditionalList, PageModel page) where T : class, new()
        {
            int count = 0;
            var result = Context.SqlQueryable<T>(Sql).Where(conditionalList).ToPageList(page.PageIndex, page.PageSize, ref count);
            page.PageCount = count;
            return result;
        }

        /// <summary>
        ///  执行sql根据多条件获取分页并且排序
        /// </summary>
        /// <param name="conditionalList"></param>
        /// <param name="page"></param>
        /// <param name="orderByExpression"></param>
        /// <param name="orderByType"></param>
        /// <returns></returns>
        public List<T> GetPageListBySql<T>(string Sql, List<IConditionalModel> conditionalList, PageModel page, Expression<Func<T, object>> orderByExpression = null, OrderByType orderByType = OrderByType.Asc) where T : class, new()
        {
            int count = 0;
            var result = Context.SqlQueryable<T>(Sql).OrderByIF(orderByExpression != null, orderByExpression, orderByType).Where(conditionalList).ToPageList(page.PageIndex, page.PageSize, ref count);
            page.PageCount = count;
            return result;
        }

        /// <summary>
        /// 执行sql根据参数返回DataTable
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataTable GetDataTableBySql(string Sql, object parameters)
        {
            return Context.Ado.GetDataTable(Sql, parameters);
        }

        /// <summary>
        /// 执行sql根据数组参数返回DataTable
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataTable GetDataTableBySql(string Sql, params SugarParameter[] parameters)
        {
            return Context.Ado.GetDataTable(Sql, parameters);
        }

        /// <summary>
        /// 执行sql根据集合参数返回DataTable
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataTable GetDataTableBySql(string Sql, List<SugarParameter> parameters)
        {
            return Context.Ado.GetDataTable(Sql, parameters);
        }

        /// <summary>
        /// 执行sql根据参数返回DataSet
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataSet GetDataSetBySql(string Sql, object parameters)
        {
            return Context.Ado.GetDataSetAll(Sql, parameters);
        }

        /// <summary>
        /// 执行sql根据数组参数返回DataSet
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataSet GetDataSetBySql(string Sql, params SugarParameter[] parameters)
        {
            return Context.Ado.GetDataSetAll(Sql, parameters);
        }

        /// <summary>
        ///  执行sql根据集合参数返回DataSet
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataSet GetDataSetBySql(string Sql, List<SugarParameter> parameters)
        {
            return Context.Ado.GetDataSetAll(Sql, parameters);
        }

        /// <summary>
        /// 根据参数执行Sql
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public bool ExecuteSql(string Sql, object parameters)
        {
            return Context.Ado.ExecuteCommand(Sql, parameters)>0;
        }

        /// <summary>
        /// 根据数组参数执行Sql
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public bool ExecuteSql(string Sql, params SugarParameter[] parameters)
        {
            
              return Context.Ado.ExecuteCommand(Sql, parameters)>0;
              
        }

        /// <summary>
        /// 根据集合参数执行Sql
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public bool ExecuteSql(string Sql, List<SugarParameter> parameters)
        {
               return  Context.Ado.ExecuteCommand(Sql, parameters)>0;
        }

        /// <summary>
        /// 执行sql根据条件获取List
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public List<T> GetList<T>(string Sql, object parameters = null) where T : class, new()
        {
            return Context.Ado.SqlQuery<T>(Sql, parameters);
        }

        /// <summary>
        /// 执行sql根据数组条件获取List
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public List<T> GetList<T>(string Sql, params SugarParameter[] parameters) where T : class, new()
        {
            return Context.Ado.SqlQuery<T>(Sql, parameters);
        }

        /// <summary>
        /// 执行sql根据集合条件获取List
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public List<T> GetList<T>(string Sql, List<SugarParameter> parameters) where T : class, new()
        {
            return Context.Ado.SqlQuery<T>(Sql, parameters);
        }

        /// <summary>
        ///  执行sql根据条件获取实体
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public T Get<T>(string Sql, object parameters = null) where T : class, new()
        {
            return Context.Ado.SqlQuerySingle<T>(Sql, parameters);
        }

        /// <summary>
        ///  执行sql根据数组条件获取实体
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public T Get<T>(string Sql, params SugarParameter[] parameters) where T : class, new()
        {
            return Context.Ado.SqlQuerySingle<T>(Sql, parameters);
        }

        /// <summary>
        /// 执行sql根据集合条件获取实体
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public T Get<T>(string Sql, List<SugarParameter> parameters) where T : class, new()
        {
            return Context.Ado.SqlQuerySingle<T>(Sql, parameters);
        }

        /// <summary>
        /// 执行sql根据条件获取结果
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public dynamic GetDynamic(string Sql, object parameters = null)
        {
            return Context.Ado.SqlQueryDynamic(Sql, parameters);
        }

        /// <summary>
        ///  执行sql根据数组条件获取结果
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public dynamic GetDynamic(string Sql, params SugarParameter[] parameters)
        {
            return Context.Ado.SqlQueryDynamic(Sql, parameters);
        }

        /// <summary>
        ///  执行sql根据集合条件获取结果
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public dynamic GetDynamic(string Sql, List<SugarParameter> parameters)
        {
            return Context.Ado.SqlQueryDynamic(Sql, parameters);
        }


        #endregion

        #region Other

        /// <summary>
        /// 查询存储过程
        /// </summary>
        /// <param name="procedureName"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataTable QueryProcedure(string procedureName, List<SugarParameter> parameters)
        {
            var datas = Context.Ado.UseStoredProcedure().GetDataTable(procedureName, parameters);
            return datas;
        }

        /// <summary>
        /// 查询前多少条数据 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="whereLambda"></param>
        /// <param name="num"></param>
        /// <returns></returns>
        public List<T> Take<T>(Expression<Func<T, bool>> whereLambda, int num) where T : class, new()
        {
            var datas = Context.Queryable<T>().With(SqlWith.NoLock).Where(whereLambda).Take(num).ToList();
            return datas;
        }

        /// <summary>
        /// 查询单条数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="whereLambda"></param>
        /// <returns></returns>
        public T First<T>(Expression<Func<T, bool>> whereLambda) where T : class, new()
        {
            var datas = Context.Queryable<T>().With(SqlWith.NoLock).Where(whereLambda).First();
            return datas;
        }

        /// <summary>
        /// 求和
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="field"></param>
        /// <returns></returns>
        public int Sum<T>(string field) where T : class, new()
        {
            var datas = Context.Queryable<T>().Sum<int>(field);
            return datas;
        }

        /// <summary>
        /// 最大值
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="field"></param>
        /// <returns></returns>
        public object Max<T>(string field) where T : class, new()
        {
            var datas = Context.Queryable<T>().Max<object>(field);
            return datas;
        }

        /// <summary>
        /// 最小值
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="field"></param>
        /// <returns></returns>
        public object Min<T>(string field) where T : class, new()
        {
            var datas = Context.Queryable<T>().Min<object>(field);
            return datas;
        }

        /// <summary>
        /// 平均值
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="field"></param>
        /// <returns></returns>
        public int Avg<T>(string field) where T : class, new()
        {
            var datas = Context.Queryable<T>().Avg<int>(field);
            return datas;
        }

        /// <summary>
        /// 根据条件返回数量
        /// </summary>
        /// <param name="whereExpression"></param>
        /// <returns></returns>
        public int Count<T>(Expression<Func<T, bool>> whereExpression) where T : class, new()
        {
            return Context.Queryable<T>().Where(whereExpression).Count();
        }

        /// <summary>
        /// 是否存在
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="whereExpression"></param>
        /// <returns></returns>
        public bool IsAny<T>(Expression<Func<T, bool>> whereExpression) where T : class, new()
        {
            return Context.Queryable<T>().Where(whereExpression).Any();
        }

        #endregion

        #region  Query

        /// <summary>
        ///  根据ID获取单个实体
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="id"></param>
        /// <returns></returns>
        public T GetById<T>(dynamic id) where T : class, new()
        {
            return Context.Queryable<T>().InSingle(id);
        }

        /// <summary>
        /// 获取List 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public List<T> GetList<T>() where T : class, new()
        {
            return Context.Queryable<T>().ToList();
        }

        /// <summary>
        /// 获取参数或者列
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="whereExpression"></param>
        /// <returns></returns>
        public T GetSingle<T>(Expression<Func<T, bool>> whereExpression) where T : class, new()
        {
            return Context.Queryable<T>().Single(whereExpression);
        }

        /// <summary>
        ///  根据条件获取List
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="whereExpression"></param>
        /// <returns></returns>
        public List<T> GetList<T>(Expression<Func<T, bool>> whereExpression) where T : class, new()
        {
            return Context.Queryable<T>().Where(whereExpression).ToList();
        }

        /// <summary>
        /// 根据条件获取分页
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="whereExpression"></param>
        /// <param name="page"></param>
        /// <returns></returns>
        public List<T> GetPageList<T>(Expression<Func<T, bool>> whereExpression, PageModel page) where T : class, new()
        {
            int count = 0;
            var result = Context.Queryable<T>().Where(whereExpression).ToPageList(page.PageIndex, page.PageSize, ref count);
            page.PageCount = count;
            return result;
        }

        /// <summary>
        ///  根据条件获取分页并且根据字段排序
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="whereExpression"></param>
        /// <param name="page"></param>
        /// <param name="orderByExpression"></param>
        /// <param name="orderByType"></param>
        /// <returns></returns>
        public List<T> GetPageList<T>(Expression<Func<T, bool>> whereExpression, PageModel page, Expression<Func<T, object>> orderByExpression = null, OrderByType orderByType = OrderByType.Asc) where T : class, new()
        {
            int count = 0;
            var result = Context.Queryable<T>().OrderByIF(orderByExpression != null, orderByExpression, orderByType).Where(whereExpression).ToPageList(page.PageIndex, page.PageSize, ref count);
            page.PageCount = count;
            return result;
        }

        /// <summary>
        ///  根据多条件获取分页
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="conditionalList"></param>
        /// <param name="page"></param>
        /// <returns></returns>
        public List<T> GetPageList<T>(List<IConditionalModel> conditionalList, PageModel page) where T : class, new()
        {
            int count = 0;
            var result = Context.Queryable<T>().Where(conditionalList).ToPageList(page.PageIndex, page.PageSize, ref count);
            page.PageCount = count;
            return result;
        }

        /// <summary>
        ///  根据多条件获取分页并且根据字段排序
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="conditionalList"></param>
        /// <param name="page"></param>
        /// <param name="orderByExpression"></param>
        /// <param name="orderByType"></param>
        /// <returns></returns>
        public List<T> GetPageList<T>(List<IConditionalModel> conditionalList, PageModel page, Expression<Func<T, object>> orderByExpression = null, OrderByType orderByType = OrderByType.Asc) where T : class, new()
        {
            int count = 0;
            var result = Context.Queryable<T>().OrderByIF(orderByExpression != null, orderByExpression, orderByType).Where(conditionalList).ToPageList(page.PageIndex, page.PageSize, ref count);
            page.PageCount = count;
            return result;
        }

        #endregion

        #region  Insert

        /// <summary>
        /// 新增
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="insertObj"></param>
        /// <returns></returns>
        public bool Insert<T>(T insertObj) where T : class, new()
        {
             return this.Context.Insertable(insertObj).ExecuteCommand() > 0;    
        }

        /// <summary>
        /// 新增返回ID
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="insertObj"></param>
        /// <returns></returns>
        public bool InsertReturnIdentity<T>(T insertObj) where T : class, new()
        {
               return this.Context.Insertable(insertObj).ExecuteReturnIdentity()>0;
        }

        /// <summary>
        /// 新增（实体）
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="insertObjs"></param>
        /// <returns></returns>
        public bool InsertRange<T>(T[] insertObjs) where T : class, new()
        {
              return this.Context.Insertable(insertObjs).ExecuteCommand() > 0;
        }

        /// <summary>
        /// 新增（List）
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="insertObjs"></param>
        /// <returns></returns>
        public bool InsertRange<T>(List<T>[] insertObjs) where T : class, new()
        {
              return  this.Context.Insertable(insertObjs).ExecuteCommand() > 0;
        }

        #endregion

        #region  Update

        /// <summary>
        /// 更新
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="updateObj"></param>
        /// <returns></returns>
        public bool Update<T>(T updateObj) where T : class, new()
        {
             return  this.Context.Updateable(updateObj).ExecuteCommand() > 0;
        }

        /// <summary>
        /// 更新（实体）
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="updateObjs"></param>
        /// <returns></returns>
        public bool UpdateRange<T>(T[] updateObjs) where T : class, new()
        {
                return this.Context.Updateable(updateObjs).ExecuteCommand() > 0;
        }

        /// <summary>
        /// 根据条件更新
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="columns"></param>
        /// <param name="whereExpression"></param>
        /// <returns></returns>
        public bool Update<T>(Expression<Func<T, T>> columns, Expression<Func<T, bool>> whereExpression) where T : class, new()
        {
                return this.Context.Updateable<T>().UpdateColumns(columns).Where(whereExpression).ExecuteCommand() > 0;
        }

        #endregion

        #region Delete

        /// <summary>
        /// 删除
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="deleteObj"></param>
        /// <returns></returns>
        public bool Delete<T>(T deleteObj) where T : class, new()
        {
                return this.Context.Deleteable<T>().Where(deleteObj).ExecuteCommand() > 0;
        }

        /// <summary>
        /// 根据条件删除
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="whereExpression"></param>
        /// <returns></returns>
        public bool Delete<T>(Expression<Func<T, bool>> whereExpression) where T : class, new()
        {
                return this.Context.Deleteable<T>().Where(whereExpression).ExecuteCommand() > 0;
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeleteById<T>(dynamic id) where T : class, new()
        {
             return  this.Context.Deleteable<T>().In(id).ExecuteCommand() > 0;  
        }

        /// <summary>
        /// 批量删除
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="ids"></param>
        /// <returns></returns>
        public bool DeleteByIds<T>(dynamic[] ids) where T : class, new()
        {
            return  this.Context.Deleteable<T>().In(ids).ExecuteCommand() > 0;   
        }

        #endregion
    }
    public partial class SimpleClient<T> where T : class, new()
    {
        protected SqlSugarClient Context { get; set; }
        public SqlSugarClient FullClient { get { return this.Context; } }

        private SimpleClient()
        {

        }

        public SimpleClient(SqlSugarClient context)
        {
            this.Context = context;
        }

        #region   Transaction

        /// <summary>
        /// 开始事务
        /// </summary>
        /// <param name="level"></param>
        public void BeginTran()
        {
            Context.Ado.BeginTran();
        }

        /// <summary>
        /// 提交事务
        /// </summary>
        public void CommitTran()
        {
            Context.Ado.CommitTran();
        }

        /// <summary>
        /// 回滚事务
        /// </summary>
        public void RollbackTran()
        {
            Context.Ado.RollbackTran();
        }

        #endregion

        #region   About Sql

        /// <summary>
        /// 执行sql获取List
        /// </summary>
        /// <param name="Sql"></param>
        /// <returns></returns>
        public List<T> GetListBySql(string Sql)
        {
            return Context.SqlQueryable<T>(Sql).ToList();
        }

        /// <summary>
        /// 执行sql根据条件获取List
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="whereExpression"></param>
        /// <returns></returns>
        public List<T> GetListBySql(string Sql,Expression<Func<T, bool>> whereExpression)
        {
            return Context.SqlQueryable<T>(Sql).Where(whereExpression).ToList();
        }

        /// <summary>
        /// 执行sql根据条件获取分页
        /// </summary>
        /// <param name="Sql"></param>
        /// <returns></returns>
        public List<T> GetPageListBySql(string Sql, Expression<Func<T, bool>> whereExpression, PageModel page)
        {
            int count = 0;
            var result = Context.SqlQueryable<T>(Sql).Where(whereExpression).ToPageList(page.PageIndex, page.PageSize, ref count);
            page.PageCount = count;
            return result;
        }

        /// <summary>
        ///  执行sql根据条件获取分页并且排序
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="whereExpression"></param>
        /// <param name="page"></param>
        /// <param name="orderByExpression"></param>
        /// <param name="orderByType"></param>
        /// <returns></returns>
        public List<T> GetPageListBySql(string Sql, Expression<Func<T, bool>> whereExpression, PageModel page, Expression<Func<T, object>> orderByExpression = null, OrderByType orderByType = OrderByType.Asc)
        {
            int count = 0;
            var result = Context.SqlQueryable<T>(Sql).OrderByIF(orderByExpression != null, orderByExpression, orderByType).Where(whereExpression).ToPageList(page.PageIndex, page.PageSize, ref count);
            page.PageCount = count;
            return result;
        }

        /// <summary>
        /// 执行sql根据多条件获取分页
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="conditionalList"></param>
        /// <param name="page"></param>
        /// <returns></returns>
        public List<T> GetPageListBySql(string Sql, List<IConditionalModel> conditionalList, PageModel page)
        {
            int count = 0;
            var result = Context.SqlQueryable<T>(Sql).Where(conditionalList).ToPageList(page.PageIndex, page.PageSize, ref count);
            page.PageCount = count;
            return result;
        }

        /// <summary>
        ///  执行sql根据多条件获取分页并且排序
        /// </summary>
        /// <param name="conditionalList"></param>
        /// <param name="page"></param>
        /// <param name="orderByExpression"></param>
        /// <param name="orderByType"></param>
        /// <returns></returns>
        public List<T> GetPageListBySql(string Sql, List<IConditionalModel> conditionalList, PageModel page, Expression<Func<T, object>> orderByExpression = null, OrderByType orderByType = OrderByType.Asc)
        {
            int count = 0;
            var result = Context.SqlQueryable<T>(Sql).OrderByIF(orderByExpression != null, orderByExpression, orderByType).Where(conditionalList).ToPageList(page.PageIndex, page.PageSize, ref count);
            page.PageCount = count;
            return result;
        }

        /// <summary>
        /// 执行sql根据参数返回DataTable
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataTable GetDataTableBySql(string Sql, object parameters)
        {
            return Context.Ado.GetDataTable(Sql, parameters);
        }

        /// <summary>
        /// 执行sql根据数组参数返回DataTable
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataTable GetDataTableBySql(string Sql, params SugarParameter[] parameters)
        {
            return Context.Ado.GetDataTable(Sql, parameters);
        }

        /// <summary>
        /// 执行sql根据集合参数返回DataTable
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataTable GetDataTableBySql(string Sql, List<SugarParameter> parameters)
        {
            return Context.Ado.GetDataTable(Sql, parameters);
        }

        /// <summary>
        /// 执行sql根据参数返回DataSet
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataSet GetDataSetBySql(string Sql, object parameters)
        {
            return Context.Ado.GetDataSetAll(Sql, parameters);
        }

        /// <summary>
        /// 执行sql根据数组参数返回DataSet
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataSet GetDataSetBySql(string Sql, params SugarParameter[] parameters)
        {
            return Context.Ado.GetDataSetAll(Sql, parameters);
        }

        /// <summary>
        ///  执行sql根据集合参数返回DataSet
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataSet GetDataSetBySql(string Sql, List<SugarParameter> parameters)
        {
            return Context.Ado.GetDataSetAll(Sql, parameters);
        }

        /// <summary>
        /// 根据参数执行Sql
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public bool ExecuteSql(string Sql, object parameters=null)
        {
                return Context.Ado.ExecuteCommand(Sql, parameters)>0;    
        }

        /// <summary>
        /// 根据数组参数执行Sql
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public bool ExecuteSql(string Sql, params SugarParameter[] parameters)
        {
               return Context.Ado.ExecuteCommand(Sql, parameters)>0;   
        }

        /// <summary>
        /// 根据集合参数执行Sql
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public bool ExecuteSql(string Sql, List<SugarParameter> parameters)
        {
             return  Context.Ado.ExecuteCommand(Sql, parameters)>0;      
        }

        /// <summary>
        /// 执行sql根据条件获取List
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public List<T> GetList(string Sql, object parameters = null)
        {
            return Context.Ado.SqlQuery<T>(Sql, parameters);
        }

        /// <summary>
        /// 执行sql根据数组条件获取List
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public List<T> GetList(string Sql, params SugarParameter[] parameters)
        {
            return Context.Ado.SqlQuery<T>(Sql, parameters);
        }

        /// <summary>
        /// 执行sql根据集合条件获取List
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public List<T> GetList(string Sql, List<SugarParameter> parameters)
        {
            return Context.Ado.SqlQuery<T>(Sql, parameters);
        }

        /// <summary>
        ///  执行sql根据条件获取实体
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public T Get(string Sql, object parameters = null)
        {
            return Context.Ado.SqlQuerySingle<T>(Sql, parameters);
        }

        /// <summary>
        ///  执行sql根据数组条件获取实体
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public T Get(string Sql, params SugarParameter[] parameters)
        {
            return Context.Ado.SqlQuerySingle<T>(Sql, parameters);
        }

        /// <summary>
        /// 执行sql根据集合条件获取实体
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public T Get(string Sql, List<SugarParameter> parameters)
        {
            return Context.Ado.SqlQuerySingle<T>(Sql, parameters);
        }

        /// <summary>
        /// 执行sql根据条件获取结果
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public dynamic GetDynamic(string Sql, object parameters = null)
        {
            return Context.Ado.SqlQueryDynamic(Sql, parameters);
        }

        /// <summary>
        ///  执行sql根据数组条件获取结果
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public dynamic GetDynamic(string Sql, params SugarParameter[] parameters)
        {
            return Context.Ado.SqlQueryDynamic(Sql, parameters);
        }

        /// <summary>
        ///  执行sql根据集合条件获取结果
        /// </summary>
        /// <param name="Sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public dynamic GetDynamic(string Sql, List<SugarParameter> parameters)
        {
            return Context.Ado.SqlQueryDynamic(Sql, parameters);
        }

        #endregion

        #region Other

        /// <summary>
        /// 查询存储过程
        /// </summary>
        /// <param name="procedureName"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataTable QueryProcedure(string procedureName, List<SugarParameter> parameters)
        {
            var datas = Context.Ado.UseStoredProcedure().GetDataTable(procedureName, parameters);
            return datas;
        }

        /// <summary>
        /// 查询前多少条数据 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="whereLambda"></param>
        /// <param name="num"></param>
        /// <returns></returns>
        public List<T> Take(Expression<Func<T, bool>> whereLambda, int num) 
        {
            var datas = Context.Queryable<T>().With(SqlWith.NoLock).Where(whereLambda).Take(num).ToList();
            return datas;
        }

        /// <summary>
        /// 查询单条数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="whereLambda"></param>
        /// <returns></returns>
        public T First(Expression<Func<T, bool>> whereLambda) 
        {
            var datas = Context.Queryable<T>().With(SqlWith.NoLock).Where(whereLambda).First();
            return datas;
        }

        /// <summary>
        /// 求和
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="field"></param>
        /// <returns></returns>
        public int Sum(string field) 
        {
            var datas = Context.Queryable<T>().Sum<int>(field);
            return datas;
        }

        /// <summary>
        /// 最大值
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="field"></param>
        /// <returns></returns>
        public object Max(string field) 
        {
            var datas = Context.Queryable<T>().Max<object>(field);
            return datas;
        }

        /// <summary>
        /// 最小值
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="field"></param>
        /// <returns></returns>
        public object Min(string field) 
        {
            var datas = Context.Queryable<T>().Min<object>(field);
            return datas;
        }

        /// <summary>
        /// 平均值
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="field"></param>
        /// <returns></returns>
        public int Avg(string field) 
        {
            var datas = Context.Queryable<T>().Avg<int>(field);
            return datas;
        }

        /// <summary>
        /// 根据条件返回数量
        /// </summary>
        /// <param name="whereExpression"></param>
        /// <returns></returns>
        public int Count(Expression<Func<T, bool>> whereExpression)
        {
            return Context.Queryable<T>().Where(whereExpression).Count();
        }

        /// <summary>
        /// 是否存在
        /// </summary>
        /// <param name="whereExpression"></param>
        /// <returns></returns>
        public bool IsAny(Expression<Func<T, bool>> whereExpression)
        {
            return Context.Queryable<T>().Where(whereExpression).Any();
        }

        #endregion

        #region  Query

        /// <summary>
        ///根据ID获取单个实体
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public T GetById(dynamic id)
        {
            return Context.Queryable<T>().InSingle(id);
        }

        /// <summary>
        /// 获取List
        /// </summary>
        /// <returns></returns>
        public List<T> GetList()
        {
            return Context.Queryable<T>().ToList();
        }

        /// <summary>
        /// 根据条件获取List
        /// </summary>
        /// <param name="whereExpression"></param>
        /// <returns></returns>
        public List<T> GetList(Expression<Func<T, bool>> whereExpression)
        {
            return Context.Queryable<T>().Where(whereExpression).ToList();
        }

        /// <summary>
        /// 根据条件获取参数或者列
        /// </summary>
        /// <param name="whereExpression"></param>
        /// <returns></returns>
        public T GetSingle(Expression<Func<T, bool>> whereExpression)
        {
            return Context.Queryable<T>().Single(whereExpression);
        }

        /// <summary>
        /// 获取分页
        /// </summary>
        /// <param name="whereExpression"></param>
        /// <param name="page"></param>
        /// <returns></returns>
        public List<T> GetPageList(Expression<Func<T, bool>> whereExpression, PageModel page)
        {
            int count = 0;
            var result = Context.Queryable<T>().Where(whereExpression).ToPageList(page.PageIndex, page.PageSize, ref count);
            page.PageCount = count;
            return result;
        }

        /// <summary>
        /// 根据条件获取分页并排序
        /// </summary>
        /// <param name="whereExpression"></param>
        /// <param name="page"></param>
        /// <param name="orderByExpression"></param>
        /// <param name="orderByType"></param>
        /// <returns></returns>
        public List<T> GetPageList(Expression<Func<T, bool>> whereExpression, PageModel page, Expression<Func<T, object>> orderByExpression = null, OrderByType orderByType = OrderByType.Asc) 
        {
            int count = 0;
            var result = Context.Queryable<T>().OrderByIF(orderByExpression != null, orderByExpression, orderByType).Where(whereExpression).ToPageList(page.PageIndex, page.PageSize, ref count);
            page.PageCount = count;
            return result;
        }

        /// <summary>
        /// 根据多条件获取分页
        /// </summary>
        /// <param name="conditionalList"></param>
        /// <param name="page"></param>
        /// <returns></returns>
        public List<T> GetPageList(List<IConditionalModel> conditionalList, PageModel page)
        {
            int count = 0;
            var result = Context.Queryable<T>().Where(conditionalList).ToPageList(page.PageIndex, page.PageSize, ref count);
            page.PageCount = count;
            return result;
        }

        /// <summary>
        /// 根据多条件获取分页并分页
        /// </summary>
        /// <param name="conditionalList"></param>
        /// <param name="page"></param>
        /// <param name="orderByExpression"></param>
        /// <param name="orderByType"></param>
        /// <returns></returns>
        public List<T> GetPageList(List<IConditionalModel> conditionalList, PageModel page, Expression<Func<T, object>> orderByExpression = null, OrderByType orderByType = OrderByType.Asc)  
        {
            int count = 0;
            var result = Context.Queryable<T>().OrderByIF(orderByExpression != null, orderByExpression, orderByType).Where(conditionalList).ToPageList(page.PageIndex, page.PageSize, ref count);
            page.PageCount = count;
            return result;
        }

        #endregion

        #region  Insert

        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="insertObj"></param>
        /// <returns></returns>
        public bool Insert(T insertObj)
        {
                return this.Context.Insertable(insertObj).ExecuteCommand() > 0;   
        }

        /// <summary>
        /// 新增返回ID
        /// </summary>
        /// <param name="insertObj"></param>
        /// <returns></returns>
        public int InsertReturnIdentity(T insertObj)
        {
               return this.Context.Insertable(insertObj).ExecuteReturnIdentity();
        }

        /// <summary>
        /// 新增（实体）
        /// </summary>
        /// <param name="insertObjs"></param>
        /// <returns></returns>
        public bool InsertRange(T[] insertObjs)
        {
              return this.Context.Insertable(insertObjs).ExecuteCommand() > 0;  
        }

        /// <summary>
        /// 新增（List）
        /// </summary>
        /// <param name="insertObjs"></param>
        /// <returns></returns>
        public bool InsertRange(List<T>[] insertObjs)
        {
               return this.Context.Insertable(insertObjs).ExecuteCommand() > 0;       
        }

        #endregion

        #region   Update

        /// <summary>
        /// 更新实体
        /// </summary>
        /// <param name="updateObj"></param>
        /// <returns></returns>
        public bool Update(T updateObj)
        {
                return this.Context.Updateable(updateObj).ExecuteCommand() > 0;
        }

        /// <summary>
        /// 更新多实体
        /// </summary>
        /// <param name="updateObjs"></param>
        /// <returns></returns>
        public bool UpdateRange(T [] updateObjs)
        {
               return this.Context.Updateable(updateObjs).ExecuteCommand() > 0;    
        }

        /// <summary>
        /// 根据条件更新
        /// </summary>
        /// <param name="columns"></param>
        /// <param name="whereExpression"></param>
        /// <returns></returns>
        public bool Update(Expression<Func<T, T>> columns, Expression<Func<T, bool>> whereExpression)
        {    
               return this.Context.Updateable<T>().UpdateColumns(columns).Where(whereExpression).ExecuteCommand() > 0;   
        }

        #endregion

        #region  Delete

        /// <summary>
        /// 删除实体
        /// </summary>
        /// <param name="deleteObj"></param>
        /// <returns></returns>
        public bool Delete(T deleteObj)
        {
            return this.Context.Deleteable<T>().Where(deleteObj).ExecuteCommand() > 0;
        }

        /// <summary>
        /// 根据条件删除
        /// </summary>
        /// <param name="whereExpression"></param>
        /// <returns></returns>
        public bool Delete(Expression<Func<T, bool>> whereExpression)
        {  
              return this.Context.Deleteable<T>().Where(whereExpression).ExecuteCommand() > 0;         
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeleteById(dynamic id)
        {
            return this.Context.Deleteable<T>().In(id).ExecuteCommand() > 0;
        }

        /// <summary>
        /// 批量删除
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public bool DeleteByIds(dynamic[] ids)
        {
            return this.Context.Deleteable<T>().In(ids).ExecuteCommand() > 0;
        }

        #endregion
    }
}
