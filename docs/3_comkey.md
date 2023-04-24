---
layout: page
title: 共通鍵暗号
nav_order: 3
permalink: /docs/3_comkey/
---

# 共通鍵暗号方式

共通鍵暗号方式とは、暗号化と復号で同じ鍵を利用する暗号方式である。  
→送信者と受信者が事前に共通鍵（秘密鍵）を共有する必要がある。

<img src="../../img/com-cipher.png" />

## 共通鍵暗号の例
### シーザー暗号（脆弱）

シーザー暗号とは、平文をアルファベット順に共通鍵分ずらす暗号方式である。  
[カエサル（Caesar）](https://ja.wikipedia.org/wiki/%E3%82%AC%E3%82%A4%E3%82%A6%E3%82%B9%E3%83%BB%E3%83%A6%E3%83%AA%E3%82%A6%E3%82%B9%E3%83%BB%E3%82%AB%E3%82%A8%E3%82%B5%E3%83%AB)[^brutasu]という偉人がつかったことで有名である。

[^brutasu]: ブルータス…お前もか………

{: .warning }
> すぐに破られてしまうので、シーザ暗号は使うべきではない。

<img src="../../img/caesar.png" />

### AES: Advanced Encryption Standard

AESとは、現在最も利用される共通鍵暗号方式である。  
アメリカ国立標準技術研究所（NIST）が標準化した。

**とりあえず何か共通鍵暗号を利用したい場合は、AESを使うといい。**

## 共通鍵暗号のデモ(AES)

<br />
<br />

<iframe src="../../demo/aes.html" height="500px" width="100%" scrolling="no" frameborder="0"></iframe>

## 共通鍵暗号の特徴<iframe src="../../demo/aes.html" height="500px" width="100%" scrolling="no" frameborder="0"></iframe>

### メリット
- 高速

### デメリット

- 必要な（共通）鍵の数が多い
  - 共通鍵暗号は相手ごとに鍵を作成する必要がある  
    →n人が相互に暗号通信するのに、必要な共通鍵数はn(n-1)/2
- 漏洩せずに共通鍵を配送することは難しい（**鍵配送問題**）
  - そもそも共通鍵を安全に配送できるなら、平文も安全に配送できるはず

<img src="../../img/key-scale.png" />


