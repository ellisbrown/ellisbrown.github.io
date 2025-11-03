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

<d-figure>
  <figure>
    <img src="/assets/img/sims-v-table-1.png" alt="A table showing VSI-Bench performance. The LLaVA-Video 7B + SIMS-V 3Q model achieves 44.4%, outperforming GPT-4o and LLaVA-Video 72B.">
    TODO: add html table
    <figcaption>
      <b>Table 1: VSI-Bench Performance.</b>
      Our 7B model fine-tuned on 25K SIMS-V examples achieves competitive performance with large proprietary models, demonstrating effective spatial transfer to real-world videos.
    </figcaption>
  </figure>
</d-figure>

### Finding 3: Learned skills transfer to diverse spatial tasks.

<aside>
  <p>Spatial concepts learned in simulated indoor environments transfer to new domains, including embodied reasoning (OpenEQA <b>+8.6%</b>) and real-world outdoor images (MMRealWorld <b>+4.5%</b>).</p>
</aside>

<p>To verify that our spatial-focused training does not degrade general capabilities, we evaluated on diverse benchmarks. We found that our approach maintains stable performance on general video understanding tasks like VideoMME and EgoSchema. More importantly, it shows strong positive transfer to new spatial domains, demonstrating that the learned spatial understanding generalizes beyond the indoor training environment.</p>

<d-figure>
  <figure>
    <img src="/assets/img/sims-v-table-3.png" alt="A table showing generalization performance. The SIMS-V trained model shows an 8.6% improvement on OpenEQA and 4.5% on MME.RWlite.">
    TODO: add html table
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

