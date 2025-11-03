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
    ulr: "https://cs.nyu.edu/~fergus/"
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
<p>Despite impressive high-level video comprehension, multimodal language models struggle with spatial reasoning across time and space. While current spatial training approaches rely on real-world video data, obtaining diverse footage with precise spatial annotations remains a bottleneck. To alleviate this bottleneck, we present SIMS-V—a systematic data-generation framework that leverages the privileged information of 3D simulators to create spatially-rich video training data for multimodal language models. Using this framework, we investigate which properties of simulated data drive effective real-world transfer through systematic ablations of question types, mixes, and scales. We identify a minimal set of three question categories (metric measurement, perspective-dependent reasoning, and temporal tracking) that prove most effective for developing transferable spatial intelligence, outperforming comprehensive coverage despite using fewer question types. These insights enable highly efficient training: our 7B-parameter video LLM fine-tuned on just 25K simulated examples outperforms the larger 72B baseline and achieves competitive performance with proprietary models on rigorous real-world spatial reasoning benchmarks. Our approach demonstrates robust generalization, maintaining performance on general video understanding while showing substantial improvements on embodied and real-world spatial tasks.</p>


## The SIMS-V Pipeline

<aside>
  <p>The core of our work is a systematic pipeline (Figure 2) to generate high-quality, spatially-rich video data with perfect ground truth from 3D simulators.</p>
</aside>

<p>We present SIMS-V, a simulated instruction-tuning framework for multimodal spatial video understanding. Our framework leverages procedurally generated 3D environments (using AI2-THOR, ProcTHOR, and Objaverse) to programmatically create rich question-answer pairs about spatial configurations across videos.</p>

<p>This pipeline allows us to extract two types of data: (1) <b>Observation-level data</b> like per-frame visible objects and agent position , and (2) <b>Global spatial data</b> like full room layouts and 3D object positions. We use this perfect ground truth to programmatically generate over 200k spatial QA pairs across 2.5k video trajectories.</p>

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
  <p>We identify a minimal set of three question types (<b>Absolute Distance</b>, <b>Relative Direction</b>, and <b>Appearance Order</b>) that prove most effective for developing transferable spatial intelligence.</p>
</aside>

<p>We hypothesized that a minimal set of complementary question types could be sufficient, without needing to mirror the full distribution of a benchmark. Our experiments show this "3Q Minimal Mix" consistently outperforms the comprehensive "VSI-Baseline Mix" across all data scales. This demonstrates that high-quality spatial annotations enable remarkably data-efficient learning.</p>

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
  <p>Fine-tuning on just 25K simulated examples boosts LLaVA-Video-7B by <b>+8.4%</b> on VSI-Bench, surpassing the larger LLaVA-Video-72B baseline.</p>
</aside>

<p>Our 3Q Minimal mix model achieves 44.4% on the VSI-Bench, surpassing GPT-4o (34.0%) and nearly matching Gemini-1.5 Pro (45.4%), despite being trained on just 25K examples. The model shows particularly strong improvements in the categories we trained on: spatiotemporal (appearance order: +26.4%) and measurement (absolute distance: +20.0%).</p>

