<template>
  <div class="column">
    <footer class="row">
      <div class="exclusive">
        <h1>Exclusive</h1>
        <h2>Subscribe</h2>
        <p>Get 10% off your first order</p>
        <div class="email">
          <input type="email" placeholder="Enter your email" />
          <img src="@/assets/icons/icon-send.svg" />
        </div>
      </div>
      <div class="support">
        <h2>Support</h2>
        <p v-for="item in supportInfo" :key="item">
          {{ item }}
        </p>
      </div>
      <div class="account">
        <h2>Account</h2>
        <p v-for="item in accountLinks" :key="item">
          {{ item }}
        </p>
      </div>
      <div class="quick-link">
        <h2>Quick Link</h2>
        <p v-for="item in quickLinks" :key="item">
          {{ item }}
        </p>
      </div>
      <div class="download">
        <h2>Download App</h2>
        <p>Save $3 with App New User Only</p>
        <div class="column1">
          <div class="row2">
            <img src="@/assets/icons/Qrcode footer.svg" />
            <div class="column">
              <img src="@/assets/icons/googlePlay.svg" />
              <img src="@/assets/icons/AppStore.svg" />
            </div>
          </div>
          <div class="row2">
            <img v-for="icon in socialIcons" :key="icon" :src="icon" />
          </div>
        </div>
      </div>
    </footer>
    <div class="line"></div>
    <div class="row1">
      <img src="@/assets/icons/Group.svg" style="height: 1%" />
      <p>Copyright Rimel 2022. All right reserved</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import facebook from "@/assets/icons/Icon-Facebook.svg";
import twitter from "@/assets/icons/Icon-Twitter.svg";
import instagram from "@/assets/icons/icon-instagram.svg";
import linkedin from "@/assets/icons/Icon-Linkedin.svg";
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
.row {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 80px;
  padding: 30px 100px 30px 100px;
}
.row1 {
  display: flex;
  align-items: center;
  margin-left: 40%;
  color: #ccc;
  opacity: 0.4;
}
.column1 {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.row2 {
  display: flex;
  align-items: center;
  gap: 20px;
}
.column {
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  opacity: 0.4;
}
.email {
  position: relative;
  display: flex;
  align-items: center;
}
.email input {
  padding: 8px 45px 8px 10px;
  border-color: white;
  background-color: black;
  border-radius: 4px;
  color: white;
  outline: none;
}
.email img {
  position: absolute;
  right: 10px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}
</style>
