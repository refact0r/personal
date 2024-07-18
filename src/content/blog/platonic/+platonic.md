---
published: true
name: 'the platonic representation hypothesis'
icon: 'ph:files'
description: the theory that AI models converge on shared model of reality
date: 2024-06-22
---

<script>
    import Icon from '~icons/ph/files';
</script>

**_The Platonic Representation Hypothesis_** is a paper published this year by MIT researchers. It proposes the idea that as AI models become more complex and powerful, they will converge on a shared representation of reality. The paper cites evidence of this convergence, demonstrates the concept on a theoretical level, and discusses its implications.

## context

Recently, AI systems have become increasingly multifunctional. Whereas early AI models were designed for specific tasks, such as image recognition or language translation, modern models are capable of performing a wide range of tasks. For example, OpenAI's latest GPT-4o model can process text, audio, image, and video inputs and generate outputs in multiple forms as well. Instead of using separate models for each task, newer systems like GPT-4o use a unified architecture. The authors of the paper argue that at least part of this trend is due to convergence on a shared representation of reality.

## the hypothesis

> "neural networks, trained with different objectives on different data and modalities, are converging to a shared statistical model of reality in their representation spaces."

Essentially, the hypothesis posits that as AI models are trained on diverse datasets and tasks, they learn to represent reality in a similar way. This shared representation is not tied to any specific task but rather reflects the fundamental properties of the environment.

The authors coined the term "platonic representation" to describe this shared model. This references Plato's allegory of the cave, where prisoners perceive shadows on a wall but do not see the true forms that cast the shadows. In this analogy, the models are the prisoners, the training data is the shadows, and the platonic representation is the true form that the models converge towards.

## comparing representations

The paper focuses on representations that are vector embeddings. A vector embedding is a technique used in machine learning to represent complex data (such as words, images, or concepts) as high-dimensional vectors of real numbers.

To compare vector embeddings across different models, the authors used the concept of kernels. A kernel is a function that measures the similarity or distance between datapoints within a representation space. A kernel-alignment metric can be used to compare the similarity of kernels across different models and thereby assess the alignment of their representations. The authors specifically chose to use the mutual nearest-neighbor metric.

## evidence for the hypothesis

### model stitching

The first piece of evidence for the hypothesis comes from a study that employed a technique called model stitching. Essentially, a layer from one model is "stitched" into another model through a learned stitching layer. If the resulting stitched model performs well, it suggests that the two original models have similar representations. This was shown to be the case for models trained on different datasets. Other studies expanded on this idea, demonstrating that the learned stitching layer was not necessarily required, among other findings.

### model size and alignment

The authors also compared the size and performance of models against their alignment. After comparing 78 models, they found that larger models tended to have more aligned representations. This suggests that as models grow in size and complexity, they converge towards a shared representation.

### cross-modal alignment

The convergence on shared representations is not limited to the same type of model. The paper cites research that found that a vision model can be stitched into a language model with good performance, and vice versa. Other research found that jointly training a language model with a vision model can lead to better performance than training the language model on its own.

Expanding on these findings, the authors measured the alignment between a variety of vision and language models. They used paired datasets, such as images from Wikipedia with their corresponding captions, to bridge the gap between modalities. They found that the better an LLM was, the more it aligned with vision models, and vice versa. This suggests that the shared representation is present across different modalities.

### alignment to humans?

Finally, the paper cites research that demonstrates models are increasingly aligned with human brains in some ways. This suggests that the representation convergence is universal and not limited to computational models.

## explaining the convergence

The paper includes several reasons for representation convergence, at different aspects of the optimization process.

The Multitask Scaling Hypothesis posits that as models are trained on more tasks, there are fewer possible representations that can solve all tasks. This leads to convergence on a shared representation.

### model capacity

The Capacity Hypothesis posits that larger AI models are more likely to converge on a shared, optimal representation of data. This convergence occurs because increased model capacity and improved optimization allows for better approximation of the globally optimal representation, regardless of differences in architecture or training.

### simplicity bias

The Simplicity Bias Hypothesis posits that neural networks are biased towards simpler representations, either due to explicit regularization or implicit optimization. Therefore, as models become more complex, they converge on simpler representations that are shared across models.

## convergence endpoint

If there is an optimal representation that models converge towards, what exactly is it? The paper attempts to answer this question by formally defining a point of convergence with mathematical statements (which are beyond the scope of this post).

The authors also conducted a case study on colors. They cite research that found that distances between colors in language models closely mirror distances in human color perception. And, as the models scaled larger and became better at modeling text, there was also increasing alignment with human color perception. This further supports the idea of an optimal representation.

## implications

There are quite a few interesting implications of the Platonic Representation Hypothesis.

### scaling models

As discussed earlier, scaling models can lead to better alignment with the optimal representation and thus better performance. However, the paper warns that scale alone is not enough, because different methods can scale with different levels of efficiency.

### cross-modal training

In terms of training AI models, it suggests that training data can be shared across modalities. For example, a vision model should be trained not only on images, but also on text data, and vice versa. In fact, this is already being done in practice.

### cross-modal adaptation

The cross-modal alignment also means that transitions across modalities can be smoother. This explains why models trained on one modality can adapt relatively easily to process representations from another, even without direct cross-modal training.

### hallucinations and bias

Lastly, the paper suggests that as AI models scale and converge towards a more accurate representation of reality, there may be a reduction in hallucinations and certain types of bias. However, the accuracy of the model is still dependent on the training data.

## limitations

An obvious issue is that not all information can be represented across modals. As the paper asks,

> "Can language really describe the ineffable experience of watching a total solar eclipse?

The authors argue that their hypothesis only applies to bijective representations, where the same information can be represented in different modalities. They suggest a modification, that convergence only occurs when the input data is sufficiently high information and the models are sufficiently large.

### other modalities

While vision and language models have shown alignment, there has not been similar alignment with other modalities, such as robotics. The authors suggest that this may be due to a lack of a standardized way of representing world states and a lack of high-quality data.

### sociological bias

Another consideration is sociological bias. The preferences of researchers and the AI community can shape the architecture and training of models. AI models may be biased to align with human reasoning and perception, even if other representations are possible. The limitations of current hardware and software may also restrict the types of representations that models can converge towards.

### specialized models

The paper also discusses that AI systems designed for specific tasks may not converge with general models. There may be a shared representation for general models, but there might be shortcuts or representations detached from reality that are more useful for specific tasks.

### methodological limitations

There are also some limiatations in the methods used to measure alignment. The mutual nearest-neighbor metric is still being debated, and it only measures the similarity of representations, not whether they are actually the same.

## conclusion

The Platonic Representation Hypothesis is a fascinating idea that suggests AI models are converging on a shared representation of reality. The evidence presented in the paper is compelling, and the implications are far-reaching. As AI models continue to grow in complexity and capability, it will be interesting to see how this convergence plays out in practice.

Personally, I find that the idea of a shared representation of reality quite intriguing. It raises questions about the nature of intelligence. Is there a universal way to achieve intelligence, or are AI models simply converging on local optima? I think this hypothesis not only has implications for AI research but also for philosophy and our understanding of the world.

## source

<https://arxiv.org/pdf/2405.07987>

<br>

---

### why did I write this?

This blog post is one of my "papers" posts (labelled with this icon: <Icon class="icon" />). My goal is to read, summarize, and comment on influential or interesting papers in computer science. I want to gain a deeper understanding of topics within the field and improve my communication skills. Hopefully, these posts will be interesting and informative to others as well. Thanks for reading!

---
