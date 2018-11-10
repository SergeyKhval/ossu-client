<template>
  <div>
    <v-dialog
      v-model="isDialogVisible"
      max-width="450"
    >
      <v-card>
        <v-card-title>
          <h3>Create new resource</h3>
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="resource.url"
            label="url"
            autofocus
          />

          <v-text-field
            v-model="resource.title"
            label="title"
          />

          <v-text-field
            v-model="resource.notes"
            label="notes"
          />
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="success"
            @click="createResource(resource)"
          >
            add
          </v-btn>
          <v-btn
            color="error"
            @click="isDialogVisible = false"
          >
            cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn
      flat
      color="primary"
      @click="isDialogVisible = true"
    >
      create new resource
    </v-btn>

    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Url</th>
          <th>Notes</th>
          <th/>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="resource in resourcesList"
          :key="resource.id"
        >
          <td>{{ resource.title }}</td>
          <td>{{ resource.url }}</td>
          <td>{{ resource.notes }}</td>
          <td>
            <v-btn
              flat
              color="error"
              @click="removeResource(resource.id)"
            >
              remove resource
            </v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data() {
      return {
        isDialogVisible: false,
        resource: {
          url: '',
          title: '',
          tags: [],
          notes: '',
        },
      }
    },
    computed: {
      ...mapGetters('resources', ['resourcesList']),
    },
    methods: {
      ...mapActions('resources', ['createResource', 'removeResource']),
    },
  }
</script>
