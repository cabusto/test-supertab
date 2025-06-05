---
layout: default
title: Testing Supertab
description: My blog with supertab
author: Justin

{% for post in site.posts %}
...
{% endfor %}
---

# Welcome to My Blog!

This is the homepage content. The Paygate script is inline below.

<script type="module" src="{{ '/assets/js/paygate.js' | relative_url }}"></script>
