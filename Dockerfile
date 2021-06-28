FROM node:latest

LABEL tanakorncode <tanakorncode@gmail.com>

# environment
# ENV http_proxy=http://proxy.egat.co.th:8080
# ENV https_proxy=http://proxy.egat.co.th:8080
ENV NODE_ENV production

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/


# proxy
# RUN npm config set https-proxy ${http_proxy} && \
#   npm config set proxy ${http_proxy} && \
#   npm install

# Install app dependencies
RUN npm install

# Bundle app source
# COPY .env.production /usr/src/app/.env
COPY . /usr/src/app

# TimeZone
ENV TZ=Asia/Bangkok
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

EXPOSE 3000
# USER node
CMD ["npm","start"]