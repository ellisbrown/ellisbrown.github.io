---
permalink: /sims/
layout: distill
title: "SIMS-V: Simulated Instruction-Tuning for Spatial Video Understanding"
description: "Leveraging 3D simulators to create spatially-rich video training data that improves real-world spatial understanding in MLLMs."
date: 2025-11-03
giscus_comments: true

authors:
  - name: Ellis Brown
    url: "https://ellisbrown.github.io/"
    affiliations:
      name: New York University
  - name: Arijit Ray
    url: "https://arijitray1993.github.io/"
    affiliations:
      name: Boston University
  - name: Ranjay Krishna
    url: "https://ranjaykrishna.com"
    affiliations:
      name: AllenAI
  - name: Ross Girshick
    url: "https://www.rossgirshick.info/"
    affiliations:
      name: Vercept
  - name: Rob Fergus
    url: "https://cs.nyu.edu/~fergus/"
    affiliations:
      name: New York University
  - name: Saining Xie
    url: "https://www.sainingxie.com/"
    affiliations:
      name: New York University

bibliography: 2025-11-03-sims-v.bib

# Create a simple table of contents
# toc:
#   - name: Abstract
#   - name: Project Links
#   - name: The SIMS-V Pipeline
#   - name: Key Findings
#   - name: Citation

_styles: >
  .post img {
    max-width: 120%;
  }
  
  .responsive-table-wrapper {
    overflow-x: auto;
  }
  
  .results-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9em;
    margin: 1em 0;
  }
  
  .results-table.wide {
    min-width: 800px;
  }
  
  .results-table.medium {
    min-width: 700px;
  }
  
  /* Table cell styles */
  .results-table th,
  .results-table td {
    padding: 6px 8px;
  }
  
  .results-table .compact-cell {
    padding: 4px;
  }
  
  .results-table .compact-cell-8 {
    padding: 4px 8px;
  }
  
  .results-table .center {
    text-align: center;
  }
  
  .results-table .left {
    text-align: left;
  }
  
  /* Row styles */
  .results-table .section-header {
    background-color: #f0f4f8;
    border-top: 1px solid #333;
    font-style: italic;
  }
  
  .results-table .highlight-row {
    background-color: #e6f2ff;
  }
  
  .results-table .delta-row {
    background-color: #f5f5f5;
  }
  
  .results-table .indent {
    padding-left: 24px;
  }
  
  .results-table .divider-top {
    border-top: 1px solid #ddd;
  }
  
  .results-table .divider-bottom {
    border-bottom: 2px solid #333;
  }
  
  /* Text styles */
  .results-table .small-text {
    font-size: 0.9em;
  }
  
  .results-table .tiny-text {
    font-size: 0.85em;
  }
  
  .results-table .delta-label {
    color: #666;
    font-style: italic;
  }
  
  .results-table .positive {
    color: #008000;
  }
  
  .results-table .positive-bold {
    color: #008000;
    font-weight: bold;
  }
  
  .results-table .negative {
    color: #c80000;
  }
  
  /* Header backgrounds */
  .results-table .bg-gray {
    background-color: #f5f5f5;
  }
  
  .results-table .bg-orange {
    background-color: #fff4e6;
  }
  
  .results-table .bg-yellow {
    background-color: #fffbe6;
  }

---

<!-- ## Project Links

<div class="row text-center">
  <div class="col-md-3">
    <a href="[LINK_TO_PDF]" class="btn btn-primary btn-lg" role="button" style="width: 100%;">
      <i class="fas fa-file-pdf"></i> Paper
    </a>
  </div>
  <div class="col-md-3">
    <a href="[LINK_TO_ARXIV]" class="btn btn-primary btn-lg" role="button" style="width: 100%;">
      <i class="ai ai-arxiv"></i> arXiv
    </a>
  </div>
  <div class="col-md-3">
    <a href="[LINK_TO_CODE_REPO]" class="btn btn-primary btn-lg" role="button" style="width: 100%;">
      <i class="fab fa-github"></i> Code
    </a>
  </div>
  <div class="col-md-3">
    <a href="[LINK_TO_DATA]" class="btn btn-primary btn-lg" role="button" style="width: 100%;">
      <i class="fas fa-database"></i> Data
    </a>
  </div>
