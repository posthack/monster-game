import { createStore } from "vuex";

const apiUrl =
  "https://monster-game-7912b-default-rtdb.europe-west1.firebasedatabase.app/api.json";

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
    isLoading: false,
    winner: "",
    combatLog: [],
  },
  mutations: {
    setPlayerHealth(state, payload) {
      state.playerStats.health = payload;
    },
    setMonsterHealth(state, payload) {
      state.monsterStats.health = payload;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setWinner(state, payload) {
      state.winner = payload;
    },
    addCombatLog(state, payload) {
      state.combatLog.unshift(payload);
    },
  },
  actions: {
    async initGame({ commit }) {
      const { winner } = await (await fetch(apiUrl)).json();
      commit("setWinner", winner);
      const { player, monster } = await (await fetch(apiUrl)).json();
      commit("setPlayerHealth", player);
      commit("setMonsterHealth", monster);
    },
    async restartGame({ commit, dispatch, state }) {
      commit("setWinner", "");
      commit("setPlayerHealth", 100);
      commit("setMonsterHealth", 100);
      // dispatch("pushStats", {
      //   player: state.playerStats.health,
      //   monster: state.monsterStats.health,
      //   winner: state.winner,
      // });
    },
    pushStats({ commit, state }, payload) {
      if (payload.player) {
        if (payload.player > 0) {
          commit("setPlayerHealth", payload.player);
        } else {
          commit("setWinner", "Monster");
          commit("setPlayerHealth", 0);
        }
      }
      if (payload.monster) {
        if (payload.monster > 0) {
          commit("setMonsterHealth", payload.monster);
        } else {
          commit("setWinner", "Player");
          commit("setMonsterHealth", 0);
        }
      }
      // commit("setIsLoading", true);
      // const options = {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     player: state.playerStats.health,
      //     monster: state.monsterStats.health,
      //     winner: state.winner,
      //   }),
      // };
      // fetch(apiUrl, options).then((res) => {
      //   if (res.ok) {
      //     commit("setIsLoading", false);
      //   }
      // });
    },
    addCombatLog({ commit }, payload) {
      commit("addCombatLog", payload);
    },
  },
  getters: {
    getPlayerStats: (state) => state.playerStats,
    getMonsterStats: (state) => state.monsterStats,
    getPlayerHealth: (state) => state.playerStats.health,
    getMonsterHealth: (state) => state.monsterStats.health,
    getIsLoading: (state) => state.isLoading,
    getWinner: (state) => state.winner,
    getCombatLog: (state) => state.combatLog,
  },
});
