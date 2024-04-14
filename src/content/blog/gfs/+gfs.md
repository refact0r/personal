---
published: true
name: 'the google file system'
icon: 'ph:files'
description: a scalable distributed file system
date: 2024-04-13
---

<script>
    import CaptionSVG from '$lib/components/CaptionSVG.svelte';
</script>

**_The Google File System_** was published in 2003 by Sanjay Ghemawat, Howard Gobioff, and Shun-Tak Leung. It introduced the Google File System (GFS), a new distributed file system designed to run on commodity hardware. The paper is considered one of the most influential papers in the field of distributed systems because it demonstrated how to build a reliable and efficient file system for large-scale distributed applications.

## context

In the late 1990s and early 2000s, Google was experiencing rapid growth and needed a file system that could handle the demands of its applications, like its search engine. Traditional monolithic storage systems did not scale well and were expensive. Google decided to use cheap commodity hardware to build a distributed file system in order to create a scalable and cost-effective solution. But, this meant that the file system had to handle high failure rates of commodity hardware.

Google designed GFS to be reliable, performant, and available, much like other file systems. However, GFS was optimized for Google's specific needs, such as large files and high read/write throughput.

## architecture

GFS is built around clusters, which are a collection of machines that form a single file system. Each cluster consists of a single master server and multiple chunkservers and clients. The chunkservers store the actual file data, which is split into chunks that are replicated across chunkservers for redundancy. The master manages metadata, like file names, locations, and access control information. The clients, which are typically application servers, interact with both the master server and chunkservers to read and write data. These are all commodity Linux machines connected by a high-speed network.

<CaptionSVG svg="gfs-diagram.svg" alt="diagram of the GFS architecture."/>

## single master

When a client wants to read or write a file, it first contacts the master server to get the metadata for the file. The master server returns the handles and locations of the chunks corresponding to the file. The client can then read or write the data directly from the chunkservers. This single master design simplifies the system and allows for centralized control of metadata. It doesn't bottleneck the system because clients don't need to transfer data through the master server.

## metadata

The GFS master stores 3 types of metadata:

1. File and chunk namespaces
2. Mappings from files to chunks
3. Locations of each chunk's replicas

This metadata is stored in the master's memory, making operations fast. However, this means that the total capacity of the file system is limited by the master's memory capacity. Google considered this a reasonable trade-off because adding memory to the master was relatively cheap.

The namespaces and mapping from files to chunks are also stored persistently in an "operation log" file. This operation log serves as a timeline of all operations, and is crucial for both replication and recovery. To minimize startup time, the operation log must be kept small, so it is periodically saved as a compact checkpoint on the local disk. The operation log and checkpoints are replicated on multiple machines for redundancy.

Unlike the other two types of metadata, the locations of each chunk's replicas are not stored persistently. Instead, the master asks the chunkservers for this information at startup and later through HeartBeat messages. This prevents the master and chunkservers from getting out of sync when chunkservers fail, restart, join, or leave, which are common occurrences in a large-scale system.

## consistency

GFS provides a relaxed consistency model. It guarantees that all clients see the same data, but does not guarantee that the data is the most up-to-date. This is because GFS is optimized for high read/write throughput and large files, not for strict consistency.

File namespace mutations, such as file creation, are handled exclusively by the master, and are atomic, which means they are either fully completed or not at all.

## chunk size

GFS chunks are typically 64MB large, which was much larger than typical file systems at the time. This is beneficial because a large chunk size reduces the number of chunks, reducing the metadata the master server needs to manage. This also reduces load on clients and the network, as they need to interact with the master less frequently.

However, large chunks may lead to hot spots when many clients access the same file, and thus the same chunk. To mitigate this, Google stored files that were prone to hot spots with a higher replication factor, meaning there were more copies available. The paper suggests a long-term solution would be to allow clients to read from each other.

## mutations and leases

A mutation is an operation that changes the metadata or contents of a chunk. Mutations must be performed on every replica of a chunk to maintain consistency. This is achieved through "leases". The master grants one replica a chunk lease, making it a "primary". The primary then decides the order future mutations are applied to the rest of the replicas. This system is designed to minimize management overhead from the master.

## data flow

Leases determine the flow of control, but not the actual flow of data from the client to the chunkservers. Data is transferred directly from the client through the chunkservers in a linear fashion. This allows each machine's full network bandwidth to be utilized, rather than splitting it among many recipients. In order to minimize latency, the order of this data pipeline is determined based on distance, which is estimated from IP addresses. GFS also utilizes TCP connections, allowing a chunkserver to immediately start forwarding after receiving some data.

## record appends

