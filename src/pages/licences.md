---
layout: page
title: "Licences"
subheadline: ""
excerpt: "Merci"
permalink: "/licences/"
---

<ul>
{% for licence_item in site.data.licences %}
    <li {% if licence_item.class %}class="{{ licence_item.class }}" {% endif %}>
      <a href="{{ licence_item.url }}" target="_blank" title="{{ licence_item.name }}">{{ licence_item.name }}</a>
    </li>
{% endfor %}
</ul>
