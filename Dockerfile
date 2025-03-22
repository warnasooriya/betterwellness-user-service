FROM node:latest

WORKDIR /app

COPY package*.json ./

# Install the application dependencies
# The --omit=dev flag is used to avoid installing development dependencies
RUN npm install --omit=dev

# Copy the application code
COPY . .

# Expose the application port (change if needed)
EXPOSE 5001

# Start the application
CMD ["node", "app.js"]