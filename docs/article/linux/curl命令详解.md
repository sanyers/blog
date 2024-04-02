# curl 命令详解

语法：`curl [option] [url]`

## 1、常见参数

```bash
-A/--user-agent <string>              设置用户代理发送给服务器
-b/--cookie <name=string/file>    cookie字符串或文件读取位置
-c/--cookie-jar <file>                    操作结束后把cookie写入到这个文件中
-C/--continue-at <offset>            断点续转
-D/--dump-header <file>              把header信息写入到该文件中
-e/--referer                                  来源网址
-f/--fail                                          连接失败时不显示http错误
-o/--output                                  把输出写到该文件中
-O/--remote-name                      把输出写到该文件中，保留远程文件的文件名
-r/--range <range>                      检索来自HTTP/1.1或FTP服务器字节范围
-s/--silent                                    静音模式。不输出任何东西
-T/--upload-file <file>                  上传文件
-u/--user <user[:password]>      设置服务器的用户和密码
-w/--write-out [format]                什么输出完成后
-x/--proxy <host[:port]>              在给定的端口上使用HTTP代理
-#/--progress-bar                        进度条显示当前的传送状态
```

## 2、常见用法

```bash
# 访问网页
curl https://sanyer.top

# 保存为html文件
curl https://sanyer.top >> sanyer.html

# 测试网页返回值
curl -o /dev/null -s -w %{http_code} sanyer.top

# 下载网页
curl -o sanyer.html https://sanyer.top

# 下载文件
curl -o test.jpg http:www.linux.com/test.jpg

# 保存网页中的文件（url要具体到某个文件）
curl -O https://sanyer.top/hello.sh

# 循环下载，这样就会把test1，test2，test3 全部保存下来
curl -O https://sanyer.top/test[1-3].jpg

# 下载重命名
curl -O https://sanyer.top/{hello,world}/test[1-3].jpg
curl -o #1_#2.JPG https://sanyer.top/{hello,world}/test[1-3].jpg

# 分块下载
curl -r 0-100 -o dodo1_part1.JPG http://www.linux.com/dodo1.JPG
curl -r 100-200 -o dodo1_part2.JPG http://www.linux.com/dodo1.JPG
curl -r 200- -o dodo1_part3.JPG http://www.linux.com/dodo1.JPG
cat dodo1_part* > dodo1.JPG

# 通过ftp下载文件
curl -O -u 用户名:密码 ftp://www.linux.com/dodo1.JPG
curl -O ftp://用户名:密码@www.linux.com/dodo1.JPG

# 显示下载进度条
curl -# -O http://www.linux.com/dodo1.JPG

# 不会显示下载进度信息
curl -s -O http://www.linux.com/dodo1.JPG

# 断点续传
curl -C -O http://www.linux.com/dodo1.JPG

# 上传文件
curl -T dodo1.JPG -u 用户名:密码 ftp://www.linux.com/img/

# 指定 proxy 服务器以及其端口
curl -x 192.168.100.100:1080 https://www.google.com

# 保存 cookie 信息
curl -c cookie.txt https://sanyer.top

# 保存 header 信息
curl -D header.txt https://sanyer.top

# 设置 cookie 访问网站
curl -b cookie.txt https://sanyer.top

# 设置设置用户代理访问网站
curl -A "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.0)" https://sanyer.top

# 伪造 referer
curl -e "sanyer.top" https://web.sanyer.top


```

## 3、显示抓取错误

```bash
curl -f https://web.sanyer.top
```

-w 指定输出内容

