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
