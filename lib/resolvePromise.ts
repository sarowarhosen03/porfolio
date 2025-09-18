export default async function resolvePromise<T>(
  promise: Promise<T>
): Promise<[T, null] | [null, any]> {
  try {
    const data = await promise
    return [data, null]
  } catch (error) {
    return [null, error]
  }
}