<d-figure class="l-page">
  <figure>
    <div class="responsive-table-wrapper">
      <table class="results-table wide" style="font-size: 0.85em;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 8px; border-bottom: 2px solid #333;">Model</th>
            <th colspan="3" style="text-align: center; padding: 8px; border-bottom: 2px solid #333; background-color: #f5f5f5;">Average</th>
            <th colspan="4" style="text-align: center; padding: 8px; border-bottom: 2px solid #333; background-color: #fff4e6;">Numerical Answer</th>
            <th colspan="4" style="text-align: center; padding: 8px; border-bottom: 2px solid #333; background-color: #fffbe6;">Multiple-Choice</th>
          </tr>
          <tr style="border-bottom: 2px solid #333;">
            <th style="text-align: left; padding: 6px 8px;"></th>
            <th style="text-align: center; padding: 6px 4px; font-size: 0.85em; background-color: #f5f5f5;">Macro</th>
            <th style="text-align: center; padding: 6px 4px; font-size: 0.85em; background-color: #f5f5f5;">Num</th>
            <th style="text-align: center; padding: 6px 4px; font-size: 0.85em; background-color: #f5f5f5;">MC</th>
            <th style="text-align: center; padding: 6px 4px; font-size: 0.85em; background-color: #fff4e6;">Abs Dst</th>
            <th style="text-align: center; padding: 6px 4px; font-size: 0.85em; background-color: #fff4e6;">Obj Sz</th>
            <th style="text-align: center; padding: 6px 4px; font-size: 0.85em; background-color: #fff4e6;">Rm Sz</th>
            <th style="text-align: center; padding: 6px 4px; font-size: 0.85em; background-color: #fff4e6;">Obj Ct</th>
            <th style="text-align: center; padding: 6px 4px; font-size: 0.85em; background-color: #fffbe6;">Rel Dst</th>
            <th style="text-align: center; padding: 6px 4px; font-size: 0.85em; background-color: #fffbe6;">Rel Dir</th>
            <th style="text-align: center; padding: 6px 4px; font-size: 0.85em; background-color: #fffbe6;">Rt Pln</th>
            <th style="text-align: center; padding: 6px 4px; font-size: 0.85em; background-color: #fffbe6;">App Ord</th>
          </tr>
        </thead>
        <tbody>
          <!-- Statistics -->
          <tr style="background-color: #f0f4f8; border-top: 1px solid #333;">
            <td colspan="12" style="padding: 6px 8px; font-style: italic;"><strong>Statistics</strong></td>
          </tr>
          <tr>
            <td style="padding: 4px 8px; font-size: 0.9em;">Chance Level (Random)</td>
            <td style="text-align: center; padding: 4px;">—</td>
            <td style="text-align: center; padding: 4px;">—</td>
            <td style="text-align: center; padding: 4px;">28.6</td>
            <td style="text-align: center; padding: 4px;">—</td>
            <td style="text-align: center; padding: 4px;">—</td>
            <td style="text-align: center; padding: 4px;">—</td>
            <td style="text-align: center; padding: 4px;">—</td>
            <td style="text-align: center; padding: 4px;">25.0</td>
            <td style="text-align: center; padding: 4px;">36.1</td>
            <td style="text-align: center; padding: 4px;">28.3</td>
            <td style="text-align: center; padding: 4px;">25.0</td>
          </tr>
          <tr>
            <td style="padding: 4px 8px; font-size: 0.9em;">Chance Level (Freq.)</td>
            <td style="text-align: center; padding: 4px;">34.0</td>
            <td style="text-align: center; padding: 4px;">39.3</td>
            <td style="text-align: center; padding: 4px;">31.7</td>
            <td style="text-align: center; padding: 4px;">32.0</td>
            <td style="text-align: center; padding: 4px;">29.9</td>
            <td style="text-align: center; padding: 4px;">33.1</td>
            <td style="text-align: center; padding: 4px;">62.1</td>
            <td style="text-align: center; padding: 4px;">25.1</td>
            <td style="text-align: center; padding: 4px;">47.9</td>
            <td style="text-align: center; padding: 4px;">28.4</td>
            <td style="text-align: center; padding: 4px;">25.2</td>
          </tr>
          <!-- Proprietary Models -->
          <tr style="background-color: #f0f4f8; border-top: 1px solid #333;">
            <td colspan="12" style="padding: 6px 8px; font-style: italic;"><strong>Proprietary Models</strong></td>
          </tr>
          <tr>
            <td style="padding: 4px 8px;">GPT-4o</td>
            <td style="text-align: center; padding: 4px;">34.0</td>
            <td style="text-align: center; padding: 4px;">33.4</td>
            <td style="text-align: center; padding: 4px;">34.6</td>
            <td style="text-align: center; padding: 4px;">5.3</td>
            <td style="text-align: center; padding: 4px;">43.8</td>
            <td style="text-align: center; padding: 4px;">38.2</td>
            <td style="text-align: center; padding: 4px;">46.2</td>
            <td style="text-align: center; padding: 4px;">37.0</td>
            <td style="text-align: center; padding: 4px;">41.3</td>
            <td style="text-align: center; padding: 4px;">31.5</td>
            <td style="text-align: center; padding: 4px;">28.5</td>
          </tr>
          <tr>
            <td style="padding: 4px 8px;">Gemini-1.5 Flash</td>
            <td style="text-align: center; padding: 4px;">42.1</td>
            <td style="text-align: center; padding: 4px;">47.1</td>
            <td style="text-align: center; padding: 4px;">37.0</td>
            <td style="text-align: center; padding: 4px;">30.8</td>
            <td style="text-align: center; padding: 4px;">53.5</td>
            <td style="text-align: center; padding: 4px;">54.4</td>
            <td style="text-align: center; padding: 4px;">49.8</td>
            <td style="text-align: center; padding: 4px;">37.7</td>
            <td style="text-align: center; padding: 4px;">41.0</td>
            <td style="text-align: center; padding: 4px;">31.5</td>
            <td style="text-align: center; padding: 4px;">37.8</td>
          </tr>
          <tr>
            <td style="padding: 4px 8px;">Gemini-1.5 Pro</td>
            <td style="text-align: center; padding: 4px;">45.4</td>
            <td style="text-align: center; padding: 4px;">48.7</td>
            <td style="text-align: center; padding: 4px;">42.1</td>
            <td style="text-align: center; padding: 4px;">30.9</td>
            <td style="text-align: center; padding: 4px;">64.1</td>
            <td style="text-align: center; padding: 4px;">43.6</td>
            <td style="text-align: center; padding: 4px;">56.2</td>
            <td style="text-align: center; padding: 4px;">51.3</td>
            <td style="text-align: center; padding: 4px;">46.3</td>
            <td style="text-align: center; padding: 4px;">36.0</td>
            <td style="text-align: center; padding: 4px;">34.6</td>
          </tr>
          <tr>
            <td style="padding: 4px 8px;">Gemini-2.5 Pro</td>
            <td style="text-align: center; padding: 4px;">51.5</td>
            <td style="text-align: center; padding: 4px;">46.5</td>
            <td style="text-align: center; padding: 4px;">56.5</td>
            <td style="text-align: center; padding: 4px;">34.9</td>
            <td style="text-align: center; padding: 4px;">64.3</td>
            <td style="text-align: center; padding: 4px;">42.8</td>
            <td style="text-align: center; padding: 4px;">43.8</td>
            <td style="text-align: center; padding: 4px;">61.1</td>
            <td style="text-align: center; padding: 4px;">47.8</td>
            <td style="text-align: center; padding: 4px;"><strong>45.9</strong></td>
            <td style="text-align: center; padding: 4px;">71.3</td>
          </tr>
          <!-- Open-source Models -->
          <tr style="background-color: #f0f4f8; border-top: 1px solid #333;">
            <td colspan="12" style="padding: 6px 8px; font-style: italic;"><strong>Open-Source Models</strong></td>
          </tr>
          <tr>
            <td style="padding: 4px 8px;">LLaVA-Video 72B</td>
            <td style="text-align: center; padding: 4px;">41.2</td>
            <td style="text-align: center; padding: 4px;"><strong>42.4</strong></td>
            <td style="text-align: center; padding: 4px;">40.0</td>
            <td style="text-align: center; padding: 4px;">24.5</td>
            <td style="text-align: center; padding: 4px;"><strong>56.5</strong></td>
            <td style="text-align: center; padding: 4px;">37.0</td>
            <td style="text-align: center; padding: 4px;"><strong>51.4</strong></td>
            <td style="text-align: center; padding: 4px;">41.7</td>
            <td style="text-align: center; padding: 4px;">36.1</td>
            <td style="text-align: center; padding: 4px;">33.0</td>
            <td style="text-align: center; padding: 4px;">49.2</td>
          </tr>
          <tr>
            <td style="padding: 4px 8px;">LLaVA-Video 7B</td>
            <td style="text-align: center; padding: 4px;">36.0</td>
            <td style="text-align: center; padding: 4px;">34.0</td>
            <td style="text-align: center; padding: 4px;">38.0</td>
            <td style="text-align: center; padding: 4px;">15.2</td>
            <td style="text-align: center; padding: 4px;">46.9</td>
            <td style="text-align: center; padding: 4px;">24.1</td>
            <td style="text-align: center; padding: 4px;">49.7</td>
            <td style="text-align: center; padding: 4px;">44.1</td>
            <td style="text-align: center; padding: 4px;">42.4</td>
            <td style="text-align: center; padding: 4px;">33.5</td>
            <td style="text-align: center; padding: 4px;">31.9</td>
          </tr>
          <tr style="background-color: #e6f2ff;">
            <td style="padding: 4px 8px; padding-left: 24px;">+ 25k SIMS-V 3Q</td>
            <td style="text-align: center; padding: 4px;"><strong>44.4</strong></td>
            <td style="text-align: center; padding: 4px;">40.3</td>
            <td style="text-align: center; padding: 4px;"><strong>48.6</strong></td>
            <td style="text-align: center; padding: 4px;"><strong>35.2</strong></td>
            <td style="text-align: center; padding: 4px;">41.2</td>
            <td style="text-align: center; padding: 4px;"><strong>38.1</strong></td>
            <td style="text-align: center; padding: 4px;">46.5</td>
            <td style="text-align: center; padding: 4px;"><strong>53.8</strong></td>
            <td style="text-align: center; padding: 4px;"><strong>47.3</strong></td>
            <td style="text-align: center; padding: 4px;"><strong>35.1</strong></td>
            <td style="text-align: center; padding: 4px;"><strong>58.3</strong></td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 4px 8px; padding-left: 24px; color: #666; font-style: italic;">Δ Improvement</td>
            <td style="text-align: center; padding: 4px; color: #008000; font-weight: bold;">+8.4</td>
            <td style="text-align: center; padding: 4px; color: #008000;">+6.3</td>
            <td style="text-align: center; padding: 4px; color: #008000; font-weight: bold;">+10.7</td>
            <td style="text-align: center; padding: 4px; color: #008000; font-weight: bold;">+20.0</td>
            <td style="text-align: center; padding: 4px; color: #c80000;">-5.7</td>
            <td style="text-align: center; padding: 4px; color: #008000;">+14.0</td>
            <td style="text-align: center; padding: 4px; color: #c80000;">-3.2</td>
            <td style="text-align: center; padding: 4px; color: #008000;">+9.7</td>
            <td style="text-align: center; padding: 4px; color: #008000;">+4.9</td>
            <td style="text-align: center; padding: 4px; color: #008000;">+1.6</td>
            <td style="text-align: center; padding: 4px; color: #008000; font-weight: bold;">+26.4</td>
          </tr>
          <tr style="border-top: 1px solid #ddd;">
            <td style="padding: 4px 8px;">LLaVA-OneVision 72B</td>
            <td style="text-align: center; padding: 4px;"><strong>40.9</strong></td>
            <td style="text-align: center; padding: 4px;"><strong>42.5</strong></td>
            <td style="text-align: center; padding: 4px;">39.3</td>
            <td style="text-align: center; padding: 4px;">25.2</td>
            <td style="text-align: center; padding: 4px;"><strong>57.0</strong></td>
            <td style="text-align: center; padding: 4px;"><strong>41.8</strong></td>
            <td style="text-align: center; padding: 4px;">46.1</td>
            <td style="text-align: center; padding: 4px;">42.8</td>
            <td style="text-align: center; padding: 4px;">34.9</td>
            <td style="text-align: center; padding: 4px;"><strong>32.0</strong></td>
            <td style="text-align: center; padding: 4px;">47.6</td>
          </tr>
          <tr>
            <td style="padding: 4px 8px;">LLaVA-OneVision 7B</td>
            <td style="text-align: center; padding: 4px;">35.0</td>
            <td style="text-align: center; padding: 4px;">34.7</td>
            <td style="text-align: center; padding: 4px;">35.3</td>
            <td style="text-align: center; padding: 4px;">14.8</td>
            <td style="text-align: center; padding: 4px;">47.6</td>
            <td style="text-align: center; padding: 4px;">23.1</td>
            <td style="text-align: center; padding: 4px;"><strong>53.2</strong></td>
            <td style="text-align: center; padding: 4px;">43.4</td>
            <td style="text-align: center; padding: 4px;">38.4</td>
            <td style="text-align: center; padding: 4px;">31.4</td>
            <td style="text-align: center; padding: 4px;">27.8</td>
          </tr>
          <tr style="background-color: #e6f2ff;">
            <td style="padding: 4px 8px; padding-left: 24px;">+ 25k SIMS-V 3Q</td>
            <td style="text-align: center; padding: 4px;">40.4</td>
            <td style="text-align: center; padding: 4px;">39.1</td>
            <td style="text-align: center; padding: 4px;"><strong>41.8</strong></td>
            <td style="text-align: center; padding: 4px;"><strong>31.2</strong></td>
            <td style="text-align: center; padding: 4px;">44.9</td>
            <td style="text-align: center; padding: 4px;">29.1</td>
            <td style="text-align: center; padding: 4px;">51.0</td>
            <td style="text-align: center; padding: 4px;"><strong>44.4</strong></td>
            <td style="text-align: center; padding: 4px;"><strong>45.1</strong></td>
            <td style="text-align: center; padding: 4px;">28.9</td>
            <td style="text-align: center; padding: 4px;"><strong>48.9</strong></td>
          </tr>
          <tr style="background-color: #f5f5f5; border-bottom: 2px solid #333;">
            <td style="padding: 4px 8px; padding-left: 24px; color: #666; font-style: italic;">Δ Improvement</td>
            <td style="text-align: center; padding: 4px; color: #008000;">+5.4</td>
            <td style="text-align: center; padding: 4px; color: #008000;">+4.4</td>
            <td style="text-align: center; padding: 4px; color: #008000;">+6.6</td>
            <td style="text-align: center; padding: 4px; color: #008000; font-weight: bold;">+16.4</td>
            <td style="text-align: center; padding: 4px; color: #c80000;">-2.7</td>
            <td style="text-align: center; padding: 4px; color: #008000;">+6.0</td>
            <td style="text-align: center; padding: 4px; color: #c80000;">-2.2</td>
            <td style="text-align: center; padding: 4px; color: #008000;">+1.0</td>
            <td style="text-align: center; padding: 4px; color: #008000;">+6.7</td>
            <td style="text-align: center; padding: 4px; color: #c80000;">-2.5</td>
            <td style="text-align: center; padding: 4px; color: #008000; font-weight: bold;">+21.1</td>
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
  <p>Spatial concepts learned in simulated indoor environments transfer to new domains, including embodied reasoning (OpenEQA <b>+8.6%</b>) and real-world outdoor images (MMRealWorld <b>+4.5%</b>).</p>
