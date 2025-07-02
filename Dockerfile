# Image size ~ 300MB
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1 AS deploy

WORKDIR /app

ARG PORT
ENV PORT=$PORT
EXPOSE $PORT

# Copy built application and package files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lockb ./
COPY --from=builder /app/assets ./assets

# Install only production dependencies
RUN bun install --frozen-lockfile --production

# Install cron for scheduled restarts
RUN apt-get update && apt-get install -y cron && rm -rf /var/lib/apt/lists/*

# Create restart script
RUN echo '#!/bin/bash\n\necho "$(date): Restarting bot..."\npkill -f "bun.*app.js" || true\nsleep 2\nbun /app/dist/app.js &\necho "$(date): Bot restarted"' > /app/restart-bot.sh && chmod +x /app/restart-bot.sh

# Create startup script that handles cron as root then switches to bunuser
RUN echo '#!/bin/bash\n\n# Setup cron job for restart every 12 hours as root\necho "0 */12 * * * /app/restart-bot.sh >> /app/restart.log 2>&1" | crontab -\n\n# Start cron as root\ncron\n\n# Switch to bunuser and start the bot\nsu bunuser -c "bun /app/dist/app.js"' > /app/start-with-cron.sh && chmod +x /app/start-with-cron.sh

# Create non-root user
RUN groupadd -r bunuser --gid=1001 && useradd -r -g bunuser --uid=1001 --home-dir=/app --shell=/bin/bash bunuser

# Change ownership of app directory
RUN chown -R bunuser:bunuser /app

# Start with cron-based restart (keeping root for cron, switching to bunuser for bot)
CMD ["/app/start-with-cron.sh"]