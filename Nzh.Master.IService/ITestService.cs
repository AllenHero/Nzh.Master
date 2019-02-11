using Nzh.Master.Model;
using Nzh.Master.Model.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.IService
{
    public interface ITestService
    {
        /// <summary>
        /// 获取Demo分页
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="Name"></param>
        /// <returns></returns>
        ResultModel<Demo> GetDmeoPageList(int pageIndex, int pageSize, string Name);

        /// <summary>
        /// 根据ID获取Demo
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        Demo GetDemoById(string ID);

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
        ///  修改Demo
        /// </summary>
        /// <param name="ID"></param>
        /// <param name="Name"></param>
        /// <param name="Sex"></param>
        /// <param name="Age"></param>
        /// <param name="Remark"></param>
        /// <returns></returns>
        ResultModel<bool> UpdateDemo(string ID, string Name, string Sex, int Age, string Remark);

        /// <summary>
        /// 删除Demo
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        ResultModel<bool> DeleteDemo(string ID);
    }
}
