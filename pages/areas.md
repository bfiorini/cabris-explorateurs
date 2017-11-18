---
layout: page
permalink: /sites/
title: Liste des sites
---
{% assign areas = site.areas | sort: 'title' | sort: 'region' %}
<ul class="side-nav">
  {% for area in areas %}
    {% unless area.published == false %}
    <li>
      <a href="{{ site.url }}{{ area.url }}">
      {{ area.region }} &middot; {{ area.title }}
      </a>
    </li>
    {% endunless %}
  {% endfor %}
  <li>&nbsp;</li>
</ul>

