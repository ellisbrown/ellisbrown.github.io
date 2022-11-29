---
layout: page
permalink: /research/
title: research
pub_years: [2023, 2022, 2018]
talk_years: [2021, 2019, 2017]
report_years: [2022, 2021, 2020, 2019]
nav: true
nav_order: 1
interests: >
    I'm interested in self-supervised learning, representation learning, curiosity-based exploration, and leveraging internet-scale models and data.
    I am keen to draw inspiration from intelligence in humans and nature---especially as a goal-post rather than a blueprint.
    My long-term goal is to develop intelligent agents that can *generalize* and *continually adapt* as robustly and efficiently as humans do, allowing them to be *safely* deployed in the real world.

---
<div class="publications">

{%- if page.interests %}
    <p>{{page.interests | markdownify}}</p>
{%- endif %}


<h3>Publications</h3>
{%- for y in page.pub_years %}
    <h2 class="year">{{y}}</h2>
    {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

{%- if page.talk_years %}
    <br><br><br>
    <h3>Talks</h3>
    {%- for y in page.talk_years %}
        <h2 class="year">{{y}}</h2>
        {% bibliography -f talks -q @*[year={{y}}]* %}
    {% endfor %}
{% endif %}

{%- if page.report_years %}
    <br><br><br>
    <h3>Reports</h3>
    {%- for y in page.report_years %}
        <h2 class="year">{{y}}</h2>
        {% bibliography -f reports -q @*[year={{y}}]* %}
    {% endfor %}
{% endif %}

</div>
