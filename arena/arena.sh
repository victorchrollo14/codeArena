if [[ $1 == 'migrate' ]]; then
  if [[ ${#2} -gt 3 ]]; then
    pnpm dlx prisma migrate dev --name $2 --schema ./src/prisma/schema.prisma
  else
    echo "enter some proper name for migration, usage ./arena.sh migrate migration-name"
  fi
fi

if [[ $1 == 'generate' ]]; then
  pnpm dlx prisma generate --schema ./src/prisma/schema.prisma
fi

if [[ $1 == 'studio' ]]; then
  pnpm dlx prisma studio --schema ./src/prisma/schema.prisma &
fi



# ==================== Docker Commands ====================
if ! docker network ls | grep -q 'codearena-network'; then
    echo "creating codearena-network..."
    docker network create codearena-network
fi

if [[ $1 == 'build' ]]; then
  docker build -t arena-dev -f Dockerfile.dev .
fi

if [[ $1 == 'run' ]]; then
  docker run --network codearena-network -v $(pwd):/app -v /app/node_modules -v /app/.next -p 4000:4000 arena-dev:latest
fi

if [[ $1 == 'build:prod' ]]; then
  docker build -t arena-prod .
fi

if [[ $1 == 'run:prod' ]]; then
  docker run --network codearena-network -p 3000:3000 arena-prod:latest
fi
