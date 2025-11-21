---
layout: default
title: Testing Supertab
description: My blog with supertab
author: Justin

---

<div class="hero">
  <h1>Welcome to My Blog!</h1>
  <p>Exploring ideas, sharing stories, and discovering new perspectives</p>
</div>

## Latest Blog Posts

<ul class="post-list">
{% for post in site.posts %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <span>{{ post.date | date: "%B %d, %Y" }}</span>
  </li>
{% endfor %}
</ul>
