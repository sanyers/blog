# docker部署whisper

whipser模型支持将视频或者语音文件转为文本或字幕

[whisper](https://github.com/openai/whisper)

[whisper-asr-webservice](https://github.com/ahmetoner/whisper-asr-webservice)

```bash
sudo docker run -d -p 9000:9000 --name whisper --restart always -v /home/sanyer/whisper:/root/.cache/whisper -e ASR_MODEL=small onerahmet/openai-whisper-asr-webservice:latest
```

- -v /home/sanyer/whisper:/root/.cache/whisper 映射模型文件目录

运行之后在浏览器输入以下地址

```
http://localhost:9000/
```

- `/asr` 语音识别接口，上传语音或者视频文件，输出文字
- `/detect-language` 语言检测接口，上传语音或者视频文件，输出语言

接口参数：

- `encode` 是否编码，`true` | `false` 默认 `true`
- `task` 任务，`transcribe` 将语音识别为文字，`translate` 翻译为英文
- `language` 源文件语言（如果源文件是英文，但是参数填写为中文，识别程序就会以中文来识别，结果就是完全错的）
- `initial_prompt` 初始化提示
- `word_timestamps` 单词级别的时间戳。在输出格式为json时起作用，会输出每个单词的开始时间、结束时间、识别正确的可能性
- `output` 输出格式，`txt` 文本格式，`vtt、srt` 字幕格式，可以给视频制作字幕，`tsv` 类似于csv的一种制表符分隔的数据格式，`json` 可以输出非常详细的信息
- `audio_file` 上传文件

支持语言列表：https://github.com/openai/whisper/blob/main/whisper/tokenizer.py

参考：

https://zhuanlan.zhihu.com/p/678406937

https://zhuanlan.zhihu.com/p/595691785

https://blog.csdn.net/TechAI/article/details/136903249