import get from 'lodash/get'

export default function ({ store, redirect }) {
  if (!get(store, 'state.user.isAuthenticated'))
    redirect('/')
}
