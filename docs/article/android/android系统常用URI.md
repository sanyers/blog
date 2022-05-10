# android系统常用URI

## 1、多媒体

| 名称 | URI常量名 |
| :----: | :----: |
| 音频 | sd 卡 `MediaStore.Audio.Media.EXTERNAL_CONTENT_URI`，<br/>内部存储器 `MediaStore.Audio.Media.INTERNAL_CONTENT_URI` |
| 视频 | sd 卡 `MediaStore.Video.Media.EXTERNAL_CONTENT_URI`，<br/>内部存储器 `MediaStore.Video.Media.INTERNAL_CONTENT_URI` |
| 图片 | sd 卡 `MediaStore.Images.Media.EXTERNAL_CONTENT_URI`，<br/>内部存储器 `MediaStore.Images.Media.INTERNAL_CONTENT_URI` |

## 2、联系人

| 名称 | URI常量名 |
| :----: | :----: |
| 联系人 | `ContactsContract.Contacts.CONTENT_URI` |
| 联系人电话 | `ContactsContract.CommonDataKinds.Phone.CONTENT_URI` |
| 联系人邮箱 | `ContactsContract.CommonDataKinds.Email.CONTENT_URI` |
| 通话记录 | `CallLog.Calls.CONTENT_URI` |

## 3、短信

| 名称 | URI常量名 |
| :----: | :----: |
| 短信 | `Telephony.Sms.CONTENT_URI` |
| 彩信 | `Telephony.Mms.CONTENT_URI` |
| 收件箱 | `Telephony.Sms.Inbox.CONTENT_URI` |
| 已发送 | `Telephony.Sms.Sent.CONTENT_URI` |
| 草稿箱 | `Telephony.Sms.Draft.CONTENT_URI` |
| 发件箱 | `Telephony.Sms.Outbox.CONTENT_URI` |