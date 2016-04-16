# Gandi Domain autoupdate record

使用gandi-DOMAIN-autoupdate-record之後，你只需建立DNS設定檔，就可以直接幫你更新到Gandi DNS Server，並直接套用至最新版本。

## 環境設定

本專案使用ES6撰寫，執行前需安裝babel-core, eslint與npm相關套件

```
    npm install
```

## 建立設定檔

要使用gandi-autoupdate-record前，必須先建立兩個設定檔。

`domain_info.json`中，需要你的apikey與zone名稱。
```
{
    "apikey":"你的gandi API key",
    "zone":"你要設定的zone名稱"
}
```

`target_record.txt`裡，直接放入你要的ZoneRecord設定。
```
@ 10800 IN A 217.70.184.38
blog 10800 IN CNAME blogs.vip.gandi.net.
imap 10800 IN CNAME access.mail.gandi.net.
pop 10800 IN CNAME access.mail.gandi.net.
smtp 10800 IN CNAME relay.mail.gandi.net.
webmail 10800 IN CNAME webmail.gandi.net.
www 10800 IN CNAME webredir.vip.gandi.net.
@ 10800 IN MX 50 fb.mail.gandi.net.
@ 10800 IN MX 10 spool.mail.gandi.net.
```

## 如何執行

```
    node main.js
```