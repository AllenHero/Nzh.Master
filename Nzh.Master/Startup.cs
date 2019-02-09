using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.PlatformAbstractions;
using Nzh.Master.IRepository;
using Nzh.Master.IService;
using Nzh.Master.Repository;
using Nzh.Master.Repository.Factory;
using Nzh.Master.Service;
using Nzh.Master.SwaggerHelp;
using Swashbuckle.AspNetCore.Swagger;

namespace Nzh.Master
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            //注入服务、仓储类
            //services.AddTransient<IDemoRepository, DemoRepository>();
            //services.AddTransient<IDemoService, DemoService>();

            //services.AddTransient<ITestRepository, TestRepository>();
            //services.AddTransient<ITestService, TestService>();

            services.AddRepositories();

            #region Swagger

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1.1.0",
                    Title = "Nzh.Master WebAPI",
                    Description = ".NetCore WebAPI框架",
                    TermsOfService = "None",
                    Contact = new Swashbuckle.AspNetCore.Swagger.Contact { Name = "Nzh.Master", Email = "", Url = "" }
                });
                //添加注释服务
                var basePath = PlatformServices.Default.Application.ApplicationBasePath;
                var xmlPath = Path.Combine(basePath, "Nzh.Master.xml");
                var modelPath = Path.Combine(basePath, "Nzh.Master.Common.xml");
                var comonPath = Path.Combine(basePath, "Nzh.Master.Model.xml");
                c.IgnoreObsoleteActions();
                c.DocInclusionPredicate((docName, description) => true);
                c.DescribeAllEnumsAsStrings();
                c.IncludeXmlComments(xmlPath);
                c.IncludeXmlComments(modelPath);
                c.IncludeXmlComments(comonPath);
                //添加对控制器的标签(描述)
                c.DocumentFilter<SwaggerDocTag>();
            });

            #endregion
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();

            //允许跨域访问
            app.UseCors(builder =>
               builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod());

            // 使中间件能够将生成的swagger作为json端点
            app.UseSwagger();

            //启用中间件服务swagger-ui，指定json端点
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "DemoAPI V1");
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                name: "default",
                template: "{controller=Demo}/{id?}");

            });
        }
    }
}