<table>
<thead>
<tr>
<th>参数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>url_effective</td>
<td>最终获取的url地址，尤其是当你指定给curl的地址存在301跳转，且通过-L继续追踪的情形。</td>
</tr>
<tr>
<td>http_code</td>
<td>http状态码，如200成功,301转向,404未找到,500服务器错误等。(The numerical response code that was found in the last retrieved HTTP(S) or FTP(s) transfer. In 7.18.2 the alias response_code was added to show the same info.)</td>
</tr>
<tr>
<td>http_connect</td>
<td>The numerical code that was found in the last response (from a proxy) to a curl CONNECT request. (Added in 7.12.4)</td>
</tr>
<tr>
<td>time_total</td>
<td>总时间，按秒计。精确到小数点后三位。 （The total time, in seconds, that the full operation lasted. The time will be displayed with millisecond resolution.）</td>
</tr>
<tr>
<td>time_namelookup</td>
<td>DNS解析时间,从请求开始到DNS解析完毕所用时间。(The time, in seconds, it took from the start until the name resolving was completed.)</td>
</tr>
<tr>
<td>time_connect</td>
<td>连接时间,从开始到建立TCP连接完成所用时间,包括前边DNS解析时间，如果需要单纯的得到连接时间，用这个time_connect时间减去前边time_namelookup时间。以下同理，不再赘述。(The time, in seconds, it took from the start until the TCP connect to the remote host (or proxy) was completed.)</td>
</tr>
<tr>
<td>time_appconnect</td>
<td>连接建立完成时间，如SSL/SSH等建立连接或者完成三次握手时间。(The time, in seconds, it took from the start until the SSL/SSH/etc connect/handshake to the remote host was completed. (Added in 7.19.0))</td>
</tr>
<tr>
<td>time_pretransfer</td>
<td>从开始到准备传输的时间。(The time, in seconds, it took from the start until the file transfer was just about to begin. This includes all pre-transfer commands and negotiations that are specific to the particular protocol(s) involved.)</td>
</tr>
<tr>
<td>time_redirect</td>
<td>重定向时间，包括到最后一次传输前的几次重定向的DNS解析，连接，预传输，传输时间。(The time, in seconds, it took for all redirection steps include name lookup, connect, pretransfer and transfer before the final transaction was started. time_redirect shows the complete execution time for multiple redirections. (Added in 7.12.3))</td>
</tr>
<tr>
<td>time_starttransfer</td>
<td>开始传输时间。在发出请求之后，Web 服务器返回数据的第一个字节所用的时间(The time, in seconds, it took from the start until the first byte was just about to be transferred. This includes time_pretransfer and also the time the server needed to calculate the result.)</td>
</tr>
<tr>
<td>size_download</td>
<td>下载大小。(The total amount of bytes that were downloaded.)</td>
</tr>
<tr>
<td>size_upload</td>
<td>上传大小。(The total amount of bytes that were uploaded.)</td>
</tr>
<tr>
<td>size_header</td>
<td>下载的header的大小(The total amount of bytes of the downloaded headers.)</td>
</tr>
<tr>
<td>size_request</td>
<td>请求的大小。(The total amount of bytes that were sent in the HTTP request.)</td>
</tr>
<tr>
<td>speed_download</td>
<td>下载速度，单位-字节每秒。(The average download speed that curl measured for the complete download. Bytes per second.)</td>
</tr>
<tr>
<td>speed_upload</td>
<td>上传速度,单位-字节每秒。(The average upload speed that curl measured for the complete upload. Bytes per second.)</td>
</tr>
<tr>
<td>content_type</td>
<td>就是content-Type，不用多说了，这是一个访问我博客首页返回的结果示例(text/html; charset=UTF-8)；(The Content-Type of the requested document, if there was any.)</td>
</tr>
<tr>
<td>num_connects</td>
<td>Number of new connects made in the recent transfer. (Added in 7.12.3)</td>
</tr>
<tr>
<td>num_redirects</td>
<td>Number of redirects that were followed in the request. (Added in 7.12.3)</td>
</tr>
<tr>
<td>redirect_url</td>
<td>When a HTTP request was made without -L to follow redirects, this variable will show the actual URL a redirect would take you to. (Added in 7.18.2)</td>
</tr>
<tr>
<td>ftp_entry_path</td>
<td>The initial path libcurl ended up in when logging on to the remote FTP server. (Added in 7.15.4)</td>
</tr>
<tr>
<td>ssl_verify_result</td>
<td>ssl认证结果，返回0表示认证成功。( The result of the SSL peer certificate verification that was requested. 0 means the verification was successful. (Added in 7.19.0))</td>
</tr>
</tbody>
</table>

## 4、其他参数