</div> -->

<d-figure class="l-page">
  <figure>
    <img src="/assets/img/sims/teaser.png" alt="A diagram showing the SIMS-V pipeline, converting 3D simulated layouts into spatial QAs, which then improves real-world video understanding on several benchmarks.">
    <figcaption>
      <b>Figure 1: SIMS-V enables learning real-world spatial concepts in simulation.</b>
      We generate spatially-rich videos with dense spatial annotations via privileged simulator data, creating diverse question-answer pairs. Models trained on this simulated data transfer effectively to real-world spatial reasoning benchmarks.
    </figcaption>
  </figure>
</d-figure>

## Abstract
Despite impressive high-level video comprehension, multimodal language models struggle with spatial reasoning across time and space. While current spatial training approaches rely on real-world video data, obtaining diverse footage with precise spatial annotations remains a bottleneck. To alleviate this bottleneck, we present SIMS-V—a systematic data-generation framework that leverages the privileged information of 3D simulators to create spatially-rich video training data for multimodal language models. Using this framework, we investigate which properties of simulated data drive effective real-world transfer through systematic ablations of question types, mixes, and scales. We identify a minimal set of three question categories (metric measurement, perspective-dependent reasoning, and temporal tracking) that prove most effective for developing transferable spatial intelligence, outperforming comprehensive coverage despite using fewer question types. These insights enable highly efficient training: our 7B-parameter video LLM fine-tuned on just 25K simulated examples outperforms the larger 72B baseline and achieves competitive performance with proprietary models on rigorous real-world spatial reasoning benchmarks. Our approach demonstrates robust generalization, maintaining performance on general video understanding while showing substantial improvements on embodied and real-world spatial tasks.


## The SIMS-V Pipeline

<aside>
  The core of our work is a systematic pipeline (Figure 2) to generate high-quality, spatially-rich video data with perfect ground truth from 3D simulators.
</aside>

We present SIMS-V, a simulated instruction-tuning framework for multimodal spatial video understanding. Our framework leverages procedurally generated 3D environments (using AI2-THOR, ProcTHOR, and Objaverse) to programmatically create rich question-answer pairs about spatial configurations across videos.

This pipeline allows us to extract two types of data: (1) **Observation-level data** like per-frame visible objects and agent position, and (2) **Global spatial data** like full room layouts and 3D object positions. We use this perfect ground truth to programmatically generate over 200k spatial QA pairs across 2.5k video trajectories.

<d-figure class="l-body-outset">
  <figure>
    <img src="/assets/img/sims/pipeline.png" alt="Diagram of the SIMS-V data generation pipeline, showing Scene Generation, Trajectory Capture, Dense Annotation Extraction, and Spatial QA Generation.">
    <figcaption>
      <b>Figure 2: The SIMS-V data generation pipeline.</b>
      We procedurally generate 3D scenes, capture agent navigation trajectories, extract dense annotations, and programmatically generate quality-controlled question-answer pairs.
    </figcaption>
  </figure>
</d-figure>

## Key Findings

### Finding 1: A minimal "3Q" mix is highly data-efficient.

<aside>
  We identify a minimal set of three question types **Absolute Distance**, **Relative Direction**, and **Appearance Order** that prove most effective for developing transferable spatial intelligence.
</aside>

We hypothesized that a minimal set of complementary question types could be sufficient, without needing to mirror the full distribution of a benchmark. Our experiments show this "3Q Minimal Mix" consistently outperforms the comprehensive "VSI-Baseline Mix" across all data scales. This demonstrates that high-quality spatial annotations enable remarkably data-efficient learning.

