---
published: true
name: 'on the criteria to be used in decomposing systems into modules'
icon: 'ph:files'
description: a better method of modularizing software systems
date: 2024-03-30
---

<script>
    import Icon from '~icons/ph/files';
</script>

**_On the Criteria To Be Used in Decomposing Systems into Modules_** is a paper published by David Parnas in 1972 at Carnegie Mellon. It introduced a new method of modularizing software that focused on information hiding. The paper is considered a seminal work because it established modular design principles that have become fundamental in modern software development.

## modularization

First off, what is modularization? Modularization is the process of breaking down a system into smaller, manageable modules. Modules are separate, self-contained units that perform specific functions.

There can be many benefits to modularization:

1. **Understandability**: Each module has a specific purpose, and developers can focus on understanding one module at a time, making the system easier to understand. Developers also do not have to fully understand the system to work on a specific module.

2. **Reusability**: Different systems that perform the same task can reuse the same module. This saves time and effort because developers do not have to rewrite the same code. It also ensures consistency across systems.

3. **Flexibility**: Modules can be updated or replaced without affecting other parts of the system. This makes it easier to maintain and evolve the system over time.

4. **Testability**: Modules can be tested independently of each other. This makes it easier to identify and fix bugs.

5. **Parallel Development**: Modules can be developed in parallel by different developers or teams. This speeds up development time.

Modularization can take many forms, but Parnas' paper focuses on design descisions made before work on independent modules starts. His definition of a module is a more general "responsibility assignment" rather than a specific subprogram or piece of code.

## the example

Parnas uses the example of a KWIC (Key Word In Context) index production system to demonstrate his criteria. The KWIC system takes input of a list of lines, each line containing a list of words, and each word consisting of a list of characters. A line can be "circularly shifted" by removing the first word and appending it to the end. The system outputs a list of all circular shifts of all lines in alphabetical order.

For example, given the input:

```plaintext
quick brown fox
lazy dog
```

The system would output:

```plaintext
brown fox quick
dog lazy
fox quick brown
```

## conventional modularization

A conventional method might break the system into modules based on the functions they perform. For the KWIC system, this could result in modules like:

1. **Input**: Reads the input lines and stores them.

2. **Circular Shifter**: Performs the circular shift operation and stores the results.

3. **Alphabetizer**: Using the stored lines from the first two modules, the circular shifts are sorted alphabetically.

4. **Output**: Writes the sorted circular shifts to a formatted output.

5. **Master Control**: Coordinates the other modules.

This method is intuitive and straightforward. According to Parnas, small experiments showed that this was approximately the scheme proposed by most programmers.

## parnas' modularization

Parnas proposes an alternative modularization:

1. **Line Storage**: Consists of functions to store, retrieve, and delete characters, words, and lines.

2. **Input**: Reads the input lines and stores them using Line Storage.

3. **Circular Shifter**: Performs the circular shift operation. Contains a function to get characters from the shifted lines.

4. **Alphabetizer**: Sorts the circular shifts alphabetically. Contains a function to get characters from the sorted lines.

5. **Output**: Writes the sorted circular shifts to a formatted output.

6. **Master Control**: Coordinates the other modules.

The paper notes that the modularizations do not matter to the machine. They may be compiled into the same code. However, the modularization does affect the human programmers who build and maintain the system.

Parnas' modularization scheme may seem more complicated. However, the key difference is that each module is designed to hide information from other modules. For example, the Circular Shifter module does not expose the internal representation of the shifted lines. This is in contrast to the conventional method, where the Alphabetizer would need to understand the representation of the circular to sort them.

The benefit of information hiding is that it reduces the dependencies between modules. If the Circular Shifter module changes its internal representation of the shifted lines, the Alphabetizer module would not need to change. If the input format was changed, only the Input module would need to be updated. This makes the system more flexible and easier to maintain. It also allows developers to work on modules independently, without requiring constant coordination (which saves time and effort).

## the criteria

The criteria used for the conventional modularization example followed a "flowchart" approach. The modules were based on the steps of processing in the system. This can lead to modules that depend heavily on each other.

Parnas proposes a different set of criteria based on information hiding. Modules are characterized by its knowledge of a design decision that is hidden from other modules. Some general examples and scenarios applying this criteria are:

1. A data structure and procedures used to manipulate it are confined to one module.

2. The sequence of instructions necessary to call a routine are confined to one module.

3. The formats of control blocks must be hidden within a "control block module."

4. Character codes, alphabetic orderings, and other data are hidden within one module.

5. The sequence in which items are processed is confined to one module.

Following this criteria, the second modularization example can be improved. In the Circular Shifter module, the method of storing or calculating the circular shifts is hidden, but the order of the list of shifts is not. This provides more information than necessary. It does not allow for a system where the circular shifts are produced in alphabetical order, and the Alphabetizer module is not included.

## efficiency

The paper notes that the new criteria may be less efficient because there will be more communication between modules. This performance tradeoff can be avoided by using an assembler to inline, or directly insert modules into their calling modules. Also, more optimized transfer mechanisms between modules could be used instead of normal subroutine calls. This could be enabled by a tool that maintains the modular design abstractly while optimizing behind the scenes.

## example applications

Parnas discusses his previous work designing a translator (compiler or interpreter) for a Markov algorithm language. It was discovered that the information hiding modularization was applicable to a compiler and various interpreters. Many of the modules could be reused with only slight changes between compilers and interpreters. This demonstrates the reusability and flexibility benefits of the information hiding approach.

## hierarchical structure

The paper also explains how the modularization can be hierarchical. Parnas refers to the idea of a "program hierarchy" proposed by Edsger Dijkstra. In the second modularization example, the following hierarchy could be applied:

1. **Level 1**: The Line Storage module does not depend on any other module.

2. **Level 2**: The Input, Output, Circular Shifter, and Alphabetizer modules depend on Line Storage (but may depend on each other).

3. **Level 3**: The Master Control module depends on the modules in Level 2.

This hierarchical structure offers additional benefits over information hiding modularization. Higher-level modules can be more easily built from lower-level modules, and lower-level modules can be reused in different systems. If the modules did not have hierarchy, and lower-level modules depended on higher-level modules, it would be much harder to reuse them.

## conclusion

Parnas' paper demonstrated why the traditional "flowchart" modularization can be flawed, and proposed criteria for modularization based on information hiding. This method has become fundamental in modern software development because of its various benefits. Modern staples like object-oriented programming, component architecture, microservices, and unit testing all rely on modular design principles.

As for me, reading this paper transformed my perspective on code organization. I already understood modularization and its benefits, but I mostly relied on the principle of reducing redundant code to guide my design. Parnas' paper demonstrated that there is more to it than saving time typing, especially when working on large systems with other people. I'll definitely be thinking more about information hiding and module hierarchy in future projects. It is quite remarkable how a paper from 1972 can still have such direct relevance today.

## source

<https://www.cs.umd.edu/class/spring2003/cmsc838p/Design/criteria.pdf>

<br>

---

### why did I write this?

This blog post is one of my "papers" posts (labelled with this icon: <Icon class="icon" />). My goal is to read, summarize, and comment on influential or interesting papers in computer science. I want to gain a deeper understanding of topics within the field and improve my communication skills. Hopefully, these posts will be interesting and informative to others as well. Thanks for reading!

---
