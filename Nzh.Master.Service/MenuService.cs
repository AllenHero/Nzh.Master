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
    public class MenuService: BaseService, IMenuService
    {

        IMenuRepository _menuRepository;

        public MenuService(IMenuRepository menuRepository)
        {
            _menuRepository = menuRepository;
        }

        /// <summary>
        /// 获取菜单分页
        /// </summary>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <param name="MenuName"></param>
        /// <returns></returns>
        public ResultModel<Menu> GetMenuPageList(int PageIndex, int PageSize, string MenuName)
        {
            PageModel pm = new PageModel() { PageIndex = PageIndex, PageSize = PageSize };
            Expression<Func<Menu, bool>> expression = ex => ex.MenuName == MenuName;
            dynamic data = _menuRepository.GetPageList(expression, pm);
            ResultModel<Menu> rm = new ResultModel<Menu>();
            rm.Count = pm.PageCount;
            rm.Data = data;
            return rm;
        }

         /// <summary>
         /// 添加菜单
         /// </summary>
         /// <param name="model"></param>
         /// <returns></returns>
        public ResultModel<bool> AddMenu(Menu model)
        {
            var result = new ResultModel<bool>();
            try
            {
                _menuRepository.BeginTran();//开始事务
                Menu Menu = new Menu();
                Menu.MenuID = Guid.NewGuid();
                Menu.MenuCode = model.MenuCode;
                Menu.MenuName = model.MenuName;
                Menu.MenuUrl = model.MenuUrl;
                Menu.MenuParentID = model.MenuParentID;
                Menu.CreateTime = GetSystemCurrentTime();
                Menu.CreateUserID = GetSystemCurrentUser();
                Menu.IsDelete = IsDelete.No;
                result.Data = _menuRepository.Insert(Menu);
                _menuRepository.CommitTran();//提交事务
                return result;
            }
            catch (Exception ex)
            {
                _menuRepository.RollbackTran();//回滚事务
                throw ex;
            }
        }

        /// <summary>
        /// 修改菜单
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ResultModel<bool> UpdateMenu(Menu model)
        {
            var result = new ResultModel<bool>();
            try
            {
                _menuRepository.BeginTran();//开始事务
                var Menu = _menuRepository.GetById(model.MenuID);
                if (Menu != null)
                {
                    Menu.MenuCode = model.MenuCode;
                    Menu.MenuName = model.MenuName;
                    Menu.MenuUrl = model.MenuUrl;
                    Menu.MenuParentID = model.MenuParentID;
                    result.Data = _menuRepository.Update(Menu);
                    _menuRepository.CommitTran();//提交事务
                }
                return result;
            }
            catch (Exception ex)
            {
                _menuRepository.RollbackTran();//回滚事务
                throw ex;
            }
        }

        /// <summary>
        /// 删除菜单
        /// </summary>
        /// <param name="MenuID"></param>
        /// <returns></returns>
        public ResultModel<bool> DeleteMenu(Guid MenuID)
        {
            var result = new ResultModel<bool>();
            try
            {
                _menuRepository.BeginTran();//开始事务
                var Function = _menuRepository.GetById(MenuID);
                if (Function != null)
                {
                    Function.IsDelete = IsDelete.Yes; //标识符删除
                    result.Data = _menuRepository.Update(Function);
                    _menuRepository.CommitTran();//提交事务
                }
                return result;
            }
            catch (Exception ex)
            {
                _menuRepository.RollbackTran();//回滚事务
                throw ex;
            }
        }
    }
}
