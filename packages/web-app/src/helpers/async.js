/*
 * Useful for awaiting asyncronous work in tests when you don't have a promise to wait upon
 */
export const flushAllPromises = () => new Promise(resolve => setImmediate(resolve))

/*
 * Complete any async work and update the enzyme wrapper
 */
export const waitAndUpdate = async component => {
  await flushAllPromises()
  component.update()
}
