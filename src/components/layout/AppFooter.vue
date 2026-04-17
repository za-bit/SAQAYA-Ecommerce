<template>
  <div class="footer">
    <footer class="footer__container">
      <div class="footer__section footer__section--exclusive">
        <h1 class="footer__title">Exclusive</h1>
        <h3>Subscribe</h3>
        <p>Get 10% off your first order</p>
        <div class="footer__email">
          <input type="email" placeholder="Enter your email" />
          <img src="@/assets/images/icons/SendIcon.svg" />
        </div>
      </div>
      <div class="footer__section">
        <h2>Support</h2>
        <p v-for="item in supportInfo" :key="item">
          {{ item }}
        </p>
      </div>
      <div class="footer__section">
        <h2>Account</h2>
        <p v-for="item in accountLinks" :key="item">
          {{ item }}
        </p>
      </div>
      <div class="footer__section">
        <h2>Quick Link</h2>
        <p v-for="item in quickLinks" :key="item">
          {{ item }}
        </p>
      </div>
      <div class="footer__section">
        <h2>Download App</h2>
        <p>Save $3 with App New User Only</p>
        <div class="footer__download">
          <div class="footer__app">
            <img src="@/assets/images/icons/QrcodeFooter.svg" />
            <div class="footer__stores">
              <img src="@/assets/images/logos/GooglePlay.svg" />
              <img src="@/assets/images/logos/AppStore.svg" />
            </div>
          </div>
          <div class="footer__social">
            <img v-for="icon in socialIcons" :key="icon" :src="icon" />
          </div>
        </div>
      </div>
    </footer>
    <div class="footer__line"></div>
    <div class="footer__bottom">
      <img src="@/assets/images/icons/GroupIcon.svg" style="height: 1%" />
      <p>Copyright Rimel 2022. All right reserved</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import facebook from "@/assets/images/logos/FacebookLogo.svg";
import twitter from "@/assets/images/logos/TwitterIogo.svg";
import instagram from "@/assets/images/logos/InstagramIogo.svg";
import linkedin from "@/assets/images/logos/LinkedinLogo.svg";
export default Vue.extend({
  data() {
    return {
      accountLinks: ["Login/Register", "Cart", "Wishlist", "Shop"],
      quickLinks: ["Privacy Policy", "Terms Of Use", "FAQ", "Contact"],
      socialIcons: [facebook, twitter, instagram, linkedin],
      supportInfo: [
        "111 Bijoy sarani,Dhaka,",
        "DH1515,Bangladesh.",
        "exclusive@gmail.com",
        "+88015-88888-9999",
      ],
    };
  },
});
</script>

<style scoped>
@import "@/assets/styles/layout/footer.scss";
</style>
