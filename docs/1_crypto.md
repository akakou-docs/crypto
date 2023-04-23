---
layout: page
title: 暗号技術の概要
nav_order: 0
permalink: /docs/1_crypto
---

## 暗号技術の概要

### 暗号技術とは？

暗号技術とは、悪い人（敵対者、脅威）がいる中でも、安全に通信・計算をするための技術である[^cryptology-iacr-1][^cryptology-iacr-2]。
- 主に数学を用いて実現される。
- 例：盗聴者（悪い人）がいる中でも、秘密が漏洩しない技術

[^cryptology-iacr-1]: [Cryptology is the science and practice of designing computation and communication systems which are secure in the presence of adversaries.](https://www.iacr.org/) 
[^cryptology-iacr-2]: 引用元では暗号技術（Cryptgraphic Technologies）ではなく、Cryptology（暗号学）について述べている。しかし筆者は暗号技術についても、暗号学に準じたものになると考えている。

### 悪い事とは？

脅威1. 盗聴
: 悪い人が、秘密の通信を覗き見して、秘密を得る

脅威2. 改ざん
: 悪い人が通信内容を変更する。

脅威3. なりすまし
: 悪い人が別の人のふりをする。

脅威4. 否認
: 悪い人が自身の送信した内容について、あとから「送っていない」という。
