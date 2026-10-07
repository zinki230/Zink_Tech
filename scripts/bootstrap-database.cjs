const { spawnSync } = require("node:child_process");

if (process.env.VERCEL_ENV !== "production") {
  console.log("Initialisation PostgreSQL ignorée hors déploiement Production.");
  process.exit(0);
}

const databaseUrl = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL manquante pour initialiser PostgreSQL en Production.");
  process.exit(1);
}

const commandEnvironment = { ...process.env, DATABASE_URL: databaseUrl };
const prismaCli = require.resolve("prisma");
const commands = [
  [process.execPath, [prismaCli, "migrate", "deploy"]],
  [process.execPath, [require("node:path").join(__dirname, "seed-catalogue.cjs")]],
];

for (const [executable, args] of commands) {
  const result = spawnSync(executable, args, {
    cwd: process.cwd(),
    env: commandEnvironment,
    stdio: "inherit",
  });

  if (result.error) {
    console.error("Échec du lancement de l’initialisation PostgreSQL.");
    process.exit(1);
  }
  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}
