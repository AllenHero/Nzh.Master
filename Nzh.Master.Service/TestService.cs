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
   public class TestService  : ITestService
    {
        IDemoRepository _demorepository;

        public TestService(IDemoRepository demorepository)
        {
            _demorepository = demorepository;
        }

        /// <summary>
        /// 获取Demo分页
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="Name"></param>
        /// <returns></returns>
        public ResultModel<Demo> GetDmeoPageList(int pageIndex, int pageSize, string Name)
        {

            string sql = "SELECT * from  Demo";
            PageModel pm = new PageModel() { PageIndex = pageIndex, PageSize = pageSize };
            Expression<Func<Demo, bool>> expression = ex => ex.Name == Name;
            List<Demo> data = _demorepository.GetPageListBySql(sql,expression, pm);
            ResultModel<Demo> rm = new ResultModel<Demo>();
            rm.Code = 0;
            rm.Count = pm.PageCount;
            rm.Data = data;
            rm.Msg = "成功";
            return rm;
        }

        /// <summary>
        /// 根据ID获取Demo
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public Demo GetDemoById(string ID)
        {
            string sql = "SELECT * from  Demo where ID=@ID";
            var model = _demorepository.Get(sql, new { ID = ID });
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
        public bool AddDemo(string Name, string Sex, int Age,string Remark)
        {
            bool result = false;
            try
            {
                _demorepository.BeginTran(); //开始事务
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
                result = _demorepository.ExecuteSql(sql, Parameter);
                _demorepository.CommitTran();//提交事务
                result = true;
                return result;
            }
            catch (Exception ex)
            {
                _demorepository.RollbackTran();//回滚事务
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
        public bool UpdateDemo(string ID, string Name, string Sex, int Age, string Remark)
        {
            bool result = false;
            try
            {
                _demorepository.BeginTran(); //开始事务
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
                result = _demorepository.ExecuteSql(sql, Parameter);
                _demorepository.CommitTran();//提交事务
                result = true;
                return result;
            }
            catch (Exception ex)
            {
                _demorepository.RollbackTran();//回滚事务
                throw ex;
            }
        }

        /// <summary>
        /// 删除Demo
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public bool DeleteDemo(string ID)
        {
            bool result = false;
            try
            {
                _demorepository.BeginTran(); //开始事务
                string sql = "delete from  Demo where ID=@ID";
                SugarParameter[] Parameter = new SugarParameter[]
                {
               new SugarParameter("@ID",ID)
                };
                result = _demorepository.ExecuteSql(sql, Parameter);
                _demorepository.CommitTran();//提交事务
                result = true;
                return result;
            }
            catch (Exception ex)
            {
                _demorepository.RollbackTran();//回滚事务
                throw ex;
            }
        }
    }
}
