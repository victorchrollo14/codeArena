if [[ $1 == 'migrate' ]]; then
  if [[ ${#2} -gt 3 ]]; then
    pnpm prisma migrate dev --name $2 --schema ./src/prisma/schema.prisma
  else
    echo "enter some proper name for migration, usage ./arena.sh migrate migration-name"
  fi
fi

if [[ $1 == 'generate' ]]; then
  pnpm prisma generate --schema ./src/prisma/schema.prisma
fi

if [[ $1 == 'studio' ]]; then
  pnpm dlx prisma studio --schema ./src/prisma/schema.prisma &
fi

# ==================== Docker Commands ====================
if [[ $1 == 'build' ]]; then
  docker build -t arena-dev -f Dockerfile.dev .
fi

if [[ $1 == 'run' ]]; then
  docker run --network rce-network -v $(pwd):/app -v /app/node_modules -v /app/.next -p 4000:4000 arena-dev:latest
fi

if [[ $1 == 'build:prod' ]]; then
  docker build -t arena-prod .
fi

if [[ $1 == 'run:prod' ]]; then
  docker run --network rce-network -p 3000:3000 arena-prod:latest
fi
