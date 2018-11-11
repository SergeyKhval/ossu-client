import omit from 'lodash/omit'

const RESOURCES_REF = 'resources'

export const state = () => ({
  resources: {},
})

export const getters = {
  resourcesList(state) {
    const resourcesList = []

    for (const resourceId in state.resources) {
      if (Object.prototype.hasOwnProperty.call(state.resources, resourceId)) {
        const section = state.resources[resourceId]
        section.id = resourceId

        resourcesList.push(section)
      }
    }

    return resourcesList
  },
  resourceById(state) {
    return resourceId => state.resources[resourceId]
  },
}

export const mutations = {
  setResources(state, resources) {
    state.resources = resources
  },
  removeResource(state, resourceId) {
    state.resources = omit(state.resources, resourceId)
  },
}

export const actions = {
  async fetchResources({ commit }) {
    const resources = await this.$firebaseDb.fetchResources(RESOURCES_REF)

    commit('setResources', resources)
  },

  subscribeToResources({ commit }) {
    this.$firebaseDb.subscribeToResources('value','resources', commit.bind(this, 'setResources'))
  },

  createResource(store, data) {
    this.$firebaseDb.createResource(RESOURCES_REF, data)
  },

  async removeResource({ commit }, resourceId) {
    try {
      await this.$firebaseDb.removeResource(RESOURCES_REF, resourceId)

      commit('removeResource', resourceId)
    } catch (e) {

    }
  },
}
