export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuthStore()
  if (!user) {
    console.log(`Not logged: page ${to.path} is forbidden`)
    return abortNavigation()
  }
  return
})
