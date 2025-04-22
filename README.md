# Pi Kapp Expansion
Code base for data driven expansion efforts


## Introduction
This repository contains code that is capable of performing a K-Nearest Neighbors (KNN) demo for Pi Kapp efforts. The data used for the demo is either publically available or made up for demonstration purposes. The application consists of three microservices: NextJS frontend, a Flask API middle layer, and a MongoDB database store. The choices for these applications and frameworks were designed to provide a modern, open-source, microservices architecture that can be reused or plugged into different services. This also takes advantage of docker to containerize the applications. 


## Running the Application
The application uses docker compose to best bundle the applications. Runtime envrionments without docker and docker-compose installed will not be able to run the application. If you consider a computer wiz or docker expert, installing docker compose is not fully necessary because you can translate the compose services into docker run commands. For steps on installing Docker, visit: https://docs.docker.com/get-started/get-docker/ 

### If Docker is installed
Once you have docker installed, the necessary components can be created by running:
```bash
docker-compose up --build
```
This should pull the images and get everything running with the ports specified in the docker-compose file
NOTE: At this time, the data requried will be in Mongo at startup. The correct collection database and collection will need to be created before importing the data. The data will need to be copied from the mongoData/sampleData.json file into the collection. This bug is currently being addressed. Stay tuned.

## KNN and Expansion
This demo considers a potential new expansion target. The user inputs the number of IFC fraternities on campus and the undergraduate enrollment (in thousands). The frontend will send that data to the Flask API that will compare this new school with the other schools in the database. The KNN algorithm will then recommend or not recommend expanding to that school based on the five (5) closest schools to this new school in terms of undergraduate enrollment and fraternities on campus. While this is only a two dimensional example (enrollment, fraternities), the idea is to build confidence in the KNN algorithm when more factors are taken into consideration and visual inspection is difficult or impossible. 

The image below shows a graphical exmaple of the process described above. The new point (4,3) indicating a school with 4,000 undergraduate students and 3 IFC fraternities on campus is given a label of "Model" which means it is close to other schools considered model chapters, or chapters meeting current expansion goal criteria, and therefore the Fraternity should pursue expansion at that school.
![exampleKnn](https://github.com/user-attachments/assets/fd757e50-c973-4499-b436-d22c93c5511f)
