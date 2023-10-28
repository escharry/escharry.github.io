---
layout: default
title: Posts
---
<h1>My Posts</h1>

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url | absolute_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
