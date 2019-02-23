using Nzh.Master.IRepository.Base;
using Nzh.Master.IService.Base;
using Nzh.Master.Model;
using Nzh.Master.Model.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.IService
{
    public interface IRoleService : IBaseService
    {
        /// <summary>
        ///  获取角色分页
        /// </summary>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <param name="RoleName"></param>
        /// <returns></returns>
        ResultModel<Role> GetUserPageList(int PageIndex, int PageSize, string RoleName);

        /// <summary>
        /// 添加角色
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ResultModel<bool> AddRole(Role model);

        /// <summary>
        /// 修改角色
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ResultModel<bool> UpdateRole(Role model);

        /// <summary>
        /// 删除角色
        /// </summary>
        /// <param name="RoleID"></param>
        /// <returns></returns>
        ResultModel<bool> DeleteRole(Guid RoleID);
    }
}
