<template>
  <div class="contact">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb__link">Home</router-link>
      <span class="breadcrumb__slash"> / </span>
      <span class="breadcrumb__current">Contact</span>
    </div>
    <div class="contact__row">
      <img src="@/assets/images/illustrations/ContactImage.svg" />

      <div class="contact__content">
        <div class="contact__section">
          <div class="contact__header">
            <div class="contact__icon-box">
              <img src="@/assets/images/icons/PhoneIcon.svg" alt="phone" />
            </div>
            <h3 class="contact__title">Call Us</h3>
          </div>
          <p class="contact__text">We are available 24/7, 7 days a week.</p>
          <p class="contact_text contact_text--bold">Phone: +8801611112222</p>
        </div>

        <hr class="contact__divider" />

        <div class="contact__section">
          <div class="contact__header">
            <div class="contact__icon-box">
              <img src="@/assets/images/icons/MailIcon.svg" alt="mail" />
            </div>
            <h3 class="contact__title">Write To Us</h3>
          </div>
          <p class="contact__text">
            Fill out our form and we will contact you within 24 hours.
          </p>

          <form @submit.prevent="handleSubmit" class="contact__form">
            <div class="contact__inputs">
              <input
                type="text"
                v-model="formData.name"
                placeholder="Your Name *"
                required
              />
              <input
                type="email"
                v-model="formData.email"
                placeholder="Your Email *"
                required
              />
            </div>
            <textarea
              v-model="formData.message"
              placeholder="Your Message"
              rows="5"
            ></textarea>
            <button type="submit" class="btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default Vue.extend({
  name: "ContactPage",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        message: "",
      } as ContactForm,
    };
  },
  methods: {
    handleSubmit(): void {
      console.log("Form Data:", this.formData);
    },
  },
});
</script>
<style scoped>
@import "@/assets/styles/pages/contact.scss";
</style>
