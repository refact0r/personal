---
published: true
name: 'the unix time-sharing system'
icon: 'ph:files'
description: an overview of the design and features of the UNIX operating system.
date: 2024-02-24
---

<script>
    import Icon from '~icons/ph/files';
</script>

**_The UNIX Time-Sharing System_** is a paper published by Dennis M. Ritchie and Ken Thompson in 1974. It describes the UNIX operating system, which was developed at Bell Labs in the late 1960s and early 1970s. This paper is very influential in the history of computer science, and it has had a lasting impact on the design of operating systems and programming languages.

UNIX was developed on PDP computers, or Programmed Data Processor computers built by Digital Equipment Corporation. The paper boasts that UNIX can run on hardware "costing as little as $40,000." This is an interesting snapshot into the cost of computers at the time. Also fascinating is the following description of UNIX's size: the entire operating system only occupied 42kb. The system was originally written in assembly language, but it was later rewritten in C, a programming language designed by Dennis Ritchie. C was much easier to understand and write, and is still one of the most widely used programming languages today.

## the file system

One of the most important features of UNIX is the file system. It was unique because it treated everything, including hardware devices, as a file. The structure of files is not controlled by the system, so they can contain anything from text to binary programs. There are three types of files: ordinary files, directories, and special files.

### directories

Directories (a.k.a folders) are files that group other files together, creating a tree file structure. There is a root directory, in which all files in are contained, and each user has their own directory. Directories and files can be specified by a path, which is a list of directory or file names separated by slashes like "/alpha/beta/gamma". This pattern of slashes may seem commmon today, but it was first introduced in UNIX.

### special files

Special files are used to access hardware devices. They are treated like files, but reading and writing to them will interact with the hardware device. The benefit of this is that file and device I/O are handled in the same way.

### mounting

The UNIX file system is designed to be able to handle multiple disks. This is done by "mounting" a disk special file to an existing ordinary file. After mounting, references to the ordinary file will be redirected to the root directory of the mounted disk. This creates a seamless integration of external disks within the file system.

### file protection

THe UNIX file system protects files from unauthorized access. Each file has an owner, along with 6 bits that specify read, write, and execute permissions. A 7th bit be used to give the current user the same permissions as the owner during the execution of a program. There can also be a "super-user" who has unrestricted access to all files.

### file I/O

UNIX uses a system of file descriptors to handle I/O. When a file is opened, the system returns a file descriptor, which is an integer identifier that is then used to read and write to the file. Reading and writing is sequential, as the system keeps a pointer of the current position in the file. UNIX also has a buffering system, where 512-byte blocks are read from the disk into a buffer in memory for more efficient I/O.

### file system implementation

UNIX uses links, which are directory entries containing a filename and a pointer to the file. This allows for a single file to appear in multiple directories. The pointer is called an "i-number" (index number). I-numbers index a system table of file information called the "i-list", which contains "i-nodes" with the file's size, owner, physical addresses and other information. UNIX's unique i-list system proved to be reliable and easy to work with. The linear structure allows for fast scanning of the file system.

### storage allocation

Storage space on disks in a UNIX system is allocated in 512-byte blocks. The i-node of a file contains up to 8 addresses of blocks that contain the file's data. If the file is larger than 8 blocks, the 8 blocks themselves may be used to store the addresses of other blocks containing the file's data. This allows files to be as large as 1gb.

## processes and images

When a program is executed, an "image" of the program is created in memory. This image contains the program's code and relevant data such as open files. The image is then executed as a "process".

### execution of programs

UNIX uses a system of "execute" calls to execute programs. When a program is executed, the data in the current process is replaced with the image of the new program. The "execute" call can also take in string arguments, which are passed to the new program.

### forks

UNIX uses a system of "forks" to create new processes. When a process is forked, the new process is a copy of the original, including the image. The new process can then be modified to run a different program.

### pipes

Pipes are a way to communicate between related proceses. A parent process can create a pipe and pass it down to its child processes. The child processes can then read and write to the pipe, which is treated like a file. This allows for easy communication between processes.

