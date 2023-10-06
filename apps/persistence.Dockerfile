FROM node:18
RUN npm install -g npm
COPY ./shared ./shared

COPY ./persistence .
RUN npm install 
EXPOSE 3002
CMD ["npm", "run", "start:2"]