(async () => {
  const { default: vue } = await import('libs/vue')
  console.log(vue)
})()