<table>
<thead>
<tr>
<th>参数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>-a/--append</td>
<td>上传文件时，附加到目标文件</td>
</tr>
<tr>
<td>--anyauth</td>
<td>可以使用“任何”身份验证方法</td>
</tr>
<tr>
<td>--basic</td>
<td>使用HTTP基本验证</td>
</tr>
<tr>
<td>-B/--use-ascii</td>
<td>使用ASCII文本传输</td>
</tr>
<tr>
<td>-d/--data &lt;data&gt;</td>
<td>HTTP POST方式传送数据</td>
</tr>
<tr>
<td>--data-ascii &lt;data&gt;</td>
<td>以ascii的方式post数据</td>
</tr>
<tr>
<td>--data-binary &lt;data&gt;</td>
<td>以二进制的方式post数据</td>
</tr>
<tr>
<td>--negotiate</td>
<td>使用HTTP身份验证</td>
</tr>
<tr>
<td>--digest</td>
<td>使用数字身份验证</td>
</tr>
<tr>
<td>--disable-eprt</td>
<td>禁止使用EPRT或LPRT</td>
</tr>
<tr>
<td>--disable-epsv</td>
<td>禁止使用EPSV</td>
</tr>
<tr>
<td>--egd-file &lt;file&gt;</td>
<td>为随机数据(SSL)设置EGD socket路径</td>
</tr>
<tr>
<td>--tcp-nodelay</td>
<td>使用TCP_NODELAY选项</td>
</tr>
<tr>
<td>-E/--cert &lt;cert[:passwd]&gt;</td>
<td>客户端证书文件和密码 (SSL)</td>
</tr>
<tr>
<td>--cert-type &lt;type&gt;</td>
<td>证书文件类型 (DER/PEM/ENG) (SSL)</td>
</tr>
<tr>
<td>--key &lt;key&gt;</td>
<td>私钥文件名 (SSL)</td>
</tr>
<tr>
<td>--key-type &lt;type&gt;</td>
<td>私钥文件类型 (DER/PEM/ENG) (SSL)</td>
</tr>
<tr>
<td>--pass  &lt;pass&gt;</td>
<td>私钥密码 (SSL)</td>
</tr>
<tr>
<td>--engine &lt;eng&gt;</td>
<td>加密引擎使用 (SSL). "--engine list" for list</td>
</tr>
<tr>
<td>--cacert &lt;file&gt;</td>
<td>CA证书 (SSL)</td>
</tr>
<tr>
<td>--capath &lt;directory&gt;</td>
<td>CA目   (made using c_rehash) to verify peer against (SSL)</td>
</tr>
<tr>
<td>--ciphers &lt;list&gt;</td>
<td>SSL密码</td>
</tr>
<tr>
<td>--compressed</td>
<td>要求返回是压缩的形势 (using deflate or gzip)</td>
</tr>
<tr>
<td>--connect-timeout &lt;seconds&gt;</td>
<td>设置最大请求时间</td>
</tr>
<tr>
<td>--create-dirs</td>
<td>建立本地目录的目录层次结构</td>
</tr>
<tr>
<td>--crlf</td>
<td>上传是把LF转变成CRLF</td>
</tr>
<tr>
<td>--ftp-create-dirs</td>
<td>如果远程目录不存在，创建远程目录</td>
</tr>
<tr>
<td>--ftp-method [multicwd/nocwd/singlecwd]</td>
<td>控制CWD的使用</td>
</tr>
<tr>
<td>--ftp-pasv</td>
<td>使用 PASV/EPSV 代替端口</td>
</tr>
<tr>
<td>--ftp-skip-pasv-ip</td>
<td>使用PASV的时候,忽略该IP地址</td>
</tr>
<tr>
<td>--ftp-ssl</td>
<td>尝试用 SSL/TLS 来进行ftp数据传输</td>
</tr>
<tr>
<td>--ftp-ssl-reqd</td>
<td>要求用 SSL/TLS 来进行ftp数据传输</td>
</tr>
<tr>
<td>-F/--form &lt;name=content&gt;</td>
<td>模拟http表单提交数据</td>
</tr>
<tr>
<td>-form-string &lt;name=string&gt;</td>
<td>模拟http表单提交数据</td>
</tr>
<tr>
<td>-g/--globoff</td>
<td>禁用网址序列和范围使用{}和[]</td>
</tr>
<tr>
<td>-G/--get</td>
<td>以get的方式来发送数据</td>
</tr>
<tr>
<td>-h/--help</td>
<td>帮助</td>
</tr>
<tr>
<td>-H/--header &lt;line&gt;</td>
<td>自定义头信息传递给服务器</td>
</tr>
<tr>
<td>--ignore-content-length</td>
<td>忽略的HTTP头信息的长度</td>
</tr>
<tr>
<td>-i/--include</td>
<td>输出时包括protocol头信息</td>
</tr>
<tr>
<td>-I/--head</td>
<td>只显示文档信息</td>
</tr>
<tr>
<td>-j/--junk-session-cookies</td>
<td>读取文件时忽略session cookie</td>
</tr>
<tr>
<td>--interface &lt;interface&gt;</td>
<td>使用指定网络接口/地址</td>
</tr>
<tr>
<td>--krb4 &lt;level&gt;</td>
<td>使用指定安全级别的krb4</td>
</tr>
<tr>
<td>-k/--insecure</td>
<td>允许不使用证书到SSL站点</td>
</tr>
<tr>
<td>-K/--config</td>
<td>指定的配置文件读取</td>
</tr>
<tr>
<td>-l/--list-only</td>
<td>列出ftp目录下的文件名称</td>
</tr>
<tr>
<td>--limit-rate &lt;rate&gt;</td>
<td>设置传输速度</td>
</tr>
<tr>
<td>--local-port&lt;NUM&gt;</td>
<td>强制使用本地端口号</td>
</tr>
<tr>
<td>-m/--max-time &lt;seconds&gt;</td>
<td>设置最大传输时间</td>
</tr>
<tr>
<td>--max-redirs &lt;num&gt;</td>
<td>设置最大读取的目录数</td>
</tr>
<tr>
<td>--max-filesize &lt;bytes&gt;</td>
<td>设置最大下载的文件总量</td>
</tr>
<tr>
<td>-M/--manual</td>
<td>显示全手动</td>
</tr>
<tr>
<td>-n/--netrc</td>
<td>从netrc文件中读取用户名和密码</td>
</tr>
<tr>
<td>--netrc-optional</td>
<td>使用 .netrc 或者 URL来覆盖-n</td>
</tr>
<tr>
<td>--ntlm</td>
<td>使用 HTTP NTLM 身份验证</td>
</tr>
<tr>
<td>-N/--no-buffer</td>
<td>禁用缓冲输出</td>
</tr>
<tr>
<td>-p/--proxytunnel</td>
<td>使用HTTP代理</td>
</tr>
<tr>
<td>--proxy-anyauth</td>
<td>选择任一代理身份验证方法</td>
</tr>
<tr>
<td>--proxy-basic</td>
<td>在代理上使用基本身份验证</td>
</tr>
<tr>
<td>--proxy-digest</td>
<td>在代理上使用数字身份验证</td>
</tr>
<tr>
<td>--proxy-ntlm</td>
<td>在代理上使用ntlm身份验证</td>
</tr>
<tr>
<td>-P/--ftp-port &lt;address&gt;</td>
<td>使用端口地址，而不是使用PASV</td>
</tr>
<tr>
<td>-Q/--quote &lt;cmd&gt;</td>
<td>文件传输前，发送命令到服务器</td>
</tr>
<tr>
<td>--range-file</td>
<td>读取（SSL）的随机文件</td>
</tr>
<tr>
<td>-R/--remote-time</td>
<td>在本地生成文件时，保留远程文件时间</td>
</tr>
<tr>
<td>--retry &lt;num&gt;</td>
<td>传输出现问题时，重试的次数</td>
</tr>
<tr>
<td>--retry-delay &lt;seconds&gt;</td>
<td>传输出现问题时，设置重试间隔时间</td>
</tr>
<tr>
<td>--retry-max-time &lt;seconds&gt;</td>
<td>传输出现问题时，设置最大重试时间</td>
</tr>
<tr>
<td>-S/--show-error</td>
<td>显示错误</td>
</tr>
<tr>
<td>--socks4 &lt;host[:port]&gt;</td>
<td>用socks4代理给定主机和端口</td>
</tr>
<tr>
<td>--socks5 &lt;host[:port]&gt;</td>
<td>用socks5代理给定主机和端口</td>
</tr>
<tr>
<td>-t/--telnet-option &lt;OPT=val&gt;</td>
<td>Telnet选项设置</td>
</tr>
<tr>
<td>--trace &lt;file&gt;</td>
<td>对指定文件进行debug</td>
</tr>
<tr>
<td>--trace-ascii &lt;file&gt;</td>
<td>Like --跟踪但没有hex输出</td>
</tr>
<tr>
<td>--trace-time</td>
<td>跟踪/详细输出时，添加时间戳</td>
</tr>
<tr>
<td>--url &lt;URL&gt;</td>
<td>Spet URL to work with</td>
</tr>
<tr>
<td>-U/--proxy-user &lt;user[:password]&gt;</td>
<td>设置代理用户名和密码</td>
</tr>
<tr>
<td>-V/--version</td>
<td>显示版本信息</td>
</tr>
<tr>
<td>-X/--request &lt;command&gt;</td>
<td>指定什么命令</td>
</tr>
<tr>
<td>-y/--speed-time</td>
<td>放弃限速所要的时间。默认为30</td>
</tr>
<tr>
<td>-Y/--speed-limit</td>
<td>停止传输速度的限制，速度时间'秒</td>
</tr>
<tr>
<td>-z/--time-cond</td>
<td>传送时间设置</td>
</tr>
<tr>
<td>-0/--http1.0</td>
<td>使用HTTP 1.0</td>
</tr>
<tr>
<td>-1/--tlsv1</td>
<td>使用TLSv1（SSL）</td>
</tr>
<tr>
<td>-2/--sslv2</td>
<td>使用SSLv2的（SSL）</td>
</tr>
<tr>
<td>-3/--sslv3</td>
<td>使用的SSLv3（SSL）</td>
</tr>
<tr>
<td>--3p-quote</td>
<td>like -Q for the source URL for 3rd party transfer</td>
</tr>
<tr>
<td>--3p-url</td>
<td>使用url，进行第三方传送</td>
</tr>
<tr>
<td>--3p-user</td>
<td>使用用户名和密码，进行第三方传送</td>
</tr>
<tr>
<td>-4/--ipv4</td>
<td>使用IP4</td>
</tr>
<tr>
<td>-6/--ipv6</td>
<td>使用IP6</td>
</tr>
</tbody>
</table>
