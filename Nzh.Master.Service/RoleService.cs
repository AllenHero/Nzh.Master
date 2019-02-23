using Nzh.Master.IRepository;
using Nzh.Master.IService;
using Nzh.Master.Model;
using Nzh.Master.Model.Base;
using Nzh.Master.Model.Enum;
using Nzh.Master.Service.Base;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Nzh.Master.Service
{
    public class RoleService : BaseService, IRoleService
    {
        IRoleRepository _roleRepository;

        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        /// <summary>
        ///  获取角色分页
        /// </summary>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <param name="RoleName"></param>
        /// <returns></returns>
        public ResultModel<Role> GetUserPageList(int PageIndex, int PageSize, string RoleName)
        {
            PageModel pm = new PageModel() { PageIndex = PageIndex, PageSize = PageSize };
            Expression<Func<Role, bool>> expression = ex => ex.RoleName == RoleName;
            dynamic data = _roleRepository.GetPageList(expression, pm);
            ResultModel<Role> rm = new ResultModel<Role>();
            rm.Count = pm.PageCount;
            rm.Data = data;
            return rm;
        }

        /// <summary>
        /// 添加角色
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ResultModel<bool> AddRole(Role model)
        {
            var result = new ResultModel<bool>();
            try
            {
                _roleRepository.BeginTran();//开始事务
                Role Role = new Role();
                Role.RoleID = Guid.NewGuid();
                Role.RoleName = model.RoleName;
                Role.RoleRemark = model.RoleRemark; 
                Role.CreateTime = GetSystemCurrentTime();
                Role.CreateUserID = GetSystemCurrentUser();
                Role.IsDelete = IsDelete.No;
                result.Data = _roleRepository.Insert(Role);
                _roleRepository.CommitTran();//提交事务
                return result;
            }
            catch (Exception ex)
            {
                _roleRepository.RollbackTran();//回滚事务
                throw ex;
            }
        }

        /// <summary>
        /// 修改角色
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ResultModel<bool> UpdateRole(Role model)
        {
            var result = new ResultModel<bool>();
            try
            {
                _roleRepository.BeginTran();//开始事务
                var Role = _roleRepository.GetById(model.RoleID);
                if (Role != null)
                {
                    Role.RoleName = model.RoleName;
                    Role.RoleRemark = model.RoleRemark; 
                    result.Data = _roleRepository.Update(Role);
                    _roleRepository.CommitTran();//提交事务
                }
                return result;
            }
            catch (Exception ex)
            {
                _roleRepository.RollbackTran();//回滚事务
                throw ex;
            }
        }

        /// <summary>
        /// 删除角色
        /// </summary>
        /// <param name="RoleID"></param>
        /// <returns></returns>
        public ResultModel<bool> DeleteRole(Guid RoleID)
        {
            var result = new ResultModel<bool>();
            try
            {
                _roleRepository.BeginTran();//开始事务
                var Role = _roleRepository.GetById(RoleID);
                if (Role != null)
                {
                    Role.IsDelete = IsDelete.Yes; //标识符删除
                    result.Data = _roleRepository.Update(Role);
                    _roleRepository.CommitTran();//提交事务
                }
                return result;
            }
            catch (Exception ex)
            {
                _roleRepository.RollbackTran();//回滚事务
                throw ex;
            }
        }
    }
}
