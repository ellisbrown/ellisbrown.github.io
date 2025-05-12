---
layout: page
permalink: /research/
title: research
pub_years: [2025, 2024, 2023, 2022, 2018]
talk_years: [2021, 2019, 2017]
nav: true
nav_order: 1
interests: >
  I'm interested in self-supervised learning, representation learning, curiosity-based exploration, and leveraging internet-scale models and data.
  I am keen to draw inspiration from intelligence in humans and nature---especially as a goal-post rather than a blueprint.
  My long-term goal is to develop intelligent agents that can *generalize* and *continually adapt* as robustly and efficiently as humans do, allowing them to be *safely* deployed in the real world.
selected_papers: true
selected_talks: false
---

<div class="publications">

{%- if page.interests %}

<p>{{page.interests | markdownify}}</p>
{%- endif %}

<h3>Publications</h3>
{% bibliography -f papers %}

{%- if page.talk_years %}
<br><br><br>

<h3>Talks</h3>
{% bibliography -f talks %}
{% endif %}

</div>