<d-figure>
  <figure>
    <img src="/assets/img/sims/scaling.png" alt="A line chart comparing the performance of the 3Q Minimal Mix against the VSI-Baseline Mix. The 3Q mix is consistently higher.">
    <figcaption>
      <b>Figure 5 (Left): Minimal 3Q mix is more data-efficient.</b>
      Performance on VSI-Bench climbs rapidly. At just 5K examples, our 3Q mix surpasses Gemini-1.5 Flash, and at 25K, it approaches Gemini-1.5 Pro.
    </figcaption>
  </figure>
</d-figure>

### Finding 2: SIMS-V rivals proprietary models on real-world video.

<aside>
  Fine-tuning on just 25K simulated examples boosts LLaVA-Video-7B by **+8.4%** on VSI-Bench, surpassing the larger LLaVA-Video-72B baseline.
</aside>

Our 3Q Minimal mix model achieves 44.4% on the VSI-Bench, surpassing GPT-4o (34.0%) and nearly matching Gemini-1.5 Pro (45.4%), despite being trained on just 25K examples. The model shows particularly strong improvements in the categories we trained on: spatiotemporal (appearance order: +26.4%) and measurement (absolute distance: +20.0%).

<d-figure class="l-page">
  <figure>
    <div class="responsive-table-wrapper">
      <table class="results-table wide" style="font-size: 0.85em;">
        <thead>
          <tr>
            <th class="left divider-bottom">Model</th>
            <th colspan="3" class="center divider-bottom bg-gray">Average</th>
            <th colspan="4" class="center divider-bottom bg-orange">Numerical Answer</th>
            <th colspan="4" class="center divider-bottom bg-yellow">Multiple-Choice</th>
          </tr>
          <tr class="divider-bottom">
            <th class="left"></th>
            <th class="center compact-cell tiny-text bg-gray">Macro</th>
            <th class="center compact-cell tiny-text bg-gray">Num</th>
            <th class="center compact-cell tiny-text bg-gray">MC</th>
            <th class="center compact-cell tiny-text bg-orange">Abs Dst</th>
            <th class="center compact-cell tiny-text bg-orange">Obj Sz</th>
            <th class="center compact-cell tiny-text bg-orange">Rm Sz</th>
            <th class="center compact-cell tiny-text bg-orange">Obj Ct</th>
            <th class="center compact-cell tiny-text bg-yellow">Rel Dst</th>
            <th class="center compact-cell tiny-text bg-yellow">Rel Dir</th>
            <th class="center compact-cell tiny-text bg-yellow">Rt Pln</th>
            <th class="center compact-cell tiny-text bg-yellow">App Ord</th>
          </tr>
        </thead>
        <tbody>
          <!-- Statistics -->
          <tr class="section-header">
            <td colspan="12"><strong>Statistics</strong></td>
          </tr>
          <tr>
            <td class="compact-cell-8 small-text">Chance Level (Random)</td>
            <td class="center compact-cell">—</td>
            <td class="center compact-cell">—</td>
            <td class="center compact-cell">28.6</td>
            <td class="center compact-cell">—</td>
            <td class="center compact-cell">—</td>
            <td class="center compact-cell">—</td>
            <td class="center compact-cell">—</td>
            <td class="center compact-cell">25.0</td>
            <td class="center compact-cell">36.1</td>
            <td class="center compact-cell">28.3</td>
            <td class="center compact-cell">25.0</td>
          </tr>
          <tr>
            <td class="compact-cell-8 small-text">Chance Level (Freq.)</td>
            <td class="center compact-cell">34.0</td>
            <td class="center compact-cell">39.3</td>
            <td class="center compact-cell">31.7</td>
            <td class="center compact-cell">32.0</td>
            <td class="center compact-cell">29.9</td>
            <td class="center compact-cell">33.1</td>
            <td class="center compact-cell">62.1</td>
            <td class="center compact-cell">25.1</td>
            <td class="center compact-cell">47.9</td>
            <td class="center compact-cell">28.4</td>
            <td class="center compact-cell">25.2</td>
          </tr>
          <!-- Proprietary Models -->
          <tr class="section-header">
            <td colspan="12"><strong>Proprietary Models</strong></td>
          </tr>
          <tr>
            <td class="compact-cell-8">GPT-4o</td>
            <td class="center compact-cell">34.0</td>
            <td class="center compact-cell">33.4</td>
            <td class="center compact-cell">34.6</td>
            <td class="center compact-cell">5.3</td>
            <td class="center compact-cell">43.8</td>
            <td class="center compact-cell">38.2</td>
            <td class="center compact-cell">46.2</td>
            <td class="center compact-cell">37.0</td>
            <td class="center compact-cell">41.3</td>
            <td class="center compact-cell">31.5</td>
            <td class="center compact-cell">28.5</td>
          </tr>
          <tr>
            <td class="compact-cell-8">Gemini-1.5 Flash</td>
            <td class="center compact-cell">42.1</td>
            <td class="center compact-cell">47.1</td>
            <td class="center compact-cell">37.0</td>
            <td class="center compact-cell">30.8</td>
            <td class="center compact-cell">53.5</td>
            <td class="center compact-cell">54.4</td>
            <td class="center compact-cell">49.8</td>
            <td class="center compact-cell">37.7</td>
            <td class="center compact-cell">41.0</td>
            <td class="center compact-cell">31.5</td>
            <td class="center compact-cell">37.8</td>
          </tr>
          <tr>
            <td class="compact-cell-8">Gemini-1.5 Pro</td>
            <td class="center compact-cell">45.4</td>
            <td class="center compact-cell">48.7</td>
            <td class="center compact-cell">42.1</td>
            <td class="center compact-cell">30.9</td>
            <td class="center compact-cell">64.1</td>
            <td class="center compact-cell">43.6</td>
            <td class="center compact-cell">56.2</td>
            <td class="center compact-cell">51.3</td>
            <td class="center compact-cell">46.3</td>
            <td class="center compact-cell">36.0</td>
            <td class="center compact-cell">34.6</td>
          </tr>
          <tr>
            <td class="compact-cell-8">Gemini-2.5 Pro</td>
            <td class="center compact-cell">51.5</td>
            <td class="center compact-cell">46.5</td>
            <td class="center compact-cell">56.5</td>
            <td class="center compact-cell">34.9</td>
            <td class="center compact-cell">64.3</td>
            <td class="center compact-cell">42.8</td>
            <td class="center compact-cell">43.8</td>
            <td class="center compact-cell">61.1</td>
            <td class="center compact-cell">47.8</td>
            <td class="center compact-cell"><strong>45.9</strong></td>
            <td class="center compact-cell">71.3</td>
          </tr>
          <!-- Open-source Models -->
          <tr class="section-header">
            <td colspan="12"><strong>Open-Source Models</strong></td>
          </tr>
          <tr>
            <td class="compact-cell-8">LLaVA-Video 72B</td>
            <td class="center compact-cell">41.2</td>
            <td class="center compact-cell"><strong>42.4</strong></td>
            <td class="center compact-cell">40.0</td>
            <td class="center compact-cell">24.5</td>
            <td class="center compact-cell"><strong>56.5</strong></td>
            <td class="center compact-cell">37.0</td>
            <td class="center compact-cell"><strong>51.4</strong></td>
            <td class="center compact-cell">41.7</td>
            <td class="center compact-cell">36.1</td>
            <td class="center compact-cell">33.0</td>
            <td class="center compact-cell">49.2</td>
          </tr>
          <tr>
            <td class="compact-cell-8">LLaVA-Video 7B</td>
            <td class="center compact-cell">36.0</td>
            <td class="center compact-cell">34.0</td>
            <td class="center compact-cell">38.0</td>
            <td class="center compact-cell">15.2</td>
            <td class="center compact-cell">46.9</td>
            <td class="center compact-cell">24.1</td>
            <td class="center compact-cell">49.7</td>
            <td class="center compact-cell">44.1</td>
            <td class="center compact-cell">42.4</td>
            <td class="center compact-cell">33.5</td>
            <td class="center compact-cell">31.9</td>
          </tr>
          <tr class="highlight-row">
            <td class="compact-cell-8 indent">+ 25k SIMS-V 3Q</td>
            <td class="center compact-cell"><strong>44.4</strong></td>
            <td class="center compact-cell">40.3</td>
            <td class="center compact-cell"><strong>48.6</strong></td>
            <td class="center compact-cell"><strong>35.2</strong></td>
            <td class="center compact-cell">41.2</td>
            <td class="center compact-cell"><strong>38.1</strong></td>
            <td class="center compact-cell">46.5</td>
            <td class="center compact-cell"><strong>53.8</strong></td>
            <td class="center compact-cell"><strong>47.3</strong></td>
            <td class="center compact-cell"><strong>35.1</strong></td>
            <td class="center compact-cell"><strong>58.3</strong></td>
          </tr>
          <tr class="delta-row">
            <td class="compact-cell-8 indent delta-label">Δ Improvement</td>
            <td class="center compact-cell positive-bold">+8.4</td>
            <td class="center compact-cell positive">+6.3</td>
            <td class="center compact-cell positive-bold">+10.7</td>
            <td class="center compact-cell positive-bold">+20.0</td>
            <td class="center compact-cell negative">-5.7</td>
            <td class="center compact-cell positive">+14.0</td>
            <td class="center compact-cell negative">-3.2</td>
            <td class="center compact-cell positive">+9.7</td>
            <td class="center compact-cell positive">+4.9</td>
            <td class="center compact-cell positive">+1.6</td>
            <td class="center compact-cell positive-bold">+26.4</td>
          </tr>
          <tr class="divider-top">
            <td class="compact-cell-8">LLaVA-OneVision 72B</td>
            <td class="center compact-cell"><strong>40.9</strong></td>
            <td class="center compact-cell"><strong>42.5</strong></td>
            <td class="center compact-cell">39.3</td>
            <td class="center compact-cell">25.2</td>
            <td class="center compact-cell"><strong>57.0</strong></td>
            <td class="center compact-cell"><strong>41.8</strong></td>
            <td class="center compact-cell">46.1</td>
            <td class="center compact-cell">42.8</td>
            <td class="center compact-cell">34.9</td>
            <td class="center compact-cell"><strong>32.0</strong></td>
            <td class="center compact-cell">47.6</td>
          </tr>
          <tr>
            <td class="compact-cell-8">LLaVA-OneVision 7B</td>
            <td class="center compact-cell">35.0</td>
            <td class="center compact-cell">34.7</td>
            <td class="center compact-cell">35.3</td>
            <td class="center compact-cell">14.8</td>
            <td class="center compact-cell">47.6</td>
            <td class="center compact-cell">23.1</td>
            <td class="center compact-cell"><strong>53.2</strong></td>
            <td class="center compact-cell">43.4</td>
            <td class="center compact-cell">38.4</td>
            <td class="center compact-cell">31.4</td>
            <td class="center compact-cell">27.8</td>
          </tr>
          <tr class="highlight-row">
            <td class="compact-cell-8 indent">+ 25k SIMS-V 3Q</td>
            <td class="center compact-cell">40.4</td>
            <td class="center compact-cell">39.1</td>
            <td class="center compact-cell"><strong>41.8</strong></td>
            <td class="center compact-cell"><strong>31.2</strong></td>
            <td class="center compact-cell">44.9</td>
            <td class="center compact-cell">29.1</td>
            <td class="center compact-cell">51.0</td>
            <td class="center compact-cell"><strong>44.4</strong></td>
            <td class="center compact-cell"><strong>45.1</strong></td>
            <td class="center compact-cell">28.9</td>
            <td class="center compact-cell"><strong>48.9</strong></td>
          </tr>
          <tr class="delta-row divider-bottom">
            <td class="compact-cell-8 indent delta-label">Δ Improvement</td>
            <td class="center compact-cell positive">+5.4</td>
            <td class="center compact-cell positive">+4.4</td>
            <td class="center compact-cell positive">+6.6</td>
            <td class="center compact-cell positive-bold">+16.4</td>
            <td class="center compact-cell negative">-2.7</td>
            <td class="center compact-cell positive">+6.0</td>
            <td class="center compact-cell negative">-2.2</td>
            <td class="center compact-cell positive">+1.0</td>
            <td class="center compact-cell positive">+6.7</td>
            <td class="center compact-cell negative">-2.5</td>
            <td class="center compact-cell positive-bold">+21.1</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <figcaption>
      <b>Table 1: VSI-Bench Performance.</b>
      Our 7B model fine-tuned on 25K SIMS-V examples achieves 44.4%, surpassing GPT-4o (34.0%) and the larger LLaVA-Video-72B (41.2%), and approaching Gemini-1.5 Pro (45.4%). Strong gains in appearance order (+26.4%) and absolute distance (+20.0%) demonstrate effective spatial transfer to real-world videos.
    </figcaption>
  </figure>
