FROM node:24-alpine
WORKDIR /app
ENV ASTRO_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 4321
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
