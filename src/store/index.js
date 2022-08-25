import { createStore } from "vuex";

const apiUrl =
  "https://monster-game-7912b-default-rtdb.europe-west1.firebasedatabase.app/health.json";

export const store = createStore({
  state: {
    monsterStats: {
      name: "Monster",
      health: 100,
      damageMultiplier: 1,
    },
    playerStats: {
      name: "Player",
      health: 100,
      damageMultiplier: 1,
    },
  },
  mutations: {
    setHealth(state, payload) {
      if (payload.player && payload.player > 0) {
        state.playerStats.health = payload.player;
      }
      if (payload.monster && payload.monster > 0) {
        state.monsterStats.health = payload.monster;
      }
    },
  },
  actions: {
    async initGame({ commit }) {
      const health = await (await fetch(apiUrl)).json();
      commit("setHealth", health);
    },
    setHealth({ commit }, payload) {
      const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          player: payload.player,
          monster: payload.monster,
        }),
      };
      fetch(apiUrl, options);
      commit("setHealth", payload);
    },
  },
  getters: {
    getPlayerStats: (state) => state.playerStats,
    getMonsterStats: (state) => state.monsterStats,
    getPlayerHealth: (state) => state.playerStats.health,
    getMonsterHealth: (state) => state.monsterStats.health,
  },
});
