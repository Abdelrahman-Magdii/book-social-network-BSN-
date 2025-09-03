# Stage 1: Build the application using Maven and Temurin 17 JDK
FROM maven:3.9.4-eclipse-temurin-17 AS build

WORKDIR /app

# Copy pom.xml and download dependencies first (leveraging Docker cache)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the full source code
COPY src ./src

# Package the application, skipping tests
RUN mvn package -DskipTests

# Stage 2: Run the application using a lightweight JDK image
FROM openjdk:17-jdk-slim

ARG PROFILE=dev
ARG APP_VERSION=0.0.1-SNAPSHOT

WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/book-network-${APP_VERSION}.jar app.jar

# Expose the application port
EXPOSE 8088

# Command to run the app
ENTRYPOINT ["java", "-jar", "app.jar"]


#  sudo docker build -t bns/bns:0.0.1-SNAPSHOT -f ../docker/backend/Dockerfile .