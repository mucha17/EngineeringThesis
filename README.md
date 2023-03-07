# EngineeringThesis
Application created as part of engineering thesis

# Topic
Design, development and validation of business-oriented microservices using a service-mesh and web-intended technologies

# Goal
The goal of my engineering thesis was to present, with examples, the latest technologies and selected practices used in the construction of both web applications and network infrastructure, which are necessary to maintain dedicated network services. 
For this purpose, I built a prototype of a private cloud infrasture. 
I also designed and implemented in the prototype a test business microservice web application.

# Work - hardware
The created private cloud infrastructure prototype consisted of a cluster of 6 servers (for web applications applications hosting), a Network Attached Storage (for databases and static files) and required networking devices (a router, a switch, fiber-to-copper converters, etc.).
Kubernetes was used to create a cluster for hosting Istio service-mesh. In the Istio service-mesh web applications were deployed. MySQL and MongoDB were installed on NAS for databases hosting purposes.

# Work - software
The created "Museumify" web application was a test application that consisted of a few microservices. The aim of this application was to test proper operation of the private cloud infrastructure.

# Source
Frontend and backend microservices are placed in separate branches of this repository.
