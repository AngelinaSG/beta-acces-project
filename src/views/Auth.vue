<template>
  <div class="grey darken-1 empty-layout">
    <Loader v-if="isLoading" />
    <div v-else class="card auth-card">
      <div class="card-content">
        <span class="card-title center">Упс.. Ошибочка!</span>
        <p>
          Работа над сайтом кипит и совсем скоро ты сможешь получить к нему
          доступ. Для этого ты уже сейчас можешь воспользоваться своим секретным
          кодом!
        </p>
      </div>
      <div class="card-action">
        <form @submit.prevent="submitHandler">
          <div class="input-field">
            <input
              id="code"
              type="text"
              v-model.trim="code"
              ref="codeInput"
              :class="{
                invalid:
                  ($v.code.$dirty && !$v.code.required) ||
                  ($v.code.$dirty && !$v.code.minLength),
              }"
            />
            <label for="code">Введи код</label>
            <small
              class="helper-text invalid"
              v-if="$v.code.$dirty && !$v.code.required"
              >Необходимо ввести код</small
            >
            <small
              class="helper-text invalid"
              v-else-if="$v.code.$dirty && !$v.code.minLength"
            >
              Минимальная длина кода
              {{ $v.code.$params.minLength.min }} символов
            </small>
          </div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            Получить доступ к сайту
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import Loader from "../components/Loader.vue";

export default {
  name: "auth",
  components: { Loader },
  data: () => ({
    code: "",
    isLoading: false,
  }),

  validations: {
    code: { required, minLength: minLength(8) },
  },

  mounted() {
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },

  beforeDestroy() {
    M.Toast.dismissAll();
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        this.isLoading = true;
        const isCorrectCode = await this.$store.dispatch(
          "signInByCode",
          this.code
        );
        if (isCorrectCode) {
          this.$router.push("/");
        } else {
          this.code = "";
          setTimeout(() => {
            this.isLoading = false;
            this.$message("Такого кода не существует");
            this.$nextTick(() => {
              this.$refs.codeInput.focus();
            });
          }, 800);
        }
      } catch (e) {}
    },
  },
};
</script>
