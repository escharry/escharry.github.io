---
layout: post
title:  "Longest Path in a DAG"
date:   2024-04-27
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

  <img src="/assets/posts/longestDAG.png" alt="Minimalistic vector art of longest path in a DAG problem" style="float: center; width: 200px; height: 200px; display: block; margin-left: auto; margin-right: auto;" class="reveal"/>

  <p class="reveal">Finding the longest path in a Directed Acyclic Graph (DAG) is a classic problem in computer science. The problem is interesting because it can be solved in linear time, which is not the case for general graphs.</p>

  <p class="reveal">A directed acyclic graph is a directed graph with no cycles. This means that there is no way to start at a node and follow a sequence of edges to return to the same node. Finding the longest path in this kind of graph can find applications in many areas, such as project management, scheduling, and network routing.</p>

  <h1 class="reveal">Recursive Solution</h1>

  <p class="reveal">To begin, it may be intuitive to go over a recursive solution to the problem. For any vertex $v$, let $L(v)$ be the length of the longest path ending at $v$. Then, we can write the following: length of longest path in a DAG G $= \max_{v \in V} L(v)$. Then, suppose the longest path came in from some vertex $w$. Then, $\forall v \in V$, we can write the following recursive formula: $L(v) = \max_{(w,v) \in E} L(w) + 1$ or $L(v) = 0$ if $v$ has no incoming edges. So, we can write a recursive function to calculate the length of the longest path ending at a vertex $v$ as follows:</p>

<pre class="reveal"><code>
  def longest_path_ending_at(v):
      if no incoming edges to v:
          return 0
      else:
          current = 0
          for each w -> v edge:
              if current < L(w) + 1:
                  current = L(w) + 1
      return current

</code></pre>

  <p class="reveal">And this terminates because we're in a DAG. However, this is not efficient because we're recalculating the length of the longest path ending at each vertex multiple times. We can use store values of $L(v)$ as they are computed and if we see them again, we can just return the stored value.</p>

  <h1 class="reveal">Non-Recursive Implementation</h1>

  <p class="reveal">As for a non-recursive solution, we can observe a neat pattern in the order in which we can compute the lengths of the longest paths. We note that the subproblems (recursive calls) in this problem have a certain dependency structure. That is, $L(i)$ depends on $L(j)$ for $j < i$. So we can compute the lengths of the longest paths in ascending order of the vertices. This coincides with a topological sort of the graph:</p>

<pre class="reveal"><code>
  def longest_path(G):
      # topological sort of G
      top_order = topological_sort(G)

      # Let i be the i-th vertex in top_order
      for i in range(1, len(top_order)):
          for each edge (j, i) in G:
              L(i) = max(L(i), L(j) + 1)
          for j in range(1, i):
              if (j -> i) in E and L(i) < L(j) + 1:
                  L(i) = L(j) + 1

</code></pre>

  <p class="reveal">This algorithm runs in $\theta(|V|+|E|) + \theta(|V|^2)$, but the second term can be reduced to $\theta(|E|)$ if we use an adjacency list representation of the graph, so it is overall linear time.</p>

  <h1 class="reveal">Special Case: Longest Increasing Subsequence</h1>

  <p class="reveal">In the longest increasing subsequence problem, we are given a sequence $a$ of numbers and we want to find the longest subsequence of the sequence that is strictly increasing. This problem can be solved using the longest path in a DAG problem. We can construct a DAG where the vertices are the elements of the sequence and there is an edge from $i$ to $j$ if $i < j$ and $a_i < a_j$. Then, the longest path in this DAG is the longest increasing subsequence of the sequence. So we can use the same algorithm as above to solve this problem in linear time!</p>
