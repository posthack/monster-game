import { createStore } from "vuex";

const apiUrl =
  "https://monster-game-7912b-default-rtdb.europe-west1.firebasedatabase.app/api.json";

const updateLocalstorage = (stats) => {
  localStorage.setItem("stats", JSON.stringify(stats));
};

const getLocalstorage = () => {
  const stats = localStorage.getItem("stats");
  return stats ? JSON.parse(stats) : null;
};

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
    setWinner(state, payload) {
      state.winner = payload;
    },
    addCombatLog(state, payload) {
      state.combatLog.unshift(payload);
    },
    setCombatLog(state, payload) {
      state.combatLog = payload;
    },
    resetCombatLog(state) {
      state.combatLog = [];
    },
  },
  actions: {
    initGame({ commit }) {
      if (getLocalstorage()) {
        commit("setPlayerHealth", getLocalstorage().player);
        commit("setMonsterHealth", getLocalstorage().monster);
        commit("setWinner", getLocalstorage().winner);
        commit("setCombatLog", getLocalstorage().combatLog);
      }
    },
    restartGame({ commit, state }) {
      commit("setWinner", "");
      commit("setPlayerHealth", 100);
      commit("setMonsterHealth", 100);
      commit("resetCombatLog");
      updateLocalstorage({
        player: state.playerStats.health,
        monster: state.monsterStats.health,
        winner: state.winner,
        combatLog: state.combatLog,
      });
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
      updateLocalstorage({
        player: state.playerStats.health,
        monster: state.monsterStats.health,
        winner: state.winner,
        combatLog: state.combatLog,
      });
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
    getWinner: (state) => state.winner,
    getCombatLog: (state) => state.combatLog,
  },
});
