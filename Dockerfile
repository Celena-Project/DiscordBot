FROM node

# Installation

WORKDIR /app

COPY package.json .

RUN npm install && \
    touch "/data/config.json"

# Runtime

COPY . .

#ENV PORT = 
#EXPOSE $PORT

VOLUME [ "/data" ]

CMD ["npx", "ts-node", "src"]