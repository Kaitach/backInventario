FROM node:18
RUN npm install -g npm
COPY ./soket-io .
COPY ./shared ./shared

RUN npm install 
EXPOSE 3001

EXPOSE 81

CMD ["npm", "run", "start:3"]