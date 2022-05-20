FROM node:16

# Set working direction
WORKDIR /app

# Copy app files
COPY package.json yarn.lock ./
COPY src ./src

# Install dependencies
RUN yarn install && \
    # Remove dev dependencies
    yarn install --production && \
    # Remove unecessary files
    rm -r yarn.lock

# Expose listing port
ENV NODE_PATH src
EXPOSE 3000

# Set start command
CMD [ "node", "src/index.js" ]
