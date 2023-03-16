import { defineStore } from "pinia";
import { ref } from "vue";
export const useStrongPasswordStore = defineStore("strong_password", () => {
  const setOfRules = ref({
    OneLetter: false,
    UpperAndLower: false,
    OneNumber: false,
    SpecialSymbol: false,
    LongerThan4: false,
    LongerThan8: false,
    LongerThan12: false,
  });
  function setValueToRule(rule, value) {
    this.setOfRules[rule] = value;
  }
  return {
    setOfRules,
    setValueToRule,
  };
});
