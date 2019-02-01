﻿using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Nzh.Master.IRepository.Base
{
    public interface IBaseRepository<T> where T : class
    {
        void BeginTran();

        void CommitTran();

        void RollbackTran();

        Task<T> QueryByID(object objId);

        Task<T> QueryByID(object objId, bool blnUseCache = false);

        Task<List<T>> QueryByIDs(object[] lstIds);

        Task<bool> Add(T model);

        Task<bool> DeleteById(object id);

        Task<bool> Delete(T model);

        Task<bool> DeleteByIds(object[] ids);

        Task<bool> Update(T model);

        Task<bool> Update(T entity, string strWhere);

        Task<bool> Update(T entity, List<string> lstColumns = null, List<string> lstIgnoreColumns = null, string strWhere = "");

        Task<List<T>> Query();

        Task<List<T>> Query(string strWhere);

        Task<List<T>> Query(Expression<Func<T, bool>> whereExpression);

        Task<List<T>> Query(Expression<Func<T, bool>> whereExpression, string strOrderByFileds);

        Task<List<T>> Query(Expression<Func<T, bool>> whereExpression, Expression<Func<T, object>> orderByExpression, bool isAsc = true);

        Task<List<T>> Query(string strWhere, string strOrderByFileds);

        Task<List<T>> Query(Expression<Func<T, bool>> whereExpression, int intTop, string strOrderByFileds);

        Task<List<T>> Query(string strWhere, int intTop, string strOrderByFileds);

        Task<List<T>> Query(Expression<Func<T, bool>> whereExpression, int intPageIndex, int intPageSize, string strOrderByFileds);

        Task<List<T>> Query(string strWhere, int intPageIndex, int intPageSize, string strOrderByFileds);

        Task<List<T>> QueryPage(Expression<Func<T, bool>> whereExpression, int intPageIndex = 0, int intPageSize = 20, string strOrderByFileds = null);
    }
}
