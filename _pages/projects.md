---
layout: collection
title: "projects"
permalink: "/projects/"
author_profile: true
classes: wide
---

<div class="project" markdown="1">
<div class="teaser">
<a href="https://live.juliacon.org/talk/FGUEAM">
<img src="/assets/files/projects/julia_firstorder.jpeg">
</a>
</div>
<div class="content">
<h1>Julia First Order Optimization<br>
<span>
Open-sourced two Julia packages for separable optimization problems
</span>
</h1>
<a href="https://www.nicholasmoehle.com/">Nicholas Moehle</a>, <b>Ellis Brown</b>, <a href="https://mykel.kochenderfer.com/">Mykel Kochenderfer</a>
<!-- </span> -->
<p>
Created a new Julia organization, <a href="https://www.github.com/JuliaFirstOrder">JuliaFirstOrder</a>, dedicated to first-order optimization methods.
<a href="https://www.github.com/JuliaFirstOrder/PiecewiseQuadratics.jl">PiecewiseQuadratics.jl</a>
allows for the representation and manipulation of piecewise-quadratic functions, including the computation of the proximal operator and the convex envelope.
<a href="https://www.github.com/JuliaFirstOrder/SeparableOptimization.jl"> SeparableOptimization.jl</a>
solves the problem of minimizing a sum of piecewise-quadratic functions subject to affine equality constraints by applying the Alternating Direction Method of Multipliers (ADMM).
Presented at JuliaCon 2021.
<!-- <ul style="margin: 0;">
  <li><a href="https://www.github.com/JuliaFirstOrder/PiecewiseQuadratics.jl">PiecewiseQuadratics.jl</a> Allows for the representation and manipulation of piecewise-quadratic functions, including the computation of the proximal operator and the convex envelope.</li>
  <li><a href="https://www.github.com/JuliaFirstOrder/SeparableOptimization.jl"> SeparableOptimization.jl</a>Solves the problem of minimizing a sum of piecewise-quadratic functions subject to affine equality constraints by applying the Alternating Direction Method of Multipliers (ADMM).</li>
  <li>Presented at JuliaCon 2021</li>
</ul> -->
</p>
<a href="https://www.github.com/JuliaFirstOrder/SeparableOptimization.jl" class="button">SeparableOptimization.jl</a>
<a href="https://www.github.com/JuliaFirstOrder/PiecewiseQuadratics.jl" class="button">PiecewiseQuadratics.jl</a>
<a href="https://live.juliacon.org/talk/FGUEAM" class="button">Talk</a>
<a href="https://medium.com/blackrock-engineering/open-source-julia-packages-for-first-order-optimization-ac51f0f1aa09" class="button">Blog</a>
<span class="date">Jul 2021</span>
</div>
</div>


<div class="project">
<div class="teaser">
<a href="http://www.github.com/amdegroot/ssd.pytorch">
<img src="/assets/files/projects/ssd.png">
</a>
</div>
<div class="content">
<h1>ssd.pytorch<br>
<span>Single Shot MultiBox Object Detector (SSD), in PyTorch</span>
</h1>
<p>Implented SSD, a unified framework for real-time object detection using a single network. Has become the de facto implementation in PyTorch (4.5k+ stars).</p>
<a href="http://arxiv.org/abs/1512.02325v5" class="button">Original Paper</a>
<a href="http://www.github.com/amdegroot/ssd.pytorch" class="button">Code</a>
<span class="date">Mar 2017</span>
</div>
</div>


<div class="project">
<div class="teaser">
<a href="/assets/files/presentations/2019_bnn_uncertainty_aises_poster.pdf">
<img src="/assets/files/projects/bnn.png">
</a>
</div>
<div class="content">
<h1>BNN-Uncertainty<br>
<span>Keras implementation of a Bayesian Neural Network with dropout</span>
</h1>
<p>Experiments investigating the effect of weight prior selection and network architecture on uncertainty estimates.</p>
<a href="/assets/files/presentations/2019_bnn_uncertainty_aises_poster.pdf" class="button">Poster</a>
<a href="http://www.github.com/ellisbrown/BNN-Uncertainty" class="button">Code</a>
<span class="date">May 2019</span>
</div>
</div>

<div class="project">
<div class="teaser">
<a href="https://towardsdatascience.com/name2gender-introduction-626d89378fb0">
<img src="/assets/files/projects/name2gender.png">
</a>
</div>
<div class="content">
<h1>Name2Gender<br>
<span>Gender Inference from Character Sequences in Multinational First Names</span>
</h1>
<p>Used Naïve-Bayes and a Char-RNN implemented in PyTorch to extrapolate gender from character sequences in first names from around the world. This was both an excercise in becoming more familiar with RNNs for NLP and in conveying the underlying problem to a general audience via the blog post.</p>
<a href="/nlp/name2gender-introduction/" class="button">Blog</a>
<a href="http://www.github.com/ellisbrown/name2gender" class="button">Code</a>
<span class="date">Dec 2017</span>
</div>
</div>


<div class="project">
<div class="teaser">
<a href="http://www.github.com/amdegroot/deepgenres.torch">
<img src="/assets/files/projects/deepgenres.png">
</a>
</div>
<div class="content">
<h1>
DeepGenres.Torch
<br>
<span class="subtitle">
Music Genre Classification from 3 second clips, in Torch
</span>
</h1>
<p>A deep learning method for automatically labeling songs by genre using Torch. We convert audio files to spectrograms and process them as images. The primary reason for creating this was to become more familiar with deep learning on audio input.</p>
<a href="http://www.github.com/amdegroot/deepgenres.torch" class="button">Code</a>
<span class="date">Mar 2017</span>
</div>
</div>