</d-figure>

### Finding 3: Learned skills transfer to diverse spatial tasks.

<aside>
  Spatial concepts learned in simulated indoor environments transfer to new domains, including embodied reasoning (OpenEQA **+8.6%**) and real-world outdoor images (MMRealWorld **+4.5%**).
</aside>

To verify that our spatial-focused training does not degrade general capabilities, we evaluated on diverse benchmarks. We found that our approach maintains stable performance on general video understanding tasks like VideoMME and EgoSchema. More importantly, it shows strong positive transfer to new spatial domains, demonstrating that the learned spatial understanding generalizes beyond the indoor training environment.

<d-figure class="l-body-outset">
  <figure>
    <div class="responsive-table-wrapper">
      <table class="results-table medium">
        <thead>
          <tr class="divider-bottom">
            <th class="left">Model</th>
            <th class="center">VSI-B</th>
            <th class="center">VSI-B<sup>Deb.</sup></th>
            <th class="center">OpenEQA</th>
            <th class="center">MME.RW<sup>lite</sup></th>
            <th class="center">EgoSchema</th>
            <th class="center">Video<sup>MME</sup></th>
          </tr>
        </thead>
      <tbody>
        <!-- Proprietary Models -->
        <tr class="section-header">
          <td colspan="7"><strong>Proprietary Models</strong></td>
        </tr>
        <tr>
          <td>GPT-4o</td>
          <td class="center">34.0</td>
          <td class="center">—</td>
          <td class="center">—</td>
          <td class="center">—</td>
          <td class="center">—</td>
          <td class="center">71.9</td>
        </tr>
        <tr>
          <td>Gemini-1.5-Pro</td>
          <td class="center">45.4</td>
          <td class="center">40.1</td>
          <td class="center">—</td>
          <td class="center">—</td>
          <td class="center">72.2</td>
          <td class="center">75.0</td>
        </tr>
        <tr>
          <td>Gemini-2.5 Pro</td>
          <td class="center">51.5</td>
          <td class="center">49.1</td>
          <td class="center">—</td>
          <td class="center">—</td>
          <td class="center">—</td>
          <td class="center">—</td>
        </tr>
        <!-- Open-Source Models -->
        <tr class="section-header">
          <td colspan="7"><strong>Open-Source Models</strong></td>
        </tr>
        <tr>
          <td>LLaVA-Video 72B</td>
          <td class="center">41.2</td>
          <td class="center">36.8</td>
          <td class="center"><strong>43.8</strong></td>
          <td class="center">36.0</td>
          <td class="center"><strong>66.7</strong></td>
          <td class="center"><strong>68.8</strong></td>
        </tr>
        <tr>
          <td>LLaVA-OneVision 72B</td>
          <td class="center">40.9</td>
          <td class="center">35.6</td>
          <td class="center">43.0</td>
          <td class="center">48.2</td>
          <td class="center">62.8</td>
          <td class="center">66.7</td>
        </tr>
        <tr class="divider-top">
          <td>InternVL2.5 8B</td>
          <td class="center">34.6</td>
          <td class="center">24.9</td>
          <td class="center">—</td>
          <td class="center">—</td>
          <td class="center">50.6</td>
          <td class="center">64.2</td>
        </tr>
        <tr>
          <td>Qwen-VL-2.5 7B</td>
          <td class="center">33.5</td>
          <td class="center">29.6</td>
          <td class="center">—</td>
          <td class="center">—</td>
          <td class="center">65.0</td>
          <td class="center">65.1</td>
        </tr>
        <tr class="divider-top">
          <td>LLaVA-Video 7B</td>
          <td class="center">36.0</td>
          <td class="center">30.7</td>
          <td class="center">34.6</td>
          <td class="center">35.2</td>
          <td class="center">56.9</td>
          <td class="center">63.3</td>
        </tr>
        <tr>
          <td class="indent">+ 25k SIMS-V 3Q</td>
          <td class="center"><strong>44.4</strong></td>
          <td class="center"><strong>38.4</strong></td>
          <td class="center">43.2</td>
          <td class="center">39.7</td>
          <td class="center">59.1</td>
          <td class="center">63.1</td>
        </tr>
        <tr class="delta-row">
          <td class="indent delta-label">Δ Improvement</td>
          <td class="center positive">+8.4</td>
          <td class="center positive">+7.7</td>
          <td class="center positive">+8.6</td>
          <td class="center positive">+4.5</td>
          <td class="center positive">+2.2</td>
          <td class="center negative">-0.2</td>
        </tr>
        <tr class="divider-top">
          <td>LLaVA-OneVision 7B</td>
          <td class="center">35.0</td>
          <td class="center">28.5</td>
          <td class="center">42.1</td>
          <td class="center">48.6</td>
          <td class="center">60.8</td>
          <td class="center">58.3</td>
        </tr>
        <tr>
          <td class="indent">+ 25k SIMS-V 3Q</td>
          <td class="center">40.4</td>
          <td class="center">33.9</td>
          <td class="center">42.2</td>
          <td class="center"><strong>49.7</strong></td>
          <td class="center">60.5</td>
          <td class="center">59.0</td>
        </tr>
        <tr class="delta-row divider-bottom">
          <td class="indent delta-label">Δ Improvement</td>
          <td class="center positive">+5.4</td>
          <td class="center positive">+5.4</td>
          <td class="center positive">+0.1</td>
          <td class="center positive">+1.1</td>
          <td class="center negative">-0.3</td>
          <td class="center positive">+0.7</td>
        </tr>
      </tbody>
    </table>
    </div>

    <figcaption>
      <b>Table 3: Generalization to diverse benchmarks.</b>
      SIMS-V training transfers to embodied and real-world scenarios while maintaining general video understanding capabilities.
    </figcaption>
  </figure>
</d-figure>


## Citation

If you find our work useful, please consider citing:

```bibtex
@article{brown2025simsv,
  title   =  { {SIMS-V}: Simulated Instruction-Tuning for Spatial Video Understanding },
  author  =  { Brown, Ellis and Ray, Arijit and Krishna, Ranjay and Girshick, Ross and Fergus, Rob and Xie, Saining },
  journal =  { arXiv preprint },
  year    =  { 2025 }
}
```

