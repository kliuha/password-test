<script setup>
import { RULE, RULE_LABEL } from "@/domain/password/rules";
import { StrengthOptionLabel } from "@/domain/password/strength-options";
import { useStrongPasswordStore } from "@/stores/strong-password";
import { computed } from "vue";

const passwordStore = useStrongPasswordStore();
const rules = Object.values(RULE);
const validationSummary = computed(() => {
  let stateOfRules = Object.values(passwordStore.setOfRules);
  stateOfRules = stateOfRules.filter((rule) => rule);
  return stateOfRules.length >= 5
    ? StrengthOptionLabel.strong
    : StrengthOptionLabel.weak;
});
const validatePassword = (e) => {
  passwordStore.setValueToRule(RULE.OneLetter, /[a-z]/i.test(e.target.value));
  passwordStore.setValueToRule(
    RULE.UpperAndLower,
    /[a-z]/.test(e.target.value) && /[A-Z]/.test(e.target.value)
  );
  passwordStore.setValueToRule(RULE.OneNumber, /[0-9]/.test(e.target.value));
  passwordStore.setValueToRule(
    RULE.SpecialSymbol,
    /[-$%^& _+*()@!]/.test(e.target.value)
  );
  passwordStore.setValueToRule(RULE.LongerThan4, e.target.value.length > 4);
  passwordStore.setValueToRule(RULE.LongerThan8, e.target.value.length > 8);
  passwordStore.setValueToRule(RULE.LongerThan12, e.target.value.length > 12);
};
</script>

<template>
  <div>
    <div class="password-wrapper">
      <input data-test="password-field" @input="validatePassword" />
      <span data-test="validation-summary">{{ validationSummary }}</span>
    </div>
    <ul class="password-hints">
      <li
        v-for="rule in rules"
        :key="rule"
        :data-test-rule-indicator="rule"
        class="password-hint__rule"
        :class="{
          'password-hint__rule--fail': !passwordStore.setOfRules[rule],
          'password-hint__rule--pass': passwordStore.setOfRules[rule],
        }"
      >
        {{ RULE_LABEL[rule] }}
      </li>
    </ul>
  </div>
</template>
