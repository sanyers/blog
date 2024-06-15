
```c#
//注册表操作
public class GF_RegReadWrite
{
 
    /// <summary>
    /// 读取路径为keypath，键名为keyname的注册表键值，缺省返回def
    /// </summary>
    /// <param name="rootkey"></param>
    /// <param name="keypath">路径</param>
    /// <param name="keyname">键名</param>
    /// <param name="rtn">默认为null</param>
    /// <returns></returns>        
    static public bool GetRegVal(RegistryKey rootkey, string keypath, string keyname, out string rtn)
    {
        rtn = "";
        try
        {
            RegistryKey key = rootkey.OpenSubKey(keypath);
            rtn = key.GetValue(keyname).ToString();
            key.Close();
            return true;
        }
        catch
        {
            return false;
        }
    }
 
    /// <summary>
    /// 设置路径为keypath，键名为keyname的注册表键值为keyval
    /// </summary>
    /// <param name="rootkey"></param>
    /// <param name="keypath"></param>
    /// <param name="keyname"></param>
    /// <param name="keyval"></param>
    /// <returns></returns>
    static public bool SetRegVal(RegistryKey rootkey, string keypath, string keyname, string keyval)
    {
        try
        {
            RegistryKey key = rootkey.OpenSubKey(keypath, true);
            if (key == null)
                key = rootkey.CreateSubKey(keypath);
            key.SetValue(keyname, (object)keyval);
            key.Close();
            return true;
        }
        catch
        {
            return false;
        }
    }
 
    /// 创建路径为keypath的键
    private RegistryKey CreateRegKey(RegistryKey rootkey, string keypath)
    {
        try
        {
            return rootkey.CreateSubKey(keypath);
        }
        catch
        {
            return null;
        }
    }
    /// 删除路径为keypath的子项
    private bool DelRegSubKey(RegistryKey rootkey, string keypath)
    {
        try
        {
            rootkey.DeleteSubKey(keypath);
            return true;
        }
        catch
        {
            return false;
        }
    }
    /// 删除路径为keypath的子项及其附属子项
    private bool DelRegSubKeyTree(RegistryKey rootkey, string keypath)
    {
        try
        {
            rootkey.DeleteSubKeyTree(keypath);
            return true;
        }
        catch
        {
            return false;
        }
    }
    /// 删除路径为keypath下键名为keyname的键值
    private bool DelRegKeyVal(RegistryKey rootkey, string keypath, string keyname)
    {
        try
        {
            RegistryKey key = rootkey.OpenSubKey(keypath, true);
            key.DeleteValue(keyname);
            return true;
        }
        catch
        {
            return false;
        }
    }
}


/// <summary>
/// 修改服务注册表
/// </summary>
/// <param name="serviceName">服务名</param>
/// <param name="key">键</param>
/// <param name="val">值</param>
public void SetRegVal(string serviceName, string key, string val)
{
    GF_RegReadWrite.SetRegVal(RegistryKey.OpenBaseKey(RegistryHive.LocalMachine, RegistryView.Default), @"SYSTEM\CurrentControlSet\services\" + serviceName, key, val);
}

//首先要添加引用：System.ServiceProcess 
//然后导入命名空间：using System.ServiceProcess;
private void Form1_Load(object sender, EventArgs e)
{
    //获得服务集合
    var serviceControllers = ServiceController.GetServices();
    //遍历服务集合，打印服务名和服务状态
    foreach (var service in serviceControllers)
    {
        Console.WriteLine("服务名:{0}\t\t服务状态:{1}", service.ServiceName, service.Status);
    }
    //Start为启动类型
    //4为禁用服务，3为手动启动，2为自动，1为自动延迟
    //2345PicSvc为服务名
    SetRegVal("2345PicSvc", "Start", "4");
 
    //获取指定服务，若服务状态不是Runing就Start该服务
    var server = serviceControllers.FirstOrDefault(service => service.ServiceName == "2345PicSvc");
    if (server != null && server.Status != ServiceControllerStatus.Running)
    {
        //启动服务
        server.Start();
        //停止服务
        server.Stop();
    }
}
```