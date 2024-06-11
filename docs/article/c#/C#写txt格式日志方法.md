# C#写 txt 格式日志方法

```c#
/// <summary>
/// 写Txt日志 到当前程序根目录
/// </summary>
/// <param name="strLog"></param>
public void WriteLog(string strLog)
{
    string sFilePath = Environment.CurrentDirectory + "\\" + DateTime.Now.ToString("yyyyMM");
    string sFileName = "CheckSpecialStrsLog" + DateTime.Now.ToString("dd") + ".log";
    sFileName = sFilePath + "\\" + sFileName; //文件的绝对路径
    if (!Directory.Exists(sFilePath))//验证路径是否存在
    {
        Directory.CreateDirectory(sFilePath);
        //不存在则创建
    }
    FileStream fs;
    StreamWriter sw;
    if (File.Exists(sFileName))
    //验证文件是否存在，有则追加，无则创建
    {
        fs = new FileStream(sFileName, FileMode.Append, FileAccess.Write);
    }
    else
    {
        fs = new FileStream(sFileName, FileMode.Create, FileAccess.Write);
    }
    sw = new StreamWriter(fs);
    sw.WriteLine(strLog);
    sw.Close();
    fs.Close();
}
```
