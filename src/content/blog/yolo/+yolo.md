---
published: true
name: 'you only look once'
icon: 'ph:files'
description: real-time object detection using a single neural network 
date: 2024-07-02
---

<script>
    import CaptionImage from '$lib/components/CaptionImage.svelte';
    import Icon from '~icons/ph/files';
</script>

**_You Only Look Once: Unified, Real-Time Object Detection_** is a paper published in 2016 by researchers at the University of Washington. The paper introduces a new approach to object detection that is both faster and more accurate than existing methods by using a single neural network instead of complex pipelines.

## context

Object detection is a fundamental task in computer vision that involves identifying objects in images. Specifically, it involves drawing bounding boxes around objects and labeling them with a class (e.g. "car", "person", "dog").

<CaptionImage image="object-detection.jpg" alt="example of object detection." source="https://commons.wikimedia.org/wiki/File:Detected-with-YOLO--Schreibtisch-mit-Objekten.jpg" sizes="50rem"/>

Before the introduction of YOLO, object detection systems used a pipeline approach:

1. Generate region proposals (potential object locations)
2. Run a classifier on these proposals
3. Post-processing to refine the bounding boxes and remove duplicates

While effective, these multi-stage pipelines were slow, complex, and difficult to optimize because each component had to be trained separately.

## yolo

The YOLO approach simplifies object detection by framing it as a single regression problem. It utilizes a single convolutional neural network to predict bounding boxes and classes simultaneously. This offers several advantages:

1. **Speed**: YOLO is extremely fast, capable of processing images at 45 frames per second (FPS) with the base model and 150 FPS with the fast version. This makes it possible to process video streams in real-time.
2. **Awareness**: YOLO can understand the entire image at once, allowing it to consider context between objects, unlike region-based approaches.
3. **Generalization**: YOLO is better at learning generalizable representations. It is more accurate than previous methods when processing new or unexpected data.

## how it works

The YOLO system divides the input image into an S x S grid. Each grid cell predicts B bounding boxes for potential objects. Each bounding box consists of 5 predictions: x, y, w, h, and a confidence score. The x and y represent the coordinates of the center of the bounding box, while w and h represent the width and height. The confidence score reflects the accuracy of the bounding box and the likelihood that it contains an object.

Each grid cell also predicts C conditional class probabilities, representing the likelihood of each class being present in the grid cell (not bounding box!).

Finally, the class probabilities are multiplied by the bounding box confidence scores to get class-specific confidence scores. These represent the probability of a specific class being present in a bounding box and how well the box fits the object.

For evaluating YOLO on the PASCAL VOC test set, the authors used a 7 x 7 grid with 2 bounding boxes per grid cell and 20 classes. This means the final output would be a 7 x 7 x 30 tensor.

## architecture

The YOLO architecture is based on the GoogLeNet image classification model. It consists of 24 convolutional layers and 2 fully connected layers. The authors also created a faster version of YOLO with 9 convolutional layers and fewer filters. All layers of the network use a leaky rectified linear activation function, except for the output layer, which uses a linear activation function.

<CaptionImage image="yolo-architecture.png" alt="diagram of the YOLO architecture." source="https://arxiv.org/pdf/1506.02640" sizes="50rem" loading="lazy"/>

## training

The YOLO model was first pre-trained on the ImageNet classification dataset, with the first 20 convolutional layers. Then, the model is converted to perform detection. The remaining 4 convolutional layers and 2 fully connected layers are added at this point.

The model is optimized using sum-squared error. However, this presented issues due to treating all errors equally and potential instability from grid cells without objects. To address these issues, the authors introduced a multi-part loss function with weighted components. Additionally, they predict the squrae root of the bounding box dimensions to more strongly penalize errors in large boxes.

To avoid overfitting, the authors used dropout and data augmentation. They added a dropout layer between the 2 connected layers to prevent co-adaptation between them. Data augmentation involves random scaling and translation of the input images to increase the diversity of the training data.

## results

The authors compared YOLO's real-time performance to other object detection systems. YOLO was able to achieve far greater mAP (mean average precision) while also running at higher FPS than existing real-time systems like 30Hz DPM. Compared to more accurate systems like Faster R-CNN, YOLO had slightly lower mAP but ran at a much higher FPS.

On the VOC 2007 and 2012 datasets, YOLO achieved a mAP lower than the state-of-the-art. The authors note that compared to Fast R-CNN, YOLO made more localization errors but fewere background errors.

The authors also tried combining YOLO with Fast R-CNN. This resulted in a significant improvement in mAP that was close to the best performing systems.

To measure generalizability, the authors tested YOLO on the Picasso and People-Art datasets. Unlike R-CNN, YOLO only had a small drop in performance compared to the VOC dataset. This shows that YOLO is better at generalizing to new data.

## limitations

While YOLO was more efficient, it was still not as accurate as other methods. It struggled to precisely localize small objects, likely because each grid cell only predicts 2 bounding boxes. The model also struggled to generalize to objects in unusual aspect ratios or configurations, likely because it has multiple downsampling layers that reduce spatial resolution.

## conclusion

The YOLO model introduced a new approach to object detection that was much faster than existing methods. It was the first system to demonstrate real-time object detection with reasonable accuracy. While it had limitations, it showed the potential of using a single neural network for end-to-end object detection.

Subsequent versions of YOLO and models based on it have improved accuracy and speed, making it a popular choice for real-time object detection in applications like self-driving cars, surveillance, and robotics.

Personally, I find this paper interesting because it really clarifies the process of object detection. It's one of those processes that seems like magic until you understand the underlying mechanics, which are actually somewhat simple. The paper also highlights the power of rethinking traditional architectures to achieve better results. After reading the <a href="/blog/platonic/">Platonic Representation Hypothesis</a>, I wonder if similar breakthroughs will still be made in the future.

## source

<https://arxiv.org/pdf/1506.02640>

<br>

---

### why did I write this?

This blog post is one of my "papers" posts (labelled with this icon: <Icon class="icon" />). My goal is to read, summarize, and comment on influential or interesting papers in computer science. I want to gain a deeper understanding of topics within the field and improve my communication skills. Hopefully, these posts will be interesting and informative to others as well. Thanks for reading!

---
