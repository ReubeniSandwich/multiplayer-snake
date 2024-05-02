FROM node:21
COPY snake-multiplayer-frontend/ /ui
WORKDIR /ui
RUN npm ci
RUN npm run build

FROM gradle:8-jdk17
COPY snake-server/ /app
WORKDIR /app
RUN gradle buildFatJar

FROM eclipse-temurin:17
COPY --from=1 /app/build/libs/com.example.snake-server-all.jar /app/snake-server.jar
COPY --from=0 /ui/dist /app/ui
ENV UI_DIR=/app/ui

WORKDIR app
CMD java -jar snake-server.jar