### wait and exit

The parent process can call "wait" to wait for the child process to finish. When a process is finished, it can call "exit" to terminate itself and destroy its image. This allows for synchronization between processes.

## the shell

The shell is the command interpreter of UNIX. It is a program that reads commands from the user and executes them. Users can type commands in the format `command argument1 argument2`. The shell will search for the command in the file system and execute it.

### command I/O

Programs executed in the shell start off with two open files. File 0 is used for input, and File 1 is used for output. The shell can redirect these files to other files or devices. For example, the command `command file1 >file2` will cause `command` to read input from `file1` and write output to `file2`. The inputs and outputs of commands can also be piped together using the "|" operator. For example, `command1 | command2` will cause the output of `command1` to be the input of `command2`. This system allows for commands to be easily combined and manipulated.

### multitasking

The shell can execute multiple commands in sequence using the ";" operator. It can also execute commands in parallel using the "&" operator. This allows for multitasking and automation of tasks.

### shell scripts

The shell itself is a command, so it can be used to execute shell scripts. Shell scripts are files containing a sequence of shell commands. They can be executed with "sh file". The shell also has other capabilities such as substituting parameters. Thus, using the shell as a command allows for the execution of powerful and complex scripts.

### shell implementation

When a command is executed, the shell searches for the command in the file system. If the command is found, the shell will fork a new process and execute the command in the new process. Meanwhile, the parent process will wait for the child process to finish. This system allows the above capabilities of the shell to be easily implemented.

### initialization

When UNIX is initialized, an "init" process is created. This process is the parent of all other processes, and it is responsible for creating the shell once the user has logged in. When the shell is terminated, the init process will type another login message. This allows users to easily log in and out of the system.

### traps

When a program fault occurs, the UNIX system will "trap" to a system routine. The faulty process will be terminated and the user's image will be written to a "core" file. Programs can also be halted by an "interrupt" signal, which is sent by pressing the "delete" key. A "quit" signal is similar but will produce a core image. These signals allow for easy debugging and termination of programs. Faults and interrupt and quit signals can also be ignored by the process, giving programs more control over error behavior.

## conclusion

The paper states that UNIX was not defined to meet specific objectives, other than creating a comfortable relationship with the machine. I think this general approach is likely one of the reasons for UNIX's success. Instead of being constrained by requirements, Ritchie and Thompson were able to focus on creating a system that was simple and easy to use.

The paper lists the following successful features of UNIX:

1. The system makes it easy to develop programs. This is because of the convenient file system and lack of insulation between programs and system calls.

2. Instead of being a "batch" system, UNIX is interactive and allows for multiple users to work simultaneously, hence the name "time-sharing system".

3. The size constraints on the system encouraged an elegant design.

4. The system was able to maintain itself, as the source programs were all modifiable and written in C.

5. The process control system proved to be convenient and efficient. The design of the shell makes it flexible to work with. The shell also has a simple but powerful syntax.

The UNIX system didn't pioneer any significant new ideas about operating systems, but it did bring together many existing ideas in a simple and elegant way. The system was not perfect but has been the basis for many operating systems used today, including Linux and Mac OS.

This paper is a fascinating insight into the state of computing in the 1970s. Many of the features of UNIX are still in use today. They may seem trivial now, but their integration was a significant achievement at the time. It is interesting to see how these features were first implemented. Reading this paper has given me a new appreciation for the design of operating systems. Finally, I think the paper itself is a great example of how to write about a complex system in a way that is easy to understand.

## source

<https://dsf.berkeley.edu/cs262/unix.pdf>

<br>

---

### why did I write this?

This blog post is one of my "papers" posts (labelled with this icon: <Icon class="icon" />). My goal is to read, summarize, and comment on influential or interesting papers in computer science. I want to gain a deeper understanding of topics within the field and improve my communication skills. Hopefully, these posts will be interesting and informative to others as well. Thanks for reading!

---
