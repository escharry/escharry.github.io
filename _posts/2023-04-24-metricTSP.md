---
layout: post
title:  "Metric TSP"
date:   2023-04-24
usemathjax: true
---
<style>
table {
  border-collapse: collapse;
  width: 10%;

}

th, td {
  padding: 1px;
  text-align: center;
}
</style>

# Overview

<img src="/assets/posts/tsp.png"
     alt="Minimalistic vector art of Knapsack problem with fruit"
     style="float: center; width: 180px; height: 200px; display: block;
  margin-left: auto;
  margin-right: auto;" />

The knapsack problem is concerned with a knapsack that has a maximum weight capacity and a set of items that have a weight and a value. The goal is to maximize the value of the items in the knapsack without exceeding the maximum weight capacity.

The dynamic programming based algorithm exists with a $$\theta(nW)$$, where $$W$$ is the maximum weight capacity and $$n$$ is the number of items. This is actually a pseudo-polynomial time algorithm, since the running time is polynomial in the numeric value of the input, but not in the length of the input. That is to say, this is a polynomial time algorithm if the input is represented in unary, but not if it is represented in binary. This is because the input size is $$\theta(\log W)$$, which is the number of bits needed to represent $$W$$. Then knapsack is NP-hard!

Even though this optimization knapsack problem is NP-hard, there is a simple approximation algorithm that can be used to find a solution that is within a constant factor 2 of the optimal solution---and the algorithm is built on friendly intuition!

Let an instance of the problem be as follows, imagining the items are $$n=3$$   ludicrously large fruits:


<table style="margin: 0 auto;">
  <thead>
    <tr>
      <th>item</th>
      <th>weight</th>
      <th>value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center; vertical-align: middle;">🍎</td>
      <td style="text-align: center;">25678</td>
      <td style="text-align: center;">10001111</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">🍌</td>
      <td style="text-align: center;">34939</td>
      <td style="text-align: center;">20010001</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">🥭</td>
      <td style="text-align: center;">10017</td>
      <td style="text-align: center;">3002003</td>
    </tr>
  </tbody>
</table>
\
Where $$W = 100000$$
\
\
Using the regular DP algorithm, the runtime for this instance would be $$\theta(nW) = \theta(3 \cdot 34939) = \theta(104817)$$.

Another DP algorithm which instead depends on the maximum value has runtime $$\theta(nV) = \theta(3 \cdot 3002003) = \theta(9006009)$$. 

This spurs the thought: what if we just scaled down the values and discretize? Then our table would look something like this:

<table style="margin: 0 auto;">
  <thead>
    <tr>
      <th>item</th>
      <th>weight</th>
      <th>value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center; vertical-align: middle;">🍎</td>
      <td style="text-align: center;">25678</td>
      <td style="text-align: center;">10001111</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">🍌</td>
      <td style="text-align: center;">34939</td>
      <td style="text-align: center;">20010001</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">🥭</td>
      <td style="text-align: center;">10017</td>
      <td style="text-align: center;">3002003</td>
    </tr>
  </tbody>
</table>