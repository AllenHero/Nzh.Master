using Nzh.Master.IRepository;
using Nzh.Master.IService;
using Nzh.Master.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Nzh.Master.Service
{
    public class DemoService : IDemoService
    {
        IDemoRepository _demorepository;

        public DemoService(IDemoRepository demorepository)
        {
            _demorepository = demorepository;
        }

        /// <summary>
        /// 获取Demo列表
        /// </summary>
        /// <returns></returns>
        public async Task<List<Demo>> GetDemoList()
        {
            var demolist = await _demorepository.Query();
            return demolist;
        }

        /// <summary>
        /// 获取Demo
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Demo> GetDemo(int id)
        {
            var demo = await _demorepository.QueryByID(id);
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
        public async Task<bool> AddDemo(string Name, string Sex, int Age, string Remark)
        {
            bool result = false;
            try
            {
                _demorepository.BeginTran();//开始事务
                Demo Demo = new Demo();
                Demo.Name = Name;
                Demo.Sex = Sex;
                Demo.Age = Age;
                Demo.Remark = Remark;
                result = await _demorepository.Add(Demo);
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
        /// 修改Demo
        /// </summary>
        /// <param name="id"></param>
        /// <param name="Name"></param>
        /// <param name="Sex"></param>
        /// <param name="Age"></param>
        /// <param name="Remark"></param>
        /// <returns></returns>
        public async Task<bool> UpdateDemo(int id, string Name, string Sex, int Age, string Remark)
        {
            bool result = false;
            try
            {
                _demorepository.BeginTran();//开始事务
                var Demo = await _demorepository.QueryByID(id);
                if (Demo != null)
                {
                    Demo.ID = id;
                    Demo.Name = Name;
                    Demo.Sex = Sex;
                    Demo.Age = Age;
                    Demo.Remark = Remark;
                    result = await _demorepository.Update(Demo);
                    _demorepository.CommitTran();//提交事务
                    result = true;
                }
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
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool> DeleteDemo(int id)
        {
            bool result = false;
            try
            {
                _demorepository.BeginTran();//开始事务
                var Demo = await _demorepository.QueryByID(id);
                if (Demo != null)
                {
                    result = await _demorepository.DeleteById(id);
                    _demorepository.CommitTran();//提交事务
                    result = true;
                }
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
