FROM node:16

# Set working direction
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install application dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# Add app
COPY . ./

# start app
CMD ["yarn", "start"]