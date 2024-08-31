# ffmpeg 常用错误码整理

|        错误码宏定义        |   错误码    |                                 错误说明                                  |
| :------------------------: | :---------: | :-----------------------------------------------------------------------: |
|   AVERROR_BSF_NOT_FOUND    | -1179861752 |                        Bitstream filter not found                         |
|        AVERROR_BUG         | -558323010  |                    Internal bug, also see AVERROR_BUG2                    |
|  AVERROR_BUFFER_TOO_SMALL  | -1397118274 |                             Buffer too small                              |
| AVERROR_DECODER_NOT_FOUND  | -1128613112 |                             Decoder not found                             |
| AVERROR_DEMUXER_NOT_FOUND  | -1296385272 |                             Demuxer not found                             |
|        AVERROR_EOF         | -541478725  |                                End of file                                |
|        AVERROR_EXIT        | -1414092869 | Immediate exit was requested; the called function should not be restarted |
|      AVERROR_EXTERNAL      | -542398533  |                   Generic error in an external library                    |
|  AVERROR_FILTER_NOT_FOUND  | -1279870712 |                             Filter not found                              |
|    AVERROR_INVALIDDATA     | -1094995529 |                 Invalid data found when processing input                  |
|  AVERROR_MUXER_NOT_FOUND   | -1481985528 |                              Muxer not found                              |
|  AVERROR_OPTION_NOT_FOUND  | -1414549496 |                             Option not found                              |
|    AVERROR_PATCHWELCOME    | -1163346256 |              Not yet implemented in FFmpeg, patches welcome               |
| AVERROR_PROTOCOL_NOT_FOUND | -1330794744 |                            Protocol not found                             |
|  AVERROR_STREAM_NOT_FOUND  | -1381258232 |                             Stream not found                              |
|        AVERROR_BUG2        | -541545794  |                                                                           |
|      AVERROR_UNKNOWN       | -1313558101 |                                                                           |
|    AVERROR_EXPERIMENTAL    | -733130664  |                                                                           |
|   AVERROR_INPUT_CHANGED    | -1668179713 |                                                                           |
|   AVERROR_OUTPUT_CHANGED   | -1668179714 |                                                                           |
|  AVERROR_HTTP_BAD_REQUEST  | -808465656  |                                                                           |
| AVERROR_HTTP_UNAUTHORIZED  | -825242872  |                                                                           |
|   AVERROR_HTTP_FORBIDDEN   | -858797304  |                                                                           |
|   AVERROR_HTTP_NOT_FOUND   | -875574520  |                                                                           |
|   AVERROR_HTTP_OTHER_4XX   | -1482175736 |                                                                           |
| AVERROR_HTTP_SERVER_ERROR  | -1482175992 |                                                                           |
