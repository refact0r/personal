---
published: true
name: 'imagenet classification with deep convolutional neural networks'
icon: 'ph:files'
description: a breakthrough computer vision neural network
date: 2024-03-24
---

<script>
    import CaptionImage from '$lib/components/CaptionImage.svelte';
    import Icon from '~icons/ph/files';
</script>

**_ImageNet Classification with Deep Convolutional Neural Networks_** was published in 2012 by Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton. It introduced the AlexNet architecture, which won the ImageNet Large Scale Visual Recognition Challenge in 2012 by a large margin. The paper is considered one of the most influential papers in the fields of deep learning and computer vision because it demonstrated the power of neural networks for image classification tasks.

## context

When I first read this paper, I was a bit overwhelmed by the technical terms and concepts. Here are some basic definitions and explanations.

The field of **machine learning** focuses on computer algorithms that can learn from and make decisions based on data. **Deep learning** is a subfield of machine learning that focuses on neural networks with multiple layers. **Neural networks** are algorithms inspired by the structure of the human brain. Neural networks consist of interconnected "neurons". These artificial neurons take input data, perform operations on it, and produce output that is passed to other neurons.

Neural networks can "learn" from data in a process called **training**. During training, the network is given input data along with the correct output. For example, an image of a cat labeled as "cat". The network attempts to predict the correct label based on the input image. If the prediction is incorrect, the network determines how far off it was. Through a process called backpropagation, the network adjusts its internal parameters to minimize the error. This process is repeated many times until the network can accurately predict the correct output for a given input.

**Convolutional neural networks (CNNs)** are a type of neural network that are well-suited for image classification tasks. They are called "convolutional" because they use a mathematical operation called convolution to process the input data. CNNs are composed of layers of neurons that process data in a hierarchical manner. For images, the first layers of a CNN learn to detect simple features like edges and corners, while later layers learn to detect more complex features like shapes and textures. These features are then combined to make a final prediction about the image.

## the challenge

The **ImageNet dataset** contains millions of labeled images in different categories. Interestingly, the paper mentions the dataset was labeled using Amazon Mechanical Turk, a crowdsourcing platform that pays people to perform tasks that are difficult for computers to do. This highlights that while machine algorithms are powerful, they still rely on humans to learn.

The **ImageNet Large Scale Visual Recognition Challenge (ILSVRC)** is an annual competition where researchers compete to build the best image classification algorithms. It involves classifying images from the ImageNet set into one of 1000 categories. Researchers were given a subset of the dataset for training and a separate subset for testing. The goal was to build a model that could accurately classify images in the test set.

ImageNet contains images in a variety of resolutions, so the authors of the paper had to process the images to a fixed size of 256x256 pixels. They also centered the RGB values of the pixels around zero.

## the architecture

The AlexNet architecture consists of 5 convolutional layers followed by 3 fully-connected layers. The convolutional layers are responsible for learning and detecting features, while the fully connected layers are responsible for making the final classification.

<CaptionImage image="alexnet-diagram.png" alt="diagram of the AlexNet architecture." source="https://www.pinecone.io/learn/series/image-search/imagenet/" sizes="50rem" loading="lazy"/>

The diagram above illustrates the AlexNet architecture. You can see the flow of data through the network, from the input image, through 8 layers, to the final output. The numbers represent the dimensions of the data at each layer. The two rows represent the split between the two GPUs that were used for the network.

<CaptionImage image="layer.png" alt="kernels from the first convolutional layer of AlexNet." source="https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf" sizes="50rem" loading="lazy"/>

The image above shows the 11x11x3 kernels, or filters, from the first convolutional layer of AlexNet. You can see how they learn to detect basic features like edges and patterns.

The authors chose to use Rectified Linear Units (ReLU) as the activation function for the neurons. ReLU is a simple function that returns the input if it is positive, and zero otherwise. It allows the network to learn faster compared to using other activation functions.

The network uses a local response normalization (LRN) layer. Normalization scales the output of the neurons to prevent them from becoming too large. This encourages "competition" between neurons, which helps the network learn more diverse and robust features. It also helps prevent overfitting, which will be discussed later.

The network also uses pooling layers, which summarize the outputs of neighboring groups of neurons. Pooling helps reduce the dimensions of the data, making the network more efficient. Specifically, the network uses overlapping pooling, where the pooling regions are allowed to overlap. This helps the network better capture small details and translations in the input images.

The ImageNet paper was not the first to describe using GPUs for training neural networks, but it was one of the first to demonstrate their power for deep learning. The network was spread across two NVIDIA GTX 580 GPUs, with each GPU processing a portion of the data in parallel. This allowed the network to train much faster than if it were trained on a CPU. Still, training the network on 1.2 million images took 5-6 days. With modern GPUs, training a similar network would take a fraction of the time. However, modern networks are much larger and more complex, so training times are often even longer.

## overfitting

One of the challenges in training neural networks is **overfitting**. Overfitting is when the network learns to specifically memorize the training data, rather than generalize for new data. This can happen when the network is very complex relative to its training data. The authors of the paper had to deal with considerable overfitting because of AlexNet's 60 million parameters. Compared to modern large language models (GPT-4 is rumored to have 1.8 trillion parameters), this seems small, but in 2012 it was a significant number.

To combat overfitting, the authors used several techniques. First, they used **data augmentation**, which involves altering the training dataset to make it larger. One method they used was extracting random 224x224 patches from the 256x256 images. The patches were also horizontally mirrored. This increased the size of the training set by a factor of 2048. Another method they used was altering RGB values, effectively producing multiple versions of the same image with slightly different colors. Apart from further enlarging the training set, this helped the network learn to be more robust to changes in lighting and color. Since these operations were done using the CPU, they did not slow down training on the GPU and were considered "computationally free".

The authors also used **dropout**, a technique where neurons are randomly "dropped out" during training by setting their outputs to zero. This prevents neurons and the network as a whole from relying too heavily on any one neuron. As a result, it forces the network to become more robust and reduces overfitting.

## conclusion

By combining 7 CNNs, the AlexNet architecture achieved a top-5 error rate of 15.3% on the ImageNet dataset. This means that the network's top 5 predictions for an image included the correct label 84.7% of the time. This was a significant improvement over the previous best, which had a top-5 error rate of 26.2%. The network also achieved a top-1 error rate of 36.7%, meaning the correct label was the network's top prediction 62.5% of the time.

The authors conclude that the success of AlexNet was due to the combination of a large dataset and a deep neural network. They state that if any middle layers of the network were removed, the performance would degrade significantly.

The paper demonstrated that deep learning could achieve state-of-the-art results on challenging computer vision tasks. It has sparked significant development in the fields of deep learning and computer vision since then.

As for me, reading this paper was a great learning experience. I knew what neural networks were, but I didn't know how they worked. Trying to understand this paper helped me learn how neural networks learn from data and create predictions. It also gave me a better understanding of the various challenges and techniques involved in optimizing neural networks, such as overfitting. Even though the paper is only a decade old, it has important historical context for the development of machine learning. Comparing it to the advanced models of today shows how far the field has come in such a short time.

## source

<https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf>

<br>

---

### why did I write this?

This blog post is one of my "papers" posts (labelled with this icon: <Icon class="icon" />). My goal is to read, summarize, and comment on influential or interesting papers in computer science. I want to gain a deeper understanding of topics within the field and improve my communication skills. Hopefully, these posts will be interesting and informative to others as well. Thanks for reading!

---
