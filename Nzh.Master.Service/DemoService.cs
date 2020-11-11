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
using System.Threading.Tasks;

namespace Nzh.Master.Service
{
    public class DemoService : BaseService, IDemoService
    {
        private readonly IDemoRepository _demoRepository;

        public DemoService(IDemoRepository demoRepository)
        {
            _demoRepository = demoRepository;
        }

        /// <summary>
        ///  获取Demo分页
        /// </summary>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <param name="Name"></param>
        /// <returns></returns>
        public ResultModel<Demo> GetDemoPageList(int PageIndex, int PageSize, string Name)
        {
            PageModel pm = new PageModel() { PageIndex = PageIndex, PageSize = PageSize };
            Expression<Func<Demo, bool>> expression = ex => ex.Name == Name;
            dynamic data = _demoRepository.GetPageList(expression, pm);
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
        public Demo GetDemoById(string Id)
        {
            var demoModel = _demoRepository.GetById(Id);
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
                _demoRepository.BeginTran();//开始事务
                Demo Demo = new Demo();
                Demo.Id = IdWorkerHelper.NewId();
                Demo.Name = Name;
                Demo.Sex = Sex;
                Demo.Age = Age;
                Demo.Remark = Remark;
                result.Data =  _demoRepository.Insert(Demo);
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
        /// 修改Demo
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="Name"></param>
        /// <param name="Sex"></param>
        /// <param name="Age"></param>
        /// <param name="Remark"></param>
        /// <returns></returns>
        public ResultModel<bool> UpdateDemo(string Id, string Name, string Sex, int Age, string Remark)
        {
            var result = new ResultModel<bool>();
            try
            {
                _demoRepository.BeginTran();//开始事务
                var Demo = _demoRepository.GetById(Id);
                if (Demo != null)
                {
                    Demo.Name = Name;
                    Demo.Sex = Sex;
                    Demo.Age = Age;
                    Demo.Remark = Remark;
                    result.Data = _demoRepository.Update(Demo);
                    _demoRepository.CommitTran();//提交事务
                }
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
        public ResultModel<bool> DeleteDemo(string Id)
        {
            var result = new ResultModel<bool>();
            try
            {
                _demoRepository.BeginTran();//开始事务
                var Demo = _demoRepository.GetById(Id);
                if (Demo != null)
                {
                    result.Data = _demoRepository.DeleteById(Id);
                    _demoRepository.CommitTran();//提交事务
                }
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
