# Step 1: Build the application using Gradle and Java 26
FROM gradle:jdk26 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN ./gradlew bootJar --no-daemon

# Step 2: Run the built JAR file using a lightweight Java 26 image
FROM openjdk:26-slim
EXPOSE 8080
COPY --from=build /home/gradle/src/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]