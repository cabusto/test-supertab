---
layout: default
title: Testing Supertab
description: My blog with supertab
author: Justin

---

# Welcome to My Blog!

## Blog Posts

<ul>
{% for post in site.posts %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <span class="post-date">- {{ post.date | date: "%B %d, %Y" }}</span>
  </li>
{% endfor %}
</ul>
