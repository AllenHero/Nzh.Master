using Nzh.Master.IService.Base;
using Nzh.Master.Model;
using Nzh.Master.Model.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.IService
{
    public interface ITestService : IBaseService
    {
        /// <summary>
        /// 获取Demo分页
        /// </summary>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <param name="Name"></param>
        /// <returns></returns>
        ResultModel<Demo> GetDemoPageList(int PageIndex, int PageSize, string Name);

        /// <summary>
        /// 根据Id获取Demo
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        Demo GetDemoById(string Id);

        /// <summary>
        /// 添加Demo
        /// </summary>
        /// <param name="Name"></param>
        /// <param name="Sex"></param>
        /// <param name="Age"></param>
        /// <param name="Remark"></param>
        /// <returns></returns>
        ResultModel<bool> InsertDemo(string Name, string Sex, int Age, string Remark);

        /// <summary>
        ///  修改Demo
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="Name"></param>
        /// <param name="Sex"></param>
        /// <param name="Age"></param>
        /// <param name="Remark"></param>
        /// <returns></returns>
        ResultModel<bool> UpdateDemo(string Id, string Name, string Sex, int Age, string Remark);

        /// <summary>
        /// 删除Demo
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        ResultModel<bool> DeleteDemo(string Id);

        /// <summary>
        /// 测试导出
        /// </summary>
        /// <returns></returns>
        List<Demo> TestExportExcel();

        /// <summary>
        /// 测试导入
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        ResultModel<bool> TestImportExcel(List<Demo> list);

        /// <summary>
        /// 获取demo
        /// </summary>
        /// <param name="Name"></param>
        /// <returns></returns>
        dynamic GetByName(string Name);
    }
}
