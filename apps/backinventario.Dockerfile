FROM node:18
RUN npm install -g npm
COPY ./shared ./shared

COPY ./back-inventario .
RUN npm install 
EXPOSE 3000
CMD ["npm", "run", "start:dev"]