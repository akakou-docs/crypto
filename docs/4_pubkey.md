---
layout: page
title: 暗号技術の概要
nav_order: 4
permalink: /docs/4_pubkey
---

<script>
    MathJax = {
      tex: {
        inlineMath: [['$','$'], ['\\(','\\)']],
        processEscapes: true,
        tags: "ams",
        autoload: {
          color: [],
          colorV2: ['color']
        },
        packages: {'[+]': ['noerrors']}
      },
      chtml: {
        matchFontHeight: false,
        displayAlign: "left",
        displayIndent: "2em"
      },
      options: {
        renderActions: {
          /* add a new named action to render <script type="math/tex"> */
          find_script_mathtex: [10, function (doc) {
            for (const node of document.querySelectorAll('script[type^="math/tex"]')) {
              const display = !!node.type.match(/; *mode=display/);
              const math = new doc.options.MathItem(node.textContent, doc.inputJax[0], display);
              const text = document.createTextNode('');
              node.parentNode.replaceChild(text, node);
              math.start = {node: text, delim: '', n: 0};
              math.end = {node: text, delim: '', n: 0};
              doc.math.push(math);
            }
          }, '']
        }
      },
      loader: {
        load: ['[tex]/noerrors']
      }
    };
</script>
<script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js" id="MathJax-script"></script>


# 公開鍵暗号

共通鍵暗号の課題を解決するため、公開鍵暗号が提案された。  
公開鍵暗号とは、暗号化と復号で違う鍵を用いる暗号である。

なお公開鍵暗号にて、暗号化に用いる鍵を**公開鍵**、
復号に用いる鍵を**秘密鍵**と呼び、
これらのペアを**鍵ペア**と呼ぶ。

<img src="../../img/pubkey1.png" height="500px" />

実際のプロトコル

<img src="../../img/pubkey2.png" />

### 公開鍵暗号の例

RSA暗号
- 素因数分解の困難性を安全性の根拠とした公開鍵暗号
  - 素因数分解の困難性： $n$ から $p$ と $q$ を現実的な時間で計算できない[^mitukattenai]。
    - $p, q$: 大きな素数 
    - $n = p \cdot q$

ElGamal暗号
- 離散対数問題が解けないことを仮定した公開鍵暗号
  - 離散対数問題： $y, g, p$ から $x$ を現実的な時間で計算できない[^mitukattenai]。
    - $p$:  大きな素数
    - $g, p, x$: $p$ 未満の数
    - $y = g^x \mod p$ [^risantaisu]

[^mitukattenai]: 現実的な時間で計算できる計算方法が見つかっていない。
[^risantaisu]: $g$ を $x$上して、 $p$ のあまりをとった数
