const SECTIONS_REF = 'sections'

export const state = () => ({
  sections: {},
})

export const getters = {
  sectionsList(state) {
    const sectionsList = []

    for (const sectionId in state.sections) {
      if (Object.prototype.hasOwnProperty.call(state.sections, sectionId)) {
        const section = state.sections[sectionId]
        section.id = sectionId

        sectionsList.push(section)
      }
    }

    return sectionsList
  },
  sectionById(state) {
    return sectionId => {
      if (sectionId !== '0')
        return state.sections[sectionId]
      else
        return {}
    }
  },
  sectionsSubtree(state, localGetters) {
    return parentId => localGetters.sectionsList.filter(section => section.parent === parentId)
  },
}

export const mutations = {
  setSections(state, sections) {
    state.sections = sections
  },
}

export const actions = {
  async fetchSections({ commit }) {
    const sections = await this.$firebaseDb.fetchResources(SECTIONS_REF)

    commit('setSections', sections)
  },

  subscribeToSections({ commit }) {
    this.$firebaseDb.subscribeToResources('value', 'sections', commit.bind(this, 'setSections'))
  },

  createSection(store, data) {
    if (!data.parent)
      data.parent = '0'

    this.$firebaseDb.createResource(SECTIONS_REF, data)
  },

  removeSection(store, sectionId) {
    this.$firebaseDb.removeResource(SECTIONS_REF, sectionId)
  },

  addResource(store, { sectionId, resourceId }) {
    console.log(sectionId, resourceId)
    this.$firebaseDb.addResourceToSection(sectionId, resourceId)
  },
}
