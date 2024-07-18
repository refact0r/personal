---
published: true
name: 'attention is all you need'
icon: 'ph:files'
description: a revolutionary neural network architecture
date: 2024-06-02
---

<script>
    import CaptionImage from '$lib/components/CaptionImage.svelte';
    import Icon from '~icons/ph/files';
</script>

**_Attention is All You Need_** is a paper published in 2017 by Google Brain researchers. It introduced a new type of neural network architecture called the Transformer. Since then, the Transformer model has revolutionized the field of machine learning, especially in regards to natural language processing.

## context

In an older [post](/blog/imagenet), I discussed some basic machine learning concepts and how convolutional neural networks (CNNs) are used for image classification. However, for tasks like language translation and text generation, **Recurrent Neural Networks (RNNs)** were more commonly used before the Transformer model.

### RNNs

RNNs themselves are an improvement on older feedforward neural networks because they can maintain a "memory" of previous inputs. The basic structure of an RNN consists of an input layer, a hidden layer with recurrent (looped) connections that maintains state, and an output layer. In an RNN, an input sequence is processed sequentially, one element at a time. This makes RNNs slow and computationally expensive, especially for long sequences.

The desire to reduce the sequential nature of RNNs led to the creation of models that use CNNs to compute hidden states in parallel. However, these models still struggle to capture long-range dependencies in sequences. For example, in the sentence "the cat was purring because it was happy," the word "it" refers to "the cat," but is separated by several words, making it more difficult to connect the two.

### attention mechanism

An **attention mechanism** allows a neural network model to focus on the most relevant parts of the input data. It works by assigning weights to different parts of the input, indicating their importance to the current task. At each step, the model can dynamically focus on different parts of the input sequence. For example, in the sentence "the cat was purring because it was happy," the model would assign higher weights to "cat" and "happy" when generating for the word "it".

By using attention, models can better capture long-range dependencies and handle varying-length sequences. Because of this, attention mechanisms were typically used in conjunction with RNNs to improve their performance.

## transformer

The Transformer model was the first to rely entirely on attention mechanisms for computation. It consists of an encoder and a decoder, each composed of 6 layers.

<CaptionImage image="transformer-diagram.png" alt="diagram of the Transformer architecture." source="https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf" sizes="50rem" loading="lazy"/>

## embeddings

The Transformer model uses embeddings to convert input tokens, such as words or characters, into vectors. These embeddings are learned during training and allow the model to represent the input data in a continuous vector space. After the embedings are created, they are passed to the encoder and decoder.

## positional encoding

The Transformer model does not have a built-in way to account for the order of words in the input sequence. To address this, "positional encodings" are added to the input embeddings, representing the position of each token in the sequence. These encodings are calculated using sine and cosine functions of different frequencies.

## encoder

The encoder processes the input embeddings. Each of the 6 encoder layers consists of 2 sublayers: a multi-head self-attention mechanism and a feedforward neural network (FFN).

- The self-attention mechanism allows the model to weigh different parts of the input sequence as described earlier, capturing important context and dependencies.
- The feedforward neural network processes the output of the self-attention mechanism.

The output of each layer is passed to the next layer. The output of the final encoder layer consists of a sequence of vectors that encode the input sequence's meaning.

## decoder

The decoder produces the output sequence using the encoder's output. Each of the 6 decoder layers consists of 3 sublayers: a masked multi-head self-attention mechanism, a multi-head attention mechanism, and a feedforward neural network.

- The masked multi-head self-attention mechanism is similar to the self-attention mechanism in the encoder, but has a mask that ensures that predictions are made based only on previous tokens.
- The multi-head attention mechanism operates on the encoder's output, allowing the decoder to focus on relevant parts of the input sequence.
- The feedforward neural network processes the output, similar to the encoder.

## attention

Mathematically, the attention mechanism can be described as function. Given a query vector and a set of key-value vector pairs, the attention function computes a weighted sum of the values based on the similarity between the query and the keys.

### scaled dot-product attention

The Transformer model uses a scaled dot-product attention function. This works by first taking the dot product of the query with each key. The result is then divided by the square root of the dimension of the key vectors, which ensures that the dot products do not get too large. Finally, the softmax function is applied to transform the scores into weights that sum to 1.

Normally, the queries, keys, and values are vectors. However, in the Transformer model, they are grouped into matrices so that multiple queries can be computed in parallel.

### multi-head attention

The authors of the paper further refined the attention mechanism by introducing multi-head attention. Instead of using a single attention function, the model uses multiple attention functions in parallel. The input queries, keys, and values are linearly projected 8 times to create 8 different representations. Each of these representations is then calculated simultaneously. The results are concatenated and linearly projected again to produce the final output.

Multi-head attention improves the performance of the model by allowing it to focus on different parts of the input sequence simultaneously. The computational cost is actually similar to that of single-head attention because each head has reduced dimensions.

## feedforward neural network

The FFN in the Transformer model consists of 2 linear transformations with a ReLU activation function in between. THe purpose of the FFN is to introduce non-linearity and allow the model to learn complex relationships in the data that cannot be captured by the attention mechanism alone.

## the final layer

The final layer of the decoder is a linear transformation followed by a softmax function. This takes the vector output of the decoder and converts it into probabilities for each token or word in the output vocabulary. The model can then select the token with the highest probability as the next output, known as "greedy decoding". There are also other decoding strategies, such as beam search, that can generate more diverse outputs.

## conclusion

The Transformer model introduced a new neural network architecture that relies on attention mechanisms. This reduces complexity and allows for more parallel processing, which improves performance compared to traditional RNN or CNN-based models. The approach also allows the model to better capture long-range dependencies in sequences, making it better at language-related tasks. The Transformer model in the paper was able to achieve state-of-the-art results on language translation tasks.

Since the publication of the paper, the Transformer model has been widely adopted. Later models, such as BERT and GPT, built on the Transformer architecture and have achieved even greater success. Today, GPTs have truly gone mainstream, with applications in chatbots, content generation, and more.

To me, it is fascinating how a process that is essentially a series of matrix and vector operations can produce real, meaningful language. There is no "understanding", but the model can generate coherent and relevant text simply by learning the patterns of language data. The Transformer model also demonstrated that often important breakthroughs come not from entirely new ideas, but from clever combinations and refinements of existing concepts. Often, a simpler approach can be more effective than a complex one.

## source

<https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf>

<br>

---

### why did I write this?

This blog post is one of my "papers" posts (labelled with this icon: <Icon class="icon" />). My goal is to read, summarize, and comment on influential or interesting papers in computer science. I want to gain a deeper understanding of topics within the field and improve my communication skills. Hopefully, these posts will be interesting and informative to others as well. Thanks for reading!

---
