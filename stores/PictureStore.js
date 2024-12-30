import { defineStore } from 'pinia'

export const usePictureStore = defineStore('PictureStore',
  {
    state: () => ({}),
    actions: {
      async getPicturesByAlbumId(albumId) {
        const response = await useAuthFetch(`pictures/findForAlbum?albumId=${albumId}`, 'GET')
        return response
      }
    }
  })
