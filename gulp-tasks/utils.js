import minimist from 'minimist'

const args = minimist(process.argv.slice(2))

const getEnv = () => {
  const activeEnvs = {}
  const envs = [
    'dev',
    'prod',
  ]
  for (let i = 0; i < envs.length; i++) {
    activeEnvs[envs[i]] = args[envs[i]]
  }
  return activeEnvs
}

export {
  getEnv,
}
