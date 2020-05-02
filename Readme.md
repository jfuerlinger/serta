# Serta Bot

A bot to motivate the studies ...

## How-To

### Configuration

1. Get the .env file from me (github.com/jfuerlinger) and locate it in the root directory


### Start the Bot

* Method "Without Docker"

    ```
    npm install
    npm start
    ```

* Method "With Docker"

    ```
    docker-compose -f .\docker-compose.dev.yml up
    ```



### Run the tests

* Method "Without Docker"

    ```
    npm test
    npm run test:unit
    npm run test:integration
    ```

    *Hint*: Start the testing in a dedicated terminal window.

* Method "With Docker"

    1. Check the `container-id`
        ```
        docker ps
        ```

    1. Run the unit tests
   
        ```
        docker exec -it <container-id> npm run test:unit 
        ```
        *Hint*: Start the testing in a dedicated terminal window.

    2. Run the integration tests

        ```
        docker exec -it <container-id> npm run test:integration
        ```
        *Hint*: Start the testing in a dedicated terminal window.


### Production build

```
docker-compose -f .\docker-compose.yml up
```



## Description

### Overview

![Bot](./assets/discord-bot.gif)

### Features

1. Manage the health points of a student
2. Print some statistcs
3. Be super fancy

