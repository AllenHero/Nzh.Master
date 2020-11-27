using Nzh.Master.Common.Helper;
using Nzh.Master.IRepository;
using Nzh.Master.IService;
using Nzh.Master.Model;
using Nzh.Master.Model.Base;
using Nzh.Master.Service.Base;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Nzh.Master.Service
{
    public class TestService : BaseService,ITestService
    {
        private readonly IDemoRepository _demoRepository;

        public TestService(IDemoRepository demoRepository)
        {
            _demoRepository = demoRepository;
        }

        /// <summary>
        /// 获取Demo分页
        /// </summary>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <param name="Name"></param>
        /// <returns></returns>
        public ResultModel<Demo> GetDemoPageList(int PageIndex, int PageSize, string Name)
        {
            string sql = "SELECT * from  Demo";
            PageModel pm = new PageModel() { PageIndex = PageIndex, PageSize = PageSize };
            Expression<Func<Demo, bool>> expression = ex => ex.Name == Name;
            dynamic data = _demoRepository.GetPageListBySql(sql, expression, pm);
            ResultModel<Demo> rm = new ResultModel<Demo>();
            rm.Count = pm.PageCount;
            rm.Data = data;
            return rm;
        }


        /// <summary>
        /// 获取Demo
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public Demo GetDemoById(long Id)
        {
            string sql = "SELECT * from  Demo where Id=@Id";
            var demoModel = _demoRepository.Get(sql, new { Id = Id });
            return demoModel;
        }

        /// <summary>
        /// 添加Demo
        /// </summary>
        /// <param name="Name"></param>
        /// <param name="Sex"></param>
        /// <param name="Age"></param>
        /// <param name="Remark"></param>
        /// <returns></returns>
        public ResultModel<bool> InsertDemo(string Name, string Sex, int Age, string Remark)
        {
            var result = new ResultModel<bool>();
            try
            {
                _demoRepository.BeginTran(); //开始事务
                long Id = IdWorkerHelper.NewId();
                string sql = "insert into Demo(Id,Name,Sex,Age,Remark) values(@Id,@Name,@Sex,@Age,@Remark)";
                SugarParameter[] Parameter = new SugarParameter[]
                {
               new SugarParameter("@Id",Id),
               new SugarParameter("@Name", Name),
               new SugarParameter("@Sex",  Sex),
               new SugarParameter("@Age", Age),
               new SugarParameter("@Remark", Remark)
               };
                result.Data = _demoRepository.ExecuteSql(sql, Parameter);
                _demoRepository.CommitTran();//提交事务
                return result;
            }
            catch (Exception ex)
            {
                _demoRepository.RollbackTran();//回滚事务
                throw ex;
            }
        }

        /// <summary>
        ///  修改Demo
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="Name"></param>
        /// <param name="Sex"></param>
        /// <param name="Age"></param>
        /// <param name="Remark"></param>
        /// <returns></returns>
        public ResultModel<bool> UpdateDemo(long Id, string Name, string Sex, int Age, string Remark)
        {
            var result = new ResultModel<bool>();
            try
            {
                _demoRepository.BeginTran(); //开始事务
                string sql = "update Demo set Name=@Name,Sex=@Sex,Age=@Age,Remark=@Remark WHERE Id=@Id";
                SugarParameter[] Parameter = new SugarParameter[]
                {
               new SugarParameter("@Id",Id),
               new SugarParameter("@Name", Name),
               new SugarParameter("@Sex",  Sex),
               new SugarParameter("@Age", Age),
               new SugarParameter("@Remark", Remark)
               };
                result.Data = _demoRepository.ExecuteSql(sql, Parameter);
                _demoRepository.CommitTran();//提交事务
                return result;
            }
            catch (Exception ex)
            {
                _demoRepository.RollbackTran();//回滚事务
                throw ex;
            }
        }

        /// <summary>
        /// 删除Demo
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public ResultModel<bool> DeleteDemo(long Id)
        {
            var result = new ResultModel<bool>();
            try
            {
                _demoRepository.BeginTran(); //开始事务
                string sql = "delete from  Demo where Id=@Id";
                SugarParameter[] Parameter = new SugarParameter[]
                {
               new SugarParameter("@Id",Id)
                };
                result.Data = _demoRepository.ExecuteSql(sql, Parameter);
                _demoRepository.CommitTran();//提交事务
                return result;
            }
            catch (Exception ex)
            {
                _demoRepository.RollbackTran();//回滚事务
                throw ex;
            }
        }

        /// <summary>
        /// 测试导出
        /// </summary>
        /// <returns></returns>
        public List<Demo> TestExportExcel()
        {
            string sql = "select * from Demo ";
            List<Demo> list = _demoRepository.GetList(sql);
            return list;
        }

        /// <summary>
        /// 测试导入
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        public ResultModel<bool> TestImportExcel(List<Demo> list)
        {
            var result = new ResultModel<bool>();
            try
            {
                _demoRepository.BeginTran();//开始事务
                foreach (var item in list)
                {
                    result.Data = _demoRepository.Insert(item);
                }
                _demoRepository.CommitTran();//提交事务
                return result;
            }
            catch (Exception ex)
            {
                _demoRepository.RollbackTran();//回滚事务
                throw ex;
            }
        }

        /// <summary>
        /// 获取demo
        /// </summary>
        /// <param name="Name"></param>
        /// <returns></returns>
        public dynamic GetByName(string Name)
        {
            string sql = "SELECT * from  Demo where Name=@Name";
            Demo demoModel = _demoRepository.Get(sql, new { Name = Name });
            return demoModel;
        }
    }
}
