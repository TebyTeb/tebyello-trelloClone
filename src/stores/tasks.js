import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    overlay: false,
    lastListId: 3,
    lastCardId: 5,
    currentData: null,
    lists: [
      {
        id: 1,
        name: 'list #1',
      },
      {
        id: 2,
        name: 'list #2',
      },
      {
        id: 3,
        name: 'list #3',
      },
    ],
    cards: [
      {
        listId: 1,
        id: 1,
        name: 'card 1',
      },
      {
        listId: 2,
        id: 2,
        name: 'card 2',
      },
      {
        listId: 3,
        id: 3,
        name: 'card 3',
      },
    ],
  }),

  getters: {
    getOverlay: (state) => state.overlay,
    getLastListId: (state) => state.lastListId,
    getLastCardId: (state) => state.lastCardId,
    getCurrentData: (state) => state.currentData,
    getLists: (state) => state.lists,
    getCards: (state) => state.cards,
  },

  actions: {
    createCard(card) {
      this.lastCardId++
      const newCard = {
        listId: card.listId,
        id: this.lastCardId,
        name: card.name,
      }
      this.cards.push(newCard)
    },
    toggleOverlay() {
      this.overlay = !this.overlay
    },
    openForm(currentData) {
      this.currentData = currentData
    },
    saveCard(payload) {
      this.cards = this.cards.map((card) => {
        if (card.id === payload.id) {
          return Object.assign({}, card, payload)
        }
        return card
      })
    },
    deleteCard(payload) {
      const indexToDelete = this.cards
        .map((card) => card.id)
        .indexOf(payload.id)
      this.cards.splice(indexToDelete, 1)
    },
    createList(payload) {
      this.lastListId++
      const list = {
        id: this.lastListId,
        name: payload,
      }
      this.lists.push(list)
    },
  },
})
