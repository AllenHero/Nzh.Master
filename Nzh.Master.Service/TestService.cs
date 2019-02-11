using Nzh.Master.IRepository;
using Nzh.Master.IService;
using Nzh.Master.Model;
using Nzh.Master.Model.Base;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Nzh.Master.Service
{
    public class TestService : ITestService
    {
        IDemoRepository _demoRepository;

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
        public ResultModel<Demo> GetDmeoPageList(int PageIndex, int PageSize, string Name)
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
        /// <param name="ID"></param>
        /// <returns></returns>
        public Demo GetDemoById(string ID)
        {
            string sql = "SELECT * from  Demo where ID=@ID";
            var model = _demoRepository.Get(sql, new { ID = ID });
            return model;
        }

        /// <summary>
        /// 添加Demo
        /// </summary>
        /// <param name="Name"></param>
        /// <param name="Sex"></param>
        /// <param name="Age"></param>
        /// <param name="Remark"></param>
        /// <returns></returns>
        public ResultModel<bool> AddDemo(string Name, string Sex, int Age, string Remark)
        {
            var result = new ResultModel<bool>();
            try
            {
                _demoRepository.BeginTran(); //开始事务
                Demo entity = new Demo();
                entity.ID = Guid.NewGuid();
                entity.Name = Name;
                entity.Sex = Sex;
                entity.Age = Age;
                entity.Remark = Remark;
                string sql = "insert into Demo(ID,Name,Sex,Age,Remark) values(@ID,@Name,@Sex,@Age,@Remark)";
                SugarParameter[] Parameter = new SugarParameter[]
                {
               new SugarParameter("@ID",entity.ID),
               new SugarParameter("@Name", entity.Name),
               new SugarParameter("@Sex",  entity.Sex),
               new SugarParameter("@Age", entity.Age),
               new SugarParameter("@Remark", entity.Remark)
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
        /// <param name="ID"></param>
        /// <param name="Name"></param>
        /// <param name="Sex"></param>
        /// <param name="Age"></param>
        /// <param name="Remark"></param>
        /// <returns></returns>
        public ResultModel<bool> UpdateDemo(string ID, string Name, string Sex, int Age, string Remark)
        {
            var result = new ResultModel<bool>();
            try
            {
                _demoRepository.BeginTran(); //开始事务
                Demo entity = new Demo();
                entity.ID = Guid.Parse(ID);
                entity.Name = Name;
                entity.Sex = Sex;
                entity.Age = Age;
                entity.Remark = Remark;
                string sql = "update Demo set Name=@Name,Sex=@Sex,Age=@Age,Remark=@Remark WHERE ID=@ID";
                SugarParameter[] Parameter = new SugarParameter[]
                {
               new SugarParameter("@ID",entity.ID),
               new SugarParameter("@Name", entity.Name),
               new SugarParameter("@Sex",  entity.Sex),
               new SugarParameter("@Age", entity.Age),
               new SugarParameter("@Remark", entity.Remark)
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
        /// <param name="ID"></param>
        /// <returns></returns>
        public ResultModel<bool> DeleteDemo(string ID)
        {
            var result = new ResultModel<bool>();
            try
            {
                _demoRepository.BeginTran(); //开始事务
                string sql = "delete from  Demo where ID=@ID";
                SugarParameter[] Parameter = new SugarParameter[]
                {
               new SugarParameter("@ID",ID)
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
    }
}
