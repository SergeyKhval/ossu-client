<template>
  <div>
    <v-dialog max-width="450">
      <v-btn
        slot="activator"
        color="primary"
        flat
      >
        create new section
      </v-btn>

      <v-card>
        <v-card-title>
          <h3>Create new section</h3>
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="section.title"
            label="title"
          />

          <v-select
            :items="sectionsList"
            v-model="section.parent"
            label="parent"
            item-value="id"
            item-text="title"
          />

          <v-text-field label="dependencies"/>
          <v-text-field label="resources"/>

        </v-card-text>

        <v-card-actions>
          <v-btn @click="createSection(section)">create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="isAddResourceDialogVisible"
      max-width="450"
    >
      <v-card>
        <v-card-title>
          <h3>Add resource to section</h3>
        </v-card-title>

        <v-card-text>
          <v-select
            :items="resourcesList"
            v-model="currentResourceId"
            label="resource"
            item-value="id"
            item-text="title"
          />
        </v-card-text>

        <v-card-actions>
          <v-btn
            flat
            @click="_addResource"
          >
            add
          </v-btn>
          <v-btn flat>
            cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Parent</th>
          <th/>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="section in sectionsList"
          :key="section.id"
        >
          <td>{{ section.title }}</td>

          <td>{{ sectionById(section.parent).title }}</td>
          <td>
            <v-btn @click="openAddResourceDialog(section.id)">+ add resource</v-btn>
          </td>
          <td>
            <v-btn
              flat
              color="error"
              @click="removeSection(section.id)"
            >
              delete section
            </v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data() {
      return {
        section: {
          title: '',
          parent: null,
        },
        currentSectionId: null,
        currentResourceId: null,
        isAddResourceDialogVisible: false,
      }
    },
    computed: {
      ...mapGetters('sections', ['sectionsList', 'sectionById']),
      ...mapGetters('resources', ['resourcesList']),
    },
    methods: {
      ...mapActions('sections', ['createSection', 'removeSection', 'addResource']),
      openAddResourceDialog(sectionId) {
        this.currentSectionId = sectionId
        this.isAddResourceDialogVisible = true
      },
      _addResource() {
        this.addResource({ sectionId: this.currentSectionId, resourceId: this.currentResourceId })
      },
    },

  }
</script>