</aside>

<p>To verify that our spatial-focused training does not degrade general capabilities, we evaluated on diverse benchmarks. We found that our approach maintains stable performance on general video understanding tasks like VideoMME and EgoSchema. More importantly, it shows strong positive transfer to new spatial domains, demonstrating that the learned spatial understanding generalizes beyond the indoor training environment.</p>

<d-figure class="l-body-outset">
  <figure>
    <div class="responsive-table-wrapper">
      <table class="results-table medium">
        <thead>
          <tr style="border-bottom: 2px solid #333;">
            <th style="text-align: left; padding: 8px;">Model</th>
            <th style="text-align: center; padding: 8px;">VSI-B</th>
            <th style="text-align: center; padding: 8px;">VSI-B<sup>Deb.</sup></th>
            <th style="text-align: center; padding: 8px;">OpenEQA</th>
            <th style="text-align: center; padding: 8px;">MME.RW<sup>lite</sup></th>
            <th style="text-align: center; padding: 8px;">EgoSchema</th>
            <th style="text-align: center; padding: 8px;">Video<sup>MME</sup></th>
          </tr>
        </thead>
      <tbody>
        <!-- Proprietary Models -->
        <tr style="background-color: #f0f4f8; border-top: 1px solid #333;">
          <td colspan="7" style="padding: 6px 8px; font-style: italic;"><strong>Proprietary Models</strong></td>
        </tr>
        <tr>
          <td style="padding: 6px 8px;">GPT-4o</td>
          <td style="text-align: center; padding: 6px 8px;">34.0</td>
          <td style="text-align: center; padding: 6px 8px;">—</td>
          <td style="text-align: center; padding: 6px 8px;">—</td>
          <td style="text-align: center; padding: 6px 8px;">—</td>
          <td style="text-align: center; padding: 6px 8px;">—</td>
          <td style="text-align: center; padding: 6px 8px;">71.9</td>
        </tr>
        <tr>
          <td style="padding: 6px 8px;">Gemini-1.5-Pro</td>
          <td style="text-align: center; padding: 6px 8px;">45.4</td>
          <td style="text-align: center; padding: 6px 8px;">40.1</td>
          <td style="text-align: center; padding: 6px 8px;">—</td>
          <td style="text-align: center; padding: 6px 8px;">—</td>
          <td style="text-align: center; padding: 6px 8px;">72.2</td>
          <td style="text-align: center; padding: 6px 8px;">75.0</td>
        </tr>
        <tr>
          <td style="padding: 6px 8px;">Gemini-2.5 Pro</td>
          <td style="text-align: center; padding: 6px 8px;">51.5</td>
          <td style="text-align: center; padding: 6px 8px;">49.1</td>
          <td style="text-align: center; padding: 6px 8px;">—</td>
          <td style="text-align: center; padding: 6px 8px;">—</td>
          <td style="text-align: center; padding: 6px 8px;">—</td>
          <td style="text-align: center; padding: 6px 8px;">—</td>
        </tr>
        <!-- Open-Source Models -->
        <tr style="background-color: #f0f4f8; border-top: 1px solid #333;">
          <td colspan="7" style="padding: 6px 8px; font-style: italic;"><strong>Open-Source Models</strong></td>
        </tr>
        <tr>
          <td style="padding: 6px 8px;">LLaVA-Video 72B</td>
          <td style="text-align: center; padding: 6px 8px;">41.2</td>
          <td style="text-align: center; padding: 6px 8px;">36.8</td>
          <td style="text-align: center; padding: 6px 8px;"><strong>43.8</strong></td>
          <td style="text-align: center; padding: 6px 8px;">36.0</td>
          <td style="text-align: center; padding: 6px 8px;"><strong>66.7</strong></td>
          <td style="text-align: center; padding: 6px 8px;"><strong>68.8</strong></td>
        </tr>
        <tr>
          <td style="padding: 6px 8px;">LLaVA-OneVision 72B</td>
          <td style="text-align: center; padding: 6px 8px;">40.9</td>
          <td style="text-align: center; padding: 6px 8px;">35.6</td>
          <td style="text-align: center; padding: 6px 8px;">43.0</td>
          <td style="text-align: center; padding: 6px 8px;">48.2</td>
          <td style="text-align: center; padding: 6px 8px;">62.8</td>
          <td style="text-align: center; padding: 6px 8px;">66.7</td>
        </tr>
        <tr style="border-top: 1px solid #ddd;">
          <td style="padding: 6px 8px;">InternVL2.5 8B</td>
          <td style="text-align: center; padding: 6px 8px;">34.6</td>
          <td style="text-align: center; padding: 6px 8px;">24.9</td>
          <td style="text-align: center; padding: 6px 8px;">—</td>
          <td style="text-align: center; padding: 6px 8px;">—</td>
          <td style="text-align: center; padding: 6px 8px;">50.6</td>
          <td style="text-align: center; padding: 6px 8px;">64.2</td>
        </tr>
        <tr>
          <td style="padding: 6px 8px;">Qwen-VL-2.5 7B</td>
          <td style="text-align: center; padding: 6px 8px;">33.5</td>
          <td style="text-align: center; padding: 6px 8px;">29.6</td>
          <td style="text-align: center; padding: 6px 8px;">—</td>
          <td style="text-align: center; padding: 6px 8px;">—</td>
          <td style="text-align: center; padding: 6px 8px;">65.0</td>
          <td style="text-align: center; padding: 6px 8px;">65.1</td>
        </tr>
        <tr style="border-top: 1px solid #ddd;">
          <td style="padding: 6px 8px;">LLaVA-Video 7B</td>
          <td style="text-align: center; padding: 6px 8px;">36.0</td>
          <td style="text-align: center; padding: 6px 8px;">30.7</td>
          <td style="text-align: center; padding: 6px 8px;">34.6</td>
          <td style="text-align: center; padding: 6px 8px;">35.2</td>
          <td style="text-align: center; padding: 6px 8px;">56.9</td>
          <td style="text-align: center; padding: 6px 8px;">63.3</td>
        </tr>
        <tr>
          <td style="padding: 6px 8px; padding-left: 24px;">+ 25k SIMS-V 3Q</td>
          <td style="text-align: center; padding: 6px 8px;"><strong>44.4</strong></td>
          <td style="text-align: center; padding: 6px 8px;"><strong>38.4</strong></td>
          <td style="text-align: center; padding: 6px 8px;">43.2</td>
          <td style="text-align: center; padding: 6px 8px;">39.7</td>
          <td style="text-align: center; padding: 6px 8px;">59.1</td>
          <td style="text-align: center; padding: 6px 8px;">63.1</td>
        </tr>
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 6px 8px; padding-left: 24px; color: #666; font-style: italic;">Δ Improvement</td>
          <td style="text-align: center; padding: 6px 8px; color: #008000;">+8.4</td>
          <td style="text-align: center; padding: 6px 8px; color: #008000;">+7.7</td>
          <td style="text-align: center; padding: 6px 8px; color: #008000;">+8.6</td>
          <td style="text-align: center; padding: 6px 8px; color: #008000;">+4.5</td>
          <td style="text-align: center; padding: 6px 8px; color: #008000;">+2.2</td>
          <td style="text-align: center; padding: 6px 8px; color: #c80000;">-0.2</td>
        </tr>
        <tr style="border-top: 1px solid #ddd;">
          <td style="padding: 6px 8px;">LLaVA-OneVision 7B</td>
          <td style="text-align: center; padding: 6px 8px;">35.0</td>
          <td style="text-align: center; padding: 6px 8px;">28.5</td>
          <td style="text-align: center; padding: 6px 8px;">42.1</td>
          <td style="text-align: center; padding: 6px 8px;">48.6</td>
          <td style="text-align: center; padding: 6px 8px;">60.8</td>
          <td style="text-align: center; padding: 6px 8px;">58.3</td>
        </tr>
        <tr>
          <td style="padding: 6px 8px; padding-left: 24px;">+ 25k SIMS-V 3Q</td>
          <td style="text-align: center; padding: 6px 8px;">40.4</td>
          <td style="text-align: center; padding: 6px 8px;">33.9</td>
          <td style="text-align: center; padding: 6px 8px;">42.2</td>
          <td style="text-align: center; padding: 6px 8px;"><strong>49.7</strong></td>
          <td style="text-align: center; padding: 6px 8px;">60.5</td>
          <td style="text-align: center; padding: 6px 8px;">59.0</td>
        </tr>
        <tr style="background-color: #f5f5f5; border-bottom: 2px solid #333;">
          <td style="padding: 6px 8px; padding-left: 24px; color: #666; font-style: italic;">Δ Improvement</td>
          <td style="text-align: center; padding: 6px 8px; color: #008000;">+5.4</td>
          <td style="text-align: center; padding: 6px 8px; color: #008000;">+5.4</td>
          <td style="text-align: center; padding: 6px 8px; color: #008000;">+0.1</td>
          <td style="text-align: center; padding: 6px 8px; color: #008000;">+1.1</td>
          <td style="text-align: center; padding: 6px 8px; color: #c80000;">-0.3</td>
          <td style="text-align: center; padding: 6px 8px; color: #008000;">+0.7</td>
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

