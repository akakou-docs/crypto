---
layout: page
title: 暗号（共通鍵・公開鍵）
nav_order: 2
permalink: /docs/2_cipher/
---

# 暗号（共通鍵・公開鍵）
## 暗号とは？

暗号は、特定の人物に平文（秘密）するための技術  
→第三者が見ても、特別な知識なしでは読めないように変換する

<img src="../../img/cipher.png" />

### 必要な用語

平文
: 特定の人物に伝えたいが、その他にはバレたくない秘密

暗号文
: 暗号化された平文

鍵
: 暗号化または復号に用いる情報

暗号化
: 暗号文と鍵を用いて、暗号文を作りだす操作

復号
: 暗号文と鍵を用いて、平文を取り出す操作

### 暗号の種類

暗号には大まかに分けて二種類ある。

- **共通鍵暗号方式:** 暗号化と復号で **同じ** 鍵を使う暗号方式
- **公開鍵暗号方式:** 暗号化と復号で **別の鍵** を使う暗号方式

## 共通鍵暗号方式

共通鍵暗号方式とは、暗号化と復号で同じ鍵を利用する暗号方式である。  
→送信者と受信者が事前に共通鍵（秘密鍵）を共有する必要がある。

<img src="../../img/com-cipher.png" />

### 共通鍵暗号の例
#### シーザー暗号（脆弱）

シーザー暗号とは、平文をアルファベット順に共通鍵分ずらす暗号方式である。  
[カエサル（Caesar）](https://ja.wikipedia.org/wiki/%E3%82%AC%E3%82%A4%E3%82%A6%E3%82%B9%E3%83%BB%E3%83%A6%E3%83%AA%E3%82%A6%E3%82%B9%E3%83%BB%E3%82%AB%E3%82%A8%E3%82%B5%E3%83%AB)[^brutasu]という偉人がつかったことで有名である。

[^brutasu]: ブルータス…お前もか………

{: .warning }
> すぐに破られてしまうので、シーザ暗号は使うべきではない。

<img src="../../img/caesar.png" />

#### AES: Advanced Encryption Standard

AESとは、現在最も利用される共通鍵暗号方式である。  
アメリカ国立標準技術研究所（NIST）が標準化した。

**とりあえず何か共通鍵暗号を利用したい場合は、AESを使うといい。**

##### AESのデモ

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>

<label for="com-cipher-input">Input</label>
<input id="com-cipher-input"></input>
<br />

<label for="com-cipher-key">Key</label>
<input id="com-cipher-key" name="com-cipher-key"></input>
<br />

<button onclick="enc_com()">暗号化</button>
<button onclick="dec_com()">復号</button>

<br />

<label for="com-cipher-output">Result</label>
<input id="com-cipher-output" name="com-cipher-output"></input>

<script>
  const comCipherKey = document.getElementById('com-cipher-key')
  const comCipherInput = document.getElementById('com-cipher-input')
  const comCipherOutput = document.getElementById('com-cipher-output')
  
  const enc_com = () => {
    const result = CryptoJS.AES.encrypt(comCipherInput.value, comCipherKey.value).toString();
    comCipherOutput.value = result;
  }

  const dec_com = () => {
    const result = CryptoJS.AES.decrypt(comCipherInput.value, comCipherKey.value).toString(CryptoJS.enc.Utf8);
    comCipherOutput.value = result;
  }
</script>


