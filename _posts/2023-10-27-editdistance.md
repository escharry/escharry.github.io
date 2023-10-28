---
layout: post
title:  "Edit Distance"
date:   2023-10-27
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

<img src="/assets/posts/editdist.png"
     alt="Minimalistic vector art of edit distance problem"
     style="float: center; width: 280px; height: 300px; display: block;
  margin-left: auto;
  margin-right: auto;" />

When you're typing something on your phone and you see it suggest something, chances are it's employing some form of edit distance as a metric to determine what you're trying to type. The edit distance between two strings is the minimum number of operations required to transform one string into the other. Such operations are the insertion, deletion, or replacement of a character. 

Edit distance is then concerned with finding the minimum number of operations required to transform one string into another. This problem is also known as the Levenshtein distance, named after Vladimir Levenshtein, who considered this distance in 1965. 

*...*