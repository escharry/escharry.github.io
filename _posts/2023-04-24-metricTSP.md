---
layout: post
title:  "Metric TSP"
date:   2023-04-24
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

  <img src="/assets/posts/tsp.png" alt="Minimalistic vector art of Knapsack problem with fruit" style="float: center; width: 180px; height: 200px; display: block; margin-left: auto; margin-right: auto;" class="reveal"/>

  <p class="reveal">The Travelling Salesman Problem (TSP) is a classic problem where you have a set of cities and distances between each pair of them. The goal is to find the shortest possible route that visits each city once and returns to the origin city. As simple as it might sound at first, this problem becomes quite intractable: it's NP-complete.</p>

  <p class="reveal">But there’s a variant of this problem called the "metric" TSP. In this version, the distances between cities satisfy the “triangle inequality”, meaning the direct route from one city to another is never longer than the route going through a third city. This is handy because this happens to be how Euclidean distance works and as such, how distances are measured in the real world. So this version of the problem lets us use a handy approximation algorithm that is guaranteed to be within a constant factor of the optimal solution!</p>

  <p class="reveal">Now, consider an algorithm for metric TSP: find a minimum spanning tree in the graph, then define a cycle that starts at the root of the tree, and then moves along the tree in the order in which a Depth-First Search (DFS) would visit the tree. This way, we start and end at the root, we visit each vertex at least once (possibly several times) and we pass through each edge of the minimum spanning tree exactly twice. So, the total length of our cycle is twice the cost of the minimum spanning tree.</p>

...