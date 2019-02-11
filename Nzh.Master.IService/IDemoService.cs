using Nzh.Master.Model;
using Nzh.Master.Model.Base;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Nzh.Master.IService
{
    public interface IDemoService 
    {
        /// <summary>
        /// 获取Demo列表
        /// </summary>
        /// <returns></returns>
       ResultModel<Demo> GetDmeoPageList(int page_index, int page_size, string Name);

        /// <summary>
        /// 获取Demo
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Demo GetDemoById(Guid id);

        /// <summary>
        /// 添加Demo
        /// </summary>
        /// <param name="Name"></param>
        /// <param name="Sex"></param>
        /// <param name="Age"></param>
        /// <param name="Remark"></param>
        /// <returns></returns>
        ResultModel<bool> AddDemo(string Name, string Sex, int Age, string Remark);

        /// <summary>
        /// 修改Demo
        /// </summary>
        /// <param name="id"></param>
        /// <param name="Name"></param>
        /// <param name="Sex"></param>
        /// <param name="Age"></param>
        /// <param name="Remark"></param>
        /// <returns></returns>
        ResultModel<bool> UpdateDemo(Guid id, string Name, string Sex, int Age, string Remark);

        /// <summary>
        /// 删除Demo
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ResultModel<bool> DeleteDemo(Guid id);
    }
}
