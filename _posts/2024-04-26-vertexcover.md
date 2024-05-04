---
layout: post
title:  "Vertex Cover"
date:   2024-04-26
usemathjax: true
---

# Overview

<img src="/assets/posts/vertexcover.png"
     alt="Minimalistic vector art of vertex cover problem"
     style="float: center; width: 180px; height: 200px; display: block;
  margin-left: auto;
  margin-right: auto;" />

The vertex cover problem is concerned with finding the smallest set of vertices in a graph such that every edge is incident to at least one vertex in the set. This is an optimization problem and is known to be NP-hard, but we can still find approximate solutions to it. 

# A Greedy Algorithm

One approach to finding the smallest vertex cover of a graph is the greedy algorithm. The greedy algorithm iteratively selects the vertex with the highest degree and removes it along with its incident edges. This process is repeated until all edges are covered. Specifically, the algorithm is as follows:

```python
def greedy_vertex_cover(G, E):
    # G is the graph and E is the set of edges
    cover = set()
    while E:
        # Find the vertex with the highest degree
        v = vertex in V with the highest degree
        cover.add(v)
        # Remove the vertex and its incident edges
        E = E - edges incident to v
    return cover
```
This algorithm does return a valid vertex cover! However it doesn't do a very good job at finding the smallest vertex cover possible. This particular greedy algorithm is a non-constant factor of $O(\log n)$ approximation algorithm, meaning that the size of the vertex cover it returns can be arbitrarily larger than the optimal solution by up to a factor of $\log n$!

# A Better Greedy Algorithm

Despite the shortcomings of the previous greedy algorithm, we can modify it to achieve a better approximation. The improved greedy algorithm can be shown to yield a constant factor approximation of 2. The algorithm is as follows:

```python
def better_greedy_vertex_cover(G, E):
    # G is the graph and E is the set of edges
    M = any maximal matching in G
    return cover = both endpoints of all edges in M
```
where a maximal matching in a graph is defined as a matching to which no more edges can be added. This algorithm is guaranteed to return a vertex cover that is at most twice the size of the optimal vertex cover:

1. The vertex cover S output by the better greedy algorithm is valid: For the maximal matching M, consider any edge $(u, v)$ in the graph. Then 1 of 2 cases must hold:
    - $(u, v)$ is in M, in which case both $u$ and $v$ are in S.
    - $(u, v)$ is not in M: we can't add $(u, v)$ to M because it would overlap with some edge in M. Then either $u$ or $v$ must already be in $M$ or $u$ or $v$ is in S.
2. The size of better greedy algorithm's vertex cover S is at most twice the size of the optimal vertex cover:
    - Observing that the size of the optimal set cover $opt$ is at least the size of the maximal matching M, it can then be seen that $\|S\| = 2\|M\| \leq 2\|opt\|$.

# Linear Program Based Approximation

Another approach to finding an approximate vertex cover is to formulate the problem as a linear program. The linear program for the vertex cover problem is as follows:
The variables $x_v$ are binary variables that indicate whether a vertex $v$ is in the vertex cover. The objective is to minimize the sum of the variables, which corresponds to minimizing the size of the vertex cover. The constraints ensure that every edge is incident to at least one vertex in the cover. However, this is an integer linear program which is not polynomial time solvable, so we need to relax the constraints to obtain a polynomial time algorithm. So instead of requiring $x_v$ to be binary, we allow them to be any real number between 0 and 1 and the linear program becomes: 
<p style="text-align: center;">$\min \sum_{v \in V} x_v$</p>
<p style="text-align: center;">Subject to: </p>
<p style="text-align: center;">$x_u+x_v \geq 1 \quad \forall (u, v) \in E$</p>
<p style="text-align: center;">$x_v \geq 0$</p>
When we solve the linear program, we'll get a set $\{x_1, x_2, \ldots, x_n\}$ of real numbers between 0 and 1. The algorithm would then be to round:
```python
def lp_vertex_cover(G, E):
    x = solve linear program
    return {v | x_v >= 0.5}
```
This algorithm also returns a valid vertex cover $S$ and is a $2$-approximation algorithm:
1. The vertex cover S output by lp_vertex_cover is valid: Consider any edge $(u, v) \in E$. Then $x_u \geq 0.5$ or $x_v \geq 0.5$ or both are $\geq 0.5$, so either $u$ or $v$ or both are in $S$.
2. lp_vertex_cover is a $2$-approximation algorithm: Observe that LP optimum $\leq$ optimal vertex cover size. Becase we relaxed constraints to get the LP, the objective function gets better than the optimal vertex cover size. So the size of the vertex cover $S$ returned by lp_vertex_cover is at most twice the size of the optimal vertex cover.