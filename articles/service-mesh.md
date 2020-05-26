### Service Mesh
#### What is a service Mesh?
- It's a configurable, low-latency infrastructure layer design to handle a high volume of network communication among application infrastructure services
- Ensures that communication, among containerized APIs, is fast, reliable and secure
- Mesh provides:
  - Service discovery
  - load balancing
  - Encryption
  - Observability
  - Traceability
  - Authentication
  - Authorization
  - Support for circuit breaker pattern

#### How is implemented?
- Uses a proxy instance called `sidecar` for each service instance
- `sidecars` handle:
  - Interservice communication
  - Monitoring
  - Security-related concerns
  - Anything that can be abstracted away...
- **Developers** can maintain the application code in the service
- While **operations** team can maintain the _service mesh_
- Basically _separation of concerns_

#### General concepts for Service Mesh
- _Container orchestration framework_: Manages and monitor the set of containers
  - Examples: Kubernetes, Docker Swarm, Menosphere
- _Services and instances_: An instance is a single running copy of a microservice.
  - Replicas: Instances should be access via service not directly. This needs to be fault-tolerant and scalable
  - Examples: Kubernetes pods
- _Sidecar proxy_: The purpose of the _sidecar proxy_ is to route traffic to and from the container.
  - Sidecars can communicate with other sidecars and it's managed by the orchestration service
  - Sidecars are used to intercept and manage all ingress and egress to instances
- _Service discovery_: When an instance needs to intereact with a different service, it needs to find/discover a healthy, available instance of the other service
  - Typically it's done via: DNS lookup
  - The container orchestration service keeps a list of instances ready to receive request
- _Load balancing_: Service `mesh` uses a (layer 7) load balancing. 
  - It has richer algorithms and more powerful traffic management
  - Load balancing parameters can be modified via API
- _Encryption_: Service `mesh` can _encrypt_ and _decrypt_ responses and requests
  - Service `mesh` can also improve the performance by prioritizing the reuse of an existing connection
  - Often uses TLS for usual type of communication
- _Authentication & authorization_: Validates requests
- _Support for circuit breaker pattern_: Isolates unhealthy instances, then gradually brings them back into _healthy instance pool_
- _Data plane_: The part which manages network traffic between instances.
- _Control plane_: The part which controls generation and deploying the configuration that controls _data plane_

#### Notes:
- This architecture is used for a highly demanded application like: Twitter, Lyft or Netflix
- As always, this is not the _solution for all your problems_

#### Source:
- [What is a service mesh?](https://www.nginx.com/blog/what-is-a-service-mesh/)

