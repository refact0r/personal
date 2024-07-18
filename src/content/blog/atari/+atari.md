---
published: true
name: 'playing atari with deep reinforcement learning'
icon: 'ph:files'
description: a deep learning model learns superhuman atari skills
date: 2024-07-10
---

<script>
    import CaptionImage from '$lib/components/CaptionImage.svelte';
    import Icon from '~icons/ph/files';
</script>

**_Playing Atari with Deep Reinforcement Learning_** is a paper published in 2013 by DeepMind researchers. The paper introduces a new deep learning model that learns to play Atari 2600 games directly from raw pixel input. The model uses a new approach to reinforcement learning to achieve superhuman performance in a variety of Atari games.

<CaptionImage image="atari-transparent.png" alt="Atari 2600 console." source="https://commons.wikimedia.org/wiki/File:Atari-2600-Wood-4Sw-Set.jpg" sizes="50rem"/>

## background

Reinforcement learning is a type of machine learning where a model learns to make decisions by interacting with an environment. The model usually receives feedback from the environment as rewards or penalties, which it uses to improve its decision-making over time. The goal is to learn a policy, or strategy, that maximizes the rewards over time.

A classic example of reinforcement learning is the TD-Gammon system, which learned to play backgammon at a world-class level in the 1990s. Instead of being programmed with expert knowledge, TD-Gammon learned to play by playing against itself and improving its strategy. However, applying reinforcement learning to more complex inputs like video games has been a long-standing challenge.

Prior to the paper, most successful RL applications relied on hand-crafted features. For example, in the case of an Atari game, the model might be given information like the position of the player, the positions of enemies, etc.

## deep learning breakthroughs

The authors observed breakthroughs in computer vision and speech recognition using deep learning techniques like convolutional neural networks. They hypothesized that similar techniques could be applied to RL problems, allowing models to learn from raw sensory inputs, like pixels from an Atari game screen, instead of hand-crafted features. By doing so, the model could potentially learn more complex and abstract representations, leading to better performance.

Applying deep learning to RL presented some challenges. Usually, deep learning models require large amounts of labeled training data. In RL, however, the model learns from the environment, resulting in sparse and delayed feedback. Another challenge is that deep learning algorithms often assume independent samples, while in RL, the model's actions can affect future inputs and rewards.

## deep q-network

The paper utilizes an approach called the Deep Q-Network (DQN), which combines deep learning with reinforcement learning. The core idea is to use a neural network to approximate the optimal action-value function.

An action-value function estimates the expected reward of taking an action in a given state. By learning an optimal action-value function, the model can choose the best action in any state to maximize its rewards.

Q-learning is a popular algorithm for learning the action-value function. It works by iteratively updating Q-values based on the rewards received and the estimated future rewards. However, combining Q-learning with non-linear function approximators like neural networks had previously been shown to cause instability, making the learned policy useless. Due to these challenges, prior work largely focused on linear function approximators for estimating the action-value function.

## experience replay

To address the challenges of combining Q-learning with neural networks, the authors used a technique called "experience replay". At each point in time, the model stores experiences (state, action, reward, next state) in a "replay memory". It samples mini-batches from it to update the neural network.

After performing experience replay, the model chooses its next action following an epsilon-greedy policy. This means that it usually chooses the action with the highest Q-value (expected future reward), but occasionally chooses a random action to explore. Then the whole process repeats.

Experience replay has several benefits:

1. It breaks the correlation between consecutive updates, making training more stable.
2. It reuses past experiences, making the model more data-efficient.
3. It allows the model to learn from a more diverse set of experiences.

## preprocessing and frame skipping

Atari 2600 games have 210x160 pixel images with a 128 color palette running at 60 frames per second, which can be computationally expensive to process. To improve efficiency, the authors use frame skipping, which provides the model with only every 4th frame. This effectively allows the model to play 4 times more games.

To reduce complexity, each frame is downsampled to 110x84 pixels and converted to grayscale. The frames are then cropped to 84x84 pixels to focus on the playing area. Finally, 4 preprocessed frames are stacked together as one input to the neural network.

## neural network architecture

The DQN uses a convolutional neural network (CNN) to process the raw pixel input from the game screen. Here's a breakdown of the architecture:

1. Input: 84x84x4 (4 preprocessed frames)

2. First hidden layer: 16 8x8 filters with stride 4, followed by rectifier nonlinearity

3. Second hidden layer: 32 4x4 filters with stride 2, followed by rectifier nonlinearity

4. Third hidden layer: 256 fully connected rectifier units

5. Output layer: fully connected linear layer with one output per valid action

## experiments

The authors experimented on 7 popular Atari 2600 games: Beam Rider, Breakout, Enduro, Pong, Q*bert, Seaquest, Space Invaders. They observed that the average action-value function Q increased steadily over time during training, indicating that the model was learning in a stable manner.

The authors compared the performance of the DQN model to other top methods from RL literature and expert human performance. The DQN model outperformed all previous methods on 6 out of 7 games and beat expert human performance on 3 games.

<CaptionImage image="atari-games.png" alt="Atari 2600 Games: Pong, Breakout, Space Invaders, Seaquest, Beam Rider." source="https://arxiv.org/pdf/1312.5602" sizes="50rem" loading="lazy" />

## conclusion

The DQN model combined deep learning with reinforcement learning to learn directly from raw sensory inputs in complex environments. It managed to achieve impressive results on a variety of Atari games, demonstrating the power of deep reinforcement learning (DRL) for challenging tasks and inputs.

The paper laid the foundation for future research in the new field of DRL. DeepMind later went on to develop more advanced models like AlphaGo and AlphaZero, which outperformed the best human players in complex games like Go and Chess. The DRL approach has also had applications in various areas like robotics and autonomous driving.

Personally, it was once again fascinating to see the underlying mechanics of how an AI model can perform human-like tasks. The results on Atari games beg the obvious question: could AI models learn to play modern video games with the same level of skill? It also makes me wonder how DRL will continue to evolve in the future. Will architectural breakthroughs like DQN continue to drive progress, or will increased computational power and data availability lead to better results? Only time will tell.

## source

<https://arxiv.org/pdf/1312.5602>

<br>

---

### why did I write this?

This blog post is one of my "papers" posts (labelled with this icon: <Icon class="icon" />). My goal is to read, summarize, and comment on influential or interesting papers in computer science. I want to gain a deeper understanding of topics within the field and improve my communication skills. Hopefully, these posts will be interesting and informative to others as well. Thanks for reading!

---