In a traditional write operation, the client specifies the offset, or position, in the file to write to. Concurrent writes to the same chunk can cause a corrupt mixture from multiple clients. Instead, GFS uses "record appends", where the client only provides the data, not the offset. GFS repeatedly attempts to append the data to the last chunk until it succeeds, guaranteeing that the data is written at least once atomically. This eliminates the need for complex locks and coordination between clients when writing to the same file.

## snapshots

GFS supports snapshots, which are read-only copies of a file or directory tree. When a snapshot is created, the master revokes all outstanding leases, and then duplicates the metadata for the relevant files. The newly created snapshot points to the same chunks as the original files. This allows for near instantaneous creation of snapshots. When the relevant chunks are mutated in the future, the master instructs chunkservers to create new copies of the chunks, ensuring that the snapshot remains unchanged. This method is efficient because chunks are only copied locally, and not transferred over the network.

## namespace management

Unlike traditional file systems, GFS does not use a per-directory data structure. Instead, the master uses a single lookup table containing path names and metadata. Master operations such as snapshots can be slow, so the master allows multiple concurrent operations through a lock system. If an operation is being performed on a file, the master locks that path and its parent paths with either read or write locks, preventing other operations from interfering. However, the distinction between read and write locks still allows concurrent mutations in the same directory.

## replica placement

In the real world, GFS chunkservers are typically grouped in racks. Therefore, chunk replicas must also be spread across different racks, not just invididual chunkservers. If an entire rack fails due to power loss or network issues, the data is still available. This means that network traffic for one chunk must flow through the network bottlenecks of multiple racks, which can be beneficial for read operations, but detrimental for write operations.

## replica creation

Chunk replicas are created in 3 scenarios: chunk creation, re-replication, and rebalancing.

When the master creates a chunk, it can choose where to place its replicas. It considers factors like balancing disk space usage, preventing too many creations on the same chunkserver, and spreading replicas across racks.

Re-replication occurs when the number of replicas falls below the desired amount, typically due to a chunkserver failure. The master will create new replicas on other chunkservers to maintain the desired replication factor. Re-replication is prioritized based on how far a chunk is from the desired replication factor, and whether it is blocking a client operation. The highest priority chunk is then cloned to create a new replica. However, clone operations are limited in number to reduce network usage.

Rebalancing occurs periodically. The master scans the existing replica distribution and moves replicas to better balance disk space and the other criteria mentioned above.

## garbage collection

GFS uses a garbage collection approach to deleting files. After a file is deleted by a client, it is not immediately removed from the system. Instead, the master marks the file with a hidden name and timestamp. The master regularly scans the namespace and deletes these hidden files if they are older than a certain threshold, typically 3 days. To truly delete a file, the master removes its metadata, severing links to its chunks. Similar to the namespace scan, the master periodically scans for chunks with no references, and instructs the chunkservers to delete them.

This approach is simple and reliable. If a chunk deletion instruction is lost, the master will eventually reissue it during the next scan. Additionally, it merges the deletion process with regular scans, reducing the need for a extra operations. Finally, it allows for deleted files to be recovered within the 3-day window.

## replica versions

If a chunkserver fails while a chunk is being mutated, the chunk will become out of date, or stale. To prevent stale chunks from being used, GFS uses version numbers. When a new lease is granted, the master increases the chunk version number, and all replicas update their version numbers accordingly. Any replicas not connected to the master will have an outdated version number, and will be considered stale. Stale replicas are then removed in the regular garbage collection scans. If the master sees a version number higher than its own, it will update to that version. This ensures that the versioning still works even if the master fails.

## availability

GFS achieves high availability through fast recovery and replication. Both the master and the chunkserver are designed to startup and restore their state in seconds, minimizing downtime. The replication of chunks ensures that data is still available even if a chunkserver fails. The master is also designed to be highly available, with multiple replicas of its operation log and checkpoints. If the master fails, a new master can created quickly by monitoring infrastructure. "Shadow masters" can alos provide read-only access to the file system when the primary master is down.

## data integrity

Because of GFS's scale and use of commodity hardware, it is expected that there will be a high rate of disk failures. Comparing replicas across chunkservers would be inefficient, so GFS uses checksums to ensure data integrity. Chunks are divided into 64KB blocks, and each block is assigned a 32-bit checksum that is stored in memory. On read, the checksums of the read blocks are verified before the data is returned to clients or chunkservers, preventing corruption from spreading. On write, only the first and last checksum of the written area need to be verified. Chunkservers can also scan and verify chunks when idle. If corruption is detected, the chunkserver will report the error to the master, which will then re-replicate the chunk and remove the corrupted replica.

## performance

A large section of the paper is dedicated to performance benchmarks and evaluation, which will likely have no meaning to you as a reader. However, it is safe to say that GFS proved to be impressive in many of its target areas, such as throughput and availability.
