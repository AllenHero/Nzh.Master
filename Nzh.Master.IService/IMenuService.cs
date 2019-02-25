using Nzh.Master.IService.Base;
using Nzh.Master.Model;
using Nzh.Master.Model.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.IService
{
    public interface IMenuService : IBaseService
    {
        /// <summary>
        /// 获取菜单分页
        /// </summary>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <param name="MenuName"></param>
        /// <returns></returns>
        ResultModel<Menu> GetMenuPageList(int PageIndex, int PageSize, string MenuName);

        /// <summary>
        /// 添加菜单
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ResultModel<bool> AddMenu(Menu model);

        /// <summary>
        /// 修改菜单
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ResultModel<bool> UpdateMenu(Menu model);

        /// <summary>
        /// 删除菜单
        /// </summary>
        /// <param name="MenuID"></param>
        /// <returns></returns>
        ResultModel<bool> DeleteMenu(Guid MenuID);

        /// <summary>
        /// 菜单分配功能权限
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ResultModel<bool> MenuAuthority(MenuFunction model);
    }
}
