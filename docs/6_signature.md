---
layout: page
title: ディジタル署名方式
nav_order: 6
permalink: /docs/6_signature/
---

# ディジタル署名方式

ディジタル署名方式とは、署名の署名対象が署名者によって送られたか保証する暗号技術である。  
例：合意した契約書（署名対象）がアリス（署名者）から送られてきたものか保証する。  

要はリアル世界で言う「はんこ」のような技術である。  

<img src="../../img/signature.png" height="500px" />

ディジタル署名方式では、秘密鍵から署名対象に対する署名を生成し、公開鍵を用いてその署名を検証する。

<img src="../../img/signature2.png" height="500px" />


## セキュリティ要件

ディジタル署名方式は、情報の完全性、真正性、否認防止を担保する。

**要件1. 完全性**
署名対象が改ざんされた場合、署名は検証を通らない。

**要件2. 真正性**
署名者以外は、署名者の有効な署名を生成できない。

**要件3 否認防止**
署名者が自身の署名を否認しても、嘘をついたことがわかる。  
→ 署名を作ったのは、必ず有効な秘密鍵を持つ署名者なので、必ず署名対象を確認したと言える。


## ディジタル署名の例

- RSA署名
  - 素因数分解の困難性を仮定するディジタル署名方式
  - RSA暗号がベースとなっている
- ECDSA署名
  - 離散対数問題が解けないことを仮定するディジタル署名方式
  - ElGamal暗号がベースとなっている
- Schnorr署名
  - 離散対数問題が解けないことを仮定するディジタル署名方式

## RSA署名の仕組み

RSA署名では、RSA暗号を応用することで、ディジタル署名を実現する。  
特にRSA暗号の「平文を暗号化するには、正しい公開鍵が必要」性質を用いる。

つまりこの「署名の秘密鍵」を「RSAの公開鍵」に、
「署名の公開鍵」を「RSAの秘密鍵」にして、
次のような署名操作と検証操作を実現できる
（実際は正しくない[^rsa]）。

署名操作
: 署名の秘密鍵（RSA暗号の公開鍵）で、署名対象を暗号化すること

署名検証
: 署名の公開鍵（RSA暗号の秘密鍵）で暗号を復号し、平文が署名対象か確認すること

<img src="../../img/rsa_signature.png" height="800px" />



{: .warning }
> なお上記の話はあくまでコンセプトのみの話である。
> 実際の署名はもっといろいろやっているため、それらを理解してから、実装等はするべきである。[^rsa]
> 「署名は純粋にRSA暗号の逆」とかツイートすると、Twitterで怖いオタクに叩かれるので注意するべし。


## ディジタル署名の限界と解決する技術

- 署名対象が大きいと署名・検証の速度が重くなる。  
  **→[ハッシュ関数](../7_hash)で解決**
- 公開鍵が誰の物かきちんとわかって、改ざんがされていないことが保証できるのか？**（鍵配送問題）**  
  **→[PKI](../8_pki)で解決**


## ディジタル署名のデモ（RSA）


### 1. 鍵ペアの生成

<iframe src="../../demo/rsa_signature_keygen.html" height="300px" width="100%" scrolling="no" frameborder="0"></iframe>

### 2. 署名

<iframe src="../../demo/rsa_sign.html" height="350px" width="100%" scrolling="no" frameborder="0"></iframe>

### 3. 検証

<iframe src="../../demo/rsa_verify.html" height="500px" width="100%" scrolling="no" frameborder="0"></iframe>

[^rsa]: 厳密にいうと、「署名の秘密鍵」を「RSAの秘密鍵」に、「署名の公開鍵」を「RSAの公開鍵」にして行う（上記の説明と逆）。 これは、RSAの「秘密鍵で暗号化→公開鍵で復号」できる性質によるものである。 なお、最初の説明ような実装の場合、RSAの秘密鍵はRSAの公開鍵に比べて極めて小さい場合が多く、とても危険である。