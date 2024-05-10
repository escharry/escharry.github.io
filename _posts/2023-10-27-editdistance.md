---
layout: post
title:  "Edit Distance"
date:   2023-10-27
usemathjax: true
---

<head>
  <style>
    .reveal {
      opacity: 0;
      transform: translateY(20px);
      animation: reveal 0.1s ease-out forwards;
    }

    @keyframes reveal {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script>
    $(document).ready(function() {
      $('.reveal').each(function(i) {
        $(this).css('animation-delay', i * 0.15 + 's');
      });
    });
  </script>
</head>

<body class="other reveal">
  <h1 class="reveal">Overview</h1>

  <img src="/assets/posts/editdist.png"
       alt="Minimalistic vector art of edit distance problem"
       style="float: center; width: 280px; height: 300px; display: block;
    margin-left: auto;
    margin-right: auto;"
       class="reveal"/>

  <p class="reveal">When you're typing something on your phone and you see it suggest something, chances are it's employing some form of edit distance as a metric to determine what you're trying to type. The edit distance between two strings is the minimum number of operations required to transform one string into the other. Such operations are the insertion, deletion, or replacement of a character. The edit distance problem is a classic problem in computer science and has applications in many areas, such as spell checking, DNA sequencing, and plagiarism detection.</p>

  <h1 class="reveal">Dynamic Programming Solution</h1>

  <p class="reveal">Given two strings $s$ and $t$, the goal is the find the minimum number of insert, deletion, and substitution operations required to transform $s$ into $t$. Let $s_i$ and $t_j$ be the $i$-th and $j$-th characters of $s$ and $t$, respectively. For example, for the strings 'cat' and 'mat', the edit distance is 1 because we can transform 'cat' into 'mat' by replacing 'c' with 'm'. To begin, we can define subproblems as follows: let $E(i, j)$ be the edit distance between the first $i$ characters of $s$ and the first $j$ characters of $t$. Then, we can write the following recurrence relation:</p>

  <p class="reveal">$$E(i, j) = \min \begin{cases}
  E(i, j-1) + 1 & \text{if we insert } s_i \\
  E(i-1, j) + 1 & \text{if we delete } t_j \\
  E(i-1, j-1) + diff(s_i, t_j) & \text{if we replace } s_i \text{ with } t_j
  \end{cases}$$</p>

  <p class="reveal">where $diff(s_i, t_j)$ is 0 if $s_i = t_j$ and 1 otherwise. The base cases are $E(0, j) = j$ and $E(i, 0) = i$ because we can transform the first $i$ characters of $s$ into an empty string by deleting all of them, and vice versa.</p>

  <p class="reveal">Now we need a proper ordering to compute the subproblems. We can compute the edit distance between the first $i$ characters of $s$ and the first $j$ characters of $t$ in ascending order of $i$ and $j$. This way, we can ensure that the subproblems we need to compute have already been computed. The algorithm to compute the edit distance is as follows:</p>

  <pre class="reveal"><code>
  def edit_distance(s, t):
    for i in range(0, len(s))+1):
      E[i][0] = i
    for j in range(0, len(t)+1):
      E[0][j] = j
    for i in range(1, len(s)+1):
      for j in range(1, len(t)+1):
        E[i][j] = min(E[i][j-1] + 1, E[i-1][j] + 1, E[i-1][j-1] + diff(s[i], t[j]))

    return E[len(s)][len(t)]
  </code></pre>

  <p class="reveal">This algorithm runs in $O(nm)$ time, where $n$ and $m$ are the lengths of the strings $s$ and $t$, respectively. The space complexity is also $O(nm)$ because we need to store the edit distance between all prefixes of $s$ and $t$. We can optimize the space complexity to $O(n)$ by only storing the edit distance between the current prefix of $s$ and the previous prefix of $t$.</p>
</body>
