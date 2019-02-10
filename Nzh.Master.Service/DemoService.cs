using Nzh.Master.IRepository;
using Nzh.Master.IService;
using Nzh.Master.Model;
using Nzh.Master.Model.Base;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Nzh.Master.Service
{
    public class DemoService : IDemoService
    {
        IDemoRepository _demoRepository;

        public DemoService(IDemoRepository demoRepository)
        {
            _demoRepository = demoRepository;
        }

        /// <summary>
        /// 获取Demo列表
        /// </summary>
        /// <returns></returns>
        public  ResultModel<Demo> GetDmeoPageList(int pageIndex, int pageSize, string Name)
        {
            PageModel pm = new PageModel() { PageIndex = pageIndex, PageSize = pageSize };
            Expression<Func<Demo, bool>> expression = ex => ex.Name == Name;
            List<Demo> data = _demoRepository.GetPageList(expression, pm);
            ResultModel<Demo> rm = new ResultModel<Demo>();
            rm.Code = 0;
            rm.Count = pm.PageCount;
            rm.Data = data;
            rm.Msg = "成功";
            return rm;
        }

        /// <summary>
        /// 获取Demo
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Demo GetDemoById(Guid id)
        {
            var demo = _demoRepository.GetById(id);
            return demo;
        }

        /// <summary>
        /// 添加Demo
        /// </summary>
        /// <param name="Name"></param>
        /// <param name="Sex"></param>
        /// <param name="Age"></param>
        /// <param name="Remark"></param>
        /// <returns></returns>
        public bool AddDemo(string Name, string Sex, int Age, string Remark)
        {
            bool result = false;
            try
            {
                _demoRepository.BeginTran();//开始事务
                Demo Demo = new Demo();
                Demo.Name = Name;
                Demo.Sex = Sex;
                Demo.Age = Age;
                Demo.Remark = Remark;
                result = _demoRepository.Insert(Demo);
                _demoRepository.CommitTran();//提交事务
                result = true;
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
        /// <param name="id"></param>
        /// <param name="Name"></param>
        /// <param name="Sex"></param>
        /// <param name="Age"></param>
        /// <param name="Remark"></param>
        /// <returns></returns>
        public bool UpdateDemo(Guid id, string Name, string Sex, int Age, string Remark)
        {
            bool result = false;
            try
            {
                _demoRepository.BeginTran();//开始事务
                var Demo = _demoRepository.GetById(id);
                if (Demo != null)
                {
                    Demo.ID = id;
                    Demo.Name = Name;
                    Demo.Sex = Sex;
                    Demo.Age = Age;
                    Demo.Remark = Remark;
                    result = _demoRepository.Update(Demo);
                    _demoRepository.CommitTran();//提交事务
                    result = true;
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
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeleteDemo(Guid id)
        {
            bool result = false;
            try
            {
                _demoRepository.BeginTran();//开始事务
                var Demo = _demoRepository.GetById(id);
                if (Demo != null)
                {
                    result = _demoRepository.DeleteById(id);
                    _demoRepository.CommitTran();//提交事务
                    result = true;
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
