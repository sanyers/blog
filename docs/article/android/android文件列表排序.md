# android文件列表排序

## 1、按文件名排序

```java
/**
  * 按文件名排序
  * @param filePath
  */
public static File[] orderByName(String filePath) {
    File file = new File(filePath);
    File[] files = file.listFiles();
    List fileList = Arrays.asList(files);
    Collections.sort(fileList, (Comparator<File>) (o1, o2) -> {
        if (o1.isDirectory() && o2.isFile())
            return -1;
        if (o1.isFile() && o2.isDirectory())
            return 1;
        return o1.getName().compareTo(o2.getName());
    });
    return files;
}
```

## 2、按文件修改时间排序

```java
/**
  * 按文件修改时间排序
  * @param filePath
  */
public static File[] orderByDate(String filePath) {
    File file = new File(filePath);
    File[] files = file.listFiles();
    Arrays.sort(files, new Comparator<File>() {
        public int compare(File f1, File f2) {
            long diff = f1.lastModified() - f2.lastModified();
            if (diff > 0)
                return 1;
            else if (diff == 0)
                return 0;
            else
                return -1;// 如果 if 中修改为 返回-1 同时此处修改为返回 1 排序就会是递减
        }
        public boolean equals(Object obj) {
            return true;
        }
    });
    return files;
}
```

## 3、按文件大小排序

```java
/**
  * 按文件大小排序
  * @param filePath
  */
public static File[] orderBySize(String filePath) {
    File file = new File(filePath);
    File[] files = file.listFiles();
    List<File> fileList = Arrays.asList(files);
    Collections.sort(fileList, new Comparator<File>() {
        public int compare(File f1, File f2) {
            long s1 = getFolderSize(f1);
            long s2 = getFolderSize(f2);
            long diff = s1 - s2;
            if (diff > 0)
                return 1;
            else if (diff == 0)
                return 0;
            else
                return -1;// 如果 if 中修改为 返回-1 同时此处修改为返回 1 排序就会是递减
        }
        public boolean equals(Object obj) {
            return true;
        }
    });
    return files;
}
/**
  * 获取文件夹大小
  * @param file File实例
  * @return long
  */
public static long getFolderSize(File file) {
    long size = 0;
    try {
        java.io.File[] fileList = file.listFiles();
        for (int i = 0; i < fileList.length; i++) {
            if (fileList[i].isDirectory()) {
                size = size + getFolderSize(fileList[i]);
            } else {
                size = size + fileList[i].length();
            }
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
    return size;
}
```

## 4、参考

https://www.jb51.net/article/147787.htm